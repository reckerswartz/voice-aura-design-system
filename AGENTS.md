# Voice Aura Design System — Project Rules

## Build & Verify

- Build command: `npm run build` (compiles SCSS to CSS in `dist/css/`)
- Watch command: `npm run watch:css`
- Always run `npm run build` after modifying any SCSS file to verify compilation
- Build output goes to `dist/css/voice-aura.css` (expanded) and `dist/css/voice-aura.min.css` (compressed)

## Code Conventions

- Use Dart Sass (`sass` package) — never `node-sass` or `sassc`
- SCSS partials follow 7-1 architecture: abstracts, base, components, layout, pages, vendors
- Custom variables live in `scss/abstracts/_variables.scss`
- CSS custom properties are defined in `scss/abstracts/_variables.scss` (as SCSS variables exposed via Bootstrap's theming)
- Bootstrap is imported via `@import` in `scss/vendors/_bootstrap.scss` (Bootstrap 5.3 requires `@import`, not `@use`)
- New component styles go in `scss/components/` with a leading underscore (e.g., `_my-component.scss`)
- Register new partials in `scss/voice-aura.scss`

## Assets

- Icons: 54 curated Lucide icons in `assets/icons/lucide/` (MIT license)
- Custom icons: 5 SVGs in `assets/icons/` (ISC license)
- Brand: 3 SVGs in `assets/brand/`
- Patterns: 4 SVGs in `assets/patterns/`
- Illustrations: 2 SVGs in `assets/illustrations/`
- See `ASSET_GUIDELINES.md` for full icon & asset usage rules

## Documentation

- `DESIGN_SYSTEM.md` — full design system reference
- `RAILS_INTEGRATION.md` — Rails integration guide (esbuild, Webpack 5, Dart Sass)
- `ASSET_GUIDELINES.md` — asset usage, licensing, recommended platforms
- `SKILLS.md` — agent skills documentation and GitHub CLI setup

## Rails Integration

- Modern stack only: jsbundling-rails, cssbundling-rails, dartsass-rails, Propshaft
- Do NOT reference Webpacker, Sprockets, sassc-rails, or Turbolinks (all deprecated)
- Example files in `examples/`: `rails_application.scss`, `icon_helper.rb`

## Dependencies

- Bootstrap 5.3+ (devDependency)
- Dart Sass 1.x (devDependency)
- Lucide Static 1.x (dependency for icon SVGs)
