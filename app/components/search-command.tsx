"use client"

import * as React from "react"

import { StatusDot } from "@/app/components/status-badge"
import { statusOf, useStatuses } from "@/app/components/status-provider"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { allExamples, exampleCategories } from "@/examples"
import { Icon, Icons } from "@/icons/icons"

/** Static pages that live outside the example categories. */
const pages = [{ slug: null, name: "Home", icon: Icons.home }] as const

/** 1-based page number for each example, in display order. */
const pageNumberOf = new Map(
  allExamples.map((example, index) => [example.slug, index + 1])
)

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

export function SearchCommand({
  onSelect,
}: {
  onSelect: (slug: string | null) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const { statuses } = useStatuses()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((prev) => {
          if (prev) setSearch("")
          return !prev
        })
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  // ⌘+digit jumps to that page number. Digits typed while ⌘ is held
  // accumulate (⌘3 then 7 → page 37); the jump commits when ⌘ is
  // released or after a short pause. ⌘0 opens the overview.
  const digitsRef = React.useRef("")
  const commitTimerRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    function commit() {
      const buffered = digitsRef.current
      digitsRef.current = ""
      if (commitTimerRef.current !== null) {
        window.clearTimeout(commitTimerRef.current)
        commitTimerRef.current = null
      }
      if (!buffered) {
        return
      }
      const page = Number(buffered)
      const example = page > 0 ? allExamples[page - 1] : null
      if (page === 0 || example) {
        setOpen(false)
        setSearch("")
        onSelect(example ? example.slug : null)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && /^[0-9]$/.test(event.key)) {
        event.preventDefault()
        digitsRef.current += event.key
        if (commitTimerRef.current !== null) {
          window.clearTimeout(commitTimerRef.current)
        }
        commitTimerRef.current = window.setTimeout(commit, 600)
      }
    }

    function onKeyUp(event: KeyboardEvent) {
      if (event.key === "Meta" || event.key === "Control") {
        commit()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("keyup", onKeyUp)
    }
  }, [onSelect])

  function select(slug: string | null) {
    setOpen(false)
    setSearch("")
    onSelect(slug)
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => setOpen(true)}
                aria-label="Search"
                className="rounded-full"
              >
                <Icon icon={Icons.search} />
              </Button>
            }
          />
          <TooltipContent>
            Search <Kbd>⌘K</Kbd>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CommandDialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) setSearch("")
        }}
        title="Search examples"
        description="Search all pages and component examples"
      >
        <Command>
          <CommandInput
            placeholder="Search pages and examples…"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              {pages.map((page) => (
                <CommandItem
                  key={page.name}
                  value={page.name}
                  onSelect={() => select(page.slug)}
                >
                  <Icon icon={page.icon} />
                  <span>{highlightMatch(page.name, search)}</span>
                  <CommandShortcut>⌘0</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            {exampleCategories.map((category) => (
              <CommandGroup key={category.title} heading={category.title}>
                {category.examples.map((example) => (
                  <CommandItem
                    key={example.slug}
                    value={example.name}
                    keywords={[example.slug, category.title]}
                    onSelect={() => select(example.slug)}
                  >
                    <Icon icon={example.icon} />
                    <span>{highlightMatch(example.name, search)}</span>
                    <CommandShortcut>
                      ⌘{pageNumberOf.get(example.slug)}
                    </CommandShortcut>
                    <StatusDot status={statusOf(statuses, example.slug)} />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
