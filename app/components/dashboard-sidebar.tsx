"use client"

import { NavUser } from "@/app/components/nav-user"
import { StatusDot } from "@/app/components/status-badge"
import { statusOf, useStatuses } from "@/app/components/status-provider"
import { Progress } from "@/components/ui/progress"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
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
                  <Icon icon={Icons.grid} />
                  <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {exampleCategories.map((category) => {
          const done = category.examples.filter(
            (example) => statusOf(statuses, example.slug) === "shipped"
          ).length
          return (
            <SidebarGroup key={category.title}>
              <SidebarGroupLabel>
                {category.title}
                <span className="ml-auto font-mono text-[0.65rem]">
                  {done}/{category.examples.length}
                </span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {category.examples.map((example) => (
                    <SidebarMenuItem key={example.slug}>
                      <SidebarMenuButton
                        ref={
                          selectedSlug === example.slug
                            ? activeItemRef
                            : undefined
                        }
                        isActive={selectedSlug === example.slug}
                        onClick={() => onSelect(example.slug)}
                      >
                        <Icon icon={example.icon} />
                        <span>{example.name}</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge>
                        <StatusDot
                          status={statusOf(statuses, example.slug)}
                        />
                      </SidebarMenuBadge>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
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
