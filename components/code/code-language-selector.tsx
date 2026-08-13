"use client"

import type { ComponentProps } from "react"

import { getIconForLanguageExtension } from "@/icons/code-icons"
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

function LanguageIcon({ language }: { language: string }) {
  return (
    <span className="flex size-3.5 shrink-0 items-center justify-center [&_svg]:size-3.5">
      {getIconForLanguageExtension(language)}
    </span>
  )
}

export type CodeBlockLanguageSelectorProps = ComponentProps<typeof Combobox>

export const CodeBlockLanguageSelector = (
  props: CodeBlockLanguageSelectorProps
) => <Combobox data-slot="code-block-language-selector" {...props} />

export type CodeBlockLanguageSelectorTriggerProps = ComponentProps<
  typeof ComboboxTrigger
>

export const CodeBlockLanguageSelectorTrigger = ({
  className,
  children,
  ...props
}: CodeBlockLanguageSelectorTriggerProps) => (
  <ComboboxTrigger
    data-slot="code-block-language-selector-trigger"
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

export type CodeBlockLanguageSelectorValueProps = ComponentProps<
  typeof ComboboxValue
>

export const CodeBlockLanguageSelectorValue = ({
  children,
  ...props
}: CodeBlockLanguageSelectorValueProps) => (
  <ComboboxValue data-slot="code-block-language-selector-value" {...props}>
    {children ??
      ((value) =>
        typeof value === "string" ? (
          <span className="flex min-w-0 items-center gap-1.5">
            <LanguageIcon language={value} />
            <span className="truncate">{value}</span>
          </span>
        ) : null)}
  </ComboboxValue>
)

export type CodeBlockLanguageSelectorContentProps = ComponentProps<
  typeof ComboboxContent
>

export const CodeBlockLanguageSelectorContent = ({
  align = "end",
  className,
  children,
  ...props
}: CodeBlockLanguageSelectorContentProps) => (
  <ComboboxContent
    data-slot="code-block-language-selector-content"
    align={align}
    className={cn("min-w-40", className)}
    {...props}
  >
    <ComboboxInput
      showTrigger={false}
      placeholder="Search language"
      className="h-7! rounded-none! border-x-0 border-t-0  border-input/30 bg-background shadow-none! *:data-[slot=input-group-addon]:ps-2! ring-0! focus-visible:ring-0!"
    />
    <ComboboxEmpty>No language found.</ComboboxEmpty>
    {children}
  </ComboboxContent>
)

export type CodeBlockLanguageSelectorListProps = ComponentProps<
  typeof ComboboxList
>

export const CodeBlockLanguageSelectorList = ({
  className,
  ...props
}: CodeBlockLanguageSelectorListProps) => (
  <ComboboxList
    data-slot="code-block-language-selector-list"
    className={cn(className)}
    {...props}
  />
)

export type CodeBlockLanguageSelectorItemProps = ComponentProps<
  typeof ComboboxItem
>

export const CodeBlockLanguageSelectorItem = ({
  className,
  children,
  value,
  ...props
}: CodeBlockLanguageSelectorItemProps) => (
  <ComboboxItem
    data-slot="code-block-language-selector-item"
    className={cn("gap-2 text-xs", className)}
    value={value}
    {...props}
  >
    {typeof value === "string" ? <LanguageIcon language={value} /> : null}
    {children}
  </ComboboxItem>
)
