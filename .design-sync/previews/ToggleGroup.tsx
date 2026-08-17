// ToggleGroup preview — repo alignment showcase from
// examples/ui/toggle-group.tsx, plus segmented single-select, multi-select,
// and vertical orientation cells with static pressed values.
import {
  BoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export { ToggleGroupExample as Showcase } from "@/examples/ui/toggle-group"

export function Segmented() {
  return (
    <ToggleGroup spacing={0} variant="outline" defaultValue={["week"]}>
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
      <ToggleGroupItem value="year">Year</ToggleGroupItem>
    </ToggleGroup>
  )
}

export function Multiple() {
  return (
    <ToggleGroup toggleMultiple defaultValue={["bold", "underline"]}>
      <ToggleGroupItem value="bold" aria-label="Bold">
        <HugeiconsIcon icon={BoldIcon} strokeWidth={2} />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <HugeiconsIcon icon={TextItalicIcon} strokeWidth={2} />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <HugeiconsIcon icon={TextUnderlineIcon} strokeWidth={2} />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export function Vertical() {
  return (
    <ToggleGroup
      orientation="vertical"
      variant="outline"
      spacing={0}
      defaultValue={["comfortable"]}
    >
      <ToggleGroupItem value="compact">Compact</ToggleGroupItem>
      <ToggleGroupItem value="comfortable">Comfortable</ToggleGroupItem>
      <ToggleGroupItem value="spacious">Spacious</ToggleGroupItem>
    </ToggleGroup>
  )
}
