"use client"

import * as React from "react"

import { TimePicker } from "@/components/locale/time-picker"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

export function TimePickerExample() {
  const [reminder, setReminder] = React.useState("09:30")
  const [slot, setSlot] = React.useState("14:15")

  return (
    <div className="flex w-full items-center justify-center">
      <FieldGroup className="w-full max-w-sm">
        <Field>
          <FieldLabel htmlFor="time-picker-reminder">Reminder</FieldLabel>
          <TimePicker
            id="time-picker-reminder"
            value={reminder}
            onValueChange={setReminder}
          />
          <FieldDescription>
            24-hour time in 5-minute steps. The value is always{" "}
            <code className="font-mono text-xs">HH:mm</code>, whatever the
            display format is.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="time-picker-slot">Appointment</FieldLabel>
          <TimePicker
            id="time-picker-slot"
            value={slot}
            onValueChange={setSlot}
            hour12
            minuteStep={15}
            minHour={9}
            maxHour={17}
          />
          <FieldDescription>
            The same picker in 12-hour mode, restricted to a 9–17 working day.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  )
}
