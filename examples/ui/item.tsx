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
import { ArrowUpRight01Icon, Database01Icon } from "@hugeicons/core-free-icons"

export function ItemExample() {
  return (
    <ItemGroup className="w-full gap-2">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <HugeiconsIcon icon={Database01Icon} strokeWidth={2} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Automatic backups</ItemTitle>
          <ItemDescription>
            Snapshots run every night at 2:00 AM.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Switch defaultChecked aria-label="Toggle automatic backups" />
        </ItemActions>
      </Item>
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
      <ItemSeparator />
      <Item render={<a href="#" aria-label="Read the v2.4 release notes" />}>
        <ItemContent>
          <ItemTitle>Release notes v2.4</ItemTitle>
          <ItemDescription>
            Faster cold starts and new audit log filters.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            strokeWidth={2}
            className="size-4 text-muted-foreground"
          />
        </ItemActions>
      </Item>
    </ItemGroup>
  )
}
