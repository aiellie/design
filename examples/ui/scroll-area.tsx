"use client"

import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const versions = Array.from({ length: 24 }, (_, i) => {
  const minor = 24 - i
  return `v1.${minor}.0`
})

export function ScrollAreaExample() {
  return (
    <ScrollArea className="h-56 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-3 text-sm font-medium">Release history</h4>
        {versions.map((version, index) => (
          <React.Fragment key={version}>
            <div className="flex items-center justify-between py-2 text-sm">
              <span className="font-mono">{version}</span>
              <span className="text-xs text-muted-foreground">
                {index === 0 ? "latest" : `${index * 2} weeks ago`}
              </span>
            </div>
            {index < versions.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
