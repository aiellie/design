"use client"

import * as React from "react"

import { getIconForLanguageExtension } from "@/icons/icons"
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
import {
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Search01Icon, SourceCodeIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

/**
 * The languages the selector knows out of the box — each one is a fence slug
 * with its own mark in `getIconForLanguageExtension`, so the built-in list
 * never falls back to the generic file icon.
 */
const LANGUAGE_LABELS = {
  typescript: "TypeScript",
  tsx: "TSX",
  js: "JavaScript",
  python: "Python",
  go: "Go",
  rust: "Rust",
  bash: "Bash",
  json: "JSON",
  css: "CSS",
  markdown: "Markdown",
} as const

export interface CodeLanguage {
  /** The fence slug, e.g. `typescript` — what `value` / `onValueChange` speak. */
  value: string
  /** The display name, e.g. `TypeScript` — what the list reads. */
  label: string
}

const LANGUAGES_BY_VALUE = new Map<string, CodeLanguage>(
  Object.entries(LANGUAGE_LABELS).map(([value, label]) => [
    value,
    { value, label },
  ])
)

/** All built-in languages, in display order. */
export const CODE_LANGUAGES: readonly CodeLanguage[] = [
  ...LANGUAGES_BY_VALUE.values(),
]

const DEFAULT_LANGUAGE_VALUES: readonly string[] = CODE_LANGUAGES.map(
  (language) => language.value
)

/** Looks a language up by value, e.g. `getCodeLanguage("typescript")`. */
export function getCodeLanguage(value: string): CodeLanguage | undefined {
  return LANGUAGES_BY_VALUE.get(value)
}

function languageLabel(value: string): string {
  return getCodeLanguage(value)?.label ?? value
}

/**
 * The language's mark, with a generic source-code glyph standing in when
 * there is nothing to show — an empty trigger should still read as a
 * language control.
 */
export function CodeLanguageIcon({
  language,
  className,
}: {
  language?: string
  className?: string
}) {
  return (
    <span
      aria-hidden
      data-slot="code-language-icon"
      className={cn(
        "flex size-4 shrink-0 items-center justify-center [&_svg]:size-4",
        className
      )}
    >
      {language ? (
        getIconForLanguageExtension(language)
      ) : (
        <HugeiconsIcon
          icon={SourceCodeIcon}
          strokeWidth={2}
          className="text-muted-foreground"
        />
      )}
    </span>
  )
}

export interface CodeLanguageSelectorProps {
  /** The selected language's value, e.g. `typescript`. Leave off to uncontrol it. */
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  /**
   * Narrows the list, e.g. to the languages a snippet actually ships in.
   * Values outside the built-in set render with the fallback file icon and
   * their raw value as the label.
   */
  languages?: readonly string[]
  /** Opens the list on first render. */
  defaultOpen?: boolean
  disabled?: boolean
  id?: string
  /** Submitted with the surrounding form. */
  name?: string
  className?: string
}

/**
 * A combobox over code languages — searchable by either the display name or
 * the fence slug, so `java` and `js` both narrow to JavaScript.
 */
export function CodeLanguageSelector({
  value,
  defaultValue,
  onValueChange,
  languages = DEFAULT_LANGUAGE_VALUES,
  defaultOpen,
  disabled = false,
  id,
  name,
  className,
}: CodeLanguageSelectorProps) {
  return (
    <Combobox
      items={languages}
      itemToStringLabel={languageLabel}
      filter={(item: string, query: string) => {
        const q = query.trim().toLowerCase()
        return (
          q.length === 0 ||
          item.toLowerCase().includes(q) ||
          languageLabel(item).toLowerCase().includes(q)
        )
      }}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      defaultOpen={defaultOpen}
      disabled={disabled}
      name={name}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={
              <ComboboxTrigger
                id={id}
                showTrigger={false}
                render={
                  <InputGroupButton
                    variant="ghost"
                    size="icon-xs"
                    disabled={disabled}
                    aria-label="code-language-selector"
                    className={cn(className)}
                  />
                }
              />
            }
          >
            <ComboboxValue>
              {(selected: string | null) => (
                <CodeLanguageIcon language={selected ?? undefined} />
              )}
            </ComboboxValue>
          </TooltipTrigger>
          <TooltipContent>code-language-selector</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <ComboboxContent className="w-48">
        <ComboboxInput
          showClear={true}
          showTrigger={false}
          placeholder="Search languages"
          className="h-8! rounded-none! border-x-0 border-t-0 border-input/30 bg-background shadow-none! *:data-[slot=input-group-addon]:ps-2!"
        >
          <InputGroupAddon align="inline-start">
            <HugeiconsIcon
              className="size-4 text-muted-foreground"
              icon={Search01Icon}
              strokeWidth={2}
            />
          </InputGroupAddon>
        </ComboboxInput>
        <ComboboxEmpty>No languages found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item} className="ps-2">
              <CodeLanguageIcon language={item} />
              <span className="truncate">{languageLabel(item)}</span>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
