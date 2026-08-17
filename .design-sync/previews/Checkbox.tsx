// Checkbox preview — the repo's settings-list showcase from
// examples/ui/checkbox.tsx, plus a labeled state sweep so every box renders
// in context (a lone unlabeled checkbox paints almost nothing).
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export { CheckboxExample as Showcase } from "@/examples/ui/checkbox"

export function States() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox-preview-default" />
        <Label htmlFor="checkbox-preview-default">
          Send me product updates
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox-preview-checked" defaultChecked />
        <Label htmlFor="checkbox-preview-checked">Sync tokens to Figma</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox-preview-invalid" aria-invalid />
        <Label htmlFor="checkbox-preview-invalid">
          Accept the usage policy
        </Label>
      </div>
      <div className="group flex items-center gap-2" data-disabled="true">
        <Checkbox id="checkbox-preview-disabled" disabled />
        <Label htmlFor="checkbox-preview-disabled">
          Beta features (waitlist)
        </Label>
      </div>
      <div className="group flex items-center gap-2" data-disabled="true">
        <Checkbox id="checkbox-preview-disabled-checked" disabled defaultChecked />
        <Label htmlFor="checkbox-preview-disabled-checked">
          Required security checks
        </Label>
      </div>
    </div>
  )
}
