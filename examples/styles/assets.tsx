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
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/toast"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Icon, type IconData } from "@/icons/icons"
import {
  AppWindowIcon,
  BlurIcon,
  Image01Icon,
  Layers01Icon,
} from "@/icons/huge-icons"

type SetKey = "brand" | "backgrounds" | "app" | "placeholders"

type Asset = {
  src: string
  name: string
  /** Photography and textures fill the tile; marks sit inside it. */
  fit: "cover" | "contain"
  /** SVGs that stroke/fill `currentColor` — invert so they read in dark mode. */
  invert?: boolean
  /** Wordmarks span two columns. */
  wide?: boolean
}

const sets: Record<SetKey, Asset[]> = {
  brand: [
    { src: "/brand/agent.png", name: "Agent", fit: "cover" },
    { src: "/brand/aiellie.png", name: "AI Ellie", fit: "cover" },
    { src: "/brand/clouds.png", name: "Clouds", fit: "cover" },
    { src: "/brand/grain.png", name: "Grain", fit: "cover" },
    { src: "/brand/strobe.png", name: "Strobe", fit: "cover" },
    {
      src: "/brand/ellie-transparent-bg.png",
      name: "Ellie",
      fit: "contain",
      wide: true,
    },
    {
      src: "/brand/aiellie-ui-logo.svg",
      name: "Wordmark",
      fit: "contain",
      invert: true,
      wide: true,
    },
    {
      src: "/brand/elephant-stroke-rounded.svg",
      name: "Elephant",
      fit: "contain",
      invert: true,
    },
    {
      src: "/brand/elephant-front-stroke-rounded.svg",
      name: "Elephant front",
      fit: "contain",
      invert: true,
    },
    { src: "/brand/favicon.svg", name: "Favicon", fit: "contain" },
    { src: "/brand/github.avatar.png", name: "GitHub avatar", fit: "contain" },
  ],
  backgrounds: [
    {
      src: "/brand/gradientclean.png",
      name: "Gradient clean",
      fit: "cover",
      wide: true,
    },
    {
      src: "/brand/gradientgrain.png",
      name: "Gradient grain",
      fit: "cover",
      wide: true,
    },
  ],
  app: [
    { src: "/icon.svg", name: "App icon", fit: "contain" },
    { src: "/apple-icon.png", name: "Apple icon", fit: "contain" },
    { src: "/icon-dark-32x32.png", name: "Dark 32×32", fit: "contain" },
    { src: "/icon-light-32x32.png", name: "Light 32×32", fit: "contain" },
  ],
  placeholders: [
    { src: "/placeholder.jpg", name: "Photo", fit: "cover" },
    { src: "/placeholder.svg", name: "Image", fit: "cover" },
    { src: "/placeholder-user.jpg", name: "User", fit: "cover" },
    {
      src: "/placeholder-logo.svg",
      name: "Logo SVG",
      fit: "contain",
      invert: true,
      wide: true,
    },
    {
      src: "/placeholder-logo.png",
      name: "Logo PNG",
      fit: "contain",
      invert: true,
      wide: true,
    },
  ],
}

const setMeta: Record<SetKey, { label: string; icon: IconData }> = {
  brand: { label: "Brand", icon: Image01Icon },
  backgrounds: { label: "Backgrounds", icon: BlurIcon },
  app: { label: "App", icon: AppWindowIcon },
  placeholders: { label: "Placeholders", icon: Layers01Icon },
}

const setKeys = Object.keys(setMeta) as SetKey[]

function extensionOf(src: string) {
  return src.split(".").pop()?.toUpperCase() ?? ""
}

