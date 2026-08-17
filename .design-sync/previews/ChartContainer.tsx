// ChartContainer preview — hand-composed static recharts charts. The repo
// example (examples/ui/chart.tsx) is a motion-animated interactive pie whose
// center label mounts at opacity 0; the capture's frozen clock keeps motion
// values at their initial state, so it can never render legibly. These cells
// keep the example's idiom: chartConfig with var(--chart-N) colors, data-entry
// fills via var(--color-<key>), ChartTooltip/ChartLegend content components,
// and isAnimationActive={false} for reliable static series.
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const trafficData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 173, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const trafficConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function Showcase() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Traffic overview</CardTitle>
        <CardDescription>Unique visitors, January – June</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={trafficConfig} className="w-full">
          <BarChart accessibilityLayer data={trafficData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="desktop"
              fill="var(--color-desktop)"
              radius={4}
              isAnimationActive={false}
            />
            <Bar
              dataKey="mobile"
              fill="var(--color-mobile)"
              radius={4}
              isAnimationActive={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const revenueData = [
  { month: "January", current: 8600, previous: 7100 },
  { month: "February", current: 9300, previous: 7400 },
  { month: "March", current: 8800, previous: 8050 },
  { month: "April", current: 10400, previous: 8600 },
  { month: "May", current: 11200, previous: 9100 },
  { month: "June", current: 12040, previous: 9400 },
]

const revenueConfig = {
  current: {
    label: "This year",
    color: "var(--chart-1)",
  },
  previous: {
    label: "Last year",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function Lines() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Recurring revenue</CardTitle>
        <CardDescription>Monthly, compared to last year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={revenueConfig} className="w-full">
          <LineChart
            accessibilityLayer
            data={revenueData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="current"
              type="monotone"
              stroke="var(--color-current)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              dataKey="previous"
              type="monotone"
              stroke="var(--color-previous)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const planData = [
  { plan: "free", workspaces: 412, fill: "var(--color-free)" },
  { plan: "starter", workspaces: 268, fill: "var(--color-starter)" },
  { plan: "pro", workspaces: 187, fill: "var(--color-pro)" },
  { plan: "enterprise", workspaces: 43, fill: "var(--color-enterprise)" },
]

const planConfig = {
  workspaces: {
    label: "Workspaces",
  },
  free: {
    label: "Free",
    color: "var(--chart-1)",
  },
  starter: {
    label: "Starter",
    color: "var(--chart-2)",
  },
  pro: {
    label: "Pro",
    color: "var(--chart-3)",
  },
  enterprise: {
    label: "Enterprise",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

export function Donut() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Plan mix</CardTitle>
        <CardDescription>Active workspaces by plan</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={planConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={planData}
              dataKey="workspaces"
              nameKey="plan"
              innerRadius={60}
              strokeWidth={5}
              isAnimationActive={false}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
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
                          910
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Workspaces
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="plan" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
