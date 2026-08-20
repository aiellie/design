"use client";

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
  MediaControlBar,
  MediaController,
  MediaDurationDisplay,
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

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
  ComponentProps<typeof MediaController>,
  "audio"
>;

export const AudioPlayer = ({
  children,
  style,
  ...props
}: AudioPlayerProps) => (
  <MediaController
    audio
    data-slot="audio-player"
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
  </MediaController>
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
    src={
      "src" in props
        ? props.src
        : `data:${props.data.mediaType};base64,${props.data.base64}`
    }
    {...props}
  />
);

export type AudioPlayerControlBarProps = ComponentProps<typeof MediaControlBar>;

export const AudioPlayerControlBar = ({
  children,
  ...props
}: AudioPlayerControlBarProps) => (
  <MediaControlBar data-slot="audio-player-control-bar" {...props}>
    <TooltipProvider>
      <InputGroup className="w-full gap-0.5 px-1">{children}</InputGroup>
    </TooltipProvider>
  </MediaControlBar>
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
  <AudioPlayerTooltip tooltip={tooltip ?? `Seek backward ${seekOffset} seconds`}>
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

export type AudioPlayerTimeDisplayProps = ComponentProps<
  typeof MediaTimeDisplay
>;

export const AudioPlayerTimeDisplay = ({
  className,
  ...props
}: AudioPlayerTimeDisplayProps) => (
  <InputGroupText>
    <MediaTimeDisplay
      className={cn("bg-transparent tabular-nums text-muted-foreground pr-2", className)}
      data-slot="audio-player-time-display"
      {...props}
    />
  </InputGroupText>
);

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

export type AudioPlayerDurationDisplayProps = ComponentProps<
  typeof MediaDurationDisplay
>;

export const AudioPlayerDurationDisplay = ({
  className,
  ...props
}: AudioPlayerDurationDisplayProps) => (
  <InputGroupText>
    <MediaDurationDisplay
      className={cn("bg-transparent tabular-nums text-muted-foreground pr-1", className)}
      data-slot="audio-player-duration-display"
      {...props}
    />
  </InputGroupText>
);

export type AudioPlayerMuteButtonProps = ComponentProps<
  typeof MediaMuteButton
> & {
  tooltip?: string;
};

export const AudioPlayerMuteButton = ({
  className,
  tooltip = "Mute / Unmute",
  ...props
}: AudioPlayerMuteButtonProps) => (
  <AudioPlayerTooltip tooltip={tooltip}>
    <InputGroupButton
      nativeButton={false}
      size="icon-xs"
      render={
        <MediaMuteButton
          className={cn("bg-transparent", className)}
          data-slot="audio-player-mute-button"
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

export type AudioPlayerVolumeRangeProps = ComponentProps<
  typeof MediaVolumeRange
>;

export const AudioPlayerVolumeRange = ({
  className,
  ...props
}: AudioPlayerVolumeRangeProps) => (
  <MediaVolumeRange
    className={cn("w-20 bg-transparent pr-2", className)}
    data-slot="audio-player-volume-range"
    {...props}
  />
);
