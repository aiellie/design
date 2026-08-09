"use client"

import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"

export function NativeSelectExample() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="native-select-timezone">Timezone</Label>
        <NativeSelect
          id="native-select-timezone"
          defaultValue="pst"
          className="w-full"
        >
          <NativeSelectOptGroup label="North America">
            <NativeSelectOption value="pst">
              Pacific Time (PST)
            </NativeSelectOption>
            <NativeSelectOption value="mst">
              Mountain Time (MST)
            </NativeSelectOption>
            <NativeSelectOption value="cst">
              Central Time (CST)
            </NativeSelectOption>
            <NativeSelectOption value="est">
              Eastern Time (EST)
            </NativeSelectOption>
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="Europe">
            <NativeSelectOption value="gmt">
              Greenwich Mean Time (GMT)
            </NativeSelectOption>
            <NativeSelectOption value="cet">
              Central European Time (CET)
            </NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="native-select-language">Language (small)</Label>
        <NativeSelect
          id="native-select-language"
          size="sm"
          defaultValue="en"
          className="w-full"
        >
          <NativeSelectOption value="en">English</NativeSelectOption>
          <NativeSelectOption value="fr">French</NativeSelectOption>
          <NativeSelectOption value="de">German</NativeSelectOption>
          <NativeSelectOption value="ja">Japanese</NativeSelectOption>
        </NativeSelect>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="native-select-region" className="opacity-50">
          Region
        </Label>
        <NativeSelect
          id="native-select-region"
          defaultValue="us-west"
          disabled
          className="w-full"
        >
          <NativeSelectOption value="us-west">
            US West (Oregon)
          </NativeSelectOption>
          <NativeSelectOption value="us-east">
            US East (Virginia)
          </NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  )
}
