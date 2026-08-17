// Progress preview — repo showcase from examples/ui/progress.tsx, plus an
// explicit value sweep and a file-upload row so every track visibly paints.
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"

export { ProgressExample as Showcase } from "@/examples/ui/progress"

export function Values() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Progress value={25}>
        <ProgressLabel>Importing tokens</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={60}>
        <ProgressLabel>Building previews</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={100}>
        <ProgressLabel>Publish complete</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  )
}

export function UploadRow() {
  return (
    <div className="w-full max-w-sm rounded-lg border p-3">
      <Progress value={66} className="gap-2">
        <ProgressLabel>design-tokens.zip</ProgressLabel>
        <span className="ml-auto text-sm text-muted-foreground tabular-nums">
          29.8 MB of 45.2 MB
        </span>
      </Progress>
    </div>
  )
}
