// design-sync buildCmd: produces the two inputs the converter consumes that
// this repo (a Next.js app, no library build) doesn't otherwise have:
//   1. .design-sync/.cache/tailwind.css — compiled Tailwind v4 stylesheet
//      (cfg.cssEntry), built from styles/globals.css with the repo's own
//      tailwindcss install; content scan runs from the repo root.
//   2. types/ — a .d.ts tree emitted by the repo's own tsc from index.ts
//      (package.json "types" points here; gives real <Name>Props extraction).
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

// 1. Tailwind CSS
const postcss = (await import(join(ROOT, 'node_modules', 'postcss', 'lib', 'postcss.mjs'))).default;
const tailwind = (await import(join(ROOT, 'node_modules', '@tailwindcss', 'postcss', 'dist', 'index.mjs'))).default;
const cssIn = join(ROOT, '.design-sync', 'tailwind-entry.css');
const cssOut = join(ROOT, '.design-sync', '.cache', 'tailwind.css');
mkdirSync(dirname(cssOut), { recursive: true });
const result = await postcss([tailwind({ base: ROOT })]).process(readFileSync(cssIn, 'utf8'), {
  from: cssIn,
  to: cssOut,
});
writeFileSync(cssOut, result.css);
console.error(`  css: ${cssOut} (${(result.css.length / 1024).toFixed(0)}KB)`);

// 2. Declarations
execFileSync(process.execPath, [join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc'), '-p', join(ROOT, '.design-sync', 'tsconfig.types.json')], {
  stdio: 'inherit',
  cwd: ROOT,
});
console.error('  types: types/ emitted');
