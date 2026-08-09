"use client"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  FolderOpenIcon,
  GithubIcon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons"

export function EmptyExample() {
  return (
    <Empty className="w-full border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={FolderOpenIcon} strokeWidth={2} />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          Projects you create or join will show up here. Start from scratch or
          import an existing repository.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex flex-wrap justify-center gap-2">
          <Button size="sm">
            <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
            New project
          </Button>
          <Button size="sm" variant="outline">
            <HugeiconsIcon icon={GithubIcon} strokeWidth={2} />
            Import from GitHub
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}
