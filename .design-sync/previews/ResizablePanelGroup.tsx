// ResizablePanelGroup preview — canonical nested sidebar/editor/console split
// from examples/ui/resizable.tsx, plus a simple vertical split with the grip.
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export { ResizableExample as Showcase } from "@/examples/ui/resizable"

export function VerticalSplit() {
  // react-resizable-panels sets inline height:100% on the Group element, so
  // the fixed height must live on the wrapper, not the group's className.
  return (
    <div className="mx-auto h-[200px] w-full max-w-sm">
      <ResizablePanelGroup
        orientation="vertical"
        className="rounded-lg border"
      >
        <ResizablePanel defaultSize="65%">
          <div className="flex h-full items-center justify-center p-6">
            <span className="text-sm font-semibold">Preview</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="35%">
          <div className="flex h-full items-center justify-center p-6">
            <span className="text-sm font-semibold">Terminal</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
