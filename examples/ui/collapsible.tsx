"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

const repos = [
  "@aiellie/design-tokens",
  "@aiellie/icon-forge",
  "@aiellie/motion-primitives",
]

export function CollapsibleExample() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex justify-center">
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-4 px-1">
        <div className="text-sm font-normal">
          @aiellie starred 4 repositories
        </div>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label="Toggle list">
              <HugeiconsIcon
                icon={open ? ArrowDown01Icon : ArrowRight01Icon}
              />
            </Button>
          }
        />
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-xs">
        @aiellie/ui-primitives
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        {repos.map((repo) => (
          <div
            key={repo}
            className="rounded-md border px-4 py-2 font-mono text-xs"
          >
            {repo}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
    </div>
  )
}
