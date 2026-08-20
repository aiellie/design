"use client"

import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
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
  Icon,
  packageIcons,
  type IconData,
} from "@/icons/icons"
import { cn } from "@/lib/utils"

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

const categories = [
  { id: "hugeicons", label: "Hugeicons", icon: HugeIcons.SparklesIcon },
  { id: "code", label: "Code", icon: HugeIcons.CodeSquareIcon },
  { id: "color", label: "Color", icon: HugeIcons.PaintBoardIcon },
  { id: "brands", label: "Brands", icon: HugeIcons.StarIcon },
] as const

/** Lowercased, punctuation-free haystack so "arrow up" matches `ArrowUp01Icon`. */
function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "")
}

type IconTileData = {
  key: string
  label: string
  /** Normalized haystack the search terms are matched against. */
  search: string
  className?: string
  node: React.ReactNode
}

type IconSection = {
  label: string
  tiles: IconTileData[]
}

const mutedTileClass =
  "*:[svg]:size-4 text-muted-foreground hover:text-foreground transition-colors"

function svgTile(
  name: string,
  label: string,
  IconComponent: React.ComponentType<React.HTMLAttributes<SVGElement>>
): IconTileData {
  return {
    key: name,
    label,
    search: normalize(`${name} ${label}`),
    className: mutedTileClass,
    node: <IconComponent />,
  }
}

const hugeIconTiles: IconTileData[] = hugeIconEntries.map(([name, icon]) => ({
  key: name,
  label: name,
  search: normalize(name),
  className: "*:[svg]:size-4",
  node: <Icon icon={icon} />,
}))

const codeIconSections: IconSection[] = codeIconCategories.map(
  ({ label, names }) => ({
    label,
    tiles: names.map((name) =>
      svgTile(name, codeIconLabels[name] ?? name, CodeIcons[name])
    ),
  })
)

const colorIconTiles: IconTileData[] = (
  Object.keys(ColorIcons) as (keyof typeof ColorIcons)[]
).map((name) => svgTile(name, colorIconLabels[name], ColorIcons[name]))

const brandIconSections: IconSection[] = [
  {
    label: "Brands",
    tiles: (Object.keys(BrandIcons) as (keyof typeof BrandIcons)[]).map(
      (name) => svgTile(name, brandIconLabels[name], BrandIcons[name])
    ),
  },
  {
    label: "Packages",
    tiles: Object.entries(packageIcons).map(([name, IconComponent]) =>
      svgTile(name, name, IconComponent)
    ),
  },
]

/** Everything the search sweeps across, in tab order. */
const searchSections: IconSection[] = [
  { label: "Hugeicons", tiles: hugeIconTiles },
  ...codeIconSections.map((section) => ({
    ...section,
    label: `Code · ${section.label}`,
  })),
  { label: "Color", tiles: colorIconTiles },
  ...brandIconSections,
]

function IconTile({ label, className, node }: Omit<IconTileData, "key">) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Card
            className={cn(
              "flex size-8 items-center justify-center p-0 hover:shadow-sm transition-shadow duration-300 ease-out cursor-pointer",
              className
            )}
          >
            {node}
          </Card>
        }
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function TileGrid({ tiles }: { tiles: IconTileData[] }) {
  return (
    <div className="grid grid-cols-8 gap-3">
      {tiles.map(({ key, ...tile }) => (
        <IconTile key={key} {...tile} />
      ))}
    </div>
  )
}

function SectionedTileGrid({ sections }: { sections: IconSection[] }) {
  return (
    <div className="flex flex-col gap-5">
      {sections.map((section) => (
        <div key={section.label} className="flex flex-col gap-2">
          <div className="text-xs font-medium text-muted-foreground">
            {section.label}
          </div>
          <TileGrid tiles={section.tiles} />
        </div>
      ))}
    </div>
  )
}

export function IconsExample() {
  const [activeTab, setActiveTab] = React.useState<string | null>("hugeicons")
  const [query, setQuery] = React.useState("")

  const results = React.useMemo(() => {
    const terms = query.split(/\s+/).map(normalize).filter(Boolean)
    if (terms.length === 0) return null
    return searchSections
      .map((section) => ({
        ...section,
        tiles: section.tiles.filter((tile) =>
          terms.every((term) => tile.search.includes(term))
        ),
      }))
      .filter((section) => section.tiles.length > 0)
  }, [query])

  const resultCount =
    results?.reduce((count, section) => count + section.tiles.length, 0) ?? 0

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Icons</CardTitle>
        <CardDescription>
          Hugeicons, code, color, and brand glyphs.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <InputGroup>
          <InputGroupAddon>
            <HugeiconsIcon icon={HugeIcons.Search01Icon} strokeWidth={2} />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search icons…"
            aria-label="Search icons"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {results && (
            <InputGroupAddon align="inline-end">
              <InputGroupText className="whitespace-nowrap tabular-nums">
                {resultCount} {resultCount === 1 ? "icon" : "icons"}
              </InputGroupText>
              <InputGroupButton
                size="icon-xs"
                aria-label="Clear search"
                onClick={() => setQuery("")}
              >
                <HugeiconsIcon icon={HugeIcons.Cancel01Icon} strokeWidth={2} />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
        {results ? (
          results.length > 0 ? (
            <SectionedTileGrid sections={results} />
          ) : (
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <HugeiconsIcon
                    icon={HugeIcons.Search01Icon}
                    strokeWidth={2}
                  />
                </EmptyMedia>
                <EmptyTitle>No icons found</EmptyTitle>
                <EmptyDescription>
                  No matches for &ldquo;{query.trim()}&rdquo;. Try a different
                  search.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )
        ) : (
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
              <TileGrid tiles={hugeIconTiles} />
            </TabsContent>
            <TabsContent value="code">
              <SectionedTileGrid sections={codeIconSections} />
            </TabsContent>
            <TabsContent value="color">
              <TileGrid tiles={colorIconTiles} />
            </TabsContent>
            <TabsContent value="brands">
              <SectionedTileGrid sections={brandIconSections} />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
