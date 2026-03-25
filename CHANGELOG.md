# Changelog

All notable changes to Voice Aura Design System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-03-25

### Added
- **20 SCSS partials** organized in 7-1 architecture (abstracts, base, components, layout, pages, vendors)
- **68 SVG assets** — 54 curated Lucide icons (ISC) + 14 custom (brand, patterns, illustrations)
- **IBM Plex typography** — Serif headings + Sans body + Mono code
- **Full component library** — buttons, cards, forms, pricing, auth, navbar, hero, footer, blog cards, voice agent cards, badges
- **CSS custom properties** and animation presets (fade, slide, skeleton loaders)
- **Bootstrap 5.3+ alignment** — theme via variables, delta-only custom classes, utility API extensions
- **8 demo pages** — app-demo, components, backgrounds, pixel-perfect-demo, navbar-demo, asset-gallery, signup-demo, index
- **Parallel Playwright screenshot capture** — 11 breakpoints, 7 devices, 3.4× speedup via context pool
- **GitHub Actions CI/CD** — auto-deploy Pages, screenshot capture with 4-shard matrix, PR comments
- **npm package publishing** — `files` whitelist, `exports` map, `prepublishOnly` build
- **Rails integration guide** — esbuild, Webpack 5, Dart Sass + Propshaft
- **Setup CLI** — `npx voice-aura-setup` copies scss/assets into vendor directory
- **Comprehensive documentation** — DESIGN_SYSTEM.md, RAILS_INTEGRATION.md, ASSET_GUIDELINES.md, ATTRIBUTIONS.md, SKILLS.md

### Architecture
- Bootstrap-first approach: override Sass variables before creating custom classes
- BEM naming for VA components: `.va-component__element--modifier`
- 8px spacing grid with VA utilities alongside Bootstrap spacing utilities

[Unreleased]: https://github.com/reckerswartz/voice-aura-design-system/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/reckerswartz/voice-aura-design-system/releases/tag/v1.0.0
