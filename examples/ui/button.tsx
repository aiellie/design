import {
  ArrowUp02Icon,
  GitBranchIcon,
  Notification01Icon,
  Trash,
  Undo03Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

/**
 * Icon-only button. With no visible text the label has to live somewhere, so
 * it does double duty as the accessible name and the tooltip — `tooltip` only
 * exists for the one case that wants to say something else.
 */
function IconButton({
  icon,
  label,
  tooltip,
  variant = "outline",
  className,
}: {
  icon: typeof ArrowUp02Icon
  label: string
  tooltip?: string
  variant?: React.ComponentProps<typeof Button>["variant"]
  className?: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant={variant}
            size="icon-sm"
            aria-label={label}
            className={cn("rounded-full", className)}
          >
            <HugeiconsIcon icon={icon} />
          </Button>
        }
      />
      <TooltipContent>{tooltip ?? label}</TooltipContent>
    </Tooltip>
  )
}

export function ButtonExample() {
  return (
    <div className="flex w-full max-w-lg flex-col items-start gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" className="rounded-full">
          Default
        </Button>
        <Button
          size="sm"
          className="rounded-full bg-primary/5 text-primary hover:bg-primary/10"
        >
          Brand
        </Button>
        <Button size="sm" variant="secondary" className="rounded-full">
          Secondary
        </Button>
        <Button size="sm" variant="destructive" className="rounded-full bg-destructive/5 text-destructive hover:bg-destructive/10">
          Destructive
        </Button>
        <Button size="sm" variant="outline" className="rounded-full">
          Outline
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="rounded-full border-dashed"
        >
          Dashed
        </Button>
        <Button size="sm" variant="ghost" className="rounded-full">
          Ghost
        </Button>
        {/* The one button that stays square — a text link shouldn't wear a pill. */}
        <Button size="sm" variant="link">
          Link
        </Button>
      </div>

      {/* Buttons that carry something besides text. `data-icon` is what earns
          the tighter padding on the icon's side. */}
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="outline" className="rounded-full">
          <HugeiconsIcon
            icon={GitBranchIcon}
            data-icon="inline-start"
            strokeWidth={2}
          />
          New Branch
        </Button>
        <Button size="sm" variant="outline" disabled className="rounded-full">
          <Spinner data-icon="inline-start" />
          Downloading
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <IconButton icon={ArrowUp02Icon} label="Submit" />
        <IconButton icon={Trash} label="Delete" variant="destructive" className="bg-destructive/5 text-destructive hover:bg-destructive/10" />
        <IconButton
          icon={Notification01Icon}
          label="Notifications"
          tooltip="All icon buttons have tooltips"
          variant="default"
          className="bg-blue-500/5 text-blue-500 hover:bg-blue-500/10"
        />
        <IconButton
          icon={Undo03Icon}
          label="Undo changes"
          className="border-dashed"
        />
      </div>
    </div>
  )
}
