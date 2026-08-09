"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function LabelExample() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="label-name">Full name</Label>
        <Input id="label-name" placeholder="Ellie Sophia" />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="label-terms" />
        <Label htmlFor="label-terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor="label-notifications">Email notifications</Label>
        <Switch id="label-notifications" defaultChecked />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="label-disabled" className="opacity-50">
          Workspace ID
        </Label>
        <Input id="label-disabled" defaultValue="ws_8f3k2" disabled />
      </div>
    </div>
  )
}
