"use client"

import * as React from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { ArrowLeft01Icon, ArrowRight01Icon, RefreshIcon } from "@hugeicons/core-free-icons"
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
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const OTP_LENGTH = 6

export function VerifyEmailForm({
  email = "m@example.com",
  onBack,
  className,
  ...props
}: Omit<React.ComponentProps<"form">, "onSubmit"> & {
  email?: string
  onBack?: () => void
}) {
  const [code, setCode] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  function validate(value: string) {
    if (value.length === 0) {
      return "Enter the verification code we sent you."
    }

    if (value.length < OTP_LENGTH) {
      return `The verification code is ${OTP_LENGTH} digits.`
    }

    return null
  }

  function handleChange(value: string) {
    setCode(value)

    if (error) {
      setError(validate(value))
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const message = validate(code)
    setError(message)

    if (message) {
      return
    }

    // Submit `code` to your verification endpoint here.
  }

  function handleResend() {
    setCode("")
    setError(null)
    // Resend the verification code to `email` here.
  }

  const invalid = error !== null
  const remaining = OTP_LENGTH - code.length

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn("w-full", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-start gap-0 text-center">
          <h1 className="text-lg font-bold">Check your email</h1>
          <div className="text-balance text-muted-foreground">
            We sent a code to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </div>
        </div>
        <Field data-invalid={invalid}>
          <FieldLabel htmlFor="otp-verification">Verification code</FieldLabel>
          <div className="flex items-center gap-2">
            {onBack && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      className="rounded-full text-muted-foreground hover:text-foreground"
                      aria-label="Use a different email"
                      onClick={onBack}
                    >
                      <HugeiconsIcon
                        icon={ArrowLeft01Icon}
                        strokeWidth={2}
                        className="rtl:rotate-180"
                      />
                    </Button>
                  }
                />
                <TooltipContent>Use a different email</TooltipContent>
              </Tooltip>
            )}
            <InputOTP
              id="otp-verification"
              maxLength={OTP_LENGTH}
              pattern={REGEXP_ONLY_DIGITS}
              value={code}
              onChange={handleChange}
              aria-invalid={invalid || undefined}
              aria-describedby={
                invalid ? "otp-verification-error" : "otp-verification-hint"
              }
            >
              <InputOTPGroup>
                {Array.from({ length: OTP_LENGTH }, (_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    aria-invalid={invalid || undefined}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    className="rounded-full text-muted-foreground hover:text-foreground"
                    aria-label="Resend code"
                    onClick={handleResend}
                  >
                    <HugeiconsIcon icon={RefreshIcon} strokeWidth={2} />
                  </Button>
                }
              />
              <TooltipContent>Resend code</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    type="submit"
                    size="icon-sm"
                    className="rounded-full"
                    aria-label="Verify"
                  >
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      strokeWidth={2}
                      className="rtl:rotate-180"
                    />
                  </Button>
                }
              />
              <TooltipContent>Verify</TooltipContent>
            </Tooltip>
          </div>
          {invalid ? (
            <FieldError id="otp-verification-error">{error}</FieldError>
          ) : (
            <FieldDescription id="otp-verification-hint">
              {remaining === 0
                ? "Press verify to continue."
                : `${remaining} ${remaining === 1 ? "digit" : "digits"} remaining`}
            </FieldDescription>
          )}
        </Field>
        <FieldDescription className="text-center">
          <a href="#">I no longer have access to this email address.</a>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}

export function OtpForm({ email }: { email?: string }) {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardContent>
        <VerifyEmailForm email={email} />
      </CardContent>
    </Card>
  )
}
