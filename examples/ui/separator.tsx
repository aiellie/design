"use client"

import { Separator } from "@/components/ui/separator"

export function SeparatorExample() {
  return (
    <div className="w-full">
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Base UI Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source component library for building design systems.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>Changelog</span>
      </div>
    </div>
  )
}
