"use client"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons"

export function AlertExample() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Alert>
        <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
        <AlertTitle>Payment received</AlertTitle>
        <AlertDescription>
          Invoice #4021 was paid successfully. A receipt has been sent to your
          inbox.
        </AlertDescription>
      </Alert>
      <Alert>
        <HugeiconsIcon icon={Wallet01Icon} strokeWidth={2} />
        <AlertTitle>Free trial ends in 3 days</AlertTitle>
        <AlertDescription>
          Add a payment method to keep your workspace active.
        </AlertDescription>
        <AlertAction>
          <Button size="xs" variant="outline">
            Upgrade
          </Button>
        </AlertAction>
      </Alert>
      <Alert variant="destructive">
        <HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
        <AlertTitle>Unable to sync workspace</AlertTitle>
        <AlertDescription>
          Your changes are saved locally and will sync once the connection is
          restored.
        </AlertDescription>
      </Alert>
    </div>
  )
}
