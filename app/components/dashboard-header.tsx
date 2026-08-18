"use client"

import * as React from "react"

import { ItemActions } from "@/app/components/item-actions"
import { SearchCommand } from "@/app/components/search-command"
import { StatusSelect } from "@/app/components/status-select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
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
import { Icon, type IconData } from "@/icons/icons"
import { ChevronDownIcon, HeartIcon, HomeIcon, Search01Icon } from "@/icons/huge-icons"

/** One row in the header combobox — an example, or the Home page. */
type NavItem = {
  slug: string | null
  name: string
  icon: IconData
}

const homeItem: NavItem = { slug: null, name: "Home", icon: HomeIcon }

/** 1-based page number for each example, matching the ⌘N search shortcuts. */
const pageNumberOf = new Map(
  allExamples.map((example, index) => [example.slug, index + 1])
)

function shortcutFor(item: NavItem) {
  return item.slug === null ? "⌘0" : `⌘${pageNumberOf.get(item.slug)}`
}

/** Pages + examples grouped for the combobox: `value` is the heading. */
const navGroups = [
  { value: "Pages", items: [homeItem] },
  ...exampleCategories.map((category) => ({
    value: category.title,
    items: allExamples.filter(
      (example) => example.categoryTitle === category.title
    ) as NavItem[],
  })),
]

function renderNavGroup(group: (typeof navGroups)[number]) {
  return (
    <ComboboxGroup key={group.value} items={group.items}>
      <ComboboxLabel>{group.value}</ComboboxLabel>
      <ComboboxCollection>
        {(item: NavItem) => (
          <ComboboxItem
            key={item.slug ?? "home"}
            value={item}
            // The tick normally floats at the right edge; make it flow inline so
            // it sits just left of the shortcut.
            className="pr-2 [&_[data-slot=combobox-item-indicator]]:static"
          >
            <Icon icon={item.icon} className="text-muted-foreground" />
            {item.name}
            <span className="ml-auto" />
            <span className="order-last text-xs tracking-widest text-muted-foreground">
              {shortcutFor(item)}
            </span>
          </ComboboxItem>
        )}
      </ComboboxCollection>
    </ComboboxGroup>
  )
}

/** Heart marker for a favorited example. */
function FavoriteBadge() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Badge
            variant="outline"
            className="size-5 cursor-pointer rounded-full border-rose-200 bg-rose-50 p-0 text-rose-600 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-400"
            aria-label="Favorited"
          >
            <Icon
              icon={HeartIcon}
              strokeWidth={2}
              className="fill-current text-current hover:text-current"
            />
          </Badge>
        }
      />
      <TooltipContent>Favorited</TooltipContent>
    </Tooltip>
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
  // Favorites are session-only: the registry flag seeds each example, and the
  // actions menu can override it for the current visit.
  const [favorites, setFavorites] = React.useState<Record<string, boolean>>({})
  const isFavorite = selected
    ? (favorites[selected.slug] ?? selected.favorite ?? false)
    : false

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/70 px-4 backdrop-blur-md">
      <SidebarTrigger className="-ml-1 text-muted-foreground"/>
      <Separator orientation="vertical" className="h-4 my-auto" />
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Breadcrumb>
          <BreadcrumbList className="flex-nowrap">
            {selected ? (
              <>
                <BreadcrumbItem>
                  <Combobox
                    items={navGroups}
                    value={selected}
                    onValueChange={(item: NavItem | null) => {
                      onSelect(item?.slug ?? null)
                    }}
                    itemToStringLabel={(item: NavItem) => item.name}
                    isItemEqualToValue={(item: NavItem, value: NavItem) =>
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
                            icon={ChevronDownIcon}
                            className="size-3.5 text-muted-foreground"
                          />
                        </Button>
                      }
                    />
                    <ComboboxContent className="w-64">
                      <ComboboxInput
                        showClear={true}
                        showTrigger={false}
                        placeholder="Search pages and examples"
                      >
                        <InputGroupAddon>
                          <Icon
                            icon={Search01Icon}
                            strokeWidth={2}
                            className="size-3.5"
                          />
                        </InputGroupAddon>
                      </ComboboxInput>
                      <ComboboxEmpty>No pages found.</ComboboxEmpty>
                      <ComboboxList>{renderNavGroup}</ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                  {isFavorite ? <FavoriteBadge /> : null}
                </BreadcrumbItem>
              </>
            ) : null}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {selected ? (
        <div className="flex shrink-0 items-center gap-3">
          {/*  <StatusSelect slug={selected.slug} />
        <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
            {index + 1} / {total}
          </span> */}
          <SearchCommand onSelect={onSelect} />
          <ItemActions
            slug={selected.slug}
            name={selected.name}
            favorite={isFavorite}
            onFavoriteChange={(favorite) =>
              setFavorites((previous) => ({
                ...previous,
                [selected.slug]: favorite,
              }))
            }
          />
        </div>
      ) : null}
    </header>
  )
}
