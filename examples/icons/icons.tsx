"use client"

import { Card } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CodeIcons } from "@/icons/code-icons"
import { Emoji, flagEmojiGroups } from "@/icons/emojis"
import { iconCategories } from "@/icons/icon-categories"
import { Icon, iconRegistry } from "@/icons/icons"

const codeIconLabels: Partial<Record<keyof typeof CodeIcons, string>> = {
  radix: "Radix UI",
  aria: "React Aria",
  npm: "npm",
  yarn: "Yarn",
  pnpm: "pnpm",
  react: "React",
  tailwind: "Tailwind CSS",
  google: "Google",
  apple: "Apple",
  paypal: "PayPal",
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
  cva: "CVA",
  cmdk: "cmdk",
  ansiToReact: "ansi-to-react",
  inputOtp: "input-otp",
  resizablePanels: "react-resizable-panels",
  tokenlens: "TokenLens",
  useStickToBottom: "use-stick-to-bottom",
  nextThemes: "next-themes",
  rive: "Rive",
  streamdown: "Streamdown",
  tanstack: "TanStack",
  xyflow: "XYFlow",
  dateFns: "date-fns",
  embla: "Embla Carousel",
  nanoid: "Nano ID",
  reactDayPicker: "React DayPicker",
  shiki: "Shiki",
  vercelAi: "Vercel AI SDK",
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
      "tailwind",
      "radix",
      "aria",
      "baseui",
      "lucide",
      "hugeicons",
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
    label: "Utilities",
    names: [
      "cva",
      "ansiToReact",
      "tokenlens",
      "tanstack",
      "dateFns",
      "nanoid",
      "shiki",
      "vercelAi",
    ],
  },
  {
    label: "Tooling",
    names: ["npm", "yarn", "pnpm"],
  },
  {
    label: "Brands",
    names: ["google", "apple", "paypal"],
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

export function IconsExample() {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-5">
        {iconCategories.map((category) => {
          if (category.id === "code") {
            return codeIconSections.map((section) => (
              <div key={section.label} className="flex flex-col gap-2">
                <div className="text-xs font-medium text-muted-foreground">
                  {section.label}
                </div>
                <div className="grid grid-cols-8 gap-3">
                  {section.icons.map(({ name, label, IconComponent }) => (
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
              </div>
            ))
          }
          if (category.id === "emojis") {
            return flagEmojiGroups.map((group) => (
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
                            <Emoji emoji={flag} className="text-base" />
                          </Card>
                        }
                      />
                      <TooltipContent>{label}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            ))
          }
          const icons = iconRegistry.filter(
            (entry) => entry.category === category.id
          )
          if (icons.length === 0) {
            return null
          }
          return (
            <div key={category.id} className="flex flex-col gap-2">
              <div className="text-xs font-medium text-muted-foreground">
                {category.label}
              </div>
              <div className="grid grid-cols-8 gap-3">
                {icons.map(({ name, label, icon }) => (
                  <Tooltip key={name}>
                    <TooltipTrigger
                      render={
                        <Card className="flex size-8 items-center justify-center p-0 shadow-none *:[svg]:size-4">
                          <Icon icon={icon} />
                        </Card>
                      }
                    />
                    <TooltipContent>{label}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
