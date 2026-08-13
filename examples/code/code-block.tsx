"use client"

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockDownloadButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockLanguageIcon,
  CodeBlockTitle,
} from "@/components/code/code-block"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const code = `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`

const filename = "greet.ts"

const handleCopy = () => {
  console.log("Copied code to clipboard")
}

const handleCopyError = () => {
  console.error("Failed to copy code to clipboard")
}

export function CodeBlockExample() {
  return (
    <div className="w-full">
      <CodeBlock code={code} language="typescript" showLineNumbers>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <CodeBlockLanguageIcon language="typescript" />
            <CodeBlockFilename>{filename}</CodeBlockFilename>
          </CodeBlockTitle>
          <CodeBlockActions>
            <Tooltip>
              <TooltipTrigger
                render={<CodeBlockDownloadButton filename={filename} />}
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
