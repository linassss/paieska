const puppeteer = require('puppeteer');

async function paieskaLemonoje(ieskomaPreke) {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const adresas = 'https://www.lemona.lt/paieska/?other=false&sn.q=' + ieskomaPreke + '&sn.s=f_price';
  await page.goto(adresas, { waitUntil: 'networkidle0' });

  let data = await page.evaluate(() => {
    let preke = ['','',''];
    let kaina = ['','',''];
    let linkas = ['','',''];
    let pav = ['','',''];
    let daug = '';
    if (document.querySelector('td[class="td_name"]')) {
        preke[0] = document.querySelector('td[class="td_name"]').innerText;
        linkas[0] = 'https://www.lemona.lt' + document.querySelector('td[class="td_name"] > a').getAttribute("href");
        kaina[0] = document.querySelector('td[class="price_td"]').innerText;
        pav[0] = 'https://www.lemona.lt' + document.querySelector('tr[data-sna-product="true"] > td > a > img').getAttribute("src");
    }
    if (document.querySelector('#content_right > div > div > div > div > div > div > div.content_width > form > div > table > tbody > tr.product.row_gray > td.td_name > a')) {
        preke[1] = document.querySelector('#content_right > div > div > div > div > div > div > div.content_width > form > div > table > tbody > tr.product.row_gray > td.td_name > a').innerText;
        linkas[1] = 'https://www.lemona.lt' + document.querySelector('#content_right > div > div > div > div > div > div > div.content_width > form > div > table > tbody > tr.product.row_gray > td.td_name > a').getAttribute("href");
        kaina[1] = document.querySelector('#content_right > div > div > div > div > div > div > div.content_width > form > div > table > tbody > tr.product.row_gray > td.price_td > span').innerText;
        pav[1] = 'https://www.lemona.lt' + document.querySelector('#content_right > div > div > div > div > div > div > div.content_width > form > div > table > tbody > tr.product.row_gray > td:nth-child(1) > a > img').getAttribute("src");
    }
    if (document.querySelector('#content_right > div > div > div > div > div > div > div.content_width > form > div > table > tbody > tr:nth-child(6) > td.td_name > a')) {
        preke[2] = document.querySelector('#content_right > div > div > div > div > div > div > div.content_width > form > div > table > tbody > tr:nth-child(6) > td.td_name > a').innerText;
        linkas[2] = 'https://www.lemona.lt' + document.querySelector('#content_right > div > div > div > div > div > div > div.content_width > form > div > table > tbody > tr:nth-child(6) > td.td_name > a').getAttribute("href");
        kaina[2] = document.querySelector('#content_right > div > div > div > div > div > div > div.content_width > form > div > table > tbody > tr:nth-child(6) > td.price_td > span').innerText;
        pav[2] = 'https://www.lemona.lt' + document.querySelector('#content_right > div > div > div > div > div > div > div.content_width > form > div > table > tbody > tr:nth-child(6) > td:nth-child(1) > a > img').getAttribute("src");
    }
    if (document.querySelector('#content_right > div > div > div > div > div > div > div.content_width > form > div > table > tbody > tr:nth-child(8) > td.td_name > a')) {
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
  data.viskas = 'https://www.lemona.lt/paieska/?other=false&sn.q=' + ieskomaPreke + '&sn.s=f_price';
  return data
};

module.exports.paieskaLemonoje = paieskaLemonoje;