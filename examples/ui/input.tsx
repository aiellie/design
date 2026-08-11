import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputExample() {
  return (
    <div className="flex w-full max-w-lg flex-col items-start gap-5">
    <Field>
      <FieldLabel htmlFor="input-demo-api-key">API Key</FieldLabel>
      <Input id="input-demo-api-key" type="password" placeholder="sk-..." />
      <FieldDescription>
        Your API key is encrypted and stored securely.
      </FieldDescription>
    </Field>
       <Field data-disabled>
       <FieldLabel htmlFor="input-demo-disabled">Email</FieldLabel>
       <Input
         id="input-demo-disabled"
         type="email"
         placeholder="Email"
         disabled
       />
       <FieldDescription>This field is currently disabled.</FieldDescription>
     </Field> 
     <Field data-invalid>
      <FieldLabel htmlFor="input-invalid">Invalid Input</FieldLabel>
      <Input id="input-invalid" placeholder="Error" aria-invalid />
      <FieldDescription>
        This field contains validation errors.
      </FieldDescription>
    </Field>
    <Field>
      <FieldLabel htmlFor="picture">Picture</FieldLabel>
      <Input id="picture" type="file" />
      <FieldDescription>Select a picture to upload.</FieldDescription>
    </Field>
     </div>
  )
}
