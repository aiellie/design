// ColorRow preview — the repo example (live preview panel + Auto rows) plus
// token rows showing explicit hex values, an "Auto" display value, and the
// reset affordance. The popover only opens on click (and its motion entrance
// would freeze at initial under the capture clock), so rows render closed.
import { ColorRow } from "@/components/color/color-picker"

export { ColorPickerExample as Showcase } from "@/examples/color/color-picker"

const noop = () => {}

export function TokenRows() {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-sm flex-col gap-1.5">
        <ColorRow
          label="Primary"
          value="#8b5cf6"
          onValueChange={noop}
          onReset={noop}
        />
        <ColorRow
          label="Background"
          value="#faf9fb"
          displayValue="Auto"
          onValueChange={noop}
        />
        <ColorRow label="Foreground" value="#1c1917" onValueChange={noop} />
        <ColorRow
          label="Ring"
          value="#a78bfa"
          onValueChange={noop}
          onReset={noop}
        />
      </div>
    </div>
  )
}

export function BrandScale() {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-sm flex-col gap-1.5">
        <ColorRow label="Violet 300" value="#c4b5fd" onValueChange={noop} />
        <ColorRow label="Violet 400" value="#a78bfa" onValueChange={noop} />
        <ColorRow label="Violet 500" value="#8b5cf6" onValueChange={noop} />
        <ColorRow label="Violet 600" value="#7c3aed" onValueChange={noop} />
      </div>
    </div>
  )
}
