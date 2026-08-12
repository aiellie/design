"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Trash,
  Globe02Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons"

export function CheckboxExample() {
  return (
    <div className="flex w-full items-center justify-center">
    <FieldGroup className="w-full max-w-sm">
      <FieldLabel htmlFor="checkbox-profile">
        <Field orientation="horizontal" className="cursor-pointer">
          <HugeiconsIcon
            icon={Globe02Icon}
            strokeWidth={2}
            className="size-4 shrink-0 text-muted-foreground"
          />
          <FieldContent>
            <FieldTitle>Public profile</FieldTitle>
            <FieldDescription>
              Anyone with the link can view your profile.
            </FieldDescription>
          </FieldContent>
          <Checkbox id="checkbox-profile" name="checkbox-profile" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="checkbox-digest">
        <Field orientation="horizontal" className="cursor-pointer">
          <HugeiconsIcon
            icon={Mail01Icon}
            strokeWidth={2}
            className="size-4 shrink-0 text-muted-foreground"
          />
          <FieldContent>
            <FieldTitle>Weekly digest</FieldTitle>
            <FieldDescription>
              A weekly summary of your workspace activity.
            </FieldDescription>
          </FieldContent>
          <Checkbox
            id="checkbox-digest"
            name="checkbox-digest"
            defaultChecked
          />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="checkbox-purge">
        <Field orientation="horizontal" data-invalid className="cursor-pointer">
          <HugeiconsIcon
            icon={Trash}
            strokeWidth={2}
            className="size-4 shrink-0 text-destructive"
          />
          <FieldContent>
            <FieldTitle>Erase usage data</FieldTitle>
            <FieldDescription>
              Permanently removes your analytics history.
            </FieldDescription>
            <FieldError errors={[{ }]} />
          </FieldContent>
          <Checkbox
            id="checkbox-purge"
            name="checkbox-purge"
            defaultChecked
            aria-invalid
            data-variant="destructive"
          />
        </Field>
      </FieldLabel>
    </FieldGroup>
    </div>
  )
}
