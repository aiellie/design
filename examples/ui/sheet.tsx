"use client"

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

export function SheetExample() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      <Sheet>
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
              <Input id="sheet-example-name" defaultValue="Alex Rivera" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sheet-example-email">Email</Label>
              <Input
                id="sheet-example-email"
                type="email"
                defaultValue="alex@acme.com"
              />
            </div>
          </div>
          <SheetFooter>
            <Button>Save changes</Button>
            <SheetClose render={<Button variant="outline">Cancel</Button>} />
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger render={<Button variant="outline">Notifications</Button>} />
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Notification preferences</SheetTitle>
            <SheetDescription>
              Choose how you want to hear about activity in your projects.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="sm:flex-row sm:justify-end">
            <SheetClose render={<Button variant="outline">Not now</Button>} />
            <Button>Enable notifications</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
