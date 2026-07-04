import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';
import https from 'https';
import zlib from 'zlib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const CACHE_PATH = path.join(projectRoot, '.cache', 'audio-gain-cache.json');
const LOCAL_FFMPEG_PATH = path.join(projectRoot, 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');
const forceFullRescan = process.argv.includes('--full');
const FFMPEG_DOWNLOAD_URL = 'https://github.com/eugeneware/ffmpeg-static/releases/download/b6.1.1/ffmpeg-win32-x64.gz';

const TARGET_LUFS = -16;
const MIN_GAIN = 0.1;
const MAX_GAIN = 4;
const AUDIO_EXTENSIONS = new Set(['.mp3', '.wav']);

function normalizeAudioPath(relativePath) {
    const parts = relativePath.replace(/\\/g, '/').split('/');
    const resolved = [];

    for (const part of parts) {
        if (part === '..') {
            if (resolved.length) resolved.pop();
        } else if (part !== '.' && part !== '') {
            resolved.push(part);
        }
    }

    return resolved.join('/');
}

function isFfmpegWorking(ffmpegPath) {
    const result = spawnSync(ffmpegPath, ['-version'], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe']
    });

    return result.status === 0;
}

function downloadFile(url, redirectCount = 0) {
    return new Promise((resolve, reject) => {
        if (redirectCount > 5) {
            reject(new Error('Too many redirects while downloading ffmpeg'));
            return;
        }

        https.get(url, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                downloadFile(response.headers.location, redirectCount + 1).then(resolve).catch(reject);
                return;
            }

            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ffmpeg (${response.statusCode})`));
                return;
            }

            const chunks = [];
            response.on('data', (chunk) => chunks.push(chunk));
            response.on('end', () => resolve(Buffer.concat(chunks)));
            response.on('error', reject);
        }).on('error', reject);
    });
}

async function ensureFfmpeg() {
    const candidates = [];

    try {
        const mod = await import('ffmpeg-static');
        if (mod.default) candidates.push(mod.default);
    } catch {
        // optional dependency
    }

    candidates.push(LOCAL_FFMPEG_PATH, 'ffmpeg');

    for (const candidate of candidates) {
        if (candidate !== 'ffmpeg' && !fs.existsSync(candidate)) continue;
        if (isFfmpegWorking(candidate)) {
            return candidate;
        }
    }

    if (process.platform !== 'win32') {
        throw new Error('ffmpeg is required but was not found on PATH.');
    }

    fs.mkdirSync(path.dirname(LOCAL_FFMPEG_PATH), { recursive: true });
    console.log('Downloading ffmpeg for audio analysis (one-time)...');
    const gzBuffer = await downloadFile(FFMPEG_DOWNLOAD_URL);
    fs.writeFileSync(LOCAL_FFMPEG_PATH, zlib.gunzipSync(gzBuffer));

    if (!isFfmpegWorking(LOCAL_FFMPEG_PATH)) {
        throw new Error('Downloaded ffmpeg binary is not working.');
    }

    return LOCAL_FFMPEG_PATH;
}

function shouldSkipDirectory(name) {
    return name.startsWith('_');
}

function collectAudioFiles(dir, files = []) {
    if (!fs.existsSync(dir)) return files;

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            if (shouldSkipDirectory(entry.name)) continue;
            collectAudioFiles(path.join(dir, entry.name), files);
        } else if (AUDIO_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
            files.push(path.join(dir, entry.name));
        }
    }

    return files;
}

function measureLoudness(ffmpegPath, filePath) {
    const { stderr, error } = spawnSync(
        ffmpegPath,
        [
            '-hide_banner',
            '-nostats',
            '-i', filePath,
            '-af', `loudnorm=I=${TARGET_LUFS}:TP=-1.5:LRA=11:print_format=json`,
            '-f', 'null',
            '-'
        ],
        {
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'pipe'],
            maxBuffer: 10 * 1024 * 1024
        }
    );

    if (error && !stderr) {
        throw error;
    }

    const jsonMatch = stderr.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('Could not parse loudnorm JSON output');
    }

    const stats = JSON.parse(jsonMatch[0]);
    const measuredInput = parseFloat(stats.input_i);
    if (!Number.isFinite(measuredInput)) {
        // ffmpeg reports "-inf" for silent/near-silent clips
        if (stats.input_i === '-inf' || measuredInput === -Infinity) {
            return -100;
        }
        throw new Error(`Invalid input_i in loudnorm output: ${stats.input_i}`);
    }

    return measuredInput;
}

function computeGain(measuredLufs) {
    const linearGain = Math.pow(10, (TARGET_LUFS - measuredLufs) / 20);
    return Math.min(MAX_GAIN, Math.max(MIN_GAIN, linearGain));
}

function formatGain(value) {
    return Number(value.toFixed(4));
}

function loadCache() {
    if (forceFullRescan || !fs.existsSync(CACHE_PATH)) {
        return {};
    }

    try {
        return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
    } catch {
        return {};
    }
}

function saveCache(cache) {
    fs.writeFileSync(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`, 'utf8');
}

function getFileStats(filePath) {
    const stat = fs.statSync(filePath);
    return { mtimeMs: stat.mtimeMs, size: stat.size };
}

function isCacheHit(cache, relativePath, stats) {
    const entry = cache[relativePath];
    return Boolean(
        entry
        && entry.gain != null
        && entry.mtimeMs === stats.mtimeMs
        && entry.size === stats.size
    );
}

async function main() {
    const ffmpegPath = await ensureFfmpeg();
    const audioRoot = path.join(projectRoot, 'audio');
    const audioFiles = collectAudioFiles(audioRoot).sort((a, b) => a.localeCompare(b));

    if (audioFiles.length === 0) {
        console.error('No audio files found under audio/.');
        process.exit(1);
    }

    const cache = loadCache();
    const nextCache = {};
    const gainMap = {};
    const failures = [];
    const summaries = [];
    let analyzedCount = 0;
    let cachedCount = 0;

    for (let i = 0; i < audioFiles.length; i++) {
        const filePath = audioFiles[i];
        const relativePath = normalizeAudioPath(
            path.relative(projectRoot, filePath)
        );
        const stats = getFileStats(filePath);

        if (isCacheHit(cache, relativePath, stats)) {
            const gain = formatGain(cache[relativePath].gain);
            gainMap[relativePath] = gain;
            nextCache[relativePath] = { gain, mtimeMs: stats.mtimeMs, size: stats.size };
            cachedCount++;
            continue;
        }

        analyzedCount++;
        console.log(`[${analyzedCount}] ${relativePath}`);

        try {
            const measuredLufs = measureLoudness(ffmpegPath, filePath);
            const gain = formatGain(computeGain(measuredLufs));
            gainMap[relativePath] = gain;
            nextCache[relativePath] = { gain, mtimeMs: stats.mtimeMs, size: stats.size };
            summaries.push({ relativePath, measuredLufs, gain });
        } catch (err) {
            failures.push({ relativePath, error: err.message });
        }
    }

    if (forceFullRescan) {
        console.log(`Full rescan: analyzed ${analyzedCount} clip(s) with ffmpeg (${ffmpegPath}).`);
    } else {
        console.log(`Analyzed ${analyzedCount} new/changed clip(s) (${cachedCount} cached).`);
    }

    const sortedByLoudness = [...summaries].sort((a, b) => b.measuredLufs - a.measuredLufs);
    if (sortedByLoudness.length > 0) {
        console.log('\nLoudest clips:');
        sortedByLoudness.slice(0, 5).forEach(({ relativePath, measuredLufs, gain }) => {
            console.log(`  ${measuredLufs.toFixed(1)} LUFS -> gain ${gain.toFixed(4)}  ${relativePath}`);
        });

        console.log('\nQuietest clips:');
        sortedByLoudness.slice(-5).reverse().forEach(({ relativePath, measuredLufs, gain }) => {
            console.log(`  ${measuredLufs.toFixed(1)} LUFS -> gain ${gain.toFixed(4)}  ${relativePath}`);
        });
    }

    if (failures.length > 0) {
        console.log(`\nFailed to analyze ${failures.length} file(s):`);
        failures.forEach(({ relativePath, error }) => {
            console.log(`  ${relativePath}: ${error}`);
        });
    }

    const mapLines = Object.entries(gainMap)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `  "${key}": ${value},`)
        .join('\n');

    const output = `// Auto-generated by scripts/analyze-audio-gains.mjs — do not edit by hand.
// Target loudness: ${TARGET_LUFS} LUFS. Re-run after adding new clips.
window.audioGainMap = {
${mapLines}
};
`;

    const outputPath = path.join(projectRoot, 'app', 'generated', 'audio-gain-map.js');
    fs.writeFileSync(outputPath, output, 'utf8');
    saveCache(nextCache);

    console.log(`\nWrote ${Object.keys(gainMap).length} entries to ${outputPath}`);
    if (failures.length > 0) {
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
