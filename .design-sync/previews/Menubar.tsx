// Menubar preview — Showcase renders the example's six-trigger bar with the
// View menu forced open (controlled `open` on that MenubarMenu): checkbox
// ticks, shortcuts, a disabled item, and separators are visible. Closed
// menus keep their triggers only (their content never renders). TriggerDemo
// is the full repo example at rest. Cells enumerate alphabetically —
// Showcase stays first for the single-mode card.
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Bookmark01Icon,
  FullScreenIcon,
  Link01Icon,
  ReloadIcon,
  SidebarLeftIcon,
} from "@hugeicons/core-free-icons"

export function Showcase() {
  return (
    <div className="flex w-full justify-center">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu open>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent className="w-44">
            <MenubarGroup>
              <MenubarCheckboxItem>
                <HugeiconsIcon icon={Bookmark01Icon} strokeWidth={2} />
                Bookmarks Bar
              </MenubarCheckboxItem>
              <MenubarCheckboxItem checked>
                <HugeiconsIcon icon={Link01Icon} strokeWidth={2} />
                Full URLs
              </MenubarCheckboxItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarItem>
                <HugeiconsIcon icon={ReloadIcon} strokeWidth={2} />
                Reload <MenubarShortcut>⌘R</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>
                <HugeiconsIcon icon={ReloadIcon} strokeWidth={2} />
                Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
              </MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarItem>
                <HugeiconsIcon icon={FullScreenIcon} strokeWidth={2} />
                Toggle Fullscreen
              </MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarItem>
                <HugeiconsIcon icon={SidebarLeftIcon} strokeWidth={2} />
                Hide Sidebar
              </MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Format</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Profiles</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>More</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}

export { MenubarExample as TriggerDemo } from "@/examples/ui/menubar"
