// AspectRatio preview — canonical 16:9 media frame from examples/ui/aspect-ratio.tsx,
// plus a sweep of common ratios rendered as labeled placeholder frames.
import { AspectRatio } from "@/components/ui/aspect-ratio"

export { AspectRatioExample as Showcase } from "@/examples/ui/aspect-ratio"

const ratios = [
  { label: "1 : 1", ratio: 1 },
  { label: "4 : 3", ratio: 4 / 3 },
  { label: "16 : 9", ratio: 16 / 9 },
]

export function CommonRatios() {
  return (
    <div className="flex w-full items-start gap-3">
      {ratios.map((entry) => (
        <div key={entry.label} className="flex-1">
          <AspectRatio
            ratio={entry.ratio}
            className="flex items-center justify-center rounded-lg border bg-muted"
          >
            <span className="font-mono text-xs text-muted-foreground">
              {entry.label}
            </span>
          </AspectRatio>
        </div>
      ))}
    </div>
  )
}
