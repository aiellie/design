// Slim `shiki` for the design-sync bundle ONLY (wired via the `paths` map in
// .design-sync/tsconfig.bundle.json; tsc and the app never see this file).
//
// Why: the app imports `createHighlighter` from the full `shiki` entry, which
// inlines every grammar (~10MB per shiki major — this repo transitively pulls
// BOTH v4 directly and v3 via @streamdown/code) and blows the 12MB upload
// limit for _ds_bundle.js. This mirrors shiki's own dist/bundle-web.mjs
// construction with a curated grammar set and the JS regex engine (no WASM).
//
// Both `import "shiki"` sites are intercepted: components/code/code-block.tsx
// (needs createHighlighter) and @streamdown/code (needs createHighlighter,
// bundledLanguages, bundledLanguagesInfo). Grammars outside this set fall back
// to unhighlighted text at runtime.
// @ts-nocheck — compiled by esbuild only, never type-checked.
import {
  createBundledHighlighter,
  createSingletonShorthands,
  guessEmbeddedLanguages,
} from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

export * from "shiki/core"

export const bundledLanguagesInfo = [
  { id: "javascript", name: "JavaScript", aliases: ["js"], import: () => import("shiki/dist/langs/javascript.mjs") },
  { id: "typescript", name: "TypeScript", aliases: ["ts"], import: () => import("shiki/dist/langs/typescript.mjs") },
  { id: "jsx", name: "JSX", import: () => import("shiki/dist/langs/jsx.mjs") },
  { id: "tsx", name: "TSX", import: () => import("shiki/dist/langs/tsx.mjs") },
  { id: "json", name: "JSON", import: () => import("shiki/dist/langs/json.mjs") },
  { id: "jsonc", name: "JSON with Comments", import: () => import("shiki/dist/langs/jsonc.mjs") },
  { id: "css", name: "CSS", import: () => import("shiki/dist/langs/css.mjs") },
  { id: "scss", name: "SCSS", import: () => import("shiki/dist/langs/scss.mjs") },
  { id: "html", name: "HTML", import: () => import("shiki/dist/langs/html.mjs") },
  { id: "xml", name: "XML", import: () => import("shiki/dist/langs/xml.mjs") },
  { id: "markdown", name: "Markdown", aliases: ["md"], import: () => import("shiki/dist/langs/markdown.mjs") },
  { id: "shellscript", name: "Shell", aliases: ["bash", "sh", "shell", "zsh"], import: () => import("shiki/dist/langs/shellscript.mjs") },
  { id: "python", name: "Python", aliases: ["py"], import: () => import("shiki/dist/langs/python.mjs") },
  { id: "yaml", name: "YAML", aliases: ["yml"], import: () => import("shiki/dist/langs/yaml.mjs") },
  { id: "sql", name: "SQL", import: () => import("shiki/dist/langs/sql.mjs") },
  { id: "diff", name: "Diff", import: () => import("shiki/dist/langs/diff.mjs") },
]

const bundledLanguagesBase = Object.fromEntries(bundledLanguagesInfo.map((i) => [i.id, i.import]))
export const bundledLanguagesAlias = Object.fromEntries(
  bundledLanguagesInfo.flatMap((i) => i.aliases?.map((a) => [a, i.import]) || []),
)
export const bundledLanguages = { ...bundledLanguagesBase, ...bundledLanguagesAlias }
export { bundledLanguagesBase }

export const bundledThemesInfo = [
  { id: "github-light", displayName: "GitHub Light", type: "light", import: () => import("shiki/dist/themes/github-light.mjs") },
  { id: "github-dark", displayName: "GitHub Dark", type: "dark", import: () => import("shiki/dist/themes/github-dark.mjs") },
]
export const bundledThemes = Object.fromEntries(bundledThemesInfo.map((i) => [i.id, i.import]))

export const createHighlighter = createBundledHighlighter({
  langs: bundledLanguages,
  themes: bundledThemes,
  engine: () => createJavaScriptRegexEngine({ forgiving: true }),
})

export const {
  codeToHtml,
  codeToHast,
  codeToTokensBase,
  codeToTokens,
  codeToTokensWithThemes,
  getSingletonHighlighter,
  getLastGrammarState,
} = createSingletonShorthands(createHighlighter, { guessEmbeddedLanguages })
