"use client"

import * as React from "react"

import { Field, FieldLabel } from "@/components/ui/field"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons"

const TOTAL_ITEMS = 300
const ROWS_OPTIONS = [
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
  { value: "all", label: "All" },
]

const toRowsPerPage = (value: string) =>
  value === "all" ? TOTAL_ITEMS : Number(value)

/* The ellipsis slot: an icon button that opens a select of every page. */
function JumpToPage({
  page,
  totalPages,
  onSelect,
}: {
  page: number
  totalPages: number
  onSelect: (page: number) => void
}) {
  return (
    <Select
      value={String(page)}
      onValueChange={(value) => onSelect(Number(value))}
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <SelectTrigger
              aria-label="Jump to page"
              className="size-8 justify-center border-transparent bg-transparent p-0 hover:bg-muted hover:text-foreground aria-expanded:bg-muted dark:bg-transparent dark:hover:bg-input/50 [&>svg:last-child]:hidden"
            >
              <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
              <span className="sr-only">Jump to page</span>
            </SelectTrigger>
          }
        />
        <TooltipContent>Jump to page</TooltipContent>
      </Tooltip>
      <SelectContent className="min-w-24">
        <SelectGroup>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <SelectItem key={n} value={String(n)}>
              Page {n}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function PaginationExample() {
  const [rows, setRows] = React.useState("25")
  const [page, setPage] = React.useState(2)

  const rowsPerPage = toRowsPerPage(rows)
  const totalPages = Math.max(1, Math.ceil(TOTAL_ITEMS / rowsPerPage))

  const goTo =
    (target: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      setPage(Math.min(Math.max(target, 1), totalPages))
    }

  const changeRows = (value: string) => {
    setRows(value)
    // Keep the current page in range when the page count shrinks.
    setPage((current) =>
      Math.min(
        current,
        Math.max(1, Math.ceil(TOTAL_ITEMS / toRowsPerPage(value)))
      )
    )
  }

  /* A 4-page window slides with the current page. The jump select sits in
     a fixed slot between the window and the pinned last page, so the
     layout never changes shape: window, jumper, last. */
  const showAll = totalPages <= 5
  const start = Math.min(Math.max(page - 1, 1), Math.max(totalPages - 4, 1))
  const pageItems = showAll
    ? Array.from({ length: totalPages }, (_, i) => i + 1)
    : Array.from({ length: 4 }, (_, i) => start + i)

  const rangeStart = (page - 1) * rowsPerPage + 1
  const rangeEnd = Math.min(page * rowsPerPage, TOTAL_ITEMS)

  const pageLink = (n: number) => (
    <PaginationItem key={n}>
      <PaginationLink href="#" isActive={page === n} onClick={goTo(n)}>
        {n}
      </PaginationLink>
    </PaginationItem>
  )

  return (
    <TooltipProvider>
      <div className="flex w-full max-w-2xl flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
          <Select value={rows} onValueChange={changeRows} items={ROWS_OPTIONS}>
            <SelectTrigger className="w-20" id="select-rows-per-page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                {ROWS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <p className="text-sm text-muted-foreground tabular-nums">
          {rangeStart}&ndash;{rangeEnd} of {TOTAL_ITEMS}
        </p>
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <PaginationLink
                      href="#"
                      aria-label="Go to previous page"
                      onClick={goTo(page - 1)}
                      aria-disabled={page === 1}
                      className={
                        page === 1
                          ? "pointer-events-none opacity-50"
                          : undefined
                      }
                    >
                      <HugeiconsIcon
                        icon={ArrowLeft01Icon}
                        strokeWidth={2}
                        className="cn-rtl-flip"
                      />
                    </PaginationLink>
                  }
                />
                <TooltipContent>Previous page</TooltipContent>
              </Tooltip>
            </PaginationItem>
            {pageItems.map(pageLink)}
            {!showAll && (
              <PaginationItem>
                <JumpToPage
                  page={page}
                  totalPages={totalPages}
                  onSelect={setPage}
                />
              </PaginationItem>
            )}
            {!showAll && pageLink(totalPages)}
            <PaginationItem>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <PaginationLink
                      href="#"
                      aria-label="Go to next page"
                      onClick={goTo(page + 1)}
                      aria-disabled={page === totalPages}
                      className={
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : undefined
                      }
                    >
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        strokeWidth={2}
                        className="cn-rtl-flip"
                      />
                    </PaginationLink>
                  }
                />
                <TooltipContent>Next page</TooltipContent>
              </Tooltip>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </TooltipProvider>
  )
}
