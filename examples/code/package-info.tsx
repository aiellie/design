"use client"

import type { ReactNode } from "react"
import { CodeIcons, ColorIcons } from "@/icons/icons"
import {
  type ChangeType,
  type PackageDependency,
  PackageInfo,
  PackageInfoActions,
  PackageInfoCopyButton,
  PackageInfoDependencies,
  PackageInfoDescription,
  PackageInfoIcon,
  PackageInfoInfo,
  PackageInfoName,
  PackageInfoVersion,
} from "@/components/code/package-info"
import { ItemGroup } from "@/components/ui/item"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Package = {
  changeType: ChangeType
  command: string
  currentVersion?: string
  dependencies?: PackageDependency[]
  description: string
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
      { name: "@swc/helpers", version: "0.5.15" },
      { name: "postcss", version: "8.4.31" },
    ],
    description: "Turbopack is default dev bundler.",
    icon: <CodeIcons.next />,
    name: "next",
    newVersion: "16.0.1",
  },
  {
    changeType: "minor",
    command: "pnpm add tailwindcss@4.2.0",
    currentVersion: "4.1.11",
    description: "Faster incremental builds and new variants.",
    icon: <ColorIcons.tailwind />,
    name: "tailwindcss",
    newVersion: "4.2.0",
  },
  {
    changeType: "patch",
    command: "pnpm add @base-ui/react@1.0.3",
    currentVersion: "1.0.2",
    dependencies: [
      { name: "@floating-ui/react-dom", version: "^2.1.6" },
      { name: "use-sync-external-store", version: "^1.5.0" },
    ],
    description: "Fixes focus handling in nested dialogs.",
    icon: <CodeIcons.baseui />,
    name: "@base-ui/react",
    newVersion: "1.0.3",
  },
  {
    changeType: "added",
    command: "pnpm add @hugeicons/react@1.1.4",
    dependencies: [
      { name: "@hugeicons/core-free-icons", version: "^1.0.16" },
    ],
    description: "Icon set used across the UI.",
    icon: <CodeIcons.hugeicons />,
    name: "@hugeicons/react",
    newVersion: "1.1.4",
  },
  {
    changeType: "removed",
    command: "pnpm remove lucide-react",
    currentVersion: "0.469.0",
    description: "Replaced by @hugeicons/react.",
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
  return (
    <PackageInfo
      changeType={pkg.changeType}
      currentVersion={pkg.currentVersion}
      name={pkg.name}
      newVersion={pkg.newVersion}
    >
      <PackageInfoIcon>{pkg.icon}</PackageInfoIcon>
      <PackageInfoInfo>
        <PackageInfoName />
        <PackageInfoDescription>{pkg.description}</PackageInfoDescription>
      </PackageInfoInfo>
      <PackageInfoActions>
        {pkg.dependencies && (
          <Tooltip>
            <TooltipTrigger
              render={<PackageInfoDependencies dependencies={pkg.dependencies} />}
            />
            <TooltipContent>Dependencies</TooltipContent>
          </Tooltip>
        )}
        <PackageInfoVersion />
        <Tooltip>
          <TooltipTrigger
            render={
              <PackageInfoCopyButton
                // Revealed on hover for pointer devices; always shown on touch.
                className=" pointer-fine:group-hover/item:opacity-100 pointer-fine:focus-visible:opacity-100 pointer-fine:data-popup-open:opacity-100"
                command={pkg.command}
                onCopy={handleCopy}
                onError={handleCopyError}
              />
            }
          />
          <TooltipContent>Copy command</TooltipContent>
        </Tooltip>
      </PackageInfoActions>
    </PackageInfo>
  )
}

export function PackageInfoExample() {
  return (
    <ItemGroup aria-label="Package changes" className="mx-auto w-full max-w-lg gap-2">
      {packages.map((pkg) => (
        <PackageInfoCard key={pkg.name} pkg={pkg} />
      ))}
    </ItemGroup>
  )
}
