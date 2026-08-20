"use client";

import {
  AudioPlayer,
  AudioPlayerControlBar,
  AudioPlayerDurationDisplay,
  AudioPlayerElement,
  AudioPlayerMuteButton,
  AudioPlayerPlayButton,
  AudioPlayerSeekBackwardButton,
  AudioPlayerSeekForwardButton,
  AudioPlayerSpeedButton,
  AudioPlayerTimeDisplay,
  AudioPlayerTimeRange,
  AudioPlayerVolume,
  AudioPlayerVolumeRange,
  AudioPlayerVolumeTrigger,
} from "@/components/audio/audio-player";

export const AudioPlayerExample = () => (
  <div className="flex size-full items-center justify-center">
    <AudioPlayer>
      <AudioPlayerElement src="https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/ElevenLabs_2025-11-10T22_07_46_Hayden_pvc_sp108_s50_sb75_se0_b_m2.mp3" />
      <AudioPlayerControlBar>
        <AudioPlayerPlayButton />
        <AudioPlayerSeekBackwardButton seekOffset={10} />
        <AudioPlayerSeekForwardButton seekOffset={10} />
        <AudioPlayerTimeDisplay />
        <AudioPlayerTimeRange />
        <AudioPlayerDurationDisplay />
        <AudioPlayerVolume>
          <AudioPlayerMuteButton />
          <AudioPlayerVolumeRange />
          <AudioPlayerVolumeTrigger />
        </AudioPlayerVolume>
        <AudioPlayerSpeedButton />
      </AudioPlayerControlBar>
    </AudioPlayer>
  </div>
);
