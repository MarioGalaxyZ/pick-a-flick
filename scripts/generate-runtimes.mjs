// Deprecated: use npm run generate-metadata instead (writes movie-metadata.js with posters + runtimes).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OMDB_API_KEY = '14e2f0ac';

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

function buildOmdbUrl(title, year) {
    let url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`;
    if (year) url += `&y=${encodeURIComponent(year)}`;
    return url;
}

async function fetchRuntime(listing) {
    const { cleanTitle, year } = parseMovieListing(listing);
    if (!year) {
        console.warn(`SKIP (no year): ${listing}`);
        return null;
    }

    const response = await fetch(buildOmdbUrl(cleanTitle, year));
    const data = await response.json();

    if (data.Response === 'True' && data.Runtime && data.Runtime !== 'N/A') {
        return parseOmdbRuntimeMinutes(data.Runtime);
    }

    const retry = await fetch(buildOmdbUrl(cleanTitle, null));
    const retryData = await retry.json();
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

const mainJsPath = path.join(__dirname, '..', 'app', 'main.js');
const mainJs = fs.readFileSync(mainJsPath, 'utf8');
const listings = extractListings(mainJs);

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
