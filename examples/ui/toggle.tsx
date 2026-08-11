"use client"

import { useState } from "react"
import {
  BoldIcon,
  Bookmark01Icon,
  Fire02Icon,
  HeartIcon,
  StarIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Toggle } from "@/components/ui/toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type Reaction = {
  /** Verb while off; the tooltip and the accessible name both use it. */
  label: string
  /** Past tense, shown once it's on — the toggle says what it did, not what it does. */
  pressedLabel: string
  icon: typeof HeartIcon
  /** Pressed palette. `aria-pressed` is what Base UI sets, so style against it. */
  className: string
}

const reactions: Reaction[] = [
  {
    label: "Love",
    pressedLabel: "Loved",
    icon: HeartIcon,
    className:
      "aria-pressed:border-rose-500/20 aria-pressed:bg-rose-50 aria-pressed:text-rose-600 hover:aria-pressed:text-rose-600 dark:aria-pressed:border-rose-400/20 dark:aria-pressed:bg-rose-950 dark:aria-pressed:text-rose-400 dark:hover:aria-pressed:text-rose-400",
  },
  {
    label: "Like",
    pressedLabel: "Liked",
    icon: ThumbsUpIcon,
    className:
      "aria-pressed:border-blue-500/20 aria-pressed:bg-blue-50 aria-pressed:text-blue-600 hover:aria-pressed:text-blue-600 dark:aria-pressed:border-blue-400/20 dark:aria-pressed:bg-blue-950 dark:aria-pressed:text-blue-400 dark:hover:aria-pressed:text-blue-400",
  },
  {
    label: "Dislike",
    pressedLabel: "Disliked",
    icon: ThumbsDownIcon,
    className:
      "aria-pressed:border-slate-500/20 aria-pressed:bg-slate-100 aria-pressed:text-slate-600 hover:aria-pressed:text-slate-600 dark:aria-pressed:border-slate-400/20 dark:aria-pressed:bg-slate-900 dark:aria-pressed:text-slate-400 dark:hover:aria-pressed:text-slate-400",
  },
  {
    label: "Star",
    pressedLabel: "Starred",
    icon: StarIcon,
    className:
      "aria-pressed:border-amber-500/20 aria-pressed:bg-amber-50 aria-pressed:text-amber-600 hover:aria-pressed:text-amber-600 dark:aria-pressed:border-amber-400/20 dark:aria-pressed:bg-amber-950 dark:aria-pressed:text-amber-400 dark:hover:aria-pressed:text-amber-400",
  },
  {
    label: "Set on fire",
    pressedLabel: "On fire",
    icon: Fire02Icon,
    className:
      "aria-pressed:border-orange-500/20 aria-pressed:bg-orange-50 aria-pressed:text-orange-600 hover:aria-pressed:text-orange-600 dark:aria-pressed:border-orange-400/20 dark:aria-pressed:bg-orange-950 dark:aria-pressed:text-orange-400 dark:hover:aria-pressed:text-orange-400",
  },
  {
    label: "Bookmark",
    pressedLabel: "Remove bookmark",
    icon: Bookmark01Icon,
    className: "aria-pressed:text-foreground",
  },
]

/**
 * Icon-only toggle. The glyph fills and springs on press — the fill is what
 * carries the state, the overshoot just acknowledges the tap.
 */
function ReactionToggle({ reaction }: { reaction: Reaction }) {
  const [pressed, setPressed] = useState(false)
  const name = pressed ? reaction.pressedLabel : reaction.label

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Toggle
            aria-label={name}
            size="sm"
            variant="outline"
            className={cn("rounded-full p-1 text-muted-foreground", reaction.className)}
            pressed={pressed}
            onPressedChange={setPressed}
          >
            <HugeiconsIcon
              icon={reaction.icon}
              strokeWidth={2}
              className="transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-active/toggle:scale-90 group-aria-pressed/toggle:scale-110 group-aria-pressed/toggle:fill-current"
            />
          </Toggle>
        }
      />
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  )
}

