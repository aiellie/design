import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Switch } from "@/components/ui/switch"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Agreement01Icon,
  ComputerPhoneSyncIcon,
  Notification01Icon,
} from "@hugeicons/core-free-icons"

export function SwitchExample() {
  return (
    <div className="flex w-full items-center justify-center">
      <ItemGroup className="w-full max-w-sm gap-2">
        <Item
          variant="outline"
          className="cursor-pointer"
          render={<label htmlFor="switch-share" />}
        >
          <ItemMedia className="rounded-lg p-1">
            <HugeiconsIcon
              icon={ComputerPhoneSyncIcon}
              strokeWidth={1.25}
              className="size-6 text-muted-foreground"
            />
          </ItemMedia>
          <ItemContent className="gap-0">
            <ItemTitle className="font-normal">Share across devices</ItemTitle>
            <ItemDescription className="text-muted-foreground text-xs">
              Focus is shared when you leave the app.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Switch size="sm" id="switch-share" />
          </ItemActions>
        </Item>
        <Item
          variant="outline"
          className="cursor-pointer"
          render={<label htmlFor="switch-notifications" />}
        >
          <ItemMedia className="rounded-lg p-1">
            <HugeiconsIcon
              icon={Notification01Icon}
              strokeWidth={1.25}
              className="size-6 text-muted-foreground"
            />
          </ItemMedia>
          <ItemContent className="gap-0">
            <ItemTitle className="font-normal">Enable notifications</ItemTitle>
            <ItemDescription className="text-muted-foreground text-xs">
              Receive notifications even if focus mode is disabled.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Switch size="sm" id="switch-notifications" defaultChecked />
          </ItemActions>
        </Item>
        <Item
          variant="outline"
          className="cursor-pointer border-destructive"
          render={<label htmlFor="switch-terms" />}
        >
          <ItemMedia className="rounded-lg p-1">
            <HugeiconsIcon
              icon={Agreement01Icon}
              strokeWidth={1.25}
              className="size-6 text-destructive"
            />
          </ItemMedia>
          <ItemContent className="gap-0">
            <ItemTitle className="font-normal">Accept terms</ItemTitle>
            <ItemDescription className="text-destructive text-xs">
              You must accept the terms to continue.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Switch
              size="sm"
              id="switch-terms"
              aria-invalid
              data-variant="destructive"
              defaultChecked
            />
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  )
}
