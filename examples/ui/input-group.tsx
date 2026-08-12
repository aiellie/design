"use client"

import * as React from "react"
import {
  BookOpen01Icon,
  ChevronDownIcon,
  Copy01Icon,
  CornerDownLeftIcon,
  FolderOpenIcon,
  GitCommitIcon,
  Info,
  JavaScriptIcon,
  MoreHorizontalIcon,
  News01Icon,
  Refresh,
  Search01Icon,
  Settings01Icon,
  Star,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Spinner } from "@/components/ui/spinner"
import { Toaster, toast } from "@/components/ui/toast"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

/**
 * Addon-sized sibling of the button example's IconButton: the label doubles
 * as the accessible name and the tooltip — `tooltip` only exists for the one
 * case that wants to say something else.
 */
function IconButton({
  icon,
  label,
  tooltip,
  variant = "ghost",
  className,
  strokeWidth = 2,
  onClick,
}: {
  icon: typeof Search01Icon
  label: string
  tooltip?: React.ReactNode
  variant?: React.ComponentProps<typeof InputGroupButton>["variant"]
  className?: string
  strokeWidth?: number
  onClick?: React.ComponentProps<typeof InputGroupButton>["onClick"]
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <InputGroupButton
            variant={variant}
            size="icon-xs"
            aria-label={label}
            className={cn("", className)}
            onClick={onClick}
          >
            <HugeiconsIcon icon={icon} strokeWidth={strokeWidth} />
          </InputGroupButton>
        }
      />
      <TooltipContent>{tooltip ?? label}</TooltipContent>
    </Tooltip>
  )
}

function CopyIconButton({ label = "Copy" }: { label?: string }) {
  const [copied, setCopied] = React.useState(false)

  return (
    <IconButton
      icon={copied ? Tick02Icon : Copy01Icon}
      label={copied ? "Copied" : label}
      onClick={() => {
        setCopied(true)
        toast.add({
          type: "success",
          title: "Copied to clipboard",
        })
        window.setTimeout(() => setCopied(false), 2000)
      }}
    />
  )
}

function FavoriteIconButton() {
  const [isFavorite, setIsFavorite] = React.useState(false)
  const label = isFavorite ? "Remove from favorites" : "Add to favorites"

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <InputGroupButton
            size="icon-xs"
            aria-label={label}
            aria-pressed={isFavorite}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <HugeiconsIcon
              icon={Star}
              strokeWidth={2}
              data-favorite={isFavorite}
              className="data-[favorite=true]:fill-amber-400 data-[favorite=true]:text-amber-500"
            />
          </InputGroupButton>
        }
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export function InputGroupExample() {
  return (
    <div className="flex w-full items-center justify-center">
      <FieldGroup className="w-full max-w-md">
        <Field>
          <FieldLabel htmlFor="input-group-search">Search</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-group-search" placeholder="Search..." />
            <InputGroupAddon>
              <HugeiconsIcon
                icon={Search01Icon}
                strokeWidth={2}
                className="size-3.5 text-muted-foreground"
              />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Kbd>⌘K</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput placeholder="Enter search query" />
            <InputGroupAddon align="inline-end">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <InputGroupButton variant="ghost" className="pr-1.5! text-xs">
                      Search In...{" "}
                      <HugeiconsIcon
                        icon={ChevronDownIcon}
                        strokeWidth={2}
                        className="size-3"
                      />
                    </InputGroupButton>
                  }
                />
                <DropdownMenuContent align="end" sideOffset={8} alignOffset={-4}>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <HugeiconsIcon
                        icon={BookOpen01Icon}
                        strokeWidth={2}
                        className="size-3.5 text-muted-foreground"
                      />
                      Docs
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HugeiconsIcon
                        icon={News01Icon}
                        strokeWidth={2}
                        className="size-3.5 text-muted-foreground"
                      />
                      Blog Posts
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HugeiconsIcon
                        icon={GitCommitIcon}
                        strokeWidth={2}
                        className="size-3.5 text-muted-foreground"
                      />
                      Changelog
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput placeholder="Searching..." />
            <InputGroupAddon align="inline-end">
              <Spinner />
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput placeholder="Type to search..." />
            <InputGroupAddon align="inline-end">
              <InputGroupButton variant="secondary">Search</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-group-file">File name</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="input-group-file"
              placeholder="Enter file name"
            />
            <InputGroupAddon align="inline-end">
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <DropdownMenuTrigger
                        render={
                          <InputGroupButton
                            variant="ghost"
                            aria-label="More actions"
                            size="icon-xs"
                          >
                            <HugeiconsIcon
                              icon={MoreHorizontalIcon}
                              strokeWidth={2}
                            />
                          </InputGroupButton>
                        }
                      />
                    }
                  />
                  <TooltipContent>More actions</TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end" sideOffset={8} alignOffset={-4}>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <HugeiconsIcon
                        icon={Settings01Icon}
                        strokeWidth={2}
                        className="size-3.5 text-muted-foreground"
                      />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HugeiconsIcon
                        icon={Copy01Icon}
                        strokeWidth={2}
                        className="size-3.5 text-muted-foreground"
                      />
                      Copy path
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HugeiconsIcon
                        icon={FolderOpenIcon}
                        strokeWidth={2}
                        className="size-3.5 text-muted-foreground"
                      />
                      Open location
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-group-url">Site URL</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText className="font-normal">https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput id="input-group-url" defaultValue="ellie.dev" />
            <InputGroupAddon align="inline-end">
              <CopyIconButton label="Copy URL" />
            </InputGroupAddon>
          </InputGroup>
          <InputGroup className="[--radius:9999px]">
            <InputGroupAddon>
              <Popover>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <PopoverTrigger
                        render={
                          <InputGroupButton
                            variant="ghost"
                            size="icon-xs"
                            aria-label="Site information"
                          >
                            <HugeiconsIcon icon={Info} strokeWidth={2} />
                          </InputGroupButton>
                        }
                      />
                    }
                  />
                  <TooltipContent>Site information</TooltipContent>
                </Tooltip>
                <PopoverContent
                  align="start"
                  className="flex flex-col gap-1 rounded-xl text-sm"
                >
                  <p className="font-medium">Your connection is secure.</p>
                  <p>
                    Certificate is valid. Nothing on this page leaves your
                    browser.
                  </p>
                </PopoverContent>
              </Popover>
            </InputGroupAddon>
            <InputGroupAddon className="pl-1.5 text-muted-foreground font-normal">
              https://
            </InputGroupAddon>
            <InputGroupInput id="input-group-site" defaultValue="ellie.dev" />
            <InputGroupAddon align="inline-end">
              <FavoriteIconButton />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-group-code">Code editor</FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="input-group-code"
              placeholder="console.log('Hello, world!');"
              className="min-h-[200px]"
            />
            <InputGroupAddon align="block-end" className="border-t">
              <InputGroupText>Line 1, Column 1</InputGroupText>
              <IconButton
                icon={CornerDownLeftIcon}
                label="Run"
                tooltip={
                  <>
                    Run <Kbd>⏎</Kbd>
                  </>
                }
                variant="secondary"
                className="ml-auto rounded-full"
              />
            </InputGroupAddon>
            <InputGroupAddon align="block-start" className="border-b">
              <InputGroupText className="font-mono font-normal text-xs">
                <HugeiconsIcon icon={JavaScriptIcon} strokeWidth={2} className="size-3.5" />
                script.js
              </InputGroupText>
              <div className="ml-auto flex items-center">
                <IconButton icon={Refresh} label="Refresh" />
                <CopyIconButton label="Copy code" />
              </div>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>
      <Toaster />
    </div>
  )
}
