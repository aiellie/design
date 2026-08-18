"use client"

import { CodeBlockLanguageSelector } from "@/components/code/code-language-selector"

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
  return (
    <div className="flex w-full items-center justify-center">
      <CodeBlockLanguageSelector
        defaultValue={languages[0]}
        items={languages}
      />
    </div>
  )
}
