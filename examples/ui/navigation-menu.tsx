"use client"

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
  Analytics01Icon,
  BookOpen01Icon,
  FlashIcon,
  HelpCircleIcon,
  Layers01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"

const products = [
  {
    title: "Automations",
    description: "Trigger workflows from any event.",
    icon: FlashIcon,
  },
  {
    title: "Components",
    description: "Prebuilt blocks for your design system.",
    icon: Layers01Icon,
  },
  {
    title: "Analytics",
    description: "Realtime insight into every deploy.",
    icon: Analytics01Icon,
  },
]

const resources = [
  { title: "Documentation", icon: BookOpen01Icon },
  { title: "Community", icon: UserGroupIcon },
  { title: "Support", icon: HelpCircleIcon },
]

export function NavigationMenuExample() {
  return (
    <div className="flex w-full justify-center py-1">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Product</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-64 gap-1">
                {products.map((item) => (
                  <NavigationMenuLink key={item.title} href="#">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                      <HugeiconsIcon icon={item.icon} strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-48 gap-1">
                {resources.map((item) => (
                  <NavigationMenuLink key={item.title} href="#">
                    <HugeiconsIcon
                      icon={item.icon}
                      strokeWidth={2}
                      className="text-muted-foreground"
                    />
                    {item.title}
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#"
              className={navigationMenuTriggerStyle()}
            >
              Pricing
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
