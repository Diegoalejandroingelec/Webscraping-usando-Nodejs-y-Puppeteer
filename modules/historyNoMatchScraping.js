
const archivo= 'NoMatch.txt';
const fs= require('fs');
const navigateUpToHistory= async (page,browser)=>{
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
    
    await page2.goto('https://dialogflow.cloud.google.com/#/login',{ waitUntil: 'networkidle0'});
    await page2.click('button.md-raised.md-primary.md-btn-login.md-btn-google.md-button.md-ink-ripple');
    await page2.waitForTimeout(5000);
    await page2.click('button.btn-icon.toggle-left-panel');
    await page2.waitForTimeout(2000);
    const buttonPanel=await page2.evaluate(async()=>{
      let resp;
      function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      const nameBotScraping="BotEmpaquesDesarrollo";//NOMBRE DEL BOT AL CUAL SE LE VA A REALIZAR EL WEB SACRAPING
      const nameBot=document.querySelector("a.dropdown-toggle.md-ink-ripple").children[0];
      if(nameBot.textContent.trim()!==nameBotScraping){
        nameBot.click();
        await timeout(1000);
        const nameBots=document.querySelectorAll("ul.dropdown-menu>li.ng-scope>a")
        nameBots.forEach(bot=>{
          if(bot.children[0].textContent===nameBotScraping){
            bot.click();
          }
        })
        resp=true;
      }else{
        resp=false;
      }
      return resp
    })
    if(buttonPanel===true){
      await page2.waitForTimeout(6000);
      await page2.click('button.btn-icon.toggle-left-panel');
    }
    await page2.waitForTimeout(2000);
    await page2.click('#link-history');
    return page2
}

const adaptPageForScraping= async (page2)=>{
  await page2.waitForTimeout(5000);
  await page2.evaluate(()=>{
    const dateStart='Jan 9, 2020';//FECHA DE INICIO PARA REVISAR NO MATCH
    const dateEnd='Feb 16, 2021';//FECHA DE FIN PARA REVISAR NO MATCH
    const dateInput=document.querySelectorAll("input.md-datepicker-input");
    dateInput.forEach((element)=>{
      element.value = "";
    })
    dateInput[0].value=dateStart;
    dateInput[1].value=dateEnd;
    console.log(dateInput[0])
  });
  await page2.type('input.md-datepicker-input', " ");
  // await page.type('#identifierId', input.username);
  await page2.waitForTimeout(2000);
  await page2.evaluate(()=>{
    document.querySelector('md-icon.refresh.material-icons.flex-50').click();
  })
  await page2.waitForTimeout(4000);
  await page2.click('div.filter-panel.layout-row>div.layout-row.flex-40>md-select.md-no-underline.sessions.ng-pristine.ng-valid.ng-empty');
    await page2.evaluate(()=>{
      let noMatch=document.querySelectorAll('md-content._md>md-option.md-ink-ripple>div.md-text');
      noMatch.forEach(element => {
        if (element.textContent==='No match conversations'){
          element.click();
          element.click();
        }
      });
    });

}

const computeNumberOfNoMatch= async (page2)=>{
  await page2.waitForTimeout(5000);
  let [Btndata, noMatchwords]=await page2.evaluate(async () => {
    const noMatchwords=[];
    function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    let contNoMatch=0;
    let info=true
    while(info===true){
      const buttonNext=document.querySelector('div.page-nav-buttons.unselectable').children[1];
      let classBtn=buttonNext.getAttribute('class');
      const conversations=document.querySelector('div.conversations-component').children;
      
      for (const conversation of conversations) {
        conversation.children[0].click();
        console.log('CONVERSACION ABIERTA')

        const msgs=document.querySelector("div.content-section-interactions").children;
        for(let i=1; i<msgs.length;i++){
          if(msgs[i].children[1].children[0].children[1].textContent==='No matched intent'){
            noMatchwords.push(msgs[i].children[0].children[0].children[1].textContent)
            console.log(msgs[i].children[0].children[0].children[1].textContent);
          }
        }

        //await timeout(500)
      }
      //console.log('acabo el for')
      //console.log(noMatchwords.length);

      
      if(classBtn==='next material-icons'){
        buttonNext.click()
        await timeout(2000)
        //console.log('click!!!!')
        contNoMatch+=25
        //console.log("Available", contNoMatch)
      }else{
        //console.log("NOT Available", contNoMatch)
        info=false;
      }
    }
    return [contNoMatch,noMatchwords]
  });
  await page2.waitForTimeout(2000);
  const BtndataFinal= await page2.evaluate(() => {
    let contNoMatch=0;
    contNoMatch+=document.querySelector('div.conversations-component').children.length;
    return contNoMatch    
  })
  Btndata+=BtndataFinal;
  console.log('La cantidad de sesiones con no match es: '+Btndata);
  console.log('La cantidad de No Match es: '+noMatchwords.length);
  //console.log('Las inputs con No Match son: '+noMatchwords);
  fs.writeFileSync(archivo,noMatchwords.toString());
}

module.exports={computeNumberOfNoMatch,adaptPageForScraping,navigateUpToHistory}