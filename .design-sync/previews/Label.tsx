// Label preview — the repo's control-pairing showcase from
// examples/ui/label.tsx, plus a cell pairing Label with checkbox and switch
// controls (labels only make sense next to the control they name).
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export { LabelExample as Showcase } from "@/examples/ui/label"

export function ControlPairings() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="label-preview-updates" defaultChecked />
        <Label htmlFor="label-preview-updates">Email me release updates</Label>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="label-preview-autosave">Autosave drafts</Label>
        <Switch id="label-preview-autosave" defaultChecked />
      </div>
      <div className="group flex items-center gap-2" data-disabled="true">
        <Checkbox id="label-preview-disabled" disabled />
        <Label htmlFor="label-preview-disabled">
          Legacy exports (retired)
        </Label>
      </div>
    </div>
  )
}
