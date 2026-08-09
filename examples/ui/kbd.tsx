"use client"

import { Kbd, KbdGroup } from "@/components/ui/kbd"

const shortcuts = [
  { action: "Open command palette", keys: ["⌘", "K"] },
  { action: "Search files", keys: ["⌘", "J"] },
  { action: "Toggle sidebar", keys: ["⌘", "B"] },
  { action: "Save all changes", keys: ["⌘", "⇧", "S"] },
]

export function KbdExample() {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-col divide-y rounded-lg border">
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.action}
            className="flex items-center justify-between px-3 py-2"
          >
            <span className="text-sm">{shortcut.action}</span>
            <KbdGroup>
              {shortcut.keys.map((key) => (
                <Kbd key={key}>{key}</Kbd>
              ))}
            </KbdGroup>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Press <Kbd>?</Kbd> anywhere to view every shortcut, or hit{" "}
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span className="text-xs">+</span>
          <Kbd>Enter</Kbd>
        </KbdGroup>{" "}
        to submit the form.
      </p>
    </div>
  )
}
