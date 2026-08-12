import * as React from "react"

const colorGroups: { title: string; tokens: string[] }[] = [
  {
    title: "Brand",
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
    tokens: [
      "--muted",
      "--muted-foreground",
      "--border",
      "--input",
      "--ring",
      "--selection",
      "--selection-foreground",
    ],
  },
  {
    title: "Status",
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

export function ColorsExample() {
  return (
    <div className="flex flex-col gap-5">
      {colorGroups.map((group) => (
        <div key={group.title} className="flex flex-col gap-2">
          <div className="text-xs font-medium text-muted-foreground">
            {group.title}
          </div>
          <div className="grid grid-cols-8 gap-3">
            {group.tokens.map((token) => (
              <Swatch key={token} token={token} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
