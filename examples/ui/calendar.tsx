"use client"

import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"

export function CalendarExample() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 7, 9),
    to: new Date(2026, 7, 14),
  })

  return (
    <div className="flex w-full justify-center py-2">
      <Calendar
        mode="range"
        defaultMonth={new Date(2026, 7, 9)}
        selected={range}
        onSelect={setRange}
        numberOfMonths={1}
        className="rounded-lg border shadow-sm"
      />
    </div>
  )
}
