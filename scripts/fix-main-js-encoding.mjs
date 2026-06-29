/**
 * One-shot repair for UTF-8 mojibake in main.js (PowerShell read/write without UTF-8).
 * Reads/writes main.js as UTF-8 only — do not run via PowerShell Set-Content.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const mainPath = path.join(root, 'main.js');
const manifestPath = path.join(root, 'win-clips-manifest.js');

function categoryLabel(key) {
  let label = '';
  for (const char of key) {
    if (char.codePointAt(0) > 127) break;
    label += char;
  }
  return label.trimEnd();
}

function countMojibake(text) {
  const emojiMojibake = (text.match(/ðŸ/g) || []).length;
  const dashMojibake = (text.match(/â€"/g) || []).length;
  return { emojiMojibake, dashMojibake, total: emojiMojibake + dashMojibake };
}

const manifest = fs.readFileSync(manifestPath, 'utf8');
const correctKeys = [...manifest.matchAll(/^\s+"([^"]+)": \{/gm)].map((m) => m[1]);
const correctByLabel = new Map(correctKeys.map((k) => [categoryLabel(k), k]));

let main = fs.readFileSync(mainPath, 'utf8');
const before = countMojibake(main);

const dbStart = main.indexOf('const movieDatabase = {');
const dbEnd = main.indexOf('\n    };', dbStart);
if (dbStart === -1 || dbEnd === -1) {
  console.error('Could not locate movieDatabase block in main.js');
  process.exit(1);
}

const dbSection = main.slice(dbStart, dbEnd);
const corruptedKeys = [...dbSection.matchAll(/^\s+"([^"]+)": \[/gm)].map((m) => m[1]);

const replacements = [];
for (const corrupted of corruptedKeys) {
  const label = categoryLabel(corrupted);
  const correct = correctByLabel.get(label);
  if (!correct) {
    console.warn(`No manifest match for category label: ${label}`);
    continue;
  }
  if (corrupted !== correct) {
    replacements.push([corrupted, correct]);
  }
}

for (const [from, to] of replacements) {
  const parts = main.split(from);
  if (parts.length === 1) {
    console.warn(`Pattern not found: ${from}`);
    continue;
  }
  main = parts.join(to);
  console.log(`  ${from} -> ${to} (${parts.length - 1} occurrence(s))`);
}

main = main.replaceAll('â€"', '—');
main = main.replaceAll('ðŸŽ¬', '🎬');

const after = countMojibake(main);
fs.writeFileSync(mainPath, main, 'utf8');

console.log('\nBefore:', before);
console.log('After:', after);
console.log(`Category key fixes: ${replacements.length}`);

if (after.total > 0) {
  console.error('\nMojibake remains — inspect main.js manually.');
  process.exit(1);
}

console.log('\nmain.js restored successfully.');
