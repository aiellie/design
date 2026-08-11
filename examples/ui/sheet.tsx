"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Toaster, toast } from "@/components/ui/toast"

const DEFAULT_PROFILE = { name: "Alex Rivera", email: "alex@acme.com" }

export function SheetExample() {
  const [open, setOpen] = React.useState(false)
  const [profile, setProfile] = React.useState(DEFAULT_PROFILE)
  const [draft, setDraft] = React.useState(DEFAULT_PROFILE)

  const isDirty =
    draft.name !== profile.name || draft.email !== profile.email

  return (
    <div className="flex w-full flex-wrap items-center justify-center">
      <Sheet
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen)
          // Discard unsaved edits when the sheet closes.
          if (!nextOpen) setDraft(profile)
        }}
      >
        <SheetTrigger render={<Button variant="outline">Edit profile</Button>} />
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Update your account details. Changes apply across your workspace.
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-4 px-4">
            <div className="grid gap-2">
              <Label htmlFor="sheet-example-name">Name</Label>
              <Input
                id="sheet-example-name"
                value={draft.name}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sheet-example-email">Email</Label>
              <Input
                id="sheet-example-email"
                type="email"
                value={draft.email}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
            </div>
          </div>
          <SheetFooter>
            <Button
              disabled={!isDirty}
              onClick={() => {
                setProfile(draft)
                setOpen(false)
                toast.add({
                  type: "success",
                  title: "Profile updated",
                })
              }}
            >
              Save changes
            </Button>
            <SheetClose render={<Button variant="outline">Cancel</Button>} />
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Toaster />
    </div>
  )
}
