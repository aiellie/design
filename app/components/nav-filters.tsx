"use client"

import * as React from "react"

import { StatusDot } from "@/app/components/status-badge"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
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
import { Icon } from "@/icons/icons"
import {
  FilterMailIcon,
  Layers01Icon,
  Minimize01Icon,
  Progress01Icon,
  RefreshIcon,
  Sorting01Icon,
} from "@/icons/huge-icons"

export type NavSortBy = "default" | "name" | "status"
export type NavGroupBy = "category" | "status" | "none"
export type NavCollapse = "all" | "none" | "completed"

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

const collapseOptions: { id: NavCollapse; label: string }[] = [
  { id: "all", label: "All" },
  { id: "none", label: "None" },
  { id: "completed", label: "Completed" },
]

const optionLabel = (options: { id: string; label: string }[], id: string) =>
  options.find((option) => option.id === id)?.label

/**
 * Sidebar filter menu rendered as a group action: sort by, group by, a
 * multi-select status filter, and a collapse preset, each in its own
 * submenu, plus a reset item that restores the defaults. Fully controlled —
 * the owner holds the state and applies it to the nav list.
 */
export function NavFilters({
  sortBy,
  groupBy,
  visibleStatuses,
  collapse,
  isFiltering,
  onSortByChange,
  onGroupByChange,
  onVisibleStatusesChange,
  onCollapseChange,
  onReset,
  className,
}: {
  sortBy: NavSortBy
  groupBy: NavGroupBy
  /** Statuses currently shown; all statuses = no filter. */
  visibleStatuses: ExampleStatus[]
  /**
   * Collapse preset the groups currently match; null when manual toggles
   * produced a mix.
   */
  collapse: NavCollapse | null
  /** Whether the view deviates from the defaults; lights the trigger icon
   * and arms the reset item. The owner knows the defaults, so it decides. */
  isFiltering: boolean
  onSortByChange: (sortBy: NavSortBy) => void
  onGroupByChange: (groupBy: NavGroupBy) => void
  onVisibleStatusesChange: (statuses: ExampleStatus[]) => void
  /** Collapse every group, no group, or the completed ones. */
  onCollapseChange: (collapse: NavCollapse) => void
  /** Restore every setting above to its default. */
  onReset: () => void
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
                    icon={FilterMailIcon}
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
            <Icon icon={Sorting01Icon} className="size-3.5" />
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
            <Icon icon={Layers01Icon} className="size-3.5" />
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
            <Icon icon={Progress01Icon} className="size-3.5" />
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

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon icon={Minimize01Icon} className="size-3.5" />
            Collapse
            <span className="ml-auto text-xs text-muted-foreground">
              {collapse ? optionLabel(collapseOptions, collapse) : "Custom"}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-44">
            <DropdownMenuRadioGroup
              value={collapse ?? ""}
              onValueChange={(value) =>
                onCollapseChange(value as NavCollapse)
              }
            >
              {collapseOptions.map((option) => (
                <DropdownMenuRadioItem key={option.id} value={option.id}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={!isFiltering} onClick={onReset}>
          <Icon icon={RefreshIcon} className="size-3.5" />
          Reset filters
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
