// Marker preview — the repo's status/collapsible showcase from
// examples/ui/marker.tsx, plus the three cva variants side by side.
import { Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

export { MarkerExample as Showcase } from "@/examples/ui/marker"

export function Variants() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Marker>
        <MarkerIcon>
          <HugeiconsIcon icon={Tick02Icon} />
        </MarkerIcon>
        <MarkerContent>
          Deployed preview build · <a href="#logs">view log</a>
        </MarkerContent>
        <MarkerContent className="ml-auto font-mono text-xs">12s</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent className="text-xs">Today · 9:41 AM</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerContent>Earlier this week</MarkerContent>
      </Marker>
    </div>
  )
}
