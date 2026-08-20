"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupButton,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  ArrowLeft01Icon,
  DashboardSpeed02Icon,
  GoBackward10SecIcon,
  GoBackward15SecIcon,
  GoBackward30SecIcon,
  GoBackward60SecIcon,
  GoBackwardFiveSecIcon,
  GoForward10SecIcon,
  GoForward15SecIcon,
  GoForward30SecIcon,
  GoForward60SecIcon,
  GoForwardFiveSecIcon,
  PauseIcon,
  PlayIcon,
  VolumeHighIcon,
  VolumeLowIcon,
  VolumeOffIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import type { Experimental_SpeechResult as SpeechResult } from "ai";
import {
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import {
  type ComponentProps,
  createContext,
  type CSSProperties,
  type DetailedHTMLProps,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

// The media-chrome React wrappers render a server-only declarative shadow DOM
// <template> child, which shifts React's useId sequence between server and
// client and breaks hydration for id-generating descendants (the Base UI
// tooltips and menus below). Rendering the container elements as plain custom
// element tags keeps both trees identical; the elements attach their shadow
// roots themselves on upgrade. Importing any wrapper above still registers
// every media-chrome custom element.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "media-controller": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { audio?: boolean };
      "media-control-bar": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

// Base UI trigger handlers expect React synthetic events, but media-chrome's
// React wrapper rebinds merged props with addEventListener, which passes raw
// native events and crashes on `event.nativeEvent` access. Anchoring the
// tooltip on a real <span> wrapper keeps the trigger inside React's event
// system while the media-chrome button stays the interactive element.
const AudioPlayerTooltip = ({
  tooltip,
  children,
}: {
  tooltip: ReactNode;
  children: ReactNode;
}) => (
  <Tooltip>
    <TooltipTrigger render={<span className="inline-flex" />}>
      {children}
    </TooltipTrigger>
    <TooltipContent>{tooltip}</TooltipContent>
  </Tooltip>
);

const formatTime = (value: number) => {
  const total = Math.floor(Math.max(value, 0));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = `${total % 60}`.padStart(2, "0");

  return hours > 0
    ? `${hours}:${`${minutes}`.padStart(2, "0")}:${seconds}`
    : `${minutes}:${seconds}`;
};

// Subscribes an element to media state: declaring `mediachromeattributes` makes
// the controller reflect the listed attributes onto it, and the observer feeds
// them back as numbers. Attach the returned ref alongside the attribute.
const useMediaAttributes = (attributes: string) => {
  const [values, setValues] = useState<Record<string, number>>({});
  const observerRef = useRef<MutationObserver | null>(null);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;

      if (!node) {
        return;
      }

      const names = attributes.split(" ");
      const update = () =>
        setValues(
          Object.fromEntries(
            names.map((name) => [
              name,
              Number.parseFloat(node.getAttribute(name) ?? ""),
            ]),
          ),
        );

      update();
      observerRef.current = new MutationObserver(update);
      observerRef.current.observe(node, { attributeFilter: names });
    },
    [attributes],
  );

  return { ref, values };
};

const seekBackwardIcons: Partial<Record<number, IconSvgElement>> = {
  5: GoBackwardFiveSecIcon,
  10: GoBackward10SecIcon,
  15: GoBackward15SecIcon,
  30: GoBackward30SecIcon,
  60: GoBackward60SecIcon,
};

const seekForwardIcons: Partial<Record<number, IconSvgElement>> = {
  5: GoForwardFiveSecIcon,
  10: GoForward10SecIcon,
  15: GoForward15SecIcon,
  30: GoForward30SecIcon,
  60: GoForward60SecIcon,
};

export type AudioPlayerProps = Omit<
  ComponentProps<"media-controller">,
  "audio"
>;

export const AudioPlayer = ({
  children,
  style,
  ...props
}: AudioPlayerProps) => (
  // The upgraded element reflects media state attributes onto itself before
  // React hydrates, so suppress the resulting attribute-mismatch warnings.
  <media-controller
    audio
    data-slot="audio-player"
    suppressHydrationWarning
    style={
      {
        "--media-background-color": "transparent",
        "--media-button-icon-height": "1rem",
        "--media-button-icon-width": "1rem",
        "--media-control-background": "transparent",
        "--media-control-hover-background": "var(--color-accent)",
        "--media-control-padding": "0",
        "--media-font": "var(--font-sans)",
        "--media-font-size": "10px",
        "--media-icon-color": "currentColor",
        "--media-preview-time-background": "var(--color-background)",
        "--media-preview-time-border-radius": "var(--radius-md)",
        "--media-preview-time-text-shadow": "none",
        "--media-primary-color": "var(--color-primary)",
        "--media-range-bar-color": "var(--color-primary)",
        "--media-range-track-background": "var(--color-secondary)",
        "--media-secondary-color": "var(--color-secondary)",
        "--media-text-color": "var(--color-foreground)",
        "--media-tooltip-display": "none",
        ...style,
      } as CSSProperties
    }
    {...props}
  >
    {children}
  </media-controller>
);

