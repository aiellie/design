"use client"

import * as React from "react"

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteTrigger,
  AutocompleteValue,
} from "@/components/ellieui/autocomplete"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const

export function AutocompleteExample() {
  const [language, setLanguage] = React.useState<string>()

  return (
    <div className="flex w-full items-center justify-center">
      <FieldGroup className="w-full max-w-sm">
        <Field>
          <FieldLabel htmlFor="autocomplete-language">Language</FieldLabel>
          <Autocomplete value={language} onValueChange={setLanguage}>
            <AutocompleteTrigger id="autocomplete-language" className="w-full">
              <AutocompleteValue placeholder="Select language" />
            </AutocompleteTrigger>
            <AutocompleteContent>
              <AutocompleteInput placeholder="Search language..." />
              <AutocompleteList>
                <AutocompleteEmpty>No language found.</AutocompleteEmpty>
                <AutocompleteGroup>
                  {languages.map((item) => (
                    <AutocompleteItem key={item.value} value={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  ))}
                </AutocompleteGroup>
              </AutocompleteList>
            </AutocompleteContent>
          </Autocomplete>
          <FieldDescription>
            This is the language that will be used in the dashboard.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  )
}
