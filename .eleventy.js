const Image = require("@11ty/eleventy-img");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const path = require("path");

const shortcodes = {
  image: async function(src, alt, sizes = "(max-width: 669px) 100vw, (min-width: 670) 670px", widths = [700, 1400, 4032]) {
    console.log("Processing " + src);
  
    const directory = path.relative("src", path.dirname(src));
    const extension = path.extname(src);
  
    let metadata = await Image(src, {
      widths: widths,
      formats: ["svg", "avif", "webp"],
      urlPath: "/" + directory,
      outputDir: "./_site/" + directory,
      svgShortCircuit: true
    });
  
    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };
  
    let highsrc = (extension == ".svg") ? metadata.svg.at(-1) : metadata.webp.at(-1);
  
    return `<a href="${highsrc.url}">${Image.generateHTML(metadata, imageAttributes)}</a>`
  }
}

const filters = {
  formatDate: function(date) {
    return new Intl.DateTimeFormat(
      'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(date));
  },
  formatYear: function(date) {
    return new Intl.DateTimeFormat(
      'en-US', {
        year: 'numeric'
      }).format(new Date(date));
  },
  isoDate: function(date) {
    return new Date(date).toISOString().split('T')[0]; // Returns YYYY-MM-DD format
  }
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addNunjucksAsyncShortcode("image", shortcodes.image);
  eleventyConfig.addLiquidShortcode("image", shortcodes.image);
  eleventyConfig.addFilter("formatDate", filters.formatDate);
  eleventyConfig.addFilter("formatYear", filters.formatYear);
  eleventyConfig.addFilter("isoDate", filters.isoDate);

  return {
    dir: {
      input: "src"
    }
  }
};