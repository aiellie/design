import {
  ArrowUpRightIcon,
  BadgeCheck,
  ChampionIcon,
  CrownIcon,
  DiscordIcon,
  FigmaIcon,
  Fire02Icon,
  GemIcon,
  GithubIcon,
  Heart,
  MagicWand05Icon,
  MedalFirstPlaceIcon,
  Notion01Icon,
  Rocket01Icon,
  SlackIcon,
  Star,
  TrelloIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress, ProgressLabel } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

/**
 * Status dot for a badge. Plain spans rather than an icon, so it inherits the
 * badge's colour through `currentColor` and always matches whatever palette
 * the badge is wearing. `data-icon` is what earns the tighter start padding.
 */
function BadgeDot({ pulse = false }: { pulse?: boolean }) {
  return (
    <span
      data-icon="inline-start"
      className="relative flex size-1.5 shrink-0 items-center justify-center"
    >
      {pulse && (
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60 motion-reduce:hidden" />
      )}
      <span
        aria-hidden
        className="absolute inline-flex size-full rounded-full border border-current/30"
      />
      <span className="relative inline-flex size-1 rounded-full bg-current" />
    </span>
  )
}

type Integration = {
  name: string
  icon: typeof GithubIcon
  /** Palette for the circle — light and dark in one string. */
  className: string
}

const integrations: Integration[] = [
  {
    name: "GitHub",
    icon: GithubIcon,
    className:
      "border-zinc-500/20 bg-zinc-50 text-zinc-700 dark:border-zinc-400/20 dark:bg-zinc-900 dark:text-zinc-300",
  },
  {
    name: "Figma",
    icon: FigmaIcon,
    className:
      "border-fuchsia-500/20 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-400/20 dark:bg-fuchsia-950 dark:text-fuchsia-300",
  },
  {
    name: "Slack",
    icon: SlackIcon,
    className:
      "border-emerald-500/20 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-950 dark:text-emerald-300",
  },
  {
    name: "Notion",
    icon: Notion01Icon,
    className:
      "border-sky-500/20 bg-sky-50 text-sky-700 dark:border-sky-400/20 dark:bg-sky-950 dark:text-sky-300",
  },
]

/** The two behind the "+2" — listed in the overflow popover. */
const overflow = [
  {
    name: "Trello",
    icon: TrelloIcon,
    className:
      "border-blue-500/20 bg-blue-50 text-blue-700 dark:border-blue-400/20 dark:bg-blue-950 dark:text-blue-300",
  },
  {
    name: "Discord",
    icon: DiscordIcon,
    className:
      "border-indigo-500/20 bg-indigo-50 text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-950 dark:text-indigo-300",
  },
]

type Achievement = {
  name: string
  icon: typeof GithubIcon
  /** One line on what earned it. */
  detail: string
  /** Absolute date — "2 months ago" would go stale in a static demo. */
  earned?: string
  /** Share of members holding it. The bragging rights. */
  held?: string
  /** Palette for the circle — light and dark in one string. */
  className: string
  /** Set instead of `earned` while the award is still out of reach. */
  progress?: { label: string; current: number; total: number }
}

const achievements: Achievement[] = [
  {
    name: "First Ship",
    icon: Rocket01Icon,
    detail: "Merged your first component into the system.",
    earned: "12 Jan 2026",
    held: "Held by 68%",
    className:
      "border-violet-500/20 bg-violet-50 text-violet-700 dark:border-violet-400/20 dark:bg-violet-950 dark:text-violet-300",
  },
  {
    name: "Hot Streak",
    icon: Fire02Icon,
    detail: "Shipped something every day for a month.",
    earned: "3 Mar 2026",
    held: "Held by 21%",
    className:
      "border-orange-500/20 bg-orange-50 text-orange-700 dark:border-orange-400/20 dark:bg-orange-950 dark:text-orange-300",
  },
  {
    name: "Top Reviewer",
    icon: MedalFirstPlaceIcon,
    detail: "Most helpful reviews of the quarter.",
    earned: "30 Jun 2026",
    held: "Held by 4%",
    className:
      "border-amber-500/20 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-950 dark:text-amber-300",
  },
  {
    name: "Early Access",
    icon: GemIcon,
    detail: "One of the first twelve into the beta.",
    earned: "2 Nov 2025",
    held: "Held by 1%",
    className:
      "border-sky-500/20 bg-sky-50 text-sky-700 dark:border-sky-400/20 dark:bg-sky-950 dark:text-sky-300",
  },
  {
    name: "Champion",
    icon: ChampionIcon,
    detail: "Win five rounds of the quarterly design jam.",
    progress: { label: "Rounds won", current: 3, total: 5 },
    className: "border-dashed border-border bg-muted/50 text-muted-foreground",
  },
]

