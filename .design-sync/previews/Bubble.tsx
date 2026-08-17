// Bubble preview — the repo's mixed-variant showcase from examples/ui/bubble.tsx,
// plus the full variant axis and reaction placement.
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble"

export { BubbleExample as Showcase } from "@/examples/ui/bubble"

export function Variants() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Bubble variant="default" align="end">
        <BubbleContent>Default — can you check the deploy log?</BubbleContent>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>Secondary — sure, pulling it up now.</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>Muted — build 4821 finished in 58s.</BubbleContent>
      </Bubble>
      <Bubble variant="tinted">
        <BubbleContent>Tinted — heads up, standup moved to 10:30.</BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>Outline — draft saved to your workspace.</BubbleContent>
      </Bubble>
      <Bubble variant="destructive" align="end">
        <BubbleContent>Destructive — upload failed, file is over 25 MB.</BubbleContent>
      </Bubble>
      <Bubble variant="ghost">
        <BubbleContent>
          Ghost — frameless text for assistant prose that should sit directly on
          the page and span the full width of the thread.
        </BubbleContent>
      </Bubble>
    </div>
  )
}

export function Reactions() {
  return (
    <BubbleGroup className="w-full max-w-sm gap-6">
      <Bubble variant="muted">
        <BubbleContent>
          Shipped the dark-mode fix — mind taking a look?
        </BubbleContent>
        <BubbleReactions role="img" aria-label="Reactions: thumbs up and fire">
          <span>👍</span>
          <span>🔥</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="default" align="end">
        <BubbleContent>Looks great. Merging it now.</BubbleContent>
        <BubbleReactions
          side="top"
          align="start"
          role="img"
          aria-label="Reaction: party"
        >
          <span>🎉</span>
        </BubbleReactions>
      </Bubble>
    </BubbleGroup>
  )
}
