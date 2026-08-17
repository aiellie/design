"use client"

import * as React from "react"

import {
  LanguageSelector,
  type Language,
} from "@/components/locale/language-selector"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

export function LanguageSelectorExample() {
  const [language, setLanguage] = React.useState<Language>("en")

  return (
    <div className="flex w-full items-center justify-center">
      <FieldGroup className="w-full max-w-sm">
        <Field>
          {/* No htmlFor: the selector renders its own trigger and takes no id. */}
          <FieldLabel>Language</FieldLabel>
          <LanguageSelector value={language} onValueChange={setLanguage} />
          <FieldDescription>
            The trigger and list stay LTR at every language so the control
            never jumps as the page direction flips. Pair it with{" "}
            <code className="font-mono text-xs">useTranslation</code> to drive
            copy and direction — see the Direction example.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  )
}
