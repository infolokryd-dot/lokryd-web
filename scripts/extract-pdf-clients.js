const fs = require('fs');

const buf = fs.readFileSync('D:/LOKRYD/Company Profile - Lokryd -1.pdf');
const str = buf.toString('latin1');

// Search for text showing client names
const clientMatches = str.match(/\(([^()]{3,40})\)\s*Tj/g);
if (clientMatches) {
  console.log('Tj matches around clients:', clientMatches.slice(0, 100));
}

// Search for Alt text or StructElem text
const altMatches = str.match(/\/Alt\s*\(([^()]+)\)/g);
if (altMatches) {
  console.log('Alt matches:', altMatches);
}

// Search for ActualText
const actualTextMatches = str.match(/\/ActualText\s*\(([^()]+)\)/g);
if (actualTextMatches) {
  console.log('ActualText matches:', actualTextMatches);
}
