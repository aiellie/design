"use client"

import * as React from "react"

import { Bubble, BubbleContent } from '@/components/ui/bubble'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { DirectionProvider } from '@/components/ui/direction'
import { Slider } from '@/components/ui/slider'

export function DirectionExample() {
  const [direction, setDirection] = React.useState<"ltr" | "rtl">("ltr")

  return (
    <div className="flex w-full flex-col gap-4">
      <ButtonGroup>
        <Button
          variant={direction === "ltr" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setDirection("ltr")}
        >
          LTR
        </Button>
        <Button
          variant={direction === "rtl" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setDirection("rtl")}
        >
          RTL
        </Button>
      </ButtonGroup>
      <DirectionProvider direction={direction}>
        <div
          dir={direction}
          className="flex flex-col gap-3 rounded-xl border p-3"
        >
          <Bubble variant="muted">
            <BubbleContent>Hey — how far along is the transfer?</BubbleContent>
          </Bubble>
          <Bubble align="end">
            <BubbleContent>Almost there, about 70%.</BubbleContent>
          </Bubble>
          <div className="flex items-center gap-3 pt-1">
            <span className="text-xs font-medium text-muted-foreground">
              70%
            </span>
            <Slider
              defaultValue={[70]}
              max={100}
              aria-label="Transfer progress"
              className="flex-1"
            />
          </div>
        </div>
      </DirectionProvider>
    </div>
  )
}
