import {
  Alert02Icon,
  CheckmarkBadge02Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Loading03Icon,
  RecordIcon,
  TradeMarkIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Status, StatusIndicator, StatusLabel } from "@/components/ellieui/status"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function StatusExample() {
  return (
    <div className="space-y-4 mx-auto w-full max-w-lg">
      <StatusVariants />
      <StatusPulse />
      <StatusIcon />
      <StatusIndicatorOnly />
      <StatusCustomColors />
    </div>
  )
}

function StatusVariants({ className }: { className?: string }) {
  return (
    <div className="space-y-4 mx-auto w-full max-w-lg">
      <div className="flex flex-wrap gap-2">
        <Status variant="success">
          <StatusIndicator />
          <StatusLabel>Success</StatusLabel>
        </Status>
        <Status variant="error">
          <StatusIndicator />
          <StatusLabel>Error</StatusLabel>
        </Status>
        <Status variant="pending">
          <StatusIndicator />
          <StatusLabel>Pending</StatusLabel>
        </Status>
        <Status variant="loading">
          <StatusIndicator />
          <StatusLabel>Loading</StatusLabel>
        </Status>
        <Status variant="recording">
          <StatusIndicator />
          <StatusLabel>Recording</StatusLabel>
        </Status>
        <Status variant="cancelled">
          <StatusIndicator />
          <StatusLabel>Cancelled</StatusLabel>
        </Status>
        <Status variant="verified">
          <StatusIndicator />
          <StatusLabel>Verified</StatusLabel>
        </Status>
        <Status variant="brand">
          <StatusIndicator />
          <StatusLabel>Brand</StatusLabel>
        </Status>
      </div>
    </div>
  )
}

function StatusPulse({ className }: { className?: string }) {
  return (
    <div className="space-y-4 mx-auto w-full max-w-lg">
      <div className="flex flex-wrap gap-2">
        <Status variant="loading" pulse>
          <StatusIndicator />
          <StatusLabel>Loading</StatusLabel>
        </Status>
        <Status variant="recording" pulse>
          <StatusIndicator />
          <StatusLabel>Recording</StatusLabel>
        </Status>
        <Status variant="pending" pulse>
          <StatusIndicator />
          <StatusLabel>Pending</StatusLabel>
        </Status>
      </div>
    </div>
  )
}

function StatusIcon({ className }: { className?: string }) {
  return (
    <div className="space-y-4 mx-auto w-full max-w-lg">
      <div className="flex flex-wrap gap-2">
        <Status variant="success">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} />
          <StatusLabel>Success</StatusLabel>
        </Status>
        <Status variant="error">
          <HugeiconsIcon icon={Alert02Icon} />
          <StatusLabel>Error</StatusLabel>
        </Status>
        <Status variant="pending">
          <HugeiconsIcon icon={Clock01Icon} />
          <StatusLabel>Pending</StatusLabel>
        </Status>
        <Status variant="loading">
          <HugeiconsIcon icon={Loading03Icon} className="animate-spin" />
          <StatusLabel>Loading</StatusLabel>
        </Status>
        <Status variant="recording" pulse>
          <HugeiconsIcon icon={RecordIcon} />
          <StatusLabel>Recording</StatusLabel>
        </Status>
        <Status variant="verified">
          <HugeiconsIcon icon={CheckmarkBadge02Icon} />
          <StatusLabel>Verified</StatusLabel>
        </Status>
        <Status variant="brand">
          <HugeiconsIcon icon={TradeMarkIcon} />
          <StatusLabel>Brand</StatusLabel>
        </Status>
      </div>
    </div>
  )
}

function StatusIndicatorOnly({ className }: { className?: string }) {
  return (
    <div className="space-y-4 mx-auto w-full max-w-lg">
      <div className="flex flex-wrap items-center gap-4">
        <Tooltip>
          <TooltipTrigger
            render={
              <Status
                variant="success"
                className="border-transparent bg-transparent px-0"
              />
            }
          >
            <StatusIndicator />
          </TooltipTrigger>
          <TooltipContent>Success</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Status
                variant="error"
                className="border-transparent bg-transparent px-0"
              />
            }
          >
            <StatusIndicator />
          </TooltipTrigger>
          <TooltipContent>Error</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Status
                variant="pending"
                pulse
                className="border-transparent bg-transparent px-0"
              />
            }
          >
            <StatusIndicator />
          </TooltipTrigger>
          <TooltipContent>Pending</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Status
                variant="loading"
                pulse
                className="border-transparent bg-transparent px-0"
              />
            }
          >
            <StatusIndicator />
          </TooltipTrigger>
          <TooltipContent>Loading</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Status
                variant="recording"
                pulse
                className="border-transparent bg-transparent px-0"
              />
            }
          >
            <StatusIndicator />
          </TooltipTrigger>
          <TooltipContent>Recording</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Status
                variant="cancelled"
                className="border-transparent bg-transparent px-0"
              />
            }
          >
            <StatusIndicator />
          </TooltipTrigger>
          <TooltipContent>Cancelled</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Status
                variant="verified"
                className="border-transparent bg-transparent px-0"
              />
            }
          >
            <StatusIndicator />
          </TooltipTrigger>
          <TooltipContent>Verified</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Status
                variant="brand"
                className="border-transparent bg-transparent px-0"
              />
            }
          >
            <StatusIndicator />
          </TooltipTrigger>
          <TooltipContent>Brand</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

function StatusCustomColors({ className }: { className?: string }) {
  return (
    <div className="space-y-4 mx-auto w-full max-w-lg">
      <div className="flex flex-wrap gap-2">
        <Status className="border-purple-500/20 bg-purple-500/10 text-purple-700 dark:border-purple-400/20 dark:bg-purple-400/10 dark:text-purple-400">
          <StatusIndicator />
          <StatusLabel>Purple</StatusLabel>
        </Status>
        <Status className="border-sky-500/20 bg-sky-500/10 text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-400">
          <StatusIndicator />
          <StatusLabel>Sky</StatusLabel>
        </Status>
        <Status className="border-pink-500/20 bg-pink-500/10 text-pink-700 dark:border-pink-400/20 dark:bg-pink-400/10 dark:text-pink-400">
          <StatusIndicator />
          <StatusLabel>Pink</StatusLabel>
        </Status>
      </div>
    </div>
  )
}
