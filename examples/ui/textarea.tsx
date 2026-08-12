"use client"

import * as React from "react"
import {
  AlertCircleIcon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

const MAX_LENGTH = 200

export function TextareaExample() {
  const [value, setValue] = React.useState(
    "The new dashboard makes it much easier to spot regressions."
  )

  return (
    <div className="flex w-full items-center justify-center">
      <FieldGroup className="w-full max-w-md">
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="textarea-feedback">Feedback</FieldLabel>
            <span className="text-xs text-muted-foreground tabular-nums">
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
          <FieldDescription className="inline-flex items-center gap-1">
            <HugeiconsIcon
              icon={InformationCircleIcon}
              strokeWidth={2}
              className="size-3"
            />
            Your feedback is shared with the product team.
          </FieldDescription>
        </Field>
        <Field data-disabled>
          <FieldLabel htmlFor="textarea-disabled">Release notes</FieldLabel>
          <Textarea
            id="textarea-disabled"
            disabled
            defaultValue="Editing is locked while the release is being published."
          />
          <FieldDescription>
            Notes can be edited once the release ships.
          </FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel htmlFor="textarea-invalid">Message</FieldLabel>
          <Textarea
            id="textarea-invalid"
            placeholder="Type your message here."
            aria-invalid
          />
          <FieldDescription className="inline-flex items-center gap-1 text-destructive">
            <HugeiconsIcon
              icon={AlertCircleIcon}
              strokeWidth={2}
              className="size-3"
            />
            Please enter a valid message.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  )
}
