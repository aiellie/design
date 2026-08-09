"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputExample() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-email">Email</Label>
        <Input
          id="input-email"
          type="email"
          placeholder="ellie@example.com"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-invalid">Username</Label>
        <Input
          id="input-invalid"
          defaultValue="ellie!"
          aria-invalid
        />
        <p className="text-sm text-destructive">
          Usernames can only contain letters and numbers.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-file">Profile picture</Label>
        <Input id="input-file" type="file" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="input-disabled">API region</Label>
        <Input id="input-disabled" defaultValue="us-east-1" disabled />
      </div>
    </div>
  )
}
