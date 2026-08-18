"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { FlatExample } from "@/examples"
import { getIconForLanguageExtension } from "@/icons/icons"
import {ArrowLeftIcon, ArrowRightIcon} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function DashboardFooter({
  selected,
  previous,
  next,
  onSelect,
}: {
  selected: FlatExample | null
  previous: FlatExample | null
  next: FlatExample | null
  onSelect: (slug: string | null) => void
}) {
  if (!selected) {
    return null
  }

  return (
    <footer className="sticky bottom-0 z-20 flex h-12 shrink-0 items-center gap-3 border-t bg-background/70 px-4 backdrop-blur-md">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className="size-3.5 shrink-0 items-center justify-center xl:flex [&_svg]:size-3.5">
          {getIconForLanguageExtension(
            selected.file.split(".").pop()?.toLowerCase() ?? ""
          )}
        </span>
        <span className="truncate font-mono text-xs text-muted-foreground xl:inline">
          {selected.file}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <ButtonGroup>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  disabled={!previous}
                  onClick={() => previous && onSelect(previous.slug)}
                  aria-label="Previous example"
                >
                  <HugeiconsIcon icon={ArrowLeftIcon} className="text-muted-foreground"                  strokeWidth={2}
 />
                </Button>
              }
            />
            <TooltipContent>
              {previous ? `Previous: ${previous.name}` : "Previous"}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  disabled={!next}
                  onClick={() => next && onSelect(next.slug)}
                  aria-label="Next example"
                >
                  <HugeiconsIcon icon={ArrowRightIcon} className="text-muted-foreground" strokeWidth={2} />
                </Button>
              }
            />
            <TooltipContent>{next ? `Next: ${next.name}` : "Next"}</TooltipContent>
          </Tooltip>
        </ButtonGroup>
      </div>
    </footer>
  )
}
