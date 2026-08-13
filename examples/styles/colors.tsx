"use client"

import * as React from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HugeiconsIcon } from "@hugeicons/react"
import { Icons, type IconData } from "@/icons/icons"

const colorGroups: { title: string; icon: IconData; tokens: string[] }[] = [
  {
    title: "Brand",
    icon: Icons.colors,
    tokens: [
      "--background",
      "--foreground",
      "--primary",
      "--primary-foreground",
      "--secondary",
      "--secondary-foreground",
      "--accent",
      "--accent-foreground",
    ],
  },
  {
    title: "Interface",
    icon: Icons.layout,
    tokens: [
      "--muted",
      "--muted-foreground",
      "--border",
      "--input",
      "--ring",
      "--overlay",
    ],
  },
  {
    title: "Text",
    icon: Icons.textFont,
    tokens: [
      "--link",
      "--selection",
      "--selection-foreground",
      "--highlight",
      "--highlight-foreground",
    ],
  },
  {
    title: "Status",
    icon: Icons.alert,
    tokens: [
      "--destructive",
      "--destructive-foreground",
      "--success",
      "--success-foreground",
      "--warning",
      "--warning-foreground",
      "--info",
      "--info-foreground",
    ],
  },
  {
    title: "Charts",
    icon: Icons.analytics,
    tokens: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
  },
  {
    title: "Sidebar",
    icon: Icons.sidebarLeft,
    tokens: [
      "--sidebar",
      "--sidebar-foreground",
      "--sidebar-primary",
      "--sidebar-primary-foreground",
      "--sidebar-accent",
      "--sidebar-accent-foreground",
      "--sidebar-border",
      "--sidebar-ring",
    ],
  },
    /**{
    title: "Surfaces",
    tokens: [
      "--card",
      "--card-foreground",
      "--popover",
      "--popover-foreground" 
    ],
  },  ***/
]

function Swatch({ token }: { token: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative aspect-square w-full rounded-lg bg-(--color) after:absolute after:inset-0 after:rounded-lg after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten"
        style={{ "--color": `var(${token})` } as React.CSSProperties}
      />
      <div
        title={token}
        className="w-full truncate text-center font-mono text-[0.60rem] text-muted-foreground"
      >
        {token.replace(/^--/, "")}
      </div>
    </div>
  )
}

function GradientSwatch() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative aspect-square w-full rounded-lg bg-brand-gradient after:absolute after:inset-0 after:rounded-lg after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten" />
      <div
        title="brand-gradient"
        className="w-full truncate text-center font-mono text-[0.60rem] text-muted-foreground"
      >
        brand-gradient
      </div>
    </div>
  )
}

export function ColorsExample() {
  const [activeTab, setActiveTab] = React.useState<string | null>("Brand")

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as string)}
      className="w-full"
    >
      <TabsList>
        {colorGroups.map((group) => (
          <Tooltip key={group.title} disabled={activeTab === group.title}>
            <TooltipTrigger
              render={
                <TabsTrigger
                  value={group.title}
                  className="group/trigger flex-none gap-0"
                  onClick={() => {
                    if (activeTab === group.title) {
                      setActiveTab(null)
                    }
                  }}
                >
                  <HugeiconsIcon icon={group.icon} strokeWidth={2} />
                  <span className="inline-grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out group-data-active/trigger:grid-cols-[1fr]">
                    <span className="min-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-opacity duration-300 group-data-active/trigger:pl-1.5 group-data-active/trigger:opacity-100">
                      {group.title}
                    </span>
                  </span>
                </TabsTrigger>
              }
            />
            <TooltipContent>{group.title}</TooltipContent>
          </Tooltip>
        ))}
      </TabsList>
      {colorGroups.map((group) => (
        <TabsContent key={group.title} value={group.title}>
          <div className="grid grid-cols-9 gap-3">
            {group.tokens.map((token) => (
              <Swatch key={token} token={token} />
            ))}
            {group.title === "Brand" && <GradientSwatch />}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
