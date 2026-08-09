"use client"

import * as React from "react"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function SliderExample() {
  const [volume, setVolume] = React.useState<number[]>([65])
  const handleVolumeChange = React.useCallback(
    (value: number | readonly number[]) => {
      if (typeof value === "number") {
        setVolume([value])
      } else {
        setVolume([...value])
      }
    },
    []
  )

  const [priceRange, setPriceRange] = React.useState<number[]>([200, 750])
  const handlePriceRangeChange = React.useCallback(
    (value: number | readonly number[]) => {
      if (typeof value === "number") {
        setPriceRange([value])
      } else {
        setPriceRange([...value])
      }
    },
    []
  )

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Label>Volume</Label>
          <span className="text-sm text-muted-foreground tabular-nums">
            {volume[0]}%
          </span>
        </div>
        <Slider
          value={volume}
          onValueChange={handleVolumeChange}
          min={0}
          max={100}
          step={1}
          aria-label="Volume"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Label>Price range</Label>
          <span className="text-sm text-muted-foreground tabular-nums">
            ${priceRange[0]} – ${priceRange[1]}
          </span>
        </div>
        <Slider
          value={priceRange}
          onValueChange={handlePriceRangeChange}
          min={0}
          max={1000}
          step={10}
          aria-label="Price range"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label className="opacity-50">Brightness (locked)</Label>
        <Slider
          defaultValue={[40]}
          min={0}
          max={100}
          step={1}
          disabled
          aria-label="Brightness"
        />
      </div>
    </div>
  )
}
