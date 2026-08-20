"use client"

import * as React from "react"

import { Card } from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HugeiconsIcon } from "@hugeicons/react"
import * as HugeIcons from "@/icons/huge-icons"
import {
  BrandIcons,
  CodeIcons,
  ColorIcons,
  Emoji,
  flagEmojiGroups,
  Icon,
  packageIcons,
  type IconData,
} from "@/icons/icons"

/** Every glyph in the brand set, keyed by its `@/icons/huge-icons` export name. */
const hugeIconEntries = (
  Object.entries(HugeIcons) as [string, IconData][]
).sort(([a], [b]) => a.localeCompare(b, "en"))

const codeIconLabels: Partial<Record<keyof typeof CodeIcons, string>> = {
  radix: "Radix UI",
  aria: "React Aria",
  npm: "npm",
  yarn: "Yarn",
  pnpm: "pnpm",
  react: "React",
  json: "JSON",
  ts: "TypeScript",
  css: "CSS",
  bash: "Bash",
  python: "Python",
  go: "Go",
  rust: "Rust",
  js: "JavaScript",
  tsx: "TSX",
  md: "Markdown",
  ico: "Favicon",
  svg: "SVG",
  gitignore: ".gitignore",
  env: ".env",
  pdf: "PDF",
  baseui: "Base UI",
  lucide: "Lucide",
  hugeicons: "Hugeicons",
  cmdk: "cmdk",
  next: "Next.js",
  inputOtp: "input-otp",
  resizablePanels: "react-resizable-panels",
  useStickToBottom: "use-stick-to-bottom",
  nextThemes: "next-themes",
  rive: "Rive",
  streamdown: "Streamdown",
  xyflow: "XYFlow",
  embla: "Embla Carousel",
  reactDayPicker: "React DayPicker",
  recharts: "Recharts",
}

const codeIconCategories: { label: string; names: (keyof typeof CodeIcons)[] }[] = [
  {
    label: "Languages",
    names: ["js", "ts", "tsx", "css", "python", "go", "rust", "bash"],
  },
  {
    label: "Files",
    names: ["json", "md", "svg", "ico", "gitignore", "env", "pdf"],
  },
  {
    label: "UI",
    names: [
      "react",
      "radix",
      "aria",
      "baseui",
      "lucide",
      "hugeicons",
      "next",
      "cmdk",
      "inputOtp",
      "resizablePanels",
      "useStickToBottom",
      "nextThemes",
      "rive",
      "streamdown",
      "xyflow",
      "embla",
      "reactDayPicker",
      "recharts",
    ],
  },
  {
    label: "Tooling",
    names: ["npm", "yarn", "pnpm"],
  },
]

const codeIconSections = codeIconCategories.map(({ label, names }) => ({
  label,
  icons: names.map((name) => ({
    name,
    label: codeIconLabels[name] ?? name,
    IconComponent: CodeIcons[name],
  })),
}))

const colorIconLabels: Record<keyof typeof ColorIcons, string> = {
  hex: "HEX",
  rgb: "RGB",
  hsl: "HSL",
  oklch: "OKLCH",
  oklab: "OKLAB",
  cmyk: "CMYK",
  p3: "Display P3",
  swatch: "Swatch",
  tailwind: "Tailwind CSS",
}

const colorIconEntries = (
  Object.keys(ColorIcons) as (keyof typeof ColorIcons)[]
).map((name) => ({
  name,
  label: colorIconLabels[name],
  IconComponent: ColorIcons[name],
}))

const brandIconLabels: Record<keyof typeof BrandIcons, string> = {
  googleDrive: "Google Drive",
  slack: "Slack",
  gmail: "Gmail",
  googleCalendar: "Google Calendar",
  googleSheets: "Google Sheets",
  googleSlides: "Google Slides",
  googleDocs: "Google Docs",
  google: "Google",
  apple: "Apple",
  paypal: "PayPal",
  github: "GitHub",
  openai: "OpenAI",
  claude: "Claude",
  cursor: "Cursor",
  scira: "Scira",
  v0: "v0"
}

