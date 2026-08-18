"use client"

import {
  TailwindColorPicker,
  TailwindSwatch,
  getTailwindColor,
} from "@/components/color/tailwind-color-picker"
import { useState } from "react"

export function TailwindColorPickerExample() {
  const [color, setColor] = useState<string | null>("blue-500")
  const selected = color ? getTailwindColor(color) : undefined

  return (
    <div className="flex items-center gap-4">
      <TailwindColorPicker onValueChange={setColor} value={color} />
      <div className="flex items-center gap-2 text-sm">
        <TailwindSwatch color={selected} />
        {selected ? (
          <>
            <span className="font-medium">{selected.name}</span>
            <span className="font-mono text-xs text-muted-foreground">
              {selected.value}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">No color selected</span>
        )}
      </div>
    </div>
  )
}
