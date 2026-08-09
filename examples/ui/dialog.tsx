"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogExample() {
  return (
    <div className="flex w-full items-center justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline">Edit profile</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your public profile here. Click save when you are
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="dialog-example-name">Name</Label>
              <Input id="dialog-example-name" defaultValue="Alex Rivera" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dialog-example-username">Username</Label>
              <Input id="dialog-example-username" defaultValue="@alexr" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
