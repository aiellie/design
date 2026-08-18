"use client"

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import {
  Cancel01Icon,
  RefreshIcon,
  SlidersHorizontalIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { ColorPicker } from "@/components/color/color-picker"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const EASE = [0.23, 1, 0.32, 1] as const

const HOVER_QUERY = "(hover: hover) and (pointer: fine)"

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max)

const roundToStep = (val: number, step: number, min: number) =>
  Math.round((val - min) / step) * step + min

function subscribeHover(callback: () => void) {
  const mq = window.matchMedia(HOVER_QUERY)
  mq.addEventListener("change", callback)
  return () => mq.removeEventListener("change", callback)
}

const getIsHoverDevice = () => window.matchMedia(HOVER_QUERY).matches

/** Reverts one row, shown only while that row is holding a custom value. */
function ResetButton({
  label,
  onReset,
}: {
  label: string
  onReset: () => void
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              aria-label={`Reset ${label}`}
              onClick={onReset}
              // Rows that own a pointer gesture (the scrubber's track, a select
              // trigger) sit underneath; swallowing the press keeps a reset from
              // reading as the start of a drag.
              onPointerDown={(event) => event.stopPropagation()}
              className="inline-flex size-5 cursor-pointer items-center justify-center rounded-full text-muted-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground"
            />
          }
        >
          <HugeiconsIcon
            aria-hidden
            className="size-3"
            icon={RefreshIcon}
            strokeWidth={2}
          />
        </TooltipTrigger>
        <TooltipContent>Reset</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

/** The leading icon + name every control row shares. */
function RowLabel({
  icon,
  label,
}: {
  icon?: IconSvgElement
  label: ReactNode
}) {
  return (
    <span className="flex items-center gap-2 text-[12.5px] font-medium whitespace-nowrap text-foreground/90">
      {icon && (
        <HugeiconsIcon
          aria-hidden
          className="size-3.5 shrink-0 text-muted-foreground"
          icon={icon}
        />
      )}
      {label}
    </span>
  )
}

export interface ScrubberProps {
  className?: string
  /** Number of decimal places to display. */
  decimals?: number
  defaultValue?: number
  /** Leading icon, shown before the label. */
  icon?: IconSvgElement
  /** Label displayed on the left side of the track. */
  label?: string
  max?: number
  min?: number
  onValueChange?: (value: number) => void
  /** When set, shows a reset icon that reverts the row. */
  onReset?: () => void
  step?: number
  /** Number of tick marks (0 to hide). */
  ticks?: number
  value?: number
}

/**
 * A drag-anywhere slider: the whole row is the track, the value reads out on
 * the right, and the handle only fades in while hovered or dragged.
 */
export function Scrubber({
  label = "Value",
  icon,
  value: controlledValue,
  defaultValue = 0,
  onValueChange,
  onReset,
  min = 0,
  max = 1,
  step = 0.01,
  decimals = 2,
  ticks = 0,
  className,
}: ScrubberProps) {
  const shouldReduceMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const isHoverDevice = useSyncExternalStore(
    subscribeHover,
    getIsHoverDevice,
    () => false
  )

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue
  const range = max - min
  const percentage = range > 0 ? ((value - min) / range) * 100 : 0
  const isActive = isDragging || (isHoverDevice && isHovering)

  const setValue = useCallback(
    (newValue: number) => {
      const clamped = clamp(roundToStep(newValue, step, min), min, max)
      if (!isControlled) {
        setInternalValue(clamped)
      }
      onValueChange?.(clamped)
    },
    [step, min, max, isControlled, onValueChange]
  )

  const getValueFromPointer = useCallback(
    (clientX: number) => {
      const track = trackRef.current
      if (!track) {
        return value
      }
      const rect = track.getBoundingClientRect()
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1)
      return min + ratio * range
    },
    [min, range, value]
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault()
      try {
        trackRef.current?.setPointerCapture(e.pointerId)
      } catch {}
      setIsDragging(true)
      setValue(getValueFromPointer(e.clientX))
    },
    [getValueFromPointer, setValue]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) {
        return
      }
      if (e.pointerType === "mouse" && e.buttons === 0) {
        setIsDragging(false)
        return
      }
      setValue(getValueFromPointer(e.clientX))
    },
    [isDragging, getValueFromPointer, setValue]
  )

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let next: number | undefined
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          next = value + step
          break
        case "ArrowLeft":
        case "ArrowDown":
          next = value - step
          break
        case "Home":
          next = min
          break
        case "End":
          next = max
          break
        default:
          return
      }
      e.preventDefault()
      setValue(next)
    },
    [value, step, min, max, setValue]
  )

  const springConfig = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, duration: 0.25, bounce: 0.1 }

  return (
    <div className={cn("relative w-full select-none", className)}>
      <div
        aria-label={label}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={Number(value.toFixed(decimals))}
        className="relative h-8 cursor-pointer overflow-hidden rounded-lg bg-muted/60 outline-offset-2 hover:bg-muted/80 focus-visible:outline-2 focus-visible:outline-ring"
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={handlePointerUp}
        ref={trackRef}
        role="slider"
        style={{ touchAction: "none" }}
        tabIndex={0}
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 rounded-lg bg-foreground/10"
          style={{
            width: `${percentage}%`,
            transition: isDragging
              ? "none"
              : "width 150ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        />

        {ticks > 0 && (
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: ticks }, (_, i) => {
              const pos = ((i + 1) / (ticks + 1)) * 100
              return (
                <div
                  className="absolute top-1/2 h-1.5 w-px -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/20"
                  key={pos}
                  style={{ left: `${pos}%` }}
                />
              )
            })}
          </div>
        )}

        <div
          className="pointer-events-none absolute z-3 -ml-[5px]"
          style={{
            top: "50%",
            left: `${percentage}%`,
            transform: "translateX(-50%) translateY(-50%)",
            transition: isDragging
              ? "none"
              : "left 150ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <motion.div
            animate={{
              opacity: isActive ? 0.8 : 0.2,
              scaleX: isActive ? 1 : 0.7,
              scaleY: isActive ? 1 : 0.7,
            }}
            className="h-4 w-1 rounded-full bg-foreground/90"
            transition={springConfig}
          />
        </div>

        <div className="pointer-events-none absolute top-1/2 left-3 z-4 -translate-y-1/2">
          <RowLabel icon={icon} label={label} />
        </div>

        <div
          className={cn(
            "pointer-events-none absolute top-1/2 z-4 -translate-y-1/2 text-[12.5px] font-medium text-muted-foreground",
            onReset ? "right-9" : "right-3"
          )}
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {value.toFixed(decimals)}
        </div>
      </div>

      {/* A sibling of the track rather than a child, so pressing it never
          enters the track's pointer capture. */}
      {onReset && (
        <span className="absolute inset-y-0 right-2 z-5 flex items-center">
          <ResetButton label={label} onReset={onReset} />
        </span>
      )}
    </div>
  )
}

