"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { HugeiconsIcon } from "@hugeicons/react"
import {  ArrowUpRight01Icon, Briefcase01Icon, ChromeIcon, Clock01Icon, Database01Icon, GithubIcon, Link01Icon, MoreHorizontalIcon, Trash } from "@hugeicons/core-free-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ItemExample() {
  return (
    <div className="flex flex-col gap-2 mx-auto w-full max-w-md">
    <ItemGroup className="w-full gap-2" aria-label="Scheduled Tasks">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <HugeiconsIcon icon={Database01Icon} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="font-normal">Automatic backups</ItemTitle>
          <ItemDescription className="text-muted-foreground text-xs">
            Snapshots run every night at 2:00 AM.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Switch defaultChecked aria-label="Toggle automatic backups" />
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <HugeiconsIcon icon={Briefcase01Icon} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="font-normal">Daily brief</ItemTitle>
          <ItemDescription className="text-muted-foreground text-xs">
          Morning brief weekdays at 8:00 AM.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <DropdownMenu>
          <DropdownMenuTrigger>
                <HugeiconsIcon icon={MoreHorizontalIcon} className="size-3.5" />
              </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <HugeiconsIcon icon={Clock01Icon} className="size-3.5" />
                Run Now
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HugeiconsIcon icon={Clock01Icon} className="size-3.5" />
                Resume
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <HugeiconsIcon icon={Trash} className="size-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ItemActions>
      </Item>
     
      </ItemGroup>

      <ItemSeparator />
      <ItemGroup className="w-full gap-2" aria-label="Apps">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <HugeiconsIcon icon={ChromeIcon} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="font-normal">Google Chrome</ItemTitle>
          <ItemDescription className="text-muted-foreground text-xs">
            Browser for web browsing and development.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Switch defaultChecked aria-label="Toggle automatic backups" />
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <HugeiconsIcon icon={GithubIcon} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="font-normal">GitHub</ItemTitle>
          <ItemDescription className="text-muted-foreground text-xs">
          Code hosting and collaboration platform.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <DropdownMenu>
          <DropdownMenuTrigger>
                <HugeiconsIcon icon={MoreHorizontalIcon} className="size-3.5" />
              </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <HugeiconsIcon icon={Link01Icon} className="size-3.5" />
                Copy Link
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <HugeiconsIcon icon={Trash} className="size-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ItemActions>
      </Item>
      
      </ItemGroup>
      <ItemSeparator />
      <ItemGroup className="w-full gap-2" aria-label="Team">
      <Item variant="muted">
        <ItemMedia>
          <Avatar>
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            Mira Kowalski
            <Badge variant="secondary">Owner</Badge>
          </ItemTitle>
          <ItemDescription>mira@acme.dev</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Manage
          </Button>
        </ItemActions>
      </Item>
     
    </ItemGroup>
    </div>
  )
}
