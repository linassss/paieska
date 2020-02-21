const puppeteer = require('puppeteer');

async function paieskaRCL(ieskomaPreke) {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const page2 = await browser.newPage();
  const adresas = 'https://rcl.lt/products/?q=' + ieskomaPreke; 
  await page.goto(adresas, { waitUntil: 'networkidle0' });

  let paieskosPuslapis = await page.evaluate(() => {
      if (document.querySelector('#search-result-groups > li:nth-child(1) > a')) {
        let paieskosRezultatas = document.querySelector('#search-result-groups > li:nth-child(1) > a').getAttribute('href');
        return 'https://rcl.lt/products/?sort=price&' + paieskosRezultatas.substr(1)
      }
      return 'https://rcl.lt/'
  });

  await page2.goto(paieskosPuslapis, { waitUntil: 'networkidle0' });
  let data = await page2.evaluate(() => {
    let preke = ['','',''];
    let kaina = ['','',''];
    let linkas = ['','',''];
    let pav = ['','',''];
    let daug = '';
    if (document.querySelector('#search-results > li:nth-child(1) > div.prod-info-col > h2')) {
        preke[0] = document.querySelector('#search-results > li:nth-child(1) > div.prod-info-col > h2').innerText;
        linkas[0] = 'https://rcl.lt' + document.querySelector('#search-results > li:nth-child(1) > div.prod-img-col > a').getAttribute('href');
        kaina[0] = document.querySelector('#search-results > li:nth-child(1) > form > table > tbody:nth-child(2) > tr > td:nth-child(2) > strong > data:nth-child(1)').innerText.replace('€', ' €');
        pav[0] = 'https://rcl.lt' + document.querySelector('#search-results > li:nth-child(1) > div.prod-img-col > div:nth-child(1) > p > img').getAttribute('data-src-full');
    }
    if (document.querySelector('#search-results > li:nth-child(2) > div.prod-info-col > h2')) {
        preke[1] = document.querySelector('#search-results > li:nth-child(2) > div.prod-info-col > h2').innerText;
        linkas[1] = 'https://rcl.lt' + document.querySelector('#search-results > li:nth-child(2) > div.prod-img-col > a').getAttribute('href');
        kaina[1] = document.querySelector('#search-results > li:nth-child(2) > form > table > tbody:nth-child(2) > tr > td:nth-child(2) > strong > data:nth-child(1)').innerText.replace('€', ' €');
        pav[1] = 'https://rcl.lt' + document.querySelector('#search-results > li:nth-child(2) > div.prod-img-col > div:nth-child(1) > p > img').getAttribute('data-src-full');
    }
    if (document.querySelector('#search-results > li:nth-child(3) > div.prod-info-col > h2')) {
        preke[2] = document.querySelector('#search-results > li:nth-child(3) > div.prod-info-col > h2').innerText;
        linkas[2] = 'https://rcl.lt' + document.querySelector('#search-results > li:nth-child(3) > div.prod-img-col > a').getAttribute('href');
        kaina[2] = document.querySelector('#search-results > li:nth-child(3) > form > table > tbody:nth-child(2) > tr > td:nth-child(2) > strong > data:nth-child(1)').innerText.replace('€', ' €');
        pav[2] = 'https://rcl.lt' + document.querySelector('#search-results > li:nth-child(3) > div.prod-img-col > div:nth-child(1) > p > img').getAttribute('data-src-full');
    }
    if (document.querySelector('#search-results > li:nth-child(4) > div.prod-info-col > h2')) {
        daug = 'Daugiau...';
  }
    return {
       preke,
       kaina,
       linkas,
       pav,
       daug
    }
  });

  await browser.close();
  data.viskas = 'https://rcl.lt/products/?q=' + ieskomaPreke;
  return data
};

module.exports.paieskaRCL = paieskaRCL;