// Badge preview — repo showcase from examples/ui/badge.tsx, plus the cva
// variant sweep and an icon/status-dot cell for the grid.
import { BadgeCheck } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

export { BadgeExample as Showcase } from "@/examples/ui/badge"

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  )
}

/** Status dot that inherits the badge palette through currentColor. */
function StatusDot() {
  return (
    <span
      data-icon="inline-start"
      className="relative flex size-1.5 shrink-0 items-center justify-center"
    >
      <span
        aria-hidden
        className="absolute inline-flex size-full rounded-full border border-current/30"
      />
      <span className="relative inline-flex size-1 rounded-full bg-current" />
    </span>
  )
}

export function IconsAndStatus() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge className="border-blue-200 bg-blue-500/5 text-blue-700 dark:border-blue-400/20 dark:bg-blue-950 dark:text-blue-300">
        <HugeiconsIcon icon={BadgeCheck} data-icon="inline-start" />
        Verified
      </Badge>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" />
        Publishing
      </Badge>
      <Badge className="border-emerald-500/20 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-950 dark:text-emerald-300">
        <StatusDot />
        Live
      </Badge>
      <Badge className="border-slate-500/20 bg-slate-50 text-slate-700 dark:border-slate-400/20 dark:bg-slate-900 dark:text-slate-300">
        <StatusDot />
        Offline
      </Badge>
    </div>
  )
}
