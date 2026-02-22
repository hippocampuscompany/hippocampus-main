module.exports = function(eleventyConfig) {
  // Copy the assets folder to _site
  eleventyConfig.addPassthroughCopy("assets");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};
module.exports = function(eleventyConfig) {
  // Copy the entire assets folder to _site
  eleventyConfig.addPassthroughCopy("assets");

  return {
    dir: {
      input: ".",           // Project root
      includes: "_includes",// Header, footer, layout
      output: "_site"       // Build folder
    },
    pathPrefix: "/hippocampus-main/"          // Change to "/foldername/" if deploying to a subfolder on cPanel
  };
};

module.exports = function(eleventyConfig) {
eleventyConfig.addFilter("slugifyHeading", function(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
});
};

