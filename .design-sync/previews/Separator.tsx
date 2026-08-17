// Separator preview — canonical header/links demo from examples/ui/separator.tsx,
// plus vertical dividers doing real work inside a compact toolbar.
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export { SeparatorExample as Showcase } from "@/examples/ui/separator"

export function Toolbar() {
  return (
    <div className="flex h-9 w-fit items-center gap-1 rounded-lg border p-1">
      <Button variant="ghost" size="sm">
        Undo
      </Button>
      <Button variant="ghost" size="sm">
        Redo
      </Button>
      <Separator orientation="vertical" className="mx-1" />
      <Button variant="ghost" size="sm">
        Bold
      </Button>
      <Button variant="ghost" size="sm">
        Italic
      </Button>
      <Separator orientation="vertical" className="mx-1" />
      <Button variant="ghost" size="sm">
        Share
      </Button>
    </div>
  )
}
