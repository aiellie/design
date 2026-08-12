"use client"

import * as React from "react"
import { addDays } from "date-fns"
import { type DateRange } from "react-day-picker"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const presets = [
  { label: "Today", value: 0 },
  { label: "Tomorrow", value: 1 },
  { label: "In 3 days", value: 3 },
  { label: "In a week", value: 7 },
  { label: "In 2 weeks", value: 14 },
]

const modes = [
  { label: "Single", value: "single" },
  { label: "Range", value: "range" },
] as const

type Mode = (typeof modes)[number]["value"]

const bookedDates = Array.from(
  { length: 12 },
  (_, i) => new Date(new Date().getFullYear(), new Date().getMonth(), 8 + i)
)

export function CalendarExample() {
  const [mode, setMode] = React.useState<Mode>("single")
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 6)
  )
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 6),
    to: addDays(
      new Date(new Date().getFullYear(), new Date().getMonth(), 6),
      4
    ),
  })
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  )

  const modeLabel = modes.find((item) => item.value === mode)?.label ?? "Single"

  function selectPreset(days: number) {
    const from = new Date()
    const to = addDays(from, days)

    if (mode === "single") {
      setDate(to)
    } else {
      setDateRange({ from, to })
    }

    setCurrentMonth(new Date(to.getFullYear(), to.getMonth(), 1))
  }

  const calendarProps = {
    month: currentMonth,
    onMonthChange: setCurrentMonth,
    fixedWeeks: true,
    captionLayout: "dropdown" as const,
    disabled: bookedDates,
    modifiers: {
      booked: bookedDates,
    },
    modifiersClassNames: {
      booked: "[&>button]:line-through opacity-100",
    },
    className: "p-0 [--cell-size:--spacing(9.5)]",
  }

  return (
    <Card className="mx-auto w-fit max-w-[300px]" size="sm">
      <CardContent>
        {mode === "single" ? (
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            {...calendarProps}
          />
        ) : (
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            {...calendarProps}
          />
        )}
      </CardContent>
      <CardFooter className="flex gap-2 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="flex-1">
                {modeLabel}
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  strokeWidth={2}
                  data-icon="inline-end"
                />
              </Button>
            }
          />
          <DropdownMenuContent align="start" className="w-(--anchor-width)">
            <DropdownMenuRadioGroup
              value={mode}
              onValueChange={(value) => setMode(value as Mode)}
            >
              {modes.map((item) => (
                <DropdownMenuRadioItem key={item.value} value={item.value}>
                  {item.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="flex-1">
                Quick select
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  strokeWidth={2}
                  data-icon="inline-end"
                />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-(--anchor-width)">
            <DropdownMenuGroup>
              {presets.map((preset) => (
                <DropdownMenuItem
                  key={preset.value}
                  onClick={() => selectPreset(preset.value)}
                >
                  {preset.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}
