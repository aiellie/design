// CodeLanguageSelector preview — grid card, so the closed value states are
// the graded look: the repo example field (Showcase) and the selector in its
// natural home, a CodeBlock header (HeaderSelector). OpenList renders the
// popup open inside its own cell (per-story captures are isolated renders).
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/code/code-block"
import { CodeLanguageSelector } from "@/components/code/code-language-selector"

export { CodeLanguageSelectorExample as Showcase } from "@/examples/code/code-language-selector"

const languages = ["typescript", "tsx", "js", "json", "css", "bash"]

const snippet = `export const theme = {
  primary: "violet",
  radius: "0.625rem",
}`

export function HeaderSelector() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full" style={{ maxWidth: 480 }}>
        <CodeBlock code={snippet} language="ts">
          <CodeBlockHeader>
            <CodeBlockTitle>
              <CodeBlockFilename>theme.ts</CodeBlockFilename>
            </CodeBlockTitle>
            <CodeBlockActions>
              <CodeLanguageSelector
                languages={languages}
                defaultValue="typescript"
              />
              <CodeBlockCopyButton aria-label="Copy code" />
            </CodeBlockActions>
          </CodeBlockHeader>
        </CodeBlock>
      </div>
    </div>
  )
}

export function OpenList() {
  return (
    <div
      className="flex w-full justify-center"
      style={{ minHeight: 280, paddingTop: 8 }}
    >
      <CodeLanguageSelector
        languages={languages}
        defaultValue="tsx"
        defaultOpen
      />
    </div>
  )
}
