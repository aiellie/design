"use client"

import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { Switch } from "@/components/ui/switch"
import { BrandIcons } from "@/icons/brand-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Briefcase01Icon,
  Clock01Icon,
  Copy01Icon,
  CrownIcon,
  Database01Icon,
  Link01Icon,
  Logout01Icon,
  MoreHorizontalIcon,
  Trash,
  User02Icon,
} from "@hugeicons/core-free-icons"

const tasks = [
  {
    name: "Automatic backups",
    description: "Snapshots run every night at 2:00 AM.",
    icon: Database01Icon,
    switchLabel: "Toggle automatic backups",
    actionsLabel: "Backup actions",
  },
  {
    name: "Daily brief",
    description: "Morning brief weekdays at 8:00 AM.",
    icon: Briefcase01Icon,
    switchLabel: "Toggle daily brief",
    actionsLabel: "Brief actions",
  },
]

const apps = [
  {
    name: "Google Drive",
    description: "Cloud storage and collaboration platform.",
    icon: BrandIcons.googleDrive,
    switchLabel: "Toggle Google Drive",
    actionsLabel: "Google Drive actions",
  },
  {
    name: "Slack",
    description: "Communication and collaboration platform.",
    icon: BrandIcons.slack,
    switchLabel: "Toggle Slack",
    actionsLabel: "Slack actions",
  },
]

const team = [
  {
    name: "AI Ellie",
    email: "hello@aiellie.dev",
    initials: "AE",
    avatar: "https://avatar.aiellie.dev/AE",
    role: "Owner",
    roleIcon: CrownIcon,
    roleClassName:
      "size-5 cursor-pointer rounded-full border-rose-200 bg-rose-50 p-0 text-rose-600 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-400",
    ownershipAction: "Transfer ownership",
    destructiveAction: "Leave team",
    destructiveIcon: Logout01Icon,
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    initials: "JT",
    avatar: "https://avatar.aiellie.dev/JT",
    role: "Admin",
    roleIcon: User02Icon,
    roleClassName:
      "size-5 cursor-pointer rounded-full border-blue-200 bg-blue-50 p-0 text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400",
    ownershipAction: "Make owner",
    destructiveAction: "Remove",
    destructiveIcon: Trash,
  },
]

const models = [
  {
    name: "gpt-1.5-sm",
    description: "Everyday tasks and UI generation.",
    image: "/brand/clouds.png",
  },
  {
    name: "claude-1.5-lg",
    description: "Advanced thinking or reasoning.",
    image: "/brand/grain.png",
  },
]

export function ItemExample() {
  return (
    <div className="flex flex-col gap-2 mx-auto w-full max-w-md">
      <ItemGroup className="w-full gap-2" aria-label="Scheduled Tasks">
        {tasks.map((task) => (
          <Item key={task.name} variant="outline">
            <ItemMedia className="rounded-lg p-1">
              <HugeiconsIcon icon={task.icon} className="size-6 text-muted-foreground" strokeWidth={1.25} />
            </ItemMedia>
            <ItemContent className="gap-0">
              <ItemTitle className="font-normal">{task.name}</ItemTitle>
              <ItemDescription className="text-muted-foreground text-xs">
                {task.description}
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Switch size="sm" defaultChecked aria-label={task.switchLabel} />
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={task.actionsLabel}
                    >
                      <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} className="size-3.5" />
                      Run Now
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      <HugeiconsIcon icon={Trash} strokeWidth={2} className="size-3.5" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>

      <ItemSeparator />
      <ItemGroup className="w-full gap-2" aria-label="Apps">
        {apps.map((app) => (
          <Item key={app.name} variant="outline">
            <ItemMedia className="rounded-lg p-1">
              <app.icon className="size-6" />
            </ItemMedia>
            <ItemContent className="gap-0">
              <ItemTitle className="font-normal">{app.name}</ItemTitle>
              <ItemDescription className="text-muted-foreground text-xs">
                {app.description}
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Switch size="sm" defaultChecked aria-label={app.switchLabel} />
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={app.actionsLabel}
                    >
                      <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <HugeiconsIcon icon={Link01Icon} strokeWidth={2} className="size-3.5" />
                      Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      <HugeiconsIcon icon={Trash} strokeWidth={2} className="size-3.5" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
      <ItemSeparator />
      <ItemGroup className="w-full gap-2" aria-label="Team">
        {team.map((member) => (
          <Item key={member.email} variant="outline">
            <ItemMedia className="rounded-lg p-1">
              <Avatar className="size-7">
                <AvatarImage src={member.avatar} alt={`@${member.initials}`} />
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent className="gap-0">
              <ItemTitle className="font-normal">{member.name}</ItemTitle>
              <ItemDescription className="text-muted-foreground text-xs">
                {member.email}
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge
                variant="outline"
                className={member.roleClassName}
                aria-label={member.role}
              >
                <HugeiconsIcon
                  icon={member.roleIcon}
                  strokeWidth={2}
                  className="fill-current"
                />
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Actions for ${member.name}`}
                    >
                      <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} className="size-3.5" />
                      Copy email
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HugeiconsIcon icon={CrownIcon} strokeWidth={2} className="size-3.5" />
                      {member.ownershipAction}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <HugeiconsIcon icon={member.destructiveIcon} strokeWidth={2} className="size-3.5" />
                    {member.destructiveAction}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
      <ItemSeparator />
      <ItemGroup className="grid grid-cols-2 gap-4">
        {models.map((model) => (
          <Item key={model.name} variant="outline">
            <ItemHeader>
              <Image
                src={model.image}
                alt={model.name}
                width={128}
                height={128}
                className="aspect-square w-full rounded-sm object-cover"
              />
            </ItemHeader>
            <ItemContent>
              <ItemTitle>{model.name}</ItemTitle>
              <ItemDescription>{model.description}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}
