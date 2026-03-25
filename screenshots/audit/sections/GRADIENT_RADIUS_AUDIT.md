# Pixel-Perfect Demo — Gradient & Border-Radius Audit

> Generated from computed style extraction + Behance reference comparison.
> See per-section `README.md` files in each subfolder for detailed analysis.

---

## Executive Summary

The pixel-perfect demo is **largely correct** for gradients and border-radius. No critical visual bugs found. However, the audit uncovered **3 inconsistencies** and **2 documentation gaps** that should be addressed.

---

## Section-by-Section Findings

### 1. Navbar ✅ No issues
- Pill-shaped nav buttons (800px) — matches behance-04/08
- No gradients — flat white bg, correct
- See: `navbar/README.md`

### 2. Hero ✅ No issues
- Pill CTAs (Open Studio, API Docs) — matches behance-04
- Pill badge, pill category pills — all correct
- Input card: 16px radius, glass effect — correct
- Send button: circle (50%) — correct
- No section gradient — white with pattern overlays — correct
- See: `hero/README.md`

### 3. Trust Bar ✅ No issues
- No radius, no gradients — correct for full-width logo bar
- See: `trust-bar/README.md`

### 4. Feature API ⚠️ 2 observations
- "Get API Key" button: 8px rounded rect (not pill) — **correct per reference**, but differs from hero pill CTAs. This is intentional design.
- Feature panels: 16px radius, subtle gradients — correct
- **Gradient angle 145deg** differs from token preset angle 135deg (see Issue #1)
- **Inline `border-radius: 24px`** on app icon container (see Issue #3)
- See: `feature-api/README.md`

### 5. Feature Dubbing ⚠️ 1 observation
- Same gradient angle issue (145deg vs 135deg token)
- Active lang pill not visually differentiated enough from inactive
- See: `feature-dubbing/README.md`

### 6. Blog ✅ No issues
- Blog cards: 12px — correct
- "Explore more blogs": pill — correct (navigation-level CTA)
- See: `blog/README.md`

### 7. Pricing ✅ No issues
- Cards: 12px, CTAs: 8px — all correct per behance-08
- Tabs: pill wrapper — correct
- See: `pricing/README.md`

### 8. Footer ✅ No issues
- Flat dark background, no radius — correct
- See: `footer/README.md`

---

## Issues Found

### Issue #1: Gradient Angle Inconsistency (P1)
**Location:** `scss/layout/_feature-section.scss` lines 127, 132
**Problem:** Feature visual panels use `linear-gradient(145deg, ...)` with deprecated `darken()`, while the design token presets in `_variables.scss` use `linear-gradient(135deg, ...)` with modern `color.adjust()`.

| Source | Angle | Color function |
|--------|-------|---------------|
| `_feature-section.scss` (`.va-feature-visual--light`) | **145deg** | `darken($va-section-bg, 4%)` |
| `_feature-section.scss` (`.va-feature-visual--dark`) | **145deg** | `darken($va-near-black, 10%)` |
| `_variables.scss` (`$va-gradient-dark`) | **135deg** | `color.adjust($lightness: 15%)` |
| `_variables.scss` (`$va-gradient-subtle`) | **180deg** | direct color refs |

**Impact:** Low visual impact (10deg difference barely visible), but violates the principle of using design tokens for consistency.
**Fix:** Either align feature panels to use the `$va-gradient-*` tokens, or update the tokens to use 145deg. Also replace `darken()` with `color.adjust()` to eliminate deprecation warnings.

### Issue #2: Button Radius Pattern Undocumented (P1)
**Problem:** The demo uses two distinct border-radius patterns for buttons, which is intentional but NOT documented anywhere in the reference guide:

| Context | Radius | Token | Examples |
|---------|--------|-------|----------|
| Navigation / Hero prominence | `800px` (pill) | `$va-radius-pill` | Navbar login/signup, hero CTAs, blog "Explore more", category pills, pricing tabs |
| Content / Section CTAs | `8px` | `$va-radius-sm` / `$btn-border-radius` | Feature "Get API Key" / "Try Dubbing", pricing card CTAs, agent card CTA |

**Impact:** A developer copying the design system might use pill buttons everywhere or squared buttons everywhere, not understanding the intentional distinction.
**Fix:** Add a "Button Shape Guidelines" subsection to `components.html` Buttons section and `DESIGN_SYSTEM.md` documenting when to use pill vs. rounded-rect.

### Issue #3: Inline Style on App Icon (P2 — Minor)
**Location:** `pixel-perfect-demo.html` line 218
**Problem:** The app icon container uses an inline `style="border-radius: 24px"` instead of a CSS class. This value equals `$va-radius-xl` but bypasses the design system.
**Fix:** The `.va-app-icon` class already exists in the CSS. Verify it includes `border-radius: $va-radius-xl` and remove the inline style.

---

## Unnecessary Rounded Elements — Verdict

**No unnecessary rounded buttons found.** Every pill and rounded-rect usage maps to a specific Behance reference and follows a consistent (though undocumented) pattern:

- ✅ Pill (800px) for navigation-level CTAs — correct
- ✅ Rounded-rect (8px) for content-level CTAs — correct
- ✅ Standard (12px) for cards — correct
- ✅ Large (16px) for panels — correct
- ✅ XL (24px) for app icon squircle — correct
- ✅ Circle (50%) for send button — correct

---

## Gradient Usage — Verdict

**Gradients are used correctly and sparingly**, consistent with the Behance reference's minimal aesthetic:

| Gradient | Location | Correct? |
|----------|----------|----------|
| `linear-gradient(145deg, #F7F7F8, #ECECEE)` | Feature light panel | ✅ Subtle depth |
| `linear-gradient(145deg, #1A1919, #000)` | Feature dark panels (2x) | ✅ Subtle depth |
| Radial glow (`va-bg-glow`) | Hero, Feature API, Pricing | ✅ Decorative pseudo-element |
| Section blends (`va-section-blend`) | Trust bar top | ✅ Seamless section transitions |
| No gradient | Navbar, Hero bg, Blog, Footer | ✅ Flat colors per reference |

**No misused or unnecessary gradients found.**

---

## Reference Guide Updates Needed

1. **`components.html` — Buttons section**: Add "Button Shape Guidelines" documenting pill vs. rounded-rect contexts
2. **`DESIGN_SYSTEM.md`**: Add a "Gradient Tokens" subsection documenting the three presets and their intended usage
3. **`DESIGN_SYSTEM.md`**: Add a "Border-Radius Scale" usage guide showing which radius applies to which component type
4. **`_feature-section.scss`**: Align gradient angle and color functions with tokens

---

## Next Steps

1. **P1 — Fix gradient angle inconsistency**: Update `_feature-section.scss` to use 135deg (or update tokens to 145deg) and replace `darken()` with `color.adjust()`
2. **P1 — Document button shape pattern**: Add guidelines to components.html and DESIGN_SYSTEM.md
3. **P2 — Remove inline radius**: Verify `.va-app-icon` class has correct radius, remove inline style from pixel-perfect-demo.html
4. **P2 — Improve dubbing lang pill active state**: Add stronger visual differentiation for active language tab
