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
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HugeiconsIcon } from "@hugeicons/react"
import * as HugeIcons from "@/icons/huge-icons"
import {
  AgentIcons,
  BrandIcons,
  CodeIcons,
  ColorIcons,
  Icon,
  IntegrationIcons,
  McpIcons,
  packageIcons,
  ProviderIcons,
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

const codeIconCategories: {
  label: string
  names: (keyof typeof CodeIcons)[]
}[] = [
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
  v0: "v0",
}

/**
 * Labels the camelCased agent / provider / MCP / integration keys can't
 * derive on their own — brand casing, acronyms, dotted names.
 */
const catalogIconLabels: Record<string, string> = {
  // Agents
  githubCopilot: "GitHub Copilot",
  kilo: "Kilo Code",
  kiroCli: "Kiro CLI",
  openclaw: "OpenClaw",
  opencode: "opencode",
  roo: "Roo Code",
  vscode: "VS Code",
  // Providers
  aihubmix: "AiHubMix",
  arceeAi: "Arcee AI",
  assemblyai: "AssemblyAI",
  bedrock: "Amazon Bedrock",
  bfl: "Black Forest Labs",
  bytedance: "ByteDance",
  claudeaws: "Claude on AWS",
  cloudflareWorkersAi: "Cloudflare Workers AI",
  deepinfra: "DeepInfra",
  deepseek: "DeepSeek",
  digitalocean: "DigitalOcean",
  elevenlabs: "ElevenLabs",
  fal: "fal",
  fastrouter: "FastRouter",
  friendli: "FriendliAI",
  githubModels: "GitHub Models",
  huggingface: "Hugging Face",
  inference: "Inference.net",
  klingai: "Kling AI",
  lmstudio: "LM Studio",
  minimax: "MiniMax",
  modelscope: "ModelScope",
  moonshotai: "Moonshot AI",
  nvidia: "NVIDIA",
  openai: "OpenAI",
  openrouter: "OpenRouter",
  poolside: "poolside",
  runinfra: "RunInfra",
  sambanova: "SambaNova",
  stepfun: "StepFun",
  streamlake: "StreamLake",
  submodel: "SubModel",
  thinkingmachines: "Thinking Machines",
  togetherai: "Together AI",
  vertex: "Vertex AI",
  voyage: "Voyage AI",
  wandb: "W&B",
  xai: "xAI",
  zai: "Z.ai",
  zenmux: "ZenMux",
  zhipuai: "Zhipu AI",
  // MCP servers
  browserChrome: "Chrome DevTools",
  clickup: "ClickUp",
  github: "GitHub",
  gitlab: "GitLab",
  hubspot: "HubSpot",
  mongodb: "MongoDB",
  nextjs: "Next.js",
  paypal: "PayPal",
  v0: "v0",
  // Integrations
  coderabbit: "CodeRabbit",
  newrelic: "New Relic",
}

/** "claudeCode" → "Claude Code"; brand casing comes from `catalogIconLabels`. */
function labelFromKey(key: string) {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2")
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

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

/** Agent marks are opaque brand tiles, not `currentColor` glyphs. */
const agentTileClass = "*:[svg]:size-4 *:[svg]:rounded-xs"

function svgTile(
  name: string,
  label: string,
  IconComponent: React.ComponentType<React.HTMLAttributes<SVGElement>>,
  className: string = mutedTileClass,
): IconTileData {
  return {
    key: name,
    label,
    search: normalize(`${name} ${label}`),
    className,
    node: <IconComponent />,
  }
}

/** Tiles for a whole icon record, labeled via `catalogIconLabels`. */
function catalogTiles(
  record: Record<string, React.ComponentType<React.HTMLAttributes<SVGElement>>>,
  className?: string,
): IconTileData[] {
  return Object.entries(record).map(([name, IconComponent]) =>
    svgTile(
      name,
      catalogIconLabels[name] ?? labelFromKey(name),
      IconComponent,
      className,
    ),
  )
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
      svgTile(name, codeIconLabels[name] ?? name, CodeIcons[name]),
    ),
  }),
)

const colorIconTiles: IconTileData[] = (
  Object.keys(ColorIcons) as (keyof typeof ColorIcons)[]
).map((name) => svgTile(name, colorIconLabels[name], ColorIcons[name]))

const brandIconSections: IconSection[] = [
  {
    label: "Brands",
    tiles: (Object.keys(BrandIcons) as (keyof typeof BrandIcons)[]).map(
      (name) => svgTile(name, brandIconLabels[name], BrandIcons[name]),
    ),
  },
  {
    label: "Packages",
    tiles: Object.entries(packageIcons).map(([name, IconComponent]) =>
      svgTile(name, name, IconComponent),
    ),
  },
]

/** Every section, in display order; search sweeps across all of them. */
const iconSections: IconSection[] = [
  { label: "Hugeicons", tiles: hugeIconTiles },
  ...codeIconSections.map((section) => ({
    ...section,
    label: `Code · ${section.label}`,
  })),
  { label: "Color", tiles: colorIconTiles },
  ...brandIconSections,
  { label: "Agents", tiles: catalogTiles(AgentIcons, agentTileClass) },
  { label: "Providers", tiles: catalogTiles(ProviderIcons) },
  { label: "MCP servers", tiles: catalogTiles(McpIcons) },
  { label: "Integrations", tiles: catalogTiles(IntegrationIcons) },
]

function IconTile({ label, className, node }: Omit<IconTileData, "key">) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Card
            className={cn(
              "flex size-8 items-center justify-center p-0 hover:shadow-sm transition-shadow duration-300 ease-out cursor-pointer",
              className,
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
    <div className="flex flex-col gap-5 p-0.5">
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
  const [query, setQuery] = React.useState("")

  const results = React.useMemo(() => {
    const terms = query.split(/\s+/).map(normalize).filter(Boolean)
    if (terms.length === 0) return null
    return iconSections
      .map((section) => ({
        ...section,
        tiles: section.tiles.filter((tile) =>
          terms.every((term) => tile.search.includes(term)),
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
          Hugeicons, code, color, and brand glyphs, plus agent, provider, MCP,
          and integration marks.
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
        {results && results.length === 0 ? (
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <HugeiconsIcon icon={HugeIcons.Search01Icon} strokeWidth={2} />
              </EmptyMedia>
              <EmptyTitle>No icons found</EmptyTitle>
              <EmptyDescription>
                No matches for &ldquo;{query.trim()}&rdquo;. Try a different
                search.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ScrollArea className="-me-2 pe-2 *:data-[slot=scroll-area-viewport]:max-h-90">
            <SectionedTileGrid sections={results ?? iconSections} />
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
