"use client"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  ArrowDown01Icon,
  BrushIcon,
  Camera01Icon,
  Clock01Icon,
  CookieIcon,
  DatabaseIcon,
  Download01Icon,
  Key01Icon,
  LinkSquare02Icon,
  LockKeyIcon,
  Maximize01Icon,
  MinusSignIcon,
  Minimize01Icon,
  MoreVerticalIcon,
  PlusSignCircleIcon,
  PlusSignIcon,
  PrinterIcon,
  RefreshIcon,
  Search01Icon,
  SearchAddIcon,
  Settings01Icon,
  SlidersHorizontalIcon,
  SmartPhone01Icon,
  SquareLockPasswordIcon,
  UnavailableIcon,
  UserSquareIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { ComponentProps, ReactNode } from "react"
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

export interface WebPreviewContextValue {
  url: string
  setUrl: (url: string) => void
  /** Re-loads the current document, even when the URL has not changed. */
  reload: () => void
  consoleOpen: boolean
  setConsoleOpen: (open: boolean) => void
}

const WebPreviewContext = createContext<WebPreviewContextValue | null>(null)

const useWebPreview = () => {
  const context = useContext(WebPreviewContext)
  if (!context) {
    throw new Error("WebPreview components must be used within a WebPreview")
  }
  return context
}

export type WebPreviewProps = ComponentProps<"div"> & {
  defaultUrl?: string
  /**
   * Controlled URL. When provided, the preview reflects this value and
   * `onUrlChange` is the only way it ever changes — use it when navigation is
   * owned by the parent (history stacks, routers, link interception).
   */
  url?: string
  onUrlChange?: (url: string) => void
  /**
   * Called when the current document should be re-loaded — pressing Enter in
   * the URL bar reloads even when the URL itself did not change.
   */
  onReload?: () => void
}

export const WebPreview = ({
  className,
  children,
  defaultUrl = "",
  url: controlledUrl,
  onUrlChange,
  onReload,
  ...props
}: WebPreviewProps) => {
  const [uncontrolledUrl, setUncontrolledUrl] = useState(defaultUrl)
  const [consoleOpen, setConsoleOpen] = useState(false)

  const isControlled = controlledUrl !== undefined
  const url = isControlled ? controlledUrl : uncontrolledUrl

  const handleUrlChange = useCallback(
    (newUrl: string) => {
      if (!isControlled) {
        setUncontrolledUrl(newUrl)
      }
      onUrlChange?.(newUrl)
    },
    [isControlled, onUrlChange]
  )

  const reload = useCallback(() => onReload?.(), [onReload])

  const contextValue = useMemo<WebPreviewContextValue>(
    () => ({
      consoleOpen,
      reload,
      setConsoleOpen,
      setUrl: handleUrlChange,
      url,
    }),
    [consoleOpen, handleUrlChange, reload, url]
  )

  return (
    <WebPreviewContext.Provider value={contextValue}>
      <div
        className={cn(
          "relative flex size-full flex-col overflow-hidden rounded-[1.25rem] border bg-card",
          className
        )}
        data-slot="web-preview"
        {...props}
      >
        {children}
      </div>
    </WebPreviewContext.Provider>
  )
}

export type WebPreviewNavigationProps = ComponentProps<"div">

export const WebPreviewNavigation = ({
  className,
  children,
  ...props
}: WebPreviewNavigationProps) => (
  <div
    className={cn(
      "flex min-h-11 shrink-0 items-center gap-1 border-b px-2 py-1.5",
      className
    )}
    data-slot="web-preview-navigation"
    {...props}
  >
    {children}
  </div>
)

export type WebPreviewNavigationButtonProps = ComponentProps<typeof Button> & {
  tooltip?: string
}

