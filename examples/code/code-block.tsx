"use client"

import * as React from "react"
import type { BundledLanguage } from "shiki"

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockDownloadButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/code/code-block"
import { CodeLanguageSelector } from "@/components/code/code-language-selector"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type CodeSample = {
  filename: string
  code: string
}

const codeSamples: Record<string, CodeSample> = {
  typescript: {
    filename: "greet.ts",
    code: `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`,
  },
  python: {
    filename: "greet.py",
    code: `def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("World"))`,
  },
  go: {
    filename: "greet.go",
    code: `package main

import "fmt"

func greet(name string) string {
	return fmt.Sprintf("Hello, %s!", name)
}

func main() {
	fmt.Println(greet("World"))
}`,
  },
  rust: {
    filename: "greet.rs",
    code: `fn greet(name: &str) -> String {
    format!("Hello, {name}!")
}

fn main() {
    println!("{}", greet("World"));
}`,
  },
  bash: {
    filename: "greet.sh",
    code: `greet() {
  echo "Hello, $1!"
}

greet "World"`,
  },
  json: {
    filename: "greet.json",
    code: `{
  "greeting": "Hello",
  "name": "World",
  "message": "Hello, World!"
}`,
  },
}

const languages = Object.keys(codeSamples)

const handleCopy = () => {
  console.log("Copied code to clipboard")
}

const handleCopyError = () => {
  console.error("Failed to copy code to clipboard")
}

export function CodeBlockExample() {
  const [language, setLanguage] = React.useState("typescript")
  const sample = codeSamples[language]

  return (
    <div className="w-full">
      <CodeBlock
        code={sample.code}
        language={language as BundledLanguage}
        showLineNumbers
      >
        <CodeBlockHeader>
          <CodeBlockTitle>
            <CodeLanguageSelector
              className="-ms-2"
              languages={languages}
              value={language}
              onValueChange={(value) => {
                if (value) {
                  setLanguage(value)
                }
              }}
            />
            <CodeBlockFilename>{sample.filename}</CodeBlockFilename>
          </CodeBlockTitle>
          <CodeBlockActions>
            <Tooltip>
              <TooltipTrigger
                render={<CodeBlockDownloadButton filename={sample.filename} />}
              />
              <TooltipContent>Download code</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <CodeBlockCopyButton
                    onCopy={handleCopy}
                    onError={handleCopyError}
                  />
                }
              />
              <TooltipContent>Copy code</TooltipContent>
            </Tooltip>
          </CodeBlockActions>
        </CodeBlockHeader>
      </CodeBlock>
    </div>
  )
}
