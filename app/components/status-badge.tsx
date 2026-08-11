import { Badge } from "@/components/ui/badge"
import { statusMeta, type ExampleStatus } from "@/examples/status"
import { cn } from "@/lib/utils"

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
        "relative flex size-1.5 shrink-0 items-center justify-center",
        statusMeta[status].textColor,
        className
      )}
      aria-hidden
    >
      <span className="absolute inline-flex size-full rounded-full border border-current/30" />
      <span className="relative inline-flex size-1 rounded-full bg-current" />
    </span>
  )
}

export function StatusBadge({ status }: { status: ExampleStatus }) {
  const meta = statusMeta[status]
  return (
    <Badge
      variant="outline"
      className="gap-1.5 text-muted-foreground"
      title={meta.description}
    >
      <StatusDot status={status} />
      {meta.label}
    </Badge>
  )
}
