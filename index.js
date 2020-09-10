const download = require('image-downloader');
const request = require('request-promise');
const cheerio = require('cheerio');
// download the required libaries
const fs = require('fs');

fs.mkdir('./memes', function (err) {
  if (err) {
    console.log('the folder already exitst');
  } else {
    console.log('New directory successfully created.');
  }
});

(async () => {
  const memeURL = 'https://memegen.link/examples';

  const response = await request(memeURL);

  const $ = cheerio.load(response);
  let memeURLArray = [];
  memeURLArray.push(
    'https://api.memegen.link/images/bender/your_text/goes_here.jpg?preview=true&watermark=none',
  );
  for (let i = 1; i < 10; i++) {
    let name = $(
      'body > div.meme-templates > div.row > div:nth-child(' +
        i +
        ') > a > img',
    ).attr('src');
    memeURLArray.push('https://api.memegen.link/images' + name);
  }

  for (let i = 0; i < 11; i++) {
    const options = {
      url: memeURLArray[i],
      dest: './memes/image' + i + '.png', // will be saved to /path/to/dest/image.jpg
    };

    download
      .image(options)
      .then(({ filename }) => {
        console.log('Saved to', filename); // saved to /path/to/dest/image.jpg
      })
      .catch((err) => console.error(err));
  }
})();