export interface ScrubberDef<K extends string = string> {
  key: K
  label: string
  icon?: IconSvgElement
  min: number
  max: number
  step: number
  decimals: number
  /**
   * Narrower bounds used when a value is rolled from a seed. The full
   * min/max stays available to anyone dragging the scrubber by hand — this
   * only keeps generated looks inside the range that still reads well.
   */
  seedRange?: [number, number]
}

export function valuesAreDefault<T extends Record<string, unknown>>(
  values: T,
  defaults: T
): boolean {
  return Object.keys(defaults).every((key) => values[key] === defaults[key])
}

/* ------------------------------------------------------------------ seeds */

/** FNV-1a — small, fast, and stable across runs so a name always maps to
 * the same look. */
export function hashSeed(text: string): number {
  let hash = 0x811c9dc5
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

/** mulberry32 — a tiny deterministic PRNG seeded by `hashSeed`. */
export function createRng(seed: number): () => number {
  let state = seed || 1
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Rolls one value per control, staying inside `seedRange` where given. */
export function randomValues<K extends string>(
  controls: ScrubberDef<K>[],
  rng: () => number
): Record<K, number> {
  const values = {} as Record<K, number>
  for (const control of controls) {
    const [low, high] = control.seedRange ?? [control.min, control.max]
    const raw = low + rng() * (high - low)
    const stepped =
      Math.round((raw - control.min) / control.step) * control.step +
      control.min
    values[control.key] = Number(
      clamp(stepped, control.min, control.max).toFixed(control.decimals)
    )
  }
  return values
}

const SEED_ADJECTIVES = [
  "amber",
  "aurora",
  "cobalt",
  "coral",
  "dusk",
  "ember",
  "frost",
  "glass",
  "halo",
  "indigo",
  "ion",
  "jade",
  "lunar",
  "mint",
  "neon",
  "onyx",
  "opal",
  "pearl",
  "plum",
  "quartz",
  "rust",
  "slate",
  "solar",
  "tidal",
  "velvet",
  "zinc",
]

const SEED_NOUNS = [
  "arc",
  "bloom",
  "cascade",
  "current",
  "drift",
  "echo",
  "field",
  "flare",
  "flux",
  "glow",
  "grain",
  "haze",
  "lattice",
  "mist",
  "orbit",
  "pulse",
  "ripple",
  "shard",
  "signal",
  "spark",
  "spiral",
  "tide",
  "veil",
  "wave",
  "wisp",
]

/** A pronounceable two-word name — short enough to say out loud, and it
 * round-trips because the look is derived from the name itself. */
export function randomSeedName(): string {
  const pick = (list: string[]) => list[Math.floor(Math.random() * list.length)]
  return `${pick(SEED_ADJECTIVES)}-${pick(SEED_NOUNS)}`
}

/* ------------------------------------------------------------------ panel */

function ScrollFade({ children }: { children: ReactNode }) {
  const [scrollEl, setScrollEl] = useState<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const el = scrollEl
    if (!el) return
    const update = () => {
      const top = el.scrollTop > 4
      const bottom = el.scrollHeight - el.clientHeight - el.scrollTop > 4
      el.style.setProperty("--fade-top", top ? "1" : "0")
      el.style.setProperty("--fade-bottom", bottom ? "1" : "0")
    }
    update()
    el.addEventListener("scroll", update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => {
      el.removeEventListener("scroll", update)
      observer.disconnect()
    }
  }, [scrollEl])

  return (
    <div
      ref={setScrollEl}
      className="demo-controls-scroll flex max-h-[min(60vh,480px)] flex-col gap-1.5 overflow-y-auto"
    >
      {children}
    </div>
  )
}

export interface DemoControlsProps {
  /** Panel heading, e.g. "Shader controls". */
  title: string
  /** Disables the Reset button when nothing was changed. */
  isDefault: boolean
  onReset: () => void
  /** Control rows: scrubbers, switches, radios, color pickers. */
  children: ReactNode
  /** Extra buttons in the header, placed before Reset. */
  headerActions?: ReactNode
  /** Pinned below the scroll area, e.g. a "Copy values" action. */
  footer?: ReactNode
}

/** The header's button treatment, so `headerActions` can match Reset. */
export const DEMO_CONTROLS_HEADER_BUTTON =
  "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2 py-1 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"

/**
 * A floating "Controls" pill that expands into a glassy panel of control
 * rows, anchored to the bottom-right of the viewport.
 */
export function DemoControls({
  title,
  isDefault,
  onReset,
  children,
  headerActions,
  footer,
}: DemoControlsProps) {
  const shouldReduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 8, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 8, scale: 0.98 }
            }
            transition={{ duration: open ? 0.3 : 0.15, ease: EASE }}
            className="w-72 rounded-2xl border border-border/60 bg-background/85 p-3 shadow-xl shadow-black/5 backdrop-blur-xl backdrop-saturate-150"
          >
            <div className="mb-2 flex items-center justify-between gap-1 pl-1">
              <p className="text-[13px] font-semibold tracking-[-0.01em]">
                {title}
              </p>
              <span className="flex shrink-0 items-center">
                {headerActions}
                <button
                  type="button"
                  onClick={onReset}
                  disabled={isDefault}
                  className={DEMO_CONTROLS_HEADER_BUTTON}
                >
                  <HugeiconsIcon
                    aria-hidden
                    className="size-3"
                    icon={RefreshIcon}
                  />
                  Reset
                </button>
              </span>
            </div>
            <ScrollFade>{children}</ScrollFade>
            {footer && (
              <div className="mt-1.5 flex flex-col gap-1.5">{footer}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              size="icon-sm"
              variant="outline"
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              aria-label={open ? `Close ${title}` : `Open ${title}`}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2.5 text-[13px] font-medium backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-muted/70"
            >
              <HugeiconsIcon
                aria-hidden
                className="size-3.5"
                icon={open ? Cancel01Icon : SlidersHorizontalIcon}
              />
            </Button>
          }
        />
        <TooltipContent>{open ? `Close ${title}` : title}</TooltipContent>
      </Tooltip>
    </div>
  )
}

