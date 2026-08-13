
"use client"

import * as React from "react"
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/toast"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { CodeIcons } from "@/icons/code-icons"
import { Icon, Icons, type IconData } from "@/icons/icons"

type SetKey = "brand" | "interface" | "text" | "status" | "chart" | "sidebar"

type TokenSwatch = { label: string; token: string; swatch: string }

const sets: Record<SetKey, TokenSwatch[]> = {
  brand: [
    { label: "Primary", token: "--primary", swatch: "bg-primary" },
    { label: "Primary Foreground", token: "--primary-foreground", swatch: "bg-primary-foreground" },
    { label: "Secondary", token: "--secondary", swatch: "bg-secondary" },
    { label: "Secondary Foreground", token: "--secondary-foreground", swatch: "bg-secondary-foreground" },
    { label: "Accent", token: "--accent", swatch: "bg-accent" },
    { label: "Accent Foreground", token: "--accent-foreground", swatch: "bg-accent-foreground" },
  ],
  interface: [
    { label: "Muted", token: "--muted", swatch: "bg-muted" },
    { label: "Muted Foreground", token: "--muted-foreground", swatch: "bg-muted-foreground" },
    { label: "Border", token: "--border", swatch: "bg-border" },
    { label: "Input", token: "--input", swatch: "bg-input" },
    { label: "Ring", token: "--ring", swatch: "bg-ring" },
    { label: "Overlay", token: "--overlay", swatch: "bg-overlay" },
  ],  
  text: [
    { label: "Link", token: "--link", swatch: "bg-link" },
    { label: "Selection", token: "--selection", swatch: "bg-selection" },
    { label: "Selection Foreground", token: "--selection-foreground", swatch: "bg-selection-foreground" },
    { label: "Highlight", token: "--highlight", swatch: "bg-highlight" },
    { label: "Highlight Foreground", token: "--highlight-foreground", swatch: "bg-highlight-foreground" },
  ],
  status: [
    { label: "Destructive", token: "--destructive", swatch: "bg-destructive" },
    { label: "Destructive Foreground", token: "--destructive-foreground", swatch: "bg-destructive-foreground" },
    { label: "Success", token: "--success", swatch: "bg-success" },
    { label: "Success Foreground", token: "--success-foreground", swatch: "bg-success-foreground" },
    { label: "Warning", token: "--warning", swatch: "bg-warning" },
    { label: "Warning Foreground", token: "--warning-foreground", swatch: "bg-warning-foreground" },
  ],
  chart: [
    { label: "Chart 1", token: "--chart-1", swatch: "bg-chart-1" },
    { label: "Chart 2", token: "--chart-2", swatch: "bg-chart-2" },
    { label: "Chart 3", token: "--chart-3", swatch: "bg-chart-3" },
    { label: "Chart 4", token: "--chart-4", swatch: "bg-chart-4" },
    { label: "Chart 5", token: "--chart-5", swatch: "bg-chart-5" },
  ],
  sidebar: [
    { label: "Sidebar", token: "--sidebar", swatch: "bg-sidebar" },
    { label: "Sidebar Foreground", token: "--sidebar-foreground", swatch: "bg-sidebar-foreground" },
    { label: "Sidebar Primary", token: "--sidebar-primary", swatch: "bg-sidebar-primary" },
    { label: "Sidebar Primary Foreground", token: "--sidebar-primary-foreground", swatch: "bg-sidebar-primary-foreground" },
    { label: "Sidebar Accent", token: "--sidebar-accent", swatch: "bg-sidebar-accent" },
    { label: "Sidebar Accent Foreground", token: "--sidebar-accent-foreground", swatch: "bg-sidebar-accent-foreground" },
  ],
}

/** Shipped in the copied block but not given a swatch of their own. */
const neutralTokens = ["--background", "--foreground", "--border"]

const setMeta: Record<SetKey, { label: string; icon: IconData }> = {
  brand: { label: "Brand", icon: Icons.colors },
  interface: { label: "Interface", icon: Icons.layers },
  text: { label: "Text", icon: Icons.text },
  status: { label: "Status", icon: Icons.alert },
  chart: { label: "Chart ramp", icon: Icons.analytics },
  sidebar: { label: "Sidebar", icon: Icons.sidebarLeft },
}

const setKeys = Object.keys(setMeta) as SetKey[]

