"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import * as React from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { ExampleDemo } from "@/examples"
import { cn } from "@/lib/utils"

/**
 * Icon tabs for examples that ship more than one demo. Same choreography as
 * the tabs example: icon only until selected, then the label unfurls out of a
 * zero-width grid column. Inactive tabs carry a tooltip — the active one
 * already says its name, so its tooltip is suppressed.
 *
 * Unlike the tabs example there's no deselect-on-click: a demo is always on
 * screen, so the viewer never has an empty panel to fall back to.
 */
export function ExampleTabs({
  demos,
  className,
}: {
  demos: ExampleDemo[]
  className?: string
}) {
  const [value, setValue] = React.useState(demos[0].value)

  return (
    <Tabs
      value={value}
      onValueChange={(next) => setValue(next as string)}
      className={cn("flex-1 gap-0", className)}
    >
      {/* Pinned to the top of the wrapper — the demo below gets whatever
          height is left and centres inside it, so switching tabs never moves
          the switch itself. */}
      <TabsList className="mx-auto shrink-0">
        {demos.map((demo) => (
          <Tooltip key={demo.value} disabled={value === demo.value}>
            <TooltipTrigger
              render={
                <TabsTrigger
                  value={demo.value}
                  className="group/trigger flex-none gap-0"
                >
                  <HugeiconsIcon icon={demo.icon} strokeWidth={2} />
                  <span className="inline-grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out group-data-active/trigger:grid-cols-[1fr]">
                    <span className="min-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-opacity duration-300 group-data-active/trigger:pl-1.5 group-data-active/trigger:opacity-100">
                      {demo.label}
                    </span>
                  </span>
                </TabsTrigger>
              }
            />
            <TooltipContent>{demo.label}</TooltipContent>
          </Tooltip>
        ))}
      </TabsList>
      {demos.map((demo) => {
        const Demo = demo.component
        return (
          <TabsContent
            key={demo.value}
            value={demo.value}
            className="flex items-center justify-center py-6"
          >
            <div className="w-full max-w-3xl">
              <Demo />
            </div>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
