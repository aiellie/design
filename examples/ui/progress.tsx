"use client"

import * as React from "react"

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"

export function ProgressExample() {
  const [uploadValue, setUploadValue] = React.useState(13)
  const [value, setValue] = React.useState(50)

  React.useEffect(() => {
    const timer = setTimeout(() => setUploadValue(66), 700)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex w-full flex-col gap-6">
      <Progress value={uploadValue}>
        <ProgressLabel>Uploading assets</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={88}>
        <ProgressLabel>Storage used</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={40} aria-label="Onboarding progress" />
      <Progress value={value} className="w-full" />
     <Slider
       value={value}
       onValueChange={(value) => setValue(value as number)}
       min={0}
       max={100}
       step={1}
     />
    </div>

  )
}
