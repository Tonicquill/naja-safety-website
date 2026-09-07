const fs = require('fs');

// Read translation files
const zh = JSON.parse(fs.readFileSync('translations-zh.json', 'utf8'));
const ms1 = JSON.parse(fs.readFileSync('translations-ms-p1.json', 'utf8'));
const ms2 = JSON.parse(fs.readFileSync('translations-ms-p2.json', 'utf8'));
const ms = { ...ms1, ...ms2 };

// Read original dictionary entries
const entriesLines = fs.readFileSync('new-dictionary-entries.js', 'utf8').split('\n');

// Process each line: replace ms, zh, ta values
const updatedLines = entriesLines.map(line => {
  // Match pattern:    keyName: { en:"...", ms:"...", zh:"...", ta:"..." },
  const match = line.match(/^(\s+)(\w+):(\s*\{\s*en:\"[^\"]+\",\s*ms:\")([^\"]+)(\",\s*zh:\")([^\"]+)(\",\s*ta:\")([^\"]+)(\"\s*\},?\s*)$/);
  if (!match) return line;

  const [, indent, key, prefix1, oldMs, prefix2, oldZh, prefix3, oldTa, suffix] = match;

  const newMs = ms[key] || oldMs;
  const newZh = zh[key] || oldZh;

  // Tamil is still English for now - will be updated later
  return `${indent}${key}:${prefix1}${newMs}${prefix2}${newZh}${prefix3}${oldTa}${suffix}`;
});

const updatedBlock = updatedLines.join('\n');

// Read main.js
let mainJs = fs.readFileSync('js/main.js', 'utf8');

// Find the start and end of the new dictionary entries block
const startMarker = '// Service Landing Pages (auto-generated)';
const startIdx = mainJs.indexOf(startMarker);
if (startIdx === -1) {
  console.error('Could not find start marker in main.js');
  process.exit(1);
}

// Find the line after the last entry (the closing } of fullSiteDictionary)
// The block starts at startMarker and ends at the line before "  };"
const blockStart = mainJs.lastIndexOf('\n', startIdx) + 1;
const blockEnd = mainJs.indexOf('\n  };', blockStart);
if (blockEnd === -1) {
  console.error('Could not find end of dictionary block');
  process.exit(1);
}

const before = mainJs.substring(0, blockStart);
const after = mainJs.substring(blockEnd + 1); // keep the newline before "  };"

mainJs = before + updatedBlock + after;

fs.writeFileSync('js/main.js', mainJs);
console.log('Successfully merged Malay and Chinese translations into main.js');