function folderOf(src: string) {
  const parts = src.replace(/^\//, "").split("/")
  return parts.length > 1 ? parts[0] : "public"
}

function fileOf(src: string) {
  return src.split("/").pop() ?? src
}

export function AssetsExample() {
  const [set, setSet] = React.useState<SetKey>("brand")
  const [selected, setSelected] = React.useState<Asset | null>(null)
  const clipboard = useCopyToClipboard()

  const assets = sets[set]
  const active = selected && assets.includes(selected) ? selected : null

  async function selectAsset(asset: Asset) {
    setSelected(asset)
    const copied = await clipboard.copyToClipboard(asset.src)
    toast.add(
      copied
        ? {
            title: `Copied ${asset.src}`,
            description: asset.name,
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
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Assets</CardTitle>
        <CardDescription>
          Brand, backgrounds, and placeholders from public/
        </CardDescription>
        <CardAction>
          <Badge variant="secondary" className="font-mono">
            {assets.length}
          </Badge>
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
        <ScrollArea className="-me-2 pe-2 *:data-[slot=scroll-area-viewport]:max-h-90">
          <div className="grid grid-cols-4 gap-1.5 p-0.5">
            {assets.map((asset) => (
              <button
                key={asset.src}
                type="button"
                aria-pressed={active?.src === asset.src}
                aria-label={`${asset.name} (${asset.src})`}
                onClick={() => void selectAsset(asset)}
                className={cn(
                  "flex min-w-0 cursor-pointer flex-col gap-1.5 rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  asset.wide || asset.fit === "cover"
                    ? "col-span-2"
                    : "col-span-1"
                )}
              >
                <span
                  className={cn(
                    "relative overflow-hidden rounded-lg ring-1 ring-foreground/10 ring-inset transition-transform hover:-translate-y-0.5",
                    asset.fit === "cover" || asset.wide
                    ? "aspect-video"
                    : "aspect-square",
                    asset.fit === "contain" &&
                      "bg-[repeating-conic-gradient(from_0deg,var(--border)_0_25%,transparent_0_50%)] bg-size-[10px_10px]",
                    active?.src === asset.src &&
                      "ring-2 ring-foreground/70 ring-offset-2 ring-offset-card"
                  )}
                >
                  <img
                    src={asset.src}
                    alt={asset.name}
                    className={cn(
                      "size-full",
                      asset.fit === "cover"
                        ? "object-cover"
                        : "object-contain p-2",
                      asset.invert && "dark:invert"
                    )}
                  />
                </span>
                <span className="truncate text-center text-[10px] leading-none tracking-tight text-muted-foreground">
                  {asset.name}
                </span>
              </button>
            ))}
          </div>
        </ScrollArea>
        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-2.5 py-2">
          {active ? (
            <img
              src={active.src}
              alt=""
              className={cn(
                "size-5 shrink-0 rounded-md object-cover ring-1 ring-foreground/10 ring-inset",
                active.invert && "dark:invert"
              )}
            />
          ) : (
            <span className="size-5 shrink-0 rounded-md bg-background ring-1 ring-foreground/10 ring-inset" />
          )}
          <span className="min-w-0 flex-1 truncate font-mono text-xs">
            {active ? active.src : "Pick an asset"}
          </span>
          {active ? (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label={`Copy ${active.src}`}
                    onClick={() => {
                      void (async () => {
                        const copied = await clipboard.copyToClipboard(
                          active.src
                        )
                        toast.add(
                          copied
                            ? {
                                title: "Copied path",
                                description: active.src,
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
                  icon={clipboard.isCopied ? Tick02Icon : Copy01Icon}
                  strokeWidth={2}
                />
              </TooltipTrigger>
              <TooltipContent>Copy path</TooltipContent>
            </Tooltip>
          ) : (
            <span className="shrink-0 text-[11px] text-muted-foreground">
              Copies its path
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2">
        <Breadcrumb>
          <BreadcrumbList className="gap-0.5 font-mono text-xs">
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="flex items-center gap-1.5">
                <Icon icon={Image01Icon} strokeWidth={2} className="size-3.5" />
                public
              </BreadcrumbLink>
            </BreadcrumbItem>
            {active && folderOf(active.src) !== "public" && (
              <>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">
                    {folderOf(active.src)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            {active && (
              <>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>{fileOf(active.src)}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        <Badge variant="secondary" className="shrink-0 font-mono">
          {active ? extensionOf(active.src) : setMeta[set].label}
        </Badge>
      </CardFooter>
    </Card>
  )
}
