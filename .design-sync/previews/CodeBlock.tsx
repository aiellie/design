// CodeBlock preview — the repo example (typescript + header actions) plus a
// tsx component with line numbers, a bash install block, and a json config.
// All languages are inside the curated shiki shim set (ts/tsx/bash/json).
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockLanguageIcon,
  CodeBlockTitle,
} from "@/components/code/code-block"

export { CodeBlockExample as Showcase } from "@/examples/code/code-block"

const componentCode = `import { Button } from "@/components/ui/button"

export function SaveButton() {
  return (
    <Button size="sm" variant="default">
      Save changes
    </Button>
  )
}`

export function ComponentSource() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full" style={{ maxWidth: 560 }}>
        <CodeBlock code={componentCode} language="tsx" showLineNumbers>
          <CodeBlockHeader>
            <CodeBlockTitle>
              <CodeBlockLanguageIcon language="tsx" />
              <CodeBlockFilename>save-button.tsx</CodeBlockFilename>
            </CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton aria-label="Copy code" />
            </CodeBlockActions>
          </CodeBlockHeader>
        </CodeBlock>
      </div>
    </div>
  )
}

const installCode = `pnpm add @base-ui/react @hugeicons/react
pnpm dlx shadcn@latest add button select
pnpm dev`

export function Terminal() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full" style={{ maxWidth: 560 }}>
        <CodeBlock code={installCode} language="bash">
          <CodeBlockHeader>
            <CodeBlockTitle>
              <CodeBlockLanguageIcon language="bash" />
              <CodeBlockFilename>Terminal</CodeBlockFilename>
            </CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton aria-label="Copy command" />
            </CodeBlockActions>
          </CodeBlockHeader>
        </CodeBlock>
      </div>
    </div>
  )
}

const configCode = `{
  "style": "ellie",
  "rsc": true,
  "tailwind": {
    "css": "styles/globals.css",
    "baseColor": "violet",
    "cssVariables": true
  }
}`

export function ConfigFile() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full" style={{ maxWidth: 560 }}>
        <CodeBlock code={configCode} language="json" showLineNumbers>
          <CodeBlockHeader>
            <CodeBlockTitle>
              <CodeBlockLanguageIcon language="json" />
              <CodeBlockFilename>components.json</CodeBlockFilename>
            </CodeBlockTitle>
          </CodeBlockHeader>
        </CodeBlock>
      </div>
    </div>
  )
}
