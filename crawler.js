/* 
  Crawler program to go through a site and return all main links, and other
  links(like img tags)
      -Abhishek Surbhat
*/

const args = require('yargs');
const axios = require('axios');
const jsdom = require('jsdom');
const fs = require('fs');
const {
  JSDOM
} = jsdom;

//Check if sitename is provided. If not, return.
checkArgs = () => {
  if (!args.argv.site) {
    console.log('Please provide the site name as an argument.');
    console.log('In this format -> node crawler.js --site=https://sitename.com');
    return false;
  }
  return true;
}
//Get site details provided
getSite = () => {
  const site = args.argv.site;
  const domain = site.split('/')[2];
  return {
    site,
    domain
  };
}

//Does a get request on a given site.
//Input - Site name (has to be a valid pattern. For ex - https://www.google.co.in)
//Output - a HTML document map of the site
getSiteData = async (site) => {
  try {
    let response = await axios.get(site);
    let {
      document
    } = new JSDOM(response.data).window;
    return document;
  } catch (error) {
    // console.log('Site name has to be a valid pattern. For ex - https://www.google.co.in');
    return;
  }
}

//Gets all existing links under any given tag
//Input - Site document and HTML tagname.
//Output - all elements under the given tagname
const getLinks = async (document, tag) => {
  try {
    let links = await document.getElementsByTagName(tag);
    return links;
  } catch (error) {
    return;
  }
}

//Checks if the link to be followed is of the same domain as the website
//being traversed.
//Input - href of a link
//Output - true or false depending on if the link is traversible
const getLinkStatus = (link, domain) => {
  try {
    return (link.split('/')[2] === domain) ? true : false;
  } catch (error) {
    console.log("Error at getLinkStatus");
    return;
  }
}

//Checks if link can be included in the sitemap
//Input - href of a link
//Output - true or false
const isLinkClean = (link, domain) => {
  try {
    return link.includes(domain);
  } catch (err) {
    return;
  }
}

//Gets all possible links at one level
//Input - site to be traversed, level count
//Output - All links(main links, image links and other links)
const getOneLevelLinks = async (site, count, domain) => {
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
      if (getLinkStatus(link.href, domain) && count === 0) {
        followALinks.push(link.href);
      }
      if (isLinkClean(link.href, domain)) {
        cleanALinks.push(link.href);
      }
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


//Main program code. First, fetches all links from the given website link.
//Then, we check for all traversible links, and traverse them. The final
//result is written into a JSON file in the data folder.
(
  async () => {
    console.log('Crawler running');
    if (!checkArgs()) {
      return;
    }
    let details = await getSite();
    site = details.site;
    domain = details.domain;
    let firstLinks = await getOneLevelLinks(site, 0, domain);
    let finalMainLinks = [];
    let finalILinks = [];
    let finalOLinks = [];
    finalMainLinks = Array.from(firstLinks.links);
    finalMainLinks = [...new Set(finalMainLinks)]; //to get unique links only
    finalILinks = Array.from(firstLinks.imgLinks);
    finalOLinks = Array.from(firstLinks.otherLinks);
    try {
      for (const followLink of firstLinks.followLinks) {
        let levelLinks = await getOneLevelLinks(followLink, 1, domain);
        for (const i of levelLinks.links) {
          if (!finalMainLinks.includes(i) && i.length!==0) {
            finalMainLinks.push(i);
          }
        }
        for (const i of levelLinks.imgLinks) {
          if (!finalILinks.includes(i) && i.length!==0) {
            finalILinks.push(i);
          }
        }
        for (const i of levelLinks.otherLinks) {
          if (!finalOLinks.includes(i) && i.length!==0) {
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

module.exports = {
  getSiteData,
  getLinks,
  getLinkStatus,
  isLinkClean,
  getOneLevelLinks
}