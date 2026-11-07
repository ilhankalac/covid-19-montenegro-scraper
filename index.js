const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth');
const firebase = require('firebase/app');
require('firebase/database');
const firebaseConfig = require('./firebase-config');
const { parseReport } = require('./parse');

const SOURCE_URL = 'https://www.ijzcg.me/';

puppeteer.use(stealth());
firebase.initializeApp(firebaseConfig);

async function scrapeLatestReport(browser) {
  const page = await browser.newPage();
  await page.goto(SOURCE_URL, { timeout: 0, waitUntil: 'networkidle0' });

  const links = await page.$$eval('a', anchors => anchors.map(a => a.href));
  const reportUrl = links.find(href => href.toLowerCase().includes('presjek'));
  if (!reportUrl) throw new Error('No report link found on ' + SOURCE_URL);

  await page.goto(reportUrl, { timeout: 0, waitUntil: 'networkidle0' });
  const report = parseReport(await page.$eval('body', el => el.innerText));
  if (!report) throw new Error('Could not parse report at ' + reportUrl);
  return report;
}

async function main() {
  const browser = await puppeteer.launch();
  try {
    const { date, activeCases } = await scrapeLatestReport(browser);
    // recovered and deaths are no longer published; kept so the app's data shape stays the same
    await firebase.database().ref('dailyStatistics').push({
      date,
      activeCases,
      recovered: 'Nepoznato',
      deaths: 'Nepoznato',
    });
    console.log(`Saved ${date}: ${activeCases} active cases`);
  } finally {
    await browser.close();
  }
}

main()
  .then(() => process.exit(0)) // the Firebase connection keeps the process alive otherwise
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  });
