"use client"

import { NavUser } from "@/app/components/nav-user"
import {
  NavFilters,
  type NavCollapse,
  type NavGroupBy,
  type NavSortBy,
} from "@/app/components/nav-filters"
import { ItemActions } from "@/app/components/item-actions"
import { StatusDot } from "@/app/components/status-badge"
import {
  statusOf,
  useStatuses,
  type StatusMap,
} from "@/app/components/status-provider"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  allExamples,
  exampleCategories,
  type ComponentExample,
} from "@/examples"
import { exampleStatuses, type ExampleStatus } from "@/examples/status"
import { Icon, Icons, type IconData } from "@/icons/icons"
import * as React from "react"

/** One rendered nav section after grouping, filtering, and sorting. */
interface NavGroup {
  key: string
  title: string
  icon: IconData
  /** Right-aligned counter, e.g. "3/12" for categories or "8" for statuses. */
  countLabel: string
  examples: ComponentExample[]
}

const statusRank = Object.fromEntries(
  exampleStatuses.map((status, index) => [status.id, index])
) as Record<ExampleStatus, number>

function sortExamples(
  examples: ComponentExample[],
  sortBy: NavSortBy,
  statuses: StatusMap
): ComponentExample[] {
  if (sortBy === "name") {
    return [...examples].sort((a, b) => a.name.localeCompare(b.name))
  }
  if (sortBy === "status") {
    return [...examples].sort(
      (a, b) =>
        statusRank[statusOf(statuses, a.slug)] -
          statusRank[statusOf(statuses, b.slug)] ||
        a.name.localeCompare(b.name)
    )
  }
  return examples
}

/** Groups examples per the filter settings; empty groups are dropped. */
function buildNavGroups(
  sortBy: NavSortBy,
  groupBy: NavGroupBy,
  visibleStatuses: ExampleStatus[],
  statuses: StatusMap
): NavGroup[] {
  const visible = (example: ComponentExample) =>
    visibleStatuses.includes(statusOf(statuses, example.slug))
  const shippedCount = (examples: ComponentExample[]) =>
    examples.filter(
      (example) => statusOf(statuses, example.slug) === "shipped"
    ).length

  let groups: NavGroup[]
  if (groupBy === "category") {
    groups = exampleCategories.map((category) => {
      const examples = sortExamples(
        category.examples.filter(visible),
        sortBy,
        statuses
      )
      return {
        key: category.title,
        title: category.title,
        icon: category.icon,
        countLabel: `${shippedCount(examples)}/${examples.length}`,
        examples,
      }
    })
  } else if (groupBy === "status") {
    groups = exampleStatuses
      .filter((status) => visibleStatuses.includes(status.id))
      .map((status) => {
        const examples = sortExamples(
          allExamples.filter(
            (example) => statusOf(statuses, example.slug) === status.id
          ),
          sortBy,
          statuses
        )
        return {
          key: status.id,
          title: status.label,
          icon: status.icon,
          countLabel: `${examples.length}`,
          examples,
        }
      })
  } else {
    const examples = sortExamples(
      allExamples.filter(visible),
      sortBy,
      statuses
    )
    groups = [
      {
        key: "all",
        title: "Components",
        icon: Icons.grid,
        countLabel: `${shippedCount(examples)}/${examples.length}`,
        examples,
      },
    ]
  }
  return groups.filter((group) => group.examples.length > 0)
}

const defaultSortBy: NavSortBy = "default"
const defaultGroupBy: NavGroupBy = "category"
// The default status filter leaves finished (shipped) work unchecked.
const defaultVisibleStatuses = () =>
  exampleStatuses
    .filter((status) => status.id !== "shipped")
    .map((status) => status.id)

/** A group is completed when every example in it has shipped. */
const isGroupCompleted = (group: NavGroup, statuses: StatusMap) =>
  group.examples.every(
    (example) => statusOf(statuses, example.slug) === "shipped"
  )

/**
 * Completed groups start collapsed. Computed over every status — not the
 * default filter, which hides shipped work entirely — so finished groups
 * arrive folded the moment the user shows shipped work again.
 */
const defaultCollapsedKeys = (statuses: StatusMap) =>
  new Set(
    buildNavGroups(
      defaultSortBy,
      defaultGroupBy,
      exampleStatuses.map((status) => status.id),
      statuses
    )
      .filter((group) => isGroupCompleted(group, statuses))
      .map((group) => group.key)
  )

