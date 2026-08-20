"use client"

import * as React from "react"
import { ArrowRight01Icon, MailIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PrivacyPolicyDialog } from "@/components/auth/privacy-policy"
import { TermsOfServiceDialog } from "@/components/auth/terms-of-service"
import { VerifyEmailForm } from "@/components/auth/verify-email-form"
import { BrandIcons } from "@/icons/icons"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateEmail(value: string) {
  if (!value) {
    return "Email is required."
  }

  if (!EMAIL_PATTERN.test(value)) {
    return "Enter a valid email address, like m@example.com."
  }

  return null
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [sentTo, setSentTo] = React.useState<string | null>(null)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)

    if (error) {
      setError(validateEmail(event.target.value.trim()))
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const value = email.trim()
    const message = validateEmail(value)
    setError(message)

    if (message) {
      return
    }

    // Send the verification code to `value` here.
    setSentTo(value)
  }

  const invalid = error !== null

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            {sentTo ? (
              <VerifyEmailForm email={sentTo} onBack={() => setSentTo(null)} />
            ) : (
              <form noValidate onSubmit={handleSubmit}>
                <FieldGroup>
                  <div className="flex flex-col items-start gap-1">
                    <h1 className="text-lg font-bold">Welcome to AI Ellie!</h1>
                    <div className="text-balance text-sm text-muted-foreground">
                      Log in or sign up
                    </div>
                  </div>
                  <Field className="gap-3">
                    <Button variant="outline" type="button">
                      <BrandIcons.github />
                      Continue with GitHub
                    </Button>
                    <Button variant="outline" type="button">
                      <BrandIcons.google />
                      Continue with Google
                    </Button>
                    <Button variant="outline" type="button">
                      <BrandIcons.apple />
                      Continue with Apple
                    </Button>
                  </Field>
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    Or continue with email
                  </FieldSeparator>
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleChange}
                        aria-invalid={invalid}
                        aria-describedby={invalid ? "email-error" : undefined}
                      />
                      <InputGroupAddon>
                        <HugeiconsIcon
                          icon={MailIcon}
                          strokeWidth={2}
                          className="size-3.5 text-muted-foreground"
                        />
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end">
                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <InputGroupButton
                                type="submit"
                                variant="default"
                                size="icon-xs"
                                className="rounded-full"
                                aria-label="Continue"
                              >
                                <HugeiconsIcon
                                  icon={ArrowRight01Icon}
                                  strokeWidth={2}
                                  className="rtl:rotate-180"
                                />
                              </InputGroupButton>
                            }
                          />
                          <TooltipContent>Continue</TooltipContent>
                        </Tooltip>
                      </InputGroupAddon>
                    </InputGroup>
                    {invalid && (
                      <FieldError id="email-error">{error}</FieldError>
                    )}
                  </Field>
                  <FieldDescription className="text-center">
                    We&apos;ll email you a verification code to sign in.
                  </FieldDescription>
                </FieldGroup>
              </form>
            )}
          </div>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/brand/clouds.png"
              alt="AI Ellie clouds"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <TermsOfServiceDialog /> and{" "}
        <PrivacyPolicyDialog />.
      </FieldDescription>
    </div>
  )
}
