import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

import type { ExampleStatus } from "@/examples"

export const statusConfig: Record<
  ExampleStatus,
  { label: string; dot: string }
> = {
  initial: { label: "Initial", dot: "bg-muted-foreground" },
  editing: { label: "Editing", dot: "bg-amber-500" },
  reviewing: { label: "Reviewing", dot: "bg-blue-500" },
  approved: { label: "Approved", dot: "bg-emerald-500" },
}

/** Statuses in workflow order, first to last. */
export const statusOrder: ExampleStatus[] = [
  "initial",
  "editing",
  "reviewing",
  "approved",
]

export function StatusDot({
  status,
  className,
}: {
  status: ExampleStatus
  className?: string
}) {
  return (
    <span
      className={cn(
        "size-1.5 rounded-full",
        statusConfig[status].dot,
        className
      )}
      aria-hidden
    />
  )
}

export function StatusBadge({ status }: { status: ExampleStatus }) {
  return (
    <Badge variant="outline" className="gap-1.5 text-muted-foreground">
      <StatusDot status={status} />
      {statusConfig[status].label}
    </Badge>
  )
}
