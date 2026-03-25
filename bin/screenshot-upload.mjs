#!/usr/bin/env node
/**
 * Voice Aura Design System — Screenshot Upload via GitHub CLI
 *
 * Archives the latest screenshot capture into a .tar.gz and uploads it
 * as a GitHub Release asset. Creates a new release if needed.
 *
 * Prerequisites:
 *   - GitHub CLI (`gh`) installed and authenticated
 *   - Screenshots already captured via `npm run screenshots`
 *
 * Usage:
 *   node bin/screenshot-upload.mjs [--tag <tag>] [--dir <capture-dir>]
 *
 * The script will:
 *   1. Resolve the latest capture directory (or use --dir)
 *   2. Compress it into screenshots-<timestamp>.tar.gz
 *   3. Create a GitHub release tagged screenshots-<timestamp> (or use --tag)
 *   4. Upload the archive as a release asset
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const CAPTURES_DIR = path.join(ROOT, 'screenshots', 'captures');

// ─── CLI argument parsing ───────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { tag: null, dir: null };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--tag' && args[i + 1]) opts.tag = args[++i];
    if (args[i] === '--dir' && args[i + 1]) opts.dir = args[++i];
  }
  return opts;
}

function run(cmd, opts = {}) {
  console.log(`  $ ${cmd}`);
  return execSync(cmd, { encoding: 'utf-8', cwd: ROOT, stdio: 'pipe', ...opts }).trim();
}

function ghAvailable() {
  try {
    run('gh --version');
    return true;
  } catch {
    return false;
  }
}

function ghAuthStatus() {
  try {
    run('gh auth status');
    return true;
  } catch {
    return false;
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const opts = parseArgs();

  // 1. Verify gh CLI
  if (!ghAvailable()) {
    console.error('✗ GitHub CLI (gh) is not installed.');
    console.error('  Install: https://cli.github.com/');
    process.exit(1);
  }
  if (!ghAuthStatus()) {
    console.error('✗ GitHub CLI is not authenticated.');
    console.error('  Run: gh auth login');
    process.exit(1);
  }

  // 2. Resolve capture directory
  let captureDir;
  if (opts.dir) {
    captureDir = path.resolve(opts.dir);
  } else {
    const latestLink = path.join(CAPTURES_DIR, 'latest');
    if (!fs.existsSync(latestLink)) {
      console.error('✗ No captures found. Run `npm run screenshots` first.');
      process.exit(1);
    }
    captureDir = fs.realpathSync(latestLink);
  }

  if (!fs.existsSync(captureDir)) {
    console.error(`✗ Capture directory not found: ${captureDir}`);
    process.exit(1);
  }

  const manifestPath = path.join(captureDir, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.error(`✗ manifest.json not found in ${captureDir}`);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  const captureTs = path.basename(captureDir);
  console.log(`\n📸 Uploading screenshots from: ${captureDir}`);
  console.log(`   Timestamp: ${manifest.timestamp}`);
  console.log(`   Total captures: ${manifest.captures.length} page×breakpoint combos`);

  // 3. Create tar.gz archive
  const archiveName = `screenshots-${captureTs}.tar.gz`;
  const archivePath = path.join(CAPTURES_DIR, archiveName);

  console.log(`\n📦 Creating archive: ${archiveName}`);
  run(`tar -czf "${archivePath}" -C "${CAPTURES_DIR}" "${captureTs}"`);
  const sizeBytes = fs.statSync(archivePath).size;
  const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(2);
  console.log(`   Archive size: ${sizeMB} MB`);

  // 4. Get current commit info for the release
  let commitSha, commitMsg;
  try {
    commitSha = run('git rev-parse --short HEAD');
    commitMsg = run('git log -1 --pretty=%s');
  } catch {
    commitSha = 'unknown';
    commitMsg = 'Screenshot capture';
  }

  // 5. Create or find GitHub release
  const tag = opts.tag || `screenshots-${captureTs}`;
  const title = `📸 Screenshots — ${captureTs}`;
  const body = [
    `## Screenshot Capture`,
    ``,
    `- **Timestamp:** ${manifest.timestamp}`,
    `- **Commit:** \`${commitSha}\` — ${commitMsg}`,
    `- **Pages:** ${manifest.pages.join(', ')}`,
    `- **Breakpoints:** ${manifest.breakpoints.map(b => `${b.key} (${b.label})`).join(', ')}`,
    `- **Devices:** ${manifest.devices.join(', ') || 'none'}`,
    `- **Total screenshots:** ${manifest.captures.reduce((n, c) => n + c.screenshots.length, 0)}`,
    ``,
    `Download the archive and extract to view all captures.`,
  ].join('\n');

  console.log(`\n🏷️  Creating release: ${tag}`);
  try {
    run(`gh release create "${tag}" --title "${title}" --notes "${body.replace(/"/g, '\\"')}" --latest=false`);
  } catch (err) {
    if (err.message?.includes('already exists')) {
      console.log(`   Release ${tag} already exists, will upload to it.`);
    } else {
      throw err;
    }
  }

  // 6. Upload archive as release asset
  console.log(`\n⬆️  Uploading asset: ${archiveName}`);
  try {
    run(`gh release upload "${tag}" "${archivePath}" --clobber`);
  } catch (err) {
    console.error(`✗ Upload failed: ${err.message}`);
    process.exit(1);
  }

  // 7. Also upload manifest separately for quick reference
  const manifestAsset = path.join(CAPTURES_DIR, `manifest-${captureTs}.json`);
  fs.copyFileSync(manifestPath, manifestAsset);
  try {
    run(`gh release upload "${tag}" "${manifestAsset}" --clobber`);
  } catch {
    // Non-critical
  }

  // Clean up temp copies
  try { fs.unlinkSync(archivePath); } catch {}
  try { fs.unlinkSync(manifestAsset); } catch {}

  console.log(`\n✓ Screenshots uploaded to release: ${tag}`);
  try {
    const url = run(`gh release view "${tag}" --json url --jq .url`);
    console.log(`  ${url}`);
  } catch {}
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