export function BadgeExample() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-start gap-5">
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge className="bg-primary/5 text-primary">Brand</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="outline" className="border-dashed">
          Dashed
        </Badge>
        <Badge variant="ghost">Ghost</Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge className="rounded-full border-blue-200 bg-blue-500/5 p-1 text-blue-700 dark:border-blue-400/20 dark:bg-blue-950 dark:text-blue-300">
          <HugeiconsIcon icon={BadgeCheck} data-icon="inline-start" />
          Verified
        </Badge>
        <Tooltip>
          <TooltipTrigger
            render={
              <Badge
                variant="outline"
                className="size-5 cursor-pointer rounded-full border-amber-200 bg-amber-50 p-0 text-amber-600 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400"
                aria-label="Featured"
              >
                <HugeiconsIcon
                  icon={Star}
                  strokeWidth={2}
                  className="fill-current"
                />
              </Badge>
            }
          />
          <TooltipContent>Featured</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Badge
                variant="outline"
                className="size-5 cursor-pointer rounded-full border-rose-200 bg-rose-50 p-0 text-rose-600 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-400"
                aria-label="Liked"
              >
                <HugeiconsIcon
                  icon={Heart}
                  strokeWidth={2}
                  className="fill-current"
                />
              </Badge>
            }
          />
          <TooltipContent>Loved</TooltipContent>
        </Tooltip>
        <Badge className="border-transparent bg-linear-to-r from-primary to-fuchsia-500 text-white">
          <HugeiconsIcon icon={CrownIcon} data-icon="inline-start" />
          Pro
        </Badge>
        <Badge
          variant="secondary"
          className="border-gradient-to-r shimmer bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text"
        >
          Gradient
        </Badge>
        <Badge variant="destructive">
          <Spinner data-icon="inline-start" />
          Deleting
        </Badge>
        <Badge variant="secondary" className="shimmer border-border">
          <HugeiconsIcon icon={MagicWand05Icon} data-icon="inline-start" />
          Generating
        </Badge>
      </div>

      {/* Statuses. The dot carries the state, so the label stays a plain noun
          rather than repeating "online" / "offline" in words. */}
      <div className="flex flex-wrap gap-2">
        <Badge className="border-emerald-500/20 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-950 dark:text-emerald-300">
          <BadgeDot pulse />
          Live
        </Badge>
        <Badge className="border-amber-500/20 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-950 dark:text-amber-300">
          <BadgeDot pulse />
          Degraded
        </Badge>
        <Badge className="border-slate-500/20 bg-slate-50 text-slate-700 dark:border-slate-400/20 dark:bg-slate-900 dark:text-slate-300">
          <BadgeDot />
          Offline
        </Badge>
      </div>

      {/* Link. Two arrows share one 12px window: the first leaves through the
          top-right as the second arrives from the bottom-left. */}
      <div className="flex flex-wrap gap-2">
        <Badge
          className="bg-primary/5 text-primary hover:bg-primary/10!"
          render={
            <a href="#link">
              Open Link
              <span
                aria-hidden
                data-icon="inline-end"
                className="relative size-3 overflow-hidden"
              >
                <HugeiconsIcon
                  icon={ArrowUpRightIcon}
                  className="absolute inset-0 size-3 transition-transform duration-300 ease-out group-hover/badge:translate-x-3 group-hover/badge:-translate-y-3"
                />
                <HugeiconsIcon
                  icon={ArrowUpRightIcon}
                  className="absolute inset-0 size-3 -translate-x-3 translate-y-3 transition-transform duration-300 ease-out group-hover/badge:translate-x-0 group-hover/badge:translate-y-0"
                />
              </span>
            </a>
          }
        />
      </div>

      {/* Badge group. Same choreography as the avatar group — the stack fans
          out on hover and each circle lifts. Visible items get a name
          tooltip; the overflow count opens a popover of the rest. */}
      <div className="flex -space-x-1.5 *:transition-all *:duration-300 *:ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:space-x-0.5 *:hover:z-10 *:hover:-translate-y-1">
        {integrations.map((integration) => (
          <Tooltip key={integration.name}>
            <TooltipTrigger
              render={
                <Badge
                  aria-label={integration.name}
                  className={cn(
                    "size-6 cursor-default rounded-full p-0 ring-2 ring-background cursor-pointer",
                    integration.className
                  )}
                >
                  <HugeiconsIcon icon={integration.icon} strokeWidth={2} />
                </Badge>
              }
            />
            <TooltipContent>{integration.name}</TooltipContent>
          </Tooltip>
        ))}
        <Popover>
          <PopoverTrigger
            // The trigger is a Badge (a span), not a button — this tells
            // base-ui to graft button semantics onto it instead of warning.
            nativeButton={false}
            render={
              <Badge
                variant="secondary"
                className="size-6 cursor-pointer rounded-full p-0 text-[10px] ring-2 ring-background data-popup-open:z-10 data-popup-open:-translate-y-1 data-popup-open:ring-[3px] data-popup-open:ring-ring/50"
              >
                +{overflow.length}
              </Badge>
            }
          />
          <PopoverContent align="start" className="w-40">
            <ul className="flex flex-col gap-2">
              {overflow.map((integration) => (
                <li key={integration.name} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border [&>svg]:size-3",
                      integration.className
                    )}
                  >
                    <HugeiconsIcon icon={integration.icon} strokeWidth={2} />
                  </span>
                  <span>{integration.name}</span>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      {/* Achievements. Click rather than hover — an award is worth a
          deliberate look, and the card stays put while you read it. The one
          still locked keeps its place in the row, so the set reads as a
          collection with a gap left to fill. */}
      <div className="flex flex-wrap gap-2">
        {achievements.map((achievement) => (
          <Popover key={achievement.name}>
            <PopoverTrigger
              // The trigger is a Badge (a span), not a button — this tells
              // base-ui to graft button semantics onto it instead of warning.
              nativeButton={false}
              render={
                <Badge
                  aria-label={achievement.name}
                  className={cn(
                    "size-6 cursor-pointer rounded-full p-0 hover:-translate-y-0.5 data-popup-open:-translate-y-0.5 data-popup-open:ring-[3px] data-popup-open:ring-ring/50 [&>svg]:size-4!",
                    achievement.className
                  )}
                >
                  <HugeiconsIcon icon={achievement.icon} strokeWidth={1.5} />
                </Badge>
              }
            />
            <PopoverContent align="start" className="w-64 gap-2">
              <div className="flex items-start gap-2.5">
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border [&>svg]:size-4",
                    achievement.className
                  )}
                >
                  <HugeiconsIcon icon={achievement.icon} strokeWidth={1.5} />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="leading-tight font-medium">
                    {achievement.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {achievement.detail}
                  </span>
                </div>
              </div>

              {/* Footer bleeds to the popover's edges — the negative margins
                  cancel its 10px padding, so the strip spans full width. */}
              {achievement.progress ? (
                <div className="-mx-2.5 -mb-2.5 rounded-b-lg border-t border-border bg-muted/40 px-2.5 py-2">
                  <Progress
                    value={
                      (achievement.progress.current /
                        achievement.progress.total) *
                      100
                    }
                    className="gap-1.5"
                  >
                    <ProgressLabel className="text-xs font-normal text-muted-foreground">
                      {achievement.progress.label}
                    </ProgressLabel>
                    <span className="ms-auto text-xs text-muted-foreground tabular-nums">
                      {achievement.progress.current} of{" "}
                      {achievement.progress.total}
                    </span>
                  </Progress>
                </div>
              ) : (
                <div className="-mx-2.5 -mb-2.5 flex items-center justify-between rounded-b-lg border-t border-border bg-muted/40 px-2.5 py-2 text-xs text-muted-foreground">
                  <span>Earned {achievement.earned}</span>
                  <span>{achievement.held}</span>
                </div>
              )}
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  )
}

/**
 * One badge per colour in the palette, all on the same recipe:
 * `border-{c}-500/20 bg-{c}-50 text-{c}-700` with the dark side stepping the
 * border and text down a stop and dropping the surface to 950. Written out in
 * full because Tailwind scans for literal class names — building them from
 * `${color}` would compile to nothing.
 */
const colors: { name: string; className: string }[] = [
  {
    name: "Red",
    className:
      "border-red-500/20 bg-red-50 text-red-700 dark:border-red-400/20 dark:bg-red-950 dark:text-red-300",
  },
  {
    name: "Orange",
    className:
      "border-orange-500/20 bg-orange-50 text-orange-700 dark:border-orange-400/20 dark:bg-orange-950 dark:text-orange-300",
  },
  {
    name: "Amber",
    className:
      "border-amber-500/20 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-950 dark:text-amber-300",
  },
  {
    name: "Yellow",
    className:
      "border-yellow-500/20 bg-yellow-50 text-yellow-700 dark:border-yellow-400/20 dark:bg-yellow-950 dark:text-yellow-300",
  },
  {
    name: "Lime",
    className:
      "border-lime-500/20 bg-lime-50 text-lime-700 dark:border-lime-400/20 dark:bg-lime-950 dark:text-lime-300",
  },
  {
    name: "Green",
    className:
      "border-green-500/20 bg-green-50 text-green-700 dark:border-green-400/20 dark:bg-green-950 dark:text-green-300",
  },
  {
    name: "Emerald",
    className:
      "border-emerald-500/20 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-950 dark:text-emerald-300",
  },
  {
    name: "Teal",
    className:
      "border-teal-500/20 bg-teal-50 text-teal-700 dark:border-teal-400/20 dark:bg-teal-950 dark:text-teal-300",
  },
  {
    name: "Cyan",
    className:
      "border-cyan-500/20 bg-cyan-50 text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-950 dark:text-cyan-300",
  },
  {
    name: "Sky",
    className:
      "border-sky-500/20 bg-sky-50 text-sky-700 dark:border-sky-400/20 dark:bg-sky-950 dark:text-sky-300",
  },
  {
    name: "Blue",
    className:
      "border-blue-500/20 bg-blue-50 text-blue-700 dark:border-blue-400/20 dark:bg-blue-950 dark:text-blue-300",
  },
  {
    name: "Indigo",
    className:
      "border-indigo-500/20 bg-indigo-50 text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-950 dark:text-indigo-300",
  },
  {
    name: "Violet",
    className:
      "border-violet-500/20 bg-violet-50 text-violet-700 dark:border-violet-400/20 dark:bg-violet-950 dark:text-violet-300",
  },
  {
    name: "Purple",
    className:
      "border-purple-500/20 bg-purple-50 text-purple-700 dark:border-purple-400/20 dark:bg-purple-950 dark:text-purple-300",
  },
  {
    name: "Fuchsia",
    className:
      "border-fuchsia-500/20 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-400/20 dark:bg-fuchsia-950 dark:text-fuchsia-300",
  },
  {
    name: "Pink",
    className:
      "border-pink-500/20 bg-pink-50 text-pink-700 dark:border-pink-400/20 dark:bg-pink-950 dark:text-pink-300",
  },
  {
    name: "Rose",
    className:
      "border-rose-500/20 bg-rose-50 text-rose-700 dark:border-rose-400/20 dark:bg-rose-950 dark:text-rose-300",
  },
  {
    name: "Slate",
    className:
      "border-slate-500/20 bg-slate-50 text-slate-700 dark:border-slate-400/20 dark:bg-slate-950 dark:text-slate-300",
  },
  {
    name: "Gray",
    className:
      "border-gray-500/20 bg-gray-50 text-gray-700 dark:border-gray-400/20 dark:bg-gray-950 dark:text-gray-300",
  },
  {
    name: "Zinc",
    className:
      "border-zinc-500/20 bg-zinc-50 text-zinc-700 dark:border-zinc-400/20 dark:bg-zinc-950 dark:text-zinc-300",
  },
  {
    name: "Neutral",
    className:
      "border-neutral-500/20 bg-neutral-50 text-neutral-700 dark:border-neutral-400/20 dark:bg-neutral-950 dark:text-neutral-300",
  },
  {
    name: "Stone",
    className:
      "border-stone-500/20 bg-stone-50 text-stone-700 dark:border-stone-400/20 dark:bg-stone-950 dark:text-stone-300",
  },
  {
    name: "Taupe",
    className:
      "border-taupe-500/20 bg-taupe-50 text-taupe-700 dark:border-taupe-400/20 dark:bg-taupe-950 dark:text-taupe-300",
  },
  {
    name: "Mauve",
    className:
      "border-mauve-500/20 bg-mauve-50 text-mauve-700 dark:border-mauve-400/20 dark:bg-mauve-950 dark:text-mauve-300",
  },
  {
    name: "Mist",
    className:
      "border-mist-500/20 bg-mist-50 text-mist-700 dark:border-mist-400/20 dark:bg-mist-950 dark:text-mist-300",
  },
  {
    name: "Olive",
    className:
      "border-olive-500/20 bg-olive-50 text-olive-700 dark:border-olive-400/20 dark:bg-olive-950 dark:text-olive-300",
  },
]

export function BadgeColorsDemo() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-wrap justify-center gap-2">
      {colors.map((color) => (
        <Badge key={color.name} className={color.className}>
          {color.name}
        </Badge>
      ))}
    </div>
  )
}
