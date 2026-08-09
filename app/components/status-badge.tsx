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
        "size-1.5 rounded-full",
        statusMeta[status].color,
        className
      )}
      aria-hidden
    />
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
