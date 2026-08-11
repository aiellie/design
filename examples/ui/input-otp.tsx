"use client"

import * as React from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { HugeiconsIcon } from "@hugeicons/react"
import { RefreshIcon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import { Toaster, toast } from "@/components/ui/toast"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function generateCode() {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("")
}

export function InputOtpExample() {
  const [code, setCode] = React.useState(generateCode)
  const [value, setValue] = React.useState("")
  const [invalid, setInvalid] = React.useState(false)

  function handleChange(next: string) {
    setValue(next)
    setInvalid(false)
    if (next.length < 6) return
    if (next === code) {
      toast.add({
        type: "success",
        title: "Code verified",
        description: "Your identity has been confirmed.",
      })
      setValue("")
    } else {
      setInvalid(true)
      toast.add({
        type: "error",
        title: "Incorrect code",
        description: "The code you entered doesn't match. Try again.",
      })
    }
  }

  function regenerate() {
    const next = generateCode()
    setCode(next)
    setValue("")
    setInvalid(false)
    toast.add({
      type: "info",
      title: "New code generated",
      description: `Your new code is ${next}.`,
    })
  }

  return (
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <Label htmlFor="otp-code">Verification code</Label>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code: <span className="font-medium text-foreground tabular-nums">{code}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <InputOTP
            id="otp-code"
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={value}
            onChange={handleChange}
            aria-invalid={invalid || undefined}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} aria-invalid={invalid || undefined} />
              <InputOTPSlot index={1} aria-invalid={invalid || undefined} />
              <InputOTPSlot index={2} aria-invalid={invalid || undefined} />
              <InputOTPSlot index={3} aria-invalid={invalid || undefined} />
              <InputOTPSlot index={4} aria-invalid={invalid || undefined} />
              <InputOTPSlot index={5} aria-invalid={invalid || undefined} />
            </InputOTPGroup>
          </InputOTP>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="rounded-full text-muted-foreground hover:text-foreground"
                  aria-label="Regenerate code"
                  onClick={regenerate}
                >
                  <HugeiconsIcon icon={RefreshIcon} strokeWidth={2} />
                </Button>
              }
            />
            <TooltipContent>Regenerate code</TooltipContent>
          </Tooltip>
        </div>
        <p className="text-sm text-muted-foreground">
          {invalid ? (
            <span className="text-destructive">Wrong code, try again.</span>
          ) : value.length === 6 ? (
            <>Checking code...</>
          ) : (
            <>{6 - value.length} digits remaining</>
          )}
        </p>
        <Toaster />
      </div>
    
  )
}
