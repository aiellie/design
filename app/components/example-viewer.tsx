"use client"

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import type { FlatExample } from "@/examples"

/** Renders just the selected example, centered in the content area. */
export function ExampleViewer({ example }: { example: FlatExample }) {
  const Example = example.component
  return (
    <div className="flex min-h-full items-center justify-center">
      <Card className="w-full max-w-3xl">
        <CardContent>
          <Example />
        </CardContent>
      </Card>
    </div>
  )
}
