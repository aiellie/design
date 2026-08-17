// Toggle preview — repo reactions/formatting showcase from
// examples/ui/toggle.tsx, plus variant, size, and static state sweeps.
import {
  BoldIcon,
  Bookmark01Icon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Toggle } from "@/components/ui/toggle"

export { ToggleExample as Showcase } from "@/examples/ui/toggle"

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle aria-label="Bold">
        <HugeiconsIcon icon={BoldIcon} strokeWidth={2} />
      </Toggle>
      <Toggle defaultPressed aria-label="Italic">
        <HugeiconsIcon icon={TextItalicIcon} strokeWidth={2} />
      </Toggle>
      <Toggle variant="outline">Preview</Toggle>
      <Toggle variant="outline" defaultPressed>
        <HugeiconsIcon
          icon={Bookmark01Icon}
          data-icon="inline-start"
          strokeWidth={2}
        />
        Bookmarked
      </Toggle>
    </div>
  )
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle variant="outline" size="sm">
        <HugeiconsIcon
          icon={TextUnderlineIcon}
          data-icon="inline-start"
          strokeWidth={2}
        />
        Small
      </Toggle>
      <Toggle variant="outline">
        <HugeiconsIcon
          icon={TextUnderlineIcon}
          data-icon="inline-start"
          strokeWidth={2}
        />
        Default
      </Toggle>
      <Toggle variant="outline" size="lg">
        <HugeiconsIcon
          icon={TextUnderlineIcon}
          data-icon="inline-start"
          strokeWidth={2}
        />
        Large
      </Toggle>
    </div>
  )
}

export function States() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle variant="outline">Off</Toggle>
      <Toggle variant="outline" defaultPressed>
        Pressed
      </Toggle>
      <Toggle variant="outline" disabled>
        Disabled
      </Toggle>
      <Toggle variant="outline" disabled defaultPressed>
        Disabled pressed
      </Toggle>
    </div>
  )
}
