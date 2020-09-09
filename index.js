const request = require('request-promise');
const cheerio = require('cheerio');
// download the required libaries
(async () => {
  const memeURL = 'https://memegen.link/examples';

  const response = await request(memeURL);

  const $ = cheerio.load(response);
  let memeURLArray = [];
  for (let i = 1; i < 11; i++) {
    let name = $(
      'body > div.meme-templates > div.row > div:nth-child(' +
        i +
        ') > a > img',
    ).attr('src');
    memeURLArray.push(name);
  }
  console.log(memeURLArray);
})();
