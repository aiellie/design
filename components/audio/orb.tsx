"use client"

import { useMemo, useState } from "react"
import {
  AiBrain01Icon,
  ApertureIcon,
  ArrowHorizontalIcon,
  ArrowVerticalIcon,
  BlurIcon,
  CircleIcon,
  DashboardSpeed01Icon,
  DropletIcon,
  EyeClosedIcon,
  Megaphone01Icon,
  Mic01Icon,
  RatioIcon,
  RepeatIcon,
  RippleIcon,
  Rotate01Icon,
  ShapesIcon,
  ShuffleIcon,
  SparklesIcon,
  SpiralsIcon,
  ZoomIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { Warp } from "@paper-design/shaders-react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { useAudioLevel } from "@/hooks/use-audio-level"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  ColorRow,
  CopyRow,
  createRng,
  DemoControls,
  hashSeed,
  RadioRow,
  randomSeedName,
  randomValues,
  ScrubberRows,
  SeedRow,
  valuesAreDefault,
  type ScrubberDef,
} from "@/components/forms/demo-controls"

/** Matches `PersonaState` so an orb and a Persona can be driven by the same
 * conversation state. */
export type OrbState = "idle" | "listening" | "thinking" | "speaking" | "asleep"

type Preset = "aiellie" | "openai" | "google" | "anthropic" | "x" | "deepseek"

type WarpShape = "checks" | "stripes" | "edge"

type OrbColors = {
  color1: string
  color2: string
  color3: string
}

type OrbValues = {
  proportion: number
  softness: number
  distortion: number
  swirl: number
  swirlIterations: number
  shapeScale: number
  speed: number
  scale: number
  rotation: number
  offsetX: number
  offsetY: number
}

const presets: Record<Preset, OrbColors> = {
  aiellie: { color1: "#a5b4fc", color2: "#e0e7ff", color3: "#4f46e5" },
  openai: { color1: "#10a37f", color2: "#d1f5e9", color3: "#0b7a5f" },
  google: { color1: "#4285f4", color2: "#fce8e6", color3: "#ea4335" },
  anthropic: { color1: "#d97757", color2: "#f5efe6", color3: "#8c4a2f" },
  x: { color1: "#71767b", color2: "#e7e9ea", color3: "#0f1419" },
  deepseek: { color1: "#4d6bfe", color2: "#e3e9ff", color3: "#1c2f9e" },
}

const PRESET_OPTIONS = [
  { value: "aiellie", label: "aiellie" },
  { value: "openai", label: "openai" },
  { value: "google", label: "google" },
  { value: "anthropic", label: "anthropic" },
  { value: "x", label: "x" },
  { value: "deepseek", label: "deepseek" },
] as const satisfies readonly { value: Preset; label: string }[]

const SHAPE_OPTIONS = [
  { value: "checks", label: "Checks" },
  { value: "stripes", label: "Stripes" },
  { value: "edge", label: "Edge" },
] as const satisfies readonly { value: WarpShape; label: string }[]

const SHAPES = SHAPE_OPTIONS.map((option) => option.value)

/** Typing a preset name lands on that preset exactly, rather than on
 * whatever its letters happen to hash to. */
const PRESET_NAMES = new Set<string>(Object.keys(presets))

const DEFAULT_PRESET: Preset = "aiellie"
const DEFAULT_SHAPE: WarpShape = "edge"
const DEFAULT_COLORS = presets[DEFAULT_PRESET]

// The starting look *is* the aiellie preset, so the field says so rather
// than sitting empty on a placeholder.
const DEFAULT_SEED: string = DEFAULT_PRESET

const DEFAULT_VALUES: OrbValues = {
  proportion: 0.35,
  softness: 1,
  distortion: 0.32,
  swirl: 1,
  swirlIterations: 0,
  shapeScale: 0,
  speed: 12.2,
  scale: 0.31,
  rotation: 176,
  offsetX: 0.65,
  offsetY: 0.09,
}

