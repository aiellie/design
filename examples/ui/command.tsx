"use client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Calendar01Icon,
  CreditCardIcon,
  RocketIcon,
  Settings01Icon,
  SmileIcon,
  User02Icon,
} from "@hugeicons/core-free-icons"

export function CommandExample() {
  return (
    <Command className="w-full border shadow-sm">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <HugeiconsIcon icon={SmileIcon} strokeWidth={2} />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem disabled>
            <HugeiconsIcon icon={RocketIcon} strokeWidth={2} />
            <span>Launch</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <HugeiconsIcon icon={User02Icon} strokeWidth={2} />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
