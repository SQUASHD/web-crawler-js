function printReport(pages) {
  console.log("Report starting...");

  const sortedPages = sortPages(pages);

  for (const [url, count] of sortedPages) {
    console.log(`Found ${count} internal links to ${url}`);
  }
}

function sortPages(pages) {
  const pageArray = Object.entries(pages);
  pageArray.sort((a, b) => b[1] - a[1]);
  return pageArray;
}

module.exports = { printReport };
