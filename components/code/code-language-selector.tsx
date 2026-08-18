"use client"

import type { ComponentProps, ReactNode } from "react"

import { getIconForLanguageExtension } from "@/icons/icons"
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

function languageFromValue(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value
  }

  if (
    value &&
    typeof value === "object" &&
    "value" in value &&
    typeof value.value === "string"
  ) {
    return value.value
  }
}

function labelFromValue(value: unknown): string | undefined {
  if (
    value &&
    typeof value === "object" &&
    "label" in value &&
    typeof value.label === "string"
  ) {
    return value.label
  }

  return languageFromValue(value)
}

function LanguageIcon({ language }: { language: string }) {
  return (
    <span className="flex size-3.5 shrink-0 items-center justify-center [&_svg]:size-3.5">
      {getIconForLanguageExtension(language)}
    </span>
  )
}

function LanguageValue({ value }: { value: unknown }) {
  const language = languageFromValue(value)
  const label = labelFromValue(value)

  if (!language) {
    return null
  }

  return (
    <span className="flex min-w-0 items-center gap-1.5">
      <LanguageIcon language={language} />
      <span className="truncate">{label}</span>
    </span>
  )
}

function renderLanguageItem(
  item: { value?: string; label?: string } | string
): ReactNode {
  const language = languageFromValue(item)

  if (!language) {
    return null
  }

  return (
    <CodeBlockLanguageSelectorItem key={language} value={item}>
      {labelFromValue(item)}
    </CodeBlockLanguageSelectorItem>
  )
}

export type CodeBlockLanguageSelectorProps = ComponentProps<typeof Combobox>

export const CodeBlockLanguageSelector = ({
  children,
  ...props
}: CodeBlockLanguageSelectorProps) => (
  <Combobox data-slot="code-block-language-selector" {...props}>
    {children ?? (
      <>
        <CodeBlockLanguageSelectorTrigger>
          <CodeBlockLanguageSelectorValue />
        </CodeBlockLanguageSelectorTrigger>
        <CodeBlockLanguageSelectorContent>
          <CodeBlockLanguageSelectorList />
        </CodeBlockLanguageSelectorContent>
      </>
    )}
  </Combobox>
)

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
    {children ?? ((value) => <LanguageValue value={value} />)}
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
      className="h-7! rounded-none! border-x-0 border-t-0  border-input/30 bg-background! shadow-none! *:data-[slot=input-group-addon]:ps-2! ring-0! focus-visible:ring-0!"
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
  children,
  ...props
}: CodeBlockLanguageSelectorListProps) => (
  <ComboboxList
    data-slot="code-block-language-selector-list"
    className={cn(className)}
    {...props}
  >
    {children ?? renderLanguageItem}
  </ComboboxList>
)

export type CodeBlockLanguageSelectorItemProps = ComponentProps<
  typeof ComboboxItem
>

export const CodeBlockLanguageSelectorItem = ({
  className,
  children,
  value,
  ...props
}: CodeBlockLanguageSelectorItemProps) => {
  const language = languageFromValue(value)

  return (
    <ComboboxItem
      data-slot="code-block-language-selector-item"
      className={cn("gap-2 text-xs", className)}
      value={value}
      {...props}
    >
      {language ? <LanguageIcon language={language} /> : null}
      {children}
    </ComboboxItem>
  )
}
