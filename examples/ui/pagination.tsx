"use client"

import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const TOTAL_PAGES = 12

export function PaginationExample() {
  const [page, setPage] = React.useState(2)

  const goTo =
    (target: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      setPage(Math.min(Math.max(target, 1), TOTAL_PAGES))
    }

  const start = Math.min(Math.max(page - 1, 1), TOTAL_PAGES - 3)
  const pages = [start, start + 1, start + 2]
  const showEllipsis = start + 2 < TOTAL_PAGES - 1

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={goTo(page - 1)}
              aria-disabled={page === 1}
              className={
                page === 1 ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>
          {pages.map((n) => (
            <PaginationItem key={n}>
              <PaginationLink href="#" isActive={page === n} onClick={goTo(n)}>
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
          {showEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive={page === TOTAL_PAGES}
              onClick={goTo(TOTAL_PAGES)}
            >
              {TOTAL_PAGES}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={goTo(page + 1)}
              aria-disabled={page === TOTAL_PAGES}
              className={
                page === TOTAL_PAGES
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p className="text-xs text-muted-foreground">
        Page {page} of {TOTAL_PAGES}
      </p>
    </div>
  )
}
