const args = require('yargs');
const axios = require('axios');
const jsdom = require('jsdom');
const fs = require('fs');
const {
  JSDOM
} = jsdom;

const site = args.argv.site;
const domain = site.split('/')[2];

getSiteData = async (site) => {
  try {
    let response = await axios.get(site);
    let {
      document
    } = new JSDOM(response.data).window;
    return document;
  } catch (error) {
    return;
  }
}
getLinks = async (document, tag) => {
  try {
    let links = await document.getElementsByTagName(tag);
    return links;
  } catch (error) {
    return;
  }
}
getLinkStatus = (link) => {
  try {
    return (link.split('/')[2] === domain) ? true : false;
  } catch (error) {
    console.log("Error here");
    return;
  }
}

getOneLevelLinks = async (site, count) => {
  try {
    let document = await getSiteData(site);
    let aLinks = await getLinks(document, 'a');
    let iLinks = await getLinks(document, 'img');
    let oLinks = await getLinks(document, 'link');
    let cleanALinks = [];
    let followALinks = [];
    let cleanILinks = [];
    let cleanOLinks = [];
    for (const link of aLinks) {
      if (getLinkStatus(link.href) && count === 0) {
        followALinks.push(link.href);
      }
      cleanALinks.push(link.href);
    }
    for (const link of iLinks) {
      cleanILinks.push(link.src);
    }
    for (const link of oLinks) {
      cleanOLinks.push(link.href);
    }
    let finalOutput = {
      followLinks: followALinks,
      links: cleanALinks,
      imgLinks: cleanILinks,
      otherLinks: cleanOLinks
    }
    return finalOutput;
  } catch (error) {
    return;
  }
}

(
  async () => {
    let firstLinks = await getOneLevelLinks(site, 0);
    let finalMainLinks = [];
    let finalILinks = [];
    let finalOLinks = [];
    finalMainLinks = Array.from(firstLinks.links);
    finalILinks = Array.from(firstLinks.imgLinks);
    finalOLinks = Array.from(firstLinks.otherLinks);
    try {
      for (const followLink of firstLinks.followLinks) {
        let levelLinks = await getOneLevelLinks(followLink, 1);
        for (const i of levelLinks.links) {
          if (!finalMainLinks.includes(i)) {
            finalMainLinks.push(i);
          }
        }
        for (const i of levelLinks.imgLinks) {
          if (!finalILinks.includes(i)) {
            finalILinks.push(i);
          }
        }
        for (const i of levelLinks.otherLinks) {
          if (!finalOLinks.includes(i)) {
            finalOLinks.push(i);
          }
        }
      }
    } catch (error) {
      // continue;
    }

    let finalOutput = {
      links: finalMainLinks,
      imgLinks: finalILinks,
      otherLinks: finalOLinks
    }
    fs.writeFileSync(__dirname + '/data/crawlerOutput.json', JSON.stringify(finalOutput, null, 4));
  }
)()