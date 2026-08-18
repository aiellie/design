"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { AiBrain01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

export function CollapsibleExample() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="mx-auto w-full max-w-md space-y-3">
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="rounded-xl border bg-muted/30"
      >
        <CollapsibleTrigger className="flex w-full items-center gap-2 px-3 py-2.5 text-sm font-medium">
          <HugeiconsIcon icon={AiBrain01Icon} strokeWidth={2} className="size-4 text-primary" />
          {open ? "Hide reasoning" : "Show reasoning"}
          <span className="ms-auto text-xs font-normal text-muted-foreground">
            thought for 4s
          </span>
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            strokeWidth={2}
            className={cn("size-4 transition-transform", open && "rotate-180")}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 border-t px-3 py-3 text-sm text-muted-foreground">
          <p>1. The user wants the total after a 15% discount and 8% tax.</p>
          <p>2. Apply discount: $80 × 0.85 = $68.00.</p>
          <p>3. Apply tax: $68.00 × 1.08 = $73.44.</p>
        </CollapsibleContent>
      </Collapsible>
      <p className="px-1 text-sm">
        The total comes to <span className="font-medium">$73.44</span>.
      </p>
    </div>
  )
}
