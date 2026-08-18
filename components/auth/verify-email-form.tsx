"use client"

import * as React from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
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
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const OTP_LENGTH = 6
const OTP_HALF = OTP_LENGTH / 2
const RESEND_COOLDOWN = 30

export function VerifyEmailForm({
  email = "m@example.com",
  onBack,
  className,
  ...props
}: Omit<React.ComponentProps<"form">, "onSubmit"> & {
  email?: string
  onBack?: () => void
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [code, setCode] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [cooldown, setCooldown] = React.useState(RESEND_COOLDOWN)

  React.useEffect(() => {
    if (cooldown === 0) {
      return
    }

    const timer = window.setTimeout(() => setCooldown(cooldown - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [cooldown])

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
    setCooldown(RESEND_COOLDOWN)
    inputRef.current?.focus()
    // Resend the verification code to `email` here.
  }

  const invalid = error !== null
  const remaining = OTP_LENGTH - code.length

  function renderSlot(index: number) {
    return (
      <InputOTPSlot
        key={index}
        index={index}
        className="size-10 text-base"
        aria-invalid={invalid || undefined}
      />
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn("w-full", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-lg font-bold">Check your email</h1>
          <p className="text-balance text-sm text-muted-foreground">
            We sent a {OTP_LENGTH}-digit code to{" "}
            <span className="font-medium text-foreground">{email}</span>.
          </p>
        </div>
        <Field data-invalid={invalid}>
          <FieldLabel htmlFor="otp-verification">Verification code</FieldLabel>
          <InputOTP
            ref={inputRef}
            id="otp-verification"
            maxLength={OTP_LENGTH}
            pattern={REGEXP_ONLY_DIGITS}
            autoComplete="one-time-code"
            autoFocus
            value={code}
            onChange={handleChange}
            containerClassName="gap-2"
            aria-invalid={invalid || undefined}
            aria-describedby={
              invalid ? "otp-verification-error" : "otp-verification-hint"
            }
          >
            <InputOTPGroup>
              {Array.from({ length: OTP_HALF }, (_, index) =>
                renderSlot(index)
              )}
            </InputOTPGroup>
            <InputOTPSeparator className="text-muted-foreground" />
            <InputOTPGroup>
              {Array.from({ length: OTP_LENGTH - OTP_HALF }, (_, index) =>
                renderSlot(OTP_HALF + index)
              )}
            </InputOTPGroup>
          </InputOTP>
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
        <Field className="gap-3">
          <Button type="submit">
            Verify email
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              strokeWidth={2}
              className="rtl:rotate-180"
            />
          </Button>
          {onBack && (
            <Button type="button" variant="outline" onClick={onBack}>
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                strokeWidth={2}
                className="rtl:rotate-180"
              />
              Use a different email
            </Button>
          )}
        </Field>
        <FieldDescription className="text-center">
          Didn&apos;t receive the code?{" "}
          {cooldown > 0 ? (
            <span className="tabular-nums">Resend in {cooldown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="underline underline-offset-4 transition-colors hover:text-primary"
            >
              Resend code
            </button>
          )}
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
