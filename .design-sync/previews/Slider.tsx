// Slider preview — the repo's volume/price-range showcase from
// examples/ui/slider.tsx, plus deterministic defaultValue cells (single and
// range thumbs, always with a label and full width so the track paints).
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export { SliderExample as Showcase } from "@/examples/ui/slider"

export function Values() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Model temperature</Label>
          <span className="text-sm text-muted-foreground tabular-nums">
            0.30
          </span>
        </div>
        <Slider
          defaultValue={[30]}
          min={0}
          max={100}
          step={1}
          aria-label="Model temperature"
        />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Radius scale</Label>
          <span className="text-sm text-muted-foreground tabular-nums">
            4–16px
          </span>
        </div>
        <Slider
          defaultValue={[20, 80]}
          min={0}
          max={100}
          step={1}
          aria-label="Radius scale"
        />
      </div>
    </div>
  )
}

export function States() {
  return (
    <div className="flex w-full max-w-sm items-center gap-12">
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <Label>Grain (locked)</Label>
          <span className="text-sm text-muted-foreground tabular-nums">
            40%
          </span>
        </div>
        <Slider
          defaultValue={[40]}
          min={0}
          max={100}
          step={1}
          disabled
          aria-label="Grain"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="h-40">
          <Slider
            orientation="vertical"
            defaultValue={[65]}
            min={0}
            max={100}
            step={1}
            aria-label="Zoom"
          />
        </div>
        <Label>Zoom</Label>
      </div>
    </div>
  )
}
