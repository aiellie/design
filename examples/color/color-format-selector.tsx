"use client"

import * as React from "react"

import { ColorFormatIcon } from "@/components/color/color-format-selector"
import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { InputGroupAddon } from "@/components/ui/input-group"
import { Icon, Icons } from "@/icons/icons"

type ColorFormat = {
  value: string
  label: string
  /** Tailwind violet-500, written in this format. */
  sample: string
}

const formats: ColorFormat[] = [
  { value: "hex", label: "Hex", sample: "#8b5cf6" },
  { value: "rgb", label: "RGB", sample: "rgb(139 92 246)" },
  { value: "hsl", label: "HSL", sample: "hsl(258 90% 66%)" },
  { value: "oklch", label: "OKLCH", sample: "oklch(60.6% 0.25 292.7)" },
  { value: "oklab", label: "OKLAB", sample: "oklab(60.6% 0.097 -0.231)" },
  { value: "cmyk", label: "CMYK", sample: "device-cmyk(43% 63% 0% 4%)" },
  {
    value: "p3",
    label: "Display P3",
    sample: "color(display-p3 0.52 0.37 0.94)",
  },
]

export function ColorFormatSelectorExample() {
  const [format, setFormat] = React.useState<ColorFormat | null>(formats[3])

  return (
    <div className="flex w-full items-center justify-center">
      <FieldGroup className="w-full max-w-sm">
        <Field>
          <FieldLabel htmlFor="color-format-selector">Color format</FieldLabel>
          <Combobox items={formats} value={format} onValueChange={setFormat}>
            <ComboboxTrigger
              render={
                <Button
                  id="color-format-selector"
                  variant="outline"
                  className="w-full justify-between font-normal"
                >
                  <span className="flex items-center gap-2">
                    {format && <ColorFormatIcon format={format.value} />}
                    {format ? format.label : "Select format"}
                  </span>
                </Button>
              }
            />
            <ComboboxContent>
              <ComboboxInput
                showClear={true}
                showTrigger={false}
                placeholder="Search"
              >
                <InputGroupAddon>
                  <Icon
                    icon={Icons.search}
                    strokeWidth={2}
                    className="size-3.5"
                  />
                </InputGroupAddon>
              </ComboboxInput>
              <ComboboxEmpty>No formats found.</ComboboxEmpty>
              <ComboboxList>
                {(item: ColorFormat) => (
                  <ComboboxItem key={item.value} value={item}>
                    <ColorFormatIcon format={item.value} />
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          {format && (
            <div className="flex h-8 items-center gap-2 rounded-lg bg-muted/60 px-3">
              <span
                className="size-4.5 shrink-0 rounded-full border border-border/70"
                style={{ background: "#8b5cf6" }}
              />
              <code className="truncate font-mono text-xs text-muted-foreground">
                {format.sample}
              </code>
            </div>
          )}
          <FieldDescription>
            Search and select a color format.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  )
}
