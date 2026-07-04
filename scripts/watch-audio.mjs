import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const DEBOUNCE_MS = 750;
const AUDIO_EXTENSIONS = new Set(['.mp3', '.wav']);

const watchDirs = [
    path.join(projectRoot, 'audio')
];

const ignoredBasenames = new Set([
    'win-clips-manifest.js',
    'audio-gain-map.js',
    'audio-gain-cache.json'
]);

let debounceTimer = null;
let refreshInProgress = false;
let refreshQueued = false;

function runRefresh() {
    refreshInProgress = true;

    const syncPathsResult = spawnSync(process.execPath, [path.join(__dirname, 'sync-audio-paths.mjs')], {
        cwd: projectRoot,
        stdio: 'inherit'
    });

    if (syncPathsResult.status !== 0) {
        console.error('sync-audio-paths.mjs failed.');
        refreshInProgress = false;
        if (refreshQueued) {
            refreshQueued = false;
            scheduleRefresh();
        }
        return;
    }

    const syncResult = spawnSync(process.execPath, [path.join(__dirname, 'sync-win-clips-manifest.mjs')], {
        cwd: projectRoot,
        stdio: 'inherit'
    });

    if (syncResult.status !== 0) {
        console.error('sync-win-clips-manifest.mjs failed.');
        refreshInProgress = false;
        if (refreshQueued) {
            refreshQueued = false;
            scheduleRefresh();
        }
        return;
    }

    const analyzeResult = spawnSync(process.execPath, [path.join(__dirname, 'analyze-audio-gains.mjs')], {
        cwd: projectRoot,
        stdio: 'inherit'
    });

    refreshInProgress = false;

    if (analyzeResult.status !== 0) {
        console.error('analyze-audio-gains.mjs failed.');
    } else {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`\n[${timestamp}] Updated — reload browser to hear new clips.\n`);
    }

    if (refreshQueued) {
        refreshQueued = false;
        scheduleRefresh();
    }
}

function scheduleRefresh() {
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
        debounceTimer = null;

        if (refreshInProgress) {
            refreshQueued = true;
            return;
        }

        runRefresh();
    }, DEBOUNCE_MS);
}

function watchDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        console.warn(`Watch skipped (missing folder): ${path.relative(projectRoot, dirPath)}`);
        return;
    }

    fs.watch(dirPath, { recursive: true }, (_eventType, filename) => {
        if (!filename) return;

        const basename = path.basename(filename);
        if (ignoredBasenames.has(basename) || basename.startsWith('_')) return;

        const ext = path.extname(filename).toLowerCase();
        if (!AUDIO_EXTENSIONS.has(ext)) return;

        console.log(`Change detected: ${path.relative(projectRoot, path.join(dirPath, filename)).replace(/\\/g, '/')}`);
        scheduleRefresh();
    });
}

console.log('Watching audio/ for audio changes...');
console.log('Drop clips into audio/win/<category>/, then reload the browser when updated.');
console.log('Press Ctrl+C to stop.\n');

watchDirs.forEach(watchDirectory);
