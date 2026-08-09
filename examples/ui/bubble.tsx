"use client"

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from '@/components/ui/bubble'

export function BubbleExample() {
  return (
    <div className="flex w-full flex-col gap-6">
      <BubbleGroup>
        <Bubble variant="muted">
          <BubbleContent>
            Are we still on for the design review at 2?
          </BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>I booked the big room just in case.</BubbleContent>
        </Bubble>
      </BubbleGroup>
      <Bubble align="end">
        <BubbleContent>Yes! Bringing the new prototype.</BubbleContent>
        <BubbleReactions>🎉 2</BubbleReactions>
      </Bubble>
      <Bubble variant="tinted">
        <BubbleContent>
          Reminder: drop your notes in the shared doc before we start.
        </BubbleContent>
      </Bubble>
      <Bubble variant="destructive" align="end">
        <BubbleContent render={<button type="button" />}>
          Message failed to send — tap to retry.
        </BubbleContent>
      </Bubble>
    </div>
  )
}
