"use client"

import * as React from "react"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
const MAX_LENGTH = 200

export function TextareaExample() {
  const [value, setValue] = React.useState(
    "The new dashboard makes it much easier to spot regressions."
  )

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="textarea-feedback">Feedback</Label>
          <span className="text-xs text-muted-foreground">
            {value.length}/{MAX_LENGTH}
          </span>
        </div>
        <Textarea
          id="textarea-feedback"
          placeholder="Tell us what you think…"
          maxLength={MAX_LENGTH}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          Your feedback is shared with the product team.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="textarea-disabled">Release notes</Label>
        <Textarea
          id="textarea-disabled"
          disabled
          defaultValue="Editing is locked while the release is being published."
        />
      </div>
      <Field data-invalid>
      <FieldLabel htmlFor="textarea-invalid">Message</FieldLabel>
      <Textarea
        id="textarea-invalid"
        placeholder="Type your message here."
        aria-invalid
      />
      <FieldDescription>Please enter a valid message.</FieldDescription>
    </Field>
    </div>
  )
}
