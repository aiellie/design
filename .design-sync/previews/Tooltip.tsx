// Tooltip preview — tooltips are hover-only, so Showcase ports the example's
// icon-button row and forces the Save tooltip open (`open` on that root,
// inside the example's TooltipProvider). Placements forces one tooltip open
// per side; inline gap keeps side tooltips from overlapping neighbors.
// TriggerDemo ships the example (all closed).
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  Bookmark01Icon,
  Search01Icon,
  Share03Icon,
} from "@hugeicons/core-free-icons"

const iconActions = [
  { icon: Add01Icon, label: "New item" },
  { icon: Bookmark01Icon, label: "Add to bookmarks" },
  { icon: Share03Icon, label: "Share this page" },
  { icon: Search01Icon, label: "Search" },
]

export function Showcase() {
  return (
    <TooltipProvider>
      <div className="flex w-full items-center justify-center gap-2">
        {iconActions.map((action) => (
          <Tooltip key={action.label}>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="rounded-full text-muted-foreground hover:text-foreground"
                  aria-label={action.label}
                >
                  <HugeiconsIcon icon={action.icon} strokeWidth={2} />
                </Button>
              }
            />
            <TooltipContent>{action.label}</TooltipContent>
          </Tooltip>
        ))}
        <Tooltip open>
          <TooltipTrigger
            render={<Button variant="outline" size="sm">Save</Button>}
          />
          <TooltipContent>
            Save changes <Kbd>⌘S</Kbd>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

const placements = [
  { side: "left", label: "Left" },
  { side: "top", label: "Top" },
  { side: "bottom", label: "Bottom" },
  { side: "right", label: "Right" },
] as const

export function Placements() {
  return (
    <TooltipProvider>
      <div
        className="flex w-full items-center justify-center"
        style={{ gap: "5.5rem", padding: "3.5rem 0" }}
      >
        {placements.map((placement) => (
          <Tooltip key={placement.side} open>
            <TooltipTrigger
              render={
                <Button variant="outline" size="sm">
                  {placement.label}
                </Button>
              }
            />
            <TooltipContent side={placement.side}>
              Tooltip on {placement.side}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}

export { TooltipExample as TriggerDemo } from "@/examples/ui/tooltip"
