"use client"

import * as React from "react"

import { StatusIcon } from "@/app/components/status-badge"
import { statusOf, useStatuses } from "@/app/components/status-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { exampleStatuses, statusMeta } from "@/examples/status"
import { Icon, Icons, type IconData } from "@/icons/icons"

/** Where the Open submenu can send the item. */
export type OpenTarget = "fullscreen" | "v0" | "chatgpt" | "claude" | "gemini"

const openTargets: { id: OpenTarget; label: string; icon: IconData }[] = [
  { id: "fullscreen", label: "Full Screen", icon: Icons.arrowExpand },
  { id: "v0", label: "V0", icon: Icons.v0 },
  { id: "chatgpt", label: "ChatGPT", icon: Icons.chatGpt },
  { id: "claude", label: "Claude", icon: Icons.claude },
  { id: "gemini", label: "Gemini", icon: Icons.gemini },
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
                  size="icon-sm"
                  className={className}
                  aria-label={name ? `${name} actions` : "Actions"}
                >
                  <Icon icon={Icons.more} />
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
          <Icon icon={Icons.doc} className="size-3.5" />
          Docs
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon icon={Icons.share} className="size-3.5" />
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
          <Icon icon={Icons.edit} className="size-3.5" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDuplicate}>
          <Icon icon={Icons.copy} className="size-3.5" />
          Duplicate
        </DropdownMenuItem>
        {/* Stays open so the heart can fill in place as feedback. */}
        <DropdownMenuItem closeOnClick={false} onClick={toggleFavorite}>
          <Icon
            icon={Icons.heart}
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
            <Icon icon={Icons.progress} className="size-3.5" />
            Status
            <span className="ml-auto text-xs text-muted-foreground">
              {statusMeta[current].label}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-40">
            {exampleStatuses.map((status) => (
              <DropdownMenuItem
                key={status.id}
                onClick={() => setStatus(slug, status.id)}
              >
                <StatusIcon status={status.id} />
                {status.label}
                {current === status.id ? (
                  <Icon icon={Icons.check} className="ml-auto size-3.5" />
                ) : null}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={onDelete}>
          <Icon icon={Icons.delete} className="size-3.5" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
