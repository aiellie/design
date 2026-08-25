"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BrainIcon,
  Chatting01Icon,
  RotateCw,
} from "@hugeicons/core-free-icons"

import { Markdown } from "@/components/markdown"
import {
  MessageInput,
  MessageInputField,
  MessageInputSubmit,
} from "@/components/chat/message-input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { Spinner } from "@/components/ui/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

/** Empty-state prompts; each sends immediately on click. */
const SUGGESTIONS = [
  "What can you help me with?",
  "Show me a small TypeScript snippet",
  "Write a haiku about design systems",
]

const transport = new DefaultChatTransport({ api: "/api/chat" })

function AssistantAvatar() {
  return (
    <Avatar>
      <AvatarImage src="/brand/agent.png" alt="Assistant" />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  )
}

function ChatMessage({ message }: { message: UIMessage }) {
  const isUser = message.role === "user"
  const hasVisibleContent = message.parts.some(
    (part) =>
      (part.type === "text" || part.type === "reasoning") &&
      part.text.trim().length > 0
  )
  if (!hasVisibleContent) {
    return null
  }

  return (
    <Message align={isUser ? "end" : "start"}>
      {!isUser && (
        <MessageAvatar>
          <AssistantAvatar />
        </MessageAvatar>
      )}
      <MessageContent>
        {message.parts.map((part, index) => {
          const key = `${message.id}-${index}`

          if (part.type === "reasoning" && part.text.trim().length > 0) {
            return (
              <div
                key={key}
                className="w-full border-l-2 border-muted-foreground/30 pl-3 text-muted-foreground"
              >
                <div className="mb-1 flex items-center gap-1.5 text-xs font-medium">
                  <HugeiconsIcon icon={BrainIcon} className="size-3.5" />
                  Reasoning
                </div>
                <p className="text-sm whitespace-pre-wrap">{part.text}</p>
              </div>
            )
          }

          if (part.type !== "text" || part.text.length === 0) {
            return null
          }

          return isUser ? (
            <Bubble key={key}>
              <BubbleContent className="whitespace-pre-wrap">
                {part.text}
              </BubbleContent>
            </Bubble>
          ) : (
            <Bubble key={key} variant="ghost">
              <BubbleContent>
                <Markdown>{part.text}</Markdown>
              </BubbleContent>
            </Bubble>
          )
        })}
      </MessageContent>
    </Message>
  )
}

export function ChatExample() {
  const {
    messages,
    sendMessage,
    status,
    stop,
    error,
    regenerate,
    setMessages,
    clearError,
  } = useChat({ transport })

  const isBusy = status === "submitted" || status === "streaming"
  const lastMessage = messages.at(-1)
  // Cover the gap between sending and the first streamed text — including
  // adaptive thinking, where the model reasons before it speaks.
  const awaitingText =
    status === "submitted" ||
    (status === "streaming" &&
      lastMessage?.role === "assistant" &&
      !lastMessage.parts.some(
        (part) => part.type === "text" && part.text.length > 0
      ))

  return (
    <MessageScrollerProvider>
      <Card className="mx-auto h-140 w-full max-w-lg gap-0">
        <CardHeader className="border-b">
          <CardTitle>Claude</CardTitle>
          <CardDescription>claude-opus-4.8 · AI Gateway</CardDescription>
          <CardAction>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="New chat"
                    disabled={isBusy || messages.length === 0}
                    onClick={() => {
                      setMessages([])
                      clearError()
                    }}
                  >
                    <HugeiconsIcon icon={RotateCw} strokeWidth={2} />
                  </Button>
                }
              />
              <TooltipContent>New chat</TooltipContent>
            </Tooltip>
          </CardAction>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          {messages.length === 0 ? (
            <Empty className="h-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <HugeiconsIcon icon={Chatting01Icon} />
                </EmptyMedia>
                <EmptyTitle>Chat with Claude</EmptyTitle>
                <EmptyDescription>
                  Replies stream in live from claude-opus-4.8 through the
                  Vercel AI Gateway. Send a message to start.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => void sendMessage({ text: suggestion })}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </EmptyContent>
            </Empty>
          ) : (
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent
                  aria-busy={isBusy}
                  className="p-(--card-spacing)"
                >
                  {messages.map((message) => (
                    <MessageScrollerItem
                      key={message.id}
                      messageId={message.id}
                      scrollAnchor={message.role === "user"}
                    >
                      <ChatMessage message={message} />
                    </MessageScrollerItem>
                  ))}
                  {awaitingText && !error && (
                    <Message>
                      <MessageAvatar>
                        <AssistantAvatar />
                      </MessageAvatar>
                      <MessageContent>
                        <div className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground">
                          <Spinner className="size-3.5" />
                          Thinking…
                        </div>
                      </MessageContent>
                    </Message>
                  )}
                  {error && (
                    <Message>
                      <MessageAvatar>
                        <AssistantAvatar />
                      </MessageAvatar>
                      <MessageContent>
                        <Bubble variant="destructive">
                          <BubbleContent>{error.message}</BubbleContent>
                        </Bubble>
                        <div className="px-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => void regenerate()}
                          >
                            Try again
                          </Button>
                        </div>
                      </MessageContent>
                    </Message>
                  )}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          )}
        </CardContent>
        <CardFooter>
          <MessageInput
            className="w-full"
            onSubmit={(text) => void sendMessage({ text })}
          >
            <MessageInputField placeholder="Message Claude..." />
            <MessageInputSubmit status={status} onStop={stop} />
          </MessageInput>
        </CardFooter>
      </Card>
    </MessageScrollerProvider>
  )
}
