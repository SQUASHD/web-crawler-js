const { JSDOM } = require("jsdom");

function getUrlsFromHTML(htmlbody, baseUrl) {
  const dom = new JSDOM(htmlbody);
  const anchors = dom.window.document.querySelectorAll("a");

  const urls = [];

  for (let anchor of anchors) {
    if (anchor.href.slice(0, 1) === "/") {
      try {
        const url = new URL(anchor.href, baseUrl);
        if (url.protocol === "http:" || url.protocol === "https:") {
          urls.push(url.href);
        }
      } catch (e) {
        continue;
      }
    } else {
      try {
        const url = new URL(anchor.href);
        if (url.protocol === "http:" || url.protocol === "https:") {
          urls.push(url.href);
        }
      } catch (e) {
        continue;
      }
    }
  }
  return urls;
}

module.exports = { getUrlsFromHTML };
