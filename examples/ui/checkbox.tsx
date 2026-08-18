"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Trash,
  Globe02Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons"

export function CheckboxExample() {
  return (
    <div className="flex w-full items-center justify-center">
      <ItemGroup className="w-full max-w-sm gap-2">
        <Item
          variant="outline"
          className="cursor-pointer"
          render={<label htmlFor="checkbox-profile" />}
        >
          <ItemMedia className="rounded-lg p-1">
            <HugeiconsIcon
              icon={Globe02Icon}
              strokeWidth={1.25}
              className="size-6 text-muted-foreground"
            />
          </ItemMedia>
          <ItemContent className="gap-0">
            <ItemTitle className="font-normal">Public profile</ItemTitle>
            <ItemDescription className="text-muted-foreground text-xs">
              Anyone with the link can view your profile.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Checkbox id="checkbox-profile" name="checkbox-profile" />
          </ItemActions>
        </Item>
        <Item
          variant="outline"
          className="cursor-pointer"
          render={<label htmlFor="checkbox-digest" />}
        >
          <ItemMedia className="rounded-lg p-1">
            <HugeiconsIcon
              icon={Mail01Icon}
              strokeWidth={1.25}
              className="size-6 text-muted-foreground"
            />
          </ItemMedia>
          <ItemContent className="gap-0">
            <ItemTitle className="font-normal">Weekly digest</ItemTitle>
            <ItemDescription className="text-muted-foreground text-xs">
              A weekly summary of your workspace activity.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Checkbox
              id="checkbox-digest"
              name="checkbox-digest"
              defaultChecked
            />
          </ItemActions>
        </Item>
        <Item
          variant="outline"
          className="cursor-pointer border-destructive"
          render={<label htmlFor="checkbox-purge" />}
        >
          <ItemMedia className="rounded-lg p-1">
            <HugeiconsIcon
              icon={Trash}
              strokeWidth={1.25}
              className="size-6 text-destructive"
            />
          </ItemMedia>
          <ItemContent className="gap-0">
            <ItemTitle className="font-normal">Erase usage data</ItemTitle>
            <ItemDescription className="text-destructive text-xs">
              Permanently removes your analytics history.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Checkbox
              id="checkbox-purge"
              name="checkbox-purge"
              defaultChecked
              aria-invalid
              data-variant="destructive"
            />
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  )
}
