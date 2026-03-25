// ==========================================================================
// Voice Aura Design System — SVGO Configuration
// ==========================================================================
// Optimizes SVG assets for production. Run via: npm run optimize:svg
//
// All SVGs added to assets/ should be processed through this config
// to ensure consistent optimization, accessibility, and styling.
// ==========================================================================

module.exports = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Keep viewBox for responsive scaling
          removeViewBox: false,
          // Keep <title> for accessibility (screen readers)
          removeTitle: false,
        },
      },
    },
    // Remove fixed width/height — let CSS control sizing via viewBox
    'removeDimensions',
    // Alphabetize attributes for consistent diffs
    {
      name: 'sortAttrs',
      params: { xmlnsOrder: 'alphabetical' },
    },
    // Strip editor artifacts (Figma, Illustrator, Inkscape metadata)
    {
      name: 'removeAttrs',
      params: {
        attrs: [
          'data-name',       // Illustrator layer names
          'class',           // Editor-injected classes
          'data-old-hspace', // Inkscape artifacts
          'data-old-vspace',
          'inkscape:*',      // Inkscape namespaced attrs
          'sodipodi:*',      // Sodipodi (Inkscape) attrs
          'sketch:type',     // Sketch artifacts
        ],
        elemSeparator: ':',
      },
    },
    // Remove XML processing instructions and comments
    'removeXMLProcInst',
    // Remove editor namespaces (xmlns:inkscape, xmlns:sodipodi, etc.)
    {
      name: 'removeAttributesBySelector',
      params: {
        selectors: [
          {
            selector: 'svg',
            attributes: [
              'xmlns:inkscape',
              'xmlns:sodipodi',
              'xmlns:sketch',
              'xmlns:xlink',
            ],
          },
        ],
      },
    },
  ],
};
