require('dotenv').config();

const cheerio = require('cheerio');
//Email y contraseña de gmail para entrar a Dialogflow
input={
    username: process.env.EMAIL,
    password: process.env.PASSWORD
};


const navigateUpToAnalytics= async (page,browser)=>{
    await page.goto('https://accounts.google.com/o/oauth2/auth/identifier?redirect_uri=storagerelay%3A%2F%2Fhttps%2Fdialogflow.cloud.google.com%3Fid%3Dauth978297&response_type=permission%20id_token&scope=email%20profile%20openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloud-platform%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Factions.builder%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fassistant%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Flogging.write&openid.realm&client_id=1016740739912-2dfjqgvhb5aqn920vvarkfniio1cahlh.apps.googleusercontent.com&ss_domain=https%3A%2F%2Fdialogflow.cloud.google.com&fetch_basic_profile=true&gsiwebsdk=2&flowName=GeneralOAuthFlow'); 
    await page.type('#identifierId', input.username);
    await page.click('button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc');
    await page.waitForTimeout(2000);
    await page.type('input.whsOnd.zHQkBf', input.password);
    await page.click('button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc');
    await page.waitForTimeout(5000);
    let cookies = await page.cookies();
    await page.close();
    let page2 = await browser.newPage();
    await page2.setCookie(...cookies);
    // Open the page as a logged-in user
    await page2.goto('https://dialogflow.cloud.google.com/#/login',{ waitUntil: 'networkidle0'});
    await page2.click('button.md-raised.md-primary.md-btn-login.md-btn-google.md-button.md-ink-ripple');
    await page2.waitForTimeout(5000);
    await page2.click('button.btn-icon.toggle-left-panel');
    await page2.waitForTimeout(1000);
    await page2.click('#link-analytics');
    await page2.waitForTimeout(3000);
    await page2.click('md-tab-item[tabindex="-1"]');
    return page2
}
const puppeteer = require('puppeteer-extra')
// Enable stealth plugin with all evasions
puppeteer.use(require('puppeteer-extra-plugin-stealth')())
;(async () => {
  // Launch the browser in headless mode and set up a page.
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true
  })
    const page = await browser.newPage()    
    let page2=await navigateUpToAnalytics(page,browser);
    await page2.waitForTimeout(10000);
    
    let data =await page2.evaluate(() => {
        let sessions = document.querySelector('div[class="charts ng-scope"]').children[0].innerHTML;
        let queriesPerSession=document.querySelector('div[class="charts ng-scope"]').children[1].innerHTML;
        

        return {
            sessions:sessions,
            queriesPerSession:queriesPerSession
        };
      });
    //console.log(data);
    let $ = cheerio.load(data.sessions);
    console.log('Sesiones en los ultimos 7 dias: '+$('number-display > span').text());
    $ = cheerio.load(data.queriesPerSession);
    console.log('Queries por sesión en los ultimos 7 dias: '+$('number-display > span').text());


    await page2.waitForTimeout(90000);

    
    await browser.close()
})()

































/*
input={
    username: "ramirezvargasdiegoalejandro2@gmail.com",
    password: "queleimporta1"
};
const puppeteer = require('puppeteer-extra')
// Enable stealth plugin with all evasions
puppeteer.use(require('puppeteer-extra-plugin-stealth')())
;(async () => {
  // Launch the browser in headless mode and set up a page.
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: false
  })
    const page = await browser.newPage()
    await page.goto('https://dialogflow.cloud.google.com/#/login');
    await page.waitForTimeout(2000);
    await page.click('button.md-raised.md-primary.md-btn-login.md-btn-google.md-button.md-ink-ripple');
    await page.waitForTimeout(90000);
    //const pages = await browser.pages(); 
    //const popup = pages[pages.length - 1];


    await popup.type('#identifierId', input.username);
    await popup.click('button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc');
    await popup.waitForTimeout(2000);
    await popup.type('input.whsOnd.zHQkBf', input.password);
    await popup.click('button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc');

    await page.waitForTimeout(50000);
    await browser.close()
})()*/

