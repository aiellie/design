"use client"

import * as React from "react"

import { StatusBadge } from "@/app/components/status-badge"
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
import { exampleStatuses } from "@/examples/status"
import { Icon } from "@/icons/icons"

export function DashboardOverview({
  onSelect,
}: {
  onSelect: (slug: string) => void
}) {
  const total = allExamples.length
  const counts = exampleStatuses.map((status) => ({
    ...status,
    count: allExamples.filter((example) => example.status === status.id)
      .length,
  }))
  const shipped = counts.find((status) => status.id === "shipped")?.count ?? 0
  const completion = Math.round((shipped / total) * 100)
  // Latest workflow stages first, so completed work sits on the left.
  const distribution = [...counts].reverse().filter((s) => s.count > 0)

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
          <CardDescription>
            {shipped} of {total} examples shipped
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight">
              {completion}%
            </span>
            <span className="text-sm text-muted-foreground">shipped</span>
          </div>
          <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
            {distribution.map((status) => (
              <div
                key={status.id}
                className={status.color}
                style={{ width: `${(status.count / total) * 100}%` }}
                title={`${status.label}: ${status.count}`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {[...counts].reverse().map((status) => (
              <div
                key={status.id}
                className="flex items-center gap-1.5 text-sm text-muted-foreground"
                title={status.description}
              >
                <span
                  className={`size-2 rounded-full ${status.color}`}
                  aria-hidden
                />
                {status.label}
                <span className="font-mono text-xs">{status.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Shipped examples per category.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {exampleCategories.map((category) => {
            const done = category.examples.filter(
              (example) => example.status === "shipped"
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
