// ButtonGroup preview — repo showcase from examples/ui/button-group.tsx, plus
// the orientation axis and text/separator affix compositions.
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"

export { ButtonGroupExample as Showcase } from "@/examples/ui/button-group"

export function Orientations() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <ButtonGroup>
        <Button variant="outline" size="sm">
          Archive
        </Button>
        <Button variant="outline" size="sm">
          Snooze
        </Button>
        <Button variant="outline" size="sm">
          Move
        </Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical">
        <Button variant="outline" size="icon-sm" aria-label="Upvote">
          <HugeiconsIcon icon={ArrowUp01Icon} />
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Downvote">
          <HugeiconsIcon icon={ArrowDown01Icon} />
        </Button>
      </ButtonGroup>
    </div>
  )
}

export function TextAndSeparator() {
  return (
    <div className="flex flex-col items-start gap-4">
      {/* Text affix + bare input — the group's [&>input]:flex-1 gives the
          input the remaining width, so the group itself sets the width. */}
      <ButtonGroup className="w-full max-w-xs">
        <ButtonGroupText render={<label htmlFor="bg-domain" />}>
          https://
        </ButtonGroupText>
        <Input id="bg-domain" placeholder="designellie.ai" />
      </ButtonGroup>
      {/* Split button — separator keeps the seam visible between two solid
          primary segments. */}
      <ButtonGroup>
        <Button size="sm">Publish site</Button>
        <ButtonGroupSeparator />
        <Button size="icon-sm" aria-label="Publish options">
          <HugeiconsIcon icon={ArrowDown01Icon} />
        </Button>
      </ButtonGroup>
    </div>
  )
}
