"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowUpRight01Icon,
  CloudIcon,
  FolderOpenIcon,
  GithubIcon,
  Notification01Icon,
  PlusSignIcon,
  RefreshIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons"

export function EmptyExample() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      {/* Default — icon media, paired actions, quiet learn-more link */}
      <Empty className="border md:col-span-2">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <HugeiconsIcon icon={FolderOpenIcon} strokeWidth={2} />
          </EmptyMedia>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>
            Projects you create or join will show up here. Start from scratch
            or import an existing repository.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex flex-wrap justify-center gap-2">
            <Button size="sm">
              <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
              New project
            </Button>
            <Button size="sm" variant="outline">
              <HugeiconsIcon icon={GithubIcon} strokeWidth={2} />
              Import from GitHub
            </Button>
          </div>
        </EmptyContent>
        <Button
          variant="link"
          render={<a href="#" />}
          nativeButton={false}
          size="sm"
          className="text-muted-foreground"
        >
          Learn more
          <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} data-icon="inline-end" />
        </Button>
      </Empty>

      {/* Outline — dashed frame for drop-zone-ish surfaces */}
      <Empty className="h-full border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <HugeiconsIcon icon={CloudIcon} strokeWidth={2} />
          </EmptyMedia>
          <EmptyTitle>Cloud storage empty</EmptyTitle>
          <EmptyDescription>
            Upload files to your cloud storage to access them anywhere.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm">
            Upload files
          </Button>
        </EmptyContent>
      </Empty>

      {/* Background — muted wash instead of a border */}
      <Empty className="h-full bg-muted/30">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <HugeiconsIcon icon={Notification01Icon} strokeWidth={2} />
          </EmptyMedia>
          <EmptyTitle>No notifications</EmptyTitle>
          <EmptyDescription className="max-w-xs text-pretty">
            You&apos;re all caught up. New notifications will appear here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm">
            <HugeiconsIcon icon={RefreshIcon} strokeWidth={2} data-icon="inline-start" />
            Refresh
          </Button>
        </EmptyContent>
      </Empty>

      {/* Avatar — media slot holds an avatar instead of an icon */}
      <Empty className="h-full border">
        <EmptyHeader>
          <EmptyMedia variant="default">
            <Avatar className="size-12">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </EmptyMedia>
          <EmptyTitle>User offline</EmptyTitle>
          <EmptyDescription>
            This user is currently offline. Leave a message to notify them or
            try again later.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm">Leave message</Button>
        </EmptyContent>
      </Empty>

      {/* Avatar group — overlapping stack in the media slot */}
      <Empty className="h-full border">
        <EmptyHeader>
          <EmptyMedia>
            <div className="flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>ML</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
          </EmptyMedia>
          <EmptyTitle>No team members</EmptyTitle>
          <EmptyDescription>
            Invite your team to collaborate on this project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm">
            <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
            Invite members
          </Button>
        </EmptyContent>
      </Empty>

      {/* InputGroup — no media, search as the recovery path */}
      <Empty className="border md:col-span-2">
        <EmptyHeader>
          <EmptyTitle>404 - Not found</EmptyTitle>
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist. Try searching
            for what you need below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <InputGroup className="sm:w-3/4">
            <InputGroupInput placeholder="Try searching for pages..." />
            <InputGroupAddon>
              <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Kbd>/</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <EmptyDescription>
            Need help? <a href="#">Contact support</a>
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </div>
  )
}