const brandIconSections = [
  {
    label: "Brands",
    icons: (Object.keys(BrandIcons) as (keyof typeof BrandIcons)[]).map(
      (name) => ({
        name: name as string,
        label: brandIconLabels[name],
        IconComponent: BrandIcons[name],
      })
    ),
  },
  {
    label: "Packages",
    icons: Object.entries(packageIcons).map(([name, IconComponent]) => ({
      name,
      label: name,
      IconComponent,
    })),
  },
]

const categories = [
  { id: "hugeicons", label: "Hugeicons", icon: HugeIcons.SparklesIcon },
  { id: "code", label: "Code", icon: HugeIcons.CodeSquareIcon },
  { id: "color", label: "Color", icon: HugeIcons.PaintBoardIcon },
  { id: "brands", label: "Brands", icon: HugeIcons.StarIcon },
  { id: "emojis", label: "Emojis", icon: HugeIcons.SmileIcon },
] as const

type SvgIconEntry = {
  name: string
  label: string
  IconComponent: React.ComponentType<React.HTMLAttributes<SVGElement>>
}

function SvgIconGrid({ icons }: { icons: SvgIconEntry[] }) {
  return (
    <div className="grid grid-cols-8 gap-3">
      {icons.map(({ name, label, IconComponent }) => (
        <Tooltip key={name}>
          <TooltipTrigger
            render={
              <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4 text-muted-foreground hover:text-foreground transition-colors">
                <IconComponent />
              </Card>
            }
          />
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

export function IconsExample() {
  const [activeTab, setActiveTab] = React.useState<string | null>("hugeicons")

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as string)}
      className="w-full"
    >
      <TabsList className="h-auto flex-wrap">
        {categories.map((category) => (
          <Tooltip key={category.id} disabled={activeTab === category.id}>
            <TooltipTrigger
              render={
                <TabsTrigger
                  value={category.id}
                  className="group/trigger flex-none gap-0"
                  onClick={() => {
                    if (activeTab === category.id) {
                      setActiveTab(null)
                    }
                  }}
                >
                  <HugeiconsIcon icon={category.icon} strokeWidth={2} />
                  <span className="inline-grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out group-data-active/trigger:grid-cols-[1fr]">
                    <span className="min-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-opacity duration-300 group-data-active/trigger:pl-1.5 group-data-active/trigger:opacity-100">
                      {category.label}
                    </span>
                  </span>
                </TabsTrigger>
              }
            />
            <TooltipContent>{category.label}</TooltipContent>
          </Tooltip>
        ))}
      </TabsList>
      <TabsContent value="hugeicons">
        <div className="grid grid-cols-8 gap-3">
          {hugeIconEntries.map(([name, icon]) => (
            <Tooltip key={name}>
              <TooltipTrigger
                render={
                  <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
                    <Icon icon={icon} />
                  </Card>
                }
              />
              <TooltipContent>{name}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="code">
        <div className="flex flex-col gap-5">
          {codeIconSections.map((section) => (
            <div key={section.label} className="flex flex-col gap-2">
              <div className="text-xs font-medium text-muted-foreground">
                {section.label}
              </div>
              <SvgIconGrid icons={section.icons} />
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="color">
        <SvgIconGrid icons={colorIconEntries} />
      </TabsContent>
      <TabsContent value="brands">
        <div className="flex flex-col gap-5">
          {brandIconSections.map((section) => (
            <div key={section.label} className="flex flex-col gap-2">
              <div className="text-xs font-medium text-muted-foreground">
                {section.label}
              </div>
              <SvgIconGrid icons={section.icons} />
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="emojis">
        <div className="flex flex-col gap-5">
          {flagEmojiGroups.map((group) => (
            <div key={group.label} className="flex flex-col gap-2">
              <div className="text-xs font-medium text-muted-foreground">
                {group.label}
              </div>
              <div className="grid grid-cols-8 gap-3">
                {group.items.map(({ code, label, flag }) => (
                  <Tooltip key={code}>
                    <TooltipTrigger
                      render={
                        <Card className="flex size-8 items-center justify-center p-0 shadow-none">
                          <Emoji emoji={flag} />
                        </Card>
                      }
                    />
                    <TooltipContent>{label}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
