"use client"

import * as React from "react"

import { DashboardOverview } from "@/components/dashboard-overview"
import { ExampleViewer } from "@/components/example-viewer"
import { StatusDot } from "@/components/status-badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { allExamples, exampleCategories } from "@/examples"
import { Icon, Icons } from "@/icons/icons"

export function Dashboard() {
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null)
  const selected =
    allExamples.find((example) => example.slug === selectedSlug) ?? null

  const total = allExamples.length
  const approved = allExamples.filter(
    (example) => example.status === "approved"
  ).length
  const completion = Math.round((approved / total) * 100)

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex flex-col gap-2 px-2 pt-2">
            <div>
              <div className="text-sm font-semibold">Design System</div>
              <div className="text-xs text-muted-foreground">
                {approved} of {total} approved
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
                    isActive={selected === null}
                    onClick={() => setSelectedSlug(null)}
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
              (example) => example.status === "approved"
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
                          isActive={selectedSlug === example.slug}
                          onClick={() => setSelectedSlug(example.slug)}
                        >
                          <Icon icon={example.icon} />
                          <span>{example.name}</span>
                        </SidebarMenuButton>
                        <SidebarMenuBadge>
                          <StatusDot status={example.status} />
                        </SidebarMenuBadge>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )
          })}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
          <div className="text-sm text-muted-foreground">
            {selected ? (
              <>
                {selected.categoryTitle}
                <span className="mx-1.5">/</span>
                <span className="font-medium text-foreground">
                  {selected.name}
                </span>
              </>
            ) : (
              <span className="font-medium text-foreground">Overview</span>
            )}
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {selected ? (
            <ExampleViewer example={selected} onSelect={setSelectedSlug} />
          ) : (
            <DashboardOverview onSelect={setSelectedSlug} />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
