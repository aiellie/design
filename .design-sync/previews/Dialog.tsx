// Dialog preview — the repo example renders closed triggers, so the first
// cell forces the edit-profile dialog open (controlled `open`). ShareLink is
// the example's compact share variant, TriggerDemo ships the trigger row.
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { HugeiconsIcon } from "@hugeicons/react"
import { Copy01Icon } from "@hugeicons/core-free-icons"

export function Showcase() {
  return (
    <Dialog open>
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
            <Label htmlFor="dialog-preview-name">Name</Label>
            <Input id="dialog-preview-name" defaultValue="Alex Rivera" />
          </div>
          <div className="grid gap-2">
            <Label className="font-normal" htmlFor="dialog-preview-username">
              Username
            </Label>
            <Input id="dialog-preview-username" defaultValue="@alexr" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function ShareLink() {
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <InputGroup>
          <Label htmlFor="dialog-preview-link" className="sr-only">
            Link
          </Label>
          <InputGroupInput
            id="dialog-preview-link"
            defaultValue="https://designellie.ai/dialog"
            readOnly
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs" aria-label="Copy">
              <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </DialogContent>
    </Dialog>
  )
}

export { DialogExample as TriggerDemo } from "@/examples/ui/dialog"