// `seedRange` narrows what a generated seed may roll to — the full min/max is
// still reachable by dragging, but the extremes (scale 4, speed 30) wash the
// orb out, so seeded looks stay inside the range that reads as an orb.
const CONTROLS: ScrubberDef<keyof OrbValues>[] = [
  {
    key: "proportion",
    label: "Proportion",
    icon: RatioIcon,
    min: 0,
    max: 1,
    step: 0.01,
    decimals: 2,
    seedRange: [0.2, 0.8],
  },
  {
    key: "softness",
    label: "Softness",
    icon: BlurIcon,
    min: 0,
    max: 1,
    step: 0.01,
    decimals: 2,
    seedRange: [0.3, 1],
  },
  {
    key: "distortion",
    label: "Distortion",
    icon: RippleIcon,
    min: 0,
    max: 1,
    step: 0.01,
    decimals: 2,
    seedRange: [0.05, 0.6],
  },
  {
    key: "swirl",
    label: "Swirl",
    icon: SpiralsIcon,
    min: 0,
    max: 1,
    step: 0.01,
    decimals: 2,
    seedRange: [0.2, 1],
  },
  {
    key: "swirlIterations",
    label: "Swirl iterations",
    icon: RepeatIcon,
    min: 0,
    max: 20,
    step: 1,
    decimals: 0,
    seedRange: [0, 6],
  },
  {
    key: "shapeScale",
    label: "Shape scale",
    icon: ApertureIcon,
    min: 0,
    max: 1,
    step: 0.01,
    decimals: 2,
    seedRange: [0, 0.6],
  },
  {
    key: "speed",
    label: "Speed",
    icon: DashboardSpeed01Icon,
    min: 0,
    max: 30,
    step: 0.1,
    decimals: 1,
    seedRange: [4, 18],
  },
  {
    key: "scale",
    label: "Scale",
    icon: ZoomIcon,
    min: 0.01,
    max: 4,
    step: 0.01,
    decimals: 2,
    seedRange: [0.15, 1.2],
  },
  {
    key: "rotation",
    label: "Rotation",
    icon: Rotate01Icon,
    min: 0,
    max: 360,
    step: 1,
    decimals: 0,
  },
  {
    key: "offsetX",
    label: "Offset X",
    icon: ArrowHorizontalIcon,
    min: -1,
    max: 1,
    step: 0.01,
    decimals: 2,
    seedRange: [-0.8, 0.8],
  },
  {
    key: "offsetY",
    label: "Offset Y",
    icon: ArrowVerticalIcon,
    min: -1,
    max: 1,
    step: 0.01,
    decimals: 2,
    seedRange: [-0.8, 0.8],
  },
]

const CONTROL_BY_KEY = Object.fromEntries(
  CONTROLS.map((control) => [control.key, control])
) as Record<keyof OrbValues, ScrubberDef<keyof OrbValues>>

const STATES: {
  state: OrbState
  icon: IconSvgElement
  label: string
}[] = [
  { state: "idle", icon: CircleIcon, label: "Idle" },
  { state: "listening", icon: Mic01Icon, label: "Listening" },
  { state: "thinking", icon: AiBrain01Icon, label: "Thinking" },
  { state: "speaking", icon: Megaphone01Icon, label: "Speaking" },
  { state: "asleep", icon: EyeClosedIcon, label: "Asleep" },
]

/**
 * Per-state multipliers on the tuned shader values. The seed still owns the
 * look; a state only pushes it faster, calmer or more turbulent, so every
 * palette reads as the same orb in five moods.
 */
const STATE_SHADER: Record<
  OrbState,
  Partial<Record<keyof OrbValues, number>>
