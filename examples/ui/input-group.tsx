"use client"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Copy01Icon,
  Search01Icon,
  SentIcon,
} from "@hugeicons/core-free-icons"

export function InputGroupExample() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-group-search">Search</Label>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>
              <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            id="input-group-search"
            placeholder="Search projects…"
          />
          <InputGroupAddon align="inline-end">
            <kbd className="pointer-events-none rounded border border-border bg-muted px-1 font-mono text-[0.65rem] text-muted-foreground">
              ⌘K
            </kbd>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-group-url">Site URL</Label>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            id="input-group-url"
            defaultValue="ellie.dev"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs" aria-label="Copy URL">
              <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-group-note">Quick note</Label>
        <InputGroup>
          <InputGroupTextarea
            id="input-group-note"
            placeholder="Leave a note for the team…"
          />
          <InputGroupAddon align="block-end">
            <InputGroupText>32 words</InputGroupText>
            <InputGroupButton className="ml-auto" variant="default">
              <HugeiconsIcon icon={SentIcon} strokeWidth={2} />
              Send
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}
