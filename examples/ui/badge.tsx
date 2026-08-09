"use client"

import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AlertCircleIcon,
  Clock01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

export function BadgeExample() {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="ghost">Ghost</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">
          <HugeiconsIcon
            icon={Tick02Icon}
            strokeWidth={2}
            data-icon="inline-start"
          />
          Deployed
        </Badge>
        <Badge variant="outline">
          <HugeiconsIcon
            icon={Clock01Icon}
            strokeWidth={2}
            data-icon="inline-start"
          />
          Pending
        </Badge>
        <Badge variant="destructive">
          <HugeiconsIcon
            icon={AlertCircleIcon}
            strokeWidth={2}
            data-icon="inline-start"
          />
          2 failed
        </Badge>
        <Badge variant="outline">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Online
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge render={<a href="#changelog" />} variant="secondary">
          v2.4.0
        </Badge>
        <Badge variant="link" render={<a href="#docs" />}>
          Documentation
        </Badge>
        <Badge className="tabular-nums">12</Badge>
      </div>
    </div>
  )
}
