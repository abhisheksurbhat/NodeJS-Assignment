const Crawler = require('js-crawler');
const args = require('yargs');

console.log(args);

new Crawler().configure({depth: 2})
    .crawl('http://www.wiprodigital.com', (page) => {
        if(page.response.socket._host === 'wiprodigital.com') {
            console.log(page.url);
        }
    })