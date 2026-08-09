"use client"

import { Button } from '@/components/ui/button'
import { Toaster, toast } from '@/components/ui/toast'

export function ToastExample() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "success",
            title: "Event created",
            description: "Friday, August 14 at 4:30 PM",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            type: "error",
            title: "Payment failed",
            description: "Your card was declined. Try another method.",
          })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Conversation archived",
            actionProps: {
              children: "Undo",
              onClick: () =>
                toast.add({
                  type: "info",
                  title: "Conversation restored",
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
