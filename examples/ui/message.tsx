"use client"

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Bubble, BubbleContent } from '@/components/ui/bubble'
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from '@/components/ui/message'
import { HugeiconsIcon } from "@hugeicons/react"
import { TickDouble02Icon } from "@hugeicons/core-free-icons"

export function MessageExample() {
  return (
    <MessageGroup className="w-full">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Mira Kapoor · 9:41 AM</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>
              Morning! Did you get a chance to look at the onboarding flow?
            </BubbleContent>
          </Bubble>
          <Bubble variant="muted">
            <BubbleContent>No rush — end of day is fine.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble align="end">
            <BubbleContent>
              Just finished. Left a few comments on the empty states.
            </BubbleContent>
          </Bubble>
          <MessageFooter>
            Delivered
            <HugeiconsIcon
              icon={TickDouble02Icon}
              strokeWidth={2}
              className="ml-1 size-3.5"
            />
          </MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
