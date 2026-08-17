// Button preview — canonical cell ported from examples/ui/button.tsx (the
// repo's own showcase), plus focused variant/size/state cells for the grid.
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export { ButtonExample as Showcase } from "@/examples/ui/button"

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}

export function States() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" />
        Saving changes
      </Button>
    </div>
  )
}
