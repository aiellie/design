// Spinner preview — repo showcase from examples/ui/spinner.tsx, plus a
// labeled size sweep and labeled loading rows so every cell visibly paints.
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export { SpinnerExample as Showcase } from "@/examples/ui/spinner"

const sizes = [
  { className: "size-3", label: "12px" },
  { className: "size-4", label: "16px" },
  { className: "size-6", label: "24px" },
  { className: "size-8", label: "32px" },
]

export function Sizes() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      {sizes.map((size) => (
        <div key={size.label} className="flex flex-col items-center gap-2">
          <Spinner className={size.className} />
          <span className="text-xs text-muted-foreground tabular-nums">
            {size.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export function LoadingStates() {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner />
        Syncing design tokens...
      </div>
      <div className="flex items-center gap-2 text-sm text-primary">
        <Spinner />
        Publishing to registry...
      </div>
      <Button size="sm" disabled>
        <Spinner data-icon="inline-start" />
        Deploying preview
      </Button>
    </div>
  )
}
