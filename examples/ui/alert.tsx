import {
  AlarmClockIcon,
  AlertCircleIcon,
  AlertTriangle,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Copy01Icon,
  Invoice02Icon,
  CreditCardValidationIcon,
  CrownIcon,
  File01Icon,
  InformationCircleIcon,
  Megaphone01Icon,
  RefreshIcon,
  TerminalIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

/**
 * Actions have to borrow the palette of the alert they sit in — a stock ghost
 * button resolves its hover to `muted`/`foreground`, which lands as a grey
 * smudge on a tinted surface.
 *
 * `ghost` is the quiet recipe for icon buttons, `solid` the one call to action
 * each alert is allowed. Written out per colour because Tailwind scans for
 * literal class names.
 */
const ghost = {
  neutral:
    "text-muted-foreground hover:bg-foreground/5 hover:text-foreground dark:hover:bg-foreground/10",
  blue: "text-blue-700/70 hover:bg-blue-600/10 hover:text-blue-800 dark:text-blue-400/70 dark:hover:bg-blue-400/10 dark:hover:text-blue-300",
  amber:
    "text-amber-700/70 hover:bg-amber-600/10 hover:text-amber-800 dark:text-amber-400/70 dark:hover:bg-amber-400/10 dark:hover:text-amber-300",
  red: "text-destructive/70 hover:bg-destructive/10 hover:text-destructive dark:text-red-400/70 dark:hover:bg-red-400/10 dark:hover:text-red-300",
}

const solid = {
  emerald:
    "bg-emerald-600/10 text-emerald-700 hover:bg-emerald-600/15 hover:text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300 dark:hover:bg-emerald-400/20 dark:hover:text-emerald-200",
  blue: "bg-blue-600/10 text-blue-700 hover:bg-blue-600/15 hover:text-blue-800 dark:bg-blue-400/10 dark:text-blue-300 dark:hover:bg-blue-400/20 dark:hover:text-blue-200",
  amber:
    "bg-amber-600/10 text-amber-700 hover:bg-amber-600/15 hover:text-amber-800 dark:bg-amber-400/10 dark:text-amber-300 dark:hover:bg-amber-400/20 dark:hover:text-amber-200",
}

export function AlertExample() {
  return (
    <div className="grid w-full max-w-md items-start gap-4">
      {/* The action cluster is absolutely positioned in the top-end corner, so
          each alert reserves enough end padding for it to clear the title. The
          `!` is there to beat the component's own `has-[alert-action]:pe-18`,
          which wins on specificity rather than order. */}
      {/* Default */}
      <Alert>
        <HugeiconsIcon icon={Megaphone01Icon} strokeWidth={2} />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the CLI.
        </AlertDescription>
      </Alert>
      {/* Code — the command is the payload, so the alert wears mono and copy
          is the action that matters. */}
      <Alert>
        <HugeiconsIcon icon={TerminalIcon} strokeWidth={2} />
        <AlertTitle className="text-sm text-muted-foreground font-mono">
          npx shadcn@latest add alert
        </AlertTitle>
       
        <AlertAction className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-xs" className={ghost.neutral}>
                  <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
                  <span className="sr-only">Copy command</span>
                </Button>
              }
            />
            <TooltipContent className="font-mono">Copy command</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-xs" className={ghost.neutral}>
                  <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
                  <span className="sr-only">Dismiss</span>
                </Button>
              }
            />
            <TooltipContent className="font-mono">Dismiss</TooltipContent>
          </Tooltip>
        </AlertAction>
      </Alert>
      <Alert className="max-w-md border-emerald-200 bg-emerald-500/5 pe-30! text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/6 dark:text-emerald-400">
        <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>
          A receipt has been sent to your email.
        </AlertDescription>
        <AlertAction>
          <Button variant="ghost" size="xs" className={solid.emerald}>
            <HugeiconsIcon
              icon={Invoice02Icon}
              strokeWidth={2}
              data-icon="inline-start"
            />
            View receipt
          </Button>
        </AlertAction>
      </Alert>
      <Alert className="max-w-md border-blue-200 bg-blue-500/5 pe-28! text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/6 dark:text-blue-400">
        <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} />
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>
          We&apos;ve added dark mode support.
        </AlertDescription>
        <AlertAction className="flex items-center gap-1.5">
          <Button variant="ghost" size="xs" className={solid.blue}>
            Turn on
          </Button>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-xs" className={ghost.blue}>
                  <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
                  <span className="sr-only">Dismiss</span>
                </Button>
              }
            />
            <TooltipContent>Dismiss</TooltipContent>
          </Tooltip>
        </AlertAction>
      </Alert>
      <Alert className="max-w-md border-amber-200 bg-amber-500/5 pe-26! text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/6 dark:text-amber-400">
        <HugeiconsIcon icon={AlertTriangle} />
        <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
        <AlertDescription>
          Renew now avoid interruption.
        </AlertDescription>
        <AlertAction className="flex items-center gap-1.5">
          <Button variant="ghost" size="xs" className={solid.amber}>
            Renew
          </Button>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-xs" className={ghost.amber}>
                  <HugeiconsIcon icon={AlarmClockIcon} strokeWidth={2} />
                  <span className="sr-only">Remind me in 2 days</span>
                </Button>
              }
            />
            <TooltipContent>Remind me in 2 days</TooltipContent>
          </Tooltip>
        </AlertAction>
      </Alert>
      <Alert variant="destructive" className="max-w-md border-red-200 bg-destructive/3 pe-24! dark:border-red-400/20 dark:bg-red-400/6 dark:text-red-400">
        <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>
         Please check your payment method.
        </AlertDescription>
        <AlertAction className="flex items-center gap-1.5">
          <Button variant="destructive" size="xs">
            Retry
          </Button>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-xs" className={ghost.red}>
                  <HugeiconsIcon icon={CreditCardValidationIcon} />
                  <span className="sr-only">Update payment method</span>
                </Button>
              }
            />
            <TooltipContent>Update payment method</TooltipContent>
          </Tooltip>
        </AlertAction>
      </Alert>
      {/* The one alert that sells something, so it gets the full-bleed
          gradient. Its buttons ride the same corner as everyone else's — solid
          white for the offer, a translucent icon button to wave it away. */}
      <Alert className="border-transparent bg-linear-to-br from-primary via-violet-600 to-fuchsia-500 pe-28! text-white shadow-sm *:data-[slot=alert-description]:text-white/75">
        <HugeiconsIcon icon={CrownIcon} strokeWidth={2} />
        <AlertTitle>Upgrade to Pro for unlimited projects.</AlertTitle>
        <AlertDescription>
          Priority support, team tools and more.
        </AlertDescription>
        <AlertAction className="flex items-center gap-1.5">
          <Button size="xs" className="bg-white text-primary hover:bg-white/85">
            Upgrade
          </Button>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-white/70 hover:bg-white/15 hover:text-white"
                >
                  <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
                  <span className="sr-only">Dismiss</span>
                </Button>
              }
            />
            <TooltipContent>Dismiss</TooltipContent>
          </Tooltip>
        </AlertAction>
      </Alert>
      <Alert className="border-border bg-muted-foreground/3 text-muted-foreground dark:bg-muted-foreground/10 dark:text-muted-foreground">
        <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
        <AlertTitle>Deployment was cancelled.</AlertTitle>
        <AlertDescription>
          No changes were applied.
        </AlertDescription>
        <AlertAction className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-xs" className={ghost.neutral}>
                  <HugeiconsIcon icon={RefreshIcon} strokeWidth={2} />
                  <span className="sr-only">Redeploy</span>
                </Button>
              }
            />
            <TooltipContent>Redeploy</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-xs" className={ghost.neutral}>
                  <HugeiconsIcon icon={File01Icon} strokeWidth={2} />
                  <span className="sr-only">View build logs</span>
                </Button>
              }
            />
            <TooltipContent>View build logs</TooltipContent>
          </Tooltip>
        </AlertAction>
      </Alert>
    </div>
  )
}
