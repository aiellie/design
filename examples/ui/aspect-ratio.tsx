"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { Image01Icon } from "@hugeicons/core-free-icons"

export function AspectRatioExample() {
  return (
    <div className="flex w-full flex-col gap-3">
      <AspectRatio
        ratio={16 / 9}
        className="w-full overflow-hidden rounded-lg border bg-gradient-to-br from-muted via-muted/60 to-accent"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <HugeiconsIcon
            icon={Image01Icon}
            strokeWidth={2}
            className="size-6"
          />
          <span className="font-mono text-xs">16 : 9</span>
        </div>
        <Badge variant="secondary" className="absolute top-2 left-2">
          Cover
        </Badge>
      </AspectRatio>
      <div className="grid grid-cols-2 gap-3">
        <AspectRatio
          ratio={1}
          className="overflow-hidden rounded-lg border bg-muted"
        >
          <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted-foreground">
            1 : 1
          </div>
        </AspectRatio>
        <AspectRatio
          ratio={4 / 3}
          className="overflow-hidden rounded-lg border bg-muted"
        >
          <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted-foreground">
            4 : 3
          </div>
        </AspectRatio>
      </div>
    </div>
  )
}