export function ColorsExample() {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [set, setSet] = React.useState<SetKey>("brand")
  const [selected, setSelected] = React.useState<
    (TokenSwatch & { value: string }) | null
  >(null)
  const theme = useCopyToClipboard()
  const detail = useCopyToClipboard()

  const swatches = sets[set]

  /** Read at click time, so the value always matches the theme in force. */
  function readValue(token: string) {
    const root = rootRef.current
    if (!root) return ""
    return getComputedStyle(root).getPropertyValue(token).trim()
  }

  async function selectToken(entry: TokenSwatch) {
    const value = readValue(entry.token)
    setSelected({ ...entry, value })
    const copied = await detail.copyToClipboard(entry.token)
    toast.add(
      copied
        ? {
            title: `Copied ${entry.token}`,
            description: value,
            type: "success",
          }
        : {
            title: "Could not copy",  
            description: "The clipboard is unavailable here.",
            type: "error",
          }
    )
  }

  async function copyThemeCss() {
    const tokens = [
      ...sets.brand.map((entry) => entry.token),
      ...sets.interface.map((entry) => entry.token),
      ...sets.text.map((entry) => entry.token),
      ...sets.status.map((entry) => entry.token),
      ...sets.chart.map((entry) => entry.token),
      ...sets.sidebar.map((entry) => entry.token),
      ...neutralTokens,
    ]
    const block = `:root {\n${tokens
      .map((token) => `  ${token}: ${readValue(token)};`)
      .join("\n")}\n}`
    const copied = await theme.copyToClipboard(block)
    toast.add(
      copied
        ? {
            title: "Copied themes.css",
            description: `${tokens.length} tokens as CSS variables.`,
            type: "success",
          }
        : {
            title: "Could not copy",
            description: "The clipboard is unavailable here.",
            type: "error",
          }
    )
  }

  return (
    <Card ref={rootRef} className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>Color Tokens</CardTitle>
        <CardDescription>Semantic palette in oklch</CardDescription>
        <CardAction>
          <Button variant="outline" size="xs" onClick={copyThemeCss}>
          <CodeIcons.css className="size-3.5" />
            themes
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <ToggleGroup
          size="sm"
          spacing={0}
          variant="outline"
          className="w-full"
          value={[set]}
          onValueChange={(value) => {
            const next = value[0]
            if (next) setSet(next as SetKey)
          }}
        >
          {setKeys.map((key) => (
            <Tooltip key={key}>
              <TooltipTrigger
                render={
                  <ToggleGroupItem
                    value={key}
                    aria-label={setMeta[key].label}
                    className="flex-1"
                  >
                    <Icon
                      icon={setMeta[key].icon}
                      strokeWidth={2}
                      className="transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-active/toggle:scale-90 group-aria-pressed/toggle:scale-110"
                    />
                  </ToggleGroupItem>
                }
              />
              <TooltipContent>{setMeta[key].label}</TooltipContent>
            </Tooltip>
          ))}
        </ToggleGroup>
        <div className="grid grid-cols-6 gap-1.5">
          {swatches.map((color) => (
            <button
              key={color.token}
              type="button"
              aria-pressed={selected?.token === color.token}
              onClick={() => void selectToken(color)}
              className="flex min-w-0 cursor-pointer flex-col gap-1.5 rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <span
                className={cn(
                  "h-12 rounded-lg ring-1 ring-foreground/10 transition-transform ring-inset hover:-translate-y-0.5",
                  selected?.token === color.token &&
                    "ring-2 ring-foreground/70 ring-offset-2 ring-offset-card",
                  color.swatch
                )}
              />
              <span className="truncate text-center text-[10px] leading-none tracking-tight text-muted-foreground">
                {color.label}
              </span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {setMeta[set].label}
            </span>
            <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
              5 steps
            </span>
          </div>
          <div
            className="flex h-8 overflow-hidden rounded-lg ring-1 ring-foreground/10 ring-inset"
            role="img"
            aria-label={`${setMeta[set].label} colour ramp`}
          >
            {swatches.map((step) => (
              <span key={step.token} className={cn("flex-1", step.swatch)} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-2.5 py-2">
          <span
            className={cn(
              "size-5 shrink-0 rounded-md ring-1 ring-foreground/10 ring-inset",
              selected?.swatch ?? "bg-background"
            )}
          />
          <span className="min-w-0 flex-1 truncate font-mono text-xs">
            {selected ? selected.token : "Pick a swatch"}
          </span>
          {selected ? (
            <>
              <span className="max-w-[104px] shrink-0 truncate font-mono text-[11px] text-muted-foreground">
                {selected.value}
              </span>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      aria-label={`Copy the value of ${selected.token}`}
                      onClick={() => {
                        void (async () => {
                          const copied = await detail.copyToClipboard(
                            selected.value
                          )
                          toast.add(
                            copied
                              ? {
                                  title: "Copied value",
                                  description: selected.value,
                                  type: "success",
                                }
                              : {
                                  title: "Could not copy",
                                  description:
                                    "The clipboard is unavailable here.",
                                  type: "error",
                                }
                          )
                        })()
                      }}
                    />
                  }
                >
                  <HugeiconsIcon
                    icon={detail.isCopied ? Tick02Icon : Copy01Icon}
                    strokeWidth={2}
                  />
                </TooltipTrigger>
                <TooltipContent>Copy value</TooltipContent>
              </Tooltip>
            </>
          ) : (
            <span className="shrink-0 text-[11px] text-muted-foreground">
              Copies its token
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2">
      <Breadcrumb>
        <BreadcrumbList className="font-mono text-xs gap-0.5">
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="flex items-center gap-1.5">
              <CodeIcons.tsx className="size-3.5" />
              examples
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">styles</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>colors.tsx</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
        <Badge variant="secondary" className="shrink-0 font-mono">
          oklch
        </Badge>
      </CardFooter>
    </Card>
  )
}