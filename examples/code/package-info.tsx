"use client"

import type { ReactNode } from "react"
import { CodeIcons, ColorIcons } from "@/icons/icons"
import {
  type ChangeType,
  PackageInfo,
  PackageInfoActions,
  PackageInfoChangeType,
  PackageInfoContent,
  PackageInfoCopyButton,
  PackageInfoDependencies,
  PackageInfoDependency,
  PackageInfoDescription,
  PackageInfoExpandButton,
  PackageInfoHeader,
  PackageInfoIcon,
  PackageInfoInfo,
  PackageInfoName,
} from "@/components/code/package-info"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Package = {
  changeType: ChangeType
  command: string
  currentVersion?: string
  dependencies?: { name: string; version: string }[]
  description?: string
  icon?: ReactNode
  name: string
  newVersion?: string
}

const packages = [
  {
    changeType: "major",
    command: "pnpm add next@16.0.1",
    currentVersion: "15.5.4",
    dependencies: [
      { name: "react", version: "^19.2.0" },
      { name: "react-dom", version: "^19.2.0" },
    ],
    description:
      "Turbopack is now the default bundler, so the dev server no longer reads webpack config.",
    icon: <CodeIcons.next />,
    name: "next",
    newVersion: "16.0.1",
  },
  {
    changeType: "minor",
    command: "pnpm add tailwindcss@4.2.0",
    currentVersion: "4.1.11",
    icon: <ColorIcons.tailwind />,
    name: "tailwindcss",
    newVersion: "4.2.0",
  },
  {
    changeType: "patch",
    command: "pnpm add @base-ui/react@1.0.3",
    currentVersion: "1.0.2",
    icon: <CodeIcons.baseui />,
    name: "@base-ui/react",
    newVersion: "1.0.3",
  },
  {
    changeType: "added",
    command: "pnpm add @hugeicons/react@1.1.4",
    dependencies: [{ name: "@hugeicons/core-free-icons", version: "^1.0.16" }],
    icon: <CodeIcons.hugeicons />,
    name: "@hugeicons/react",
    newVersion: "1.1.4",
  },
  {
    changeType: "removed",
    command: "pnpm remove lucide-react",
    currentVersion: "0.469.0",
    icon: <CodeIcons.lucide />,
    name: "lucide-react",
  },
] satisfies Package[]

const handleCopy = () => {
  console.log("Copied install command to clipboard")
}

const handleCopyError = () => {
  console.error("Failed to copy install command to clipboard")
}

function PackageInfoCard({ pkg }: { pkg: Package }) {
  // The version badge leaves the header too narrow for prose, so the
  // description drops into the collapsible body alongside the dependencies.
  const hasContent = Boolean(pkg.description || pkg.dependencies)

  return (
    <PackageInfo
      changeType={pkg.changeType}
      className="border-none bg-transparent"
      currentVersion={pkg.currentVersion}
      defaultOpen={hasContent}
      disabled={!hasContent}
      name={pkg.name}
      newVersion={pkg.newVersion}
    >
      <PackageInfoHeader>
        <PackageInfoIcon>{pkg.icon}</PackageInfoIcon>
        <PackageInfoInfo>
          <PackageInfoName />
        </PackageInfoInfo>
        <PackageInfoChangeType />
        <PackageInfoActions>
          <Tooltip>
            <TooltipTrigger
              render={
                <PackageInfoCopyButton
                  command={pkg.command}
                  onCopy={handleCopy}
                  onError={handleCopyError}
                />
              }
            />
            <TooltipContent>Copy command</TooltipContent>
          </Tooltip>
        </PackageInfoActions>
        {hasContent && <PackageInfoExpandButton />}
      </PackageInfoHeader>
      {hasContent && (
        <PackageInfoContent className="space-y-3">
          {pkg.description && (
            <PackageInfoDescription>{pkg.description}</PackageInfoDescription>
          )}
          {pkg.dependencies && (
            <PackageInfoDependencies>
              {pkg.dependencies.map((dependency) => (
                <PackageInfoDependency
                  key={dependency.name}
                  name={dependency.name}
                  version={dependency.version}
                />
              ))}
            </PackageInfoDependencies>
          )}
        </PackageInfoContent>
      )}
    </PackageInfo>
  )
}

export function PackageInfoExample() {
  return (
      <div className="flex items-center gap-2 mx-auto justify-center">
        {packages.map((pkg) => (
          <Popover key={pkg.name}>
            <Tooltip>
              <TooltipTrigger
                render={
                  <PopoverTrigger
                    render={
                      <Button
                        aria-label={pkg.name}
                        size="icon"
                        variant="outline"
                      >
                        {pkg.icon}
                      </Button>
                    }
                  />
                }
              />
              <TooltipContent>{pkg.name}</TooltipContent>
            </Tooltip>
            <PopoverContent align="center" className="w-96 overflow-hidden p-0">
              <PackageInfoCard pkg={pkg} />
            </PopoverContent>
          </Popover>
        ))}
      </div>
  )
}
