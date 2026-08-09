import * as React from "react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icon, type IconData } from "@/icons/icons"

import type { ExampleStatus } from "@/examples"

const statusConfig: Record<ExampleStatus, { label: string; dot: string }> = {
  initial: { label: "Initial", dot: "bg-muted-foreground" },
  editing: { label: "Editing", dot: "bg-amber-500" },
  reviewing: { label: "Reviewing", dot: "bg-blue-500" },
  approved: { label: "Approved", dot: "bg-emerald-500" },
}

function StatusBadge({ status }: { status: ExampleStatus }) {
  const { label, dot } = statusConfig[status]
  return (
    <Badge variant="outline" className="gap-1.5 text-muted-foreground">
      <span className={`size-1.5 rounded-full ${dot}`} aria-hidden />
      {label}
    </Badge>
  )
}

/** Shell that frames a single component example on the showcase page. */
export function ExampleCard({
  title,
  icon,
  status,
  children,
}: {
  title: string
  icon?: IconData
  status?: ExampleStatus
  children: React.ReactNode
}) {
  return (
    <Card className="break-inside-avoid">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-mono text-sm font-medium">
          {icon ? (
            <Icon icon={icon} className="size-4 text-muted-foreground" />
          ) : null}
          {title}
        </CardTitle>
        {status ? (
          <CardAction>
            <StatusBadge status={status} />
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