/* ------------------------------------------------------------------- rows */

const ROW =
  "flex h-8 w-full shrink-0 items-center justify-between rounded-lg bg-muted/60 px-3 transition-[background-color,opacity] hover:bg-muted/80"

export function ScrubberRows<K extends string>({
  controls,
  values,
  onChange,
}: {
  controls: ScrubberDef<K>[]
  values: Record<K, number>
  onChange: (key: K, value: number) => void
}) {
  return (
    <>
      {controls.map((control) => (
        <Scrubber
          key={control.key}
          label={control.label}
          icon={control.icon}
          min={control.min}
          max={control.max}
          step={control.step}
          decimals={control.decimals}
          value={values[control.key]}
          onValueChange={(next) => onChange(control.key, next)}
        />
      ))}
    </>
  )
}

export function SwitchRow({
  label,
  icon,
  checked,
  onCheckedChange,
}: {
  label: string
  icon?: IconSvgElement
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(ROW, "cursor-pointer")}
    >
      <RowLabel icon={icon} label={label} />
      <span
        className={`relative h-4.5 w-8 rounded-full transition-colors ${
          checked ? "bg-foreground" : "bg-border"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-3.5 rounded-full bg-background transition-transform ${
            checked ? "translate-x-3.5" : ""
          }`}
        />
      </span>
    </button>
  )
}

