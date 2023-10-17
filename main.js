const { argv } = require("process");
const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");

async function main() {
  if (argv.length < 3) {
    return console.log("Please provide a URL to crawl");
  }
  if (argv.length > 3) {
    return console.log("Please provide only one URL to crawl");
  }

  const baseUrl = argv[2];

  console.log(`Crawling ${baseUrl}...`);

  pages = await crawlPage(baseUrl, baseUrl, {});

  printReport(pages);
}

main();
