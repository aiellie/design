import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Building01Icon,
  CancelCircleIcon,
  Rocket01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons"

export function RadioGroupExample() {
  return (
    <div className="flex w-full items-center justify-center">
    <RadioGroup defaultValue="delete" className="w-full max-w-sm">
      <FieldLabel htmlFor="plus-plan">
        <Field orientation="horizontal" className="cursor-pointer">
          <HugeiconsIcon
            icon={UserIcon}
            strokeWidth={2}
            className="size-4 shrink-0 text-muted-foreground"
          />
          <FieldContent>
            <FieldTitle>Plus</FieldTitle>
            <FieldDescription>
              For individuals and small teams.
            </FieldDescription>
          </FieldContent>
          <RadioGroupItem value="plus" id="plus-plan" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="pro-plan">
        <Field orientation="horizontal" className="cursor-pointer">
          <HugeiconsIcon
            icon={Rocket01Icon}
            strokeWidth={2}
            className="size-4 shrink-0 text-muted-foreground"
          />
          <FieldContent>
            <FieldTitle>Pro</FieldTitle>
            <FieldDescription>For growing businesses.</FieldDescription>
          </FieldContent>
          <RadioGroupItem value="pro" id="pro-plan" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="enterprise-plan">
        <Field orientation="horizontal" className="cursor-pointer">
          <HugeiconsIcon
            icon={Building01Icon}
            strokeWidth={2}
            className="size-4 shrink-0 text-muted-foreground"
          />
          <FieldContent>
            <FieldTitle>Enterprise</FieldTitle>
            <FieldDescription>
              For large teams and enterprises.
            </FieldDescription>
          </FieldContent>
          <RadioGroupItem value="enterprise" id="enterprise-plan" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="delete-plan">
        <Field orientation="horizontal" data-invalid className="cursor-pointer">
          <HugeiconsIcon
            icon={CancelCircleIcon}
            strokeWidth={2}
            className="size-4 shrink-0 text-destructive"
          />
          <FieldContent>
            <FieldTitle>Cancel subscription</FieldTitle>
            <FieldDescription>
              Your plan ends at the close of the billing cycle.
            </FieldDescription>
            <FieldError errors={[{ }]} />
          </FieldContent>
          <RadioGroupItem
            value="delete"
            id="delete-plan"
            aria-invalid
            data-variant="destructive"
          />
        </Field>
      </FieldLabel>
    </RadioGroup>
    </div>
  )
}
