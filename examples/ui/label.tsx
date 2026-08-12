import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LabelExample() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-5">
        <div className="flex items-center gap-2">
          <Checkbox id="label-demo-terms" />
          <Label htmlFor="label-demo-terms">Accept terms and conditions</Label>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="label-demo-username">Username</Label>
          <Input id="label-demo-username" placeholder="Username" />
        </div>
        <div className="group flex flex-col gap-2" data-disabled="true">
          <Label htmlFor="label-demo-disabled">Disabled</Label>
          <Input id="label-demo-disabled" placeholder="Unavailable" disabled />
        </div>
      </div>
    </div>
  )
}
