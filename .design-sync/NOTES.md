# design-sync notes — designellieai

Target project: **DesignEllieAI Design System** (`26e2eaf8-e5d7-4e0a-91d7-88a5fe53f60c`, pinned in config.json).

## Repo shape

- Next.js app (pnpm, Tailwind v4, Base UI primitives, shadcn-style tokens) — **not** a built library. No Storybook (user confirmed 2026-08-13).
- `pnpm i --frozen-lockfile` installs clean; node v22, pnpm 10.
- Components: 70 files — 62 `components/ui/`, 2 `components/code/`, 2 `components/color/`, 4 root-level. Zero export-name collisions across files, ~384 PascalCase value exports total (shadcn-style flat subcomponent exports: `Card` + `CardHeader` + …).
- The repo has its own taxonomy in `examples/index.ts` (11 categories) with one `<Name>Example` per component — 64/70 covered. That taxonomy drives the DS-pane grouping via `.design-sync/docs/` stubs, and the examples are the preview-authoring source.

## Sync architecture (why the config looks like it does)

- **`index.ts` (repo root, committed)**: curated public API — exactly one primary export per component file. It is the tsc types entry (`package.json.types` → `types/index.d.ts`); design-sync derives the 70-card component list and real `<Name>Props` from it. Adding a component = add its file + one export line here (+ a `.design-sync/docs/<Name>.md` stub).
- **`.design-sync/entry.ts`**: full bundle entry (star-exports all 70 files + icon registry + `cn` + `HugeiconsIcon`). Everything lands on `window.DesignEllieAI`, subcomponents included. Curated `index.ts` ≠ bundle entry on purpose: cards for primaries only, runtime completeness for the agent.
- **`buildCmd` = `node .design-sync/build.mjs`**: (1) compiles `styles/globals.css` with the repo's own Tailwind v4 via PostCSS → `.design-sync/.cache/tailwind.css` (= `cssEntry`); (2) runs repo tsc with `.design-sync/tsconfig.types.json` → `types/` (gitignored). Run it before every converter run.
- **`package.json` gained a `"types": "types/index.d.ts"` field** — inert for the Next app, tells design-sync where the declarations tree lives.
- **Fonts**: Geist + Geist Mono woff2s harvested one-time from `.next/static/media/` (next/font/google build output) into `.design-sync/fonts/` with authored `@font-face` + `:root` font variables (`--font-sans/--font-geist/--font-heading/--font-mono`) that `app/layout.tsx` normally injects at runtime. Re-harvest only if the app changes font families (regenerate mapping from `@font-face` rules in `.next/static/chunks/*.css`).
- **Doc stubs** (`.design-sync/docs/<Name>.md`): frontmatter-only (`category:` + `keywords:`), body deliberately EMPTY — an empty body keeps the converter's synthesized prompt.md (props + preview examples) while the category regroups the card into the repo's own taxonomy. Don't add body text to these unless you want it to REPLACE the synthesized prompt body.
- `componentSrcMap` pins all 70 primaries — with no shipped dist originally, fuzzy discovery would have surfaced every subcomponent as a root card. Six names differ from their file slug: ChartContainer(chart), ColorRow(color-picker — the file's only public export), CodeBlockLanguageSelector, DirectionProvider, InputOTP, ResizablePanelGroup.

## Preview authoring pattern (validated on Button/Card/Field)

- Each `.design-sync/previews/<Name>.tsx`: re-export the repo's own example as the canonical cell (`export { ButtonExample as Showcase } from "@/examples/ui/button"`) + 1–3 focused hand-written cells (variant sweep, states). Keep the repo's `@/components/ui/*` import idiom — the preview compiler shims any import resolving to an exported component's module onto `window.DesignEllieAI` (context identity preserved), and bundles everything else (examples/, statuses.json, @hugeicons icons) from source.
- **Re-export ONLY the Example component, never `export *`** — some examples export non-component values (chart.tsx exports a `description` string) that would become broken cells.
- Remote avatars (`avatar.aiellie.dev`) load in the render check and fall back to initials offline — fine either way.
- Toast-style imperatives render nothing statically: trigger them in a `React.useEffect` so the viewport shows real toasts.
- Overlays: controlled `open` (no `onOpenChange`) renders settled open state on every Base UI root (Dialog/AlertDialog/Sheet/Drawer/Popover/HoverCard/Tooltip) under the frozen clock. Anchored popups position correctly while the trigger stays in the cell; multiple `<Tooltip open>` roots in one provider all stay open; top-side tooltips collision-flip near the cell top (correct floating-ui behavior).
- The frozen capture clock fakes `Date` but NOT timers: Base UI toast auto-dismiss races the shot — fire `toast.add({..., timeout: 0})` in an effect with `toast.close` cleanup. Calendar `captionLayout="dropdown"` clamps to the frozen year's December unless `startMonth`/`endMonth` are pinned explicitly.
- CountriesSelect can't render an open popup statically (the wrapper doesn't forward Base UI `open`/`defaultOpen`) — trigger-state cells only; an open cell would need upstream prop forwarding + a cardMode/viewport override.
- ChartContainer: hand-composed static recharts cells with `isAnimationActive={false}` + the example's `chartConfig`/`var(--chart-N)` idiom; the motion-animated interactive-pie example can never capture (opacity 0 under frozen clock).
- `cardMode: single` cards show the ALPHABETICALLY first export unless `primaryStory` is set — pin `primaryStory` explicitly for every single-mode component (done in config; keep doing it for new ones).
- Adding/changing a component's cfg.overrides after a full build makes scoped `preview-rebuild` refuse that component with `[CONFIG_STALE]` until `package-build.mjs` re-stamps `.stories-map.json` — plan config edits before full builds, not between scoped loops.

