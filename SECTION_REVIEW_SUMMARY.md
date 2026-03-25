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
| Navbar | 458 | Beta | 8 | 0 | ❌ Missing | ✅ 6 |
| Hero | 588 | Beta | 0 | 0 | ❌ Missing | ✅ 3 |
| Footer | 294 | Stable | 0 | 0 | ❌ Missing | ✅ 2 |
| Feature Rows | 604 | Beta | 0 | 0 | ❌ Missing | — |
| Grid | 292 | Beta | 0 | 1 ✅ | ✅ Present | — |
| Buttons | 388 | Stable | 10 | 0 | ✅ Present | ✅ 2 |
| Cards | 220 | Stable | 5 | 0 | ✅ Present | ✅ 1 |
| Forms | 587 | Beta | 6 | 0 | ✅ Present | ✅ 5 |
| Badges | 275 | Stable | 1 | 0 | ✅ Present | — |
| Pricing | 418 | Beta | 2 | 0 | ✅ Present | ❌ 0 |
| Blog Cards | 260 | Stable | 0 | 0 | ✅ Present | ✅ 2 |
| Trust Bar | 164 | Stable | 0 | 0 | ✅ Present | — |
| Auth | 432 | Beta | 4 | 0 | ✅ Present | ✅ |
| Backgrounds | 1,833 | Beta | 3 | 28 (internal) | — | — |
| Animations | 1,493 | Beta | 0 | 3 (internal) | — | — |
| Typography | 289 | Beta | 13 | 0 | — | — |
| Voice Agent | 339 | Draft | 0 | 0 | ❌ Missing | — |
| Video Dubbing | 376 | Draft | 0 | 0 | ❌ Missing | — |

**Summary:** 5 Stable, 11 Beta, 2 Draft. 52 total `@extend` usages. **0 components consume foundation `var(--va-*)` tokens.**

---

## 2. Cross-Cutting Issues

These issues appear across multiple sections and should be addressed systemically rather than per-file.

### 2.1 Zero foundation custom property consumption (All sections)

Every section uses Sass variables (`$va-primary-blue`, `$va-near-black`, etc.) directly. The 38 `--va-*` tokens on `:root` are unused by components. This blocks:
- Runtime theming / brand switching
- Dark mode via `prefers-color-scheme`
- Per-section color overrides

**Affected:** All 16 sections (100%)

### 2.2 Missing BOOTSTRAP ALIGNMENT blocks (6 files)

Per project rules, every component file must include a BOOTSTRAP ALIGNMENT comment block documenting equivalences. Missing from:

| File | Reason |
|------|--------|
| `_navbar.scss` | Has 8 `@extend` but no equivalence docs |
| `_hero.scss` | Has parallel button system, no equivalence docs |
| `_footer.scss` | Fully custom — should state "no equivalences" |
| `_feature-section.scss` | Uses VA-only patterns — should state "no equivalences" |
| `_section.scss` | Mixed utilities — should document VA↔Bootstrap overlap |
| `_voice-agent.scss` | Fully custom — should state "no equivalences" |
| `_video-dubbing.scss` | Fully custom — should state "no equivalences" |

### 2.3 Three parallel button systems (Navbar + Hero + Buttons)

| System | File | `@extend` count | Estimated duplicated lines |
|--------|------|-----------------|---------------------------|
| `.va-btn--*` | `_buttons.scss` | 10 | — (canonical) |
| `.va-hero__btn--*` | `_hero.scss` | 0 | ~60 |
| `.va-navbar-btn--*` | `_navbar.scss` | 8 | ~100 |

Hero and navbar buttons redeclare font-family, font-size, font-weight, padding, border-radius, cursor, and transition properties that already exist in `.va-btn`. The navbar additionally extends Bootstrap classes directly, creating selector bloat.

**Fix:** Hero and navbar buttons should `@extend .va-btn` + section-specific size/shape deltas only.

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
| F-1 | Pricing | No `:focus-visible` on `.va-pricing__tab` — keyboard users can't see focused tab | 15 min |
| F-2 | Backgrounds | 26 hardcoded SVG `url()` paths — `$va-asset-base-path` defined but never used | 1 h |
| F-3 | Typography | Google Fonts `@import` is render-blocking — move to HTML `<link>` or variable | 30 min |