/**
 * The same toggle carrying a tally. `tabular-nums` keeps the digits one width
 * so the button doesn't twitch as the count rolls over.
 */
function CountToggle({
  icon,
  label,
  count,
  className,
}: {
  icon: typeof HeartIcon
  label: string
  count: number
  className: string
}) {
  const [pressed, setPressed] = useState(false)

  return (
    <Toggle
      aria-label={label}
      size="sm"
      variant="outline"
      className={cn("rounded-full text-muted-foreground", className)}
      pressed={pressed}
      onPressedChange={setPressed}
    >
      <HugeiconsIcon
        icon={icon}
        data-icon="inline-start"
        strokeWidth={2}
        className="transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-active/toggle:scale-90 group-aria-pressed/toggle:scale-110 group-aria-pressed/toggle:fill-current"
      />
      <span className="tabular-nums">{count + (pressed ? 1 : 0)}</span>
    </Toggle>
  )
}

/**
 * Formatting marks — independent toggles rather than a group, since text can
 * be bold and italic at once. Bold maps to `font-medium`: the type system runs
 * on two weights, and 450 is the strong one.
 */
function FormattingToggles() {
  const [bold, setBold] = useState(true)
  const [italic, setItalic] = useState(false)
  const [underline, setUnderline] = useState(false)

  const marks = [
    { label: "Bold", icon: BoldIcon, pressed: bold, onPressedChange: setBold },
    {
      label: "Italic",
      icon: TextItalicIcon,
      pressed: italic,
      onPressedChange: setItalic,
    },
    {
      label: "Underline",
      icon: TextUnderlineIcon,
      pressed: underline,
      onPressedChange: setUnderline,
    },
  ]

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {marks.map((mark) => (
          <Toggle
            key={mark.label}
            aria-label={mark.label}
            pressed={mark.pressed}
            onPressedChange={mark.onPressedChange}
          >
            <HugeiconsIcon icon={mark.icon} strokeWidth={2} />
          </Toggle>
        ))}
      </div>
      <p
        className={cn(
          "text-default",
          "text-sm",
          "text-muted-foreground",
          bold && "font-medium text-foreground",
          italic && "italic",
          underline && "underline underline-offset-4"
        )}
      >
        The quick brown fox jumps over the lazy dog.
      </p>
    </div>
  )
}

export function ToggleExample() {

  return (
    <div className="flex w-full max-w-md flex-col items-start gap-6">
      <div className="flex flex-wrap items-center gap-2">
        {reactions.map((reaction) => (
          <ReactionToggle key={reaction.label} reaction={reaction} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <CountToggle
          icon={HeartIcon}
          label="Love this post"
          count={128}
          className="aria-pressed:border-rose-500/20 aria-pressed:bg-rose-50 aria-pressed:text-rose-600 hover:aria-pressed:text-rose-600 dark:aria-pressed:border-rose-400/20 dark:aria-pressed:bg-rose-950 dark:aria-pressed:text-rose-400 dark:hover:aria-pressed:text-rose-400"
        />
        <CountToggle
          icon={ThumbsUpIcon}
          label="Upvote"
          count={24}
          className="aria-pressed:border-blue-500/20 aria-pressed:bg-blue-50 aria-pressed:text-blue-600 hover:aria-pressed:text-blue-600 dark:aria-pressed:border-blue-400/20 dark:aria-pressed:bg-blue-950 dark:aria-pressed:text-blue-400 dark:hover:aria-pressed:text-blue-400"
        />
        <CountToggle
          icon={StarIcon}
          label="Star this repository"
          count={1204}
          className="aria-pressed:border-amber-500/20 aria-pressed:bg-amber-50 aria-pressed:text-amber-600 hover:aria-pressed:text-amber-600 dark:aria-pressed:border-amber-400/20 dark:aria-pressed:bg-amber-950 dark:aria-pressed:text-amber-400 dark:hover:aria-pressed:text-amber-400"
        />
      </div>

      <FormattingToggles />


      </div>
  )
}
