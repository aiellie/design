import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble"
import { Marker, MarkerContent } from "@/components/ui/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
} from "@/components/ui/message"
import { Attachment, AttachmentMedia, AttachmentContent, AttachmentTitle, AttachmentDescription, AttachmentActions, AttachmentAction } from "@/components/ui/attachment"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HugeiconsIcon } from "@hugeicons/react"
import { DownloadIcon, Pdf02Icon } from "@hugeicons/core-free-icons"
export function MessageExample() {
  return (
    <div className="flex justify-center">
    <div className="flex w-full flex-col gap-6 py-0">
    <Marker variant="separator">
        <MarkerContent className="text-xs">Friday · 4:55 PM</MarkerContent>
      </Marker>
    <Message align="end">
        <MessageContent>
          <Attachment orientation="vertical" className="has-data-[slot=attachment-media]:p-0">
            <AttachmentMedia variant="image">
              <img
                src="https://avatar.aiellie.dev/aielliedev"
                alt="Workspace"
              />
            </AttachmentMedia>
          </Attachment>
          <Bubble>
            <BubbleContent>
              Here&apos;s the image. Can you add it to the PDF? Use it for the
              cover page.
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="/brand/agent.png" alt="Agent" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>It&apos;s 4:55 PM. On a Friday.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>It&apos;s a one-line change.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="/brand/agent.png" alt="Agent" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>Fine, let me take a look 😭</BubbleContent>
              <BubbleReactions aria-label="Reactions: thumbs up">
                <span>👍</span>
              </BubbleReactions>
            </Bubble>
          <Attachment size="sm">
            <AttachmentMedia  className="text-red-500 bg-red-500/5">
              <HugeiconsIcon icon={Pdf02Icon} />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
              <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <AttachmentAction
                      type="button"
                      aria-label="Download"
                      variant="ghost"
                    >
                      <HugeiconsIcon icon={DownloadIcon} />
                    </AttachmentAction>
                  }
                />
                <TooltipContent>Download</TooltipContent>
              </Tooltip>
            </AttachmentActions>
          </Attachment>
          </BubbleGroup>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Thanks. Looks good.</BubbleContent>
          </Bubble>
          <MessageFooter>Delivered</MessageFooter>
        </MessageContent>
      </Message>
      {/*<Marker role="status">
        <MarkerContent className="shimmer">
          <span className="font-medium">Oliver</span> is typing...
        </MarkerContent>
      </Marker>*/}
    </div>
    </div>
  )
}
