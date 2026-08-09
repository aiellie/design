"use client"

import { Bubble, BubbleContent } from '@/components/ui/bubble'
import { Marker, MarkerContent, MarkerIcon } from '@/components/ui/marker'
import { HugeiconsIcon } from "@hugeicons/react"
import { PinIcon, Shield01Icon } from "@hugeicons/core-free-icons"

export function MarkerExample() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Marker variant="border">
        <MarkerIcon>
          <HugeiconsIcon icon={Shield01Icon} strokeWidth={2} />
        </MarkerIcon>
        <MarkerContent>Messages are end-to-end encrypted.</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Yesterday · 4:32 PM</MarkerContent>
      </Marker>
      <Bubble variant="muted">
        <BubbleContent>The venue is confirmed for Friday!</BubbleContent>
      </Bubble>
      <Marker>
        <MarkerIcon>
          <HugeiconsIcon icon={PinIcon} strokeWidth={2} />
        </MarkerIcon>
        <MarkerContent>
          Maya pinned a message · <a href="#">View</a>
        </MarkerContent>
      </Marker>
    </div>
  )
}
