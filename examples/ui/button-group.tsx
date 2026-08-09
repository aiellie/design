"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  ArrowLeft02Icon,
  ArrowRight02Icon,
  Calendar03Icon,
  MinusSignIcon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons"

export function ButtonGroupExample() {
  const [zoom, setZoom] = React.useState(100)

  return (
    <div className="flex w-full flex-col gap-4">
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Previous month">
          <HugeiconsIcon icon={ArrowLeft02Icon} strokeWidth={2} />
        </Button>
        <ButtonGroupText>
          <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} />
          August 2026
        </ButtonGroupText>
        <Button variant="outline" size="icon" aria-label="Next month">
          <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} />
        </Button>
      </ButtonGroup>
      <div className="flex flex-wrap items-center gap-4">
        <ButtonGroup>
          <Button
            variant="outline"
            size="icon"
            aria-label="Zoom out"
            onClick={() => setZoom((z) => Math.max(25, z - 25))}
          >
            <HugeiconsIcon icon={MinusSignIcon} strokeWidth={2} />
          </Button>
          <ButtonGroupText className="min-w-16 justify-center tabular-nums">
            {zoom}%
          </ButtonGroupText>
          <Button
            variant="outline"
            size="icon"
            aria-label="Zoom in"
            onClick={() => setZoom((z) => Math.min(200, z + 25))}
          >
            <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="secondary">Publish</Button>
          <ButtonGroupSeparator />
          <Button
            variant="secondary"
            size="icon"
            aria-label="More publish options"
          >
            <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
          </Button>
        </ButtonGroup>
      </div>
      <ButtonGroup orientation="vertical" className="w-full">
        <Button variant="outline" className="justify-start">
          Merge pull request
        </Button>
        <Button variant="outline" className="justify-start">
          Squash and merge
        </Button>
        <Button variant="outline" className="justify-start">
          Rebase and merge
        </Button>
      </ButtonGroup>
    </div>
  )
}
