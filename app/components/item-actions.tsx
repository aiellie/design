"use client"

import * as React from "react"

import { StatusDot } from "@/app/components/status-badge"
import { statusOf, useStatuses } from "@/app/components/status-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  exampleStatuses,
  statusMeta,
  type ExampleStatus,
} from "@/examples/status"
import { Icon, type IconData } from "@/icons/icons"
import {
  ArrowExpand01Icon,
  ChatGptIcon,
  ClaudeIcon,
  Copy01Icon,
  Doc01Icon,
  Edit02Icon,
  GoogleGeminiIcon,
  HeartIcon,
  MoreHorizontalCircle01Icon,
  Progress01Icon,
  Share08Icon,
  Trash,
  TriangleIcon,
} from "@/icons/huge-icons"

/** Where the Open submenu can send the item. */
export type OpenTarget = "fullscreen" | "v0" | "chatgpt" | "claude" | "gemini"

const openTargets: { id: OpenTarget; label: string; icon: IconData }[] = [
  { id: "fullscreen", label: "Full Screen", icon: ArrowExpand01Icon },
  { id: "v0", label: "V0", icon: TriangleIcon },
  { id: "chatgpt", label: "ChatGPT", icon: ChatGptIcon },
  { id: "claude", label: "Claude", icon: ClaudeIcon },
  { id: "gemini", label: "Gemini", icon: GoogleGeminiIcon },
]

/**
 * Overflow menu for a single item: docs, open, edit, duplicate, favorite, a
 * status submenu, and delete. Status is wired to the shared status store;
 * favorite is controlled when `favorite` is passed and self-managed otherwise.
 */
export function ItemActions({
  slug,
  name,
  docsHref = `https://ui.shadcn.com/docs/components/${slug}`,
  favorite,
  onFavoriteChange,
  onOpen,
  onEdit,
  onDuplicate,
  onDelete,
  className,
}: {
  slug: string
  /** Item name, used in the trigger's accessible label. */
  name?: string
  /** Destination for the Docs item; opens in a new tab. */
  docsHref?: string
  /** Controlled favorite state — omit to let the menu track it internally. */
  favorite?: boolean
  onFavoriteChange?: (favorite: boolean) => void
  /** Fired with the chosen destination from the Open submenu. */
  onOpen?: (target: OpenTarget) => void
  onEdit?: () => void
  onDuplicate?: () => void
  onDelete?: () => void
  className?: string
}) {
  const { statuses, setStatus } = useStatuses()
  const current = statusOf(statuses, slug)

  const [internalFavorite, setInternalFavorite] = React.useState(false)
  const isFavorite = favorite ?? internalFavorite

  function toggleFavorite() {
    const next = !isFavorite
    setInternalFavorite(next)
    onFavoriteChange?.(next)
  }

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className={className}
                  aria-label={name ? `${name} actions` : "Actions"}
                >
                  <Icon icon={MoreHorizontalCircle01Icon} />
                </Button>
              }
            />
          }
        />
        <TooltipContent>Actions</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          render={
            <a href={docsHref} target="_blank" rel="noreferrer noopener" />
          }
        >
          <Icon icon={Doc01Icon} className="size-3.5" />
          Docs
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon icon={Share08Icon} className="size-3.5" />
            Open
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-40">
            {openTargets.map((target) => (
              <DropdownMenuItem
                key={target.id}
                onClick={() => onOpen?.(target.id)}
              >
                <Icon icon={target.icon} className="size-3.5" />
                {target.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={onEdit}>
          <Icon icon={Edit02Icon} className="size-3.5" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDuplicate}>
          <Icon icon={Copy01Icon} className="size-3.5" />
          Duplicate
        </DropdownMenuItem>
        {/* Stays open so the heart can fill in place as feedback. */}
        <DropdownMenuItem closeOnClick={false} onClick={toggleFavorite}>
          <Icon
            icon={HeartIcon}
            className={
              isFavorite
                ? "size-3.5 fill-rose-500! text-rose-500! hover:fill-rose-500! hover:text-rose-500!"
                : "size-3.5"
            }
          />
          {isFavorite ? "Favorited" : "Favorite"}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon icon={Progress01Icon} className="size-3.5" />
            Status
            <span className="ml-auto text-xs text-muted-foreground">
              {statusMeta[current].label}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-40">
            <DropdownMenuRadioGroup
              value={current}
              onValueChange={(value) =>
                setStatus(slug, value as ExampleStatus)
              }
            >
              {exampleStatuses.map((status) => (
                <DropdownMenuRadioItem key={status.id} value={status.id}>
                  <Icon icon={status.icon} className="size-3.5" />
                  {status.label}
                  <StatusDot status={status.id} className="ml-auto" />
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={onDelete}>
          <Icon icon={Trash} className="size-3.5" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