const setEquals = <T,>(a: ReadonlySet<T>, b: ReadonlySet<T>) =>
  a.size === b.size && [...a].every((item) => b.has(item))

export function DashboardSidebar({
  selectedSlug,
  onSelect,
}: {
  selectedSlug: string | null
  onSelect: (slug: string | null) => void
}) {
  const { statuses } = useStatuses()
  const activeItemRef = React.useRef<HTMLButtonElement>(null)

  const [sortBy, setSortBy] = React.useState<NavSortBy>(defaultSortBy)
  const [groupBy, setGroupBy] = React.useState<NavGroupBy>(defaultGroupBy)
  const [visibleStatuses, setVisibleStatuses] = React.useState<
    ExampleStatus[]
  >(defaultVisibleStatuses)
  // Group open state lives here (keyed by group key) so the filter menu's
  // collapse preset and the per-group toggles drive the same state.
  const [collapsedKeys, setCollapsedKeys] = React.useState<Set<string>>(() =>
    defaultCollapsedKeys(statuses)
  )

  // Initial load is handled by the inline script below, before first paint.
  // This covers in-app navigation (clicks, arrow keys): center the active
  // item when it moves outside the visible sidebar, leave it alone otherwise.
  React.useLayoutEffect(() => {
    const item = activeItemRef.current
    if (!item) {
      return
    }
    const container = item.closest('[data-sidebar="content"]')
    if (container) {
      const itemRect = item.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      if (
        containerRect.height > 0 &&
        itemRect.top >= containerRect.top &&
        itemRect.bottom <= containerRect.bottom
      ) {
        return
      }
    }
    item.scrollIntoView({ block: "center" })
  }, [selectedSlug])

  const total = allExamples.length
  const shipped = allExamples.filter(
    (example) => statusOf(statuses, example.slug) === "shipped"
  ).length
  const completion = Math.round((shipped / total) * 100)

  const groups = buildNavGroups(sortBy, groupBy, visibleStatuses, statuses)

  const isCollapsed = (group: NavGroup) => collapsedKeys.has(group.key)
  const isCompleted = (group: NavGroup) => isGroupCompleted(group, statuses)

  // Which preset the current open state matches — drives the menu's radio
  // selection; null when manual toggles produced a mix ("Custom").
  const collapse: NavCollapse | null = groups.every(
    (group) => !isCollapsed(group)
  )
    ? "none"
    : groups.every(isCollapsed)
      ? "all"
      : groups.every((group) => isCollapsed(group) === isCompleted(group))
        ? "completed"
        : null

  // Any deviation from the default view lights the trigger icon and arms
  // the reset item.
  const isFiltering =
    sortBy !== defaultSortBy ||
    groupBy !== defaultGroupBy ||
    !setEquals(
      new Set(visibleStatuses),
      new Set(defaultVisibleStatuses())
    ) ||
    !setEquals(collapsedKeys, defaultCollapsedKeys(statuses))

  function setGroupOpen(key: string, open: boolean) {
    setCollapsedKeys((prev) => {
      const next = new Set(prev)
      if (open) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  function handleCollapse(collapse: NavCollapse) {
    // "Completed" folds away finished work (which includes the "Shipped"
    // group when grouping by status).
    const shouldCollapse =
      collapse === "all"
        ? () => true
        : collapse === "none"
          ? () => false
          : isCompleted
    setCollapsedKeys(
      new Set(groups.filter(shouldCollapse).map((group) => group.key))
    )
  }

  function handleReset() {
    setSortBy(defaultSortBy)
    setGroupBy(defaultGroupBy)
    setVisibleStatuses(defaultVisibleStatuses())
    setCollapsedKeys(defaultCollapsedKeys(statuses))
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-col gap-2 px-2 pt-2">
          <div>
            <div className="text-sm font-semibold">Design System</div>
            <div className="text-xs text-muted-foreground">
              {shipped} of {total} shipped
            </div>
          </div>
          <Progress value={completion} aria-label="Overall completion" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={selectedSlug === null}
                  onClick={() => onSelect(null)}
                >
                  <Icon icon={Icons.home} />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          <NavFilters
            sortBy={sortBy}
            groupBy={groupBy}
            visibleStatuses={visibleStatuses}
            collapse={collapse}
            isFiltering={isFiltering}
            onSortByChange={setSortBy}
            onGroupByChange={setGroupBy}
            onVisibleStatusesChange={setVisibleStatuses}
            onCollapseChange={handleCollapse}
            onReset={handleReset}
          />
        </SidebarGroup>
        {groups.map((group) => (
          <SidebarNavGroup
            key={group.key}
            group={group}
            open={!collapsedKeys.has(group.key)}
            onOpenChange={(open) => setGroupOpen(group.key, open)}
            selectedSlug={selectedSlug}
            onSelect={onSelect}
            activeItemRef={activeItemRef}
          />
        ))}
        {/* Runs while the server HTML is parsing, before first paint, so a
            deep link opens with the active item already centered — no jump. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var b=document.querySelector('[data-sidebar="menu-button"][data-active]');if(!b)return;var c=b.closest('[data-sidebar="content"]');if(!c)return;c.scrollTop+=b.getBoundingClientRect().top-c.getBoundingClientRect().top-(c.clientHeight-b.offsetHeight)/2})()`,
          }}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: "aiellie",
            email: "hello@aiellie.dev",
            avatar: "https://avatar.aiellie.dev/aielliedev",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

/**
 * A collapsible nav group whose label doubles as the toggle: the group icon
 * swaps to a caret while the label is hovered or keyboard-focused, so the
 * affordance only shows up when it is reachable.
 */
function SidebarNavGroup({
  group,
  open,
  onOpenChange,
  selectedSlug,
  onSelect,
  activeItemRef,
}: {
  group: NavGroup
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedSlug: string | null
  onSelect: (slug: string | null) => void
  activeItemRef: React.Ref<HTMLButtonElement>
}) {
  const hasSelection = group.examples.some(
    (example) => example.slug === selectedSlug
  )
  const openRef = React.useRef(onOpenChange)
  openRef.current = onOpenChange
  // Selecting an item elsewhere (search, arrow keys) must reveal it even if
  // the group was collapsed; the scroll-into-view effect needs it rendered.
  React.useEffect(() => {
    if (hasSelection) {
      openRef.current(true)
    }
  }, [hasSelection])
  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <SidebarGroup>
        <SidebarGroupLabel className="group/category relative gap-1.5">
          <Icon
            icon={group.icon}
            className="size-3.5! group-hover/category:invisible group-has-[:focus-visible]/category:invisible"
          />
          {group.title}
          <span className="ml-auto font-mono text-[0.65rem]">
            {group.countLabel}
          </span>
          <SidebarGroupAction
            render={<CollapsibleTrigger />}
            className="top-1.5 right-auto start-1 rounded-sm opacity-0 group-has-[:focus-visible]/category:opacity-100 group-hover/category:opacity-100"
          >
            <Icon
              icon={open ? Icons.arrowDown : Icons.chevronRight}
              className="size-3.5!"
            />
            <span className="sr-only">
              {open ? "Close" : "Open"} {group.title}
            </span>
          </SidebarGroupAction>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.examples.map((example) => (
                <SidebarMenuItem key={example.slug}>
                  <SidebarMenuButton
                    ref={
                      selectedSlug === example.slug ? activeItemRef : undefined
                    }
                    isActive={selectedSlug === example.slug}
                    onClick={() => onSelect(example.slug)}
                  >
                    <Icon icon={example.icon} />
                    <span>{example.name}</span>
                  </SidebarMenuButton>
                  {/* The dot gives way to the actions menu on hover (and
                      stays away while that menu is open). Touch devices
                      have no hover, so they get the menu outright.
                <SidebarMenuBadge className="transition-opacity max-md:hidden group-hover/menu-item:opacity-0 group-focus-within/menu-item:opacity-0 group-has-data-popup-open/menu-item:opacity-0">
                    <StatusDot
                      status={statusOf(statuses, example.slug)}
                    />
                  </SidebarMenuBadge>*/}
                  <ItemActions
                    slug={example.slug}
                    name={example.name}
                    className="absolute top-0.5 right-1 transition-opacity group-data-[collapsible=icon]:hidden data-popup-open:opacity-100 md:opacity-0 md:group-focus-within/menu-item:opacity-100 md:group-hover/menu-item:opacity-100"
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
