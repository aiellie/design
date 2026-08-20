"use client"

import {
  SecurityWarningIcon,
  WebProtectionIcon,
  HandIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export type ApprovalMode = "ask" | "auto" | "full"

export const APPROVAL_MODES = [
  {
    value: "ask",
    label: "Ask for approval",
    description: "Always ask to edit external files and use the internet",
    icon: HandIcon,
  },
  {
    value: "auto",
    label: "Approve for me",
    description: "Only ask for actions detected as potentially unsafe",
    icon: WebProtectionIcon,
  },
  {
    value: "full",
    label: "Full access",
    description: "Unrestricted access web and file access",
    icon: SecurityWarningIcon,
    destructive: true,
  },
] satisfies {
  value: ApprovalMode
  label: string
  description: string
  icon: IconSvgElement
  destructive?: boolean
}[]

export function ApprovalMenu({
  value,
  onValueChange,
  className,
}: {
  value: ApprovalMode
  onValueChange: (value: ApprovalMode) => void
  className?: string
}) {
  const active = APPROVAL_MODES.find((mode) => mode.value === value)

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className={cn(
                    "rounded-full text-muted-foreground",
                    active?.destructive && "text-destructive",
                    className
                  )}
                  aria-label="Change permissions"
                />
              }
            />
          }
        >
          <HugeiconsIcon icon={active?.icon ?? HandIcon} strokeWidth={1.5} />
        </TooltipTrigger>
        <TooltipContent side="top">Change permissions</TooltipContent>
      </Tooltip>
      <DropdownMenuContent
        side="top"
        align="start"
        sideOffset={8}
        className="w-[min(26rem,calc(100vw-2rem))]"
      >
        <div className="flex items-center gap-2 px-1.5 py-1">
          <span className="text-xs text-muted-foreground">
            How should agent actions be approved?
          </span>
          <a
            href="#"
            className="ms-auto text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Learn more
          </a>
        </div>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(next) => onValueChange(next as ApprovalMode)}
        >
          {APPROVAL_MODES.map((mode) => (
            <DropdownMenuRadioItem
              key={mode.value}
              value={mode.value}
              className={cn(
                "items-start gap-2.5 py-1.5",
                mode.destructive && "text-destructive! **:text-destructive!"
              )}
            >
              <HugeiconsIcon
                icon={mode.icon}
                strokeWidth={1.5}
                className="mt-0.5 size-4"
              />
              <div className="grid gap-0.5">
                <span className="font-normal">{mode.label}</span>
                <span
                  className={cn(
                    "text-xs text-muted-foreground",
                    mode.destructive && "text-destructive/80!"
                  )}
                >
                  {mode.description}
                </span>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
