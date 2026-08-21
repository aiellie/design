"use client"

import * as React from "react"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { UnfoldMoreIcon } from "@hugeicons/core-free-icons"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: ReactNode
    plan: string
    bg: string
  }[]
}) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }

  return (
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
              <span className="truncate font-medium">{activeTeam.name}</span>
              <span className="truncate text-xs">{activeTeam.plan}</span>
            </div>
            <HugeiconsIcon icon={UnfoldMoreIcon} strokeWidth={1.5} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Teams</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              {teams.map((team) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  className="gap-2 p-1.5"
                >
                  <Button
                    size="icon-xs"
                    render={<span />}
                    nativeButton={false}
                    className={`${team.bg} [&_svg]:text-white! focus:[&_svg]:text-white! active:[&_svg]:text-white!`}
                  >
                    {team.logo}
                  </Button>
                  <span className="grid flex-1 text-left leading-tight">
                    <span className="truncate font-medium">{team.name}</span>
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
  )
}
