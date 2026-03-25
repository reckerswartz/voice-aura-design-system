#!/usr/bin/env node
/**
 * Voice Aura Design System — Multi-Breakpoint Screenshot Capture (Parallel)
 *
 * Visits every docs/*.html page and captures screenshots across all
 * breakpoints (4K → XS), in desktop, tablet, and mobile device formats.
 *
 * Performance features:
 *   - Parallel context pool (--concurrency N, default 4)
 *   - Parallel page tabs within each context (--pages-parallel N, default 2)
 *   - Batched DOM reads — single evaluate() per page for metrics
 *   - In-browser scrolling loop — one round-trip instead of N for realistic scroll
 *   - Reduced settle times with adaptive waits
 *
 * Output hierarchy (timestamped):
 *   screenshots/captures/<timestamp>/
 *     <breakpoint>/<page>-segment-NN.png
 *     <breakpoint>/<page>-viewport-{top,25,50,75,bottom}.png
 *     devices/<device>/<page>-*.png
 *     manifest.json
 *
 * Usage:
 *   node bin/screenshot-capture.mjs [options]
 *     --pages page1.html,page2.html    Filter pages
 *     --breakpoints 4k,fhd,xs          Filter breakpoints
 *     --skip-devices                   Skip device emulations
 *     --concurrency N                  Parallel contexts (default: 4)
 *     --pages-parallel N               Parallel tabs per context (default: 2)
 *     --shard N/M                      Process shard N of M (for CI matrix)
 */

import { chromium, devices } from 'playwright';
import os from 'os';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ─── Configuration ──────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');

/** Responsive breakpoints — 4K down to XS (Bootstrap-aligned + extras) */
const BREAKPOINTS = {
  '4k':             { width: 3840, height: 2160, label: '4K Ultra HD' },
  '2k':             { width: 2560, height: 1440, label: '2K QHD' },
  'fhd':            { width: 1920, height: 1080, label: 'Full HD' },
  'laptop':         { width: 1440, height: 900,  label: 'Laptop' },
  'xxl':            { width: 1400, height: 900,  label: 'Bootstrap XXL' },
  'xl':             { width: 1200, height: 800,  label: 'Bootstrap XL' },
  'lg':             { width: 992,  height: 768,  label: 'Bootstrap LG' },
  'md':             { width: 768,  height: 1024, label: 'Bootstrap MD / Tablet Portrait' },
  'sm':             { width: 576,  height: 800,  label: 'Bootstrap SM' },
  'xs':             { width: 375,  height: 812,  label: 'Extra Small / iPhone' },
  'xxs':            { width: 320,  height: 568,  label: 'XXS / iPhone SE' },
};

/** Mobile / tablet device emulations */
const DEVICE_PROFILES = {
  'iphone-14':       'iPhone 14',
  'iphone-14-pro-max': 'iPhone 14 Pro Max',
  'iphone-se':      'iPhone SE',
  'pixel-7':        'Pixel 7',
  'ipad-mini':      'iPad Mini',
  'ipad-pro-11':    'iPad Pro 11',
  'galaxy-s9':      'Galaxy S9+',
};

/** Scroll positions as fractions of total scrollable height */
const SCROLL_STOPS = [
  { name: 'top',    fraction: 0.00 },
  { name: '25',     fraction: 0.25 },
  { name: '50',     fraction: 0.50 },
  { name: '75',     fraction: 0.75 },
  { name: 'bottom', fraction: 1.00 },
];

/** Overlap (px) between consecutive segments to avoid missed content at transitions */
const SEGMENT_OVERLAP = 80;
/** Max segments per page to cap runtime on extremely tall documents */
const MAX_SEGMENTS = 40;
/** Device scale factor for desktop breakpoints */
const DESKTOP_DPR = 1;

// ─── CLI argument parsing ───────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const cpuCount = os.cpus().length;
  const opts = {
    pages: null,
    breakpoints: null,
    skipDevices: false,
    concurrency: Math.min(cpuCount, 4),
    pagesParallel: 2,
    shard: null,       // { index, total } for CI matrix sharding
  };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--pages' && args[i + 1]) {
      opts.pages = args[++i].split(',').map(p => p.trim());
    } else if (args[i] === '--breakpoints' && args[i + 1]) {
      opts.breakpoints = args[++i].split(',').map(b => b.trim().toLowerCase());
    } else if (args[i] === '--skip-devices') {
      opts.skipDevices = true;
    } else if (args[i] === '--concurrency' && args[i + 1]) {
      opts.concurrency = Math.max(1, parseInt(args[++i], 10) || 4);
    } else if (args[i] === '--pages-parallel' && args[i + 1]) {
      opts.pagesParallel = Math.max(1, parseInt(args[++i], 10) || 2);
    } else if (args[i] === '--shard' && args[i + 1]) {
      const [idx, total] = args[++i].split('/').map(Number);
      if (idx && total) opts.shard = { index: idx, total };
    }
  }
  return opts;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-').replace('T', 'T').slice(0, 19);
}

