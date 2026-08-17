// Item preview — hand-ported cells only, for now. The canonical re-export
// (`export { ItemExample as Showcase } from "@/examples/ui/item"`) is blocked:
// examples/ui/item.tsx imports next/image, which throws
// `ReferenceError: process is not defined` in the preview bundle (no esbuild
// define/shim for it) and its /brand/*.png sources live in public/, which the
// capture server does not serve. See .design-sync/learnings/w1c.md — restore
// the re-export once the orchestrator ships a next/image shim.
// SettingsList ports the example's core sections (tasks + team) verbatim-ish,
// minus the next/image models grid.
import {
  Clock01Icon,
  CrownIcon,
  Database01Icon,
  GitBranchIcon,
  Link01Icon,
  MoreHorizontalIcon,
  SparklesIcon,
  Trash,
  User02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { Switch } from "@/components/ui/switch"

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
    icon: Clock01Icon,
    switchLabel: "Toggle daily brief",
    actionsLabel: "Brief actions",
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
  },
]

export function SettingsList() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-2">
      <ItemGroup className="w-full gap-2" aria-label="Scheduled Tasks">
        {tasks.map((task) => (
          <Item key={task.name} variant="outline">
            <ItemMedia className="rounded-lg p-1">
              <HugeiconsIcon
                icon={task.icon}
                className="size-6 text-muted-foreground"
                strokeWidth={1.25}
              />
            </ItemMedia>
            <ItemContent className="gap-0">
              <ItemTitle className="font-normal">{task.name}</ItemTitle>
              <ItemDescription className="text-xs text-muted-foreground">
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
                      <HugeiconsIcon
                        icon={Clock01Icon}
                        strokeWidth={2}
                        className="size-3.5"
                      />
                      Run Now
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      <HugeiconsIcon
                        icon={Trash}
                        strokeWidth={2}
                        className="size-3.5"
                      />
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
              <ItemDescription className="text-xs text-muted-foreground">
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
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Actions for ${member.name}`}
              >
                <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
              </Button>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}

export function Variants() {
  return (
    <ItemGroup className="mx-auto w-full max-w-md gap-2">
      <Item>
        <ItemMedia variant="icon">
          <HugeiconsIcon
            icon={SparklesIcon}
            strokeWidth={2}
            className="text-muted-foreground"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Default</ItemTitle>
          <ItemDescription>
            Borderless row for dense lists and menus.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <HugeiconsIcon
            icon={Database01Icon}
            strokeWidth={2}
            className="text-muted-foreground"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Outline</ItemTitle>
          <ItemDescription>
            Bordered card row, the settings-page default.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted">
        <ItemMedia variant="icon">
          <HugeiconsIcon
            icon={GitBranchIcon}
            strokeWidth={2}
            className="text-muted-foreground"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Muted</ItemTitle>
          <ItemDescription>
            Soft surface for grouped or secondary rows.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  )
}

export function MediaAndSizes() {
  return (
    <ItemGroup className="mx-auto w-full max-w-md gap-2">
      <Item variant="outline">
        <ItemMedia variant="image">
          <img
            src="https://avatar.aiellie.dev/gradients?icon=paint-board"
            alt="Gradient pack cover"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Gradient pack</ItemTitle>
          <ItemDescription>
            18 mesh backgrounds, tuned for dark mode.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="sm">
            Preview
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm">
        <ItemMedia variant="icon">
          <HugeiconsIcon
            icon={Link01Icon}
            strokeWidth={2}
            className="text-muted-foreground"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Small row</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Copy
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="xs">
        <ItemMedia>
          <Avatar size="sm">
            <AvatarImage
              src="https://avatar.aiellie.dev/sophie"
              alt="@sophie"
            />
            <AvatarFallback>SO</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Extra-small row</ItemTitle>
          <ItemDescription>@sophie</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
}
