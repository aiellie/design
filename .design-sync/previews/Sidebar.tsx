// Sidebar preview — the repo example's app shell ported with brand data and
// a remote avatar (app public/ images 404 in the DS context). The shell is
// height-clamped inside the card, so SidebarProvider pins the fixed sidebar
// container to the wrapper (same class recipe as examples/ui/sidebar.tsx).
// Second cell renders the same shell collapsed to the icon rail.
import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
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
  BookOpenIcon,
  BotIcon,
  ComputerTerminalIcon,
  CropIcon,
  MapsIcon,
  PieChartIcon,
  SettingsIcon,
  UnfoldMoreIcon,
} from "@hugeicons/core-free-icons"

const data = {
  user: {
    name: "Ellie Park",
    email: "ellie@designellie.ai",
    avatar: "https://avatar.aiellie.dev/ellie",
  },
  team: { name: "DesignEllie AI", plan: "Enterprise" },
  teams: ["DesignEllie AI", "Acme Studio", "Weekend Lab"],
  navMain: [
    {
      title: "Playground",
      icon: ComputerTerminalIcon,
      isActive: true,
      items: ["History", "Starred", "Settings"],
    },
    {
      title: "Models",
      icon: BotIcon,
      items: ["Genesis", "Explorer", "Quantum"],
    },
    {
      title: "Documentation",
      icon: BookOpenIcon,
      items: ["Introduction", "Get Started", "Tutorials", "Changelog"],
    },
    {
      title: "Settings",
      icon: SettingsIcon,
      items: ["General", "Team", "Billing", "Limits"],
    },
  ],
  projects: [
    { name: "Design Engineering", icon: CropIcon },
    { name: "Sales & Marketing", icon: PieChartIcon },
    { name: "Travel", icon: MapsIcon },
  ],
}

function AppShell({ defaultOpen = true }: { defaultOpen?: boolean }) {
  return (
    <div className="relative h-[32rem] w-full overflow-hidden rounded-xl border">
      <SidebarProvider
        defaultOpen={defaultOpen}
        className="h-full min-h-full [&_[data-slot=sidebar-container]]:absolute! [&_[data-slot=sidebar-container]]:h-full!"
      >
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
                      className="size-8"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                      >
                        <rect width="256" height="256" fill="none"></rect>
                        <line
                          x1="208"
                          y1="128"
                          x2="128"
                          y2="208"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                        ></line>
                        <line
                          x1="192"
                          y1="40"
                          x2="40"
                          y2="192"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                        ></line>
                      </svg>
                    </Button>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {data.team.name}
                      </span>
                      <span className="truncate text-xs">{data.team.plan}</span>
                    </div>
                    <HugeiconsIcon icon={UnfoldMoreIcon} strokeWidth={2} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Teams</DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuGroup>
                      {data.teams.map((team) => (
                        <DropdownMenuItem key={team}>{team}</DropdownMenuItem>
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
                        <HugeiconsIcon icon={item.icon} strokeWidth={2} />
                        <span>{item.title}</span>
                        <HugeiconsIcon
                          icon={ArrowRight01Icon}
                          strokeWidth={2}
                          className="ml-auto transition-transform duration-100 group-data-open/collapsible:rotate-90"
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem}>
                              <SidebarMenuSubButton render={<a href="#" />}>
                                {subItem}
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
                    <SidebarMenuButton render={<a href="#" />}>
                      <HugeiconsIcon icon={item.icon} strokeWidth={2} />
                      {item.name}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
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
                    <Avatar>
                      <AvatarImage
                        src={data.user.avatar}
                        alt={data.user.name}
                      />
                      <AvatarFallback className="rounded-lg">EP</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {data.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {data.user.email}
                      </span>
                    </div>
                    <HugeiconsIcon icon={UnfoldMoreIcon} strokeWidth={2} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Account</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem variant="destructive">
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
          <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <span className="text-sm font-medium">Playground</span>
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

export function Showcase() {
  return <AppShell />
}

// Icon rail: same shell with the sidebar collapsed.
export function Collapsed() {
  return <AppShell defaultOpen={false} />
}
