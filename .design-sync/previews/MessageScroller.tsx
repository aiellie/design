// MessageScroller preview — the repo's interactive chat demo from
// examples/ui/message-scroller.tsx (initial empty state + composer), plus a
// static transcript scrolled to the top so the scroll-to-latest button and
// the scrollable viewport are visible.
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"

export { MessageScrollerExample as Showcase } from "@/examples/ui/message-scroller"

const transcript = [
  { id: "m1", role: "user", text: "Can you audit the marketing site for unused design tokens?" },
  { id: "m2", role: "assistant", text: "On it. Scanning styles across 42 pages — this takes about a minute." },
  { id: "m3", role: "assistant", text: "Found 18 unused tokens. Most are legacy shadows from the 1.x theme." },
  { id: "m4", role: "user", text: "Nice. Which ones are safe to delete?" },
  { id: "m5", role: "assistant", text: "All but two: --shadow-popover is still read by the docs search overlay, and --brand-glow is referenced in an A/B test that ends Friday." },
  { id: "m6", role: "user", text: "Remove the other 16 and open a PR." },
  { id: "m7", role: "assistant", text: "Done — PR #482 is up with the 16 removals and a codemod for the two stragglers once the test wraps." },
] as const

export function ScrollButton() {
  return (
    <MessageScrollerProvider defaultScrollPosition="start">
      {/* Inline height: utilities that appear only in preview files (h-80)
          aren't in the precompiled Tailwind CSS, so the clamp must not rely
          on one — without it nothing overflows and the button never shows. */}
      <MessageScroller
        className="w-full max-w-md rounded-xl border bg-background"
        style={{ height: "20rem" }}
      >
        <MessageScrollerViewport>
          <MessageScrollerContent className="p-4">
            {transcript.map((message) => (
              <MessageScrollerItem
                key={message.id}
                messageId={message.id}
                scrollAnchor={message.role === "user"}
              >
                <Message align={message.role === "user" ? "end" : "start"}>
                  <MessageContent>
                    <Bubble
                      variant={message.role === "user" ? "default" : "muted"}
                    >
                      <BubbleContent>{message.text}</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  )
}
