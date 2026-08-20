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
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

export function CardExample() {
  return (
    <div className="flex flex-col gap-2 mx-auto w-full max-w-md"> 
     <Card size="sm" className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-video bg-primary opacity-50 mix-blend-color" />
        <img
          src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Photo by mymind on Unsplash"
          title="Photo by mymind on Unsplash"
          className="relative z-20 aspect-video w-full object-cover"
        />
        <CardHeader>
          <CardTitle>Beautiful Landscape</CardTitle>
          <CardDescription>
            A stunning view that captures the essence of natural beauty.
          </CardDescription>
          <CardAction>
            <Button variant="ghost" size="icon-sm" aria-label="Open">
              <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={1.75} className="text-muted-foreground" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <AvatarGroup>
            <Avatar size="sm">
              <AvatarImage
                src="https://avatar.aiellie.dev/shadcn"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarImage
                src="https://avatar.aiellie.dev/maxleiter.svg?icon=cat"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarImage
                src="https://avatar.aiellie.dev/evilrabbit"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Saved by <Badge variant="secondary">6 explorers</Badge>
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <HugeiconsIcon
              icon={Add01Icon}
              strokeWidth={2}
              data-icon="inline-start"
            />
            Button
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
