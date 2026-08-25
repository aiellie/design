"use client"

import * as React from "react"

import { StyleSheetCard } from "@/examples/styles/stylesheet-card"
import { Button } from "@/components/ui/button"
import { Icon } from "@/icons/icons"
import { cn } from "@/lib/utils"
import {
  CursorPointer01Icon,
  SmileIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons"

export function GlobalsExample() {
  const imports = [
    "tailwindcss",
    "tw-animate-css",
    "shadcn/tailwind.css",
    "typeset.css",
    "uishadcn.css",
    "themes.css",
    "sidebar.css",
  ]

  return (
    <StyleSheetCard
      title="Globals"
      description="Entry file — tokens, imports, and base layer"
      filename="globals.css"
    >
      <div className="flex flex-col gap-1">
        {imports.map((name) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-md bg-muted/50 px-2.5 py-1.5 font-mono text-[11px]"
          >
            <span className="text-muted-foreground">@import</span>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </StyleSheetCard>
  )
}

export function ThemesExample() {
  return (
    <StyleSheetCard
      title="Themes"
      description="Light and dark tokens for the aiellie theme"
      filename="themes.css"
    >
      <div className="flex flex-col gap-3">
        <div
          className="h-10 rounded-lg bg-brand-gradient ring-1 ring-foreground/10 ring-inset"
          role="img"
          aria-label="Brand gradient"
        />
        <div className="grid grid-cols-6 gap-1.5">
          {[
            "bg-background",
            "bg-foreground",
            "bg-primary",
            "bg-muted",
            "bg-destructive",
            "bg-success",
          ].map((swatch) => (
            <span
              key={swatch}
              className={cn(
                "h-8 rounded-md ring-1 ring-foreground/10 ring-inset",
                swatch
              )}
            />
          ))}
        </div>
        <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
          <span>--radius</span>
          <span>0.875rem</span>
        </div>
      </div>
    </StyleSheetCard>
  )
}

export function TypographyExample() {
  const faces = [
    { label: "sans", className: "font-sans" },
    { label: "heading", className: "font-heading" },
    { label: "mono", className: "font-mono" },
    { label: "serif", className: "font-serif" },
  ]
  const sizes = [
    { label: "xs", className: "text-xs" },
    { label: "sm", className: "text-sm" },
    { label: "base", className: "text-base" },
  ]

  return (
    <StyleSheetCard
      title="Typography"
      description="Font families, weights, and type scale"
      filename="typography.css"
    >
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-4 gap-1.5">
          {faces.map((face) => (
            <div
              key={face.label}
              className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 py-2"
            >
              <span className={cn("text-lg leading-none", face.className)}>
                Ag
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {face.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-baseline justify-between gap-3">
          {sizes.map((size) => (
            <span key={size.label} className={cn("leading-none", size.className)}>
              {size.label}
            </span>
          ))}
          <span className="font-mono text-[11px] text-muted-foreground">
            350 / 450
          </span>
        </div>
      </div>
    </StyleSheetCard>
  )
}

export function RadiusExample() {
  const steps = [
    { label: "sm", className: "rounded-sm" },
    { label: "md", className: "rounded-md" },
    { label: "lg", className: "rounded-lg" },
    { label: "xl", className: "rounded-xl" },
    { label: "2xl", className: "rounded-2xl" },
    { label: "3xl", className: "rounded-3xl" },
  ]

  return (
    <StyleSheetCard
      title="Radius"
      description="Base token and Tailwind rounded-* scale"
      filename="radius.css"
    >
      <div className="grid grid-cols-6 gap-1.5">
        {steps.map((step) => (
          <div key={step.label} className="flex flex-col items-center gap-1.5">
            <span
              className={cn(
                "size-10 bg-primary/15 ring-1 ring-primary/20 ring-inset",
                step.className
              )}
            />
            <span className="font-mono text-[10px] text-muted-foreground">
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </StyleSheetCard>
  )
}

export function BoxShadowExample() {
  const steps = [
    { label: "xs", className: "shadow-xs" },
    { label: "sm", className: "shadow-sm" },
    { label: "md", className: "shadow-md" },
    { label: "lg", className: "shadow-lg" },
    { label: "xl", className: "shadow-xl" },
    { label: "2xl", className: "shadow-2xl" },
  ]

  return (
    <StyleSheetCard
      title="Box Shadow"
      description="House elevation scale for light and dark"
      filename="box-shadow.css"
    >
      <div className="grid grid-cols-6 gap-2 rounded-lg bg-muted/40 p-3">
        {steps.map((step) => (
          <div key={step.label} className="flex flex-col items-center gap-1.5">
            <span
              className={cn(
                "size-9 rounded-lg bg-card ring-1 ring-foreground/10",
                step.className
              )}
            />
            <span className="font-mono text-[10px] text-muted-foreground">
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </StyleSheetCard>
  )
}

export function AnimationsExample() {
  const [key, setKey] = React.useState(0)

  return (
    <StyleSheetCard
      title="Animations"
      description="Panel open/close motion and toggle fades"
      filename="animations.css"
    >
      <div className="flex items-center justify-between gap-3">
        <button
          key={key}
          type="button"
          data-slot="panel-toggle"
          className="flex size-10 items-center justify-center rounded-lg bg-muted"
          aria-label="Panel toggle preview"
        >
          <Icon icon={SparklesIcon} strokeWidth={2} className="size-4" />
        </button>
        <div className="flex flex-col items-end gap-0.5 font-mono text-[11px] text-muted-foreground">
          <span>220ms · 0.32, 0.72, 0, 1</span>
          <Button size="xs" variant="outline" onClick={() => setKey((n) => n + 1)}>
            Replay
          </Button>
        </div>
      </div>
    </StyleSheetCard>
  )
}

export function IconStylesExample() {
  const sizes = [
    { label: "xs", className: "icon-xs size-3" },
    { label: "sm", className: "icon-sm size-3.5" },
    { label: "md", className: "icon-md size-4" },
    { label: "lg", className: "icon-lg size-5" },
    { label: "xl", className: "icon-xl size-6" },
  ]

  return (
    <StyleSheetCard
      title="Icon Styles"
      description="Default size, stroke, and icon-* presets"
      filename="icons.css"
    >
      <div className="flex items-end justify-between gap-2">
        {sizes.map((size) => (
          <div key={size.label} className="flex flex-col items-center gap-1.5">
            <Icon
              icon={SmileIcon}
              strokeWidth={1.65}
              data-slot="icon"
              className={size.className}
            />
            <span className="font-mono text-[10px] text-muted-foreground">
              {size.label}
            </span>
          </div>
        ))}
      </div>
    </StyleSheetCard>
  )
}

export function SvgExample() {
  const widths = [
    { label: "0.5", className: "stroke-0.5" },
    { label: "1", className: "stroke-1" },
    { label: "1.5", className: "stroke-1.5" },
    { label: "1.75", className: "stroke-1.75" },
    { label: "2", className: "stroke-2" },
    { label: "2.5", className: "stroke-2.5" },
  ]

  return (
    <StyleSheetCard
      title="SVG"
      description="Stroke geometry utilities for inline artwork"
      filename="svg.css"
    >
      <div className="flex items-end justify-between gap-1">
        {widths.map((width) => (
          <div key={width.label} className="flex flex-col items-center gap-1.5">
            <svg
              data-slot="svg"
              viewBox="0 0 24 24"
              className={cn("svg-cascade size-8 text-foreground", width.className)}
            >
              <circle cx="12" cy="12" r="8" />
            </svg>
            <span className="font-mono text-[10px] text-muted-foreground">
              {width.label}
            </span>
          </div>
        ))}
      </div>
    </StyleSheetCard>
  )
}

export function UtilitiesExample() {
  return (
    <StyleSheetCard
      title="Utilities"
      description="Custom utilities and pointer cursor"
      filename="utilities.css"
    >
      <div className="flex flex-col gap-3">
        <div className="bg-dotted flex h-16 items-center justify-center rounded-lg ring-1 ring-foreground/10 ring-inset">
          <span className="font-mono text-[11px] text-muted-foreground">
            bg-dotted
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon icon={CursorPointer01Icon} strokeWidth={2} className="size-4" />
          Buttons use cursor: pointer
        </div>
      </div>
    </StyleSheetCard>
  )
}

export function BaseExample() {
  return (
    <StyleSheetCard
      title="Base"
      description="Element defaults, selection, and scrollbars"
      filename="base.css"
    >
      <div className="flex flex-col gap-3 text-sm">
        <p>
          Select this{" "}
          <span className="rounded-sm bg-selection px-1 text-selection-foreground">
            highlighted
          </span>{" "}
          copy to preview{" "}
          <mark className="rounded-sm px-1">::selection</mark>.
        </p>
        <p className="text-xs text-muted-foreground">
          Scrollbars pick up <code className="font-mono">--border</code>.
        </p>
      </div>
    </StyleSheetCard>
  )
}

export function SidebarStylesExample() {
  return (
    <StyleSheetCard
      title="Sidebar Styles"
      description="Menu color and hover-action rules"
      filename="sidebar.css"
    >
      <div className="flex flex-col gap-1">
        {["Overview", "Inbox", "Settings"].map((label, index) => (
          <div
            key={label}
            data-slot="sidebar-menu-button"
            data-active={index === 0 ? "true" : undefined}
            className="rounded-md px-2.5 py-1.5 text-sm"
          >
            {label}
          </div>
        ))}
      </div>
    </StyleSheetCard>
  )
}

export function UiShadcnExample() {
  const sections = [
    "Globals",
    "Menus",
    "Command",
    "Combobox",
    "Forms",
    "Buttons",
    "Surfaces",
    "Toast",
    "Chat",
  ]

  return (
    <StyleSheetCard
      title="UI"
      description="Skin over stock shadcn, keyed on data-slot"
      filename="uishadcn.css"
    >
      <div className="grid grid-cols-3 gap-1.5">
        {sections.map((section, index) => (
          <div
            key={section}
            className="flex items-center gap-1.5 rounded-md bg-muted/50 px-2 py-1.5"
          >
            <span className="font-mono text-[10px] text-muted-foreground">
              {index + 1}
            </span>
            <span className="truncate text-xs">{section}</span>
          </div>
        ))}
      </div>
    </StyleSheetCard>
  )
}

export function ColorsCssExample() {
  return (
    <StyleSheetCard
      title="Color Map"
      description="Tailwind color mapping plus light and dark values"
      filename="colors.css"
    >
      <div className="grid grid-cols-8 gap-1">
        {[
          "bg-background",
          "bg-foreground",
          "bg-card",
          "bg-primary",
          "bg-secondary",
          "bg-muted",
          "bg-accent",
          "bg-destructive",
          "bg-border",
          "bg-input",
          "bg-ring",
          "bg-chart-1",
          "bg-sidebar",
          "bg-selection",
          "bg-highlight",
          "bg-popover",
        ].map((swatch) => (
          <span
            key={swatch}
            className={cn(
              "h-7 rounded-md ring-1 ring-foreground/10 ring-inset",
              swatch
            )}
          />
        ))}
      </div>
    </StyleSheetCard>
  )
}
