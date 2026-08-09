"use client"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { HugeiconsIcon } from "@hugeicons/react"
import { Tick02Icon } from "@hugeicons/core-free-icons"

export function AvatarExample() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-2">
      <div className="flex items-end gap-4">
        <Avatar size="sm">
          <AvatarFallback>EL</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>JD</AvatarFallback>
          <AvatarBadge className="bg-emerald-500">
            <span className="sr-only">Online</span>
          </AvatarBadge>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
          <AvatarFallback>VC</AvatarFallback>
          <AvatarBadge>
            <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
            <span className="sr-only">Verified</span>
          </AvatarBadge>
        </Avatar>
      </div>
      <AvatarGroup>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>MK</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  )
}
