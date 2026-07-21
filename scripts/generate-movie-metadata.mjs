import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    buildOmdbImdbUrl,
    buildOmdbUrl,
    extractListingsFromMainJs,
    extractRuntimeMinutesFromMainJs,
    getDefaultMainJsPath,
    getOmdbImdbId,
    getOmdbSearchTitle,
    normalizePartNumbersForOmdb,
    parseMovieListing,
    sanitizeOmdbPosterUrl
} from './lib/movie-listings.mjs';
import { createOmdbKeySession, isOmdbKeyFailure } from './lib/omdb-api-key.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUTPUT_PATH = path.join(ROOT, 'app', 'generated', 'movie-metadata.js');
const OVERRIDES_PATH = path.join(__dirname, 'poster-overrides.json');
const THROTTLE_MS = 250;

function loadDotEnv() {
    const envPath = path.join(ROOT, '.env');
    if (!fs.existsSync(envPath)) return;
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eq = trimmed.indexOf('=');
        if (eq < 1) continue;
        const key = trimmed.slice(0, eq).trim();
        const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
        if (key && process.env[key] == null) {
            process.env[key] = value;
        }
    }
}

loadDotEnv();
const omdbKeys = createOmdbKeySession();
console.log(`OMDb API key: ${omdbKeys.describe()} (length ${omdbKeys.key.length})`);

const METADATA_FIELDS = [
    'Response',
    'Title',
    'Year',
    'Rated',
    'Runtime',
    'Genre',
    'Director',
    'Actors',
    'Plot',
    'imdbRating',
    'Metascore',
    'imdbID',
    'Poster',
    'Ratings'
];

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function loadPosterOverrides() {
    const raw = JSON.parse(fs.readFileSync(OVERRIDES_PATH, 'utf8'));
    return {
        byListing: raw.byListing || {},
        byImdbId: raw.byImdbId || {}
    };
}

function omdbHasPoster(data) {
    return data?.Response === 'True' && data.Poster && data.Poster !== 'N/A';
}

function pickMetadataRecord(data) {
    const record = {};
    for (const field of METADATA_FIELDS) {
        if (data[field] != null && data[field] !== '') {
            record[field] = data[field];
        }
    }
    record.Response = 'True';
    return record;
}

async function fetchOmdbOnce(url) {
    const response = await fetch(url);
    if (response.status === 401) {
        const body = await response.json().catch(() => ({}));
        const err = body.Error || `HTTP ${response.status}`;
        if (omdbKeys.maybeFallback(err)) {
            return null; // signal retry with new key
        }
        return { Response: 'False', Error: err };
    }
    return response.json();
}

async function fetchOmdbWithKeyFallback(buildUrl) {
    let data = await fetchOmdbOnce(buildUrl(omdbKeys.key));
    if (data == null) {
        data = await fetchOmdbOnce(buildUrl(omdbKeys.key));
    }
    if (
        data?.Response === 'False' &&
        isOmdbKeyFailure(data.Error) &&
        omdbKeys.maybeFallback(data)
    ) {
        data = await fetchOmdbOnce(buildUrl(omdbKeys.key));
    }
    return data;
}

async function fetchOmdbJson(title, year) {
    return fetchOmdbWithKeyFallback((apiKey) => buildOmdbUrl(title, year, apiKey));
}

async function fetchOmdbByImdbId(imdbId) {
    return fetchOmdbWithKeyFallback((apiKey) => buildOmdbImdbUrl(imdbId, apiKey));
}

async function fetchOmdbListing(title, year, imdbId = null) {
    if (imdbId) {
        const data = await fetchOmdbByImdbId(imdbId);
        if (data.Response === 'True') {
            return data;
        }
    }

    let data = await fetchOmdbJson(title, year);
    if (!year || omdbHasPoster(data)) {
        return data;
    }

    data = await fetchOmdbJson(title, null);
    if (omdbHasPoster(data)) {
        return data;
    }

    const normalizedTitle = normalizePartNumbersForOmdb(title);
    if (normalizedTitle !== title) {
        data = await fetchOmdbJson(normalizedTitle, year);
        if (!year || omdbHasPoster(data)) {
            return data;
        }
        data = await fetchOmdbJson(normalizedTitle, null);
    }

    return data;
}

function getPosterCandidates(posterUrl, imdbID, overrides) {
    const candidates = [];
    const imdbOverride = imdbID && overrides.byImdbId[imdbID];
    if (imdbOverride) candidates.push(imdbOverride);

    const sanitized = sanitizeOmdbPosterUrl(posterUrl);
    if (sanitized) candidates.push(sanitized);
    if (posterUrl && posterUrl !== sanitized) candidates.push(posterUrl);

    if (sanitized && sanitized.includes('@._V1')) {
        const dotted = sanitized.replace('@._V1', '._V1');
        if (!candidates.includes(dotted)) candidates.push(dotted);
    }

    return [...new Set(candidates.filter(Boolean))];
}

async function validatePosterUrl(url) {
    try {
        const response = await fetch(url, { method: 'GET', redirect: 'follow' });
        const contentType = response.headers.get('content-type') || '';
        return response.ok && contentType.startsWith('image/');
    } catch {
        return false;
    }
}

async function resolveValidatedPoster(posterUrl, imdbID, listing, overrides) {
    const listingOverride = overrides.byListing[listing];
    if (listingOverride) {
        if (await validatePosterUrl(listingOverride)) {
            return listingOverride;
        }
    }

    const candidates = getPosterCandidates(posterUrl, imdbID, overrides);
    for (const url of candidates) {
        if (await validatePosterUrl(url)) {
            return url;
        }
    }

    return null;
}

