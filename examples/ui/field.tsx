"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function FieldExample() {
  return (
    <FieldSet className="w-full">
      <FieldLegend>Create your account</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-name">Full name</FieldLabel>
          <Input id="field-name" placeholder="Ellie Sophia" />
          <FieldDescription>
            This is how your name appears to teammates.
          </FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel htmlFor="field-email">Email</FieldLabel>
          <Input
            id="field-email"
            type="email"
            defaultValue="ellie@invalid"
            aria-invalid
          />
          <FieldError errors={[{ message: "Enter a valid email address." }]} />
        </Field>
        <FieldSeparator>Preferences</FieldSeparator>
        <Field orientation="horizontal">
          <Checkbox id="field-updates" defaultChecked />
          <FieldContent>
            <FieldLabel htmlFor="field-updates">Product updates</FieldLabel>
            <FieldDescription>
              Occasional emails about new features.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
