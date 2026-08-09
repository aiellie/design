"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RadioGroupExample() {
  return (
    <RadioGroup defaultValue="pro" className="w-full gap-4">
      <div className="flex items-start gap-3">
        <RadioGroupItem value="starter" id="radio-starter" className="mt-0.5" />
        <div className="flex flex-col gap-1">
          <Label htmlFor="radio-starter">Starter</Label>
          <p className="text-sm text-muted-foreground">
            Free forever. Up to 3 projects.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <RadioGroupItem value="pro" id="radio-pro" className="mt-0.5" />
        <div className="flex flex-col gap-1">
          <Label htmlFor="radio-pro">Pro</Label>
          <p className="text-sm text-muted-foreground">
            $12 per month. Unlimited projects and priority support.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <RadioGroupItem
          value="enterprise"
          id="radio-enterprise"
          disabled
          className="mt-0.5"
        />
        <div className="flex flex-col gap-1">
          <Label htmlFor="radio-enterprise" className="opacity-50">
            Enterprise
          </Label>
          <p className="text-sm text-muted-foreground opacity-50">
            Contact sales to enable this plan.
          </p>
        </div>
      </div>
    </RadioGroup>
  )
}
