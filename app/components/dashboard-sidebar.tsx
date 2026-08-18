"use client"

import { NavUser } from "@/app/components/nav-user"
import { ItemActions } from "@/app/components/item-actions"
import { StatusDot } from "@/app/components/status-badge"
import { statusOf, useStatuses } from "@/app/components/status-provider"
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
import { allExamples, exampleCategories } from "@/examples"
import { Icon, Icons } from "@/icons/icons"
import * as React from "react"

export function DashboardSidebar({
  selectedSlug,
  onSelect,
}: {
  selectedSlug: string | null
  onSelect: (slug: string | null) => void
}) {
  const { statuses } = useStatuses()
  const activeItemRef = React.useRef<HTMLButtonElement>(null)

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
        </SidebarGroup>
        {exampleCategories.map((category) => (
          <SidebarCategoryGroup
            key={category.title}
            category={category}
            done={
              category.examples.filter(
                (example) => statusOf(statuses, example.slug) === "shipped"
              ).length
            }
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
 * A collapsible category group whose label doubles as the toggle: the category
 * icon swaps to a caret while the label is hovered or keyboard-focused, so the
 * affordance only shows up when it is reachable.
 */
function SidebarCategoryGroup({
  category,
  done,
  selectedSlug,
  onSelect,
  activeItemRef,
}: {
  category: (typeof exampleCategories)[number]
  done: number
  selectedSlug: string | null
  onSelect: (slug: string | null) => void
  activeItemRef: React.Ref<HTMLButtonElement>
}) {
  const [open, setOpen] = React.useState(true)
  const hasSelection = category.examples.some(
    (example) => example.slug === selectedSlug
  )
  // Selecting an item elsewhere (search, arrow keys) must reveal it even if
  // the group was collapsed; the scroll-into-view effect needs it rendered.
  React.useEffect(() => {
    if (hasSelection) {
      setOpen(true)
    }
  }, [hasSelection])
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <SidebarGroup>
        <SidebarGroupLabel className="group/category relative gap-1.5">
          <Icon
            icon={category.icon}
            className="size-3.5! group-hover/category:invisible group-has-[:focus-visible]/category:invisible"
          />
          {category.title}
          <span className="ml-auto font-mono text-[0.65rem]">
            {done}/{category.examples.length}
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
              {open ? "Close" : "Open"} {category.title}
            </span>
          </SidebarGroupAction>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {category.examples.map((example) => (
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
