"use client"

import * as React from "react"

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"

export function ProgressExample() {
  const [uploadValue, setUploadValue] = React.useState(13)

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
    </div>
  )
}
