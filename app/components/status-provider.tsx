"use client"

import * as React from "react"

import type { ExampleStatus } from "@/examples/status"

export type StatusMap = Record<string, ExampleStatus>

interface StatusContextValue {
  statuses: StatusMap
  setStatus: (slug: string, status: ExampleStatus) => void
}

const StatusContext = React.createContext<StatusContextValue | null>(null)

/**
 * Client state for example statuses, seeded from examples/statuses.json by
 * the server (so editing that file never remounts the client tree). Changes
 * update the UI immediately and are persisted back to the JSON file through
 * the dev-only /api/statuses route.
 */
export function StatusProvider({
  initialStatuses,
  children,
}: {
  initialStatuses: StatusMap
  children: React.ReactNode
}) {
  const [statuses, setStatuses] = React.useState<StatusMap>(initialStatuses)

  const setStatus = React.useCallback(
    (slug: string, status: ExampleStatus) => {
      setStatuses((prev) => ({ ...prev, [slug]: status }))
      fetch("/api/statuses", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, status }),
      })
        .then((response) => {
          if (response.status === 405) {
            console.warn(
              "Status changes only persist when running the dev server."
            )
          } else if (!response.ok) {
            console.error("Failed to persist status change", response.status)
          }
        })
        .catch((error) => {
          console.error("Failed to persist status change", error)
        })
    },
    []
  )

  const value = React.useMemo(
    () => ({ statuses, setStatus }),
    [statuses, setStatus]
  )

  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  )
}

export function useStatuses() {
  const context = React.useContext(StatusContext)
  if (!context) {
    throw new Error("useStatuses must be used within a StatusProvider")
  }
  return context
}

/** Status for a slug, defaulting to "idea" for unknown entries. */
export function statusOf(
  statuses: StatusMap,
  slug: string
): ExampleStatus {
  return statuses[slug] ?? "idea"
}
