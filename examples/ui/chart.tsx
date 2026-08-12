"use client"

import * as React from "react"
import { animate, motion, useMotionValue, useMotionValueEvent } from "motion/react"
import { Label, Pie, PieChart, Sector } from "recharts"
import type { PieSectorShapeProps } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "An interactive pie chart"

const desktopData = [
  { month: "january", desktop: 186, fill: "var(--color-january)" },
  { month: "february", desktop: 305, fill: "var(--color-february)" },
  { month: "march", desktop: 237, fill: "var(--color-march)" },
  { month: "april", desktop: 173, fill: "var(--color-april)" },
  { month: "may", desktop: 209, fill: "var(--color-may)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "January",
    color: "var(--chart-1)",
  },
  february: {
    label: "February",
    color: "var(--chart-2)",
  },
  march: {
    label: "March",
    color: "var(--chart-3)",
  },
  april: {
    label: "April",
    color: "var(--chart-4)",
  },
  may: {
    label: "May",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

const spring = { type: "spring" as const, stiffness: 320, damping: 28, mass: 0.8 }

function AnimatedSector({
  isActive,
  outerRadius = 0,
  onSelect,
  ...props
}: PieSectorShapeProps & {
  isActive: boolean
  onSelect: () => void
}) {
  const radius = useMotionValue(isActive ? outerRadius + 10 : outerRadius)
  const ringOpacity = useMotionValue(isActive ? 1 : 0)
  const [currentRadius, setCurrentRadius] = React.useState(
    isActive ? outerRadius + 10 : outerRadius
  )
  const [currentRingOpacity, setCurrentRingOpacity] = React.useState(
    isActive ? 1 : 0
  )

  useMotionValueEvent(radius, "change", setCurrentRadius)
  useMotionValueEvent(ringOpacity, "change", setCurrentRingOpacity)

  React.useEffect(() => {
    const radiusAnim = animate(
      radius,
      isActive ? outerRadius + 10 : outerRadius,
      spring
    )
    const opacityAnim = animate(ringOpacity, isActive ? 1 : 0, {
      ...spring,
      stiffness: 380,
    })

    return () => {
      radiusAnim.stop()
      opacityAnim.stop()
    }
  }, [isActive, outerRadius, radius, ringOpacity])

  return (
    <g className="cursor-pointer" onClick={onSelect}>
      <Sector {...props} outerRadius={currentRadius} />
      {currentRingOpacity > 0.01 ? (
        <Sector
          {...props}
          outerRadius={currentRadius + 15}
          innerRadius={currentRadius + 2}
          style={{
            ...props.style,
            opacity: currentRingOpacity,
          }}
        />
      ) : null}
    </g>
  )
}

export function ChartExample() {
  const id = "pie-interactive"
  const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month)

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.month === activeMonth),
    [activeMonth]
  )
  const months = React.useMemo(() => desktopData.map((item) => item.month), [])
  const activeValue = desktopData[activeIndex].desktop

  const monthItems = React.useMemo(
    () =>
      months.map((key) => {
        const config = chartConfig[key as keyof typeof chartConfig]

        return {
          value: key,
          label: (
            <span className="flex items-center gap-2">
              <span
                className="inline-block size-2 shrink-0 rounded-full"
                style={{
                  backgroundColor:
                    config && "color" in config ? config.color : undefined,
                }}
                aria-hidden
              />
              {config?.label}
            </span>
          ),
        }
      }),
    [months]
  )

  const renderPieShape = React.useCallback(
    (shapeProps: PieSectorShapeProps) => {
      const { index } = shapeProps

      return (
        <AnimatedSector
          {...shapeProps}
          isActive={index === activeIndex}
          onSelect={() => {
            if (typeof index === "number") {
              setActiveMonth(desktopData[index].month)
            }
          }}
        />
      )
    },
    [activeIndex]
  )

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Pie Chart - Interactive</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <Select
          items={monthItems}
          value={activeMonth}
          onValueChange={(value) => {
            if (value) setActiveMonth(value)
          }}
        >
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig]

              if (!config) {
                return null
              }

              return (
                <SelectItem key={key} value={key}>
                  <span className="flex items-center gap-2">
                    <span
                      className="inline-block size-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          "color" in config ? config.color : undefined,
                      }}
                      aria-hidden
                    />
                    {config.label}
                  </span>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              shape={renderPieShape}
              isAnimationActive
              animationDuration={800}
              animationBegin={0}
              onClick={(_, index) => {
                setActiveMonth(desktopData[index].month)
              }}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <motion.g
                        key={activeMonth}
                        initial={{ opacity: 0, scale: 0.86 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={spring}
                        style={{
                          transformOrigin: `${viewBox.cx}px ${viewBox.cy}px`,
                        }}
                      >
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {activeValue.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Visitors
                          </tspan>
                        </text>
                      </motion.g>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
