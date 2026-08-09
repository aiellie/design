"use client"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  TextAlignCenterIcon,
  TextAlignJustifyCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  BoldIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

const springIcon =
  "transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-active/toggle:scale-90 group-aria-pressed/toggle:scale-110"

function IconItem({
  value,
  label,
  icon,
}: {
  value: string
  label: string
  icon: typeof BoldIcon
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <ToggleGroupItem value={value} aria-label={label}>
            <HugeiconsIcon
              icon={icon}
              strokeWidth={2}
              className={springIcon}
            />
          </ToggleGroupItem>
        }
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
const alignments = [
  { value: "left", label: "Align left", icon: TextAlignLeftIcon },
  { value: "center", label: "Align center", icon: TextAlignCenterIcon },
  { value: "right", label: "Align right", icon: TextAlignRightIcon },
  { value: "justify", label: "Justify", icon: TextAlignJustifyCenterIcon },
]
function AlignmentGroup() {
  const [value, setValue] = useState<string[]>(["left"])
  const align = value[0] ?? "left"

  return (
    <div className="flex w-full flex-col gap-2">
      <ToggleGroup
        spacing={0}
        variant="outline"
        value={value}
        onValueChange={setValue}
      >
        {alignments.map((alignment) => (
          <IconItem key={alignment.value} {...alignment} />
        ))}
      </ToggleGroup>
      <p
        className={cn(
          "max-w-sm text-muted-foreground text-sm",
          align === "center" && "text-center",
          align === "right" && "text-end",
          align === "justify" && "text-justify"
        )}
      >
        Toggle groups keep related switches together and let the pressed one
        speak for the set.
      </p>
    </div>
  )
}
export function ToggleGroupExample() {
  return (
    <div className="flex w-full max-w-md flex-col items-start gap-6">
      <AlignmentGroup />
    </div>
  )
}
