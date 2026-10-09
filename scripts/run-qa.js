const { chromium } = require('playwright-core');

(async () => {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const fs = require('fs');
  const execPath = fs.existsSync(edgePath) ? edgePath : (fs.existsSync(chromePath) ? chromePath : undefined);
  
  const browser = await chromium.launch({ 
    headless: true,
    executablePath: execPath 
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // Skip intro video completely
  await page.addInitScript(() => {
    sessionStorage.setItem('lokryd_intro_seen', 'true');
  });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  
  // 1. Scroll to Services section
  const servicesSec = page.locator('#services');
  await servicesSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'public/services_qa.png' });
  console.log('Captured services_qa.png');

  // 2. Scroll to Clients section
  const clientsSection = page.locator('text=Our Clients');
  await clientsSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'public/clients_qa.png' });
  console.log('Captured clients_qa.png');
  
  // 3. Scroll to Enquiry section
  const enquirySection = page.locator('#enquiry');
  await enquirySection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'public/enquiry_qa.png' });
  console.log('Captured enquiry_qa.png');

  await browser.close();
  console.log('QA script completed successfully');
})();
