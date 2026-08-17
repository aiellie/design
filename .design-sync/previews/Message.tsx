// Message preview — the repo's full conversation showcase from
// examples/ui/message.tsx, plus a minimal anatomy cell covering align,
// avatar, header, footer, and grouped bubbles.
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"

export { MessageExample as Showcase } from "@/examples/ui/message"

export function Anatomy() {
  return (
    <MessageGroup className="w-full max-w-md gap-5">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="https://avatar.aiellie.dev/ellie" alt="Ellie" />
            <AvatarFallback>E</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Ellie · Support</MessageHeader>
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>
                Morning! Your export finished — 214 components synced.
              </BubbleContent>
            </Bubble>
            <Bubble variant="muted">
              <BubbleContent>
                Want me to open the diff before you publish?
              </BubbleContent>
            </Bubble>
          </BubbleGroup>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Yes — just the color tokens, please.</BubbleContent>
          </Bubble>
          <MessageFooter>Read 9:42 AM</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
