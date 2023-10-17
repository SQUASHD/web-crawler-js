const { getUrlsFromHTML } = require("./dom-parser");

function normaliseURL(url) {
  let urlObject;
  try {
    urlObject = new URL(url);
    urlObject.hostname = urlObject.hostname.toLowerCase();
    urlObject.protocol = "";

    let path = urlObject.pathname.endsWith("/")
      ? urlObject.pathname.slice(0, -1)
      : urlObject.pathname;

    return urlObject.hostname + path;
  } catch (e) {
    return url;
  }
}

async function crawlPage(baseUrl, currentUrl, pages) {
  baseTest = new URL(baseUrl);
  currTest = new URL(currentUrl);

  if (baseTest.hostname !== currTest.hostname) {
    return pages;
  }

  normalisedUrl = normaliseURL(currentUrl);

  if (pages[normalisedUrl] > 0) {
    pages[normalisedUrl]++;
    return pages;
  }

  if (currentUrl === baseUrl) {
    pages[normalisedUrl] = 0;
  } else {
    pages[normalisedUrl] = 1;
  }

  let html = "";

  try {
    const response = await fetch(currentUrl);
    if (!response.ok) {
      console.error(
        `Failed to fetch ${currentUrl}: ${response.status} ${response.statusText}`
      );
      return;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
      console.error(
        `Invalid content-type. Expected text/html but received ${contentType}`
      );
      return;
    }

    html = await response.text();
  } catch (error) {
    console.error(`Failed to crawl ${normalisedUrl}: ${error}`);
  }

  let urls = getUrlsFromHTML(html, baseUrl);
  for (let url of urls) {
    await crawlPage(baseUrl, url, pages);
  }

  return pages;
}

module.exports = {
  normaliseURL,
  crawlPage,
};
