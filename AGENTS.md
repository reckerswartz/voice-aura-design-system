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

## Bootstrap Alignment Strategy

The design system follows a **Bootstrap-first** approach. When adding or modifying styles:

### Principles

1. **Theme via variables, not classes.** Override Bootstrap's Sass variables (`$btn-*`, `$card-*`, `$input-*`, `$badge-*`, etc.) in `scss/abstracts/_variables.scss` before creating custom classes. This ensures `.btn`, `.card`, `.form-control` etc. are already on-brand.

2. **Reference Bootstrap variables in VA components.** When a `.va-*` component uses a value that Bootstrap also controls (padding, border-radius, font-weight, border-color), reference the Bootstrap Sass variable (e.g. `$card-border-radius`, `$input-border-color`, `$btn-font-weight`) instead of hardcoding the value. This keeps both systems in sync.

3. **Delta-only custom classes.** `.va-*` classes should only define properties that *differ* from Bootstrap's equivalent. If a VA class mirrors a Bootstrap class exactly, use `@extend` to inherit and only add VA-specific deltas (e.g. letter-spacing, icon gap, custom hover effects).

4. **Utility API for new utilities.** Don't hand-roll utility classes. Add new utilities to the `$utilities` map merge in `scss/vendors/_bootstrap.scss` so they get responsive variants and `!important` automatically.

5. **Document equivalences.** Every VA component file must include a `BOOTSTRAP ALIGNMENT` comment block listing approximate equivalences between `.va-*` and `.btn`/`.card`/`.form-*` etc.

### When to use which

| Context | Use |
| --- | --- |
| Standard app UI (forms, modals, admin) | Bootstrap classes (`.btn`, `.card`, `.form-control`) |
| Branded/marketing pages | VA classes (`.va-btn`, `.va-card`, `.va-input-card`) |
| Spacing (standard layout) | Bootstrap utilities (`.mt-3`, `.p-4`, `.gap-3`) |
| Spacing (precise 8px grid) | VA utilities (`.va-mt-4`, `.va-gap-3`) |
| Typography | Bootstrap classes (`.h1`–`.h6`, `.display-*`, `.lead`) |
| Letter-spacing / tracking | Bootstrap utility API extensions (`.tracking-wide`) |

### Naming conventions

- VA components use **BEM**: `.va-component`, `.va-component__element`, `.va-component--modifier`
- VA utilities use **va-property-value**: `.va-mt-4`, `.va-gap-3`, `.va-flex-center`
- Bootstrap utility API extensions use **property-value**: `.tracking-wide`, `.lh-tight`, `.max-w-prose`
