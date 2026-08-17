// Input preview — the repo's API-key form showcase from examples/ui/input.tsx,
// plus bare-control cells for placeholder/value and disabled/invalid states.
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export { InputExample as Showcase } from "@/examples/ui/input"

export function Default() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <Input placeholder="Search components…" />
      <Input defaultValue="Ellie's design workspace" />
    </div>
  )
}

export function States() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="input-preview-disabled">Workspace slug</Label>
        <Input
          id="input-preview-disabled"
          defaultValue="designellieai"
          disabled
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="input-preview-invalid">Custom domain</Label>
        <Input
          id="input-preview-invalid"
          defaultValue="ellie dev"
          aria-invalid
        />
      </div>
    </div>
  )
}
