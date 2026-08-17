"use client"

import * as React from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  MoreHorizontalCircle01Icon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const TOTAL_ROWS = 137

export function PaginationExample() {
  return (
    <>
      <PaginationBasic />
    </>
  )
}

type PageItem = number | { type: "ellipsis"; pages: number[] }

/** Windowed page list, with an ellipsis standing in for the hidden pages. */
function getPageItems(
  page: number,
  totalPages: number,
  siblings = 1
): PageItem[] {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, index) => start + index)
  const ellipsis = (start: number, end: number) => ({
    type: "ellipsis" as const,
    pages: range(start, end),
  })

  const edgeCount = siblings * 2 + 3
  if (totalPages <= edgeCount + 2) {
    return range(1, totalPages)
  }

  const showStartEllipsis = page - siblings > 2
  const showEndEllipsis = page + siblings < totalPages - 1

  if (!showStartEllipsis) {
    return [
      ...range(1, edgeCount),
      ellipsis(edgeCount + 1, totalPages - 1),
      totalPages,
    ]
  }
  if (!showEndEllipsis) {
    return [
      1,
      ellipsis(2, totalPages - edgeCount),
      ...range(totalPages - edgeCount + 1, totalPages),
    ]
  }
  return [
    1,
    ellipsis(2, page - siblings - 1),
    ...range(page - siblings, page + siblings),
    ellipsis(page + siblings + 1, totalPages - 1),
    totalPages,
  ]
}

const ROWS_PER_PAGE_OPTIONS = [10, 20, 50, 100]

/** Stands in for the ellipsis: jumps to any hidden page, and sets the page size. */
function PageJumpMenu({
  pages,
  page,
  onSelect,
  rowsPerPage,
  onRowsPerPageChange,
}: {
  pages: number[]
  page: number
  onSelect: (page: number) => void
  rowsPerPage: number
  onRowsPerPageChange: (rowsPerPage: number) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="More pages">
            <HugeiconsIcon icon={MoreHorizontalCircle01Icon} strokeWidth={2} />
          </Button>
        }
      />
      <DropdownMenuContent align="center" className="w-auto min-w-40">
        <DropdownMenuRadioGroup
          value={page}
          onValueChange={(value) => onSelect(value as number)}
        >
          {pages.map((pageNumber) => (
            <DropdownMenuRadioItem key={pageNumber} value={pageNumber}>
              Page {pageNumber}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Rows per page</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={rowsPerPage}
              onValueChange={(value) => onRowsPerPageChange(value as number)}
            >
              {ROWS_PER_PAGE_OPTIONS.map((option) => (
                <DropdownMenuRadioItem key={option} value={option}>
                  {option}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function PaginationBasic({ className }: { className?: string }) {
  const [page, setPage] = React.useState(1)
  const [rowsPerPage, setRowsPerPage] = React.useState(
    ROWS_PER_PAGE_OPTIONS[0]
  )
  const totalPages = Math.ceil(TOTAL_ROWS / rowsPerPage)

  const handleRowsPerPageChange = (next: number) => {
    setRowsPerPage(next)
    setPage((current) => Math.min(current, Math.ceil(TOTAL_ROWS / next)))
  }

  return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Go to previous page"
                    disabled={page === 1}
                    onClick={() =>
                      setPage((current) => Math.max(1, current - 1))
                    }
                  >
                    <HugeiconsIcon
                      icon={ArrowLeft01Icon}
                      strokeWidth={2}
                      className="cn-rtl-flip"
                    />
                  </Button>
                }
              />
              <TooltipContent>Previous</TooltipContent>
            </Tooltip>
          </PaginationItem>
          {getPageItems(page, totalPages).map((item, index) =>
            typeof item === "object" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PageJumpMenu
                  pages={item.pages}
                  page={page}
                  onSelect={setPage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink
                  href="#"
                  isActive={item === page}
                  onClick={(event) => {
                    event.preventDefault()
                    setPage(item)
                  }}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Go to next page"
                    disabled={page === totalPages}
                    onClick={() =>
                      setPage((current) => Math.min(totalPages, current + 1))
                    }
                  >
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      strokeWidth={2}
                      className="cn-rtl-flip"
                    />
                  </Button>
                }
              />
              <TooltipContent>Next</TooltipContent>
            </Tooltip>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
  )
}
