// Avatar preview — canonical badge/group showcase from examples/ui/avatar.tsx,
// plus the size axis, fallback-only rendering, and a static group with count.
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

export { AvatarExample as Showcase } from "@/examples/ui/avatar"

export function Sizes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarImage src="https://avatar.aiellie.dev/sophie" alt="@sophie" />
        <AvatarFallback>SO</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://avatar.aiellie.dev/shadcn" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://avatar.aiellie.dev/milo" alt="@milo" />
        <AvatarFallback>MI</AvatarFallback>
      </Avatar>
    </div>
  )
}

export function Fallbacks() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback>AE</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-primary/5 text-primary">
          JT
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="font-medium">+9</AvatarFallback>
      </Avatar>
    </div>
  )
}

const reviewers = [
  { handle: "@nova", initials: "NV", avatar: "https://avatar.aiellie.dev/nova" },
  { handle: "@reef", initials: "RF", avatar: "https://avatar.aiellie.dev/reef" },
  {
    handle: "@cinder",
    initials: "CI",
    avatar: "https://avatar.aiellie.dev/cinder",
  },
  {
    handle: "@orbit",
    initials: "OR",
    avatar: "https://avatar.aiellie.dev/orbit",
  },
]

export function GroupWithCount() {
  return (
    <AvatarGroup>
      {reviewers.map((reviewer) => (
        <Avatar key={reviewer.handle}>
          <AvatarImage src={reviewer.avatar} alt={reviewer.handle} />
          <AvatarFallback>{reviewer.initials}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+5</AvatarGroupCount>
    </AvatarGroup>
  )
}
