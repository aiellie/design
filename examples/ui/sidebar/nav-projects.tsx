"use client"

import type { ReactNode } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  FolderOpenIcon,
  MoreHorizontalIcon,
  Share01Icon,
  Trash,
} from "@hugeicons/core-free-icons"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: ReactNode
  }[]
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton render={<a href={item.url} />}>
              {item.icon}
              <span>{item.name}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger render={<SidebarMenuAction showOnHover />}>
                <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={1.5} />
                <span className="sr-only">More</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="right" className="w-44">
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
  )
}
