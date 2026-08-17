// Switch preview — the repo's focus-settings showcase from
// examples/ui/switch.tsx (all sm), plus the size axis and
// disabled/invalid states with labels.
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export { SwitchExample as Showcase } from "@/examples/ui/switch"

export function Sizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="switch-preview-default">
          Public share links (default)
        </Label>
        <Switch id="switch-preview-default" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="switch-preview-sm">Compact mode (sm)</Label>
        <Switch id="switch-preview-sm" size="sm" />
      </div>
    </div>
  )
}

export function States() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div
        className="group flex items-center justify-between"
        data-disabled="true"
      >
        <Label htmlFor="switch-preview-disabled-off">
          Usage analytics (managed)
        </Label>
        <Switch id="switch-preview-disabled-off" disabled />
      </div>
      <div
        className="group flex items-center justify-between"
        data-disabled="true"
      >
        <Label htmlFor="switch-preview-disabled-on">
          Two-factor auth (enforced)
        </Label>
        <Switch id="switch-preview-disabled-on" disabled defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="switch-preview-invalid">Accept data policy</Label>
        <Switch id="switch-preview-invalid" aria-invalid />
      </div>
    </div>
  )
}
