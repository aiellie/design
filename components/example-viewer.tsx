"use client"

import * as React from "react"

import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Card, CardContent } from "@/components/ui/card"
import { allExamples, type FlatExample } from "@/examples"
import { Icon, Icons } from "@/icons/icons"

function exampleFilePath(slug: string) {
  if (slug === "colors") return "examples/styles/colors.tsx"
  if (slug === "icons") return "examples/icons/icons.tsx"
  return `examples/ui/${slug}.tsx`
}

export function ExampleViewer({
  example,
  onSelect,
}: {
  example: FlatExample
  onSelect: (slug: string) => void
}) {
  const index = allExamples.findIndex((entry) => entry.slug === example.slug)
  const previous = index > 0 ? allExamples[index - 1] : null
  const next = index < allExamples.length - 1 ? allExamples[index + 1] : null
  const Example = example.component

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.target !== document.body) {
        return
      }
      if (event.key === "ArrowLeft" && previous) {
        onSelect(previous.slug)
      }
      if (event.key === "ArrowRight" && next) {
        onSelect(next.slug)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [previous, next, onSelect])

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex size-10 items-center justify-center rounded-lg border bg-card">
          <Icon icon={example.icon} className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold tracking-tight">
              {example.name}
            </h1>
            <StatusBadge status={example.status} />
          </div>
          <div className="truncate font-mono text-xs text-muted-foreground">
            {exampleFilePath(example.slug)}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">
            {index + 1} / {allExamples.length}
          </span>
          <ButtonGroup>
            <Button
              variant="outline"
              size="icon"
              disabled={!previous}
              onClick={() => previous && onSelect(previous.slug)}
              aria-label="Previous example"
            >
              <Icon icon={Icons.arrowLeft} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={!next}
              onClick={() => next && onSelect(next.slug)}
              aria-label="Next example"
            >
              <Icon icon={Icons.arrowRight} />
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <Card>
        <CardContent>
          <Example />
        </CardContent>
      </Card>
    </div>
  )
}
