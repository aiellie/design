"use client"

import * as React from "react"

import { ExampleTabs } from "@/app/components/example-tabs"
import { exampleDemos, type FlatExample } from "@/examples"

/** Renders just the selected example, centered in the content area. */
export function ExampleViewer({ example }: { example: FlatExample }) {
  const demos = exampleDemos(example)
  const Example = example.component

  return (
    <div className="bg-background bg-dotted flex  flex-col p-4 min-h-[calc(100svh-6.5rem)] lg:p-6">
      {/* One demo renders bare — tabs would be a control with nothing to
          switch to, and the example keeps the full height to centre in. */}
      {demos.length > 1 ? (
        <ExampleTabs demos={demos} />
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-3xl">
            <Example />
          </div>
        </div>
      )}
    </div>
  )
}
