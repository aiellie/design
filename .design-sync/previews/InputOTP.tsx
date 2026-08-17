// InputOTP preview — the repo's verification-code showcase from
// examples/ui/input-otp.tsx (its helper copy shows a random demo code), plus
// deterministic cells: a filled group with separator, and invalid/disabled
// states with fixed values.
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"

export { InputOtpExample as Showcase } from "@/examples/ui/input-otp"

export function WithSeparator() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Label htmlFor="otp-preview-filled">Two-factor code</Label>
      <InputOTP id="otp-preview-filled" maxLength={6} value="492013" readOnly>
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
    </div>
  )
}

export function States() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Label htmlFor="otp-preview-invalid">Incorrect code</Label>
        <InputOTP
          id="otp-preview-invalid"
          maxLength={6}
          value="118822"
          readOnly
          aria-invalid
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} aria-invalid />
            <InputOTPSlot index={1} aria-invalid />
            <InputOTPSlot index={2} aria-invalid />
            <InputOTPSlot index={3} aria-invalid />
            <InputOTPSlot index={4} aria-invalid />
            <InputOTPSlot index={5} aria-invalid />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-sm text-destructive">
          That code has expired. Request a new one.
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Label htmlFor="otp-preview-disabled">Locked after 5 attempts</Label>
        <InputOTP id="otp-preview-disabled" maxLength={6} value="88" disabled>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  )
}