- **Tailwind's auto content scan skips dot-directories** — `.design-sync/previews/` was invisible, so preview-only utilities compiled to nothing (Skeleton `size-16` collapsed to 0×0, Spinner `gap-8` ignored). Fixed: `cssEntry` now compiles `.design-sync/tailwind-entry.css` (imports `styles/globals.css` + `@source "./previews"`). If a preview class ever renders as nothing, check it exists in `ds-bundle/_ds_bundle.css` first.
- `Empty` example grid is ~1100px tall → `cfg.overrides.Empty.viewport 960x1300` (capture default is 900x700; only Empty needed it in wave 1).
- Progress showcase animates 13→66% via setTimeout — captures freeze at 13%; per-run screenshots of that cell vary (not a defect).
- Static pressed/selected states without hooks: `defaultPressed` (Toggle), `defaultValue` (ToggleGroup/Accordion-style), `defaultOpen` (Collapsible-style), `aria-invalid` + `data-invalid` (fields).
- Base UI disabled controls expose `data-disabled` (not `:disabled`), so `peer-disabled:` label dimming never fires — use the repo idiom: wrap the row in `group` + `data-disabled="true"` (hits `group-data-[disabled=true]:opacity-50`).
- InputOTP's repo example derives its code from `Math.random()` (nondeterministic digits, stable layout). Controlled cells: `value` + `readOnly`. Vertical Slider needs a fixed-height parent (`h-40`). InputGroup states come from the child input (`disabled`/`aria-invalid` on `InputGroupInput`), not the wrapper.
- `next/image` is shimmed to a plain `<img>` (`.design-sync/shims/next-image.tsx` via tsconfig.bundle.json paths) — the real one needs the Next runtime and killed `examples/ui/item.tsx` / `navigation-menu.tsx` in preview builds. Repo-`public/` image paths (`/brand/*.png`) still don't exist in the DS context — previews should avoid image-grid cells or use remote/data sources. Item ships hand cells instead of its example for this reason.
- react-resizable-panels v4 sets inline `height:100%` on the Group — size it with a wrapper div, not className on the group.
- The capture freezes the page clock (`page.clock.setFixedTime`): motion/react entrance animations stay at their `initial` state (opacity 0 = invisible forever). Pass settled presets/variants for animated components (done in MessageAnimated). CSS animations still run.
- Streamdown styles markdown elements with its own utility classes — `tailwind-entry.css` now `@source`s `streamdown/dist` + `@streamdown/code/dist`. The APP's own prod CSS has the same gap (report upstream: add the same `@source` to `styles/globals.css`).
- App `public/` assets don't exist in the DS context (capture server or product) — previews use data-URI/remote images instead (Attachment Showcase adapted accordingly; Item ships hand cells).
- `MessageScrollerItem` throws outside `MessageScrollerProvider` — wrap standalone compositions. `defaultScrollPosition="start"` + height-clamped Root renders the scroll-to-latest button statically.
- Scoped `preview-rebuild.mjs` never regenerates CSS — utilities newly introduced by a preview only compile at the next FULL build. Mid-wave, authors stick to utilities already in the compiled CSS or inline styles.

## Known render warns (triaged legitimate)

- `[TOKENS_MISSING]` for `--toast-*`, `--accordion-panel-height`, `--drawer-swipe-*`, `--nested-drawers`, `--marker-underline-offset`-class vars: all set at runtime by Base UI components (swipe/measure state), never defined in stylesheets. Expected.
- `[DTS_STYLE_SYSTEM] filtering @types/react props` on the build: the extractor filters inherited React CSS-shorthand prop bags; emitted props are the real API. Expected.

## Gotchas

- `srcDir: "components"` is required — without it the converter picks `lib/` (ranks above `components/` in the default srcRoot list).
- Config keys are validated strictly: no extra keys (e.g. `projectName` was rejected).
- `components/code/code-block.tsx` imports `createHighlighter` from `shiki` (full bundle) and `components/markdown.tsx` pulls streamdown → watch `_ds_bundle.js` size; esbuild inlines dynamic imports in IIFE mode.