export type AudioPlayerElementProps = Omit<ComponentProps<"audio">, "src"> &
  (
    | {
        data: SpeechResult["audio"];
      }
    | {
        src: string;
      }
  );

export const AudioPlayerElement = ({ ...props }: AudioPlayerElementProps) => (
  // oxlint-disable-next-line eslint-plugin-jsx-a11y(media-has-caption) -- audio player captions are provided by consumer
  <audio
    data-slot="audio-player-element"
    slot="media"
    // media-controller assigns tabindex="-1" to the slotted media element
    // before React hydrates.
    suppressHydrationWarning
    src={
      "src" in props
        ? props.src
        : `data:${props.data.mediaType};base64,${props.data.base64}`
    }
    {...props}
  />
);

export type AudioPlayerControlBarProps = ComponentProps<"media-control-bar">;

export const AudioPlayerControlBar = ({
  children,
  ...props
}: AudioPlayerControlBarProps) => (
  <media-control-bar
    data-slot="audio-player-control-bar"
    suppressHydrationWarning
    {...props}
  >
    <TooltipProvider>
      <InputGroup className="w-full gap-0.5 px-1">{children}</InputGroup>
    </TooltipProvider>
  </media-control-bar>
);

export type AudioPlayerPlayButtonProps = ComponentProps<
  typeof MediaPlayButton
> & {
  tooltip?: string;
};

export const AudioPlayerPlayButton = ({
  className,
  tooltip = "Play / Pause",
  ...props
}: AudioPlayerPlayButtonProps) => (
  <AudioPlayerTooltip tooltip={tooltip}>
    <InputGroupButton
      nativeButton={false}
      size="icon-xs"
      render={
        <MediaPlayButton
          className={cn("bg-transparent", className)}
          data-slot="audio-player-play-button"
          {...props}
        >
          <HugeiconsIcon
            className="size-4 fill-none text-muted-foreground"
            icon={PlayIcon}
            slot="play"
            strokeWidth={1.5}
          />
          <HugeiconsIcon
            className="size-4 fill-none text-muted-foreground"
            icon={PauseIcon}
            slot="pause"
            strokeWidth={1.5}
          />
        </MediaPlayButton>
      }
    />
  </AudioPlayerTooltip>
);

export type AudioPlayerSeekBackwardButtonProps = ComponentProps<
  typeof MediaSeekBackwardButton
> & {
  tooltip?: string;
};

export const AudioPlayerSeekBackwardButton = ({
  className,
  seekOffset = 10,
  tooltip,
  ...props
}: AudioPlayerSeekBackwardButtonProps) => (
  <AudioPlayerTooltip
    tooltip={tooltip ?? `Seek backward ${seekOffset} seconds`}
  >
    <InputGroupButton
      nativeButton={false}
      size="icon-xs"
      render={
        <MediaSeekBackwardButton
          className={cn("bg-transparent", className)}
          data-slot="audio-player-seek-backward-button"
          seekOffset={seekOffset}
          {...props}
        >
          <HugeiconsIcon
            className="size-4 fill-none text-muted-foreground"
            icon={seekBackwardIcons[seekOffset] ?? GoBackward10SecIcon}
            slot="icon"
            strokeWidth={1.5}
          />
        </MediaSeekBackwardButton>
      }
    />
  </AudioPlayerTooltip>
);

export type AudioPlayerSeekForwardButtonProps = ComponentProps<
  typeof MediaSeekForwardButton
> & {
  tooltip?: string;
};

export const AudioPlayerSeekForwardButton = ({
  className,
  seekOffset = 10,
  tooltip,
  ...props
}: AudioPlayerSeekForwardButtonProps) => (
  <AudioPlayerTooltip tooltip={tooltip ?? `Seek forward ${seekOffset} seconds`}>
    <InputGroupButton
      nativeButton={false}
      size="icon-xs"
      render={
        <MediaSeekForwardButton
          className={cn("bg-transparent", className)}
          data-slot="audio-player-seek-forward-button"
          seekOffset={seekOffset}
          {...props}
        >
          <HugeiconsIcon
            className="size-4 fill-none text-muted-foreground"
            icon={seekForwardIcons[seekOffset] ?? GoForward10SecIcon}
            slot="icon"
            strokeWidth={1.5}
          />
        </MediaSeekForwardButton>
      }
    />
  </AudioPlayerTooltip>
);

export type AudioPlayerTimeDisplayProps = ComponentProps<"span">;

