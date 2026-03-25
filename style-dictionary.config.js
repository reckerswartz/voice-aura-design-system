// Style Dictionary configuration for Voice Aura Design System
// Transforms DTCG JSON tokens into CSS custom properties, SCSS variables,
// and a JSON reference file for JavaScript consumers.
//
// Usage:
//   npx style-dictionary build --config style-dictionary.config.js
//   npm run tokens:build

const StyleDictionary = require('style-dictionary');

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    // CSS custom properties — for direct browser consumption
    css: {
      transformGroup: 'css',
      buildPath: 'dist/tokens/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    // SCSS variables — for Sass consumers who import the design system
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/tokens/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    // JSON — for JavaScript / React / design tool consumers
    json: {
      transformGroup: 'js',
      buildPath: 'dist/tokens/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',
        },
      ],
    },
  },
};
