// ContextMenu preview — a context menu anchors to the pointer, so a
// programmatic `open` would pin it to the viewport corner (the root's anchor
// rect defaults to 0,0). Showcase instead dispatches a real `contextmenu`
// event on the trigger after mount, opening the example's own menu at a
// realistic spot inside the dashed target. TriggerDemo is the repo example
// at rest. Cells enumerate alphabetically — Showcase stays first.
import * as React from "react"
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
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Bookmark01Icon,
  Link01Icon,
  ReloadIcon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons"

export function Showcase() {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const trigger = ref.current?.querySelector('[data-slot="context-menu-trigger"]')
    if (!trigger) return
    const rect = trigger.getBoundingClientRect()
    trigger.dispatchEvent(
      new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: true,
        clientX: rect.left + rect.width * 0.45,
        clientY: rect.top + rect.height * 0.4,
      })
    )
  }, [])

  return (
    <div ref={ref} className="flex w-full justify-center">
      <ContextMenu>
        <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
          Right click here
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

export { ContextMenuExample as TriggerDemo } from "@/examples/ui/context-menu"