export function RadioRow<V extends string>({
  label,
  icon,
  options,
  value,
  onValueChange,
}: {
  label: string
  /** Leading icon for the group. Omit when the options carry their own. */
  icon?: IconSvgElement
  options: readonly { value: V; label: string; icon?: IconSvgElement }[]
  value: V
  onValueChange: (value: V) => void
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "flex h-8 w-full shrink-0 items-center gap-1 rounded-lg bg-muted/60 p-1",
        icon && "ps-3"
      )}
    >
      {icon && (
        <HugeiconsIcon
          aria-hidden
          className="size-3.5 shrink-0 text-muted-foreground"
          icon={icon}
        />
      )}
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onValueChange(option.value)}
          className={cn(
            "flex h-6 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md text-[12px] font-medium transition-colors",
            value === option.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {option.icon && (
            <HugeiconsIcon
              aria-hidden
              className="size-3.5 shrink-0"
              icon={option.icon}
              strokeWidth={2}
            />
          )}
          {option.label}
        </button>
      ))}
    </div>
  )
}

export function ColorRow({
  label,
  icon,
  value,
  onValueChange,
  displayValue,
  onReset,
}: {
  label: string
  icon?: IconSvgElement
  value: string
  onValueChange: (value: string) => void
  /** Text shown instead of the hex value, e.g. "Auto". */
  displayValue?: string
  /** Notation the picker's field opens in. Defaults to hex. */
  /** When set, shows a reset icon that reverts the row. */
  onReset?: () => void
}) {
  return (
    <div className={cn(ROW, "select-none")}>
      <RowLabel icon={icon} label={label} />
      <span className="flex items-center gap-2">
        {onReset && <ResetButton label={label} onReset={onReset} />}
        <ColorPicker
          label={label}
          value={value}
          onValueChange={onValueChange}
          displayValue={displayValue}
        />
      </span>
    </div>
  )
}

export function TextRow({
  label,
  icon,
  value,
  onValueChange,
  placeholder,
  action,
}: {
  label: string
  icon?: IconSvgElement
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  /** Trailing button, e.g. a shuffle. */
  action?: { icon: IconSvgElement; label: string; onClick: () => void }
}) {
  const id = useId()

  return (
    <div className={cn(ROW, "gap-2 focus-within:bg-muted/80")}>
      <label className="shrink-0 cursor-text" htmlFor={id}>
        <RowLabel icon={icon} label={label} />
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent text-right text-[12.5px] font-medium text-muted-foreground outline-none placeholder:text-muted-foreground/50"
      />
      {action && (
        <button
          type="button"
          aria-label={action.label}
          title={action.label}
          onClick={action.onClick}
          className="-me-1 shrink-0 cursor-pointer rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <HugeiconsIcon aria-hidden className="size-3.5" icon={action.icon} />
        </button>
      )}
    </div>
  )
}

