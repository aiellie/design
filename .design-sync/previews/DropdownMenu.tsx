// DropdownMenu preview — menus render closed by default, so Showcase forces
// the account menu open (controlled `open`) with a trimmed port of the repo
// example's content: grouped items with icons + shortcuts, checkbox state,
// submenu chevrons, a disabled item, and a destructive Sign Out.
// ThemeSelector shows an open radio-group menu; TriggerDemo is the repo
// example (closed avatar trigger). Cells enumerate alphabetically — Showcase
// must stay first for the single-mode card.
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CloudIcon,
  ComputerIcon,
  CreditCardIcon,
  Download02Icon,
  File01Icon,
  FloppyDiskIcon,
  Folder01Icon,
  FolderOpenIcon,
  Layout01Icon,
  Logout01Icon,
  Moon01Icon,
  PaintBoardIcon,
  SidebarLeftIcon,
  Sun01Icon,
  User02Icon,
} from "@hugeicons/core-free-icons"

export function Showcase() {
  return (
    <div className="flex w-full justify-center">
      <DropdownMenu open>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Open account menu"
            >
              <Avatar>
                <AvatarImage
                  src="https://avatar.aiellie.dev/ellieaiellieeeeee.svg"
                  alt="Ellie"
                />
                <AvatarFallback>EA</AvatarFallback>
              </Avatar>
            </Button>
          }
        />
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>File</DropdownMenuLabel>
            <DropdownMenuItem>
              <HugeiconsIcon icon={File01Icon} strokeWidth={2} className="size-3.5" />
              New File
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Folder01Icon} strokeWidth={2} className="size-3.5" />
              New Folder
              <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <HugeiconsIcon icon={FolderOpenIcon} strokeWidth={2} className="size-3.5" />
                Open Recent
              </DropdownMenuSubTrigger>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <HugeiconsIcon icon={FloppyDiskIcon} strokeWidth={2} className="size-3.5" />
              Save
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Download02Icon} strokeWidth={2} className="size-3.5" />
              Export
              <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked>
              <HugeiconsIcon icon={SidebarLeftIcon} strokeWidth={2} className="size-3.5" />
              Show Sidebar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
              <HugeiconsIcon icon={Layout01Icon} strokeWidth={2} className="size-3.5" />
              Show Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <HugeiconsIcon icon={PaintBoardIcon} strokeWidth={2} className="size-3.5" />
                Theme
              </DropdownMenuSubTrigger>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <HugeiconsIcon icon={User02Icon} strokeWidth={2} className="size-3.5" />
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} className="size-3.5" />
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <HugeiconsIcon icon={CloudIcon} strokeWidth={2} className="size-3.5" />
              API
              <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} className="size-3.5" />
            Sign Out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function ThemeSelector() {
  return (
    <div className="flex w-full justify-center">
      <DropdownMenu open>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="sm">
              <HugeiconsIcon icon={PaintBoardIcon} strokeWidth={2} className="size-3.5" />
              Theme
            </Button>
          }
        />
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuRadioGroup value="dark">
            <DropdownMenuRadioItem value="light">
              <HugeiconsIcon icon={Sun01Icon} strokeWidth={2} className="size-3.5" />
              Light
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">
              <HugeiconsIcon icon={Moon01Icon} strokeWidth={2} className="size-3.5" />
              Dark
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">
              <HugeiconsIcon icon={ComputerIcon} strokeWidth={2} className="size-3.5" />
              System
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export { DropdownMenuExample as TriggerDemo } from "@/examples/ui/dropdown-menu"
