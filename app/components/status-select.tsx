"use client"

import * as React from "react"

import { StatusBadge } from "@/app/components/status-badge"
import { statusOf, useStatuses } from "@/app/components/status-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { exampleStatuses } from "@/examples/status"
import { Icon, Icons } from "@/icons/icons"

/** Status badge that opens a menu to change the example's status. */
export function StatusSelect({ slug }: { slug: string }) {
  const { statuses, setStatus } = useStatuses()
  const current = statusOf(statuses, slug)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Change status"
            className="rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <StatusBadge status={current} />
          </button>
        }
      />
      <DropdownMenuContent align="end" className="w-full">
        {exampleStatuses.map((status) => (
          <DropdownMenuItem
            key={status.id}
            onClick={() => setStatus(slug, status.id)}
          >
            <span
              className={`size-2 rounded-full ${status.color}`}
              aria-hidden
            />
            <div className="flex flex-col">
              <span>{status.label}</span>
              <span className="text-xs text-muted-foreground">
                {status.description}
              </span>
            </div>
            {current === status.id ? (
              <Icon icon={Icons.check} className="ml-auto size-4" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
