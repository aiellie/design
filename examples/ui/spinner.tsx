import { Button } from "@/components/ui/button"
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"
import { Badge } from "@/components/ui/badge"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUp01Icon } from "@hugeicons/core-free-icons"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"

export function SpinnerExample() {
  return (
    <div className="mx-auto grid w-full max-w-3xl gap-4 md:grid-cols-2">
      {/* Item — spinner in a muted list row with trailing meta */}
      <Item variant="muted" className="md:col-span-2">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
        </ItemContent>
        <ItemContent className="flex-none justify-end">
          <span className="text-sm tabular-nums">$100.00</span>
        </ItemContent>
      </Item>

      {/* Buttons — inline spinner on disabled loading actions */}
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border p-6">
        <Button disabled size="sm">
          <Spinner data-icon="inline-start" />
          Loading...
        </Button>
        <Button variant="outline" disabled size="sm">
          <Spinner data-icon="inline-start" />
          Please wait
        </Button>
        <Button variant="secondary" disabled size="sm">
          <Spinner data-icon="inline-start" />
          Processing
        </Button>
      </div>

      {/* Badges — compact status chips with spinner */}
      <div className="flex h-full flex-wrap items-center justify-center gap-4 rounded-xl border p-6">
        <Badge>
          <Spinner data-icon="inline-start" />
          Syncing
        </Badge>
        <Badge variant="secondary">
          <Spinner data-icon="inline-start" />
          Updating
        </Badge>
        <Badge variant="outline">
          <Spinner data-icon="inline-start" />
          Processing
        </Badge>
      </div>

      {/* InputGroup — spinner as addon while validating or sending */}
      <div className="flex h-full flex-col justify-center gap-4 rounded-xl border p-6 md:col-span-2">
        <InputGroup>
          <InputGroupInput placeholder="Send a message..." disabled />
          <InputGroupAddon align="inline-end">
            <Spinner />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupTextarea placeholder="Send a message..." disabled />
          <InputGroupAddon align="block-end">
            <Spinner /> Validating...
            <InputGroupButton className="ml-auto" variant="default">
              <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} />
              <span className="sr-only">Send</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Empty — full-bleed processing state with cancel */}
      <Empty className="border md:col-span-2">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner />
          </EmptyMedia>
          <EmptyTitle>Processing your request</EmptyTitle>
          <EmptyDescription>
            Please wait while we process your request. Do not refresh the page.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
