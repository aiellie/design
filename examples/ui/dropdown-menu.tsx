"use client"

import * as React from "react"
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
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowUpBigIcon,
  BellIcon,
  CloudIcon,
  ComputerIcon,
  CreditCardIcon,
  CssFile01Icon,
  Doc01Icon,
  Download02Icon,
  File01Icon,
  FloppyDiskIcon,
  Folder01Icon,
  FolderOpenIcon,
  HelpCircleIcon,
  HtmlFile01Icon,
  JavaScriptIcon,
  KeyboardIcon,
  LanguageCircleIcon,
  Layout01Icon,
  Logout01Icon,
  Mail01Icon,
  Message01Icon,
  Moon01Icon,
  MoreHorizontalIcon,
  Notification01Icon,
  PaintBoardIcon,
  PlusSignIcon,
  Search01Icon,
  Settings01Icon,
  Shield01Icon,
  SidebarLeftIcon,
  SlackIcon,
  Sun01Icon,
  Typescript01Icon,
  User02Icon,
  UserAdd01Icon,
  WebhookIcon,
} from "@hugeicons/core-free-icons"

function Shortcut({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenuShortcut className="flex items-center gap-0.5">
      {children}
    </DropdownMenuShortcut>
  )
}

function ShiftKey() {
  return (
    <HugeiconsIcon icon={ArrowUpBigIcon} className="size-3" strokeWidth={1.5} />
  )
}

export function DropdownMenuExample() {
  const [sidebar, setSidebar] = React.useState(true)
  const [statusBar, setStatusBar] = React.useState(false)
  const [theme, setTheme] = React.useState("light")
  const [notifications, setNotifications] = React.useState({
    push: true,
    email: true,
  })

  return (
    <div className="flex w-full items-center justify-center">
      <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full"><Avatar>
          <AvatarImage src="https://avatar.aiellie.dev/ellieaiellieeeeee.svg" alt="Ellie" />
          <AvatarFallback>EA</AvatarFallback>
        </Avatar></Button>} />
        <DropdownMenuContent className="w-56">
          {/* File */}
          <DropdownMenuGroup>
            <DropdownMenuLabel>File</DropdownMenuLabel>
            <DropdownMenuItem>
              <HugeiconsIcon icon={File01Icon} strokeWidth={2} className="size-3.5" />
              New File
              <Shortcut>⌘N</Shortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Folder01Icon} strokeWidth={2} className="size-3.5" />
              New Folder
              <Shortcut>
                <ShiftKey />⌘N
              </Shortcut>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <HugeiconsIcon icon={FolderOpenIcon} strokeWidth={2} className="size-3.5" />
                Open Recent
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-44">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Recent Projects</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={HtmlFile01Icon} strokeWidth={2} className="size-3.5" />
                    Project Alpha
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={CssFile01Icon} strokeWidth={2} className="size-3.5" />
                    Project Beta
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} className="size-3.5" />
                      More Projects
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <HugeiconsIcon icon={JavaScriptIcon} strokeWidth={2} className="size-3.5" />
                        Project Gamma
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <HugeiconsIcon icon={Typescript01Icon} strokeWidth={2} className="size-3.5" />
                        Project Delta
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <HugeiconsIcon icon={Search01Icon} strokeWidth={2} className="size-3.5" />
                  Browse...
                  <Shortcut>⌘K</Shortcut>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <HugeiconsIcon icon={FloppyDiskIcon} strokeWidth={2} className="size-3.5" />
              Save
              <Shortcut>⌘S</Shortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Download02Icon} strokeWidth={2} className="size-3.5" />
              Export
              <Shortcut>
                <ShiftKey />⌘E
              </Shortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* View */}
          <DropdownMenuGroup>
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={sidebar}
              onCheckedChange={(checked) => setSidebar(checked === true)}
            >
              <HugeiconsIcon icon={SidebarLeftIcon} strokeWidth={2} className="size-3.5" />
              Show Sidebar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusBar}
              onCheckedChange={(checked) => setStatusBar(checked === true)}
            >
              <HugeiconsIcon icon={Layout01Icon} strokeWidth={2} className="size-3.5" />
              Show Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <HugeiconsIcon icon={PaintBoardIcon} strokeWidth={2} className="size-3.5" />
                Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
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
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Account */}
          <DropdownMenuGroup>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <HugeiconsIcon icon={User02Icon} strokeWidth={2} className="size-3.5" />
              Profile
              <Shortcut>
                <ShiftKey />⌘P
              </Shortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} className="size-3.5" />
              Billing
              <Shortcut>⌘B</Shortcut>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} className="size-3.5" />
                Settings
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-48">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={KeyboardIcon} strokeWidth={2} className="size-3.5" />
                    Keyboard Shortcuts
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HugeiconsIcon icon={LanguageCircleIcon} strokeWidth={2} className="size-3.5" />
                    Language
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <HugeiconsIcon icon={Notification01Icon} strokeWidth={2} className="size-3.5" />
                      Notifications
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Notification Types</DropdownMenuLabel>
                        <DropdownMenuCheckboxItem
                          checked={notifications.push}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              push: checked === true,
                            })
                          }
                        >
                          <HugeiconsIcon icon={BellIcon} strokeWidth={2} className="size-3.5" />
                          Push Notifications
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={notifications.email}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              email: checked === true,
                            })
                          }
                        >
                          <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} className="size-3.5" />
                          Email Notifications
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <HugeiconsIcon icon={Shield01Icon} strokeWidth={2} className="size-3.5" />
                  Privacy & Security
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Team */}
          <DropdownMenuGroup>
            <DropdownMenuLabel>Team</DropdownMenuLabel>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <HugeiconsIcon icon={UserAdd01Icon} strokeWidth={2} className="size-3.5" />
                Invite users
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-32">
                <DropdownMenuItem>
                  <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} className="size-3.5" />
                  Email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HugeiconsIcon icon={Message01Icon} strokeWidth={2} className="size-3.5" />
                  Message
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} className="size-3.5" />
                    More...
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <HugeiconsIcon icon={SlackIcon} strokeWidth={2} className="size-3.5" />
                      Slack
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HugeiconsIcon icon={WebhookIcon} strokeWidth={2} className="size-3.5" />
                      Webhook
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem disabled>
              <HugeiconsIcon icon={CloudIcon} strokeWidth={2} className="size-3.5" />
              API
              <Shortcut>⌘A</Shortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Help */}
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} className="size-3.5" />
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon icon={Doc01Icon} strokeWidth={2} className="size-3.5" />
              Documentation
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem variant="destructive">
            <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} className="size-3.5" />
            Sign Out
            <Shortcut>
              <ShiftKey />⌘Q
            </Shortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