function escapeJsString(value) {
    return JSON.stringify(value);
}

function serializeMetadataMap(metadataMap) {
    const lines = Object.entries(metadataMap)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([listing, record]) => `  ${escapeJsString(listing)}: ${JSON.stringify(record)}`);

    return [
        '// Auto-generated by scripts/generate-movie-metadata.mjs - do not edit by hand.',
        '// Re-run: npm run generate-metadata',
        '// After adding movies to movieDatabase in main.js.',
        'window.movieMetadataByListing = {',
        lines.join(',\n'),
        '};',
        ''
    ].join('\n');
}

function buildBootstrapRecord(listing, runtimeMinutes, poster) {
    const { cleanTitle, year } = parseMovieListing(listing);
    const record = {
        Response: 'True',
        Title: cleanTitle,
        Year: year || undefined
    };
    if (runtimeMinutes != null) {
        record.Runtime = `${runtimeMinutes} min`;
    }
    if (poster) {
        record.Poster = poster;
    }
    return record;
}

function loadExistingMetadata(outputPath) {
    if (!fs.existsSync(outputPath)) {
        return {};
    }
    const content = fs.readFileSync(outputPath, 'utf8');
    const match = content.match(/window\.movieMetadataByListing\s*=\s*(\{[\s\S]*\});/);
    if (!match) {
        return {};
    }
    try {
        return Function(`"use strict"; return (${match[1]});`)();
    } catch {
        return {};
    }
}

async function main() {
    const overrides = loadPosterOverrides();
    const mainJsPath = getDefaultMainJsPath();
    const listings = extractListingsFromMainJs(mainJsPath);
    const runtimes = extractRuntimeMinutesFromMainJs(mainJsPath);
    const existing = loadExistingMetadata(OUTPUT_PATH);
    const metadataMap = { ...existing };

    console.log(`Generating metadata for ${listings.length} listings...\n`);

    const missed = [];
    const posterMisses = [];
    let omdbFetched = 0;
    let bootstrapped = 0;

    for (let i = 0; i < listings.length; i++) {
        const listing = listings[i];
        const { year } = parseMovieListing(listing);
        const searchTitle = getOmdbSearchTitle(listing);
        const mappedImdbId = getOmdbImdbId(listing);
        const listingPosterOverride = overrides.byListing[listing] || null;

        process.stdout.write(`[${i + 1}/${listings.length}] ${listing} ... `);

        if (!year) {
            console.log('SKIP (no year)');
            missed.push({ listing, reason: 'no year' });
            continue;
        }

        const existingRecord = metadataMap[listing];
        const hasFullRecord = existingRecord?.Response === 'True'
            && existingRecord?.Poster
            && existingRecord?.Plot;
        const needsImdbRefresh = mappedImdbId
            && existingRecord?.imdbID
            && existingRecord.imdbID !== mappedImdbId;

        if (hasFullRecord && !needsImdbRefresh) {
            console.log('SKIP (cached)');
            continue;
        }

        let data = null;
        let omdbError = null;

        try {
            data = await fetchOmdbListing(searchTitle, year, mappedImdbId);
            if (data.Response === 'True') {
                omdbFetched++;
            } else {
                omdbError = data.Error || 'no match';
            }
        } catch (err) {
            omdbError = err.message;
        }

        if (data?.Response === 'True') {
            const record = pickMetadataRecord(data);
            const validatedPoster = await resolveValidatedPoster(
                record.Poster,
                record.imdbID,
                listing,
                overrides
            ) || listingPosterOverride;

            if (validatedPoster) {
                record.Poster = validatedPoster;
            } else {
                delete record.Poster;
                posterMisses.push(listing);
            }

            metadataMap[listing] = record;
            console.log(validatedPoster ? 'OK (OMDb)' : 'OK (OMDb, no poster)');
        } else if (existingRecord?.Response === 'True' && existingRecord?.Poster && existingRecord?.Plot) {
            metadataMap[listing] = existingRecord;
            console.log('KEEP (existing full record; API miss)');
        } else if (existingRecord?.Poster && existingRecord.Poster !== 'N/A') {
            metadataMap[listing] = existingRecord;
            console.log('KEEP (existing poster; API miss)');
        } else {
            const runtimeMinutes = runtimes[listing] ?? null;
            const poster = listingPosterOverride;
            metadataMap[listing] = buildBootstrapRecord(listing, runtimeMinutes, poster);
            bootstrapped++;
            if (!poster) {
                posterMisses.push(listing);
            }
            console.log(`BOOTSTRAP${omdbError ? ` (${omdbError})` : ''}`);
            missed.push({ listing, reason: omdbError || 'bootstrap only' });
        }

        await sleep(THROTTLE_MS);
    }

    fs.writeFileSync(OUTPUT_PATH, serializeMetadataMap(metadataMap), 'utf8');

    console.log('\n--- Summary ---');
    console.log(`Total entries: ${Object.keys(metadataMap).length}/${listings.length}`);
    console.log(`OMDb fetched this run: ${omdbFetched}`);
    console.log(`Bootstrapped this run: ${bootstrapped}`);
    console.log(`OMDb misses / bootstrap: ${missed.length}`);
    console.log(`Poster misses: ${posterMisses.length}`);
    console.log(`Output: ${OUTPUT_PATH}`);

    if (missed.length) {
        console.log('\nOMDb misses:');
        for (const { listing, reason } of missed) {
            console.log(`  - ${listing}: ${reason}`);
        }
    }

    if (posterMisses.length) {
        console.log('\nPoster misses (add to scripts/poster-overrides.json byListing):');
        for (const listing of posterMisses) {
            console.log(`  - ${listing}`);
        }
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
