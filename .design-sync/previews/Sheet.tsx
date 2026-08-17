// Sheet preview — first cell forces the right-side edit-profile sheet open
// (the repo example's static render is just its trigger). NavigationPanel
// shows a left-side sheet, TriggerDemo ships the example's trigger.
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
} from "@/components/ui/sheet"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Folder01Icon,
  Home01Icon,
  Logout01Icon,
  Message01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons"

export function Showcase() {
  return (
    <Sheet open>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Update your account details. Changes apply across your workspace.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-4 px-4">
          <div className="grid gap-2">
            <Label htmlFor="sheet-preview-name">Name</Label>
            <Input id="sheet-preview-name" defaultValue="Alex Rivera" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sheet-preview-email">Email</Label>
            <Input
              id="sheet-preview-email"
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
  )
}

const navItems = [
  { icon: Home01Icon, label: "Dashboard", active: true },
  { icon: Folder01Icon, label: "Projects" },
  { icon: Message01Icon, label: "Messages" },
  { icon: Settings01Icon, label: "Settings" },
]

export function NavigationPanel() {
  return (
    <Sheet open>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>DesignEllie</SheetTitle>
          <SheetDescription>Workspace navigation</SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-1 px-2">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "secondary" : "ghost"}
              className="justify-start"
            >
              <HugeiconsIcon icon={item.icon} strokeWidth={2} />
              {item.label}
            </Button>
          ))}
        </div>
        <SheetFooter>
          <Button variant="outline" className="justify-start">
            <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} />
            Sign out
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export { SheetExample as TriggerDemo } from "@/examples/ui/sheet"
