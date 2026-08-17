// HoverCard preview — hover cards never show in a static capture, so both
// hand cells force `open` on the root while keeping the inline trigger as the
// anchor. Showcase ports the example's @vercel profile card; MemberPreview is
// a teammate profile. TriggerDemo ships the example (closed trigger).
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { HugeiconsIcon } from "@hugeicons/react"
import { Calendar03Icon } from "@hugeicons/core-free-icons"

export function Showcase() {
  return (
    <div className="flex w-full items-center justify-center text-sm">
      <p className="text-muted-foreground">
        Created by{" "}
        <HoverCard open>
          <HoverCardTrigger
            render={
              <Button variant="link" className="h-auto p-0">
                @vercel
              </Button>
            }
          />
          <HoverCardContent className="w-72 p-3">
            <div className="flex gap-3">
              <Avatar size="lg">
                <AvatarImage
                  src="https://github.com/vercel.png"
                  alt="@vercel"
                />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold">@vercel</h4>
                <p>Develop. Preview. Ship.</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <HugeiconsIcon
                    icon={Calendar03Icon}
                    strokeWidth={2}
                    className="size-3.5"
                  />
                  Joined December 2021
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </p>
    </div>
  )
}

export function MemberPreview() {
  return (
    <div className="flex w-full items-center justify-center text-sm">
      <p className="text-muted-foreground">
        Assigned to{" "}
        <HoverCard open>
          <HoverCardTrigger
            render={
              <Button variant="link" className="h-auto p-0">
                Maya Kim
              </Button>
            }
          />
          <HoverCardContent className="w-72 p-3">
            <div className="flex gap-3">
              <Avatar size="lg">
                <AvatarImage
                  src="https://avatar.aiellie.dev/MK"
                  alt="Maya Kim"
                />
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold">Maya Kim</h4>
                <p>Design engineer · Platform team</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <HugeiconsIcon
                    icon={Calendar03Icon}
                    strokeWidth={2}
                    className="size-3.5"
                  />
                  Joined March 2024
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </p>
    </div>
  )
}

export { HoverCardExample as TriggerDemo } from "@/examples/ui/hover-card"
