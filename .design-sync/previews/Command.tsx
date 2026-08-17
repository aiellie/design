// Command preview — the repo example wraps the palette in a closed
// CommandDialog (renders nothing statically), so these cells render the
// palette INLINE: Showcase ports the example's groups/items/shortcuts with a
// disabled item; TypeaheadEmpty pins a controlled query that matches nothing
// so the CommandEmpty state shows. Inline maxHeight lifts the list's
// max-h-72 so the composition isn't clipped.
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
  FileText,
  FolderIcon,
  Home,
  Inbox,
  RocketIcon,
  Settings01Icon,
  SmileIcon,
  User02Icon,
} from "@hugeicons/core-free-icons"

export function Showcase() {
  return (
    <div className="flex w-full justify-center">
      <Command className="w-full max-w-sm border shadow-md">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList style={{ maxHeight: "30rem" }}>
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
          <CommandGroup heading="Navigation">
            <CommandItem>
              <HugeiconsIcon icon={Home} strokeWidth={2} />
              <span>Home</span>
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <HugeiconsIcon icon={Inbox} strokeWidth={2} />
              <span>Inbox</span>
              <CommandShortcut>⌘I</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <HugeiconsIcon icon={FileText} strokeWidth={2} />
              <span>Documents</span>
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <HugeiconsIcon icon={FolderIcon} strokeWidth={2} />
              <span>Folders</span>
              <CommandShortcut>⌘F</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Account">
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
    </div>
  )
}

export function TypeaheadEmpty() {
  return (
    <div className="flex w-full justify-center">
      <Command className="w-full max-w-sm border shadow-md">
        <CommandInput value="deploy production" />
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
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
