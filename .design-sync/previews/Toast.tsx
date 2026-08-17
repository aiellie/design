// Toast preview — toasts exist only after toast.add(), so the primary cell
// fires a small stack from an effect and renders <Toaster /> so real toasts
// are in the shot. timeout: 0 keeps them from auto-dismissing before the
// screenshot (the capture's frozen clock does NOT stop timers). The effect
// cleanup closes them so a double-invoked effect can't duplicate the stack.
import * as React from "react"

import { Toaster, toast } from "@/components/ui/toast"

export function Showcase() {
  React.useEffect(() => {
    const ids = [
      toast.add({
        type: "info",
        title: "New comment",
        description: "Mia replied on the pricing page.",
        timeout: 0,
      }),
      toast.add({
        title: "Conversation archived",
        actionProps: { children: "Undo" },
        timeout: 0,
      }),
      toast.add({
        type: "success",
        title: "Changes published",
        description: "Design tokens synced to production.",
        timeout: 0,
      }),
    ]

    return () => ids.forEach((id) => toast.close(id))
  }, [])

  return (
    <div
      className="flex w-full items-center justify-center"
      style={{ minHeight: "26rem" }}
    >
      <p className="text-sm text-muted-foreground">
        Toasts stack in the bottom-right corner of the viewport.
      </p>
      <Toaster />
    </div>
  )
}

export { ToastExample as Triggers } from "@/examples/ui/toast"
