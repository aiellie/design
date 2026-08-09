"use client"

import * as React from "react"

import { StatusBadge, statusConfig, statusOrder } from "@/components/status-badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { allExamples, exampleCategories } from "@/examples"
import { Icon } from "@/icons/icons"

export function DashboardOverview({
  onSelect,
}: {
  onSelect: (slug: string) => void
}) {
  const total = allExamples.length
  const counts = Object.fromEntries(
    statusOrder.map((status) => [
      status,
      allExamples.filter((example) => example.status === status).length,
    ])
  ) as Record<(typeof statusOrder)[number], number>
  const completion = Math.round((counts.approved / total) * 100)

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Completion</CardTitle>
          <CardDescription>
            {counts.approved} of {total} examples approved
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight">
              {completion}%
            </span>
            <span className="text-sm text-muted-foreground">complete</span>
          </div>
          <Progress value={completion} aria-label="Overall completion" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[...statusOrder].reverse().map((status) => (
          <Card key={status}>
            <CardContent className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span
                  className={`size-2 rounded-full ${statusConfig[status].dot}`}
                  aria-hidden
                />
                {statusConfig[status].label}
              </div>
              <div className="text-2xl font-semibold tracking-tight">
                {counts[status]}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Approved examples per category.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {exampleCategories.map((category) => {
            const done = category.examples.filter(
              (example) => example.status === "approved"
            ).length
            const pct = Math.round((done / category.examples.length) * 100)
            return (
              <div key={category.title} className="flex items-center gap-4">
                <div className="w-40 shrink-0 truncate text-sm">
                  {category.title}
                </div>
                <Progress
                  value={pct}
                  className="flex-1"
                  aria-label={`${category.title} completion`}
                />
                <div className="w-12 shrink-0 text-right font-mono text-xs text-muted-foreground">
                  {done}/{category.examples.length}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All items</CardTitle>
          <CardDescription>
            Click a row to focus on that example.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allExamples.map((example) => (
                <TableRow
                  key={example.slug}
                  className="cursor-pointer"
                  onClick={() => onSelect(example.slug)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2 font-medium">
                      <Icon
                        icon={example.icon}
                        className="size-4 text-muted-foreground"
                      />
                      {example.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {example.categoryTitle}
                  </TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={example.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