export const WebPreviewNavigationButton = ({
  onClick,
  disabled,
  tooltip,
  children,
  className,
  ...props
}: WebPreviewNavigationButtonProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            className={cn(
              "size-8 rounded-xl p-0 text-muted-foreground hover:text-foreground",
              className
            )}
            disabled={disabled}
            onClick={onClick}
            size="icon"
            variant="ghost"
            {...props}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export type WebPreviewUrlProps = Omit<ComponentProps<"input">, "size"> & {
  /**
   * Body of the connection popover opened from the leading icon. Defaults to a
   * short summary of the current origin.
   */
  connectionContent?: ReactNode
  /** Overrides opening the current URL in a new tab. */
  onOpenExternal?: (url: string) => void
}

function displayUrl(value: string) {
  if (!value) return ""
  try {
    const parsed = new URL(value)
    const path = parsed.pathname === "/" ? "" : parsed.pathname
    return `${parsed.host}${path}${parsed.search}${parsed.hash}`
  } catch {
    return value
  }
}

/**
 * The address bar: a connection popover on the leading end, the editable URL,
 * and an open-in-new-tab button on the trailing end. Pressing Enter commits
 * the URL *and* reloads, matching how a real address bar behaves when you
 * re-submit the page you are already on.
 */
export const WebPreviewUrl = ({
  className,
  value,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  connectionContent,
  onOpenExternal,
  ...props
}: WebPreviewUrlProps) => {
  const { url, setUrl, reload } = useWebPreview()
  const [prevUrl, setPrevUrl] = useState(url)
  const [inputValue, setInputValue] = useState(() => displayUrl(url))

  // Sync input value with context URL when it changes externally (derived state pattern)
  if (url !== prevUrl) {
    setPrevUrl(url)
    setInputValue(displayUrl(url))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    onChange?.(event)
  }

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        const target = event.target as HTMLInputElement
        // Re-submitting the cleaned display value must retain the canonical
        // scheme (notably http:// for local development URLs).
        setUrl(target.value === displayUrl(url) ? url : target.value)
        reload()
      }
      onKeyDown?.(event)
    },
    [setUrl, reload, onKeyDown, url]
  )

  const current = (value as string) ?? inputValue
  const committedUrl = url || current
  const openExternal = () => {
    if (!committedUrl) return
    if (onOpenExternal) {
      onOpenExternal(committedUrl)
      return
    }
    window.open(committedUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <InputGroup
      className="h-8 flex-1 rounded-xl border-transparent bg-transparent shadow-none transition-colors focus-within:bg-muted hover:bg-muted has-[[data-slot=input-group-control]:focus-visible]:border-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-0 dark:bg-transparent dark:focus-within:bg-muted/60 dark:hover:bg-muted/60"
      data-slot="web-preview-url"
    >
      <InputGroupAddon
        align="inline-start"
        className="opacity-0 transition-opacity group-focus-within/input-group:opacity-100 group-hover/input-group:opacity-100"
      >
        <Popover>
          <PopoverTrigger
            render={
              <InputGroupButton
                aria-label="Connection information"
                size="icon-xs"
              />
            }
          >
            <HugeiconsIcon
              className="size-4 text-muted-foreground"
              icon={SlidersHorizontalIcon}
              strokeWidth={2}
            />
          </PopoverTrigger>
          <PopoverContent align="start" className="w-72 p-3">
            {connectionContent ?? <WebPreviewConnection url={committedUrl} />}
          </PopoverContent>
        </Popover>
      </InputGroupAddon>

      <InputGroupInput
        className={cn(
          "px-1 text-center text-base font-normal text-foreground placeholder:text-muted-foreground",
          className
        )}
        onBlur={(event) => {
          onBlur?.(event)
        }}
        onChange={handleChange}
        onFocus={(event) => {
          onFocus?.(event)
        }}
        onKeyDown={handleKeyDown}
        aria-label="Address"
        placeholder="Enter a URL"
        value={current}
        {...props}
      />

      <InputGroupAddon
        align="inline-end"
        className="opacity-0 transition-opacity group-focus-within/input-group:opacity-100 group-hover/input-group:opacity-100"
      >
        <InputGroupButton
          aria-label="Open in new tab"
          aria-disabled={!committedUrl}
          onClick={openExternal}
          size="icon-xs"
          tabIndex={committedUrl ? undefined : -1}
        >
          <HugeiconsIcon
            className="size-4"
            icon={LinkSquare02Icon}
            strokeWidth={2}
          />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export type WebPreviewConnectionProps = ComponentProps<"div"> & {
  url: string
}

/** Default body of the connection popover. */
export const WebPreviewConnection = ({
  className,
  url,
  ...props
}: WebPreviewConnectionProps) => {
  let origin = url
  let secure = false
  try {
    const parsed = new URL(url)
    origin = parsed.host
    secure = parsed.protocol === "https:"
  } catch {
    // Half-typed URLs are expected; fall back to the raw string.
  }

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="flex items-center gap-2">
        <HugeiconsIcon
          className={cn("size-4", secure ? "text-primary" : "text-destructive")}
          icon={secure ? LockKeyIcon : UnavailableIcon}
          strokeWidth={2}
        />
        <span className="text-sm font-medium">
          {secure ? "Connection is secure" : "Connection is not secure"}
        </span>
      </div>
      <p className="text-sm break-all text-muted-foreground">
        {origin || "No page loaded"}
      </p>
      <p className="text-xs text-muted-foreground">
        {secure
          ? "This page was served over HTTPS."
          : "Information sent to this site could be seen by others."}
      </p>
    </div>
  )
}

export type WebPreviewBodyProps = Omit<ComponentProps<"iframe">, "loading"> & {
  loading?: ReactNode
}

export const WebPreviewBody = ({
  className,
  loading,
  src,
  ...props
}: WebPreviewBodyProps) => {
  const { url } = useWebPreview()

  return (
    <div className="relative flex-1">
      <iframe
        className={cn("size-full", className)}
        // `allow-modals` lets the framed document open `window.print()`, which
        // is what the menu's Print entry drives.
        // oxlint-disable-next-line eslint-plugin-react(iframe-missing-sandbox)
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-modals"
        src={(src ?? url) || undefined}
        title="Preview"
        {...props}
      />
      {loading}
    </div>
  )
}

export type WebPreviewConsoleProps = ComponentProps<"div"> & {
  logs?: {
    level: "log" | "warn" | "error"
    message: string
    timestamp: Date
  }[]
}

export const WebPreviewConsole = ({
  className,
  logs = [],
  children,
  ...props
}: WebPreviewConsoleProps) => {
  const { consoleOpen, setConsoleOpen } = useWebPreview()

  return (
    <Collapsible
      className={cn("border-t bg-muted/50 font-mono text-sm", className)}
      onOpenChange={setConsoleOpen}
      open={consoleOpen}
      {...props}
    >
      <CollapsibleTrigger
        render={
          <Button
            className="flex w-full items-center justify-between p-4 text-start font-medium hover:bg-muted/50"
            variant="ghost"
          />
        }
      >
        Console
        <HugeiconsIcon
          className={cn(
            "size-4 transition-transform duration-200",
            consoleOpen && "rotate-180"
          )}
          icon={ArrowDown01Icon}
          strokeWidth={2}
        />
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn(
          "px-4 pb-4",
          "outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        )}
      >
        <div className="max-h-48 space-y-1 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-muted-foreground">No console output</p>
          ) : (
            logs.map((log) => (
              <div
                className={cn(
                  "text-xs",
                  log.level === "error" && "text-destructive",
                  log.level === "warn" && "text-yellow-600",
                  log.level === "log" && "text-foreground"
                )}
                key={`${log.timestamp.getTime()}-${log.level}-${log.message}`}
              >
                <span className="text-muted-foreground">
                  {log.timestamp.toLocaleTimeString()}
                </span>{" "}
                {log.message}
              </div>
            ))
          )}
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

/* -------------------------------------------------------------------------- */
/*                                Annotate toggle                              */
/* -------------------------------------------------------------------------- */

export type WebPreviewAnnotateToggleProps = Omit<
  ComponentProps<typeof Button>,
  "onChange"
> & {
  active?: boolean
  onActiveChange?: (active: boolean) => void
  label?: string
}

/**
 * Collapses to an icon when idle and expands into a labelled pill while
 * annotating, so the active mode is obvious at a glance.
 */
export const WebPreviewAnnotateToggle = ({
  active = false,
  onActiveChange,
  label = "Annotating",
  className,
  onClick,
  ...props
}: WebPreviewAnnotateToggleProps) => (
  <Button
    aria-label={label}
    aria-pressed={active}
    className={cn(
      "h-8 gap-1.5 px-2 text-muted-foreground transition-colors",
      active &&
        "bg-[#e8f0f9] px-3 text-[#2c68c5] hover:bg-[#dce9f7] hover:text-[#2c68c5] dark:bg-blue-500/15 dark:text-blue-400",
      className
    )}
    data-slot="web-preview-annotate-toggle"
    onClick={(event) => {
      onClick?.(event)
      onActiveChange?.(!active)
    }}
    size="sm"
    variant="ghost"
    {...props}
  >
    <HugeiconsIcon
      className="size-4"
      icon={PlusSignCircleIcon}
      strokeWidth={2}
    />
    {active && <span className="text-sm font-medium">{label}</span>}
  </Button>
)

/* -------------------------------------------------------------------------- */
/*                                    Menu                                     */
/* -------------------------------------------------------------------------- */

/** Chrome's zoom stops, so the `-`/`+` buttons land on familiar values. */
const ZOOM_STEPS = [25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200]

const stepZoom = (zoom: number, delta: 1 | -1) => {
  const index = ZOOM_STEPS.findIndex((step) => step >= zoom)
  const current = index === -1 ? ZOOM_STEPS.length - 1 : index
  return ZOOM_STEPS[
    Math.min(ZOOM_STEPS.length - 1, Math.max(0, current + delta))
  ]
}

type MenuItemProps = ComponentProps<typeof DropdownMenuItem> & {
  icon: typeof Search01Icon
}

const WebPreviewMenuItem = ({ icon, children, ...props }: MenuItemProps) => (
  <DropdownMenuItem className="gap-2.5" {...props}>
    <HugeiconsIcon
      className="size-4 shrink-0 text-muted-foreground"
      icon={icon}
      strokeWidth={2}
    />
    {children}
  </DropdownMenuItem>
)

export type WebPreviewMenuProps = {
  onFindInPage?: () => void
  onPrint?: () => void
  zoom?: number
  onZoomChange?: (zoom: number) => void
  fullScreen?: boolean
  onFullScreenChange?: (fullScreen: boolean) => void
  deviceToolbar?: boolean
  onDeviceToolbarChange?: (open: boolean) => void
  onScreenshot?: () => void
  onImportCookiesAndPasswords?: () => void
  onPasswordManager?: () => void
  onContactInfo?: () => void
  onDownloads?: () => void
  onClearCookies?: () => void
  onClearCache?: () => void
  onDeleteDownloadHistory?: () => void
  onBrowserSettings?: () => void
  className?: string
}

/**
 * The preview's overflow menu. Every entry is inert until the matching handler
 * is supplied — the credential-related entries in particular are labels only,
 * this component never reads or stores any credential itself.
 */
export const WebPreviewMenu = ({
  onFindInPage,
  onPrint,
  zoom = 100,
  onZoomChange,
  fullScreen = false,
  onFullScreenChange,
  deviceToolbar = false,
  onDeviceToolbarChange,
  onScreenshot,
  onImportCookiesAndPasswords,
  onPasswordManager,
  onContactInfo,
  onDownloads,
  onClearCookies,
  onClearCache,
  onDeleteDownloadHistory,
  onBrowserSettings,
  className,
}: WebPreviewMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      render={
        <Button
          aria-label="Preview menu"
          className={cn(
            "size-8 rounded-xl p-0 text-muted-foreground",
            className
          )}
          size="icon"
          variant="ghost"
        />
      }
    >
      <HugeiconsIcon
        className="size-5"
        icon={MoreVerticalIcon}
        strokeWidth={2}
      />
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" className="w-72">
      <WebPreviewMenuItem
        disabled={!onFindInPage}
        icon={Search01Icon}
        onClick={onFindInPage}
      >
        Find in page
      </WebPreviewMenuItem>
      <WebPreviewMenuItem
        disabled={!onPrint}
        icon={PrinterIcon}
        onClick={onPrint}
      >
        Print
      </WebPreviewMenuItem>

      <DropdownMenuSeparator />

      {/* Not a menu item: the row stays open while the zoom is adjusted. */}
      <div className="flex items-center justify-between gap-2 px-2 py-1.5">
        <span className="flex items-center gap-2.5 text-sm">
          <HugeiconsIcon
            className="size-4 shrink-0 text-muted-foreground"
            icon={SearchAddIcon}
            strokeWidth={2}
          />
          Zoom
        </span>
        <span className="flex items-center gap-1">
          <span className="flex items-center rounded-md bg-muted">
            <Button
              aria-label="Zoom out"
              className="size-7 p-0"
              disabled={!onZoomChange || zoom <= ZOOM_STEPS[0]}
              onClick={() => onZoomChange?.(stepZoom(zoom, -1))}
              size="sm"
              variant="ghost"
            >
              <HugeiconsIcon
                className="size-4"
                icon={MinusSignIcon}
                strokeWidth={2}
              />
            </Button>
            <span className="w-11 text-center text-sm tabular-nums">
              {zoom}%
            </span>
            <Button
              aria-label="Zoom in"
              className="size-7 p-0"
              disabled={!onZoomChange || zoom >= ZOOM_STEPS.at(-1)!}
              onClick={() => onZoomChange?.(stepZoom(zoom, 1))}
              size="sm"
              variant="ghost"
            >
              <HugeiconsIcon
                className="size-4"
                icon={PlusSignIcon}
                strokeWidth={2}
              />
            </Button>
          </span>
          <Button
            aria-label="Reset zoom"
            className="size-7 p-0 text-muted-foreground"
            disabled={!onZoomChange || zoom === 100}
            onClick={() => onZoomChange?.(100)}
            size="sm"
            variant="ghost"
          >
            <HugeiconsIcon
              className="size-4"
              icon={RefreshIcon}
              strokeWidth={2}
            />
          </Button>
        </span>
      </div>

      <DropdownMenuSeparator />

      <WebPreviewMenuItem
        disabled={!onFullScreenChange}
        icon={fullScreen ? Minimize01Icon : Maximize01Icon}
        onClick={() => onFullScreenChange?.(!fullScreen)}
      >
        {fullScreen ? "Exit full screen" : "Full screen"}
      </WebPreviewMenuItem>
      <WebPreviewMenuItem
        disabled={!onDeviceToolbarChange}
        icon={SmartPhone01Icon}
        onClick={() => onDeviceToolbarChange?.(!deviceToolbar)}
      >
        {deviceToolbar ? "Hide device toolbar" : "Show device toolbar"}
      </WebPreviewMenuItem>
      <WebPreviewMenuItem
        disabled={!onScreenshot}
        icon={Camera01Icon}
        onClick={onScreenshot}
      >
        Take a screenshot
      </WebPreviewMenuItem>

      <DropdownMenuSeparator />

      <WebPreviewMenuItem
        disabled={!onImportCookiesAndPasswords}
        icon={CookieIcon}
        onClick={onImportCookiesAndPasswords}
      >
        Import cookies and passwords…
      </WebPreviewMenuItem>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger
          className="gap-2.5"
          disabled={!onPasswordManager && !onContactInfo}
        >
          <HugeiconsIcon
            className="size-4 shrink-0 text-muted-foreground"
            icon={SquareLockPasswordIcon}
            strokeWidth={2}
          />
          Passwords and autofill
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="w-56">
          <WebPreviewMenuItem
            disabled={!onPasswordManager}
            icon={Key01Icon}
            onClick={onPasswordManager}
          >
            Password manager
          </WebPreviewMenuItem>
          <WebPreviewMenuItem
            disabled={!onContactInfo}
            icon={UserSquareIcon}
            onClick={onContactInfo}
          >
            Contact info
          </WebPreviewMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <WebPreviewMenuItem
        disabled={!onDownloads}
        icon={Download01Icon}
        onClick={onDownloads}
      >
        Downloads
      </WebPreviewMenuItem>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger
          className="gap-2.5"
          disabled={
            !onClearCookies && !onClearCache && !onDeleteDownloadHistory
          }
        >
          <HugeiconsIcon
            className="size-4 shrink-0 text-muted-foreground"
            icon={BrushIcon}
            strokeWidth={2}
          />
          Clear browsing data
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="w-56">
          <WebPreviewMenuItem
            disabled={!onClearCookies}
            icon={CookieIcon}
            onClick={onClearCookies}
          >
            Clear cookies
          </WebPreviewMenuItem>
          <WebPreviewMenuItem
            disabled={!onClearCache}
            icon={DatabaseIcon}
            onClick={onClearCache}
          >
            Clear cache
          </WebPreviewMenuItem>
          <WebPreviewMenuItem
            disabled={!onDeleteDownloadHistory}
            icon={Clock01Icon}
            onClick={onDeleteDownloadHistory}
          >
            Delete download history
          </WebPreviewMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuSeparator />

      <WebPreviewMenuItem
        disabled={!onBrowserSettings}
        icon={Settings01Icon}
        onClick={onBrowserSettings}
      >
        Browser settings
      </WebPreviewMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)
