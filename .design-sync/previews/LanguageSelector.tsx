// LanguageSelector preview — no repo example; the source exports a
// controlled Select over three languages plus optional context helpers
// (useTranslation falls back to local state, so no provider is required
// for the standalone selector). Showcase keeps live state so the card
// stays interactive; Values pins each language's selected label.
import * as React from "react"

import {
  LanguageSelector,
  languageOptions,
  type Language,
} from "@/components/locale/language-selector"
import { Label } from "@/components/ui/label"

export function Showcase() {
  const [language, setLanguage] = React.useState<Language>("en")

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label>Interface language</Label>
      <LanguageSelector value={language} onValueChange={setLanguage} />
      <p className="text-sm text-muted-foreground">
        {languageOptions.length} languages — RTL scripts flip the layout via
        DirectionProvider.
      </p>
    </div>
  )
}

export function Values() {
  return (
    <div className="flex flex-col items-start gap-3">
      {languageOptions.map((option) => (
        <LanguageSelector
          key={option.value}
          value={option.value}
          onValueChange={() => {}}
        />
      ))}
    </div>
  )
}
