"use client"

import { useState } from "react"

import {
  ApprovalMenu,
  APPROVAL_MODES,
  type ApprovalMode,
} from "@/components/chat/approval-menu"

const Example = () => {
  const [mode, setMode] = useState<ApprovalMode>("ask")
  const active = APPROVAL_MODES.find((item) => item.value === mode)

  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-3 p-8">
      <ApprovalMenu value={mode} onValueChange={setMode} />
    </div>
  )
}

export function ApprovalMenuExample() {
  return <Example />
}
