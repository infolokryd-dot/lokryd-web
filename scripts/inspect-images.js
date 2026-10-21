const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'images', 'transport');
const files = fs.readdirSync(dir).filter(f => f.startsWith('pdf-') && fs.statSync(path.join(dir, f)).size > 40000);

let html = `<!DOCTYPE html>
<html>
<head>
<title>Transport Images Inspection</title>
<style>
body { background: #0c0f17; color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 20px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
.card { background: #161e2e; border: 1px solid #233148; border-radius: 8px; overflow: hidden; }
img { width: 100%; height: 220px; object-fit: contain; background: #090d14; display: block; }
.info { padding: 10px 14px; font-size: 13px; font-family: monospace; }
</style>
</head>
<body>
<h1>Extracted Images from Lokryd Profiles (${files.length})</h1>
<div class="grid">
`;

for (const f of files) {
  const stat = fs.statSync(path.join(dir, f));
  html += `  <div class="card">
    <img src="/images/transport/${f}" alt="${f}" loading="lazy" />
    <div class="info">${f} (${Math.round(stat.size / 1024)} KB)</div>
  </div>\n`;
}

html += `</div></body></html>`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'inspect-images.html'), html);
console.log('Saved public/inspect-images.html');
