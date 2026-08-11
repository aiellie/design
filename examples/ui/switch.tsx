import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldGroup,
  FieldTitle,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export function SwitchExample() {
  return (
    <div className="flex w-full items-center justify-center">
    <FieldGroup className="w-full max-w-sm">
      <FieldLabel htmlFor="switch-share">
        <Field orientation="horizontal" className="cursor-pointer">
          <FieldContent>
            <FieldTitle>Share across devices</FieldTitle>
            <FieldDescription>
              Focus is shared when you leave the app.
            </FieldDescription>
          </FieldContent>
          <Switch size="sm" id="switch-share" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="switch-notifications">
        <Field orientation="horizontal" className="cursor-pointer">
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              Receive notifications even if focus mode is disabled.
            </FieldDescription>
          </FieldContent>
          <Switch size="sm" id="switch-notifications" defaultChecked />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="switch-terms">
        <Field orientation="horizontal" data-invalid className="cursor-pointer">
          <FieldContent>
            <FieldTitle>Accept terms</FieldTitle>
            <FieldDescription>
              You must accept the terms to continue.
            </FieldDescription>
            <FieldError errors={[{ }]} />
          </FieldContent>
          <Switch size="sm" id="switch-terms" aria-invalid />
        </Field>
      </FieldLabel>
    </FieldGroup>
    </div>
  )
}
