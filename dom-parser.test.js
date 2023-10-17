const { test, expect } = require("@jest/globals");
const { getUrlsFromHTML } = require("./dom-parser.js");

describe("getUrlsFromHTML module", () => {
  test("getUrlsFromHTML returns an array of URLs", () => {
    const htmlbody = `
    <html>
      <body>
        <a href="https://www.google.com">Google</a>
        <a href="/about">About</a>
        <a href="http://example.com">Example</a>
      </body>
    </html>
  `;
    const baseUrl = "https://www.example.com";
    const urls = getUrlsFromHTML(htmlbody, baseUrl);
    expect(urls).toEqual([
      "https://www.google.com/",
      "https://www.example.com/about",
      "http://example.com/",
    ]);
  });

  test("getUrlsFromHTML ignores invalid URLs", () => {
    const htmlbody = `
    <html>
      <body>
        <a href="https://www.google.com">Google</a>
        <a href="/about">About</a>
        <a href="javascript:alert('Hello, world!')">Click me!</a>
      </body>
    </html>
  `;
    const baseUrl = "https://example.com";
    const urls = getUrlsFromHTML(htmlbody, baseUrl);
    expect(urls).toEqual([
      "https://www.google.com/",
      "https://example.com/about",
    ]);
  });

  test("getUrlsFromHTML handles relative URLs", () => {
    const htmlbody = `
    <html>
      <body>
        <a href="/about">About</a>
        <a href="about">About</a>
        <a href="../about">About</a>
      </body>
    </html>
  `;
    const baseUrl = "https://example.com";
    const urls = getUrlsFromHTML(htmlbody, baseUrl);
    expect(urls).toEqual([
      "https://example.com/about",
    ]);
  });
});
