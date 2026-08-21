"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
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
  MapsIcon,
  NoteIcon,
  PieChartIcon,
  PlayCircleIcon,
  Rocket01Icon,
  Settings01Icon,
  SettingsIcon,
  SparklesIcon,
  StarIcon,
  Telescope01Icon,
  UserGroup02Icon,
} from "@hugeicons/core-free-icons"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"

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
      logo: <HugeiconsIcon icon={CommandIcon} strokeWidth={1.5} />,
      bg: "bg-blue-500 text-white",
    },
    {
      name: "Acme Corp.",
      plan: "Startup",
      logo: <HugeiconsIcon icon={AudioWave01Icon} strokeWidth={1.5} />,
      bg: "bg-violet-500 text-white",
    },
    {
      name: "Evil Corp.",
      plan: "Free",
      logo: <HugeiconsIcon icon={Rocket01Icon} strokeWidth={1.5} />,
      bg: "bg-emerald-500 text-white",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: <HugeiconsIcon icon={ComputerTerminalIcon} strokeWidth={1.5} />,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
          icon: <HugeiconsIcon icon={Clock01Icon} strokeWidth={1.5} />,
        },
        {
          title: "Starred",
          url: "#",
          icon: <HugeiconsIcon icon={StarIcon} strokeWidth={1.5} />,
        },
        {
          title: "Settings",
          url: "#",
          icon: <HugeiconsIcon icon={Settings01Icon} strokeWidth={1.5} />,
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: <HugeiconsIcon icon={BotIcon} strokeWidth={1.5} />,
      items: [
        {
          title: "Genesis",
          url: "#",
          icon: <HugeiconsIcon icon={SparklesIcon} strokeWidth={1.5} />,
        },
        {
          title: "Explorer",
          url: "#",
          icon: <HugeiconsIcon icon={Telescope01Icon} strokeWidth={1.5} />,
        },
        {
          title: "Quantum",
          url: "#",
          icon: <HugeiconsIcon icon={Atom01Icon} strokeWidth={1.5} />,
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: <HugeiconsIcon icon={BookOpenIcon} strokeWidth={1.5} />,
      items: [
        {
          title: "Introduction",
          url: "#",
          icon: <HugeiconsIcon icon={BookOpen01Icon} strokeWidth={1.5} />,
        },
        {
          title: "Get Started",
          url: "#",
          icon: <HugeiconsIcon icon={Rocket01Icon} strokeWidth={1.5} />,
        },
        {
          title: "Tutorials",
          url: "#",
          icon: <HugeiconsIcon icon={PlayCircleIcon} strokeWidth={1.5} />,
        },
        {
          title: "Changelog",
          url: "#",
          icon: <HugeiconsIcon icon={NoteIcon} strokeWidth={1.5} />,
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <HugeiconsIcon icon={SettingsIcon} strokeWidth={1.5} />,
      items: [
        {
          title: "General",
          url: "#",
          icon: <HugeiconsIcon icon={Settings01Icon} strokeWidth={1.5} />,
        },
        {
          title: "Team",
          url: "#",
          icon: <HugeiconsIcon icon={UserGroup02Icon} strokeWidth={1.5} />,
        },
        {
          title: "Billing",
          url: "#",
          icon: <HugeiconsIcon icon={CreditCardIcon} strokeWidth={1.5} />,
        },
        {
          title: "Limits",
          url: "#",
          icon: <HugeiconsIcon icon={DashboardSpeed01Icon} strokeWidth={1.5} />,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: <HugeiconsIcon icon={CropIcon} strokeWidth={1.5} />,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: <HugeiconsIcon icon={PieChartIcon} strokeWidth={1.5} />,
    },
    {
      name: "Travel",
      url: "#",
      icon: <HugeiconsIcon icon={MapsIcon} strokeWidth={1.5} />,
    },
  ],
}

export function SidebarExample() {
  return (
    <div className="relative h-[32rem] w-full overflow-hidden rounded-xl border">
      <SidebarProvider className="h-full min-h-full [&_[data-slot=sidebar-container]]:absolute! [&_[data-slot=sidebar-container]]:h-full!">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <TeamSwitcher teams={data.teams} />
          </SidebarHeader>
          <SidebarContent>
            <NavMain items={data.navMain} />
            <NavProjects projects={data.projects} />
          </SidebarContent>
          <SidebarFooter>
            <NavUser user={data.user} />
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
