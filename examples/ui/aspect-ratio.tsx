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
        className="w-full overflow-hidden rounded-lg border bg-muted"
      >
        <img
          src="https://avatar.aiellie.dev/aspectratio?ratio=16:9"
          alt="16:9 aspect ratio"
          className="size-full object-cover"
        />
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
    </div>
  )
}