> = {
  idle: { speed: 0.5 },
  listening: { speed: 0.9, distortion: 1.2 },
  thinking: { speed: 2.4, swirl: 1.25, distortion: 1.4 },
  speaking: { speed: 1.7, swirl: 1.1, distortion: 1.25 },
  asleep: { speed: 0.1, swirl: 0.6, distortion: 0.45 },
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

function shaderValuesFor(
  values: OrbValues,
  state: OrbState,
  audioLevel: number
): OrbValues {
  const next = { ...values }

  for (const [key, factor] of Object.entries(STATE_SHADER[state]) as [
    keyof OrbValues,
    number,
  ][]) {
    const control = CONTROL_BY_KEY[key]
    next[key] = clamp(values[key] * factor, control.min, control.max)
  }

  // Only distortion tracks the mic: it is a spatial term, so pushing it every
  // audio frame warps the surface without stepping the shader clock.
  if (state === "listening") {
    next.distortion = clamp(next.distortion + audioLevel * 0.3, 0, 1)
  }

  return next
}

const STILL_SCALE: Record<OrbState, number> = {
  idle: 1,
  listening: 1,
  thinking: 0.94,
  speaking: 1,
  asleep: 0.86,
}

/**
 * How the orb itself moves in each state — the shader handles the surface,
 * this handles the body language. Listening is the exception: its target is
 * recomputed per audio frame, so it is built in the component instead.
 */
function motionFor(state: OrbState, still: boolean) {
  if (still) {
    return {
      animate: {
        scale: STILL_SCALE[state],
        rotate: 0,
        opacity: state === "asleep" ? 0.5 : 1,
      },
      transition: { duration: 0.3 },
    }
  }

  switch (state) {
    case "listening":
      return {
        animate: { scale: 1, rotate: 0, opacity: 1 },
        transition: { type: "spring" as const, stiffness: 400, damping: 26 },
      }
    case "thinking":
      return {
        animate: { scale: 0.94, rotate: 360, opacity: 1 },
        transition: {
          rotate: { duration: 7, repeat: Infinity, ease: "linear" as const },
          scale: { duration: 0.5 },
          opacity: { duration: 0.3 },
        },
      }
    case "speaking":
      return {
        animate: { scale: [1, 1.06, 0.99, 1.05, 1], rotate: 0, opacity: 1 },
        transition: {
          scale: {
            duration: 1.1,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
          rotate: { duration: 0.5 },
        },
      }
    case "asleep":
      return {
        animate: { scale: [0.86, 0.9, 0.86], rotate: 0, opacity: 0.5 },
        transition: {
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
          opacity: { duration: 0.8 },
          rotate: { duration: 0.5 },
        },
      }
    default:
      return {
        animate: { scale: [1, 1.02, 1], rotate: 0, opacity: 1 },
        transition: {
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
          rotate: { duration: 0.5 },
          opacity: { duration: 0.3 },
        },
      }
  }
}

function hslToHex(h: number, s: number, l: number): string {
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100)
  const channel = (n: number) => {
    const k = (n + h / 30) % 12
    const value = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
    return Math.round(255 * value)
      .toString(16)
      .padStart(2, "0")
  }
  return `#${channel(0)}${channel(8)}${channel(4)}`
}

/** Rolls a palette shaped like the built-in presets: a light accent, a
 * near-white wash, and a saturated deep tone from a neighbouring hue. */
function colorsFromRng(rng: () => number): OrbColors {
  const hue = Math.floor(rng() * 360)
  const spread = 20 + Math.floor(rng() * 60)
  return {
    color1: hslToHex(hue, 90, 76),
    color2: hslToHex((hue + spread) % 360, 100, 93),
    color3: hslToHex((hue + 360 - spread) % 360, 72, 45),
  }
}

type OrbConfig = { colors: OrbColors; shape: WarpShape; values: OrbValues }

/** A name is the whole recipe: preset names resolve to their preset, and
 * anything else is hashed into a look that never changes for that name. */
function configFromSeed(text: string): OrbConfig {
  const name = text.trim().toLowerCase()

  if (PRESET_NAMES.has(name)) {
    return {
      colors: presets[name as Preset],
      shape: DEFAULT_SHAPE,
      values: DEFAULT_VALUES,
    }
  }

  const rng = createRng(hashSeed(name))
  return {
    values: randomValues(CONTROLS, rng),
    shape: SHAPES[Math.floor(rng() * SHAPES.length)],
    colors: colorsFromRng(rng),
  }
}

/** Shown once the controls no longer match the seed they came from — a
 * hand-tuned config has no short name, so "Copy values" is its export. */
const CUSTOM_SEED = "custom"

/** Full-page playground layout, used whenever no `className` is given. */
const PLAYGROUND_LAYOUT = " gap-8"

export function Orb({
  /** Drive the orb from your own conversation state. Left off, the buttons
   * under the orb control it. */
  state,
  /** Edge of the square shader, and so the diameter of the clipped orb. */
  size = 280,
  /** Set false to drop the shader panel and ship the orb on its own. */
  controls = true,
  /** Set false to drop the state buttons — pair it with `state` to drive the
   * orb from your own app instead. */
  states = true,
  /** Names the look, exactly like the seed field does: a preset name lands on
   * that preset, anything else hashes to a look that never changes for that
   * word. Controlled while set, so pair it with `controls={false}`. */
  seed: seedProp,
  /** Replaces the full-page wrapper, so the orb can sit inside a card. */
  className,
}: {
  state?: OrbState
  size?: number
  controls?: boolean
  states?: boolean
  seed?: string
  className?: string
} = {}) {
  const [seed, setSeed] = useState(DEFAULT_SEED)
  const [colors, setColors] = useState<OrbColors>(DEFAULT_COLORS)
  const [shape, setShape] = useState<WarpShape>(DEFAULT_SHAPE)
  const [values, setValues] = useState<OrbValues>(DEFAULT_VALUES)
  const [internalState, setInternalState] = useState<OrbState>("idle")
  const { audioLevel, isListening, startListening, stopListening } =
    useAudioLevel()
  const shouldReduceMotion = useReducedMotion()

  const activeState = state ?? internalState

  // A `seed` prop takes the look over entirely: the same word always resolves
  // to the same palette, so a caller can theme the orb without shipping the
  // controls panel alongside it.
  const seeded = useMemo(
    () => (seedProp === undefined ? null : configFromSeed(seedProp)),
    [seedProp]
  )
  const activeColors = seeded?.colors ?? colors
  const activeShape = seeded?.shape ?? shape
  const activeValues = seeded?.values ?? values

  const shaderValues = shaderValuesFor(activeValues, activeState, audioLevel)

  // Memoised so a slider drag (or an audio frame) never hands motion a fresh
  // keyframe array, which would restart the loop mid-pulse.
  const orbMotion = useMemo(
    () => motionFor(activeState, shouldReduceMotion ?? false),
    [activeState, shouldReduceMotion]
  )

  const orbAnimate =
    activeState === "listening" && !shouldReduceMotion
      ? { scale: 1 + audioLevel * 0.22, rotate: 0, opacity: 1 }
      : orbMotion.animate

  const isDefault =
    seed === DEFAULT_SEED &&
    shape === DEFAULT_SHAPE &&
    valuesAreDefault(colors, DEFAULT_COLORS) &&
    valuesAreDefault(values, DEFAULT_VALUES)

  // Ticks the matching entry in the seed menu; null once the palette has
  // drifted off every preset.
  const activePreset =
    PRESET_OPTIONS.find((option) =>
      valuesAreDefault(colors, presets[option.value])
    )?.value ?? null

  const applySeed = (text: string) => {
    setSeed(text)
    // Leave the orb alone while the field is being cleared out.
    if (!text.trim()) return
    const config = configFromSeed(text)
    setColors(config.colors)
    setShape(config.shape)
    setValues(config.values)
  }

  // Hand edits leave the seed behind: no short name reproduces an arbitrary
  // set of sliders, so the field says so instead of inventing one.
  const applyConfig = (next: Partial<OrbConfig>) => {
    const config: OrbConfig = { colors, shape, values, ...next }
    setColors(config.colors)
    setShape(config.shape)
    setValues(config.values)
    setSeed(CUSTOM_SEED)
  }

  // Listening is the one state backed by real hardware, so entering it opens
  // the mic and leaving it closes it again.
  const handleStateChange = (next: OrbState) => {
    setInternalState(next)
    if (next === "listening") {
      if (!isListening) startListening()
    } else if (isListening) {
      stopListening()
    }
  }

  const handleCall = () => {
    handleStateChange(isListening ? "idle" : "listening")
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        // A caller that lays the orb out itself gets none of the playground
        // chrome — not even the viewport height that centres it here.
        className === undefined ? PLAYGROUND_LAYOUT : className
      )}
    >
      {/* AI Orb - circular clipped shader */}
      <motion.div
        className="overflow-hidden rounded-full"
        style={{ width: size, height: size }}
        animate={orbAnimate}
        transition={orbMotion.transition}
      >
        <Warp
          width={size}
          height={size}
          colors={[
            activeColors.color1,
            activeColors.color2,
            activeColors.color3,
          ]}
          shape={activeShape}
          {...shaderValues}
        />
      </motion.div>

      {/* State selector */}
      {states ? (
        <ButtonGroup orientation="horizontal">
          {STATES.map((entry) => (
            <Tooltip key={entry.state}>
              <TooltipTrigger
                render={
                  <Button
                    onClick={() => handleStateChange(entry.state)}
                    size="icon-sm"
                    variant={
                      activeState === entry.state ? "default" : "outline"
                    }
                    disabled={state !== undefined}
                  />
                }
              >
                <HugeiconsIcon
                  icon={entry.icon}
                  strokeWidth={2}
                  className="size-4"
                />
              </TooltipTrigger>
              <TooltipContent>{entry.label}</TooltipContent>
            </Tooltip>
          ))}
        </ButtonGroup>
      ) : null}

      {controls ? (
        <DemoControls
          title="Shader controls"
          isDefault={isDefault}
          onReset={() => {
            setSeed(DEFAULT_SEED)
            setColors(DEFAULT_COLORS)
            setShape(DEFAULT_SHAPE)
            setValues(DEFAULT_VALUES)
          }}
          footer={
            <CopyRow
              label="Copy values"
              toastMessage="Shader values copied to clipboard"
              value={() =>
                JSON.stringify(
                  {
                    colors: [colors.color1, colors.color2, colors.color3],
                    shape,
                    ...values,
                  },
                  null,
                  2
                )
              }
            />
          }
        >
          <SeedRow
            label="Seed"
            icon={SparklesIcon}
            value={seed}
            onValueChange={applySeed}
            placeholder="type any name…"
            options={PRESET_OPTIONS}
            activeOption={activePreset}
            onRandom={() => applySeed(randomSeedName())}
            randomLabel="Roll a random seed"
            randomIcon={ShuffleIcon}
            menuLabel="Presets"
          />
          <ColorRow
            label="Color 1"
            icon={DropletIcon}
            value={colors.color1}
            onValueChange={(color1) =>
              applyConfig({ colors: { ...colors, color1 } })
            }
          />
          <ColorRow
            label="Color 2"
            icon={DropletIcon}
            value={colors.color2}
            onValueChange={(color2) =>
              applyConfig({ colors: { ...colors, color2 } })
            }
          />
          <ColorRow
            label="Color 3"
            icon={DropletIcon}
            value={colors.color3}
            onValueChange={(color3) =>
              applyConfig({ colors: { ...colors, color3 } })
            }
          />
          <RadioRow
            label="Shape"
            icon={ShapesIcon}
            options={SHAPE_OPTIONS}
            value={shape}
            onValueChange={(next) => applyConfig({ shape: next })}
          />
          <ScrubberRows
            controls={CONTROLS}
            values={values}
            onChange={(key, next) =>
              applyConfig({ values: { ...values, [key]: next } })
            }
          />
        </DemoControls>
      ) : null}
    </div>
  )
}
