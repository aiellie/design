"use client"

import type { ComponentProps } from "react"

import { Combobox as ComboboxPrimitive } from "@base-ui/react"

import { getIconForColorFormat } from "@/icons/color-icons"
import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox"
import { cn } from "@/lib/utils"

export function ColorFormatIcon({ format }: { format: string }) {
  return (
    <span className="flex size-3.5 shrink-0 items-center justify-center [&_svg]:size-3.5">
      {getIconForColorFormat(format)}
    </span>
  )
}

export type ColorFormatSelectorProps<
  Value = string,
  Multiple extends boolean | undefined = false,
> = ComboboxPrimitive.Root.Props<Value, Multiple>

export const ColorFormatSelector = <
  Value,
  Multiple extends boolean | undefined = false,
>(
  props: ColorFormatSelectorProps<Value, Multiple>
) => <Combobox data-slot="color-format-selector" {...props} />

export type ColorFormatSelectorTriggerProps = ComponentProps<
  typeof ComboboxTrigger
>

export const ColorFormatSelectorTrigger = ({
  className,
  ...props
}: ColorFormatSelectorTriggerProps) => (
  <ComboboxTrigger
    data-slot="color-format-selector-trigger"
    className={cn(className)}
    {...props}
  />
)

export type ColorFormatSelectorValueProps = ComponentProps<typeof ComboboxValue>

export const ColorFormatSelectorValue = (
  props: ColorFormatSelectorValueProps
) => <ComboboxValue data-slot="color-format-selector-value" {...props} />

export type ColorFormatSelectorContentProps = ComponentProps<
  typeof ComboboxContent
>

export const ColorFormatSelectorContent = ({
  className,
  ...props
}: ColorFormatSelectorContentProps) => (
  <ComboboxContent
    data-slot="color-format-selector-content"
    className={cn("min-w-40", className)}
    {...props}
  />
)

export type ColorFormatSelectorListProps = ComponentProps<typeof ComboboxList>

export const ColorFormatSelectorList = ({
  className,
  ...props
}: ColorFormatSelectorListProps) => (
  <ComboboxList
    data-slot="color-format-selector-list"
    className={cn(className)}
    {...props}
  />
)

export type ColorFormatSelectorItemProps = ComponentProps<typeof ComboboxItem>

export const ColorFormatSelectorItem = ({
  className,
  ...props
}: ColorFormatSelectorItemProps) => (
  <ComboboxItem
    data-slot="color-format-selector-item"
    className={cn(className)}
    {...props}
  />
)
