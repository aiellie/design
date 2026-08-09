"use client"

import * as React from "react"

import { Toggle } from "@/components/ui/toggle"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PinIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextUnderlineIcon,
} from "@hugeicons/core-free-icons"

export function ToggleExample() {
  const [pinned, setPinned] = React.useState(true)

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-1">
        <Toggle defaultPressed aria-label="Toggle bold">
          <HugeiconsIcon icon={TextBoldIcon} strokeWidth={2} />
        </Toggle>
        <Toggle aria-label="Toggle italic">
          <HugeiconsIcon icon={TextItalicIcon} strokeWidth={2} />
        </Toggle>
        <Toggle aria-label="Toggle underline">
          <HugeiconsIcon icon={TextUnderlineIcon} strokeWidth={2} />
        </Toggle>
        <Toggle aria-label="Toggle strikethrough" disabled>
          <HugeiconsIcon icon={TextStrikethroughIcon} strokeWidth={2} />
        </Toggle>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Toggle
          variant="outline"
          pressed={pinned}
          onPressedChange={setPinned}
        >
          <HugeiconsIcon
            icon={PinIcon}
            strokeWidth={2}
            data-icon="inline-start"
          />
          {pinned ? "Pinned" : "Pin"}
        </Toggle>
        <Toggle variant="outline" size="sm">
          Show diff
        </Toggle>
        <Toggle variant="outline" size="lg" defaultPressed>
          Word wrap
        </Toggle>
      </div>
    </div>
  )
}
