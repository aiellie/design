// Alert preview — repo showcase from examples/ui/alert.tsx, plus the cva
// variant pair and a corner-action composition.
import {
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  Megaphone01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export { AlertExample as Showcase } from "@/examples/ui/alert"

export function Variants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Alert>
        <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
        <AlertTitle>Workspace synced</AlertTitle>
        <AlertDescription>
          All 70 components are up to date with the main branch.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
        <AlertTitle>Build failed</AlertTitle>
        <AlertDescription>
          themes.css has an unresolved import. Check the build log for the
          failing line.
        </AlertDescription>
      </Alert>
    </div>
  )
}

export function WithAction() {
  return (
    <Alert className="max-w-md">
      <HugeiconsIcon icon={Megaphone01Icon} strokeWidth={2} />
      <AlertTitle>New version available</AlertTitle>
      <AlertDescription>
        v2.4 adds the color picker and format selector.
      </AlertDescription>
      <AlertAction>
        <Button variant="outline" size="xs">
          Update
        </Button>
      </AlertAction>
    </Alert>
  )
}
