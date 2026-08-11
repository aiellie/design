"use client"

import { Archive02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from '@/components/ui/button'
import { Toaster, toast } from '@/components/ui/toast'

export function ToastExample() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        onClick={() => toast.add({ description: "Event has been created." })}
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "success",
            description: "Event has been created.",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "info",
            description: "Arrive 10 minutes before the event.",
          })
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "warning",
            description: "The event cannot start before 8:00 AM.",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "error",
            description: "The event could not be created.",
            priority: "high",
          })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            // Untyped toasts render no icon slot, but title takes a ReactNode,
            // so the icon rides inline — gap-3 matches the slot's spacing.
            description: (
              <span className="flex items-center gap-3">
                <HugeiconsIcon
                  icon={Archive02Icon}
                  strokeWidth={2}
                  className="size-4 shrink-0"
                  aria-hidden="true"
                />
                Conversation archived
              </span>
            ),
            actionProps: {
              children: "Undo",
              onClick: () =>
                toast.add({
                  type: "info",
                  description: "Conversation restored",
                }),
            },
          })
        }
      >
        Action
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(
            new Promise<void>((resolve) => setTimeout(resolve, 2000)),
            {
              loading: "Uploading report...",
              success: "Report uploaded",
              error: "Upload failed",
            }
          )
        }
      >
        Promise
      </Button>
      <Toaster />
    </div>
  )
}
