const puppeteer = require('puppeteer');

async function paieskaEvitoje(ieskomaPreke) {

  const browser = await puppeteer.launch();
  const page4 = await browser.newPage();
  const adresasEvita = 'https://www.evita.lt/?route=product/search&sort=p.price&order=ASC&search=' + ieskomaPreke;
  await page4.goto(adresasEvita, { waitUntil: 'networkidle0' });

  let data = await page4.evaluate(() => {
    let preke = ['','',''];
    let kaina = ['','',''];
    let linkas = ['','',''];
    let pav = ['','',''];
    let daug = '';
    if (document.querySelector('#content-cat > div.product-list > div:nth-child(1) > div.left > div.name > a')) {
        preke[0] = document.querySelector('#content-cat > div.product-list > div:nth-child(1) > div.left > div.name > a').innerText;
        linkas[0] = document.querySelector('#content-cat > div.product-list > div:nth-child(1) > div.left > div.name > a').getAttribute('href');
        kaina[0] = document.querySelector('#content-cat > div.product-list > div:nth-child(1) > div.right > div.price').innerText.replace('€ su PVM', ' €');
        pav[0] = document.querySelector('#content-cat > div.product-list > div:nth-child(1) > div.left > div.image > a > img').getAttribute('src');
    }
    if (document.querySelector('#content-cat > div.product-list > div:nth-child(2) > div.left > div.name > a')) {
        preke[1] = document.querySelector('#content-cat > div.product-list > div:nth-child(2) > div.left > div.name > a').innerText;
        linkas[1] = document.querySelector('#content-cat > div.product-list > div:nth-child(2) > div.left > div.name > a').getAttribute('href');
        kaina[1] = document.querySelector('#content-cat > div.product-list > div:nth-child(2) > div.right > div.price').innerText.replace('€ su PVM', ' €');
        pav[1] = document.querySelector('#content-cat > div.product-list > div:nth-child(2) > div.left > div.image > a > img').getAttribute('src');
    }
    if (document.querySelector('#content-cat > div.product-list > div:nth-child(3) > div.left > div.name > a')) {
        preke[2] = document.querySelector('#content-cat > div.product-list > div:nth-child(3) > div.left > div.name > a').innerText;
        linkas[2] = document.querySelector('#content-cat > div.product-list > div:nth-child(3) > div.left > div.name > a').getAttribute('href');
        kaina[2] = document.querySelector('#content-cat > div.product-list > div:nth-child(3) > div.right > div.price').innerText.replace('€ su PVM', ' €');
        pav[2] = document.querySelector('#content-cat > div.product-list > div:nth-child(3) > div.left > div.image > a > img').getAttribute('src');
    }
    if (document.querySelector('#content-cat > div.product-list > div:nth-child(4) > div.left > div.name > a')) {
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
  data.viskas = 'https://www.evita.lt/?route=product/search&sort=p.price&order=ASC&search=' + ieskomaPreke;
  return data
};

module.exports.paieskaEvitoje = paieskaEvitoje;