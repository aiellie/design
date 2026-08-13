"use client"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import { Home01Icon } from "@hugeicons/core-free-icons"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { BookOpen01Icon, PaintBrush01Icon, GithubIcon, ComponentIcon, Route02Icon } from "@hugeicons/core-free-icons"
import { CodeIcons } from "@/icons/code-icons"

export function BreadcrumbExample() {
  return (
    <div className="flex w-full flex-col gap-5 mx-auto max-w-sm">
 <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  size="icon-sm"
                  variant="ghost"
                  aria-label="Home"
                >
                  <HugeiconsIcon icon={Home01Icon} strokeWidth={2} />
                </Button>
              }
            />
            <TooltipContent>Home</TooltipContent>
          </Tooltip>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button size="icon-sm" variant="ghost"><BreadcrumbEllipsis /><span className="sr-only">Toggle menu</span></Button>} />
            <DropdownMenuContent align="start" className="w-36">
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  <HugeiconsIcon icon={BookOpen01Icon} className="text-muted-foreground" />
                  Docs
                  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <HugeiconsIcon icon={PaintBrush01Icon}  className="text-muted-foreground" />
                  Themes
                  <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <HugeiconsIcon icon={GithubIcon}  className="text-muted-foreground" />
                  GitHub
                  <DropdownMenuShortcut>⌘G</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="flex items-center gap-2" render={<a href="#"><HugeiconsIcon icon={ComponentIcon} size={14} strokeWidth={2} /> Components</a>} />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="flex items-center gap-2"> <HugeiconsIcon icon={Route02Icon} size={14} strokeWidth={2} /> Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbList className="font-mono text-xs">
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="flex items-center gap-1.5">
              <CodeIcons.tsx className="size-3.5" />
              examples
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">ui</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>breadcrumb.tsx</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
