import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log('PAGE LOG:', msg.type(), msg.text());
  });

  page.on('pageerror', error => {
    console.error('PAGE ERROR:', error.message);
  });

  page.on('requestfailed', request => {
    console.error('REQUEST FAILED:', request.url(), request.failure()?.errorText);
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  console.log('Page loaded successfully');
  await browser.close();
})();
