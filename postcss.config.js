// PostCSS configuration for Voice Aura Design System
// Runs after Sass compilation to add vendor prefixes and optimize output.

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: ['default', {
        // Keep @charset and license comments
        discardComments: { removeAll: false },
        // Preserve custom properties (--va-*)
        colormin: false,
      }],
    }),
  ],
};
