import { Markdown } from "@/components/markdown"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/toast"
import { Info } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
export function BubbleExample() {
  return (
    <div className="flex w-full mx-auto max-w-sm flex-col gap-12">
      <Bubble variant="default"  align="end">
        <BubbleContent>Hi I am the primary user</BubbleContent>
      </Bubble>
      <Bubble variant="secondary" align="start">
        <BubbleContent>Hi I am the agent. How can I help you today?</BubbleContent>
      </Bubble>
      <BubbleGroup>
        <Bubble variant="outline" className="*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:border-dashed" align="end">
          <BubbleContent render={<button onClick={() => toast.add({ description: "You clicked forgot password" })}>Show me a ghost bubble</button>} />
        </Bubble>
        <Bubble variant="outline" className="*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:border-dashed" align="end">
          <BubbleContent render={<button onClick={() =>
                  toast.add({ description: "You clicked something else. Talk to a human." })
                }>Show me a tinted bubble</button>} />
        </Bubble>
        <Bubble variant="outline" className="*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:border-dashed" align="end">
          <BubbleContent render={<button onClick={() => toast.add({ description: "You clicked help with subscription" })}>Show me a destructive bubble</button>} />
        </Bubble>
      </BubbleGroup>
     {/* <Bubble variant="muted">
        <BubbleContent>
          This one is muted. It uses a lower emphasis color for the chat bubble.
        </BubbleContent>
        <BubbleReactions role="img" aria-label="Reaction: thumbs up">
          <span>👍</span>
        </BubbleReactions>
      </Bubble> */}
      <Bubble variant="tinted" align="start" className="*:data-[slot=bubble-content]:bg-primary/5 *:data-[slot=bubble-content]:text-primary">
        <BubbleContent>
          This one is tinted. The tint is a softer color derived from the
          primary color.
        </BubbleContent>
      </Bubble>
   {/*   <Bubble variant="outline">
        <BubbleContent>We can also use an outlined variant.</BubbleContent>
      </Bubble> */}
      <Bubble variant="ghost">
        <BubbleContent>
          <Markdown>{`Ghost bubbles work for assistant text, **markdown**, and other content that should not be framed.

This is perfect for assistant messages that should not have a frame and can take the full width of the container. You can also render \`code\` in it.

Ghost bubbles are full width and can take the full width of the container.
`}</Markdown>
        </BubbleContent>
      </Bubble>
      <Bubble variant="destructive" className="*:data-[slot=bubble-content]:bg-destructive/5 *:data-[slot=bubble-content]:text-destructive" align="end">
        <BubbleContent>Ok thanks!</BubbleContent>
        <BubbleReactions role="img" aria-label="Reaction: fire">
        <Popover>
            <PopoverTrigger render={<Button variant="ghost" size="icon-xs" aria-label="Show error details" className="aria-expanded:text-destructive"><HugeiconsIcon icon={Info} /></Button>} />
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle className="text-sm">
                  Command failed with exit code 1
                </PopoverTitle>
                <PopoverDescription className="text-sm">
                  Error: Failed to send message
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>        </BubbleReactions>
      </Bubble>
    </div>
  )
}
