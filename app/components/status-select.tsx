"use client"

import * as React from "react"

import { StatusIcon } from "@/app/components/status-badge"
import { statusOf, useStatuses } from "@/app/components/status-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { exampleStatuses, statusMeta } from "@/examples/status"
import { Icon } from "@/icons/icons"
import { Tick02Icon } from "@/icons/huge-icons"
import { Button } from "@/components/ui/button"

/** Status badge that opens a menu to change the example's status. */
export function StatusSelect({ slug }: { slug: string }) {
  const { statuses, setStatus } = useStatuses()
  const current = statusOf(statuses, slug)
  const currentMeta = statusMeta[current]

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Change status"
                >
                  <StatusIcon status={current} />
                </Button>
              }
            />
          }
        />
        <TooltipContent>{currentMeta.label}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="w-full">
        {exampleStatuses.map((status) => (
          <DropdownMenuItem
            key={status.id}
            onClick={() => setStatus(slug, status.id)}
          >
            <StatusIcon status={status.id} />
            <div className="flex flex-col">
              <span>{status.label}</span>
            </div>
            {current === status.id ? (
              <Icon icon={Tick02Icon} className="ml-auto size-4" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
