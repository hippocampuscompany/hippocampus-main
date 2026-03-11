const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  // Copy assets folder
  eleventyConfig.addPassthroughCopy("assets");

  // Slugify heading filter
  eleventyConfig.addFilter("slugifyHeading", function(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  });

  // Blog date filter
  eleventyConfig.addFilter("blogDate", function(date) {
    if (!date) return "";
    return DateTime.fromISO(date).toFormat("dd LLL yyyy");
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    },

    // Remove if running locally
    //pathPrefix: "/hippocampus-main/"
  };

};