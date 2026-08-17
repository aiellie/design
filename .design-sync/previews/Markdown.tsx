// Markdown preview — no repo example exists. Composed from the component
// source: it wraps the Streamdown renderer and takes the markdown source as
// its children string. One canonical document cell, one chat-reply cell.
import { Markdown } from "@/components/markdown"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageContent } from "@/components/ui/message"

const DOCUMENT = `## Theming with CSS variables

Every component reads its palette from semantic tokens like \`--primary\` and
\`--muted\`. Override them once in **themes.css** and the whole kit follows —
no per-component patches.

- Tokens cascade through light and dark automatically
- \`oklch()\` keeps hue steady across every shade
- Radius scales derive from a single \`--radius\`

### Quick start

\`\`\`tsx
import { Button } from "@/components/ui/button"

export function Upgrade() {
  return <Button size="sm">Upgrade to Pro</Button>
}
\`\`\`

| Token | Light | Dark |
| --- | --- | --- |
| \`--primary\` | violet-600 | violet-400 |
| \`--muted\` | zinc-100 | zinc-800 |
`

export function Document() {
  return (
    <div className="w-full max-w-md">
      <Markdown>{DOCUMENT}</Markdown>
    </div>
  )
}

const REPLY = `Your build failed because \`tailwind.config.ts\` still imports the removed preset. Two quick fixes:

1. Delete the \`presets\` entry — v4 reads design tokens from CSS.
2. Move the palette into \`@theme\` inside \`globals.css\`.

\`\`\`bash
pnpm lint --filter web && pnpm build
\`\`\`

Run that and the pipeline should go green again.`

export function ChatReply() {
  return (
    <Message className="w-full max-w-md">
      <MessageContent>
        <Bubble variant="ghost">
          <BubbleContent>
            <Markdown>{REPLY}</Markdown>
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}
