"use client"

import {
  AiBrowserIcon,
  ArrowRight01Icon,
  Edit01Icon,
  Minimize02Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { Spinner } from "@/components/ui/spinner"

export function MarkerExample() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5 py-12 mx-auto">
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent>Working</MarkerContent>
        <MarkerContent className="ml-auto text-xs font-mono">
          42s
        </MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Yesterday 4:20pm</MarkerContent>
      </Marker>
      <Collapsible
        defaultOpen
        className="group/collapsible flex flex-col gap-3"
      >
        <CollapsibleTrigger
          nativeButton={false}
          render={<Marker variant="border" className="cursor-pointer" />}
        >
          <MarkerIcon>
            <HugeiconsIcon icon={Tick02Icon} />
          </MarkerIcon>
          <MarkerContent>Worked for 25s</MarkerContent>
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            className="ml-auto size-4 shrink-0 transition-transform duration-100 group-data-open/collapsible:rotate-90"
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-3">
          <Marker>
            <MarkerIcon>
              <HugeiconsIcon icon={AiBrowserIcon} />
            </MarkerIcon>
            <MarkerContent>Used the browser</MarkerContent>
          </Marker>
          <Marker>
            <MarkerIcon>
              <HugeiconsIcon icon={Minimize02Icon} />
            </MarkerIcon>
            <MarkerContent>Context automatically compacted</MarkerContent>
          </Marker>
          <Marker>
            <MarkerIcon>
              <HugeiconsIcon icon={Edit01Icon} />
            </MarkerIcon>
            <MarkerContent>Edited files</MarkerContent>
          </Marker>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