function slugify(filename) {
  return filename.replace(/\.html$/i, '');
}

/**
 * Runs up to `limit` async tasks from `items` concurrently.
 * Returns results in the same order as items.
 */
async function parallelMap(items, fn, limit) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const idx = next++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

/**
 * Performs realistic scrolling entirely inside the browser in a single
 * evaluate() call, then settles. This replaces N sequential evaluate()+
 * waitForTimeout() round-trips with a single call.
 */
async function realisticScrollTo(page, targetY) {
  await page.evaluate(async (target) => {
    const current = window.scrollY;
    const dist = Math.abs(target - current);
    if (dist < 5) return;
    const dir = target > current ? 1 : -1;
    const stepPx = dist > 10000 ? 1200 : dist > 5000 ? 800 : 400;
    const steps = Math.min(Math.ceil(dist / stepPx), 30);
    const actualStep = dist / steps;
    for (let i = 1; i <= steps; i++) {
      const y = i === steps ? target : Math.round(current + dir * actualStep * i);
      window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
      await new Promise(r => setTimeout(r, 25));
    }
  }, targetY);
  // Settle for animations / lazy-load after the browser-side loop completes
  await page.waitForTimeout(120);
}

/**
 * Waits for the page to be fully idle — fonts loaded, images decoded,
 * animations settled. Hard 2 s ceiling for broken resources.
 */
async function waitForPageReady(page) {
  await page.waitForLoadState('load');
  await Promise.race([
    page.evaluate(async () => {
      if (document.fonts?.ready) await document.fonts.ready;
      const imgs = Array.from(document.querySelectorAll('img'));
      await Promise.allSettled(imgs.map(img =>
        img.complete ? Promise.resolve() : img.decode().catch(() => {})
      ));
    }),
    new Promise(r => setTimeout(r, 2000)),
  ]);
  await page.waitForTimeout(150);
}

/**
 * Captures the full page as overlapping viewport-sized segments, then takes
 * viewport snapshots at 5 realistic scroll stops.
 *
 * Optimized: single evaluate() to read docHeight+viewHeight, reduced waits.
 */
async function capturePageScreenshots(page, outDir, slug) {
  const entries = [];

  // Single round-trip for both metrics
  const { docHeight, viewHeight } = await page.evaluate(() => ({
    docHeight: document.documentElement.scrollHeight,
    viewHeight: window.innerHeight,
  }));
  const maxScroll = Math.max(0, docHeight - viewHeight);

  // 1. Segmented full-page capture (direct jumps — fast, reliable)
  const stepY = Math.max(viewHeight - SEGMENT_OVERLAP, 200);
  const segCount = Math.min(Math.ceil(docHeight / stepY), MAX_SEGMENTS);
  for (let i = 0; i < segCount; i++) {
    const y = Math.min(i * stepY, maxScroll);
    await page.evaluate((sy) => window.scrollTo(0, sy), y);
    await page.waitForTimeout(60);
    const segPath = path.join(outDir, `${slug}-segment-${String(i).padStart(2, '0')}.png`);
    await page.screenshot({ path: segPath, fullPage: false });
    entries.push({ type: 'segment', scrollStop: `seg-${i}`, path: segPath });
  }

  // 2. Viewport snapshots at realistic scroll stops (with user-like scrolling)
  for (const stop of SCROLL_STOPS) {
    const targetY = Math.round(maxScroll * stop.fraction);
    await realisticScrollTo(page, targetY);
    const shotPath = path.join(outDir, `${slug}-viewport-${stop.name}.png`);
    await page.screenshot({ path: shotPath, fullPage: false });
    entries.push({ type: 'viewport', scrollStop: stop.name, path: shotPath });
  }

  return entries;
}

/**
 * Processes a single page within a given browser context.
 * Returns a manifest capture entry.
 */
async function processPage(context, file, outDir, captureDir, label) {
  const slug = slugify(file);
  const page = await context.newPage();
  const url = 'file://' + path.join(DOCS_DIR, file);

  try {
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });
    await waitForPageReady(page);
    const entries = await capturePageScreenshots(page, outDir, slug);
    return {
      page: file,
      breakpoint: label.breakpoint ?? null,
      device: label.device ?? null,
      viewport: label.viewport,
      screenshots: entries.map(e => ({
        type: e.type,
        scrollStop: e.scrollStop,
        path: path.relative(captureDir, e.path),
      })),
    };
  } catch (err) {
    console.error(`\n  ✗ Error: ${file} @ ${label.breakpoint || label.device}: ${err.message}`);
    return null;
  } finally {
    await page.close();
  }
}

/**
 * Processes all pages for a single context config (breakpoint or device).
 * Opens pages in parallel within the context.
 */
