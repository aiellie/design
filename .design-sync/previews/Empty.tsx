// Empty preview — repo showcase grid from examples/ui/empty.tsx, plus a
// single bordered empty state and the muted-wash variant.
import {
  FolderOpenIcon,
  PlusSignIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export { EmptyExample as Showcase } from "@/examples/ui/empty"

export function Basic() {
  return (
    <Empty className="w-full max-w-md border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={FolderOpenIcon} strokeWidth={2} />
        </EmptyMedia>
        <EmptyTitle>No saved themes</EmptyTitle>
        <EmptyDescription>
          Themes you create will appear here. Start from the default palette or
          duplicate an existing one.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">
          <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
          New theme
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export function MutedBackground() {
  return (
    <Empty className="w-full max-w-md bg-muted/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
        </EmptyMedia>
        <EmptyTitle>No results for &quot;sidebarr&quot;</EmptyTitle>
        <EmptyDescription>
          Check the spelling or browse the component index instead.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Clear search
        </Button>
      </EmptyContent>
    </Empty>
  )
}
