"use client"

import * as React from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Atom01Icon,
  AudioWave01Icon,
  BookOpen01Icon,
  BookOpenIcon,
  BotIcon,
  Clock01Icon,
  CommandIcon,
  ComputerTerminalIcon,
  CreditCardIcon,
  CropIcon,
  DashboardSpeed01Icon,
  Trash,
  FolderOpenIcon,
  Logout01Icon,
  MapsIcon,
  MoreHorizontalIcon,
  NoteIcon,
  PieChartIcon,
  PlayCircleIcon,
  Rocket01Icon,
  Settings01Icon,
  SettingsIcon,
  Share01Icon,
  SparklesIcon,
  StarIcon,
  Telescope01Icon,
  UnfoldMoreIcon,
  UserCircleIcon,
  UserGroup02Icon,
} from "@hugeicons/core-free-icons"

export function SidebarExample() {
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        plan: "Enterprise",
        logo: (
          <HugeiconsIcon
            icon={CommandIcon}
            strokeWidth={1.5}
          />
        ),
        bg: "bg-blue-500 text-white",
      },
      {
        name: "Acme Corp.",
        plan: "Startup",
        logo: (
          <HugeiconsIcon
            icon={AudioWave01Icon}
            strokeWidth={1.5}
          />
        ),
        bg: "bg-violet-500 text-white",
      },
      {
        name: "Evil Corp.",
        plan: "Free",
        logo: (
          <HugeiconsIcon
            icon={Rocket01Icon}
            strokeWidth={1.5}
          />
        ),
        bg: "bg-emerald-500 text-white",
      },
    ],
    navMain: [
      {
        title: "Playground",
        url: "#",
        icon: (
          <HugeiconsIcon
            icon={ComputerTerminalIcon}
            strokeWidth={1.5}
          />
        ),
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
            icon: (
              <HugeiconsIcon
                icon={Clock01Icon}
                strokeWidth={1.5}
              />
            ),
          },
          {
            title: "Starred",
            url: "#",
            icon: (
              <HugeiconsIcon
                icon={StarIcon}
                strokeWidth={1.5}
              />
            ),
          },
          {
            title: "Settings",
            url: "#",
            icon: (
              <HugeiconsIcon
                icon={Settings01Icon}
                strokeWidth={1.5}
              />
            ),
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: (
          <HugeiconsIcon
            icon={BotIcon}
            strokeWidth={1.5}
          />
        ),
        items: [
          {
            title: "Genesis",
            url: "#",
            icon: (
              <HugeiconsIcon
                icon={SparklesIcon}
                strokeWidth={1.5}
              />
            ),
          },
          {
            title: "Explorer",
            url: "#",
            icon: (
              <HugeiconsIcon
                icon={Telescope01Icon}
                strokeWidth={1.5}
              />
            ),
          },
          {
            title: "Quantum",
            url: "#",
            icon: (
              <HugeiconsIcon
                icon={Atom01Icon}
                strokeWidth={1.5}
              />
            ),
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: (
          <HugeiconsIcon
            icon={BookOpenIcon}
            strokeWidth={1.5}
          />
        ),
        items: [
          {
            title: "Introduction",
            url: "#",
            icon: (
              <HugeiconsIcon
                icon={BookOpen01Icon}
                strokeWidth={1.5}
              />
            ),
          },
          {
            title: "Get Started",
            url: "#",
            icon: (
              <HugeiconsIcon
                icon={Rocket01Icon}
                strokeWidth={1.5}
              />
            ),
          },
          {
            title: "Tutorials",
            url: "#",
            icon: (
              <HugeiconsIcon
                icon={PlayCircleIcon}
                strokeWidth={1.5}
              />
            ),
          },
          {
            title: "Changelog",
            url: "#",
            icon: (
              <HugeiconsIcon
                icon={NoteIcon}
                strokeWidth={1.5}
              />
            ),
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: (
          <HugeiconsIcon
            icon={SettingsIcon}
            strokeWidth={1.5}
          />
        ),
        items: [
          {
            title: "General",
            url: "#",
            icon: (
              <HugeiconsIcon
                icon={Settings01Icon}
                strokeWidth={1.5}
              />
            ),
          },
          {
            title: "Team",
            url: "#",
            icon: (
              <HugeiconsIcon
                icon={UserGroup02Icon}
                strokeWidth={1.5}
              />
            ),
          },
          {
            title: "Billing",
            url: "#",
            icon: (
              <HugeiconsIcon
                icon={CreditCardIcon}
                strokeWidth={1.5}
              />
            ),
          },
          {
            title: "Limits",
            url: "#",
            icon: (
              <HugeiconsIcon
                icon={DashboardSpeed01Icon}
                strokeWidth={1.5}
              />
            ),
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: (
          <HugeiconsIcon
            icon={CropIcon}
            strokeWidth={1.5}
          />
        ),
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: (
          <HugeiconsIcon
            icon={PieChartIcon}
            strokeWidth={1.5}
          />
        ),
      },
      {
        name: "Travel",
        url: "#",
        icon: (
          <HugeiconsIcon
            icon={MapsIcon}
            strokeWidth={1.5}
          />
        ),
      },
    ],
  }

  const [activeTeam, setActiveTeam] = React.useState(data.teams[0])

  return (
    <div className="relative h-[32rem] w-full overflow-hidden rounded-xl border">
      <SidebarProvider className="h-full min-h-full [&_[data-slot=sidebar-container]]:absolute! [&_[data-slot=sidebar-container]]:h-full!">
        <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton
                      size="lg"
                      className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
                    />
                  }
                >
                  <Button
                    size="icon-sm"
                    render={<span />}
                    nativeButton={false}
                    className={`size-8 ${activeTeam.bg}`}
                  >
                    {activeTeam.logo}
                  </Button>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {activeTeam.name}
                    </span>
                    <span className="truncate text-xs">{activeTeam.plan}</span>
                  </div>
                  <HugeiconsIcon
                    icon={UnfoldMoreIcon}
                    strokeWidth={1.5}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Teams</DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuGroup>
                    {data.teams.map((team) => (
                      <DropdownMenuItem
                        key={team.name}
                        onClick={() => setActiveTeam(team)}
                        className="gap-2 p-1.5"
                      >
                        <Button
                          size="icon-xs"
                          render={<span />}
                          nativeButton={false}
                          className={`${team.bg} [&_svg]:text-white!`}
                        >
                          {team.logo}
                        </Button>
                        <span className="grid flex-1 text-left leading-tight">
                          <span className="truncate font-medium">
                            {team.name}
                          </span>
                          <span className="truncate text-xs text-muted-foreground">
                            {team.plan}
                          </span>
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger
                      render={<SidebarMenuButton tooltip={item.title} />}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        strokeWidth={1.5}
                        className="ml-auto transition-transform duration-100 group-data-open/collapsible:rotate-90"
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              render={<a href={subItem.url} />}
                            >
                              {subItem.icon}
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              {data.projects.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton render={<a href={item.url} />}>
                    {item.icon}
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={<SidebarMenuAction showOnHover />}
                    >
                      <HugeiconsIcon
                        icon={MoreHorizontalIcon}
                        strokeWidth={1.5}
                      />
                      <span className="sr-only">More</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      side="right"
                      className="w-44"
                    >
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <HugeiconsIcon
                            icon={FolderOpenIcon}
                            strokeWidth={1.5}
                            className="size-3.5"
                          />
                          View project
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <HugeiconsIcon
                            icon={Share01Icon}
                            strokeWidth={1.5}
                            className="size-3.5"
                          />
                          Share project
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem variant="destructive">
                          <HugeiconsIcon
                            icon={Trash}
                            strokeWidth={1.5}
                            className="size-3.5"
                          />
                          Delete project
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu >
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton
                      size="lg"
                      className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
                    />
                  }
                >
                  <Avatar>
                    <AvatarImage src={data.user.avatar} alt={data.user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {data.user.name}
                    </span>
                    <span className="truncate text-xs">{data.user.email}</span>
                  </div>
                  <HugeiconsIcon
                    icon={UnfoldMoreIcon}
                    strokeWidth={1.5}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <Item size="xs">
                        <ItemMedia>
                          <Avatar>
                            <AvatarImage
                              src={data.user.avatar}
                              alt={data.user.name}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>{data.user.name}</ItemTitle>
                          <ItemDescription> {data.user.email}</ItemDescription>
                        </ItemContent>
                      </Item>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <HugeiconsIcon
                        icon={UserCircleIcon}
                        strokeWidth={1.5}
                        className="size-3.5"
                      />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HugeiconsIcon
                        icon={CreditCardIcon}
                        strokeWidth={1.5}
                        className="size-3.5"
                      />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HugeiconsIcon
                        icon={Settings01Icon}
                        strokeWidth={1.5}
                        className="size-3.5"
                      />
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">
                      <HugeiconsIcon
                        icon={Logout01Icon}
                        strokeWidth={1.5}
                        className="size-3.5"
                      />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
        <SidebarInset className="overflow-auto">
          <header className="mb-4 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-40 flex-1 rounded-xl bg-muted/50" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
