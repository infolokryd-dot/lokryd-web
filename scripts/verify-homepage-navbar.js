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

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // 1. Verify Top State (scrollY = 0)
  const topHeaderBg = await page.evaluate(() => {
    const h = document.querySelector('header');
    return h ? window.getComputedStyle(h).backgroundColor : null;
  });
  console.log('Top Header computed background:', topHeaderBg);

  const topLogoWhiteOpacity = await page.evaluate(() => {
    const img = document.querySelector('header img[src*="logo-white.svg"]');
    return img ? window.getComputedStyle(img).opacity : null;
  });
  console.log('Top Logo-white opacity:', topLogoWhiteOpacity);

  const topCtaBg = await page.evaluate(() => {
    const cta = document.querySelector('header a[href="/contact"]');
    return cta ? window.getComputedStyle(cta).backgroundColor : null;
  });
  console.log('Top Contact Us button computed background:', topCtaBg);

  await page.screenshot({ path: path.join(QA_DIR, 'verify-hero-new.png') });

  // 2. Verify Scrolled State (scrollY = 350px)
  await page.evaluate(() => window.scrollTo({ top: 350, behavior: 'instant' }));
  await page.waitForTimeout(300);

  const scrolledHeaderBg = await page.evaluate(() => {
    const h = document.querySelector('header');
    return h ? window.getComputedStyle(h).backgroundColor : null;
  });
  console.log('Scrolled Header computed background (should be rgb(255, 255, 255)):', scrolledHeaderBg);

  const scrolledLogoFullOpacity = await page.evaluate(() => {
    const img = document.querySelector('header img[src*="logo-full.svg"]');
    return img ? window.getComputedStyle(img).opacity : null;
  });
  console.log('Scrolled Logo-full opacity:', scrolledLogoFullOpacity);

  const scrolledCtaBg = await page.evaluate(() => {
    const cta = document.querySelector('header a[href="/contact"]');
    return cta ? window.getComputedStyle(cta).backgroundColor : null;
  });
  console.log('Scrolled Contact Us button background (must be rgb(33, 31, 90)):', scrolledCtaBg);

  await page.screenshot({ path: path.join(QA_DIR, 'verify-navbar-scrolled-solid.png') });

  // 3. Test Client Showcase auto-scroll and mouse speed control
  console.log('Testing Client Showcase automatic scrolling...');
  const carouselLoc = page.locator('div[role="region"][aria-label*="Client partners showcase"]');
  const initialScroll = await carouselLoc.evaluate(el => el.scrollLeft);

  await page.waitForTimeout(1500);
  const autoScrolledPos = await carouselLoc.evaluate(el => el.scrollLeft);
  console.log('Carousel initial scrollLeft:', initialScroll, 'after 1.5s:', autoScrolledPos);
  const didAutoScroll = autoScrolledPos > initialScroll;
  console.log('Auto-scroll progressing right-to-left:', didAutoScroll);

  // Mouse move to the right (speed up)
  const box = await carouselLoc.boundingBox();
  if (box) {
    console.log('Hovering right edge of carousel to accelerate...');
    await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.5);
    await page.waitForTimeout(800);
    const fastScrollPos = await carouselLoc.evaluate(el => el.scrollLeft);
    console.log('Accelerated scrollLeft:', fastScrollPos);

    console.log('Hovering left edge to reverse/slow...');
    await page.mouse.move(box.x + box.width * 0.1, box.y + box.height * 0.5);
    await page.waitForTimeout(800);
    const reversedPos = await carouselLoc.evaluate(el => el.scrollLeft);
    console.log('Left-edge scrollLeft:', reversedPos);
  }

  await page.screenshot({ path: path.join(QA_DIR, 'verify-client-carousel.png') });

  // 4. Mobile testing (390px)
  console.log('Testing Mobile view (390px)...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(QA_DIR, 'verify-mobile-hero-new.png') });

  await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }));
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(QA_DIR, 'verify-mobile-scrolled-solid.png') });

  await browser.close();
  console.log('Verification finished successfully.');
}

main().catch(console.error);
