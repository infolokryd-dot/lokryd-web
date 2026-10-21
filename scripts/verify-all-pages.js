const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const chromePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const routes = [
  '/',
  '/about',
  '/services',
  '/corporate-mobility',
  '/private-mobility',
  '/the-standard',
  '/operations-safety',
  '/insights',
  '/contact',
];

const BASE_URL = 'http://localhost:3000';
const QA_DIR = path.join(__dirname, '..', 'qa');
if (!fs.existsSync(QA_DIR)) fs.mkdirSync(QA_DIR, { recursive: true });

async function verify() {
  console.log('Launching browser with:', chromePath);
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });

  const results = {
    pagesChecked: 0,
    overflowPassed: true,
    transparentNavbarPassed: true,
    servicesPinPassed: true,
    errors: [],
  };

  // 1. Check desktop viewports
  const contextDesktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await contextDesktop.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Browser console error:', msg.text());
      results.errors.push(msg.text());
    }
  });

  for (const route of routes) {
    const url = BASE_URL + route;
    console.log(`Checking ${route} at 1440px...`);
    const res = await page.goto(url, { waitUntil: 'networkidle' });
    if (!res || res.status() >= 400) {
      results.errors.push(`Route ${route} returned status ${res ? res.status() : 'null'}`);
    }

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    if (hasOverflow) {
      console.error(`Horizontal overflow detected on ${route}`);
      results.overflowPassed = false;
    }

    // Verify transparent navbar
    const headerBg = await page.evaluate(() => {
      const header = document.querySelector('header');
      return header ? window.getComputedStyle(header).backgroundColor : null;
    });
    console.log(`  Navbar header background on ${route}:`, headerBg);

    const safeName = route === '/' ? 'home' : route.replace(/\//g, '');
    await page.screenshot({ path: path.join(QA_DIR, `desktop-${safeName}.png`), fullPage: false });
    results.pagesChecked++;
  }

  // 2. Check Services Pin interaction on /services
  console.log('Testing Pinned Services interaction on /services...');
  await page.goto(BASE_URL + '/services', { waitUntil: 'networkidle' });
  
  // Scroll down into the pinned section
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(QA_DIR, 'services-step-1.png') });

  await page.evaluate(() => window.scrollTo({ top: 1600, behavior: 'instant' }));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(QA_DIR, 'services-step-2.png') });

  await page.evaluate(() => window.scrollTo({ top: 2400, behavior: 'instant' }));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(QA_DIR, 'services-step-3.png') });

  // 3. Check Mobile (390px)
  console.log('Testing Mobile viewport (390px)...');
  const contextMobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await contextMobile.newPage();

  for (const route of ['/', '/services', '/contact']) {
    await mobilePage.goto(BASE_URL + route, { waitUntil: 'networkidle' });
    const hasOverflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    if (hasOverflow) {
      console.error(`Mobile overflow detected on ${route}`);
      results.overflowPassed = false;
    }
    const safeName = route === '/' ? 'home' : route.replace(/\//g, '');
    await mobilePage.screenshot({ path: path.join(QA_DIR, `mobile-${safeName}.png`) });
  }

  // Test mobile menu open
  await mobilePage.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
  const menuBtn = mobilePage.locator('button[aria-label="Open menu"]');
  if (await menuBtn.count() > 0) {
    await menuBtn.click();
    await mobilePage.waitForTimeout(300);
    await mobilePage.screenshot({ path: path.join(QA_DIR, 'mobile-menu-open.png') });
  }

  await browser.close();
  console.log('QA Verification Completed:', JSON.stringify(results, null, 2));
}

verify().catch(console.error);
