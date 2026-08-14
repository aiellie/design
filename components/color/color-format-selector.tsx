"use client"

import type { ComponentProps } from "react"

import { getIconForColorFormat } from "@/icons/color-icons"
import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
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

export type ColorFormatSelectorProps = ComponentProps<typeof Combobox>

export const ColorFormatSelector = (props: ColorFormatSelectorProps) => (
  <Combobox data-slot="color-format-selector" {...props} />
)

export type ColorFormatSelectorTriggerProps = ComponentProps<
  typeof ComboboxTrigger
>

export const ColorFormatSelectorTrigger = ({
  className,
  children,
  ...props
}: ColorFormatSelectorTriggerProps) => (
  <ComboboxTrigger
    data-slot="color-format-selector-trigger"
    render={
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-7 gap-1.5 border-none bg-transparent px-2 font-normal text-xs shadow-none",
          className
        )}
      />
    }
    {...props}
  >
    {children}
  </ComboboxTrigger>
)

export type ColorFormatSelectorValueProps = ComponentProps<typeof ComboboxValue>

export const ColorFormatSelectorValue = ({
  children,
  ...props
}: ColorFormatSelectorValueProps) => (
  <ComboboxValue data-slot="color-format-selector-value" {...props}>
    {children ??
      ((value) =>
        typeof value === "string" ? (
          <span className="flex min-w-0 items-center gap-1.5">
            <ColorFormatIcon format={value} />
            <span className="truncate">{value}</span>
          </span>
        ) : null)}
  </ComboboxValue>
)

export type ColorFormatSelectorContentProps = ComponentProps<
  typeof ComboboxContent
>

export const ColorFormatSelectorContent = ({
  align = "end",
  className,
  children,
  ...props
}: ColorFormatSelectorContentProps) => (
  <ComboboxContent
    data-slot="color-format-selector-content"
    align={align}
    className={cn("min-w-40", className)}
    {...props}
  >
    <ComboboxInput
      showTrigger={false}
      placeholder="Search format"
      className="h-7! rounded-none! border-x-0 border-t-0  border-input/30 bg-background shadow-none! *:data-[slot=input-group-addon]:ps-2! ring-0! focus-visible:ring-0!"
    />
    <ComboboxEmpty>No format found.</ComboboxEmpty>
    {children}
  </ComboboxContent>
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
  children,
  value,
  ...props
}: ColorFormatSelectorItemProps) => (
  <ComboboxItem
    data-slot="color-format-selector-item"
    className={cn("gap-2 text-xs", className)}
    value={value}
    {...props}
  >
    {typeof value === "string" ? <ColorFormatIcon format={value} /> : null}
    {children}
  </ComboboxItem>
)
