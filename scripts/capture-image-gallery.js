const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const chromePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function main() {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 2400 } });
  await page.goto('http://localhost:3000/inspect-images.html', { waitUntil: 'networkidle' });
  
  const qaDir = path.join(__dirname, '..', 'qa');
  if (!fs.existsSync(qaDir)) fs.mkdirSync(qaDir, { recursive: true });
  
  await page.screenshot({ path: path.join(qaDir, 'extracted-images-grid.png'), fullPage: true });
  console.log('Saved qa/extracted-images-grid.png');
  await browser.close();
}

main().catch(console.error);
