// Deprecated: use npm run generate-metadata instead (writes movie-metadata.js with posters + runtimes).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createOmdbKeySession, isOmdbKeyFailure } from './lib/omdb-api-key.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

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

function parseMovieListing(listing) {
    const yearMatch = listing.match(/\((\d{4})\)/);
    if (yearMatch) {
        return {
            cleanTitle: listing.split('(')[0].trim(),
            year: yearMatch[1],
            listing
        };
    }

    const trailingYearMatch = listing.match(/^(.+?)\s(\d{4})$/);
    if (trailingYearMatch) {
        return {
            cleanTitle: trailingYearMatch[1].trim(),
            year: trailingYearMatch[2],
            listing
        };
    }

    return { cleanTitle: listing.trim(), year: null, listing };
}

function parseOmdbRuntimeMinutes(runtimeString) {
    if (!runtimeString || runtimeString === 'N/A') return null;
    const match = runtimeString.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
}

function buildOmdbUrl(title, year, apiKey) {
    let url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;
    if (year) url += `&y=${encodeURIComponent(year)}`;
    return url;
}

async function fetchOmdbJson(title, year) {
    const response = await fetch(buildOmdbUrl(title, year, omdbKeys.key));
    const data = await response.json();
    if (
        data?.Response === 'False' &&
        isOmdbKeyFailure(data.Error) &&
        omdbKeys.maybeFallback(data)
    ) {
        const retry = await fetch(buildOmdbUrl(title, year, omdbKeys.key));
        return retry.json();
    }
    return data;
}

async function fetchRuntime(listing) {
    const { cleanTitle, year } = parseMovieListing(listing);
    if (!year) {
        console.warn(`SKIP (no year): ${listing}`);
        return null;
    }

    const data = await fetchOmdbJson(cleanTitle, year);

    if (data.Response === 'True' && data.Runtime && data.Runtime !== 'N/A') {
        return parseOmdbRuntimeMinutes(data.Runtime);
    }

    const retryData = await fetchOmdbJson(cleanTitle, null);
    if (retryData.Response === 'True' && retryData.Runtime && retryData.Runtime !== 'N/A') {
        return parseOmdbRuntimeMinutes(retryData.Runtime);
    }

    console.warn(`MISS: ${listing}`);
    return null;
}

function extractListings(mainJs) {
    const listings = [];
    const regex = /"([^"]+\(\d{4}\)[^"]*)"/g;
    let match;
    while ((match = regex.exec(mainJs)) !== null) {
        listings.push(match[1]);
    }
    return [...new Set(listings)];
}

const mainJsPath = path.join(ROOT, 'app', 'main.js');
const mainJs = fs.readFileSync(mainJsPath, 'utf8');
const listings = extractListings(mainJs);

console.log(`OMDb API key: ${omdbKeys.describe()} (length ${omdbKeys.key.length})`);

const runtimeMap = {};
for (const listing of listings) {
    const minutes = await fetchRuntime(listing);
    if (minutes != null) {
        runtimeMap[listing] = minutes;
    }
    await new Promise((r) => setTimeout(r, 250));
}

const lines = Object.entries(runtimeMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([title, mins]) => `        "${title.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}": ${mins},`)
    .join('\n');

console.log(`\n// ${Object.keys(runtimeMap).length} entries\nconst movieRuntimeMinutes = {\n${lines}\n};`);
