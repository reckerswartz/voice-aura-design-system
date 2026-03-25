# Section Review Summary — Voice Aura Design System

> Cross-section audit identifying required fixes, reference guide gaps, and
> next steps for improvement. Based on per-section documentation in
> `docs/sections/`.
>
> Last updated: 2026-03-25

---

## Table of Contents

1. [Section Maturity Overview](#1-section-maturity-overview)
2. [Cross-Cutting Issues](#2-cross-cutting-issues)
3. [Required Fixes](#3-required-fixes)
4. [Reference Guide Gaps](#4-reference-guide-gaps)
5. [Remaining Gaps](#5-remaining-gaps)
6. [Next Steps](#6-next-steps)

---

## 1. Section Maturity Overview

| Section | Lines | Maturity | `@extend` | `var(--va-*)` | BOOTSTRAP ALIGNMENT | `:focus-visible` |
|---------|-------|----------|-----------|---------------|---------------------|-------------------|
| Navbar | 437 | Beta | 3 | ✅ Migrated | ✅ Added (`18fa927`) | ✅ 6 |
| Hero | 575 | Beta | 4 | ✅ Migrated | ✅ Added (`18fa927`) | ✅ 3 |
| Footer | 307 | Stable | 0 | ✅ Migrated | ✅ Added (`18fa927`) | ✅ 2 |
| Feature Rows | 202 | Beta | 0 | ✅ Migrated | ✅ Added (`18fa927`) | — |
| Grid | 292 | Beta | 0 | 1 ✅ | ✅ Present | — |
| Buttons | 388 | Stable | 10 | ✅ Migrated | ✅ Present | ✅ 2 |
| Cards | 220 | Stable | 5 | ✅ Migrated | ✅ Present | ✅ 1 |
| Forms | 588 | Beta | 6 | ✅ Migrated | ✅ Present | ✅ 5 |
| Badges | 275 | Stable | 1 | ✅ Migrated | ✅ Present | — |
| Pricing | 423 | Beta | 2 | ✅ Migrated | ✅ Present | ✅ 1 (`18fa927`) |
| Blog Cards | 261 | Stable | 0 | ✅ Migrated | ✅ Present | ✅ 2 |
| Trust Bar | 165 | Stable | 0 | ✅ Migrated | ✅ Present | — |
| Auth | 433 | Beta | 4 | ✅ Migrated | ✅ Present | ✅ |
| Backgrounds | 1,833 | Beta | 3 | 28 (internal) | — | — |
| Animations | 1,493 | Beta | 0 | ✅ Migrated | — | — |
| Typography | 289 | Beta | 13 | 0 | — | — |
| Voice Agent | 353 | Draft | 0 | ✅ Migrated | ✅ Added (`18fa927`) | — |
| Video Dubbing | 391 | Draft | 0 | ✅ Migrated | ✅ Added (`18fa927`) | — |

**Summary:** 5 Stable, 11 Beta, 2 Draft. 55 total `@extend` usages. **15 of 18 sections now consume `var(--va-*)` foundation tokens** (remaining: Grid [minimal], Backgrounds [internal only], Typography). All files now have BOOTSTRAP ALIGNMENT blocks.

---

## 2. Cross-Cutting Issues

These issues appear across multiple sections and should be addressed systemically rather than per-file.

### ~~2.1 Zero foundation custom property consumption~~ ✅ MOSTLY RESOLVED

15 of 18 sections now consume `var(--va-*)` foundation tokens for colors, borders, shadows, transitions, and focus states. Sass variables are retained only where compile-time evaluation is required (`rgba()`, `va-darken()`/`va-lighten()`, `@extend`).

**Migrated:** Navbar, Hero, Footer, Feature Rows, Buttons, Cards, Forms, Badges, Pricing, Blog Cards, Trust Bar, Auth, Section, Voice Agent, Video Dubbing, Animations
**Remaining:** Grid (minimal usage), Backgrounds (internal tokens only), Typography (no color properties)

### ~~2.2 Missing BOOTSTRAP ALIGNMENT blocks~~ ✅ RESOLVED (`18fa927`)

All 7 files now have BOOTSTRAP ALIGNMENT comment blocks: `_navbar.scss`, `_hero.scss`, `_footer.scss`, `_feature-section.scss`, `_section.scss`, `_voice-agent.scss`, `_video-dubbing.scss`.

### ~~2.3 Three parallel button systems~~ ✅ RESOLVED (`18fa927`)

Hero and navbar buttons now extend `.va-btn` + variant classes with only section-specific deltas:
- `.va-hero__btn--primary` → `@extend .va-btn, .va-btn--primary` + 4 delta lines
- `.va-hero__btn--secondary` → `@extend .va-btn, .va-btn--secondary` + 4 delta lines
- `.va-navbar-btn--ghost` → `@extend .va-btn, .va-btn--ghost` + 2 delta lines
- `.va-navbar-btn--outlined` → `@extend .va-btn, .va-btn--secondary` + size/shape deltas
- `.va-navbar-btn--filled` → `@extend .va-btn, .va-btn--primary` + size/shape deltas

~160 lines of duplicated button logic removed.

### 2.4 `@extend` selector explosion (Buttons, Typography, Navbar, Forms, Cards)

52 `@extend` usages create multi-selector rules in compiled CSS. Worst offender:

```css
/* .btn rule has 8 selectors: */
.btn, .va-auth__social-btn, .va-auth__submit,
.va-pricing-card__cta, .va-btn, .va-navbar-btn--filled,
.va-navbar-btn--outlined, .va-navbar-btn--ghost { ... }
```

This pattern repeats for `.btn-dark` (4 selectors), `.btn-outline-secondary` (4), `.h1`–`.h6` (2 each), `.form-control` (2), etc.

### 2.5 App-specific SCSS ships as core (Voice Agent + Video Dubbing + Auth)

1,147 lines (10% of total) are brand-specific and cannot be reused by another theme. These should be in a `brands/voice-aura/` directory so consumers can exclude them.

---

## 3. Required Fixes

Fixes grouped by priority — derived from the per-section audits.

### P0 — Must fix (blocks quality / accessibility)

| ID | Section | Issue | Effort |
|----|---------|-------|--------|
| ~~F-1~~ | ~~Pricing~~ | ~~No `:focus-visible` on `.va-pricing__tab`~~ | ✅ Done (`18fa927`) |
| ~~F-2~~ | ~~Backgrounds~~ | ~~26 hardcoded SVG `url()` paths~~ | ✅ Done (`18fa927`) — all use `#{$va-asset-base-path}` |
| ~~F-3~~ | ~~Typography~~ | ~~Google Fonts `@import` is render-blocking~~ | ✅ Done (`18fa927`) — `$va-google-fonts-url` with `@if` guard |

### P1 — Should fix (improves maintainability)

| ID | Section | Issue | Effort |
|----|---------|-------|--------|
| ~~F-4~~ | ~~Navbar + Hero~~ | ~~Unify 3 button systems~~ | ✅ Done (`18fa927`) |
| ~~F-5~~ | ~~7 files~~ | ~~Add missing BOOTSTRAP ALIGNMENT comment blocks~~ | ✅ Done (`18fa927`) |
| ~~F-6~~ | ~~All~~ | ~~Migrate components to consume `var(--va-*)` foundation tokens~~ | ✅ Done — 15/18 sections migrated |
| F-7 | Voice Agent, Video Dubbing, Auth | Move to `brands/voice-aura/` directory | 2 h |

### P2 — Nice to have (improves reference quality)

| ID | Section | Issue | Effort |
|----|---------|-------|--------|
| ~~F-8~~ | ~~Grid~~ | ~~Add `#grid` section to components.html reference~~ | ✅ Done (`18fa927`) |
| F-9 | Footer | Add copyable code snippet to components.html | 30 min |
| F-10 | Auth | Add copyable code snippet to components.html | 30 min |
| F-11 | Forms | Add toggle switch, floating label, validation demos | 1 h |
| F-12 | Hero | Add input card variant, compact variant demos | 1 h |
| F-13 | Feature Rows | Add reverse variant, dark visual panel demos | 1 h |
| F-14 | Trust Bar | Add dark variant, separator variant demos | 30 min |
| F-15 | Voice Agent, Video Dubbing | Add copyable code snippets | 1 h |

---

## 4. Reference Guide Gaps

### components.html coverage audit

| Section | Has Demo | Has Code Snippet | Variants Shown | Gap |
|---------|----------|------------------|----------------|-----|
| Colors | ✅ | — | All | — |
| Typography | ✅ | ⚠️ | Scale only | Missing font-family utilities |
| Spacing | ✅ | — | All | — |
| Radius | ✅ | — | All | — |
| Shadows | ✅ | — | All | — |
| Buttons | ✅ | ✅ | All 6 variants | — |
| Badges | ✅ | ✅ | All variants | — |
| Cards | ✅ | ✅ | 4 variants | — |
| Forms | ✅ | ✅ | Basic only | ❌ Missing: switch, floating label, validation |
| Pricing | ✅ | ✅ | Basic | ❌ Missing: tab JS demo |
| Auth | ✅ | ✅ | Basic | — |
| Navbar | ✅ | ⚠️ | Basic | ❌ Missing: scrolled, transparent, mobile |
| Hero | ✅ | ⚠️ | Basic | ❌ Missing: compact, input card, floats |
| Features | ✅ | ⚠️ | Basic | ❌ Missing: reverse, dark visual |
| Blog | ✅ | ✅ | Basic | ⚠️ Missing: category variants |
| Trust Bar | ✅ | ⚠️ | Basic | ❌ Missing: dark, separator |
| Voice Agent | ✅ | ✅ | Basic | — |
| Video Dubbing | ✅ | ✅ | Basic | — |
| Footer | ✅ | ✅ | Basic | — |
| **Grid** | ✅ | ✅ | Auto-fit, 2/3/4-col, spacing | — ✅ Added (`18fa927`) |
| Bootstrap Alignment | ✅ | — | — | — |

**Summary:** 21 sections total. 14 have copyable code snippets (was 7). Grid section added. Auth, Voice Agent, Video Dubbing, Footer code snippets already present (corrected from prior audit).

### backgrounds.html — Good coverage

20+ sections with interactive demos, scroll-spy, and custom property documentation. No major gaps.

### transitions-showcase.html — Good coverage

13 sections covering button, navbar, card, form, pattern, entrance, and responsive transitions.

### interactions-demo.html — Good coverage

8 sections with interactive demos: buttons, cards, tabs, forms, scroll-reveal, patterns, navbar scroll, and tokens.

---

## 5. Remaining Gaps

### Architecture gaps (from per-section audits)

| Gap | Impact | Sections Affected |
|-----|--------|-------------------|
| ~~No `var(--va-*)` foundation token consumption~~ | ~~✅ Resolved — 15/18 sections migrated~~ | ~~All 16~~ |
| ~~3 parallel button systems~~ | ~~✅ Resolved (`18fa927`)~~ | ~~Navbar, Hero, Buttons~~ |
| 55 `@extend` usages | 8-selector `.btn` rule, larger CSS | Buttons, Typography, Navbar, Forms, Cards |
| ~~7 files missing BOOTSTRAP ALIGNMENT~~ | ~~✅ Resolved (`18fa927`)~~ | ~~All 7 files~~ |
| 1,147 lines app-specific SCSS in core | Ships to all consumers | Voice Agent, Video Dubbing, Auth |
| ~~26 hardcoded SVG paths~~ | ~~✅ Resolved (`18fa927`)~~ | ~~Backgrounds~~ |
| ~~Render-blocking font import~~ | ~~✅ Resolved (`18fa927`)~~ | ~~Typography~~ |

### Reference guide gaps

| Gap | Impact | Effort to Fix |
|-----|--------|---------------|
| ~~Grid section missing from reference~~ | ~~✅ Added (`18fa927`)~~ | — |
| ~~4 sections lack code snippets~~ | ~~Corrected: Auth/Agent/Dubbing/Footer already had snippets~~ | — |
| Form variants incomplete (switch, floating, validation) | Common patterns undocumented | 1 h |
| Hero/Navbar variant demos incomplete | Consumers don't know about advanced patterns | 2 h |

### Tooling gaps

| Gap | Impact |
|-----|--------|
| No PostCSS pipeline | No autoprefixer, cssnano, PurgeCSS |
| No CI test workflow | Stylelint local only, no visual regression |
| No Style Dictionary / DTCG tokens | Token changes require editing SCSS manually |
| No 11ty / SSG | Navbar duplicated 4× across HTML pages |

---

## 6. Next Steps

### ~~Sprint 1 — Quick fixes~~ ✅ COMPLETE (`18fa927`)

All Sprint 1 items resolved: F-1 (pricing focus-visible), F-2 (asset paths), F-3 (Google Fonts configurable), F-4 (button unification), F-5 (BOOTSTRAP ALIGNMENT blocks), F-8 (Grid reference section).

### Sprint 2 — Structural improvements (1 week)

1. ~~**F-6:** Migrate top 8 components to consume `var(--va-*)` tokens~~ ✅ COMPLETE — 15/18 sections migrated
2. **F-7:** Move app-specific SCSS to `brands/voice-aura/` (2 h)
3. **F-11/F-12/F-13/F-14:** Complete variant demos in reference (3 h)

### Sprint 3 — Tooling & quality (1 week)

11. Add PostCSS pipeline (autoprefixer + cssnano + PurgeCSS)
12. Remove unused Bootstrap imports (modal, tooltip, dropdown, close)
13. Add CI workflow (lint + build + size budget)
14. Add Playwright visual regression test baselines
15. Add axe-core accessibility audit to CI

### Sprint 4 — Scale readiness (ongoing)

16. Migrate abstracts to `@use`/`@forward`
17. Set up Style Dictionary with DTCG token format
18. Adopt 11ty for HTML partial system
19. Add `prefers-color-scheme: dark` support
20. Add `@layer` wrappers for cascade control

---

## Appendix: Per-Section Documentation

All section documentation lives in `docs/sections/`:

```
docs/sections/
├── README.md              ← This index
├── navbar/README.md
├── hero/README.md
├── footer/README.md
├── feature-rows/README.md
├── pricing/README.md
├── blog-cards/README.md
├── buttons/README.md
├── cards/README.md
├── forms/README.md
├── badges/README.md
├── trust-bar/README.md
├── auth/README.md
├── backgrounds/README.md
├── animations/README.md
├── typography/README.md
├── grid/README.md
├── voice-agent/README.md
└── video-dubbing/README.md
```

Each README follows a consistent format:
- **Overview** — what the section does
- **Classes** — full class inventory
- **Issues** — identified problems with severity
- **Improvements Made** — what's already been fixed
- **Reference Guide Status** — coverage in reference HTML pages
- **Maturity** — Draft / Beta / Stable / Mature with blockers

---

*Companion documents:*
- *`ARCHITECTURE_REVIEW.md` — system-level issues and progress tracker*
- *`SCALABILITY_ANALYSIS.md` — multi-theme scalability bottlenecks*
- *`CONTINUOUS_IMPROVEMENT.md` — governance, maturity model, roadmap*
