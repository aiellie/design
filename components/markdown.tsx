"use client"

import * as React from "react"
import { code } from "@streamdown/code"
import { Streamdown, type PluginConfig } from "streamdown"

import { cn } from "@/lib/utils"

// Runtime-compatible; Shiki 3 vs 4 language unions don't line up in the types.
const DEFAULT_PLUGINS = { code } as PluginConfig

function Markdown({
  className,
  plugins = DEFAULT_PLUGINS,
  controls = false,
  ...props
}: React.ComponentProps<typeof Streamdown>) {
  return (
    <Streamdown
      data-slot="markdown"
      plugins={plugins}
      controls={controls}
      className={cn("cn-markdown w-full min-w-0 overflow-hidden", className)}
      {...props}
    />
  )
}

export { Markdown }