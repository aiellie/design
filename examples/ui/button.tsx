"use client"

import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight02Icon,
  Delete02Icon,
  Download01Icon,
  Loading03Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons"

export function ButtonExample() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button>Save changes</Button>
        <Button variant="secondary">Duplicate</Button>
        <Button variant="outline">Preview</Button>
        <Button variant="ghost">Dismiss</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="destructive">
          <HugeiconsIcon
            icon={Delete02Icon}
            strokeWidth={2}
            data-icon="inline-start"
          />
          Delete
        </Button>
        <Button variant="link">Learn more</Button>
        <Button variant="outline" size="icon" aria-label="Add item">
          <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="outline">
          <HugeiconsIcon
            icon={Download01Icon}
            strokeWidth={2}
            data-icon="inline-start"
          />
          Export
        </Button>
        <Button size="sm">
          Continue
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            strokeWidth={2}
            data-icon="inline-end"
          />
        </Button>
        <Button size="sm" variant="secondary" disabled>
          <HugeiconsIcon
            icon={Loading03Icon}
            strokeWidth={2}
            className="animate-spin"
          />
          Saving
        </Button>
      </div>
    </div>
  )
}
