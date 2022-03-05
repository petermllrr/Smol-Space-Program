const Image = require("@11ty/eleventy-img");
const { readdirSync, statSync, readFileSync } = require("fs");
const path = require("path");

/**
 * The input directory
 */
const INPUTDIR = "src";

module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);
  eleventyConfig.addNunjucksShortcode("date", dateShortcode);
  eleventyConfig.addLiquidShortcode("date", dateShortcode);
  eleventyConfig.addJavaScriptFunction("date", dateShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("svg", svgShortcode);
  eleventyConfig.addLiquidShortcode("svg", svgShortcode);
  eleventyConfig.addJavaScriptFunction("svg", svgShortcode)
  
  eleventyConfig.addPassthroughCopy(INPUTDIR + "/favicon-32x32.png");

  createImageGalleries(eleventyConfig);

  return {
    dir: {
      input: INPUTDIR
    }
  }
};

/**
 * Creates collections from directories in src/images. Each sub-directory will
 * create a eleventy-collection. You can add images in jpg, png, webp or avif
 * formats. Alt-texts are assigned by adding a json file in the same directory.
 * 
 * Collection structure:
 * 
 * {
 *   "name" : <file-name.jpg>,
 *   "url" : <full-url>,
 *   "alt" : <alt-text>
 * }
 * 
 * The alt-text json file needs to have the following structure:
 * 
 * {
 *   "imagename-1.jpg" : "Alt text for image 1 goes here.",
 *   "imagename-2.jpg" : "Alt text for image 2 goes here."
 * }
 * 
 * @param eleventyConfig the eleventy config object
 */
function createImageGalleries(eleventyConfig) {
  const imageFiles = getFiles("src/images", [".jpg", ".png", ".webp", ".avif"]);
  const altTextFiles = getFiles("src/images", [".json"]);
  const altTexts = new Set();
  const collections = new Set();

  addAltTextData(altTexts, altTextFiles);
  addCollectionNames(collections, imageFiles);
  generateCollections(collections, eleventyConfig, imageFiles, altTexts);
}

/**
 * Recursive function that returns a list of all files in a given directory and 
 * all it's sub-directories. You can filter for file types.
 * 
 * @param {String} directory the directory to search for files in
 * @param {String} fileTypes the file extensions to filter for
 * @param {Array}  result    (optional) the file array
 */
function getFiles(directory, fileTypes, result = []) {
  const files = readdirSync(directory);
  for (const filename of files) {
    const fullpath = path.join(directory, filename);
    if (statSync(fullpath).isDirectory()) {
      // Recursive function call
      getFiles(fullpath, fileTypes, result);
    } else if (fileTypes.indexOf(path.extname(filename)) > -1) {
      result.push(fullpath);
    }
  }
  return result;
}

/**
 * Returns the 3rd parth of a path. for/example/THIS/part.
 * 
 * @param   {String} filepath an absolute file path
 * @returns {String} the gallery"s folder name
 */
function getThirdPathSegment(filepath) {
  return filepath.split("/")[2];
}

/**
 * Cuts the input directory from an absolute file path.
 * 
 * @param {String} file the absolute file path
 * @returns {String} the file path without the input directory
 */
function removeInputDirFromPath(file) {
  return file.replace(INPUTDIR + "/", "");
}

/**
 * Reads and parses alt-text json files and adds the contents to the altText
 * set.
 * 
 * @param {Set}   altTexts     the set which will hold the texts
 * @param {Array} altTextFiles the alt-text file array containing the filepaths
 */
function addAltTextData(altTexts, altTextFiles) {
  for (const file of altTextFiles) {
    const fileContent = JSON.parse(readFileSync(file));
    altTexts.add(fileContent);
  }
}

/**
 * Loops through all images and generates collections names based on
 * subdirectories of the images directory.
 * 
 * @param {Set}   collections the set the will hold the collection names
 * @param {Array} imageFiles  the array of image filepaths
 */
function addCollectionNames(collections, imageFiles) {
  for (const file of imageFiles) {
    const collectionName = getThirdPathSegment(file);
    collections.add(collectionName);
  }
}

/**
 * Generates eleventy collections.
 * 
 * @param {Set} collections  set containing collection names
 * @param eleventyConfig     eleventy configuration object
 * @param {Array} imageFiles array of image filepaths
 * @param {Set} altTexts     set containing alt texts
 */
function generateCollections(collections,
                             eleventyConfig,
                             imageFiles,
                             altTexts) {
  for (const collection of collections) {
    eleventyConfig.addCollection(collection, function (collectionApi) {
      let result = [];
      for (const file of imageFiles) {
        if (getThirdPathSegment(file) == collection) {
          const filename = path.basename(file);
          const url = removeInputDirFromPath(file);
          let alttext = "";
          for (const file of altTexts) {
            for (const item in file) {
              if (item == filename) {
                alttext = file[item];
              }
            }
          }
          result.push({
            "name" : filename,
            "url" : url,
            "alt" : alttext
          });
        };
      }
      return result;
    });
  }
}

/**
 * Generates avif and webp images. Taken from
 * https://www.11ty.dev/docs/plugins/image/#use-this-in-your-templates
 * 
 * @param {String} src    filepath to the source image
 * @param {String} alt    alt text
 * @param {Array}  widths the image width which should be generated
 * @param {Array}  sizes  sizes attribute
 * @returns 
 */
async function imageShortcode(src, alt, widths, sizes = "100vw") {
  console.log("Processing " + src);
  
  if(alt === undefined) {
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  src = INPUTDIR + "/" + src;

  let metadata = await Image( src, {
    widths: widths,
    formats: ["avif", "webp"],
    outputDir: "./_site/images/" + getThirdPathSegment(src),
    urlPath: "/images/" + getThirdPathSegment(src)
  });

  let lowsrc = metadata.webp[0];
  let highsrc = metadata.webp[metadata.webp.length - 1];

  return `<a href="${highsrc.url}">
<picture>
${Object.values(metadata).map(imageFormat => {
  return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
}).join("\n")}
  <img src="${lowsrc.url}"
       width="${highsrc.width}"
       height="${highsrc.height}"
       alt="${alt}"
       loading="lazy"
       decoding="async">
</picture>
</a>`;
}

async function svgShortcode(src, alt, sizes = "100vw") {
  console.log("Processing " + src);
  
  if(alt === undefined) {
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  src = INPUTDIR + "/" + src;

  let metadata = await Image( src, {
    formats: ["svg"],
    outputDir: "./_site/images/" + getThirdPathSegment(src),
    urlPath: "/images/" + getThirdPathSegment(src)
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return `<a href="${metadata.svg[0].url}">${Image.generateHTML(metadata, imageAttributes)}</a>`;
}

/**
 * Prints a page's date.
 * 
 * @param {String} date (optional) pass "today" to print the current date
 *                      instead of the page's metadata date.
 * @returns             an HTML <time datetime=""> tag
 */
function dateShortcode(date) {
  if (date === "today") {
    date = new Date(Date.now());
  } else {
    date = this.page.date;
  }
  const year = date.getFullYear();
  const monthLong = new Intl.DateTimeFormat("en-US", { month : "long"})
    .format(date);
  const monthShort = new Intl.DateTimeFormat("en-US", { month : "2-digit"})
    .format(date);
  const day = new Intl.DateTimeFormat("en-US", { day : "2-digit"})
    .format(date);
  return `<time datetime="${year}-${monthShort}-${day}">${monthLong} ${day}, ${year}</time>`;
}