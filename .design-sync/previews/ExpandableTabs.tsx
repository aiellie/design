// ExpandableTabs preview — no repo example exists. Selection lives in
// internal state (starts unselected) and the expand animation is
// motion/react-driven, which the frozen capture clock would strand
// mid-flight, so both cells render the settled resting strip: icon tabs
// with separator dividers. Showcase is a product toolbar; UtilityBar is a
// pill-shaped variant via className.
import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import {
  Analytics01Icon,
  BellIcon,
  Bookmark01Icon,
  DashboardSquare01Icon,
  File01Icon,
  Home01Icon,
  Search01Icon,
  Settings01Icon,
  User02Icon,
} from "@hugeicons/core-free-icons"

export function Showcase() {
  return (
    <div className="flex w-full justify-center">
      <ExpandableTabs
        tabs={[
          { title: "Dashboard", icon: DashboardSquare01Icon },
          { title: "Analytics", icon: Analytics01Icon },
          { title: "Reports", icon: File01Icon },
          { type: "separator" },
          { title: "Alerts", icon: BellIcon },
          { title: "Settings", icon: Settings01Icon },
        ]}
      />
    </div>
  )
}

export function UtilityBar() {
  return (
    <div className="flex w-full justify-center">
      <ExpandableTabs
        className="rounded-full"
        tabs={[
          { title: "Home", icon: Home01Icon },
          { title: "Search", icon: Search01Icon },
          { type: "separator" },
          { title: "Bookmarks", icon: Bookmark01Icon },
          { title: "Profile", icon: User02Icon },
        ]}
      />
    </div>
  )
}
