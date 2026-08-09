"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Delete02Icon, Trash } from "@hugeicons/core-free-icons"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function AlertDialogExample() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      <AlertDialog>
        <Tooltip>
          <TooltipTrigger
            render={
              <AlertDialogTrigger
                render={
                  <Button variant="destructive" size="icon" className="rounded-full">
                    <HugeiconsIcon icon={Trash} strokeWidth={2} />
                    <span className="sr-only">Delete</span>
                  </Button>
                }
              />
            }
          />
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive">
              <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
            </AlertDialogMedia>
            <AlertDialogTitle>
              Delete &ldquo;Acme Storefront&rdquo;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the project, its deployments, and all
              usage data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">
              Delete project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline">Sign out</Button>} />
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out of all devices?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be signed out on this device and 3 other active
              sessions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay signed in</AlertDialogCancel>
            <AlertDialogAction>Sign out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
