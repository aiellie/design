"use client"

import * as React from "react"

import { CodeBlockLanguageIcon } from "@/components/code/code-block"
import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { InputGroupAddon } from "@/components/ui/input-group"
import { Icon, Icons } from "@/icons/icons"

type CodeLanguage = {
  value: string
  label: string
}

const languages: CodeLanguage[] = [
  { value: "typescript", label: "TypeScript" },
  { value: "tsx", label: "TSX" },
  { value: "js", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "bash", label: "Bash" },
  { value: "json", label: "JSON" },
  { value: "css", label: "CSS" },
  { value: "markdown", label: "Markdown" },
]

export function CodeLanguageSelectorExample() {
  const [language, setLanguage] = React.useState<CodeLanguage | null>(
    languages[0]
  )

  return (
    <div className="flex w-full items-center justify-center">
      <FieldGroup className="w-full max-w-sm">
        <Field>
          <FieldLabel htmlFor="code-language-selector">Language</FieldLabel>
          <Combobox
            items={languages}
            value={language}
            onValueChange={setLanguage}
          >
            <ComboboxTrigger
              render={
                <Button
                  id="code-language-selector"
                  variant="outline"
                  className="w-full justify-between font-normal"
                >
                  <span className="flex items-center gap-2">
                    {language && (
                      <CodeBlockLanguageIcon language={language.value} />
                    )}
                    {language ? language.label : "Select language"}
                  </span>
                </Button>
              }
            />
            <ComboboxContent>
              <ComboboxInput
                showClear={true}
                showTrigger={false}
                placeholder="Search"
              >
                <InputGroupAddon>
                  <Icon
                    icon={Icons.search}
                    strokeWidth={2}
                    className="size-3.5"
                  />
                </InputGroupAddon>
              </ComboboxInput>
              <ComboboxEmpty>No languages found.</ComboboxEmpty>
              <ComboboxList>
                {(item: CodeLanguage) => (
                  <ComboboxItem key={item.value} value={item}>
                    <CodeBlockLanguageIcon language={item.value} />
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <FieldDescription>
            Search and select a code language.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  )
}
