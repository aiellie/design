"use client"

import { toast } from "sonner"

import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'

export function SonnerExample() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Saturday, August 9 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => toast.info("Event removed"),
            },
          })
        }
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("Changes saved successfully")}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("Failed to save changes")}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(
            new Promise<void>((resolve) => setTimeout(resolve, 2000)),
            {
              loading: "Syncing workspace...",
              success: "Workspace synced",
              error: "Sync failed",
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
