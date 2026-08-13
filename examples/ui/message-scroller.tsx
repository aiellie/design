"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"

import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUp02Icon, AiSearch02Icon, AiImageIcon, AudioWave01Icon, MessageSquareDashedIcon, AttachmentIcon, MoreHorizontalIcon, Plus, RotateCw, Telescope02Icon  } from '@hugeicons/core-free-icons';
import { createChat, getMessageText } from "@/lib/ai"
import { MessageAnimated } from "@/components/message-animated"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
} from "@/components/ui/input-group"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
const chat = createChat()
  .user(
    "I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI streams a reply, the whole thread jumps around."
  )
  .sleep(1000)
  .assistant(({ writer }) => {
    writer.reasoning(
      "They are describing a streaming transcript that keeps taking control of the viewport. I should explain when auto-scroll follows and when it stops."
    )
    writer.sleep(1000)
    writer.text(
      "That's the classic streaming scroll problem. Wrap your message list in `MessageScroller` and turn on `autoScroll` — the viewport pins to the bottom as tokens arrive, so users always see the latest text land in place.\n\nThe important part: it only auto-scrolls while the reader is already at the bottom. The moment they scroll up to read something earlier, auto-scroll backs off and their position is preserved. You get smooth streaming without fighting the user's intent."
    )
  })
  .user(
    "Okay, but when someone sends a new message the view still feels jarring — like the whole conversation reloads from the top."
  )
  .sleep(1000)
  .assistant(
    "MessageScrollerItem fixes that with turn anchoring. Set `scrollAnchor` on the turn that should settle near the top instead of blindly snapping to the document bottom.\n\nIt also leaves a small peek of the previous exchange visible above the anchor, so context isn't lost. The reply starts in view without that disorienting jump you get from a plain overflow container."
  )
  .user(
    "And if they've scrolled up to re-read an older answer? I don't want to yank them back down."
  )
  .sleep(1000)
  .assistant(
    "You won't. Auto-scroll only runs when the viewport is already pinned to the bottom, so scrolling up is a deliberate opt-out — their place in the thread stays put even as new tokens keep arriving below.\n\nWhen there is content they haven't seen yet, `MessageScrollerButton` appears at the bottom of the viewport. One tap jumps them back to the newest message and re-engages auto-scroll. Same pattern as Slack or iMessage: quiet when you're caught up, helpful when you're not."
  )
  .user("Last one — does this work with assistive tech?")
  .sleep(1000)
  .assistant(
    '`MessageScrollerContent` sets `role="log"` and `aria-relevant="additions"` by default, so screen readers announce new messages as they stream in.\n\nThe scroll button is a real `<button>` with an sr-only label, and it\'s removed from the tab order when you\'re already at the bottom — no ghost focus stops.'
  )
const initialMessages = chat.get(0)
const transport = chat.transport({ delayMs: 20 })

export function MessageScrollerExample() {
  const { messages, sendMessage, status, setMessages } = useChat({
    messages: initialMessages,
    transport,
  })
  const nextMessage = chat.next(messages)
  const isBusy = status === "submitted" || status === "streaming"
  const [voice, setVoice] = React.useState(false)

  return (
    <MessageScrollerProvider>
      <div className="relative flex flex-col gap-4">
        <Card className="mx-auto h-140 w-full max-w-lg gap-0">
          <CardHeader className="border-b pt-0! px-2! py-0!">
            <CardDescription>Message Scroller Demo</CardDescription>
            <CardAction>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Conversation settings"
                    >
                      <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem
                    disabled={isBusy}
                    onClick={() => setMessages(initialMessages)}
                  >
                    <HugeiconsIcon icon={RotateCw} />
                    Reset conversation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardAction>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            {messages.length === 0 ? (
              <Empty className="h-full">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <HugeiconsIcon icon={MessageSquareDashedIcon} />
                  </EmptyMedia>
                  <EmptyTitle>Morning, aiellie!</EmptyTitle>
                  <EmptyDescription>
                    What are we working on today? Press send to start a new
                    conversation
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <MessageScroller>
                <MessageScrollerViewport>
                  <MessageScrollerContent
                    aria-busy={isBusy}
                    className="p-(--card-spacing)"
                  >
                    {messages.map((message) => (
                      <MessageAnimated
                        key={message.id}
                        message={message}
                        scrollAnchor={message.role === "user"}
                      />
                    ))}
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton className="rounded-full" />
              </MessageScroller>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2 px-2">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!nextMessage || isBusy) {
                  return
                }
                void sendMessage(nextMessage)
              }}
              className="w-full"
            >
              <ButtonGroup className="w-full min-w-0 items-center">
                <ButtonGroup>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          aria-label="Add files"
                          type="button"
                          size="icon-sm"
                          variant="outline"
                        >
                          <HugeiconsIcon icon={Plus} />
                        </Button>
                      }
                    />
                    <DropdownMenuContent
                      align="start"
                      side="top"
                      className="w-44"
                    >
                      <DropdownMenuItem>
                        <HugeiconsIcon icon={AttachmentIcon} />
                        Add Photos & Files
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <HugeiconsIcon icon={AiImageIcon} />
                        Create Image
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <HugeiconsIcon icon={Telescope02Icon} />
                        Deep Research
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <HugeiconsIcon icon={AiSearch02Icon} />
                        Web Search
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </ButtonGroup>
                <ButtonGroup className="min-w-0 flex-1">
                  <InputGroup className="overflow-hidden">
                    <div className="min-w-0 flex-1 px-3">
                      <span
                        className="block truncate opacity-60 data-[status=ready]:opacity-100"
                        data-status={status}
                      >
                        {voice ? (
                          <span className="text-muted-foreground">
                            Record and send audio...
                          </span>
                        ) : nextMessage ? (
                          getMessageText(nextMessage)
                        ) : (
                          <span className="text-muted-foreground">
                            No messages queued. Reset the conversation.
                          </span>
                        )}
                      </span>
                    </div>
                    <InputGroupAddon align="inline-end">
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <InputGroupButton
                              type="button"
                              size="icon-xs"
                              aria-label="Voice mode"
                              aria-pressed={voice}
                              onClick={() => setVoice(!voice)}
                              className="aria-pressed:bg-destructive/5 aria-pressed:text-destructive"
                            >
                              <HugeiconsIcon
                                icon={AudioWave01Icon}
                                strokeWidth={2}
                              />
                            </InputGroupButton>
                          }
                        />
                        <TooltipContent>Voice mode</TooltipContent>
                      </Tooltip>
                    </InputGroupAddon>
                  </InputGroup>
                </ButtonGroup>
                <ButtonGroup>
                  <Button
                    type="submit"
                    variant="default"
                    size="icon-sm"
                    disabled={!nextMessage || isBusy}
                    aria-label="Send"
                  >
                    <HugeiconsIcon icon={ArrowUp02Icon} />
                    <span className="sr-only">Send</span>
                  </Button>
                </ButtonGroup>
              </ButtonGroup>
            </form>
          </CardFooter>
        </Card>
        <div className="px-0.5 text-center text-xs text-muted-foreground">
          Demo is read only. Press send to send messages.
        </div>
      </div>
    </MessageScrollerProvider>
  )
}
