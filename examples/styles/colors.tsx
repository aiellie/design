import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const colorGroups: { title: string; tokens: string[] }[] = [
  {
    title: "Core",
    tokens: [
      "--background",
      "--foreground",
      "--card",
      "--card-foreground",
      "--popover",
      "--popover-foreground",
      "--primary",
      "--primary-foreground",
      "--secondary",
      "--secondary-foreground",
      "--muted",
      "--muted-foreground",
      "--accent",
      "--accent-foreground",
      "--destructive",
      "--border",
      "--input",
      "--ring",
    ],
  },
  {
    title: "Charts",
    tokens: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
  },
  {
    title: "Sidebar",
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

export function ColorsExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Colors</CardTitle>
        <CardDescription className="line-clamp-2">
          Every color token defined in styles/globals.css. Swatches follow the
          active theme.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {colorGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-2">
            <div className="text-xs font-medium text-muted-foreground">
              {group.title}
            </div>
            <div className="grid grid-cols-6 gap-3">
              {group.tokens.map((token) => (
                <Swatch key={token} token={token} />
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
