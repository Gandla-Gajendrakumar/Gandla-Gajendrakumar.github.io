"use client";

import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import styles from "./VideoIntro.module.css";

interface Props {
  playing: boolean;
  muted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

export function VideoControls({ playing, muted, onTogglePlay, onToggleMute }: Props) {
  return (
    <div className={styles.controls}>
      <button
        type="button"
        className={styles.ctrlBtn}
        onClick={onTogglePlay}
        aria-label={playing ? "Pause video" : "Play video"}
        aria-pressed={playing}
      >
        {playing ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <button
        type="button"
        className={styles.ctrlBtn}
        onClick={onToggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        aria-pressed={!muted}
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
}
