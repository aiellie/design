"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { statusMeta } from "@/examples/status"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

export function CardExample() {
  return (
    <div className="flex flex-col gap-2 mx-auto w-full max-w-md"> 
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Acme Website Redesign</CardTitle>
        <CardDescription>
          Marketing site refresh with a new design system and CMS migration.
        </CardDescription>
        <CardAction>
          <Badge
            variant="outline"
            className={cn(
              "border-transparent",
              statusMeta.building.iconBg,
              statusMeta.building.textColor
            )}
          >
            {statusMeta.building.label}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-3">
        <AvatarGroup>
          <Avatar size="sm">
          <AvatarImage src="https://avatar.aiellie.dev/MK" alt="@MK" />
          
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarImage src="https://avatar.aiellie.dev/JT" alt="@JT" />
            <AvatarFallback>J T</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarImage src="https://avatar.aiellie.dev/AR" alt="@AR" />
              <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>
        
      </CardContent>
      <CardFooter className="justify-between gap-2">
        <span className="text-xs text-muted-foreground">
          8 of 12 tasks complete
        </span>
        <Button size="sm">
          Open project
          <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} />
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}
