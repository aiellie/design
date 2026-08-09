import { HugeiconsIcon } from "@hugeicons/react"
import {
  AlertCircleIcon,
  ArrowDown01Icon,
  ArrowLeft02Icon,
  ArrowRight01Icon,
  ArrowRight02Icon,
  ArrowUp01Icon,
  Copy01Icon,
  Delete02Icon,
  Loading03Icon,
  MinusSignIcon,
  MoreHorizontalCircle01Icon,
  PlusSignIcon,
  Search01Icon,
  Settings01Icon,
  Share03Icon,
  ShoppingBag01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import type * as React from "react"

/**
 * Central icon definitions for the app. Add new icons here so every usage
 * shares the same set and default styling.
 */
export const Icons = {
  alert: AlertCircleIcon,
  arrowDown: ArrowDown01Icon,
  arrowLeft: ArrowLeft02Icon,
  arrowRight: ArrowRight02Icon,
  arrowUp: ArrowUp01Icon,
  check: Tick02Icon,
  chevronRight: ArrowRight01Icon,
  copy: Copy01Icon,
  delete: Delete02Icon,
  loading: Loading03Icon,
  minus: MinusSignIcon,
  more: MoreHorizontalCircle01Icon,
  plus: PlusSignIcon,
  search: Search01Icon,
  settings: Settings01Icon,
  share: Share03Icon,
  shoppingBag: ShoppingBag01Icon,
} as const

export type IconName = keyof typeof Icons

export type IconData = (typeof Icons)[IconName]

/** Flat list with display labels, e.g. for icon galleries and tooltips. */
export const iconRegistry: { name: IconName; label: string; icon: IconData }[] =
  [
    { name: "copy", label: "Copy", icon: Icons.copy },
    { name: "alert", label: "Alert Circle", icon: Icons.alert },
    { name: "delete", label: "Delete", icon: Icons.delete },
    { name: "share", label: "Share", icon: Icons.share },
    { name: "shoppingBag", label: "Shopping Bag", icon: Icons.shoppingBag },
    { name: "more", label: "More", icon: Icons.more },
    { name: "loading", label: "Loading", icon: Icons.loading },
    { name: "plus", label: "Plus", icon: Icons.plus },
    { name: "minus", label: "Minus", icon: Icons.minus },
    { name: "arrowLeft", label: "Arrow Left", icon: Icons.arrowLeft },
    { name: "arrowRight", label: "Arrow Right", icon: Icons.arrowRight },
    { name: "check", label: "Check", icon: Icons.check },
    { name: "arrowDown", label: "Arrow Down", icon: Icons.arrowDown },
    { name: "arrowUp", label: "Arrow Up", icon: Icons.arrowUp },
    { name: "chevronRight", label: "Chevron Right", icon: Icons.chevronRight },
    { name: "search", label: "Search", icon: Icons.search },
    { name: "settings", label: "Settings", icon: Icons.settings },
  ]

type IconProps = React.ComponentProps<typeof HugeiconsIcon>

/** HugeiconsIcon with the app-wide default stroke width. */
export function Icon({ strokeWidth = 2, ...props }: IconProps) {
  return <HugeiconsIcon strokeWidth={strokeWidth} {...props} />
}
