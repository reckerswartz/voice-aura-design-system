# Blog Cards (`_blog-card.scss`)

> Component · 260 lines · `scss/components/_blog-card.scss`

## Overview

Content cards for the blog/insights section. Each card has a thumbnail image, colored category dot, metadata (category · date · read time), title, excerpt, and "Read more →" link. Section wrapper includes heading + "Explore more blogs" link.

## Key Classes

| Class | Purpose |
|-------|---------|
| `.va-blog-section` | Section wrapper |
| `.va-blog-section__header` | Title + "Explore more" link row |
| `.va-blog-section__grid` | 4-column card grid |
| `.va-blog-card` | Individual card |
| `.va-blog-card__image` | Thumbnail container |
| `.va-blog-card__image img` | Responsive image |
| `.va-blog-card__body` | Text content area |
| `.va-blog-card__meta` | Category · date · read time row |
| `.va-blog-card__category` / `__tag` | Colored category (aliased names) |
| `.va-blog-card__category--product/--whitepaper/--tutorial` | Color variants |
| `.va-blog-card__title` | Card heading |
| `.va-blog-card__excerpt` | Truncated description |
| `.va-blog-card__link` | "Read more →" link |

## Issues

### I-1. No `var(--va-*)` consumption (Medium)
0 custom property references. 3 brand color refs. Minimal but still compile-time only.

### I-2. No `:focus-visible` on card link (Low)
`.va-blog-card__link` has hover styles but relies on browser default focus ring. Should add explicit `:focus-visible` with `$va-primary-blue` outline.

### I-3. `__category` vs `__tag` alias (Fixed)
Both names are aliased in the selector (`&__category, &__tag`). Documented in commit history. Not a bug — backwards compatibility.

### I-4. BOOTSTRAP ALIGNMENT comment block present (Good)
✅ Documents equivalences.

## Improvements Made

- ✅ Category dot with color variants (commit `c993707`)
- ✅ `__category` / `__tag` aliased for backwards compatibility
- ✅ Focus-visible on card image link (2 occurrences)
- ✅ Responsive via `va-media-down("md")` — 2-column then 1-column
- ✅ SVG blog images fixed (`stop-opacity="0"` replacing non-standard `stop-color="transparent"`)

## Reference Guide Status

- **components.html**: ✅ Has `#blog` section with rendered demo
- **Code snippets**: ✅ Has copyable code block
- **Missing**: Category color variant demo, section-level "Explore more" pattern

## Maturity: **Stable**

Well-structured, responsive, documented. Would benefit from `var(--va-*)` for theming.
