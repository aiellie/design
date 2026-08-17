// InputGroup preview — the repo's search/URL/code-editor showcase from
// examples/ui/input-group.tsx, plus focused cells for inline addons,
// disabled/invalid group states, and block-aligned textarea addons.
import { LockIcon, Search01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"

export { InputGroupExample as Showcase } from "@/examples/ui/input-group"

export function InlineAddons() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <InputGroup>
        <InputGroupInput placeholder="Search docs…" />
        <InputGroupAddon>
          <HugeiconsIcon
            icon={Search01Icon}
            strokeWidth={2}
            className="size-3.5 text-muted-foreground"
          />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText className="font-normal">https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput defaultValue="ellie.dev" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary">Copy</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export function States() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <InputGroup>
        <InputGroupInput
          placeholder="Deploy hook URL"
          disabled
        />
        <InputGroupAddon align="inline-end">
          <HugeiconsIcon
            icon={LockIcon}
            strokeWidth={2}
            className="size-3.5 text-muted-foreground"
          />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText className="font-normal">@</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput defaultValue="ellie!" aria-invalid />
      </InputGroup>
    </div>
  )
}

export function BlockTextarea() {
  return (
    <div className="w-full max-w-md">
      <InputGroup>
        <InputGroupTextarea
          defaultValue={
            "A pricing card with three tiers and a highlighted Pro plan.\nUse the violet primary for the Pro call-to-action."
          }
          className="min-h-16"
        />
        <InputGroupAddon align="block-start" className="border-b">
          <InputGroupText className="text-xs font-normal">
            New prompt
          </InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="block-end" className="border-t">
          <InputGroupText className="text-xs">112/2,000</InputGroupText>
          <InputGroupButton variant="secondary" className="ml-auto">
            Send
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
