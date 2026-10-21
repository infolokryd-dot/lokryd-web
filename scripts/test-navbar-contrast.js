const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const chromePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const QA_DIR = path.join(__dirname, '..', 'qa');
if (!fs.existsSync(QA_DIR)) fs.mkdirSync(QA_DIR, { recursive: true });

async function main() {
  console.log('Launching browser with:', chromePath);
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Homepage at top (Dark Hero)
  console.log('Loading Homepage top...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(QA_DIR, 'nav-dark-hero.png') });

  // Check which logo is visible at top
  const topLogoWhiteOpacity = await page.evaluate(() => {
    const img = document.querySelector('header img[src*="logo-white.svg"]');
    return img ? window.getComputedStyle(img).opacity : null;
  });
  console.log('Top (Hero) logo-white opacity:', topLogoWhiteOpacity);

  // 2. Scroll to Clients Section (Light background)
  console.log('Scrolling to Clients Section (Light background)...');
  await page.evaluate(() => {
    const clientsSection = document.querySelector('section.bg-\\[\\#FFFFFF\\]') || document.querySelector('section:has(h2:has-text("Trusted by Our Clients"))');
    if (clientsSection) {
      clientsSection.scrollIntoView({ behavior: 'instant' });
    } else {
      window.scrollTo({ top: 950, behavior: 'instant' });
    }
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(QA_DIR, 'nav-light-section.png') });

  const lightLogoFullOpacity = await page.evaluate(() => {
    const img = document.querySelector('header img[src*="logo-full.svg"]');
    return img ? window.getComputedStyle(img).opacity : null;
  });
  console.log('Light Section logo-full opacity:', lightLogoFullOpacity);

  // 3. Scroll to Footer (Dark background)
  console.log('Scrolling to Footer (Dark background)...');
  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(QA_DIR, 'nav-footer-dark.png') });

  const footerLogoWhiteOpacity = await page.evaluate(() => {
    const img = document.querySelector('header img[src*="logo-white.svg"]');
    return img ? window.getComputedStyle(img).opacity : null;
  });
  console.log('Footer (Dark) logo-white opacity:', footerLogoWhiteOpacity);

  // 4. Check /services at top and inside pinned section
  console.log('Navigating to /services...');
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(QA_DIR, 'nav-services-hero.png') });

  // Scroll into pinned light showcase
  await page.evaluate(() => window.scrollTo({ top: 1100, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(QA_DIR, 'nav-services-pinned.png') });

  // 5. Check Mobile (390px)
  console.log('Testing Mobile view...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(QA_DIR, 'nav-mobile-hero.png') });

  await page.evaluate(() => window.scrollTo({ top: 750, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(QA_DIR, 'nav-mobile-light.png') });

  await browser.close();
  console.log('Done testing navbar contrast & transparency.');
}

main().catch(console.error);
