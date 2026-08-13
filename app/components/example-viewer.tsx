"use client"

import * as React from "react"

import type { FlatExample } from "@/examples"

/** Renders just the selected example, centered in the content area. */
export function ExampleViewer({ example }: { example: FlatExample }) {
  const Example = example.component
  return (
    <div className="bg-background flex min-h-[calc(100svh-5.5rem)] items-center justify-center lg:min-h-[calc(100svh-6.5rem)]">
      <div className="p-4 lg:p-6 w-full max-w-3xl border-none! shadow-none! shadow-none">
          <Example />
        </div>
    </div>
  )
}
