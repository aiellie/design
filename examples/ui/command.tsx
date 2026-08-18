"use client"

import * as React from "react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import {
  Calendar01Icon,
  CreditCardIcon,
  RocketIcon,
  Settings01Icon,
  SmileIcon,
  User02Icon,
  Bell,
  Calculator,
  ClipboardPaste,
  Code,
  Copy,
  FileText,
  FolderPlus,
  HelpCircleIcon,
  Home,
  Image,
  Inbox,
  LayoutGrid,
  List,
  Plus,
  Scissors,
  Search01Icon,
  Trash,
  ZoomIn,
  ZoomOut,
  FolderIcon,
} from "@hugeicons/core-free-icons"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Kbd } from "@/components/ui/kbd"

function highlightMatch(text: string, query: string) {
  const q = query.trim()
  if (!q) return text

  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const parts = text.split(new RegExp(`(${escaped})`, "gi"))

  return parts.map((part, i) =>
    part.toLowerCase() === q.toLowerCase() ? (
      <mark key={i}>{part}</mark>
    ) : (
      part
    )
  )
}

function Item({
  icon,
  label,
  search,
  shortcut,
  disabled,
}: {
  icon: IconSvgElement
  label: string
  search: string
  shortcut?: string
  disabled?: boolean
}) {
  return (
    <CommandItem value={label} disabled={disabled}>
      <HugeiconsIcon icon={icon} strokeWidth={2} />
      <span>{highlightMatch(label, search)}</span>
      {shortcut ? <CommandShortcut>{shortcut}</CommandShortcut> : null}
    </CommandItem>
  )
}

export function CommandExample() {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key?.toLowerCase() === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => {
          if (prev) setSearch("")
          return !prev
        })
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col gap-4">
      <Tooltip>
          <TooltipTrigger
            render={
              <Button onClick={() => setOpen(true)} variant="outline" size="icon-sm" className="rounded-full text-muted-foreground hover:text-foreground" aria-label="Search">
                <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
              </Button>
            }
          />
          <TooltipContent side="top">Search <Kbd>⌘ + J</Kbd></TooltipContent>
        </Tooltip>
        <CommandDialog
          open={open}
          onOpenChange={(next) => {
            setOpen(next)
            if (!next) setSearch("")
          }}
        >
          <Command>
            <CommandInput
              placeholder="Type a command or search..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <Item icon={Calendar01Icon} label="Calendar" search={search} />
                <Item icon={SmileIcon} label="Search Emoji" search={search} />
                <Item icon={RocketIcon} label="Launch" search={search} disabled />
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Navigation">
                <Item icon={Home} label="Home" search={search} shortcut="⌘H" />
                <Item icon={Inbox} label="Inbox" search={search} shortcut="⌘I" />
                <Item icon={FileText} label="Documents" search={search} shortcut="⌘D" />
                <Item icon={FolderIcon} label="Folders" search={search} shortcut="⌘F" />
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <Item icon={Plus} label="New File" search={search} shortcut="⌘N" />
                <Item icon={FolderPlus} label="New Folder" search={search} shortcut="⇧⌘N" />
                <Item icon={Copy} label="Copy" search={search} shortcut="⌘C" />
                <Item icon={Scissors} label="Cut" search={search} shortcut="⌘X" />
                <Item icon={ClipboardPaste} label="Paste" search={search} shortcut="⌘V" />
                <Item icon={Trash} label="Delete" search={search} shortcut="⌫" />
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="View">
                <Item icon={LayoutGrid} label="Grid View" search={search} />
                <Item icon={List} label="List View" search={search} />
                <Item icon={ZoomIn} label="Zoom In" search={search} shortcut="⌘+" />
                <Item icon={ZoomOut} label="Zoom Out" search={search} shortcut="⌘-" />
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Account">
                <Item icon={User02Icon} label="Profile" search={search} shortcut="⌘P" />
                <Item icon={CreditCardIcon} label="Billing" search={search} shortcut="⌘B" />
                <Item icon={Settings01Icon} label="Settings" search={search} shortcut="⌘S" />
                <Item icon={Bell} label="Notifications" search={search} shortcut="⌘U" />
                <Item icon={HelpCircleIcon} label="Help & Support" search={search} shortcut="⌘?" />
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Tools">
                <Item icon={Calculator} label="Calculator" search={search} />
                <Item icon={Image} label="Image Editor" search={search} />
                <Item icon={Code} label="Code Editor" search={search} />
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </div>
  )
}
