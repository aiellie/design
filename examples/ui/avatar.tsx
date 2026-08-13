import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Briefcase01Icon,
  Crown02Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

type Member = {
  handle: string
  name: string
  initials: string
  role: string
  avatar: string
}

const members: Member[] = [
  {
    handle: "@shadcn",
    name: "shadcn",
    initials: "CN",
    role: "Design engineer",
    avatar: "https://avatar.aiellie.dev/shadcn",
  },
  {
    handle: "@maxleiter",
    name: "Max Leiter",
    initials: "LR",
    role: "Software engineer",
    avatar: "https://avatar.aiellie.dev/maxleiter.svg?icon=cat",
  },
  {
    handle: "@evilrabbit",
    name: "Evil Rabbit",
    initials: "ER",
    role: "Designer",
    avatar: "https://avatar.aiellie.dev/evilrabbit",
  },
]

/** The people behind the "+3" — listed in the overflow dropdown. */
const overflow: Omit<Member, "role">[] = [
  {
    handle: "@adaperez",
    name: "Ada Perez",
    initials: "AP",
    avatar: "https://avatar.aiellie.dev/ada.svg?text=AP",
  },
  {
    handle: "@kenito",
    name: "Ken Ito",
    initials: "KI",
    avatar: "https://avatar.aiellie.dev/ken",
  },
  {
    handle: "@nadiaali",
    name: "Nadia Ali",
    initials: "NA",
    avatar: "https://avatar.aiellie.dev/nadia",
  },
]

function MemberAvatar({ member }: { member: Member }) {
  return (
    <Popover>
      <PopoverTrigger
        nativeButton={false}
        render={
          <Avatar
            tabIndex={0}
            className="cursor-pointer data-popup-open:z-10 data-popup-open:-translate-y-1"
          >
            <AvatarImage src={member.avatar} alt={member.handle} />
            <AvatarFallback>{member.initials}</AvatarFallback>
          </Avatar>
        }
      />
      <PopoverContent align="start" className="w-60 gap-2">
        <div className="flex items-start gap-2.5">
          <Avatar size="lg">
            <AvatarImage src={member.avatar} alt={member.handle} />
            <AvatarFallback>{member.initials}</AvatarFallback>
          </Avatar>
          <PopoverHeader className="min-w-0 gap-0.5">
            <PopoverTitle className="leading-tight">{member.name}</PopoverTitle>
            <PopoverDescription className="text-xs">
              {member.handle}
            </PopoverDescription>
          </PopoverHeader>
        </div>
        <div className="-mx-2.5 -mb-2.5 flex items-center gap-1.5 rounded-b-lg border-t border-border bg-muted/40 px-2.5 py-2 text-xs text-muted-foreground">
          <HugeiconsIcon
            icon={Briefcase01Icon}
            strokeWidth={2}
            className="size-3.5"
          />
          {member.role}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function AvatarExample() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12 justify-center mx-auto max-w-xl">
      <Avatar>
        <AvatarImage src="https://avatar.aiellie.dev/shadcn" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Tooltip>
        <TooltipTrigger
          render={
            <Avatar className="cursor-pointer">
              <AvatarImage
                src="https://avatar.aiellie.dev/online"
                alt="@online"
              />
              <AvatarFallback>ON</AvatarFallback>
              <AvatarBadge className="border-1 border-green-200 bg-green-600 dark:bg-green-800" />
            </Avatar>
          }
        />
        <TooltipContent>Online</TooltipContent>
      </Tooltip>
      <Avatar>
        <AvatarImage src="https://avatar.aiellie.dev/pro-user" alt="@prouser" />
        <AvatarFallback>PU</AvatarFallback>
        <AvatarBadge className="border-rose-200 bg-rose-50 text-rose-600 p-0">
          <HugeiconsIcon icon={Crown02Icon} className="fill-current" />
        </AvatarBadge>
      </Avatar>
      <Avatar size="default">
          <AvatarImage src="https://avatar.aiellie.dev/verified" alt="@vercel" />
          <AvatarFallback>VC</AvatarFallback>
          <AvatarBadge className="bg-blue-500 text-blue-50 border-blue-200">
            <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
            <span className="sr-only">Verified</span>
          </AvatarBadge>
        </Avatar>
      {/* Triggers replace the avatar's data-slot, so the group's ring
          styling is re-applied to every direct child here. */}
      <AvatarGroup className="*:ring-2 *:ring-background *:transition-all *:duration-300 *:ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:space-x-1 *:hover:z-10 *:hover:-translate-y-1">
        {members.map((member) => (
          <MemberAvatar key={member.handle} member={member} />
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger
            nativeButton={false}
            render={
              <AvatarGroupCount tabIndex={0} className="cursor-pointer">
                +{overflow.length}
              </AvatarGroupCount>
            }
          />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              {overflow.map((person) => (
                <DropdownMenuItem key={person.handle}>
                  <Item size="xs" className="w-full p-2">
                    <ItemMedia>
                      <Avatar size="sm">
                        <AvatarImage src={person.avatar} alt={person.handle} />
                        <AvatarFallback>{person.initials}</AvatarFallback>
                      </Avatar>
                    </ItemMedia>
                    <ItemContent className="gap-0">
                      <ItemTitle>{person.name}</ItemTitle>
                      <ItemDescription className="leading-none">
                        {person.handle}
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </AvatarGroup>
    </div>
  )
}
 