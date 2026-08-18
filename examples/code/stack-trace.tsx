"use client"

import {
  StackTrace,
  StackTraceActions,
  StackTraceContent,
  StackTraceCopyButton,
  StackTraceError,
  StackTraceErrorMessage,
  StackTraceErrorType,
  StackTraceExpandButton,
  StackTraceFrames,
  StackTraceHeader,
} from "@/components/code/stack-trace"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const trace = `TypeError: Cannot read properties of undefined (reading 'map')
    at PackageInfoDependencies (components/code/package-info.tsx:249:27)
    at PackageInfoExample (app/demo/[name]/code/package-info.tsx:88:15)
    at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
    at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
    at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)`

const handleCopy = () => {
  console.log("Copied stack trace to clipboard")
}

const handleCopyError = () => {
  console.error("Failed to copy stack trace to clipboard")
}

const handleFilePathClick = (
  filePath: string,
  line?: number,
  column?: number
) => {
  console.log(`Open ${filePath}:${line ?? 0}:${column ?? 0}`)
}

export function StackTraceExample() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-md">
        <StackTrace
          defaultOpen
          onFilePathClick={handleFilePathClick}
          trace={trace}
        >
          <StackTraceHeader>
            <StackTraceError>
              <StackTraceErrorType />
              <StackTraceErrorMessage />
            </StackTraceError>
            <StackTraceActions>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <StackTraceCopyButton
                      onCopy={handleCopy}
                      onError={handleCopyError}
                    />
                  }
                />
                <TooltipContent>Copy stack trace</TooltipContent>
              </Tooltip>
              <StackTraceExpandButton />
            </StackTraceActions>
          </StackTraceHeader>
          <StackTraceContent>
            <StackTraceFrames />
          </StackTraceContent>
        </StackTrace>
      </div>
    </div>
  )
}
