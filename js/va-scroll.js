/**
 * Voice Aura Design System — Scroll Animation Utility
 * ====================================================
 * Lightweight IntersectionObserver wrapper that adds the `.is-visible` class
 * to elements when they enter the viewport.  Works with every `va-scroll-*`
 * CSS class defined in _animations.scss.
 *
 * Usage:
 *   <script src="js/va-scroll.js"></script>
 *   — or —
 *   import { VaScroll } from './js/va-scroll.js';
 *   VaScroll.init();
 *
 * Options (via `data-va-scroll-*` attributes on individual elements):
 *   data-va-scroll-threshold="0.3"   Override the visibility threshold (0–1)
 *   data-va-scroll-once="false"      Keep re-triggering on every enter/leave
 *   data-va-scroll-delay="200"       Delay (ms) before adding .is-visible
 *
 * Global configuration (pass to VaScroll.init()):
 *   VaScroll.init({
 *     root:       null,       // IntersectionObserver root
 *     threshold:  0.15,       // Default threshold
 *     rootMargin: '0px 0px -40px 0px',
 *     once:       true,       // Unobserve after first trigger
 *     selector:   '[class*="va-scroll-"]',
 *   });
 */
(function (root, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root.VaScroll = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  // -----------------------------------------------------------------------
  // Defaults
  // -----------------------------------------------------------------------
  var DEFAULTS = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
    once: true,
    selector: '[class*="va-scroll-"]',
    visibleClass: 'is-visible',
  };

  // -----------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------
  function mergeOpts(defaults, overrides) {
    var merged = {};
    for (var key in defaults) {
      if (defaults.hasOwnProperty(key)) {
        merged[key] = overrides && overrides.hasOwnProperty(key)
          ? overrides[key]
          : defaults[key];
      }
    }
    return merged;
  }

  function getElOpt(el, attr, fallback) {
    var val = el.getAttribute('data-va-scroll-' + attr);
    return val !== null ? val : fallback;
  }

  // -----------------------------------------------------------------------
  // Core
  // -----------------------------------------------------------------------
  var observer = null;
  var opts = {};

  function handleIntersect(entries) {
    entries.forEach(function (entry) {
      var el = entry.target;
      var once = getElOpt(el, 'once', opts.once);
      var delay = parseInt(getElOpt(el, 'delay', 0), 10);

      if (entry.isIntersecting) {
        if (delay > 0) {
          setTimeout(function () {
            el.classList.add(opts.visibleClass);
          }, delay);
        } else {
          el.classList.add(opts.visibleClass);
        }

        if (once === true || once === 'true') {
          observer.unobserve(el);
        }
      } else {
        if (once !== true && once !== 'true') {
          el.classList.remove(opts.visibleClass);
        }
      }
    });
  }

  function observe(elements) {
    if (!observer) return;
    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // -----------------------------------------------------------------------
  // Public API
  // -----------------------------------------------------------------------
  var VaScroll = {
    /**
     * Initialise the scroll observer.
     * Safe to call multiple times — it will destroy the previous observer.
     *
     * @param {Object} [options] Override defaults (see top-of-file docs).
     */
    init: function (options) {
      if (observer) {
        observer.disconnect();
      }

      opts = mergeOpts(DEFAULTS, options);

      // Signal CSS that JS observer is ready (graceful degradation)
      document.documentElement.classList.add('va-scroll-ready');

      // Respect prefers-reduced-motion: skip scroll animations entirely
      var prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!('IntersectionObserver' in window) || prefersReducedMotion) {
        // Fallback: make everything visible immediately (no animations)
        var els = document.querySelectorAll(opts.selector);
        for (var i = 0; i < els.length; i++) {
          els[i].classList.add(opts.visibleClass);
        }
        return;
      }

      observer = new IntersectionObserver(handleIntersect, {
        root: opts.root,
        threshold: parseFloat(
          typeof opts.threshold === 'number' ? opts.threshold : 0.15
        ),
        rootMargin: opts.rootMargin,
      });

      var elements = document.querySelectorAll(opts.selector);
      observe(Array.prototype.slice.call(elements));
    },

    /**
     * Observe additional elements (e.g. dynamically inserted DOM nodes).
     *
     * @param {string|NodeList|Array<Element>} selectorOrElements
     */
    add: function (selectorOrElements) {
      if (!observer) return;
      var els =
        typeof selectorOrElements === 'string'
          ? document.querySelectorAll(selectorOrElements)
          : selectorOrElements;
      observe(Array.prototype.slice.call(els));
    },

    /**
     * Stop observing an element.
     *
     * @param {Element} el
     */
    remove: function (el) {
      if (observer) observer.unobserve(el);
    },

    /**
     * Destroy the observer entirely.
     */
    destroy: function () {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    },

    /**
     * Force-refresh: re-query the DOM for matching elements and observe them.
     * Useful after a client-side navigation or AJAX content load.
     */
    refresh: function () {
      if (!observer) return;
      var elements = document.querySelectorAll(opts.selector);
      observe(Array.prototype.slice.call(elements));
    },
  };

  // -----------------------------------------------------------------------
  // Auto-init when loaded via <script> tag
  // -----------------------------------------------------------------------
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        VaScroll.init();
      });
    } else {
      // DOM already ready (script loaded defer/async or at bottom)
      VaScroll.init();
    }
  }

  return VaScroll;
});
