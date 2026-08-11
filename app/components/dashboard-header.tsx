"use client"

import { StatusSelect } from "@/app/components/status-select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { FlatExample } from "@/examples"
import { Icon, Icons } from "@/icons/icons"
import { Home01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function DashboardHeader({
  selected,
  index,
  total,
  previous,
  next,
  onSelect,
}: {
  selected: FlatExample | null
  index: number
  total: number
  previous: FlatExample | null
  next: FlatExample | null
  onSelect: (slug: string | null) => void
}) {
  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/70 px-4 backdrop-blur-md">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4 my-auto" />
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Breadcrumb>
          <BreadcrumbList className="flex-nowrap">
            <BreadcrumbItem>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label="Home"
                      onClick={() => onSelect(null)}
                    >
                      <HugeiconsIcon icon={Home01Icon} strokeWidth={2} />
                    </Button>
                  }
                />
                <TooltipContent>Home</TooltipContent>
              </Tooltip>
            </BreadcrumbItem>
            {selected ? (
              <>
                <BreadcrumbSeparator className="hidden sm:inline-flex" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="flex items-center gap-2 whitespace-nowrap">
                    <Icon icon={selected.icon} size={14} strokeWidth={2}/>
                    {selected.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : null}
          </BreadcrumbList>
        </Breadcrumb>
        {selected ? (
          <span className="hidden truncate font-mono text-xs text-muted-foreground xl:inline">
            {selected.file}
          </span>
        ) : null}
      </div>
      {selected ? (
        <div className="flex shrink-0 items-center gap-3">
          <StatusSelect slug={selected.slug} />
          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
            {index + 1} / {total}
          </span>
          <ButtonGroup>
            <Button
              variant="outline"
              size="icon-sm"
              disabled={!previous}
              onClick={() => previous && onSelect(previous.slug)}
              aria-label="Previous example"
            >
              <Icon icon={Icons.arrowLeft} />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              disabled={!next}
              onClick={() => next && onSelect(next.slug)}
              aria-label="Next example"
            >
              <Icon icon={Icons.arrowRight} />
            </Button>
          </ButtonGroup>
        </div>
      ) : null}
    </header>
  )
}
