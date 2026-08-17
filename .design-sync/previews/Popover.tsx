// Popover preview — the repo example only shows a closed trigger, so the
// first cell keeps the example's dimensions form but forces the popover open
// (`open` on the root, trigger kept in place as the anchor). FilterPopover is
// a checkbox-list composition, TriggerDemo ships the example untouched.
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

const dimensionFields = [
  { id: "popover-preview-width", label: "Width", value: "100%" },
  { id: "popover-preview-max-width", label: "Max. width", value: "300px" },
  { id: "popover-preview-height", label: "Height", value: "25px" },
]

export function Showcase() {
  return (
    <div className="flex w-full items-center justify-center">
      <Popover open>
        <PopoverTrigger
          render={
            <Button variant="outline" size="sm">
              Open popover
            </Button>
          }
        />
        <PopoverContent align="end" className="w-72">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Set the dimensions for the layer.
            </PopoverDescription>
          </PopoverHeader>
          <div className="grid gap-2">
            {dimensionFields.map((field) => (
              <div
                key={field.id}
                className="grid grid-cols-3 items-center gap-2"
              >
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  defaultValue={field.value}
                  className="col-span-2"
                />
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

const projectFilters = [
  { id: "popover-filter-active", label: "Active projects", checked: true },
  { id: "popover-filter-shared", label: "Shared with me", checked: true },
  { id: "popover-filter-archived", label: "Archived", checked: false },
]

export function FilterPopover() {
  return (
    <div className="flex w-full items-center justify-center">
      <Popover open>
        <PopoverTrigger
          render={
            <Button variant="outline" size="sm">
              Filters
            </Button>
          }
        />
        <PopoverContent className="w-56">
          <PopoverHeader>
            <PopoverTitle>Filter projects</PopoverTitle>
            <PopoverDescription>
              Choose what shows in the list.
            </PopoverDescription>
          </PopoverHeader>
          <div className="flex flex-col gap-2">
            {projectFilters.map((filter) => (
              <div key={filter.id} className="flex items-center gap-2">
                <Checkbox id={filter.id} defaultChecked={filter.checked} />
                <Label htmlFor={filter.id} className="font-normal">
                  {filter.label}
                </Label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { PopoverExample as TriggerDemo } from "@/examples/ui/popover"
