// Field preview — the repo's payment-form showcase from examples/ui/field.tsx,
// plus a compact single-field composition with description + error state.
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export { FieldExample as Showcase } from "@/examples/ui/field"

export function SingleField() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <Field>
        <FieldLabel htmlFor="preview-email">Work email</FieldLabel>
        <Input id="preview-email" type="email" placeholder="you@company.com" />
        <FieldDescription>We only use this for billing receipts.</FieldDescription>
      </Field>
      <Field data-invalid>
        <FieldLabel htmlFor="preview-handle">Username</FieldLabel>
        <Input id="preview-handle" defaultValue="ellie!" aria-invalid />
        <FieldError>Usernames can only contain letters and numbers.</FieldError>
      </Field>
    </div>
  )
}
