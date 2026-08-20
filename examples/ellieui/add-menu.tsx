"use client"

import type * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import { BrandIcons, type IconData } from "@/icons/icons"
import {
  AiBrain01Icon,
  AiImageIcon,
  BrowserIcon,
  BubbleChatIcon,
  FocusPointIcon,
  Folder01Icon,
  GlobalSearchIcon,
  Image02Icon,
  Layers01Icon,
  LibraryIcon,
  PaintBoardIcon,
  PenTool03Icon,
  PencilEdit01Icon,
  PlugSocketIcon,
  PlusSignIcon,
  PuzzleIcon,
  Search01Icon,
  Settings01Icon,
  SparklesIcon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons"

/** Hugeicons glyph, or one of the colored brand SVGs from `BrandIcons`. */
type MenuIconSource =
  | IconData
  | React.ComponentType<React.HTMLAttributes<SVGElement>>

function MenuIcon({ icon }: { icon: MenuIconSource }) {
  if (typeof icon === "function") {
    const Brand = icon
    return <Brand className="size-3.5" />
  }
  return <HugeiconsIcon icon={icon}  className="size-3.5" />
}

const projects = [
  { name: "Ellie UI", icon: PaintBoardIcon },
  { name: "Portfolio Site", icon: BrowserIcon },
  { name: "Chat App", icon: BubbleChatIcon },
  { name: "Design System", icon: PenTool03Icon },
]

const skills = [
  { name: "Docs", icon: BrandIcons.googleDocs },
  { name: "Spreadsheets", icon: BrandIcons.googleSheets },
  { name: "Slides", icon: BrandIcons.googleSlides },
  { name: "Theme Factory", icon: PaintBoardIcon },
]

const connectors = [
  { name: "Slack", icon: BrandIcons.slack },
  { name: "Gmail", icon: BrandIcons.gmail },
  { name: "Google Drive", icon: BrandIcons.googleDrive },
  { name: "Calendar", icon: BrandIcons.googleCalendar },
]

const plugins = [
  { name: "Claude Code", icon: BrandIcons.claude },
  { name: "Cursor", icon: BrandIcons.cursor },
  { name: "v0", icon: BrandIcons.v0 },
]

const tools = [
  { name: "Web Search", icon: GlobalSearchIcon },
  { name: "Research", icon: AiBrain01Icon },
  { name: "Generate Image", icon: AiImageIcon },
  { name: "Write or Edit", icon: PencilEdit01Icon },
]

/**
 * Submenu whose list ends with Manage / Browse actions — the shared shape for
 * the Skills, Connectors, and Plugins sections.
 */
function ExtensionSub({
  label,
  icon,
  items,
}: {
  label: string
  icon: IconData
  items: { name: string; icon: MenuIconSource }[]
}) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <MenuIcon icon={icon} />
        {label}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          {items.map((item) => (
            <DropdownMenuItem key={item.name}>
              <MenuIcon icon={item.icon} />
              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <MenuIcon icon={Settings01Icon} />
          Manage {label.toLowerCase()}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MenuIcon icon={Search01Icon} />
          Browse {label.toLowerCase()}
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}

export function AddMenuExample() {
  return (
    <div className="flex w-full items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="icon" className="rounded-full">
              <HugeiconsIcon icon={PlusSignIcon} />
            </Button>
          }
        />
        <DropdownMenuContent className="w-52">
          {/* Attach */}
          <DropdownMenuGroup>
            <DropdownMenuLabel>Attach</DropdownMenuLabel>
            <DropdownMenuItem>
              <MenuIcon icon={Image02Icon} />
              Photos & Files
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MenuIcon icon={Folder01Icon} />
              Folders
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MenuIcon icon={FocusPointIcon} />
              Screenshots
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Add from */}
          <DropdownMenuGroup>
            <DropdownMenuLabel>Add From</DropdownMenuLabel>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <MenuIcon icon={Layers01Icon} />
                Projects
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-44">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Recent Projects</DropdownMenuLabel>
                  {projects.map((project) => (
                    <DropdownMenuItem key={project.name}>
                      <MenuIcon icon={project.icon} />
                      {project.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <MenuIcon icon={BrandIcons.github} />
              From GitHub
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MenuIcon icon={LibraryIcon} />
              From Library
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MenuIcon icon={BubbleChatIcon} />
              Chats
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Extensions */}
          <DropdownMenuGroup>
            <DropdownMenuLabel>Extensions</DropdownMenuLabel>
            <ExtensionSub label="Skills" icon={SparklesIcon} items={skills} />
            <ExtensionSub
              label="Connectors"
              icon={PlugSocketIcon}
              items={connectors}
            />
            <ExtensionSub label="Plugins" icon={PuzzleIcon} items={plugins} />
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Tools */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <MenuIcon icon={Wrench01Icon} />
              Tools
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-44">
              {tools.map((tool) => (
                <DropdownMenuItem key={tool.name}>
                  <MenuIcon icon={tool.icon} />
                  {tool.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
