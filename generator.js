const request = require('request-promise');
const cheerio = require('cheerio');
const download = require('image-downloader');
// download the required libaries
const command = process.argv.slice(2).join('_');
console.log(command)

async function URL() {
  const memeURL = 'https://memegen.link/examples';
  const response = await request(memeURL);
  const $ = cheerio.load(response);
  let memeURLArray = [];
  $('img').each((i, element) => {
    memeURLArray.push(
      'https://api.memegen.link/images' + $(element).attr('src'),
    );
  });
  const randomNumbers = Math.floor(Math.random() * 130 + 1);
  let x = memeURLArray[randomNumbers];
  return (x = x.split('/').splice(0, 5).join('/'));
  
}

async function y() {
  let y = await URL();

  let finalURL = y + '/' + command;
  return finalURL;
}
y();
async function x() {
  const options = {
    url: (await y()) + '.jpg',
    dest: './memes/tt.png', // will be saved to /path/to/dest/image.jpg
  };

  download
    .image(options)
    .then(({ filename }) => {
      console.log('Saved to', filename); // saved to /path/to/dest/image.jpg
    })
    .catch((err) => console.error(err));
}
x();
