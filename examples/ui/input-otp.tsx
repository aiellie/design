"use client"

import * as React from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"

export function InputOtpExample() {
  const [value, setValue] = React.useState("")

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Label htmlFor="otp-code">Verification code</Label>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to your phone.
        </p>
      </div>
      <InputOTP
        id="otp-code"
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        value={value}
        onChange={setValue}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">
        {value.length === 6 ? (
          <>Code entered: {value}</>
        ) : (
          <>{6 - value.length} digits remaining</>
        )}
      </p>
    </div>
  )
}
