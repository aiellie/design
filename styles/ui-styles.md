# UI Style Rules

Every visual override we apply on top of stock shadcn, organized by component.

**Where styles live:**

- [`uishadcn.css`](uishadcn.css) — the skin. Keyed on `data-slot` attributes so the components in `components/ui/` stay as close to stock shadcn as possible. Imported by `globals.css`.
- [`globals.css`](globals.css) — design tokens (colors, `--radius: 0.875rem`, `--brand-gradient`, fonts) and the `bg-brand-gradient` utility.
- A few components carry their styling inline where the structure itself is custom — Dialog is documented here since its whole recipe lives in [`dialog.tsx`](../components/ui/dialog.tsx).

**Line references** (e.g. `uishadcn.css:108`) point into the CSS so you can jump to the source of any rule. `uishadcn.css` is split into nine numbered sections (§1 Globals → §9 Chat & AI); its header comment lists them.

---

## Contents

1. [How the cascade tricks work](#how-the-cascade-tricks-work)
2. [Global: focus & invalid rings](#global-focus--invalid-rings)
3. [Global: cursors](#global-cursors)
4. [Menus & pickers — shared glass recipe](#menus--pickers--shared-glass-recipe)
5. [Destructive menu items](#destructive-menu-items)
6. [Menubar](#menubar)
7. [Combobox](#combobox)
8. [Command palette (cmdk)](#command-palette-cmdk)
9. [Dialog & Sheet](#dialog--sheet)
10. [Toast](#toast)
11. [Tabs](#tabs)
12. [Table](#table)
13. [Input, Textarea & Input Group](#input-textarea--input-group)
14. [Button Group](#button-group)
15. [Label, Field & Progress](#label-field--progress)
16. [Checkbox, Radio & Switch — destructive / invalid states](#checkbox-radio--switch--destructive--invalid-states)

---

## How the cascade tricks work

Three things make this file work; know them before editing (`uishadcn.css:1-36`):

1. **Unlayered `!important` beats layered utilities.** Most rules here are unlayered with `!` (e.g. `bg-foreground/10!`), which wins over the components' own Tailwind utilities — even stateful ones like `focus:bg-accent` — because those live in `@layer utilities`.
2. **Destructive is the exception.** Menu Content components ship `**:data-[variant=destructive]:text-accent-foreground!` — that's `!important` *inside* `@layer utilities`, which beats unlayered `!important`. So the destructive rules must live in `@layer utilities` themselves, with higher specificity than that Content rule (`uishadcn.css:178`).
3. **cmdk selected state uses raw CSS, not `@apply`.** cmdk stamps `data-selected="true"|"false"` as strings; the nested `[data-selected="true"]` + `@apply` combination was dropped by the build, so those rules are written as plain `color-mix()` declarations (`uishadcn.css:247-256`).

---

## Global: focus & invalid rings

One rule normalizes every focus and error ring in the app to **`ring-1`** (`uishadcn.css:43-80`).

| Trigger | Applies to |
|---|---|
| `:focus-visible` | accordion-trigger, button, bubble content (as button/link), checkbox, input, native-select, navigation-menu trigger & link, questionnaire-input, radio-group-item, select-trigger, slider-thumb, switch, textarea |
| `[aria-invalid="true"]` | button, checkbox, input, native-select, questionnaire-input, radio-group-item, select-trigger, switch, textarea *(input-otp-slot currently commented out)* |
| `:focus-within` / contains invalid | combobox-chips |
| contains a focused control / an invalid slot | input-group |
| contains an invalid slot | input-otp |
| `data-active="true"` | input-otp-slot |
| contains a focused `input` | questionnaire-choice |
| `:hover` / `:active` | slider-thumb |

---

## Global: cursors

`cursor: pointer` on every enabled interactive control (`uishadcn.css:83-100`):

- any `button` / `[role="button"]` not disabled
- checkbox, radio-group-item, slider-thumb, switch, native-select
- `input[type="file"]`
- scroll-area scrollbar & thumb (including while dragging)

---

## Menus & pickers — shared glass recipe

One block skins all floating menu surfaces identically (`uishadcn.css:108-172`).

**Applies to the content (and sub-content) of:** dropdown-menu · context-menu · menubar · select · combobox. Select has no extra rules beyond this shared recipe.

| What | Rule |
|---|---|
| Surface | `bg-popover/70`, open/close animation disabled (`animate-none`) |
| Glass layer | `::before` covering the surface: `backdrop-blur-2xl backdrop-saturate-150`, `rounded-[inherit]`, behind content (`-z-1`) |
| Items, triggers, checkbox/radio items | `cursor-pointer` |
| Item icons | `size-3.5 text-muted-foreground` |
| Item icons — focused / highlighted / expanded | `text-accent-foreground` |
| Item `:focus` / `[data-highlighted]` | `bg-foreground/10` |
| Sub-trigger `:focus` / `[aria-expanded="true"]` | `bg-foreground/10` |
| Separators | `bg-foreground/5` |

---

## Destructive menu items

For dropdown-menu, context-menu, and menubar items with `data-variant="destructive"` (`uishadcn.css:178-221`). Lives in `@layer utilities` — see [cascade tricks](#how-the-cascade-tricks-work) #2.

| State | Rule |
|---|---|
| Rest | item text + all descendants (incl. icons): `var(--destructive)` |
| `:focus` / `[data-highlighted]` | background `color-mix(in oklab, var(--destructive) 5%, transparent)`, text stays destructive |
| Shortcut inside a focused/highlighted destructive item | `var(--destructive)` |

---

## Menubar

Everything from the [shared glass recipe](#menus--pickers--shared-glass-recipe), plus: checkbox/radio **ticks move to the right** to match dropdown and context menus (`uishadcn.css:162-171`) — items get `pr-8 pl-1.5`, and the absolute indicator span moves to `right-2 left-auto`.

---

## Combobox

Content surface comes from the [shared glass recipe](#menus--pickers--shared-glass-recipe). Extras:

- **Flush search header** (`uishadcn.css:279-293`): the input-group that is a direct child of `combobox-content` renders as a plain bottom-bordered row — `border-b border-border pb-1`, no side/top borders, `rounded-none`, `bg-background`, no shadow, no ring. It keeps `ring-0` even when focused, so only the global list surface reads as "the field".
- **Chips**: `combobox-chips` gets the global `ring-1` on focus-within or when it contains an invalid control (see [focus rings](#global-focus--invalid-rings)).

---

## Command palette (cmdk)

`uishadcn.css:227-273`.

| What | Rule |
|---|---|
| Root | `p-0` |
| Items | `cursor-pointer`; icons `size-3.5 text-muted-foreground` |
| Input wrapper | `border-b border-border pb-1`; its inner input-group is stripped: `border-none bg-background` |
| Selected item (`data-selected="true"` / `aria-selected="true"`) | background `color-mix(in oklab, var(--foreground) 10%, transparent)`, text and icons `var(--foreground)` — raw CSS, see [cascade tricks](#how-the-cascade-tricks-work) #3 |
| Search-match `<mark>` | background `color-mix(in oklab, var(--foreground) 14%, transparent)`, inherits text color, `border-radius: 0.2em`, no padding |

---

## Dialog & Sheet

Dialog's recipe lives inline in [`dialog.tsx`](../components/ui/dialog.tsx) — the structure itself is custom.

| Part | Rule |
|---|---|
| Overlay | `bg-black/10` + `backdrop-blur-xs` (when supported), fade in/out, `duration-100` |
| Content | centered fixed panel, `w-full max-w-[calc(100%-2rem)] sm:max-w-sm`, `rounded-xl bg-popover p-4 text-sm` — **`ring-1 ring-foreground/10` instead of border + shadow**, zoom-95 + fade, `duration-100` |
| Close button | ghost `size="icon-sm"` Button, `absolute top-2 right-2`, Cancel01 icon; forced to `text-muted-foreground` via CSS (`uishadcn.css:413-418`) — **the same rule covers `sheet-close`** |
| Header | `flex flex-col gap-2` |
| Footer | full-bleed band: `-mx-4 -mb-4 p-4 border-t bg-muted/50 rounded-b-xl`; stacks `flex-col-reverse` on mobile, right-aligned row on `sm+`; optional built-in outline Close via `showCloseButton` |
| Title | `font-heading text-base font-medium leading-none` |
| Description | `text-sm text-muted-foreground`; links underlined (`underline-offset-3`), hover → `text-foreground` |

---

## Toast

`uishadcn.css:424-511`. `toast.tsx` stays stock — tints key off the `data-type` attribute Base UI stamps on the root.

**Density**

| Part | Rule |
|---|---|
| Content | `py-2 px-3` |
| Action button | `h-6 px-2 gap-1 text-xs`, radius `min(var(--radius-md), 10px)`, icons `size-3` |
| Close button | `size-6`, same radius and icon size |

**Type tints** — same palette as the alert example. The tint is mixed **into** `--popover` with `color-mix()` rather than laid over it at 5% alpha: toasts float above page content, so the surface must stay opaque.

| Type | Border / text (light) | Border / text (dark) | Surface |
|---|---|---|---|
| success | `emerald-200` / `emerald-700` | `emerald-400/20` / `emerald-400` | emerald-500 @ 5% into popover (dark: emerald-400 @ 6%) |
| info | `blue-200` / `blue-700` | `blue-400/20` / `blue-400` | blue-500 @ 5% (dark: blue-400 @ 6%) |
| warning | `amber-200` / `amber-700` | `amber-400/20` / `amber-400` | amber-500 @ 5% (dark: amber-400 @ 6%) |
| error | `red-200` / `text-destructive` | `red-400/20` / `red-400` | `--destructive` @ 3% (dark: red-400 @ 6%); description at `/90`, icon `text-current` |

Buttons on tinted surfaces: the **close** button gets the alert example's *ghost* recipe (tinted text, tinted hover bg) and the **action** button its *solid* recipe (tinted fill) — a stock outline/ghost button resolves its hover to `muted`/`foreground`, which lands as a grey smudge on a tinted surface. These rules are unlayered, so they win without `!important`.

---

## Tabs

Default-variant tabs list gets a bordered app-surface look instead of the stock muted pill (`uishadcn.css:396-411`):

| What | Rule |
|---|---|
| List (`data-variant="default"`) | `bg-background` + `border` |
| Active tab | `bg-muted`, shadow removed |
| Tab hover | `bg-muted` |

Selectors target `[role="tab"]` instead of `data-slot="tabs-trigger"` because a TooltipTrigger `render` replaces the trigger's `data-slot` with `tooltip-trigger`.

---

## Table

Container gets `border` + `rounded-lg` (`uishadcn.css:392-394`).

---

## Input, Textarea & Input Group

`uishadcn.css:299-309`.

| What | Rule |
|---|---|
| input, textarea, input-group-control | `text-sm` |
| Buttons inside an input-group | `text-xs font-normal` |
| Focus / invalid | global `ring-1` — input-group lights up when any control inside it is focused or invalid (see [focus rings](#global-focus--invalid-rings)) |

---

## Button Group

`button-group-text` (the static text segment): `font-normal bg-background` (`uishadcn.css:311-315`).

---

## Label, Field & Progress

Weight/size normalization — labels are never bold (`uishadcn.css:344-367`):

| Slot | Rule |
|---|---|
| label | `font-normal` |
| field-label | `font-normal text-sm` |
| field-description | `text-xs` |
| progress-label | `font-normal` |
| progress-value | `text-xs` |

---

## Checkbox, Radio & Switch — destructive / invalid states

`uishadcn.css:317-342`.

| What | Rule |
|---|---|
| field-label containing a checked `data-variant="destructive"` control | card tint `border-destructive/30 bg-destructive/5` (dark: `/20`, `/10`) — mirrors FieldLabel's checked-primary recipe (`has-data-checked:border-primary/30 bg-primary/5`) |
| Switch, destructive + checked | `bg-destructive` |
| Checkbox / radio, checked while `aria-invalid` **or** destructive variant | `border-destructive bg-destructive text-white` |
| Radio indicator dot in those states | white |
