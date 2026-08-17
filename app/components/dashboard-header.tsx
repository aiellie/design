"use client"

import { SearchCommand } from "@/app/components/search-command"
import { StatusSelect } from "@/app/components/status-select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox"
import { InputGroupAddon } from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { allExamples, exampleCategories, type FlatExample } from "@/examples"
import { Icon, Icons } from "@/icons/icons"
import { Home01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

/** 1-based page number for each example, matching the ⌘N search shortcuts. */
const pageNumberOf = new Map(
  allExamples.map((example, index) => [example.slug, index + 1])
)

/** Examples grouped for the combobox: `value` is the heading, `items` the rows. */
const exampleGroups = exampleCategories.map((category) => ({
  value: category.title,
  items: allExamples.filter(
    (example) => example.categoryTitle === category.title
  ),
}))

function renderExampleGroup(group: (typeof exampleGroups)[number]) {
  return (
    <ComboboxGroup key={group.value} items={group.items}>
      <ComboboxLabel>{group.value}</ComboboxLabel>
      <ComboboxCollection>
        {(example: FlatExample) => (
          <ComboboxItem
            key={example.slug}
            value={example}
            // The tick normally floats at the right edge; make it flow inline so
            // it sits just left of the shortcut.
            className="pr-2 [&_[data-slot=combobox-item-indicator]]:static"
          >
            <Icon icon={example.icon} className="text-muted-foreground" />
            {example.name}
            <span className="ml-auto" />
            <span className="order-last text-xs tracking-widest text-muted-foreground">
              ⌘{pageNumberOf.get(example.slug)}
            </span>
          </ComboboxItem>
        )}
      </ComboboxCollection>
    </ComboboxGroup>
  )
}

export function DashboardHeader({
  selected,
  index,
  total,
  onSelect,
}: {
  selected: FlatExample | null
  index: number
  total: number
  onSelect: (slug: string | null) => void
}) {
  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/70 px-4 backdrop-blur-md">
      <SidebarTrigger className="-ml-1 text-muted-foreground"/>
      <Separator orientation="vertical" className="h-4 my-auto" />
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Breadcrumb>
          <BreadcrumbList className="flex-nowrap">
            <BreadcrumbItem>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label="Home"
                      onClick={() => onSelect(null)}
                    >
                      <HugeiconsIcon icon={Home01Icon} />
                    </Button>
                  }
                />
                <TooltipContent>Home</TooltipContent>
              </Tooltip>
            </BreadcrumbItem>
            {selected ? (
              <>
                <BreadcrumbSeparator className="hidden sm:inline-flex" />
                <BreadcrumbItem>
                  <Combobox
                    items={exampleGroups}
                    value={selected}
                    onValueChange={(example: FlatExample | null) => {
                      if (example) onSelect(example.slug)
                    }}
                    itemToStringLabel={(example: FlatExample) => example.name}
                    isItemEqualToValue={(item: FlatExample, value: FlatExample) =>
                      item.slug === value.slug
                    }
                  >
                    <ComboboxTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label={`${selected.name} — switch example`}
                          className="gap-2 whitespace-nowrap text-sm font-normal text-foreground"
                        >
                          <Icon icon={selected.icon} className="size-4" />
                          {selected.name}
                          <Icon
                            icon={Icons.chevronDown}
                            className="size-3.5 text-muted-foreground"
                          />
                        </Button>
                      }
                    />
                    <ComboboxContent className="w-64">
                      <ComboboxInput
                        showClear={true}
                        showTrigger={false}
                        placeholder="Search examples"
                      >
                        <InputGroupAddon>
                          <Icon
                            icon={Icons.search}
                            strokeWidth={2}
                            className="size-3.5"
                          />
                        </InputGroupAddon>
                      </ComboboxInput>
                      <ComboboxEmpty>No examples found.</ComboboxEmpty>
                      <ComboboxList>{renderExampleGroup}</ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </BreadcrumbItem>
              </>
            ) : null}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {selected ? (
        <div className="flex shrink-0 items-center gap-3">
          <StatusSelect slug={selected.slug} />
        {/*  <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
            {index + 1} / {total}
          </span> */}
                <SearchCommand onSelect={onSelect} />
        </div>
      ) : null}
    </header>
  )
}
