// Calendar preview — every calendar gets a FIXED month + selection (the DS
// capture freezes the page clock, and card renders must never depend on
// "today"). Cells follow the repo example's idiom — card-framed calendar,
// dropdown caption, booked dates struck through — with hand-set props.
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"

const day = (d: number, month = 7) => new Date(2026, month, d)

// The repo example's composition with the dates pinned: August 2026, the
// 12th selected, a booked week disabled and struck out.
export function Showcase() {
  const booked = [day(17), day(18), day(19), day(20), day(21)]

  return (
    <Card className="mx-auto w-fit max-w-[300px]" size="sm">
      <CardContent>
        <Calendar
          mode="single"
          selected={day(12)}
          defaultMonth={day(1)}
          // dropdown captions clamp the visible month to endMonth, which
          // defaults to "today"'s year — pin explicit bounds so the fixed
          // August 2026 month survives the capture's frozen clock.
          startMonth={new Date(2025, 0)}
          endMonth={new Date(2027, 11)}
          fixedWeeks
          captionLayout="dropdown"
          disabled={booked}
          modifiers={{ booked }}
          modifiersClassNames={{
            booked: "[&>button]:line-through opacity-100",
          }}
          className="p-0 [--cell-size:--spacing(9.5)]"
        />
      </CardContent>
    </Card>
  )
}

// Range selection spanning two months.
export function Range() {
  return (
    <Calendar
      mode="range"
      numberOfMonths={2}
      defaultMonth={day(1)}
      selected={{ from: day(28), to: day(4, 8) }}
      className="rounded-xl border"
    />
  )
}

// Default anatomy: label caption, ghost nav buttons, single selection.
export function Basic() {
  return (
    <Calendar
      mode="single"
      selected={day(6)}
      defaultMonth={day(1)}
      className="rounded-xl border"
    />
  )
}
