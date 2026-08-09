"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function CheckboxExample() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-start gap-3">
        <Checkbox id="checkbox-terms" defaultChecked className="mt-0.5" />
        <div className="flex flex-col gap-1">
          <Label htmlFor="checkbox-terms">Accept terms and conditions</Label>
          <p className="text-sm text-muted-foreground">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="checkbox-newsletter" />
        <Label htmlFor="checkbox-newsletter">Subscribe to the newsletter</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="checkbox-security" defaultChecked disabled />
        <Label htmlFor="checkbox-security">
          Security alerts (always on)
        </Label>
      </div>
    </div>
  )
}