### P1 — Should fix (improves maintainability)

| ID | Section | Issue | Effort |
|----|---------|-------|--------|
| F-4 | Navbar + Hero | Unify 3 button systems → hero/navbar extend `.va-btn` | 4 h |
| F-5 | 7 files | Add missing BOOTSTRAP ALIGNMENT comment blocks | 1 h |
| F-6 | All | Migrate components to consume `var(--va-*)` foundation tokens | 8 h |
| F-7 | Voice Agent, Video Dubbing, Auth | Move to `brands/voice-aura/` directory | 2 h |

### P2 — Nice to have (improves reference quality)

| ID | Section | Issue | Effort |
|----|---------|-------|--------|
| F-8 | Grid | Add `#grid` section to components.html reference | 2 h |
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
| Auth | ✅ | ❌ | Basic | ❌ Missing: code snippet |
| Navbar | ✅ | ⚠️ | Basic | ❌ Missing: scrolled, transparent, mobile |
| Hero | ✅ | ⚠️ | Basic | ❌ Missing: compact, input card, floats |
| Features | ✅ | ⚠️ | Basic | ❌ Missing: reverse, dark visual |
| Blog | ✅ | ✅ | Basic | ⚠️ Missing: category variants |
| Trust Bar | ✅ | ⚠️ | Basic | ❌ Missing: dark, separator |
| Voice Agent | ✅ | ❌ | Basic | ❌ Missing: code snippet |
| Video Dubbing | ✅ | ❌ | Basic | ❌ Missing: code snippet |
| Footer | ✅ | ❌ | Basic | ❌ Missing: code snippet |
| **Grid** | ❌ | ❌ | — | ❌ **No section at all** |
| Bootstrap Alignment | ✅ | — | — | — |

**Summary:** 20 sections total. 7 have copyable code snippets. **1 section (Grid) is completely missing.** 4 sections lack code snippets entirely (Auth, Voice Agent, Video Dubbing, Footer).

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
| No `var(--va-*)` foundation token consumption | No runtime theming | All 16 |
| 3 parallel button systems | ~160 duplicated lines, selector bloat | Navbar, Hero, Buttons |
| 52 `@extend` usages | 8-selector `.btn` rule, larger CSS | Buttons, Typography, Navbar, Forms, Cards |
| 7 files missing BOOTSTRAP ALIGNMENT | Violates project rules | Navbar, Hero, Footer, Feature, Section, Voice Agent, Video Dubbing |
| 1,147 lines app-specific SCSS in core | Ships to all consumers | Voice Agent, Video Dubbing, Auth |
| 26 hardcoded SVG paths | Breaks npm consumers | Backgrounds |
| Render-blocking font import | Performance | Typography |

### Reference guide gaps

| Gap | Impact | Effort to Fix |
|-----|--------|---------------|
| Grid section completely missing from reference | No documentation for grid system | 2 h |
| 4 sections lack code snippets | Cannot copy-paste markup | 2 h |
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

### Sprint 1 — Quick fixes (1-2 days)

1. **F-1:** Add `:focus-visible` to `.va-pricing__tab` (15 min)
2. **F-2:** Wire `$va-asset-base-path` into all 26 SVG `url()` refs (1 h)
3. **F-3:** Make Google Fonts URL a configurable variable (30 min)
4. **F-5:** Add BOOTSTRAP ALIGNMENT comment blocks to 7 files (1 h)
5. **F-9/F-10/F-15:** Add missing code snippets to components.html (2 h)

### Sprint 2 — Structural improvements (1 week)

6. **F-4:** Unify 3 button systems — hero/navbar extend `.va-btn` (4 h)
7. **F-6:** Migrate top 8 components to consume `var(--va-*)` tokens (8 h)
8. **F-7:** Move app-specific SCSS to `brands/voice-aura/` (2 h)
9. **F-8:** Add Grid section to components.html reference (2 h)
10. **F-11/F-12/F-13/F-14:** Complete variant demos in reference (3 h)

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
