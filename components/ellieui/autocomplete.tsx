"use client"

import * as React from "react"
import { useControllableState } from "@radix-ui/react-use-controllable-state"

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { HugeiconsIcon } from "@hugeicons/react"
import { UnfoldMoreIcon } from "@hugeicons/core-free-icons"

type AutocompleteItemData = {
  value: string
  label: string
}

interface AutocompleteContextValue {
  value: string | undefined
  onValueChange: (value: string | undefined) => void
  open: boolean
  onOpenChange: (open: boolean) => void
  items: AutocompleteItemData[]
  registerItem: (item: AutocompleteItemData) => () => void
}

const AutocompleteContext = React.createContext<AutocompleteContextValue | null>(
  null
)

function useAutocomplete() {
  const context = React.useContext(AutocompleteContext)
  if (!context) {
    throw new Error("Autocomplete components must be used within Autocomplete")
  }
  return context
}

function Autocomplete({
  items: itemsProp,
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: Omit<React.ComponentProps<typeof Popover>, "open" | "onOpenChange"> & {
  items?: AutocompleteItemData[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string | undefined) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [value, setValue] = useControllableState<string | undefined>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  })
  const [registeredItems, setRegisteredItems] = React.useState<
    AutocompleteItemData[]
  >([])

  const registerItem = React.useCallback((item: AutocompleteItemData) => {
    setRegisteredItems((prev) => {
      const existing = prev.find((entry) => entry.value === item.value)
      if (existing?.label === item.label) return prev
      return [...prev.filter((entry) => entry.value !== item.value), item]
    })
    return () => {
      setRegisteredItems((prev) =>
        prev.filter((entry) => entry.value !== item.value)
      )
    }
  }, [])

  const contextValue = React.useMemo(
    () => ({
      value,
      onValueChange: setValue,
      open,
      onOpenChange: setOpen,
      items: itemsProp ?? registeredItems,
      registerItem,
    }),
    [
      value,
      setValue,
      open,
      setOpen,
      itemsProp,
      registeredItems,
      registerItem,
    ]
  )

  return (
    <AutocompleteContext.Provider value={contextValue}>
      <Popover
        data-slot="autocomplete"
        open={open}
        onOpenChange={setOpen}
        {...props}
      />
    </AutocompleteContext.Provider>
  )
}

function AutocompleteTrigger({
  className,
  children,
  showTrigger = true,
  ...props
}: React.ComponentProps<typeof Button> & {
  showTrigger?: boolean
}) {
  return (
    <PopoverTrigger
      data-slot="autocomplete-trigger"
      render={
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between font-normal", className)}
          {...props}
        />
      }
    >
      {children}
      {showTrigger && (
        <HugeiconsIcon
          icon={UnfoldMoreIcon}
          strokeWidth={2}
          className="pointer-events-none size-4 shrink-0 opacity-50"
        />
      )}
    </PopoverTrigger>
  )
}

function AutocompleteValue({
  placeholder = "Select...",
  className,
  ...props
}: React.ComponentProps<"span"> & {
  placeholder?: string
}) {
  const { value, items } = useAutocomplete()
  const selected = items.find((item) => item.value === value)
  const empty = !value

  return (
    <span
      data-slot="autocomplete-value"
      className={cn(
        "flex-1 truncate text-left",
        empty && "text-muted-foreground",
        className
      )}
      {...props}
    >
      {empty ? placeholder : selected?.label ?? value}
    </span>
  )
}

function AutocompleteContent({
  className,
  children,
  align = "start",
  side = "bottom",
  sideOffset = 4,
  alignOffset = 0,
  ...props
}: React.ComponentProps<typeof Command> &
  Pick<
    React.ComponentProps<typeof PopoverContent>,
    "align" | "side" | "sideOffset" | "alignOffset"
  >) {
  return (
    <PopoverContent
      data-slot="autocomplete-content"
      align={align}
      side={side}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      className={cn("w-(--anchor-width) p-0", className)}
    >
      <Command
        className="rounded-lg! bg-transparent"
        {...props}
      >
        {children}
      </Command>
    </PopoverContent>
  )
}

function AutocompleteInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandInput>) {
  return (
    <CommandInput
      data-slot="autocomplete-input"
      className={cn(className)}
      {...props}
    />
  )
}

function AutocompleteList({
  className,
  ...props
}: React.ComponentProps<typeof CommandList>) {
  return (
    <CommandList
      data-slot="autocomplete-list"
      className={cn(className)}
      {...props}
    />
  )
}

function AutocompleteEmpty({
  className,
  children = "No results found.",
  ...props
}: React.ComponentProps<typeof CommandEmpty>) {
  return (
    <CommandEmpty
      data-slot="autocomplete-empty"
      className={cn(className)}
      {...props}
    >
      {children}
    </CommandEmpty>
  )
}

function AutocompleteGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandGroup>) {
  return (
    <CommandGroup
      data-slot="autocomplete-group"
      className={cn(className)}
      {...props}
    />
  )
}

function AutocompleteItem({
  className,
  value,
  label,
  keywords,
  children,
  onSelect,
  ...props
}: React.ComponentProps<typeof CommandItem> & {
  value: string
  label?: string
}) {
  const {
    value: selected,
    onValueChange,
    onOpenChange,
    registerItem,
  } = useAutocomplete()
  const resolvedLabel =
    label ?? (typeof children === "string" ? children : value)

  React.useEffect(() => {
    return registerItem({ value, label: resolvedLabel })
  }, [registerItem, value, resolvedLabel])

  return (
    <CommandItem
      data-slot="autocomplete-item"
      value={value}
      keywords={keywords ?? [resolvedLabel]}
      data-checked={selected === value}
      className={cn(className)}
      onSelect={() => {
        onValueChange(value)
        onOpenChange(false)
        onSelect?.(value)
      }}
      {...props}
    >
      {children}
    </CommandItem>
  )
}

function AutocompleteSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandSeparator>) {
  return (
    <CommandSeparator
      data-slot="autocomplete-separator"
      className={cn(className)}
      {...props}
    />
  )
}

export {
  Autocomplete,
  AutocompleteTrigger,
  AutocompleteValue,
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteList,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteItem,
  AutocompleteSeparator,
}
