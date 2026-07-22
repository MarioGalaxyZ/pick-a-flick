/**
 * Check (default) or repair (--fix) UTF-8 corruption in app/main.js.
 *
 * Catches classic mojibake, ASCII ?? category keys, and lost · / — / … punctuation.
 * Always reads/writes via Node UTF-8 — do not rewrite main.js with PowerShell Set-Content.
 *
 *   node scripts/main-js-encoding.mjs
 *   node scripts/main-js-encoding.mjs --fix
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const mainPath = path.join(root, 'app', 'main.js');
const manifestPath = path.join(root, 'app', 'generated', 'win-clips-manifest.js');

const SKIP_MANIFEST_LABELS = new Set(['Farmhouse Films', 'U-Pick']);
const doFix = process.argv.includes('--fix');

/** ASCII label prefix for a category key; strips trailing ? left by emoji corruption. */
function categoryLabel(key) {
    let label = '';
    for (const char of key) {
        if (char.codePointAt(0) > 127) break;
        label += char;
    }
    return label.trimEnd().replace(/\?+$/u, '').trimEnd();
}

function countMojibake(text) {
    const emojiMojibake = (text.match(/ðŸ/g) || []).length;
    const dashMojibake = (text.match(/â€"/g) || []).length;
    return { emojiMojibake, dashMojibake, total: emojiMojibake + dashMojibake };
}

function extractMovieDatabaseKeys(main) {
    const dbStart = main.indexOf('const movieDatabase = {');
    const dbEnd = main.indexOf('\n    };', dbStart);
    if (dbStart === -1 || dbEnd === -1) {
        throw new Error('Could not locate movieDatabase block in main.js');
    }
    const dbSection = main.slice(dbStart, dbEnd);
    const keys = [...dbSection.matchAll(/^\s+"([^"]+)": \[/gm)].map((m) => m[1]);
    return { keys, dbStart, dbEnd };
}

function extractSequelStreetConstant(main) {
    const match = main.match(/const SEQUEL_STREET_CATEGORY\s*=\s*'([^']+)'/);
    return match ? match[1] : null;
}

function loadManifestKeys() {
    const manifest = fs.readFileSync(manifestPath, 'utf8');
    const keys = [...manifest.matchAll(/^\s+"([^"]+)": \{/gm)].map((m) => m[1]);
    const byLabel = new Map();
    for (const key of keys) {
        const label = categoryLabel(key);
        if (SKIP_MANIFEST_LABELS.has(label)) continue;
        byLabel.set(label, key);
    }
    return { keys, byLabel };
}

/** Phrases that must use em dash / ellipsis; corrupted form uses ASCII ?. */
function buildPunctuationFixes() {
    const goodPhrases = [
        'Pick A Flick — edit via the app or by hand.',
        'win-clips-manifest.js not loaded — run npm run refresh-audio',
        'Keeper full — discard a movie first.',
        'of 3 slots open — wait for spin to finish.',
        'of 3 slots open — wait for discard to finish.',
        'Missing category — add a tab-separated category or select a default.',
        ' — skipped.',
        'Ambiguous — ',
        'Already watched — return to rotation or remove from watched list first.',
        'One per line: Title (Year) or partial title — Ctrl+Enter to import',
        'One per line: Title (Year) [tab] Category — Ctrl+Enter to submit',
        'Need a Sequel Street mystery — pick slot C or adjust filters.',
        'Need a true random mystery — pick slot D or adjust filters.',
        'Arming coin…',
        'Click the coin or FLIP COIN to flip — Esc to cancel',
        'Click the coin to keep the winner — Esc to cancel',
        'All pick slots are full — click a slot to clear it.',
        'Click again to keep — Esc to cancel',
        'Click the joker to shuffle — Esc to cancel',
        'Pick two movies to flip or shuffle — optional picks C and D replace the Sequel Street and true random mystery tickets.',
        '// Stage A — emerge',
        '// Stage B — rest',
        '// Stage C — slow',
        '// Stage D — crossfade',
        '// Stage E — align',
        '// Stage F — stack',
        '// Stage G — stack',
        '// Stage H — deploy',
        '// Stage I — flip',
        '// Stage J — pre-shuffle',
    ];

    return goodPhrases.map((good) => {
        const bad = good
            .replaceAll('—', '?')
            .replaceAll('…', '?');
        return [bad, good];
    });
}

function collectIssues(main, manifestByLabel) {
    const issues = [];
    const { keys: dbKeys } = extractMovieDatabaseKeys(main);
    const sequelConst = extractSequelStreetConstant(main);
    const sequelDbKey = dbKeys.find((k) => categoryLabel(k) === 'SEQUEL STREET') ?? null;

    for (const key of dbKeys) {
        const label = categoryLabel(key);
        const expected = manifestByLabel.get(label);
        if (!expected) {
            issues.push({
                code: 'unknown-category',
                message: `movieDatabase key has no win-clips manifest match: ${JSON.stringify(key)}`,
            });
            continue;
        }
        if (key !== expected) {
            issues.push({
                code: 'category-key-mismatch',
                message: `Category key mismatch: ${JSON.stringify(key)} (expected ${JSON.stringify(expected)})`,
                from: key,
                to: expected,
            });
        }
    }

    if (!sequelConst) {
        issues.push({ code: 'missing-sequel-const', message: 'SEQUEL_STREET_CATEGORY constant not found' });
    } else if (sequelDbKey && sequelConst !== sequelDbKey) {
        issues.push({
            code: 'sequel-const-mismatch',
            message: `SEQUEL_STREET_CATEGORY ${JSON.stringify(sequelConst)} !== movieDatabase ${JSON.stringify(sequelDbKey)}`,
            from: sequelConst,
            to: sequelDbKey,
        });
    }

    const mojibake = countMojibake(main);
    if (mojibake.emojiMojibake > 0) {
        issues.push({
            code: 'mojibake-emoji',
            message: `Classic emoji mojibake markers found (${mojibake.emojiMojibake})`,
        });
    }
    if (mojibake.dashMojibake > 0) {
        issues.push({
            code: 'mojibake-dash',
            message: `Classic em-dash mojibake markers found (${mojibake.dashMojibake})`,
        });
    }

    const formatMetaIdx = main.indexOf('function formatResultMeta');
    if (formatMetaIdx === -1) {
        issues.push({ code: 'missing-formatResultMeta', message: 'formatResultMeta not found' });
    } else {
        const metaSlice = main.slice(formatMetaIdx, formatMetaIdx + 800);
        if (!metaSlice.includes("join(' · ')")) {
            issues.push({
                code: 'meta-separator',
                message: "formatResultMeta must use join(' · ') (U+00B7 middle dot)",
            });
        }
        if (metaSlice.includes("join(' ? ')")) {
            issues.push({
                code: 'meta-separator-corrupted',
                message: "formatResultMeta still has corrupted join(' ? ')",
            });
        }
    }

    if (main.includes("ARCHIVE ONLY'].filter(Boolean).join(' ? ')")) {
        issues.push({
            code: 'archive-meta-separator',
            message: "ARCHIVE ONLY meta join uses '?' instead of middle dot",
        });
    } else if (
        main.includes('ARCHIVE ONLY') &&
        !main.includes("ARCHIVE ONLY'].filter(Boolean).join(' · ')")
    ) {
        // Soft: only flag if the archive join exists in a corrupted or unexpected form
        const archiveJoin = main.match(/ARCHIVE ONLY'\]\.filter\(Boolean\)\.join\('([^']*)'\)/);
        if (archiveJoin && archiveJoin[1] !== ' · ') {
            issues.push({
                code: 'archive-meta-separator',
                message: `ARCHIVE ONLY meta join separator is ${JSON.stringify(archiveJoin[1])} (expected " · ")`,
            });
        }
    }

    for (const [bad] of buildPunctuationFixes()) {
        if (bad.includes('?') && main.includes(bad)) {
            issues.push({
                code: 'punctuation',
                message: `Corrupted punctuation phrase: ${JSON.stringify(bad.slice(0, 72))}${bad.length > 72 ? '…' : ''}`,
            });
        }
    }

    return issues;
}

function applyFixes(main, manifestByLabel) {
    let next = main;
    const { keys: dbKeys } = extractMovieDatabaseKeys(next);
    const replacements = [];

    for (const key of dbKeys) {
        const label = categoryLabel(key);
        const expected = manifestByLabel.get(label);
        if (expected && key !== expected) {
            replacements.push([key, expected]);
        }
    }

    const sequelConst = extractSequelStreetConstant(next);
    const sequelDbExpected = manifestByLabel.get('SEQUEL STREET');
    if (sequelConst && sequelDbExpected && sequelConst !== sequelDbExpected) {
        replacements.push([sequelConst, sequelDbExpected]);
    }

    // Longer keys first so partial overlaps do not mangle replacements
    replacements.sort((a, b) => b[0].length - a[0].length);
    const seen = new Set();
    for (const [from, to] of replacements) {
        if (seen.has(from) || from === to) continue;
        seen.add(from);
        const parts = next.split(from);
        if (parts.length === 1) continue;
        next = parts.join(to);
        console.log(`  key: ${JSON.stringify(from)} -> ${JSON.stringify(to)} (${parts.length - 1})`);
    }

    next = next.replaceAll('â€"', '—');
    next = next.replaceAll('ðŸŽ¬', '🎬');

    // Result-meta joins only (intentional mystery UI does not use join(' ? '))
    if (next.includes("join(' ? ')")) {
        const count = next.split("join(' ? ')").length - 1;
        next = next.replaceAll("join(' ? ')", "join(' · ')");
        console.log(`  meta join: join(' ? ') -> join(' · ') (${count})`);
    }

    for (const [bad, good] of buildPunctuationFixes()) {
        if (bad === good) continue;
        if (!next.includes(bad)) continue;
        const count = next.split(bad).length - 1;
        next = next.replaceAll(bad, good);
        const preview = bad.length > 48 ? `${bad.slice(0, 48)}…` : bad;
        console.log(`  punct: ${JSON.stringify(preview)} (${count})`);
    }

    return next;
}

function main() {
    if (!fs.existsSync(mainPath)) {
        console.error(`Missing ${mainPath}`);
        process.exit(1);
    }
    if (!fs.existsSync(manifestPath)) {
        console.error(`Missing ${manifestPath} — run npm run sync-win-clips first`);
        process.exit(1);
    }

    const { byLabel } = loadManifestKeys();
    let source = fs.readFileSync(mainPath, 'utf8');

    if (doFix) {
        console.log('Fixing app/main.js encoding…');
        const fixed = applyFixes(source, byLabel);
        if (fixed !== source) {
            fs.writeFileSync(mainPath, fixed, 'utf8');
            console.log('Wrote app/main.js (UTF-8).');
            source = fixed;
        } else {
            console.log('No encoding fixes needed.');
        }
    }

    const issues = collectIssues(source, byLabel);
    if (issues.length === 0) {
        console.log(doFix ? 'Encoding OK after fix.' : 'Encoding OK.');
        process.exit(0);
    }

    console.error(doFix ? '\nEncoding issues remain after fix:' : '\nEncoding issues in app/main.js:');
    for (const issue of issues) {
        console.error(`  - [${issue.code}] ${issue.message}`);
    }
    if (!doFix) {
        console.error('\nRun: npm run fix-encoding');
    }
    process.exit(1);
}

main();
