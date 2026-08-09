"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerExample() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center gap-4">
        <Spinner className="size-3" />
        <Spinner />
        <Spinner className="size-6" />
        <Spinner className="size-8 text-muted-foreground" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button disabled>
          <Spinner />
          Processing payment
        </Button>
        <Button variant="outline" disabled>
          <Spinner />
          Loading
        </Button>
        <Badge variant="secondary">
          <Spinner className="size-3" />
          Syncing
        </Badge>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner />
        Fetching the latest commits…
      </div>
    </div>
  )
}
