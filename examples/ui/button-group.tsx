"use client"

import * as React from "react"
import {
  Alert02Icon,
  ArrowDown01Icon,
  ArrowLeft02Icon,
  ArrowRight02Icon,
  AudioWave01Icon,
  BotIcon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  Copy01Icon,
  MinusSignIcon,
  PlusSignIcon,
  Search01Icon,
  Share08Icon,
  Trash,
  UserBlock01Icon,
  VolumeOffIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const currencies = [
  { label: "US Dollar", value: "$" },
  { label: "Euro", value: "€" },
  { label: "British Pound", value: "£" },
]

export function ButtonGroupExample() {
  const [zoom, setZoom] = React.useState(100)
  const [voice, setVoice] = React.useState(false)
  const [currency, setCurrency] = React.useState<string | null>("$")

  return (
    <div className="flex w-full max-w-lg flex-col items-start gap-6">
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Previous month">
          <HugeiconsIcon icon={ArrowLeft02Icon} strokeWidth={2} />
        </Button>
        <ButtonGroupText>
          <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} />
          August 2026
        </ButtonGroupText>
        <Button variant="outline" size="icon" aria-label="Next month">
          <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} />
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button
          variant="outline"
          size="icon"
          aria-label="Zoom out"
          onClick={() => setZoom((z) => Math.max(25, z - 25))}
        >
          <HugeiconsIcon icon={MinusSignIcon} strokeWidth={2} />
        </Button>
        <ButtonGroupText className="min-w-16 justify-center tabular-nums">
          {zoom}%
        </ButtonGroupText>
        <Button
          variant="outline"
          size="icon"
          aria-label="Zoom in"
          onClick={() => setZoom((z) => Math.min(200, z + 25))}
        >
          <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
        </Button>
      </ButtonGroup>

      {/* A bare Input is a first-class member — it renders the input element
          itself, so the group's `[&>input]:flex-1` reaches it. The width has to
          come from the group, which is otherwise `w-fit`. */}
      <ButtonGroup className="w-full max-w-sm">
        <ButtonGroupText render={<label htmlFor="find" />}>Find</ButtonGroupText>
        <Input id="find" placeholder="Search components..." />
        <Button variant="outline" aria-label="Search">
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
        </Button>
      </ButtonGroup>

      {/* An InputGroup is a wrapper div, so it can't flex on its own — it gets
          its own inner group. `[--radius:9999rem]` cascades into every
          `rounded-lg` below it, which is what turns the set into pills. */}
      <ButtonGroup className="w-full max-w-sm [--radius:9999rem]">
        <ButtonGroup>
          <Button variant="outline" size="icon" aria-label="Attach">
            <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
          </Button>
        </ButtonGroup>
        <ButtonGroup className="flex-1">
          <InputGroup>
            <InputGroupInput
              placeholder={
                voice ? "Record and send audio..." : "Send a message..."
              }
            />
            <InputGroupAddon align="inline-end">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <InputGroupButton
                      size="icon-xs"
                      aria-label="Voice mode"
                      aria-pressed={voice}
                      onClick={() => setVoice(!voice)}
                      className="aria-pressed:bg-primary/10 aria-pressed:text-primary"
                    >
                      <HugeiconsIcon icon={AudioWave01Icon} strokeWidth={2} />
                    </InputGroupButton>
                  }
                />
                <TooltipContent>Voice mode</TooltipContent>
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
        </ButtonGroup>
      </ButtonGroup>

      {/* Menu triggers replace the button's own data-slot, but the group's
          selectors only test that the attribute is present, so the seam holds. */}
      <ButtonGroup>
        <Button variant="outline">Follow</Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="icon" aria-label="More actions">
                <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuGroup>
              <DropdownMenuItem >
                <HugeiconsIcon
                  icon={VolumeOffIcon}
                  strokeWidth={2}
                  className="text-muted-foreground"
                />
                Mute Conversation
              </DropdownMenuItem>
              <DropdownMenuItem >
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  strokeWidth={2}
                  className="text-muted-foreground"
                />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem >
                <HugeiconsIcon
                  icon={Alert02Icon}
                  strokeWidth={2}
                  className="text-muted-foreground"
                />
                Report Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HugeiconsIcon
                  icon={UserBlock01Icon}
                  strokeWidth={2}
                  className="text-muted-foreground"
                />
                Block User
              </DropdownMenuItem>
              <DropdownMenuItem >
                <HugeiconsIcon
                  icon={Share08Icon}
                  strokeWidth={2}
                  className="text-muted-foreground"
                />
                Share Conversation
              </DropdownMenuItem>
              <DropdownMenuItem >
                <HugeiconsIcon
                  icon={Copy01Icon}
                  strokeWidth={2}
                  className="text-muted-foreground"
                />
                Copy Conversation
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                
              >
                <HugeiconsIcon
                  icon={Trash}
                  strokeWidth={2}
                  className="text-muted-foreground"
                />
                Delete Conversation
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>

      {/* Select ships a hidden input for form submission. It sits between the
          trigger and the real Input in the DOM but carries no data-slot and is
          out of flow, so the seam skips it — which is also why you should never
          reach for `+` or `:last-child` across these children. */}
      <ButtonGroup className="w-full max-w-sm">
        <ButtonGroup className="flex-1">
          <Select
            items={currencies}
            value={currency}
            onValueChange={setCurrency}
          >
            <SelectTrigger className="font-mono" aria-label="Currency">
              {currency}
            </SelectTrigger>
            <SelectContent
              align="start"
              alignItemWithTrigger={false}
              className="w-auto min-w-44"
            >
              <SelectGroup>
                {currencies.map((item) => (
                  <SelectItem
                    
                    key={item.value}
                    value={item.value}
                  >
                    {item.value}{" "}
                    <span className="text-muted-foreground">{item.label}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input placeholder="10.00" pattern="[0-9]*" aria-label="Amount" />
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="icon" aria-label="Send">
            <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} />
          </Button>
        </ButtonGroup>
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="outline">
          <HugeiconsIcon
            icon={BotIcon}
            data-icon="inline-start"
            strokeWidth={2}
          />
          Copilot
        </Button>
        <Popover>
          <PopoverTrigger
            render={
              <Button variant="outline" size="icon" aria-label="Start a task">
                <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
              </Button>
            }
          />
          <PopoverContent align="end" className="w-80 text-sm">
            <PopoverHeader>
              <PopoverTitle>Start a new task with Copilot</PopoverTitle>
              <PopoverDescription>
                Describe your task in natural language.
              </PopoverDescription>
            </PopoverHeader>
            <Field>
              <FieldLabel htmlFor="task" className="sr-only">
                Task description
              </FieldLabel>
              <Textarea
                id="task"
                placeholder="I need to..."
                className="resize-none"
              />
              <FieldDescription>
                Copilot will open a pull request for review.
              </FieldDescription>
            </Field>
          </PopoverContent>
        </Popover>
      </ButtonGroup>
    </div>
  )
}
