import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AppWindowIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Bookmark01Icon,
  CodeIcon,
  FloppyDiskIcon,
  Link01Icon,
  LinkSquare01Icon,
  ReloadIcon,
  Trash,
  Wrench01Icon,
} from "@hugeicons/core-free-icons"

export function ContextMenuExample() {
  return (
    <div className="flex w-full items-center justify-center">
    <ContextMenu>
    <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
    <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuGroup>
          <ContextMenuItem>
            <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <HugeiconsIcon icon={ReloadIcon} strokeWidth={2} />
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <HugeiconsIcon icon={Wrench01Icon} strokeWidth={2} />
              More Tools
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-44">
              <ContextMenuGroup>
                <ContextMenuItem>
                  <HugeiconsIcon icon={FloppyDiskIcon} strokeWidth={2} />
                  Save Page...
                </ContextMenuItem>
                <ContextMenuItem>
                  <HugeiconsIcon icon={LinkSquare01Icon} strokeWidth={2} />
                  Create Shortcut...
                </ContextMenuItem>
                <ContextMenuItem>
                  <HugeiconsIcon icon={AppWindowIcon} strokeWidth={2} />
                  Name Window...
                </ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem>
                  <HugeiconsIcon icon={CodeIcon} strokeWidth={2} />
                  Developer Tools
                </ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem variant="destructive">
                  <HugeiconsIcon icon={Trash} strokeWidth={1.5} className="size-3.5" />
                  Delete
                </ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuCheckboxItem checked>
            <HugeiconsIcon icon={Bookmark01Icon} strokeWidth={2} className="size-3.5" />
            Show Bookmarks
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>
            <HugeiconsIcon icon={Link01Icon} strokeWidth={2} className="size-3.5" />
            Show Full URLs
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuRadioGroup value="pedro">
            <ContextMenuLabel>People</ContextMenuLabel>
            <ContextMenuRadioItem value="pedro">
              <Avatar className="size-4">
                <AvatarImage
                  src="https://avatar.aiellie.dev/pedro.svg"
                  alt="Pedro Duarte"
                />
                <AvatarFallback>PD</AvatarFallback>
              </Avatar>
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">
              <Avatar className="size-4">
                <AvatarImage
                  src="https://avatar.aiellie.dev/colmtut.svg"
                  alt="Colm Tuite"
                />
                <AvatarFallback>CT</AvatarFallback>
              </Avatar>
              Colm Tuite
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
    </div>
  )
}


     