"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SwitchExample() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="switch-notifications">Push notifications</Label>
          <p className="text-sm text-muted-foreground">
            Get notified about new activity.
          </p>
        </div>
        <Switch id="switch-notifications" defaultChecked />
      </div>
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="switch-digest">Weekly digest</Label>
        <Switch id="switch-digest" />
      </div>
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="switch-compact">Compact mode (small)</Label>
        <Switch id="switch-compact" size="sm" defaultChecked />
      </div>
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="switch-beta" className="opacity-50">
          Beta features
        </Label>
        <Switch id="switch-beta" disabled />
      </div>
    </div>
  )
}
