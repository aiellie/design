"use client"

import * as React from "react"
import { ArrowDown01Icon, Clock01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export interface TimePickerProps {
  /** Always 24-hour `HH:mm`, whatever the display format is. */
  value: string
  onValueChange: (value: string) => void
  /** Show and pick in 12-hour time with a meridiem column. */
  hour12?: boolean
  /** Minutes between options; 5 gives a workable column length. */
  minuteStep?: number
  /** Restrict the hour column, e.g. to a working day. */
  minHour?: number
  maxHour?: number
  id?: string
  disabled?: boolean
  placeholder?: string
  className?: string
  "aria-label"?: string
}

const pad = (value: number) => String(value).padStart(2, "0")

/** Anything unparseable reads as midnight rather than as `NaN:NaN`. */
function parse(value: string) {
  const [hour, minute] = value.split(":").map(Number)
  return {
    hour: Number.isFinite(hour) ? Math.min(Math.max(hour, 0), 23) : 0,
    minute: Number.isFinite(minute) ? Math.min(Math.max(minute, 0), 59) : 0,
  }
}

export function formatTimeValue(value: string, hour12 = false) {
  const { hour, minute } = parse(value)
  if (!hour12) return `${pad(hour)}:${pad(minute)}`
  const suffix = hour < 12 ? "AM" : "PM"
  const twelve = hour % 12 === 0 ? 12 : hour % 12
  return `${twelve}:${pad(minute)} ${suffix}`
}

function Column({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string
  options: { value: number; label: string }[]
  selected: number
  onSelect: (value: number) => void
}) {
  const listRef = React.useRef<HTMLDivElement>(null)

  /* Centers the current value as the column mounts, so the popover opens on
     the time you already have. `scrollTop` rather than `scrollIntoView`,
     which walks up to the nearest scrollable ancestor and would move the
     dialog behind the popover instead of the column inside it. */
  React.useLayoutEffect(() => {
    const list = listRef.current
    const active = list?.querySelector<HTMLElement>("[data-active=true]")
    if (!list || !active || !list.clientHeight) return
    list.scrollTop =
      active.offsetTop - list.clientHeight / 2 + active.offsetHeight / 2
  }, [])

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <span className="px-1 pt-2 pb-1 text-center text-[10px] font-medium text-muted-foreground uppercase">
        {label}
      </span>
      <div
        ref={listRef}
        className="flex max-h-52 flex-col gap-0.5 overflow-y-auto px-1 pb-1"
      >
        {options.map((option) => {
          const isSelected = option.value === selected
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              data-active={isSelected || undefined}
              onClick={() => onSelect(option.value)}
              className={cn(
                "shrink-0 cursor-pointer rounded-md px-2 py-1 text-center text-sm tabular-nums transition-colors",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/**
 * A time field that picks from columns rather than from a native
 * `<input type="time">`, so it looks and behaves the same in every browser
 * and can be restricted to a range of hours.
 */
export function TimePicker({
  value,
  onValueChange,
  hour12 = false,
  minuteStep = 5,
  minHour = 0,
  maxHour = 23,
  id,
  disabled,
  placeholder = "Select time",
  className,
  "aria-label": ariaLabel,
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false)
  const { hour, minute } = parse(value)

  const commit = (nextHour: number, nextMinute: number) =>
    onValueChange(`${pad(nextHour)}:${pad(nextMinute)}`)

  const hours = React.useMemo(() => {
    const range: number[] = []
    for (let index = minHour; index <= maxHour; index++) range.push(index)
    return range
  }, [minHour, maxHour])

  const minutes = React.useMemo(() => {
    const range: number[] = []
    for (let index = 0; index < 60; index += Math.max(minuteStep, 1)) {
      range.push(index)
    }
    // A value off the step grid still needs its own option to select.
    if (!range.includes(minute)) range.push(minute)
    return range.sort((a, b) => a - b)
  }, [minuteStep, minute])

  const isPm = hour >= 12

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            id={id}
            variant="outline"
            disabled={disabled}
            aria-label={ariaLabel}
            data-empty={!value || undefined}
            className={cn(
              "w-full justify-between px-2.5 font-normal data-empty:text-muted-foreground",
              className
            )}
          />
        }
      >
        <span className="flex items-center gap-2">
          <HugeiconsIcon
            aria-hidden
            icon={Clock01Icon}
            strokeWidth={2}
            className="size-4 text-muted-foreground"
          />
          <span className="tabular-nums">
            {value ? formatTimeValue(value, hour12) : placeholder}
          </span>
        </span>
        <HugeiconsIcon
          aria-hidden
          icon={ArrowDown01Icon}
          strokeWidth={2}
          className="size-4 text-muted-foreground"
        />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56 gap-0 p-0">
        <div className="flex divide-x">
          <Column
            label="Hour"
            selected={hour12 ? hour % 12 || 12 : hour}
            options={hours.map((option) => ({
              value: hour12 ? option % 12 || 12 : option,
              label: hour12 ? String(option % 12 || 12) : pad(option),
            }))}
            onSelect={(next) => {
              // In 12-hour mode the column carries 1–12, so the meridiem
              // currently in force decides which half of the day it lands in.
              const nextHour = hour12 ? (next % 12) + (isPm ? 12 : 0) : next
              commit(nextHour, minute)
            }}
          />
          <Column
            label="Min"
            selected={minute}
            options={minutes.map((option) => ({
              value: option,
              label: pad(option),
            }))}
            onSelect={(next) => commit(hour, next)}
          />
          {hour12 && (
            <Column
              label="AM/PM"
              selected={isPm ? 1 : 0}
              options={[
                { value: 0, label: "AM" },
                { value: 1, label: "PM" },
              ]}
              onSelect={(next) =>
                commit((hour % 12) + (next === 1 ? 12 : 0), minute)
              }
            />
          )}
        </div>
        <Separator />
        <div className="flex items-center justify-between gap-2 p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const now = new Date()
              commit(now.getHours(), now.getMinutes())
            }}
          >
            Now
          </Button>
          <Button size="sm" onClick={() => setOpen(false)}>
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