async function processContext(browser, contextOpts, outDir, htmlFiles, captureDir, label, pagesParallel) {
  fs.mkdirSync(outDir, { recursive: true });
  const context = await browser.newContext(contextOpts);

  const results = await parallelMap(
    htmlFiles,
    (file) => processPage(context, file, outDir, captureDir, label),
    pagesParallel,
  );

  await context.close();
  return results.filter(Boolean);
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const t0 = Date.now();
  const opts = parseArgs();
  const ts = timestamp();
  const captureDir = path.join(ROOT, 'screenshots', 'captures', ts);
  fs.mkdirSync(captureDir, { recursive: true });

  // Discover pages
  let htmlFiles = fs.readdirSync(DOCS_DIR)
    .filter(f => f.endsWith('.html'))
    .sort();
  if (opts.pages) {
    htmlFiles = htmlFiles.filter(f => opts.pages.includes(f));
  }

  // Resolve breakpoints
  let bpKeys = Object.keys(BREAKPOINTS);
  if (opts.breakpoints) {
    bpKeys = bpKeys.filter(k => opts.breakpoints.includes(k));
  }

  // Build the full job list: each job = one context (breakpoint or device)
  const jobs = [];

  for (const bpKey of bpKeys) {
    const bp = BREAKPOINTS[bpKey];
    jobs.push({
      key: bpKey,
      outDir: path.join(captureDir, bpKey),
      contextOpts: { viewport: { width: bp.width, height: bp.height }, deviceScaleFactor: DESKTOP_DPR },
      label: { breakpoint: bpKey, device: null, viewport: `${bp.width}x${bp.height}` },
    });
  }

  if (!opts.skipDevices) {
    for (const [deviceKey, deviceName] of Object.entries(DEVICE_PROFILES)) {
      const descriptor = devices[deviceName];
      if (!descriptor) continue;
      jobs.push({
        key: deviceKey,
        outDir: path.join(captureDir, 'devices', deviceKey),
        contextOpts: { ...descriptor },
        label: { breakpoint: null, device: deviceKey, viewport: `${descriptor.viewport.width}x${descriptor.viewport.height}` },
      });
    }
  }

  // Apply sharding for CI matrix
  let activeJobs = jobs;
  if (opts.shard) {
    const { index, total } = opts.shard;
    activeJobs = jobs.filter((_, i) => (i % total) + 1 === index);
    console.log(`  Shard ${index}/${total}: ${activeJobs.length} of ${jobs.length} jobs`);
  }

  const manifest = {
    timestamp: new Date().toISOString(),
    captureDir,
    pages: htmlFiles,
    breakpoints: bpKeys.map(k => ({ key: k, ...BREAKPOINTS[k] })),
    devices: opts.skipDevices ? [] : Object.keys(DEVICE_PROFILES),
    concurrency: opts.concurrency,
    pagesParallel: opts.pagesParallel,
    shard: opts.shard,
    captures: [],
  };

  // Launch browser
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch {
    console.log('  ℹ Bundled Chromium not found, using system Chrome');
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  }

  const totalOps = activeJobs.length;
  let completed = 0;

  console.log(`  Contexts: ${totalOps} | Pages/context: ${htmlFiles.length} | Concurrency: ${opts.concurrency} | Tabs/context: ${opts.pagesParallel}`);

  // ── Parallel context processing ────────────────────────────────────────
  const allResults = await parallelMap(
    activeJobs,
    async (job) => {
      const results = await processContext(
        browser,
        job.contextOpts,
        job.outDir,
        htmlFiles,
        captureDir,
        job.label,
        opts.pagesParallel,
      );
      completed++;
      process.stdout.write(`\r  Contexts done: ${completed}/${totalOps}`);
      return results;
    },
    opts.concurrency,
  );

  // Flatten results into manifest
  for (const batch of allResults) {
    manifest.captures.push(...batch);
  }

  await browser.close();

  // Write manifest
  const manifestPath = path.join(captureDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  // Write a latest symlink/pointer
  const latestPath = path.join(ROOT, 'screenshots', 'captures', 'latest');
  try { fs.unlinkSync(latestPath); } catch {}
  fs.symlinkSync(ts, latestPath);

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  const totalShots = manifest.captures.reduce((n, c) => n + c.screenshots.length, 0);
  const deviceCount = opts.skipDevices ? 0 : Object.keys(DEVICE_PROFILES).length;
  console.log(`\n\n✓ Captured ${totalShots} screenshots across ${bpKeys.length} breakpoints + ${deviceCount} devices`);
  console.log(`  Time: ${elapsed}s | Concurrency: ${opts.concurrency} contexts × ${opts.pagesParallel} tabs`);
  console.log(`  Output: ${captureDir}`);
  console.log(`  Manifest: ${manifestPath}`);

  return { captureDir, manifestPath, totalShots, elapsed };
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
