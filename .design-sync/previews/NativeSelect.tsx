// NativeSelect preview — the repo's department-select showcase from
// examples/ui/native-select.tsx, plus the size axis and disabled/invalid
// states.
import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

export { NativeSelectExample as Showcase } from "@/examples/ui/native-select"

export function Sizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="native-select-preview-default">Accent color</Label>
        <NativeSelect
          id="native-select-preview-default"
          className="w-full"
          defaultValue="violet"
        >
          <NativeSelectOption value="violet">
            Violet (brand default)
          </NativeSelectOption>
          <NativeSelectOption value="indigo">Indigo</NativeSelectOption>
          <NativeSelectOption value="rose">Rose</NativeSelectOption>
        </NativeSelect>
      </div>
      <div className="space-y-2">
        <Label htmlFor="native-select-preview-sm">Base font size (sm)</Label>
        <NativeSelect
          id="native-select-preview-sm"
          size="sm"
          className="w-full"
          defaultValue="14"
        >
          <NativeSelectOption value="13">13px</NativeSelectOption>
          <NativeSelectOption value="14">14px</NativeSelectOption>
          <NativeSelectOption value="16">16px</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  )
}

export function States() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="native-select-preview-disabled">Legacy theme</Label>
        <NativeSelect
          id="native-select-preview-disabled"
          className="w-full"
          disabled
          defaultValue="classic"
        >
          <NativeSelectOption value="classic">
            Classic (read-only)
          </NativeSelectOption>
        </NativeSelect>
      </div>
      <div className="space-y-2">
        <Label htmlFor="native-select-preview-invalid">Billing region</Label>
        <NativeSelect
          id="native-select-preview-invalid"
          className="w-full"
          aria-invalid
          defaultValue=""
        >
          <NativeSelectOption value="">Select a region</NativeSelectOption>
          <NativeSelectOption value="us">United States</NativeSelectOption>
          <NativeSelectOption value="eu">European Union</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  )
}
