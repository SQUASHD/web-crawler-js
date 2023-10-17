const { test, expect } = require("@jest/globals");
const { normaliseURL } = require("./crawl.js");

describe("normaliseURL module", () => {
  test("normaliseURL: should return the same URL if it is invalid", () => {
    const url = "invalid url";
    expect(normaliseURL(url)).toBe(url);
  });

  test("normaliseURL: should remove trailing slash from URL path", () => {
    const url = "https://example.com/path/";
    expect(normaliseURL(url)).toBe("example.com/path");
  });

  test("normaliseURL: should convert URL hostname to lowercase", () => {
    const url = "https://EXAMPLE.com/path";
    expect(normaliseURL(url)).toBe("example.com/path");
  });

  test("normaliseURL: should remove protocol from URL", () => {
    const url = "https://example.com/path";
    expect(normaliseURL(url)).toBe("example.com/path");
  });
});
