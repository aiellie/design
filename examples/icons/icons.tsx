"use client"

import { Card } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { iconCategories } from "@/icons/icon-categories"
import { Icon, iconRegistry } from "@/icons/icons"

export function IconsExample() {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-5">
        {iconCategories.map((category) => {
          const icons = iconRegistry.filter(
            (entry) => entry.category === category.id
          )
          if (icons.length === 0) {
            return null
          }
          return (
            <div key={category.id} className="flex flex-col gap-2">
              <div className="text-xs font-medium text-muted-foreground">
                {category.label}
              </div>
              <div className="grid grid-cols-8 gap-3">
                {icons.map(({ name, label, icon }) => (
                  <Tooltip key={name}>
                    <TooltipTrigger
                      render={
                        <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
                          <Icon icon={icon} />
                        </Card>
                      }
                    />
                    <TooltipContent>{label}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
