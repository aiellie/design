"use client"

import * as React from "react"

import { DashboardOverview } from "@/app/components/dashboard-overview"
import { ExampleViewer } from "@/app/components/example-viewer"
import { StatusBadge, StatusDot } from "@/app/components/status-badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
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
  const index = allExamples.findIndex(
    (example) => example.slug === selectedSlug
  )
  const selected = index >= 0 ? allExamples[index] : null
  const previous = index > 0 ? allExamples[index - 1] : null
  const next =
    selected && index < allExamples.length - 1 ? allExamples[index + 1] : null

  const total = allExamples.length
  const shipped = allExamples.filter(
    (example) => example.status === "shipped"
  ).length
  const completion = Math.round((shipped / total) * 100)

  React.useEffect(() => {
    if (!selected) {
      return
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.target !== document.body) {
        return
      }
      if (event.key === "ArrowLeft" && previous) {
        setSelectedSlug(previous.slug)
      }
      if (event.key === "ArrowRight" && next) {
        setSelectedSlug(next.slug)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [selected, previous, next])

  return (
    <SidebarProvider>
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
              (example) => example.status === "shipped"
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
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/70 px-4 backdrop-blur-md">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Breadcrumb>
              <BreadcrumbList className="flex-nowrap">
                {selected ? (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        render={
                          <button
                            type="button"
                            onClick={() => setSelectedSlug(null)}
                          >
                            Overview
                          </button>
                        }
                      />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem className="hidden whitespace-nowrap sm:inline-flex">
                      {selected.categoryTitle}
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden sm:inline-flex" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="whitespace-nowrap">
                        {selected.name}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage>Overview</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
            {selected ? (
              <span className="hidden truncate font-mono text-xs text-muted-foreground xl:inline">
                {selected.file}
              </span>
            ) : null}
          </div>
          {selected ? (
            <div className="flex shrink-0 items-center gap-3">
              <StatusBadge status={selected.status} />
              <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                {index + 1} / {total}
              </span>
              <ButtonGroup>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={!previous}
                  onClick={() => previous && setSelectedSlug(previous.slug)}
                  aria-label="Previous example"
                >
                  <Icon icon={Icons.arrowLeft} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={!next}
                  onClick={() => next && setSelectedSlug(next.slug)}
                  aria-label="Next example"
                >
                  <Icon icon={Icons.arrowRight} />
                </Button>
              </ButtonGroup>
            </div>
          ) : null}
        </header>
        <div className="flex-1 p-4 lg:p-6">
          {selected ? (
            <ExampleViewer key={selected.slug} example={selected} />
          ) : (
            <DashboardOverview onSelect={setSelectedSlug} />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
