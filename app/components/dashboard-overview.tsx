"use client"

import * as React from "react"

import { CategoryIcon } from "@/app/components/category-icon"
import { statusOf, useStatuses } from "@/app/components/status-provider"
import { StatusSelect } from "@/app/components/status-select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { allExamples, categoryByTitle, exampleCategories } from "@/examples"
import { exampleStatuses } from "@/examples/status"
import { Icon } from "@/icons/icons"

export function DashboardOverview({
  onSelect,
}: {
  onSelect: (slug: string) => void
}) {
  const { statuses } = useStatuses()
  const total = allExamples.length
  const counts = exampleStatuses.map((status) => ({
    ...status,
    count: allExamples.filter(
      (example) => statusOf(statuses, example.slug) === status.id
    ).length,
  }))
  const shipped = counts.find((status) => status.id === "shipped")?.count ?? 0
  const completion = Math.round((shipped / total) * 100)
  // Latest workflow stages first, so completed work sits on the left.
  const distribution = [...counts].reverse().filter((s) => s.count > 0)

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6">
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
                  <TableCell>
                    <div
                      className="inline-flex"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <CategoryPopover title={example.categoryTitle} />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div
                      className="inline-flex"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <StatusSelect slug={example.slug} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    </div>
  )
}


/**
 * Category icon in the items table — click it for the category's name and
 * where its examples stand.
 */
function CategoryPopover({ title }: { title: string }) {
  const { statuses } = useStatuses()
  const category = categoryByTitle[title]
  const total = category.examples.length
  const counts = exampleStatuses
    .map((status) => ({
      ...status,
      count: category.examples.filter(
        (example) => statusOf(statuses, example.slug) === status.id
      ).length,
    }))
    .filter((status) => status.count > 0)
    .reverse()
  const shipped = category.examples.filter(
    (example) => statusOf(statuses, example.slug) === "shipped"
  ).length

  return (
    <Popover>
      <PopoverTrigger
        aria-label={`${category.title} category`}
        className="inline-flex cursor-pointer rounded-md outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        <CategoryIcon category={category} />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-60">
        <PopoverHeader className="flex-row items-center gap-2">
          <CategoryIcon category={category} />
          <div className="flex flex-col">
            <PopoverTitle>{category.title}</PopoverTitle>
            <PopoverDescription>
              {shipped} of {total} shipped
            </PopoverDescription>
          </div>
        </PopoverHeader>
        <Progress
          value={Math.round((shipped / total) * 100)}
          aria-label={`${category.title} completion`}
        />
        <div className="flex flex-col gap-1">
          {counts.map((status) => (
            <div
              key={status.id}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <span
                className={`size-2 rounded-full ${status.color}`}
                aria-hidden
              />
              {status.label}
              <span className="ms-auto font-mono">{status.count}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
