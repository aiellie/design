// Collapsible preview — canonical reasoning panel from examples/ui/collapsible.tsx
// (closed at rest), plus a defaultOpen panel so the expanded state is visible.
import { ArrowDown01Icon, Database01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export { CollapsibleExample as Showcase } from "@/examples/ui/collapsible"

const variables = [
  { name: "DATABASE_URL", value: "postgres://ellie-prod…" },
  { name: "NEXT_PUBLIC_APP_URL", value: "https://aiellie.dev" },
  { name: "AVATAR_SERVICE_URL", value: "https://avatar.aiellie.dev" },
]

export function OpenState() {
  return (
    <Collapsible
      defaultOpen
      className="mx-auto w-full max-w-md rounded-xl border bg-muted/30"
    >
      <CollapsibleTrigger className="flex w-full items-center gap-2 px-3 py-2.5 text-sm font-medium">
        <HugeiconsIcon
          icon={Database01Icon}
          strokeWidth={2}
          className="size-4 text-primary"
        />
        Environment variables
        <span className="ms-auto text-xs font-normal text-muted-foreground">
          {variables.length} set
        </span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          strokeWidth={2}
          className="size-4 rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t px-3 py-3">
        <div className="flex flex-col gap-2">
          {variables.map((variable) => (
            <div
              key={variable.name}
              className="flex items-center justify-between gap-4 font-mono text-xs"
            >
              <span>{variable.name}</span>
              <span className="text-muted-foreground">{variable.value}</span>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
