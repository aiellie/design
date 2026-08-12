"use client"

import * as React from "react"
import {
  ArrowDown01Icon,
  LockIcon,
  VolumeHighIcon,
  VolumeLowIcon,
  VolumeOffIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function SliderExample() {
  const [volume, setVolume] = React.useState<number[]>([65])
  const [muted, setMuted] = React.useState(false)
  const handleVolumeChange = React.useCallback(
    (value: number | readonly number[]) => {
      setMuted(false)
      if (typeof value === "number") {
        setVolume([value])
      } else {
        setVolume([...value])
      }
    },
    []
  )
  const level = muted ? 0 : volume[0]
  const volumeIcon =
    level === 0 ? VolumeOffIcon : level < 50 ? VolumeLowIcon : VolumeHighIcon

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
    <div className="flex w-full items-center justify-center">
      <FieldGroup className="w-full max-w-sm gap-6">
        <Field className="gap-3">
          <div className="flex items-center justify-between">
            <FieldLabel>Volume</FieldLabel>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground tabular-nums">
                {level}%
              </span>
              <ButtonGroup>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label={muted ? "Unmute" : "Mute"}
                        aria-pressed={muted}
                        onClick={() => setMuted((m) => !m)}
                        className="text-muted-foreground aria-pressed:text-destructive"
                      >
                        <HugeiconsIcon icon={volumeIcon} strokeWidth={2} />
                      </Button>
                    }
                  />
                  <TooltipContent>{muted ? "Unmute" : "Mute"}</TooltipContent>
                </Tooltip>
                <Popover>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <PopoverTrigger
                          render={
                            <Button
                              variant="outline"
                              size="icon-sm"
                              aria-label="Adjust volume"
                              className="text-muted-foreground"
                            >
                              <HugeiconsIcon icon={ArrowDown01Icon} />
                            </Button>
                          }
                        />
                      }
                    />
                    <TooltipContent>Adjust volume</TooltipContent>
                  </Tooltip>
                  <PopoverContent
                    align="end"
                    className="w-fit items-center gap-2 px-3 py-4"
                  >
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {level}%
                    </span>
                    <div className="h-40">
                      <Slider
                        orientation="vertical"
                        value={muted ? [0] : volume}
                        onValueChange={handleVolumeChange}
                        min={0}
                        max={100}
                        step={1}
                        aria-label="Volume"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </ButtonGroup>
            </div>
          </div>
        </Field>
        <Field className="gap-3">
          <div className="flex items-center justify-between">
            <FieldLabel>Price range</FieldLabel>
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
          <div className="flex items-center justify-between text-xs text-muted-foreground tabular-nums">
            <span>$0</span>
            <span>$1,000</span>
          </div>
        </Field>
        <Field className="gap-3" data-disabled>
          <div className="flex items-center justify-between">
            <FieldLabel className="gap-1.5">
              Brightness
              <HugeiconsIcon
                icon={LockIcon}
                strokeWidth={2}
                className="size-3.5 text-muted-foreground"
              />
            </FieldLabel>
            <span className="text-sm text-muted-foreground tabular-nums">
              40%
            </span>
          </div>
          <Slider
            defaultValue={[40]}
            min={0}
            max={100}
            step={1}
            disabled
            aria-label="Brightness"
          />
        </Field>
      </FieldGroup>
    </div>
  )
}
