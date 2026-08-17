// RadioGroup preview — the repo's plan-picker showcase from
// examples/ui/radio-group.tsx, plus a compact labeled list with a preselected
// value and a disabled option (items only work inside the group parent).
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export { RadioGroupExample as Showcase } from "@/examples/ui/radio-group"

export function Compact() {
  return (
    <RadioGroup defaultValue="system" className="w-full max-w-sm gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="light" id="radio-preview-light" />
        <Label htmlFor="radio-preview-light">Light</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="dark" id="radio-preview-dark" />
        <Label htmlFor="radio-preview-dark">Dark</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="system" id="radio-preview-system" />
        <Label htmlFor="radio-preview-system">Match system</Label>
      </div>
      <div className="group flex items-center gap-2" data-disabled="true">
        <RadioGroupItem
          value="high-contrast"
          id="radio-preview-contrast"
          disabled
        />
        <Label htmlFor="radio-preview-contrast">High contrast (soon)</Label>
      </div>
    </RadioGroup>
  )
}
