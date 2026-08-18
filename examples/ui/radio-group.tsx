import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Building01Icon,
  CancelCircleIcon,
  Rocket01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons"

export function RadioGroupExample() {
  return (
    <div className="flex w-full items-center justify-center">
      <RadioGroup defaultValue="delete" className="w-full max-w-sm gap-2">
        <Item
          variant="outline"
          className="cursor-pointer"
          render={<label htmlFor="plus-plan" />}
        >
          <ItemMedia className="rounded-lg p-1">
            <HugeiconsIcon
              icon={UserIcon}
              strokeWidth={1.25}
              className="size-6 text-muted-foreground"
            />
          </ItemMedia>
          <ItemContent className="gap-0">
            <ItemTitle className="font-normal">Plus</ItemTitle>
            <ItemDescription className="text-muted-foreground text-xs">
              For individuals and small teams.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <RadioGroupItem value="plus" id="plus-plan" />
          </ItemActions>
        </Item>
        <Item
          variant="outline"
          className="cursor-pointer"
          render={<label htmlFor="pro-plan" />}
        >
          <ItemMedia className="rounded-lg p-1">
            <HugeiconsIcon
              icon={Rocket01Icon}
              strokeWidth={1.25}
              className="size-6 text-muted-foreground"
            />
          </ItemMedia>
          <ItemContent className="gap-0">
            <ItemTitle className="font-normal">Pro</ItemTitle>
            <ItemDescription className="text-muted-foreground text-xs">
              For growing businesses.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <RadioGroupItem value="pro" id="pro-plan" />
          </ItemActions>
        </Item>
        <Item
          variant="outline"
          className="cursor-pointer"
          render={<label htmlFor="enterprise-plan" />}
        >
          <ItemMedia className="rounded-lg p-1">
            <HugeiconsIcon
              icon={Building01Icon}
              strokeWidth={1.25}
              className="size-6 text-muted-foreground"
            />
          </ItemMedia>
          <ItemContent className="gap-0">
            <ItemTitle className="font-normal">Enterprise</ItemTitle>
            <ItemDescription className="text-muted-foreground text-xs">
              For large teams and enterprises.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <RadioGroupItem value="enterprise" id="enterprise-plan" />
          </ItemActions>
        </Item>
        <Item
          variant="outline"
          className="cursor-pointer border-destructive"
          render={<label htmlFor="delete-plan" />}
        >
          <ItemMedia className="rounded-lg p-1">
            <HugeiconsIcon
              icon={CancelCircleIcon}
              strokeWidth={1.25}
              className="size-6 text-destructive"
            />
          </ItemMedia>
          <ItemContent className="gap-0">
            <ItemTitle className="font-normal">Cancel subscription</ItemTitle>
            <ItemDescription className="text-destructive text-xs">
              Your plan ends at the close of the billing cycle.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <RadioGroupItem
              value="delete"
              id="delete-plan"
              aria-invalid
              data-variant="destructive"
            />
          </ItemActions>
        </Item>
      </RadioGroup>
    </div>
  )
}
