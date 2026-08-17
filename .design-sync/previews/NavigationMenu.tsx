// NavigationMenu preview — Showcase pins the "Getting started" panel open
// via the root's controlled `value` (matching the item's `value`), with the
// full trigger row from the repo example. Links are plain anchors (next/link
// needs the Next runtime). TriggerDemo is the repo example at rest (closed
// bar). Cells enumerate alphabetically — Showcase stays first.
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CircleAlert,
  CircleCheck,
  CircleDashed,
} from "@hugeicons/core-free-icons"

function ListItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li>
      <NavigationMenuLink
        render={
          <a href="#">
            <div className="flex flex-col gap-1 text-sm">
              <div className="leading-none font-medium">{title}</div>
              <div className="line-clamp-2 text-muted-foreground">{children}</div>
            </div>
          </a>
        }
      />
    </li>
  )
}

export function Showcase() {
  return (
    <div className="flex w-full justify-center py-1">
      <NavigationMenu value="learn">
        <NavigationMenuList>
          <NavigationMenuItem value="learn">
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-96">
                <ListItem title="Introduction">
                  Re-usable components built with Tailwind CSS.
                </ListItem>
                <ListItem title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="status">
            <NavigationMenuTrigger>Status</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px]">
                <li>
                  <NavigationMenuLink
                    render={
                      <a href="#" className="flex-row items-center gap-2">
                        <HugeiconsIcon icon={CircleAlert} strokeWidth={2} />
                        Backlog
                      </a>
                    }
                  />
                  <NavigationMenuLink
                    render={
                      <a href="#" className="flex-row items-center gap-2">
                        <HugeiconsIcon icon={CircleDashed} strokeWidth={2} />
                        To Do
                      </a>
                    }
                  />
                  <NavigationMenuLink
                    render={
                      <a href="#" className="flex-row items-center gap-2">
                        <HugeiconsIcon icon={CircleCheck} strokeWidth={2} />
                        Done
                      </a>
                    }
                  />
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              render={<a href="#">Docs</a>}
            />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export { NavigationMenuExample as TriggerDemo } from "@/examples/ui/navigation-menu"
