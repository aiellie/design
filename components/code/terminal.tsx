"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "@/components/ui/toast"
import { highlightCode } from "@/lib/highlight-code"
import { cn } from "@/lib/utils"
import {
  Alert02Icon,
  Cancel01Icon,
  ConsoleIcon,
  Copy01Icon,
  Delete01Icon,
  PlusSignIcon,
  CodeSquareIcon,
  BashIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import type {
  ComponentProps,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

interface TerminalContextType {
  output: string
  lang: string
  isStreaming: boolean
  autoScroll: boolean
  onClear?: () => void
}

const TerminalContext = createContext<TerminalContextType>({
  autoScroll: true,
  isStreaming: false,
  lang: "bash",
  output: "",
})

export type TerminalHeaderProps = HTMLAttributes<HTMLDivElement>

export const TerminalHeader = ({
  className,
  children,
  ...props
}: TerminalHeaderProps) => (
  <div
    className={cn(
      "flex items-center justify-between border-b px-4 py-2",
      className
    )}
    {...props}
  >
    {children}
  </div>
)

export type TerminalTitleProps = HTMLAttributes<HTMLDivElement>

export const TerminalTitle = ({
  className,
  children,
  ...props
}: TerminalTitleProps) => (
  <div
    className={cn(
      "flex items-center gap-2 text-sm text-muted-foreground",
      className
    )}
    {...props}
  >
    <HugeiconsIcon className="size-3.5" icon={BashIcon} strokeWidth={2} />
    {children ?? "Terminal"}
  </div>
)

/**
 * Status palettes from the Badge example. The dot carries the state, so the
 * label can stay a plain noun (`Running`) rather than repeating it in colour.
 */
const TERMINAL_STATUS_STYLES = {
  live: "border-blue-500/20 bg-blue-50 text-blue-700 dark:border-blue-400/20 dark:bg-blue-950 dark:text-blue-300",
  degraded:
    "border-amber-500/20 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-950 dark:text-amber-300",
  offline:
    "border-slate-500/20 bg-slate-50 text-slate-700 dark:border-slate-400/20 dark:bg-slate-900 dark:text-slate-300",
} as const

export type TerminalStatusTone = keyof typeof TERMINAL_STATUS_STYLES

function TerminalStatusDot({ pulse = false }: { pulse?: boolean }) {
  return (
    <span
      data-icon="inline-start"
      className="relative flex size-1.5 shrink-0 items-center justify-center"
    >
      {pulse && (
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60 motion-reduce:hidden" />
      )}
      <span
        aria-hidden
        className="absolute inline-flex size-full rounded-full border border-current/30"
      />
      <span className="relative inline-flex size-1 rounded-full bg-current" />
    </span>
  )
}

export type TerminalStatusProps = ComponentProps<typeof Badge> & {
  status?: TerminalStatusTone
}

export const TerminalStatus = ({
  className,
  children,
  status = "live",
  ...props
}: TerminalStatusProps) => {
  const { isStreaming } = useContext(TerminalContext)

  if (!isStreaming) {
    return null
  }

  return (
    <Badge className={cn(TERMINAL_STATUS_STYLES[status], className)} {...props}>
      <TerminalStatusDot pulse={status !== "offline"} />
      {children ?? "Running"}
    </Badge>
  )
}

export type TerminalActionsProps = HTMLAttributes<HTMLDivElement>

export const TerminalActions = ({
  className,
  children,
  ...props
}: TerminalActionsProps) => (
  <div className={cn("flex items-center gap-1", className)} {...props}>
    {children}
  </div>
)

export type TerminalTabsProps = HTMLAttributes<HTMLDivElement>

export const TerminalTabs = ({
  className,
  children,
  ...props
}: TerminalTabsProps) => (
  <div
    className={cn("flex items-center gap-1 border-b px-2 py-1.5", className)}
    role="tablist"
    {...props}
  >
    {children}
  </div>
)

export type TerminalTabProps = HTMLAttributes<HTMLDivElement> & {
  active?: boolean
  /** Leading icon; defaults to the terminal glyph. */
  icon?: IconSvgElement
  onClose?: () => void
  closeTooltip?: string
}

export const TerminalTab = ({
  active = false,
  icon = BashIcon,
  onClose,
  closeTooltip = "Close tab",
  className,
  children,
  onKeyDown,
  ...props
}: TerminalTabProps) => {
  // The tab is a div, not a button, so the close control below stays valid
  // markup — keyboard activation is restored by hand.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      event.currentTarget.click()
    }
  }

  return (
    <div
      aria-selected={active}
      className={cn(
        "group/tab flex h-7 max-w-40 cursor-pointer items-center gap-1.5 rounded-lg ps-2 text-xs outline-hidden transition-colors select-none focus-visible:ring-1 focus-visible:ring-ring",
        onClose ? "pe-1" : "pe-2",
        active ? "bg-muted" : "text-muted-foreground hover:bg-muted/50",
        className
      )}
      onKeyDown={handleKeyDown}
      role="tab"
      tabIndex={0}
      {...props}
    >
      <HugeiconsIcon className="size-3 shrink-0" icon={icon} strokeWidth={2} />
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {onClose && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  className={cn(
                    "size-5 shrink-0 rounded-full",
                    !active &&
                      "opacity-0 group-hover/tab:opacity-100 focus-visible:opacity-100"
                  )}
                  onClick={(event) => {
                    event.stopPropagation()
                    onClose()
                  }}
                  size="icon-xs"
                  variant="ghost"
                />
              }
            >
              <HugeiconsIcon
                className="size-3"
                icon={Cancel01Icon}
                strokeWidth={2}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{closeTooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}

export type TerminalTabType = "terminal" | "console" | "problems" | "output"

export const TERMINAL_TAB_OPTIONS: {
  type: TerminalTabType
  label: string
  icon: IconSvgElement
}[] = [
  { icon: BashIcon, label: "Terminal", type: "terminal" },
  { icon: ConsoleIcon, label: "Console", type: "console" },
  { icon: Alert02Icon, label: "Problems", type: "problems" },
  { icon: CodeSquareIcon, label: "Output", type: "output" },
]

export type TerminalTabAddProps = Omit<
  ComponentProps<typeof Button>,
  "onSelect"
> & {
  onSelect?: (type: TerminalTabType) => void
  tooltip?: string
}

export const TerminalTabAdd = ({
  onSelect,
  tooltip = "New tab",
  children,
  className,
  ...props
}: TerminalTabAddProps) => {
  const ariaLabel = props["aria-label"] ?? tooltip

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                render={
                  <Button
                    aria-label={ariaLabel}
                    className={cn("shrink-0", className)}
                    size="icon-xs"
                    variant="ghost"
                    {...props}
                  />
                }
              />
            }
          >
            {children ?? (
              <HugeiconsIcon
                className="text-muted-foreground"
                icon={PlusSignIcon}
                strokeWidth={2}
              />
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="start" className="w-44" sideOffset={6}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>New tab</DropdownMenuLabel>
          {TERMINAL_TAB_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.type}
              onClick={() => onSelect?.(option.type)}
            >
              <HugeiconsIcon
                icon={option.icon}
              />
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export type TerminalCopyButtonProps = ComponentProps<typeof Button> & {
  onCopy?: () => void
  onError?: (error: Error) => void
  timeout?: number
  tooltip?: string
}

export const TerminalCopyButton = ({
  onCopy,
  onError,
  timeout = 2000,
  tooltip = "Copy output",
  children,
  className,
  ...props
}: TerminalCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)
  const timeoutRef = useRef<number>(0)
  const { output } = useContext(TerminalContext)

  const copyToClipboard = useCallback(async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      toast.add({ title: "Could not copy output", type: "error" })
      onError?.(new Error("Clipboard API not available"))
      return
    }

    try {
      await navigator.clipboard.writeText(output)
      setIsCopied(true)
      toast.add({ title: "Copied output", type: "success" })
      onCopy?.()
      timeoutRef.current = window.setTimeout(() => setIsCopied(false), timeout)
    } catch (error) {
      toast.add({ title: "Could not copy output", type: "error" })
      onError?.(error as Error)
    }
  }, [output, onCopy, onError, timeout])

  useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current)
    },
    []
  )

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              className={cn("text-muted-foreground", className)}
              onClick={copyToClipboard}
              size="icon-sm"
              variant="ghost"
              {...props}
            />
          }
        >
          {children ?? (
            <HugeiconsIcon
              className="size-3.5"
              icon={isCopied ? Tick02Icon : Copy01Icon}
              strokeWidth={2}
            />
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>{isCopied ? "Copied" : tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export type TerminalClearButtonProps = ComponentProps<typeof Button> & {
  tooltip?: string
}

export const TerminalClearButton = ({
  tooltip = "Clear terminal",
  children,
  className,
  ...props
}: TerminalClearButtonProps) => {
  const { onClear } = useContext(TerminalContext)

  if (!onClear) {
    return null
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              className={cn("text-muted-foreground", className)}
              onClick={onClear}
              size="icon-sm"
              variant="ghost"
              {...props}
            />
          }
        >
          {children ?? (
            <HugeiconsIcon
              className="size-3.5"
              icon={Delete01Icon}
              strokeWidth={2}
            />
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export type TerminalContentProps = HTMLAttributes<HTMLDivElement>

/** Pulsing block cursor appended to the last highlighted line. */
const streamingCursor =
  "[&_.line:last-of-type]:after:ms-0.5 [&_.line:last-of-type]:after:inline-block [&_.line:last-of-type]:after:h-3.5 [&_.line:last-of-type]:after:w-2 [&_.line:last-of-type]:after:animate-pulse [&_.line:last-of-type]:after:bg-foreground [&_.line:last-of-type]:after:align-text-bottom [&_.line:last-of-type]:after:content-['']"

export const TerminalContent = ({
  className,
  children,
  onClick,
  ...props
}: TerminalContentProps) => {
  const { output, lang, isStreaming, autoScroll } = useContext(TerminalContext)
  const containerRef = useRef<HTMLDivElement>(null)
  const [html, setHtml] = useState<string | null>(null)

  // Clicking anywhere in the body focuses an inline TerminalInput, mirroring
  // a real terminal — unless the click hit a control or a text selection.
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event)
    if (window.getSelection()?.toString()) return
    if ((event.target as HTMLElement).closest("button, a, input")) return
    containerRef.current?.querySelector("input")?.focus()
  }

  // Highlight in the browser via the shared Shiki instance; the previous
  // result stays on screen while the next chunk is being highlighted, so
  // streaming never flashes back to plain text.
  useEffect(() => {
    let active = true
    highlightCode(output, lang)
      .then((result) => {
        if (active) setHtml(result)
      })
      .catch(() => {
        if (active) setHtml(null)
      })
    return () => {
      active = false
    }
  }, [output, lang])

  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [output, html, autoScroll])

  return (
    // p-1.5 here + the p-2.5 baked into the Shiki `pre` add up to the p-4 the
    // header uses, so both fallbacks below carry their own p-2.5.
    <div
      className={cn(
        "max-h-96 min-h-0 min-w-0 overflow-auto p-1.5 font-mono text-xs",
        className
      )}
      onClick={handleClick}
      ref={containerRef}
      {...props}
    >
      {(output !== "" || isStreaming) &&
        (html ? (
          <div
            className={cn(isStreaming && streamingCursor)}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="p-2.5 leading-relaxed break-words whitespace-pre-wrap">
            {output}
            {isStreaming && (
              <span className="ms-0.5 inline-block h-3.5 w-2 animate-pulse bg-foreground align-text-bottom" />
            )}
          </pre>
        ))}
      {children}
    </div>
  )
}

export type TerminalInputProps = Omit<ComponentProps<"input">, "onSubmit"> & {
  /** Prompt label rendered before the input, e.g. `user@host %`. */
  prompt?: ReactNode
  onSubmit?: (command: string) => void
}

/**
 * An inline prompt row for interactive terminals. Rendered as a child of
 * TerminalContent it sits in the output flow like a real shell prompt; Enter
 * submits the line and ArrowUp/ArrowDown walk the command history.
 */
export const TerminalInput = ({
  prompt = "$",
  onSubmit,
  className,
  disabled,
  onChange,
  onKeyDown,
  ...props
}: TerminalInputProps) => {
  const { output, isStreaming } = useContext(TerminalContext)
  const [value, setValue] = useState("")
  const historyRef = useRef<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event)
    const history = historyRef.current

    if (event.key === "Enter") {
      event.preventDefault()
      if (value.trim()) history.push(value)
      setHistoryIndex(-1)
      setValue("")
      onSubmit?.(value)
      return
    }

    if (event.key === "ArrowUp" && history.length > 0) {
      event.preventDefault()
      const next =
        historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(next)
      setValue(history[next])
      return
    }

    if (event.key === "ArrowDown" && historyIndex !== -1) {
      event.preventDefault()
      const next = historyIndex + 1
      if (next >= history.length) {
        setHistoryIndex(-1)
        setValue("")
      } else {
        setHistoryIndex(next)
        setValue(history[next])
      }
    }
  }

  return (
    // The Shiki `pre` above carries its own pb-2.5, so pull the row up by the
    // same amount whenever there is output to sit under.
    <div
      className={cn(
        "flex items-center gap-2 p-2.5",
        output !== "" && "-mt-2.5",
        className
      )}
    >
      {prompt && <span className="shrink-0">{prompt}</span>}
      <input
        aria-label="Terminal input"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        {...props}
        className="min-w-0 flex-1 bg-transparent text-ellipsis outline-none placeholder:text-muted-foreground disabled:opacity-50"
        disabled={disabled ?? isStreaming}
        onChange={(event) => {
          onChange?.(event)
          setValue(event.target.value)
        }}
        onKeyDown={handleKeyDown}
        value={value}
      />
    </div>
  )
}

export type TerminalProps = HTMLAttributes<HTMLDivElement> & {
  output: string
  /** Shiki language the output is highlighted as. */
  lang?: string
  isStreaming?: boolean
  autoScroll?: boolean
  onClear?: () => void
}

export const Terminal = ({
  output,
  lang = "bash",
  isStreaming = false,
  autoScroll = true,
  onClear,
  className,
  children,
  ...props
}: TerminalProps) => {
  const contextValue = useMemo(
    () => ({ autoScroll, isStreaming, lang, onClear, output }),
    [autoScroll, isStreaming, lang, onClear, output]
  )

  return (
    <TerminalContext.Provider value={contextValue}>
      <div
        className={cn(
          "flex flex-col overflow-hidden rounded-2xl border bg-card",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <TerminalHeader>
              <TerminalTitle />
              <div className="flex items-center gap-1">
                <TerminalStatus />
                <TerminalActions>
                  <TerminalCopyButton />
                  {onClear && <TerminalClearButton />}
                </TerminalActions>
              </div>
            </TerminalHeader>
            <TerminalContent />
          </>
        )}
      </div>
    </TerminalContext.Provider>
  )
}

