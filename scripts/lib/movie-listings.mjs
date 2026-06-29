import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function parseMovieListing(listing) {
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

export function normalizePartNumbersForOmdb(title) {
    const romanByPart = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X' };
    return title.replace(/\bPart\s+(\d+)\b/gi, (_, digits) => {
        const partNumber = parseInt(digits, 10);
        const roman = romanByPart[partNumber];
        return roman ? `Part ${roman}` : `Part ${digits}`;
    });
}

/** Cabinet listing -> OMDb search title when they differ */
export const titleAliasesByListing = {
    "Bill & Ted's Face The Music (2020)": 'Bill & Ted Face the Music'
};

export function getOmdbSearchTitle(listing) {
    return titleAliasesByListing[listing] ?? parseMovieListing(listing).cleanTitle;
}

export function buildOmdbUrl(title, year, apiKey) {
    let url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;
    if (year) {
        url += `&y=${encodeURIComponent(year)}`;
    }
    return url;
}

export function sanitizeOmdbPosterUrl(posterUrl) {
    if (!posterUrl || posterUrl === 'N/A') return posterUrl;

    return posterUrl
        .replace(/^http:\/\//i, 'https://')
        .replace(/\/\/ia\.media-imdb\.com\/images\//i, '//m.media-amazon.com/images/')
        .replace(/\/\/images-na\.ssl-images-amazon\.com\/images\//i, '//m.media-amazon.com/images/')
        .replace(/XkEyXkFqcG[^@]+@/, 'XkEyXkFqcGc@')
        .replace(/XkFqcGc[^@]+@/, 'XkFqcGc@');
}

export function extractListingsFromMainJs(mainJsPath) {
    const mainJs = fs.readFileSync(mainJsPath, 'utf8');
    const dbStart = mainJs.indexOf('const movieDatabase = {');
    if (dbStart === -1) {
        throw new Error('movieDatabase block not found in main.js');
    }
    const dbEnd = mainJs.indexOf('\n    };', dbStart);
    if (dbEnd === -1) {
        throw new Error('movieDatabase block end not found in main.js');
    }
    const dbSection = mainJs.slice(dbStart, dbEnd);
    const listings = [];
    const regex = /"([^"]+\(\d{4}\)[^"]*)"/g;
    let match;
    while ((match = regex.exec(dbSection)) !== null) {
        listings.push(match[1]);
    }
    return [...new Set(listings)];
}

export function extractRuntimeMinutesFromMainJs(mainJsPath) {
    const mainJs = fs.readFileSync(mainJsPath, 'utf8');
    const rtStart = mainJs.indexOf('const movieRuntimeMinutes = {');
    if (rtStart === -1) {
        return {};
    }
    const rtEnd = mainJs.indexOf('\n    };', rtStart);
    const rtSection = mainJs.slice(rtStart, rtEnd);
    const runtimes = {};
    const regex = /"((?:\\.|[^"\\])+)":\s*(\d+)/g;
    let match;
    while ((match = regex.exec(rtSection)) !== null) {
        const listing = match[1].replace(/\\"/g, '"');
        runtimes[listing] = parseInt(match[2], 10);
    }
    return runtimes;
}

export function getDefaultMainJsPath() {
    return path.join(__dirname, '..', '..', 'main.js');
}
