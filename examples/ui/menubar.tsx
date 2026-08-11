import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Bookmark01Icon,
  BrowserIcon,
  ClipboardPasteIcon,
  CodeIcon,
  Copy01Icon,
  Edit01Icon,
  FullScreenIcon,
  GlobeIcon,
  HelpCircleIcon,
  IncognitoIcon,
  Link01Icon,
  Mail01Icon,
  Message01Icon,
  NoteIcon,
  PrinterIcon,
  RedoIcon,
  ReloadIcon,
  ScissorIcon,
  Search01Icon,
  SettingsIcon,
  Share08Icon,
  SidebarLeftIcon,
  TextStrikethroughIcon,
  TextSuperscriptIcon,
  Trash,
  UndoIcon,
  UserAdd01Icon,
  WindowsNewIcon,
} from "@hugeicons/core-free-icons"

export function MenubarExample() {
  return (
    <div className="flex w-full items-center justify-center">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent className="w-full">
            <MenubarGroup>
              <MenubarItem>
                <HugeiconsIcon icon={BrowserIcon} strokeWidth={2} />
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                <HugeiconsIcon icon={WindowsNewIcon} strokeWidth={2} />
                New Window <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>
                <HugeiconsIcon icon={IncognitoIcon} strokeWidth={2} />
                New Incognito Window
              </MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarSub>
                <MenubarSubTrigger>
                  <HugeiconsIcon icon={Share08Icon} strokeWidth={2} />
                  Share
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarGroup>
                    <MenubarItem>
                      <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />
                      Email link
                    </MenubarItem>
                    <MenubarItem>
                      <HugeiconsIcon icon={Message01Icon} strokeWidth={2} />
                      Messages
                    </MenubarItem>
                    <MenubarItem>
                      <HugeiconsIcon icon={NoteIcon} strokeWidth={2} />
                      Notes
                    </MenubarItem>
                  </MenubarGroup>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarItem>
                <HugeiconsIcon icon={PrinterIcon} strokeWidth={2} />
                Print... <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarItem>
                <HugeiconsIcon icon={UndoIcon} strokeWidth={2} />
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                <HugeiconsIcon icon={RedoIcon} strokeWidth={2} />
                Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarSub>
                <MenubarSubTrigger>
                  <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
                  Find
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarGroup>
                    <MenubarItem>
                      <HugeiconsIcon icon={GlobeIcon} strokeWidth={2} />
                      Search the web
                    </MenubarItem>
                  </MenubarGroup>
                  <MenubarSeparator />
                  <MenubarGroup>
                    <MenubarItem>
                      <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
                      Find...
                    </MenubarItem>
                    <MenubarItem>
                      <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
                      Find Next
                    </MenubarItem>
                    <MenubarItem>
                      <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} />
                      Find Previous
                    </MenubarItem>
                  </MenubarGroup>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarItem>
                <HugeiconsIcon icon={ScissorIcon} strokeWidth={2} />
                Cut
              </MenubarItem>
              <MenubarItem>
                <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
                Copy
              </MenubarItem>
              <MenubarItem>
                <HugeiconsIcon icon={ClipboardPasteIcon} strokeWidth={2} />
                Paste
              </MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
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
          <MenubarContent className="w-full">
            <MenubarCheckboxItem checked>
              <HugeiconsIcon icon={TextStrikethroughIcon} strokeWidth={2} />
              Strikethrough
            </MenubarCheckboxItem>
            <MenubarCheckboxItem>
              <HugeiconsIcon icon={CodeIcon} strokeWidth={2} />
              Code
            </MenubarCheckboxItem>
            <MenubarCheckboxItem>
              <HugeiconsIcon icon={TextSuperscriptIcon} strokeWidth={2} />
              Superscript
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Profiles</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="andy">
                <Avatar className="size-4">
                  <AvatarImage
                    src="https://avatar.aiellie.dev/andy.svg"
                    alt="Andy"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                Andy
              </MenubarRadioItem>
              <MenubarRadioItem value="benoit">
                <Avatar className="size-4">
                  <AvatarImage
                    src="https://avatar.aiellie.dev/benoit.svg"
                    alt="Benoit"
                  />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                Benoit
              </MenubarRadioItem>
              <MenubarRadioItem value="Luis">
                <Avatar className="size-4">
                  <AvatarImage
                    src="https://avatar.aiellie.dev/luis.svg"
                    alt="Luis"
                  />
                  <AvatarFallback>L</AvatarFallback>
                </Avatar>
                Luis
              </MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarItem>
                <HugeiconsIcon icon={Edit01Icon} strokeWidth={2} />
                Edit...
              </MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarItem>
                <HugeiconsIcon icon={UserAdd01Icon} strokeWidth={2} />
                Add Profile...
              </MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>More</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarItem>
                <HugeiconsIcon icon={SettingsIcon} strokeWidth={2} />
                Settings
              </MenubarItem>
              <MenubarItem>
                <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} />
                Help
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem variant="destructive">
                <HugeiconsIcon icon={Trash} strokeWidth={2} />
                Delete
              </MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}
