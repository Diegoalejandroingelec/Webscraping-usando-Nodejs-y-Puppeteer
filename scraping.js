require('dotenv').config();
const puppeteer = require('puppeteer-extra')
const {computeNumberOfNoMatch,adaptPageForScraping,navigateUpToHistory}=require('./modules/historyNoMatchScraping');
//Email y contraseña de gmail para entrar a Dialogflow
input={
    username: process.env.EMAIL,
    password: process.env.PASSWORD
};

puppeteer.use(require('puppeteer-extra-plugin-stealth')())
;(async () => {
  console.log('EJECUTANDO EL WEB SCRAPING, ESTO PUEDE TARDAR UN MOMENTO...');
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: false
  })
    const page = await browser.newPage()    
    let page2=await navigateUpToHistory(page,browser);
    await adaptPageForScraping(page2);
    await computeNumberOfNoMatch(page2);
    //await page2.waitForTimeout(300000);
    await browser.close()
})()


