"use client"

import * as React from "react"

import { DashboardHeader } from "@/app/components/dashboard-header"
import { DashboardOverview } from "@/app/components/dashboard-overview"
import { DashboardSidebar } from "@/app/components/dashboard-sidebar"
import { ExampleViewer } from "@/app/components/example-viewer"
import {
  StatusProvider,
  type StatusMap,
} from "@/app/components/status-provider"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { allExamples } from "@/examples"

export function Dashboard({
  initialStatuses,
}: {
  initialStatuses: StatusMap
}) {
  return (
    <StatusProvider initialStatuses={initialStatuses}>
      <DashboardShell />
    </StatusProvider>
  )
}

function DashboardShell() {
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null)
  const index = allExamples.findIndex(
    (example) => example.slug === selectedSlug
  )
  const selected = index >= 0 ? allExamples[index] : null
  const previous = index > 0 ? allExamples[index - 1] : null
  const next =
    selected && index < allExamples.length - 1 ? allExamples[index + 1] : null
  const total = allExamples.length

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
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar
        selectedSlug={selectedSlug}
        onSelect={setSelectedSlug}
      />
      <SidebarInset>
        <DashboardHeader
          selected={selected}
          index={index}
          total={total}
          previous={previous}
          next={next}
          onSelect={setSelectedSlug}
        />
        <div className="flex-1 p-0">
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
