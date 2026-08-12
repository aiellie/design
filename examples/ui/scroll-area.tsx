import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { AddIcon } from "@hugeicons/core-free-icons"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
} from "@/components/ui/item"
import { ScrollArea } from "@/components/ui/scroll-area"

const people = [
  {
    username: "shadcn",
    avatar: "https://avatar.aiellie.dev/shadcn.png",
    email: "shadcn@vercel.com",
  },
  {
    username: "maxleiter",
    avatar: "https://avatar.aiellie.dev/maxleiter.png",
    email: "maxleiter@vercel.com",
  },
  {
    username: "evilrabbit",
    avatar: "https://avatar.aiellie.dev/evilrabbit.png",
    email: "evilrabbit@vercel.com",
  },
  {
    username: "rauchg",
    avatar: "https://avatar.aiellie.dev/rauchg.png",
    email: "rauchg@vercel.com",
  },
  {
    username: "leerob",
    avatar: "https://avatar.aiellie.dev/leerob.png",
    email: "leerob@vercel.com",
  },
  {
    username: "timneutkens",
    avatar: "https://avatar.aiellie.dev/timneutkens.png",
    email: "tim@vercel.com",
  },
  {
    username: "styfle",
    avatar: "https://avatar.aiellie.dev/styfle.png",
    email: "styfle@vercel.com",
  },
  {
    username: "timer",
    avatar: "https://avatar.aiellie.dev/timer.png",
    email: "timer@vercel.com",
  },
  {
    username: "ijjk",
    avatar: "https://avatar.aiellie.dev/ijjk.png",
    email: "ijjk@vercel.com",
  },
  {
    username: "padmajab",
    avatar: "https://avatar.aiellie.dev/padmajab.png",
    email: "padmaja@vercel.com",
  },
  {
    username: "delbaoliveira",
    avatar: "https://avatar.aiellie.dev/delbaoliveira.png",
    email: "delba@vercel.com",
  },
  {
    username: "shuding",
    avatar: "https://avatar.aiellie.dev/shuding.png",
    email: "shu@vercel.com",
  },
  {
    username: "huozhi",
    avatar: "https://avatar.aiellie.dev/huozhi.png",
    email: "huozhi@vercel.com",
  },
  {
    username: "sebmarkbage",
    avatar: "https://avatar.aiellie.dev/sebmarkbage.png",
    email: "seb@vercel.com",
  },
  {
    username: "gaearon",
    avatar: "https://avatar.aiellie.dev/gaearon.png",
    email: "dan@vercel.com",
  },
  {
    username: "acdlite",
    avatar: "https://avatar.aiellie.dev/acdlite.png",
    email: "andrew@vercel.com",
  },
  {
    username: "sophiebits",
    avatar: "https://avatar.aiellie.dev/sophiebits.png",
    email: "sophie@vercel.com",
  },
  {
    username: "trueadm",
    avatar: "https://avatar.aiellie.dev/trueadm.png",
    email: "dominic@vercel.com",
  },
  {
    username: "rickhanlonii",
    avatar: "https://avatar.aiellie.dev/rickhanlonii.png",
    email: "rick@vercel.com",
  },
  {
    username: "lunaruan",
    avatar: "https://avatar.aiellie.dev/lunaruan.png",
    email: "luna@vercel.com",
  },
  {
    username: "jess",
    avatar: "https://avatar.aiellie.dev/jess.png",
    email: "jess@vercel.com",
  },
  {
    username: "colmtut",
    avatar: "https://avatar.aiellie.dev/colmtut.png",
    email: "colm@vercel.com",
  },
  {
    username: "pedro",
    avatar: "https://avatar.aiellie.dev/pedro.png",
    email: "pedro@vercel.com",
  },
  {
    username: "andy",
    avatar: "https://avatar.aiellie.dev/andy.png",
    email: "andy@vercel.com",
  },
]

export function ScrollAreaExample() {
  return (
    <div className="flex justify-center">
      <ScrollArea className="h-72 w-72 rounded-lg border">
        <ItemGroup className="gap-2 p-3">
          {people.map((person) => (
            <Item key={person.username} variant="outline" size="xs">
              <ItemMedia>
                <Avatar size="sm">
                  <AvatarImage src={person.avatar} alt={`@${person.username}`} />
                  <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemDescription>@{person.username}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon-xs" className="rounded-full">
                  <HugeiconsIcon
                    icon={AddIcon}
                    strokeWidth={2}
                    className="size-4 text-muted-foreground"
                  />
                </Button>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </ScrollArea>
    </div>
  )
}
