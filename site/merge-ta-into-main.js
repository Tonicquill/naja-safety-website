const fs = require('fs');

// Read all Tamil translation batches
const ta1 = JSON.parse(fs.readFileSync('translations-ta-p1.json', 'utf8'));
const ta2 = JSON.parse(fs.readFileSync('translations-ta-p2.json', 'utf8'));
const ta3 = JSON.parse(fs.readFileSync('translations-ta-p3.json', 'utf8'));
const ta4 = JSON.parse(fs.readFileSync('translations-ta-p4.json', 'utf8'));
const ta5 = JSON.parse(fs.readFileSync('translations-ta-p5.json', 'utf8'));
const ta = { ...ta1, ...ta2, ...ta3, ...ta4, ...ta5 };

console.log('Loaded Tamil translations:', Object.keys(ta).length, 'keys');

let mainJs = fs.readFileSync('js/main.js', 'utf8');
let replacedCount = 0;
let missingKeys = [];

// Process line by line for safety
const lines = mainJs.split('\n');
const updatedLines = lines.map(line => {
  // Match pattern: indent + key: { en:"...", ms:"...", zh:"...", ta:"..." },?  (with optional trailing comma)
  // Need to handle keys like chraEyebrow, navHome, etc.
  const match = line.match(/^(\s+)(\w+):(\s*\{\s*en:\"[^\"]+\",\s*ms:\")([^\"]+)(\",\s*zh:\")([^\"]+)(\",\s*ta:\")([^\"]+)(\"\s*\},?\s*)$/);
  if (!match) return line;

  const [, indent, key, prefix1, oldMs, prefix2, oldZh, prefix3, oldTa, suffix] = match;

  const newTa = ta[key];
  if (!newTa) {
    missingKeys.push(key);
    return line;
  }

  replacedCount++;
  return `${indent}${key}:${prefix1}${oldMs}${prefix2}${oldZh}${prefix3}${newTa}${suffix}`;
});

mainJs = updatedLines.join('\n');

fs.writeFileSync('js/main.js', mainJs);
console.log('Replaced', replacedCount, 'Tamil translations');
if (missingKeys.length) {
  console.warn('Missing keys:', missingKeys.slice(0, 20).join(', '), missingKeys.length > 20 ? `... and ${missingKeys.length - 20} more` : '');
}
console.log('Done');