export function SelectRow<V extends string>({
  label,
  icon,
  options,
  value,
  onValueChange,
  onReset,
}: {
  label: string
  icon?: IconSvgElement
  options: readonly { value: V; label: string }[]
  value: V
  onValueChange: (value: V) => void
  /** When set, shows a reset icon that reverts the row. */
  onReset?: () => void
}) {
  return (
    <div className="relative w-full shrink-0">
      <Select
        items={options as { value: V; label: string }[]}
        value={value}
        onValueChange={(next) => onValueChange(next as V)}
      >
        <SelectTrigger
          aria-label={label}
          className={cn(
            ROW,
            "cursor-pointer border-0 py-0 ps-3 pe-2.5 shadow-none focus-visible:ring-0 dark:bg-muted/60 dark:hover:bg-muted/80",
            "[&_svg]:size-3.5",
            onReset && "pe-9"
          )}
        >
          <RowLabel icon={icon} label={label} />
          <SelectValue className="flex-none text-[12.5px] font-medium text-muted-foreground" />
        </SelectTrigger>
        <SelectContent align="end" alignItemWithTrigger={false}>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-[12.5px] font-medium"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Outside the trigger, so resetting never opens the menu. */}
      {onReset && (
        <span className="absolute inset-y-0 end-2 flex items-center">
          <ResetButton label={label} onReset={onReset} />
        </span>
      )}
    </div>
  )
}

/**
 * A {@link TextRow} that also carries its own presets: type any name to
 * generate, pick a known one from the menu, or roll a fresh name. The field
 * is the single source of truth — every route just writes a name into it.
 */
export function SeedRow<V extends string>({
  label,
  icon,
  value,
  onValueChange,
  placeholder,
  options,
  /** Highlights the matching menu entry; omit when nothing matches. */
  activeOption,
  onRandom,
  randomLabel = "Random",
  randomIcon,
  menuLabel = "Presets",
}: {
  label: string
  icon?: IconSvgElement
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  options: readonly { value: V; label: string }[]
  activeOption?: V | null
  onRandom?: () => void
  randomLabel?: string
  randomIcon?: IconSvgElement
  menuLabel?: string
}) {
  const id = useId()
  const isKnown = options.some((option) => option.value === activeOption)

  return (
    <div className={cn(ROW, "gap-2 pe-1.5 focus-within:bg-muted/80")}>
      <label className="shrink-0 cursor-text" htmlFor={id}>
        <RowLabel icon={icon} label={label} />
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent text-right text-[12.5px] font-medium text-muted-foreground outline-none placeholder:text-muted-foreground/50"
      />
      <span className="flex shrink-0 items-center gap-1">
        <Select
          items={options as { value: V; label: string }[]}
          value={isKnown ? activeOption : null}
          onValueChange={(next) => {
            if (typeof next === "string") onValueChange(next)
          }}
        >
          <SelectTrigger
            aria-label={menuLabel}
            className="size-5 shrink-0 cursor-pointer justify-center border-0 bg-transparent p-0 text-muted-foreground shadow-none transition-colors hover:text-foreground focus-visible:ring-0 dark:bg-transparent dark:hover:bg-transparent [&_svg]:size-3.5"
          />
          <SelectContent align="end" alignItemWithTrigger={false}>
            <SelectGroup>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-[12.5px] font-medium"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {onRandom && (
          <button
            type="button"
            aria-label={randomLabel}
            title={randomLabel}
            onClick={onRandom}
            className="flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
          >
            {randomIcon ? (
              <HugeiconsIcon
                aria-hidden
                className="size-3.5"
                icon={randomIcon}
              />
            ) : (
              <span className="text-[12.5px] font-medium">{randomLabel}</span>
            )}
          </button>
        )}
      </span>
    </div>
  )
}

export function ActionRow({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(ROW, "cursor-pointer justify-center")}
    >
      <span className="text-[12.5px] font-medium text-foreground/90">
        {label}
      </span>
    </button>
  )
}

/** An {@link ActionRow} that copies `value`, confirms in place, and toasts. */
export function CopyRow({
  label,
  copiedLabel = "Copied",
  toastMessage = "Copied to clipboard",
  value,
}: {
  label: string
  copiedLabel?: string
  /** Set to null to confirm on the button only. */
  toastMessage?: string | null
  value: string | (() => string)
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(timer)
  }, [copied])

  return (
    <ActionRow
      label={copied ? copiedLabel : label}
      onClick={() => {
        // Only confirm once the write lands — a blocked clipboard should
        // leave the button saying "Copy" rather than lie about it.
        navigator.clipboard
          .writeText(typeof value === "function" ? value() : value)
          .then(() => {
            setCopied(true)
            if (toastMessage)
              toast.add({ title: toastMessage, type: "success" })
          })
          .catch(() => {
            setCopied(false)
            toast.add({
              title: "Couldn't reach the clipboard",
              type: "error",
            })
          })
      }}
    />
  )
}
