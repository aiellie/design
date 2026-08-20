"use client"

import type * as React from "react"
import type { ComponentProps } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { type IconData } from "@/icons/icons"
import {
  PlusSignIcon,
  Search01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

/** Hugeicons glyph, or one of the colored brand SVGs from `BrandIcons`. */
export type AddMenuIconSource =
  | IconData
  | React.ComponentType<React.HTMLAttributes<SVGElement>>

export type AddMenuIconProps = {
  icon: AddMenuIconSource
  className?: string
}

export const AddMenuIcon = ({ icon, className }: AddMenuIconProps) => {
  if (typeof icon === "function") {
    const Brand = icon
    return <Brand className={cn("size-3.5", className)} />
  }
  return <HugeiconsIcon icon={icon} className={cn("size-3.5", className)} />
}

export type AddMenuProps = ComponentProps<typeof DropdownMenu>

export const AddMenu = (props: AddMenuProps) => <DropdownMenu {...props} />

export type AddMenuTriggerProps = ComponentProps<typeof DropdownMenuTrigger>

export const AddMenuTrigger = ({
  children,
  ...props
}: AddMenuTriggerProps) => (
  <DropdownMenuTrigger
    render={
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full"
        aria-label="Add"
      >
        {children ?? <HugeiconsIcon icon={PlusSignIcon} />}
      </Button>
    }
    {...props}
  />
)

export type AddMenuContentProps = ComponentProps<typeof DropdownMenuContent>

export const AddMenuContent = ({
  className,
  ...props
}: AddMenuContentProps) => (
  <DropdownMenuContent className={cn("w-52", className)} {...props} />
)

export type AddMenuGroupProps = ComponentProps<typeof DropdownMenuGroup>

export const AddMenuGroup = (props: AddMenuGroupProps) => (
  <DropdownMenuGroup {...props} />
)

export type AddMenuLabelProps = ComponentProps<typeof DropdownMenuLabel>

export const AddMenuLabel = (props: AddMenuLabelProps) => (
  <DropdownMenuLabel {...props} />
)

export type AddMenuItemProps = ComponentProps<typeof DropdownMenuItem>

export const AddMenuItem = (props: AddMenuItemProps) => (
  <DropdownMenuItem {...props} />
)

export type AddMenuSeparatorProps = ComponentProps<typeof DropdownMenuSeparator>

export const AddMenuSeparator = (props: AddMenuSeparatorProps) => (
  <DropdownMenuSeparator {...props} />
)

export type AddMenuSubProps = ComponentProps<typeof DropdownMenuSub>

export const AddMenuSub = (props: AddMenuSubProps) => (
  <DropdownMenuSub {...props} />
)

export type AddMenuSubTriggerProps = ComponentProps<
  typeof DropdownMenuSubTrigger
>

export const AddMenuSubTrigger = (props: AddMenuSubTriggerProps) => (
  <DropdownMenuSubTrigger {...props} />
)

export type AddMenuSubContentProps = ComponentProps<
  typeof DropdownMenuSubContent
>

export const AddMenuSubContent = ({
  className,
  ...props
}: AddMenuSubContentProps) => (
  <DropdownMenuSubContent className={cn("w-44", className)} {...props} />
)

export type AddMenuExtensionItem = {
  name: string
  icon: AddMenuIconSource
  onSelect?: () => void
}

/**
 * Submenu whose list ends with Manage / Browse actions — the shared shape for
 * Skills, Connectors, and Plugins.
 */
export type AddMenuExtensionProps = {
  label: string
  icon: IconData
  items: AddMenuExtensionItem[]
  onManage?: () => void
  onBrowse?: () => void
}

export const AddMenuExtension = ({
  label,
  icon,
  items,
  onManage,
  onBrowse,
}: AddMenuExtensionProps) => (
  <AddMenuSub>
    <AddMenuSubTrigger>
      <AddMenuIcon icon={icon} />
      {label}
    </AddMenuSubTrigger>
    <AddMenuSubContent>
      <AddMenuGroup>
        <AddMenuLabel>{label}</AddMenuLabel>
        {items.map((item) => (
          <AddMenuItem key={item.name} onClick={item.onSelect}>
            <AddMenuIcon icon={item.icon} />
            {item.name}
          </AddMenuItem>
        ))}
      </AddMenuGroup>
      <AddMenuSeparator />
      <AddMenuItem onClick={onManage}>
        <AddMenuIcon icon={Settings01Icon} />
        Manage {label.toLowerCase()}
      </AddMenuItem>
      <AddMenuItem onClick={onBrowse}>
        <AddMenuIcon icon={Search01Icon} />
        Browse {label.toLowerCase()}
      </AddMenuItem>
    </AddMenuSubContent>
  </AddMenuSub>
)
