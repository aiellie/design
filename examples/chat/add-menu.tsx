"use client"

import {
  AddMenu,
  AddMenuContent,
  AddMenuExtension,
  AddMenuGroup,
  AddMenuIcon,
  AddMenuItem,
  AddMenuLabel,
  AddMenuSeparator,
  AddMenuSub,
  AddMenuSubContent,
  AddMenuSubTrigger,
  AddMenuTrigger,
} from "@/components/chat/add-menu"
import { BrandIcons } from "@/icons/icons"
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
  PuzzleIcon,
  SparklesIcon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons"

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

export function AddMenuExample() {
  return (
    <div className="flex w-full items-center justify-center">
      <AddMenu>
        <AddMenuTrigger />
        <AddMenuContent>
          <AddMenuGroup>
            <AddMenuLabel>Attach</AddMenuLabel>
            <AddMenuItem>
              <AddMenuIcon icon={Image02Icon} />
              Photos & Files
            </AddMenuItem>
            <AddMenuItem>
              <AddMenuIcon icon={Folder01Icon} />
              Folders
            </AddMenuItem>
            <AddMenuItem>
              <AddMenuIcon icon={FocusPointIcon} />
              Screenshots
            </AddMenuItem>
          </AddMenuGroup>

          <AddMenuSeparator />

          <AddMenuGroup>
            <AddMenuLabel>Add From</AddMenuLabel>
            <AddMenuSub>
              <AddMenuSubTrigger>
                <AddMenuIcon icon={Layers01Icon} />
                Projects
              </AddMenuSubTrigger>
              <AddMenuSubContent>
                <AddMenuGroup>
                  <AddMenuLabel>Recent Projects</AddMenuLabel>
                  {projects.map((project) => (
                    <AddMenuItem key={project.name}>
                      <AddMenuIcon icon={project.icon} />
                      {project.name}
                    </AddMenuItem>
                  ))}
                </AddMenuGroup>
              </AddMenuSubContent>
            </AddMenuSub>
            <AddMenuItem>
              <AddMenuIcon icon={BrandIcons.github} />
              From GitHub
            </AddMenuItem>
            <AddMenuItem>
              <AddMenuIcon icon={LibraryIcon} />
              From Library
            </AddMenuItem>
            <AddMenuItem>
              <AddMenuIcon icon={BubbleChatIcon} />
              Chats
            </AddMenuItem>
          </AddMenuGroup>

          <AddMenuSeparator />

          <AddMenuGroup>
            <AddMenuLabel>Extensions</AddMenuLabel>
            <AddMenuExtension
              label="Skills"
              icon={SparklesIcon}
              items={skills}
            />
            <AddMenuExtension
              label="Connectors"
              icon={PlugSocketIcon}
              items={connectors}
            />
            <AddMenuExtension
              label="Plugins"
              icon={PuzzleIcon}
              items={plugins}
            />
          </AddMenuGroup>

          <AddMenuSeparator />

          <AddMenuSub>
            <AddMenuSubTrigger>
              <AddMenuIcon icon={Wrench01Icon} />
              Tools
            </AddMenuSubTrigger>
            <AddMenuSubContent>
              {tools.map((tool) => (
                <AddMenuItem key={tool.name}>
                  <AddMenuIcon icon={tool.icon} />
                  {tool.name}
                </AddMenuItem>
              ))}
            </AddMenuSubContent>
          </AddMenuSub>
        </AddMenuContent>
      </AddMenu>
    </div>
  )
}
