"use client"

import * as React from "react"

import { ColorPicker } from "@/components/color/color-picker"

const DEFAULTS = {
  background: "#fdf6e3",
  foreground: "#1c1917",
  accent: "#8b5cf6",
} as const

type ColorKey = keyof typeof DEFAULTS

const rows: { key: ColorKey; label: string }[] = [
  { key: "background", label: "Background" },
  { key: "foreground", label: "Foreground" },
  { key: "accent", label: "Accent" },
]

export function ColorPickerExample() {
  const [colors, setColors] =
    React.useState<Record<ColorKey, string>>(DEFAULTS)

  const setColor = (key: ColorKey, value: string) =>
    setColors((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-3">
        <div
          className="flex h-28 w-full flex-col items-center justify-center gap-2 rounded-xl border border-border/60"
          style={{ background: colors.background }}
        >
          <span
            className="text-sm font-medium"
            style={{ color: colors.foreground }}
          >
            The quick brown fox
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-[11px] font-medium text-white"
            style={{ background: colors.accent }}
          >
            Accent
          </span>
        </div>
        <div className="flex w-full flex-col gap-1.5">
          {rows.map(({ key, label }) => {
            const isDefault = colors[key] === DEFAULTS[key]
            return (
              <ColorPicker
                key={key}
                label={label}
                value={colors[key]}
                onValueChange={(value) => setColor(key, value)}
                displayValue={isDefault ? "Auto" : undefined}
                onReset={
                  isDefault ? undefined : () => setColor(key, DEFAULTS[key])
                }
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
