"use client"

import { Icon, iconRegistry } from "@/icons/icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function IconsExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Icons</CardTitle>
        <CardDescription className="line-clamp-2">
          The Hugeicons set used across the app. Hover an icon for its name.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="grid grid-cols-8 place-items-center gap-4">
            {iconRegistry.map(({ name, label, icon }) => (
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
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}
