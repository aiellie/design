"use client"

import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  Bookmark01Icon,
  Share03Icon,
} from "@hugeicons/core-free-icons"

export function TooltipExample() {
  return (
    <TooltipProvider>
      <div className="flex w-full items-center justify-center gap-2">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="outline" size="icon" aria-label="New item">
                <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
              </Button>
            }
          />
          <TooltipContent>New item</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="outline" size="icon" aria-label="Bookmark">
                <HugeiconsIcon icon={Bookmark01Icon} strokeWidth={2} />
              </Button>
            }
          />
          <TooltipContent>Add to bookmarks</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="outline" size="icon" aria-label="Share">
                <HugeiconsIcon icon={Share03Icon} strokeWidth={2} />
              </Button>
            }
          />
          <TooltipContent side="bottom">Share this page</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline">Save</Button>} />
          <TooltipContent>
            Save changes <Kbd>⌘S</Kbd>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