// Shows elapsed time scaled by playback speed (wall-clock seconds), so it
// stays consistent with the speed-adjusted duration display.
export const AudioPlayerTimeDisplay = ({
  className,
  ...props
}: AudioPlayerTimeDisplayProps) => {
  const { ref, values } = useMediaAttributes(
    "mediacurrenttime mediaplaybackrate",
  );
  const rate = values.mediaplaybackrate || 1;
  const currentTime = values.mediacurrenttime || 0;

  return (
    <InputGroupText>
      <span
        className={cn(
          "text-(length:--media-font-size) text-xs tabular-nums text-muted-foreground pr-2",
          className,
        )}
        data-slot="audio-player-time-display"
        ref={ref}
        // The controller reflects the subscribed attributes onto this element
        // before React hydrates.
        suppressHydrationWarning
        {...{ mediachromeattributes: "mediacurrenttime mediaplaybackrate" }}
        {...props}
      >
        {formatTime(currentTime / rate)}
      </span>
    </InputGroupText>
  );
};

export type AudioPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>;

export const AudioPlayerTimeRange = ({
  className,
  ...props
}: AudioPlayerTimeRangeProps) => (
  <MediaTimeRange
    className={cn("min-w-0 flex-1 bg-transparent", className)}
    data-slot="audio-player-time-range"
    {...props}
  />
);

export type AudioPlayerDurationDisplayProps = ComponentProps<"span">;

// Shows how long the track takes at the current speed, e.g. a 6 second clip
// reads 0:12 at 0.5x and 0:03 at 2x.
export const AudioPlayerDurationDisplay = ({
  className,
  ...props
}: AudioPlayerDurationDisplayProps) => {
  const { ref, values } = useMediaAttributes("mediaduration mediaplaybackrate");
  const rate = values.mediaplaybackrate || 1;
  const duration = values.mediaduration || 0;

  return (
    <InputGroupText>
      <span
        className={cn(
          "text-(length:--media-font-size) text-xs tabular-nums text-muted-foreground pr-1",
          className,
        )}
        data-slot="audio-player-duration-display"
        ref={ref}
        // The controller reflects the subscribed attributes onto this element
        // before React hydrates.
        suppressHydrationWarning
        {...{ mediachromeattributes: "mediaduration mediaplaybackrate" }}
        {...props}
      >
        {formatTime(duration / rate)}
      </span>
    </InputGroupText>
  );
};

type AudioPlayerVolumeContextValue = {
  open: boolean;
  toggle: () => void;
};

const AudioPlayerVolumeContext =
  createContext<AudioPlayerVolumeContextValue | null>(null);

export type AudioPlayerVolumeProps = ComponentProps<typeof ButtonGroup> & {
  defaultOpen?: boolean;
};

// Groups the volume controls; the volume range stays hidden until the volume
// trigger is clicked. The children also work standalone outside the group.
export const AudioPlayerVolume = ({
  className,
  defaultOpen = false,
  ...props
}: AudioPlayerVolumeProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = useCallback(() => setOpen((previous) => !previous), []);
  const contextValue = useMemo(() => ({ open, toggle }), [open, toggle]);

  return (
    <AudioPlayerVolumeContext.Provider value={contextValue}>
      <ButtonGroup
        className={cn("items-center", className)}
        data-slot="audio-player-volume"
        {...props}
      />
    </AudioPlayerVolumeContext.Provider>
  );
};

export type AudioPlayerVolumeTriggerProps = Omit<
  ComponentProps<typeof InputGroupButton>,
  "render"
> & {
  tooltip?: string;
};

