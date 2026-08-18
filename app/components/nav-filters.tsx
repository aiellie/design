"use client"

import * as React from "react"

import { StatusDot } from "@/app/components/status-badge"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarGroupAction } from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  exampleStatuses,
  type ExampleStatus,
} from "@/examples/status"
import { Icon, Icons } from "@/icons/icons"

export type NavSortBy = "default" | "name" | "status"
export type NavGroupBy = "category" | "status" | "none"

const sortOptions: { id: NavSortBy; label: string }[] = [
  { id: "default", label: "Default" },
  { id: "name", label: "Name" },
  { id: "status", label: "Status" },
]

const groupOptions: { id: NavGroupBy; label: string }[] = [
  { id: "category", label: "Category" },
  { id: "status", label: "Status" },
  { id: "none", label: "None" },
]

const optionLabel = (options: { id: string; label: string }[], id: string) =>
  options.find((option) => option.id === id)?.label

/**
 * Sidebar filter menu rendered as a group action: sort by, group by, and a
 * multi-select status filter, each in its own submenu. Fully controlled —
 * the owner holds the state and applies it to the nav list.
 */
export function NavFilters({
  sortBy,
  groupBy,
  visibleStatuses,
  onSortByChange,
  onGroupByChange,
  onVisibleStatusesChange,
  className,
}: {
  sortBy: NavSortBy
  groupBy: NavGroupBy
  /** Statuses currently shown; all statuses = no filter. */
  visibleStatuses: ExampleStatus[]
  onSortByChange: (sortBy: NavSortBy) => void
  onGroupByChange: (groupBy: NavGroupBy) => void
  onVisibleStatusesChange: (statuses: ExampleStatus[]) => void
  className?: string
}) {
  function toggleStatus(status: ExampleStatus, checked: boolean) {
    onVisibleStatusesChange(
      checked
        ? [...visibleStatuses, status]
        : visibleStatuses.filter((id) => id !== status)
    )
  }

  const statusSummary =
    visibleStatuses.length === exampleStatuses.length
      ? "All"
      : `${visibleStatuses.length}`

  // The filter is active whenever the list deviates from the default view.
  const isFiltering =
    sortBy !== "default" ||
    groupBy !== "category" ||
    visibleStatuses.length !== exampleStatuses.length

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <SidebarGroupAction
                  className={className}
                  aria-label="Filter navigation"
                >
                  <Icon
                    icon={Icons.filter}
                    className={
                      isFiltering ? "size-3.5! text-primary" : "size-3.5!"
                    }
                  />
                </SidebarGroupAction>
              }
            />
          }
        />
        <TooltipContent>Filters</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon icon={Icons.sorting} className="size-3.5" />
            Sort by
            <span className="ml-auto text-xs text-muted-foreground">
              {optionLabel(sortOptions, sortBy)}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-44">
            <DropdownMenuRadioGroup
              value={sortBy}
              onValueChange={(value) => onSortByChange(value as NavSortBy)}
            >
              {sortOptions.map((option) => (
                <DropdownMenuRadioItem key={option.id} value={option.id}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon icon={Icons.layers} className="size-3.5" />
            Group by
            <span className="ml-auto text-xs text-muted-foreground">
              {optionLabel(groupOptions, groupBy)}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-44">
            <DropdownMenuRadioGroup
              value={groupBy}
              onValueChange={(value) => onGroupByChange(value as NavGroupBy)}
            >
              {groupOptions.map((option) => (
                <DropdownMenuRadioItem key={option.id} value={option.id}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon icon={Icons.progress} className="size-3.5" />
            Status
            <span className="ml-auto text-xs text-muted-foreground">
              {statusSummary}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-44">
            {exampleStatuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status.id}
                closeOnClick={false}
                checked={visibleStatuses.includes(status.id)}
                onCheckedChange={(checked) =>
                  toggleStatus(status.id, checked)
                }
              >
                <Icon icon={status.icon} className="size-3.5" />
                {status.label}
                <StatusDot status={status.id} className="ml-auto" />
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
