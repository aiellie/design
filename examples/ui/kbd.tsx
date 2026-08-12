"use client"

import { Kbd, KbdGroup } from "@/components/ui/kbd"

const shortcuts = [
  { action: "Open command palette", keys: ["⌘", "K"] },
  { action: "Search files", keys: ["⌘", "J"] },
  { action: "Toggle sidebar", keys: ["⌘", "B"] },
  { action: "Save all changes", keys: ["⌘", "⇧", "S"] },
  { action: "Undo", keys: ["⌘", "Z"] },
  { action: "Redo", keys: ["⌘", "⇧", "Z"] },
  { action: "Find in file", keys: ["⌘", "F"] },
  { action: "Replace", keys: ["⌘", "⌥", "F"] },
  { action: "Go to line", keys: ["⌃", "G"] },
  { action: "Select all", keys: ["⌘", "A"] },
  { action: "Copy", keys: ["⌘", "C"] },
  { action: "Cut", keys: ["⌘", "X"] },
  { action: "Paste", keys: ["⌘", "V"] },
  { action: "New tab", keys: ["⌘", "T"] },
  { action: "Close tab", keys: ["⌘", "W"] },
  { action: "Reopen closed tab", keys: ["⌘", "⇧", "T"] },
  { action: "Switch tab", keys: ["⌃", "Tab"] },
  { action: "Previous tab", keys: ["⌃", "⇧", "Tab"] },
  { action: "Focus next pane", keys: ["⌘", "⌥", "→"] },
  { action: "Move line up", keys: ["⌥", "↑"] },
  { action: "Move line down", keys: ["⌥", "↓"] },
  { action: "Indent", keys: ["Tab"] },
  { action: "Outdent", keys: ["⇧", "Tab"] },
  { action: "Delete word", keys: ["⌥", "⌫"] },
  { action: "Delete forward", keys: ["Fn", "⌦"] },
  { action: "Jump to start", keys: ["⌘", "←"] },
  { action: "Jump to end", keys: ["⌘", "→"] },
  { action: "Page up", keys: ["Fn", "↑"] },
  { action: "Page down", keys: ["Fn", "↓"] },
  { action: "Home", keys: ["Fn", "←"] },
  { action: "End", keys: ["Fn", "→"] },
  { action: "Escape", keys: ["Esc"] },
  { action: "Submit", keys: ["⌘", "↵"] },
  { action: "Help", keys: ["?"] },
  { action: "DevTools", keys: ["⌘", "⌥", "I"] },
  { action: "Hard refresh", keys: ["⌘", "⇧", "R"] },
  { action: "Windows shortcut", keys: ["Ctrl", "Alt", "Del"] },
  { action: "Modifiers", keys: ["⌘", "⇧", "⌥", "⌃"] },
]

const keyGroups = [
  {
    label: "Modifiers",
    keys: ["⌘", "⌃", "⌥", "⇧", "Fn", "Ctrl", "Alt", "Shift", "Cmd", "Win", "Meta"],
  },
  {
    label: "Editing",
    keys: ["↵", "⌫", "⌦", "Esc", "Tab", "Space", "Caps", "Enter", "Return", "Backspace", "Delete"],
  },
  {
    label: "Navigation",
    keys: ["↑", "↓", "←", "→", "Home", "End", "PgUp", "PgDn", "Page Up", "Page Down"],
  },
  {
    label: "Function",
    keys: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
  },
  {
    label: "Letters",
    keys: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  },
  {
    label: "Numbers",
    keys: "0123456789".split(""),
  },
  {
    label: "Symbols",
    keys: [
      "`",
      "~",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "-",
      "_",
      "=",
      "+",
      "[",
      "]",
      "{",
      "}",
      "\\",
      "|",
      ";",
      ":",
      "'",
      '"',
      ",",
      ".",
      "/",
      "?",
      "<",
      ">",
    ],
  },
]

export function KbdExample() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col divide-y rounded-lg border">
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.action}
            className="flex items-center justify-between gap-4 px-3 py-2"
          >
            <span className="text-sm">{shortcut.action}</span>
            <KbdGroup>
              {shortcut.keys.map((key) => (
                <Kbd key={`${shortcut.action}-${key}`}>{key}</Kbd>
              ))}
            </KbdGroup>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {keyGroups.map((group) => (
          <div key={group.label} className="flex flex-col gap-2">
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {group.label}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {group.keys.map((key) => (
                <Kbd key={`${group.label}-${key}`}>{key}</Kbd>
              ))}
            </div>
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
        to submit the form. On macOS try{" "}
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>⌥</Kbd>
          <Kbd>⌃</Kbd>
        </KbdGroup>
        .
      </p>
    </div>
  )
}
