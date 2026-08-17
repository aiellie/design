// ScrollArea preview — canonical member list from examples/ui/scroll-area.tsx,
// plus a horizontal strip with the horizontal scrollbar wired up.
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export { ScrollAreaExample as Showcase } from "@/examples/ui/scroll-area"

const releases = [
  { version: "v2.4", note: "Color picker and format selector." },
  { version: "v2.3", note: "Code blocks with syntax highlighting." },
  { version: "v2.2", note: "Charts land in the data category." },
  { version: "v2.1", note: "Carousel, resizable panels, sidebar." },
  { version: "v2.0", note: "Rebuilt on Base UI primitives." },
  { version: "v1.9", note: "Geist across the whole system." },
]

export function Horizontal() {
  return (
    <ScrollArea className="mx-auto w-full max-w-md rounded-lg border">
      <div className="flex w-max gap-3 p-3">
        {releases.map((release) => (
          <div
            key={release.version}
            className="w-40 shrink-0 space-y-1 rounded-lg border bg-muted/30 p-3"
          >
            <p className="font-mono text-xs font-medium">{release.version}</p>
            <p className="text-xs text-muted-foreground">{release.note}</p>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
