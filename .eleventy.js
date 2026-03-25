// Eleventy (11ty) configuration for Voice Aura Design System
// Enables shared partials (navbar, head, footer) across site pages.
//
// Usage:
//   npx @11ty/eleventy                        — build once
//   npx @11ty/eleventy --serve                 — dev server with hot reload
//   npm run site:build / npm run site:serve
//
// Migration strategy:
//   Existing .html files in site/ pass through unchanged.
//   To convert a page, rename .html → .njk and add front matter:
//     ---
//     layout: base.njk
//     title: My Page Title
//     ---
//   The page body goes in the template; head/navbar/footer are inherited.

module.exports = function (eleventyConfig) {
  // Pass through static assets (not processed by 11ty)
  eleventyConfig.addPassthroughCopy({ 'assets': 'assets' });
  eleventyConfig.addPassthroughCopy({ 'dist': 'dist' });
  eleventyConfig.addPassthroughCopy({ 'js': 'js' });

  // Watch for CSS rebuilds
  eleventyConfig.addWatchTarget('./dist/css/');

  return {
    dir: {
      input: 'site',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data',
    },
    // Process .njk and .html (html only if it has front matter)
    templateFormats: ['njk', 'html', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