export const AudioPlayerVolumeTrigger = ({
  className,
  onClick,
  tooltip,
  ...props
}: AudioPlayerVolumeTriggerProps) => {
  const volumeGroup = useContext(AudioPlayerVolumeContext);
  const open = volumeGroup?.open ?? false;

  return (
    <AudioPlayerTooltip
      tooltip={tooltip ?? (open ? "Hide volume" : "Show volume")}
    >
      <InputGroupButton
        aria-expanded={open}
        aria-label={tooltip ?? (open ? "Hide volume" : "Show volume")}
        className={className}
        data-slot="audio-player-volume-trigger"
        size="icon-xs"
        onClick={(event) => {
          volumeGroup?.toggle();
          onClick?.(event);
        }}
        {...props}
      >
        <HugeiconsIcon
          className={cn(
            "size-4 fill-none text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
          icon={ArrowLeft01Icon}
          strokeWidth={1.5}
        />
      </InputGroupButton>
    </AudioPlayerTooltip>
  );
};

export type AudioPlayerMuteButtonProps = ComponentProps<
  typeof MediaMuteButton
> & {
  tooltip?: string;
};

export const AudioPlayerMuteButton = ({
  className,
  tooltip,
  ...props
}: AudioPlayerMuteButtonProps) => {
  const [muted, setMuted] = useState(false);
  const observerRef = useRef<MutationObserver | null>(null);

  // The controller reflects volume state onto the button as the
  // `mediavolumelevel` attribute ("off" while muted), so watch it to keep the
  // tooltip in sync with the actual media state.
  const observeVolumeLevel = useCallback((node: HTMLElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;

    if (!node) {
      return;
    }

    const update = () =>
      setMuted(node.getAttribute("mediavolumelevel") === "off");

    update();
    observerRef.current = new MutationObserver(update);
    observerRef.current.observe(node, {
      attributeFilter: ["mediavolumelevel"],
    });
  }, []);

  return (
    <AudioPlayerTooltip tooltip={tooltip ?? (muted ? "Unmute" : "Mute")}>
      <InputGroupButton
        nativeButton={false}
        size="icon-xs"
        render={
          <MediaMuteButton
            className={cn("bg-transparent", className)}
            data-slot="audio-player-mute-button"
            ref={observeVolumeLevel}
            {...props}
          >
            <HugeiconsIcon
              className="size-4 fill-none text-muted-foreground"
              icon={VolumeOffIcon}
              slot="off"
              strokeWidth={1.5}
            />
            <HugeiconsIcon
              className="size-4 fill-none text-muted-foreground"
              icon={VolumeLowIcon}
              slot="low"
              strokeWidth={1.5}
            />
            <HugeiconsIcon
              className="size-4 fill-none text-muted-foreground"
              icon={VolumeHighIcon}
              slot="medium"
              strokeWidth={1.5}
            />
            <HugeiconsIcon
              className="size-4 fill-none text-muted-foreground"
              icon={VolumeHighIcon}
              slot="high"
              strokeWidth={1.5}
            />
          </MediaMuteButton>
        }
      />
    </AudioPlayerTooltip>
  );
};

export type AudioPlayerVolumeRangeProps = ComponentProps<
  typeof MediaVolumeRange
>;

export const AudioPlayerVolumeRange = ({
  className,
  ...props
}: AudioPlayerVolumeRangeProps) => {
  const volumeGroup = useContext(AudioPlayerVolumeContext);

  if (volumeGroup && !volumeGroup.open) {
    return null;
  }

  return (
    <MediaVolumeRange
      className={cn("w-20 bg-transparent pr-2", className)}
      data-slot="audio-player-volume-range"
      {...props}
    />
  );
};

const DEFAULT_PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

export type AudioPlayerSpeedButtonProps = Omit<
  ComponentProps<typeof InputGroupButton>,
  "render"
> & {
  rates?: number[];
  tooltip?: string;
};

export const AudioPlayerSpeedButton = ({
  className,
  rates = DEFAULT_PLAYBACK_RATES,
  tooltip = "Playback speed",
  ...props
}: AudioPlayerSpeedButtonProps) => {
  // Deriving the rate from media state keeps the menu in sync even when the
  // media reloads and silently resets its rate.
  const { ref: mediaStateRef, values } =
    useMediaAttributes("mediaplaybackrate");
  const rate = values.mediaplaybackrate || 1;
  const anchorRef = useRef<HTMLSpanElement | null>(null);

  const observeAnchor = useCallback(
    (node: HTMLSpanElement | null) => {
      anchorRef.current = node;
      mediaStateRef(node);
    },
    [mediaStateRef],
  );

  const handleRateChange = (value: number) => {
    // The menu renders in a portal outside <media-controller>, so dispatch the
    // request from the trigger's anchor for the controller to receive it.
    anchorRef.current?.dispatchEvent(
      new CustomEvent("mediaplaybackraterequest", {
        bubbles: true,
        composed: true,
        detail: value,
      }),
    );
  };

  return (
    <span
      className="contents"
      ref={observeAnchor}
      // The controller reflects the subscribed attributes onto this element
      // before React hydrates.
      suppressHydrationWarning
      {...{ mediachromeattributes: "mediaplaybackrate" }}
    >
      <DropdownMenu>
        <AudioPlayerTooltip tooltip={tooltip}>
          <DropdownMenuTrigger
            render={
              <InputGroupButton
                aria-label={tooltip}
                className={className}
                data-slot="audio-player-speed-button"
                size="icon-xs"
                {...props}
              >
                <HugeiconsIcon
                  className="size-4 fill-none text-muted-foreground"
                  icon={DashboardSpeed02Icon}
                  strokeWidth={1.5}
                />
              </InputGroupButton>
            }
          />
        </AudioPlayerTooltip>
        <DropdownMenuContent align="end" className="min-w-24">
          <DropdownMenuRadioGroup onValueChange={handleRateChange} value={rate}>
            {rates.map((value) => (
              <DropdownMenuRadioItem key={value} value={value}>
                {value}x
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </span>
  );
};
