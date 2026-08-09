"use client"

import { Bubble, BubbleContent } from '@/components/ui/bubble'
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/components/ui/message-scroller'

const messages = [
  { id: "1", from: "them", text: "Hey! Quick question about the beach house." },
  { id: "2", from: "me", text: "Sure, what's up?" },
  { id: "3", from: "them", text: "Does the booking include the kayaks?" },
  { id: "4", from: "me", text: "Yep — both kayaks and the paddleboards." },
  { id: "5", from: "them", text: "Amazing. And check-in is still 3 PM?" },
  {
    id: "6",
    from: "me",
    text: "3 PM sharp. The door code is in your confirmation email.",
  },
  { id: "7", from: "them", text: "Found it, thanks!" },
  { id: "8", from: "me", text: "Anything else before Friday?" },
  { id: "9", from: "them", text: "Nope, that covers it. See you then!" },
  { id: "10", from: "me", text: "Safe travels — see you Friday!" },
] as const

export function MessageScrollerExample() {
  return (
    <div className="h-72 w-full">
      <MessageScrollerProvider defaultScrollPosition="end">
        <MessageScroller>
          <MessageScrollerViewport className="px-1">
            <MessageScrollerContent className="gap-3 py-2">
              {messages.map((message) => (
                <MessageScrollerItem
                  key={message.id}
                  messageId={message.id}
                  className="flex flex-col"
                >
                  <Bubble
                    variant={message.from === "me" ? "default" : "muted"}
                    align={message.from === "me" ? "end" : "start"}
                  >
                    <BubbleContent>{message.text}</BubbleContent>
                  </Bubble>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  )
}
