const fs = require('fs');

function extractPdfStrings(filePath) {
  const buf = fs.readFileSync(filePath);
  const str = buf.toString('latin1');
  const matches = [];
  const regex = /\/E\s*\(([^()]+)\)/g;
  let m;
  while ((m = regex.exec(str)) !== null) {
    matches.push(m[1]);
  }
  return matches;
}

console.log('=== Company Profile ===');
const p1 = extractPdfStrings('D:/LOKRYD/Company Profile - Lokryd -1.pdf');
console.log(p1.filter(s => s.toLowerCase().includes('client') || s.toLowerCase().includes('partner') || s.toLowerCase().includes('tech') || s.length < 30).slice(0, 40));

console.log('=== Employee Transport Profile ===');
const p2 = extractPdfStrings('D:/LOKRYD/Lokryd Employee Transport Profile.pdf');
console.log(p2.filter(s => s.toLowerCase().includes('client') || s.toLowerCase().includes('partner') || s.toLowerCase().includes('tech') || s.length < 30).slice(0, 40));
