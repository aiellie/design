# DesignEllieAI conventions

## Setup & wrapping

No global provider is required — components style themselves from `styles.css` (tokens + compiled Tailwind + Geist fonts). Specifics:

- **Dark mode**: add the `dark` class to a root element (`<div className="dark bg-background">…`). Tokens flip automatically; there is no theme provider.
- **Toasts**: render `<Toaster />` once near the root, then call `toast.add({ type: "success", title: "…" })` from anywhere.
- **Tooltips**: wrap the region in `<TooltipProvider>`; **Sidebar** layouts require `<SidebarProvider>` around `Sidebar` + content.
- Subcomponents are flat named exports: `Card` + `CardHeader` + `CardContent`…, `Dialog` + `DialogTrigger` + `DialogContent`… Compose them as shown in each component's `.prompt.md`.

## Styling idiom

Tailwind v4 utility classes over semantic design tokens. **Never hardcode hex/oklch colors — use the token utilities**, which adapt to dark mode for free:

| Family | Utilities (background / text pattern) |
|---|---|
| Surfaces | `bg-background`, `bg-card`, `bg-popover`, `bg-muted`, `bg-secondary`, `bg-accent`, `bg-sidebar` |
| Text | `text-foreground`, `text-muted-foreground`, `text-card-foreground`, `text-popover-foreground` |
| Brand | `bg-primary` + `text-primary-foreground` (violet), `text-primary`, `bg-primary/10` for tints |
| Status | `bg-destructive`, `text-destructive` (tint with `/10`), `bg-success`, `bg-warning`. For success/warning/info messaging prefer the components' own variants (`Alert`, `toast.add({ type })`, `Badge` tints) — those wire the full token pairs. |
| Charts | `--chart-1` … `--chart-5` (use via `var(--chart-N)` in chart configs) |
| Lines & focus | `border-border`, `border-input`, `ring-ring` |
| Extras | `bg-brand-gradient` (brand gradient fill), `bg-dotted` (dotted canvas background) |

- Radius rides the tokens too: `rounded-lg` etc. derive from `--radius` (0.875rem). Pills use `rounded-full` (the house style for small buttons/badges).
- Fonts: `font-sans` (Geist, the default), `font-mono` (Geist Mono), `font-heading`. Body text is `text-sm` in most compositions.
- Component variants come from **props, not classes**: `<Button variant="outline" size="sm">`, `<Badge variant="outline">`. Check each `<Name>.d.ts` for the exact unions; don't re-create variants with utility classes.
- Opacity tints via the slash syntax are idiomatic: `bg-primary/5`, `bg-destructive/10`, `border-border/50`.

## Icons

Two sanctioned ways, both in the bundle:
1. The registry: `<Icon icon={Icons.search} />` — `Icons` holds ~95 curated names (`Icons.calendar`, `Icons.attachment`, `Icons.analytics`, …), `Icon` applies sizing/stroke conventions. `BrandIcons` holds logo marks.
2. Direct HugeIcons: `<HugeiconsIcon icon={SomeIcon} strokeWidth={2} />` with icons imported from `@hugeicons/core-free-icons` — this is the pattern component internals use. Inside `Button`, tag icons with `data-icon="inline-start"`/`"inline-end"` for correct padding.

## Where the truth lives

- `styles.css` → imports `fonts/fonts.css` (Geist `@font-face` + font variables) and `_ds_bundle.css` (every token under `:root`/`.dark` plus all compiled utilities). Read `_ds_bundle.css` before inventing any class — if a utility isn't there, it doesn't exist in this system.
- Per component: `components/<group>/<Name>/<Name>.prompt.md` (usage + real examples) and `<Name>.d.ts` (the exact props contract).

## Idiomatic build snippet

```jsx
const { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
        Button, Badge, Field, FieldLabel, Input } = window.DesignEllieAI;

<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Invite a teammate</CardTitle>
    <CardDescription>They'll get access to every shared board.</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-4">
    <Field>
      <FieldLabel htmlFor="invite-email">Work email</FieldLabel>
      <Input id="invite-email" type="email" placeholder="you@company.com" />
    </Field>
    <Badge variant="outline" className="rounded-full">Pro plan</Badge>
  </CardContent>
  <CardFooter className="justify-end gap-2">
    <Button variant="ghost" size="sm">Cancel</Button>
    <Button size="sm">Send invite</Button>
  </CardFooter>
</Card>
```
