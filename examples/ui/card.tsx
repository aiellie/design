"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
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
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon, Clock01Icon } from "@hugeicons/core-free-icons"

export function CardExample() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Acme Website Redesign</CardTitle>
        <CardDescription>
          Marketing site refresh with a new design system and CMS migration.
        </CardDescription>
        <CardAction>
          <Badge variant="secondary">In progress</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-3">
        <AvatarGroup>
          <Avatar size="sm">
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarFallback>JT</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <HugeiconsIcon
            icon={Clock01Icon}
            strokeWidth={2}
            className="size-3.5"
          />
          Due Aug 28, 2026
        </div>
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
  )
}
