"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  GridViewIcon,
  LeftToRightListBulletIcon,
  TextAlignCenterIcon,
  TextAlignJustifyCenterIcon,
  TextAlignLeft01Icon,
  TextAlignRight01Icon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@hugeicons/core-free-icons"

export function ToggleGroupExample() {
  return (
    <div className="flex w-full flex-col gap-4">
      <ToggleGroup
        multiple
        defaultValue={["bold", "italic"]}
        variant="outline"
        spacing={0}
        aria-label="Text formatting"
      >
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <HugeiconsIcon icon={TextBoldIcon} strokeWidth={2} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <HugeiconsIcon icon={TextItalicIcon} strokeWidth={2} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <HugeiconsIcon icon={TextUnderlineIcon} strokeWidth={2} />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue={["left"]} aria-label="Text alignment">
        <ToggleGroupItem value="left" aria-label="Align left">
          <HugeiconsIcon icon={TextAlignLeft01Icon} strokeWidth={2} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <HugeiconsIcon icon={TextAlignCenterIcon} strokeWidth={2} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <HugeiconsIcon icon={TextAlignRight01Icon} strokeWidth={2} />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Justify" disabled>
          <HugeiconsIcon icon={TextAlignJustifyCenterIcon} strokeWidth={2} />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        defaultValue={["list"]}
        variant="outline"
        size="sm"
        spacing={0}
        aria-label="View mode"
      >
        <ToggleGroupItem value="list">
          <HugeiconsIcon
            icon={LeftToRightListBulletIcon}
            strokeWidth={2}
            data-icon="inline-start"
          />
          List
        </ToggleGroupItem>
        <ToggleGroupItem value="grid">
          <HugeiconsIcon
            icon={GridViewIcon}
            strokeWidth={2}
            data-icon="inline-start"
          />
          Grid
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
