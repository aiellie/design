// MessageAnimated preview — no repo example exists. Composed from the
// component source: it renders an AI-SDK-shaped message (role + parts) as an
// animated MessageScrollerItem, so cells must sit inside a
// MessageScrollerProvider.
//
// The capture harness freezes the page clock, so motion/react entrance
// animations never tick and user turns would sit at their initial frame
// (opacity 0) forever. Cells therefore pass a settled preset whose initial
// state equals the end state — the same pixels a real session shows once the
// entrance animation finishes.
import type { MessageAnimationPreset } from "@/lib/message-animations"
import { MessageAnimated } from "@/components/message-animated"
import { MessageScrollerProvider } from "@/components/ui/message-scroller"

const SETTLED = {
  id: "fade",
  name: "Settled",
  variants: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
  },
} as unknown as MessageAnimationPreset

export function Conversation() {
  return (
    <MessageScrollerProvider>
      <div className="flex w-full max-w-md flex-col gap-6">
        <MessageAnimated
          animationPreset={SETTLED}
          message={{
            id: "u1",
            role: "user",
            text: "What changed for chat surfaces in the 2.4 release?",
          }}
        />
        <MessageAnimated
          message={{
            id: "a1",
            role: "assistant",
            parts: [
              {
                type: "reasoning",
                text: "The changelog touches three areas: bubbles, scrolling, and markdown. Summarize the two that affect existing apps.",
              },
              {
                type: "text",
                text: "Two changes matter for upgrades:\n\n1. Bubble gained tinted and destructive variants, and 2. MessageScroller now anchors new turns near the top instead of snapping to the bottom. Everything else is additive.",
              },
            ],
          }}
        />
      </div>
    </MessageScrollerProvider>
  )
}

export function BubbleVariantProps() {
  return (
    <MessageScrollerProvider>
      <div className="flex w-full max-w-md flex-col gap-6">
        <MessageAnimated
          animationPreset={SETTLED}
          userVariant="default"
          message={{
            id: "u2",
            role: "user",
            text: "Rename the workspace to Ellie Studio.",
          }}
        />
        <MessageAnimated
          assistantVariant="muted"
          message={{
            id: "a2",
            role: "assistant",
            text: "Done — the sidebar, share links, and billing emails now say Ellie Studio.",
          }}
        />
      </div>
    </MessageScrollerProvider>
  )
}
