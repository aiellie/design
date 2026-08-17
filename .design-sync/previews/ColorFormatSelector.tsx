// ColorFormatSelector preview — grid card: the repo example field (Showcase),
// the selector closed-with-value inside a color panel row (PanelRow), and a
// sweep of trigger value states (ValueStates). Closed states are the graded
// look; the open popup treatment lives with the single-mode combobox cards.
import {
  ColorFormatSelector,
  ColorFormatSelectorContent,
  ColorFormatSelectorItem,
  ColorFormatSelectorList,
  ColorFormatSelectorTrigger,
  ColorFormatSelectorValue,
} from "@/components/color/color-format-selector"

export { ColorFormatSelectorExample as Showcase } from "@/examples/color/color-format-selector"

const formats = ["hex", "rgb", "hsl", "oklch", "oklab", "cmyk", "p3"]

function FormatSelect({ value }: { value: string }) {
  return (
    <ColorFormatSelector items={formats} defaultValue={value}>
      <ColorFormatSelectorTrigger>
        <ColorFormatSelectorValue />
      </ColorFormatSelectorTrigger>
      <ColorFormatSelectorContent>
        <ColorFormatSelectorList>
          {(format: string) => (
            <ColorFormatSelectorItem key={format} value={format}>
              {format}
            </ColorFormatSelectorItem>
          )}
        </ColorFormatSelectorList>
      </ColorFormatSelectorContent>
    </ColorFormatSelector>
  )
}

export function PanelRow() {
  return (
    <div className="flex w-full justify-center">
      <div
        className="flex w-full max-w-sm items-center justify-between rounded-lg bg-muted/60 px-3"
        style={{ height: 40 }}
      >
        <span className="flex items-center gap-2">
          <span
            className="rounded-full border border-border/70"
            style={{ width: 18, height: 18, background: "#8b5cf6" }}
          />
          <code className="font-mono text-xs text-muted-foreground">
            oklch(60.6% 0.25 292.7)
          </code>
        </span>
        <FormatSelect value="oklch" />
      </div>
    </div>
  )
}

export function ValueStates() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      <FormatSelect value="hex" />
      <FormatSelect value="rgb" />
      <FormatSelect value="hsl" />
      <FormatSelect value="p3" />
    </div>
  )
}
