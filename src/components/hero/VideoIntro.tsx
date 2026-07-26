"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { VideoControls } from "./VideoControls";
import { ScrollIndicator } from "./ScrollIndicator";
import { CodeGlyphs } from "./CodeGlyphs";
import { Button, StatusBadge } from "@/components/ui";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { profile, VIDEO_SRC, VIDEO_POSTER, CAPTIONS_SRC } from "@/data/portfolio";
import styles from "./VideoIntro.module.css";

// Three.js only on the client, never during SSR.
const CinematicLayer = dynamic(
  () => import("./CinematicLayer").then((m) => m.CinematicLayer),
  { ssr: false }
);

const HINT_KEY = "gg-sound-hint-dismissed";

export function VideoIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ambientRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [showHint, setShowHint] = useState(false);

  // Keep the ambient layer roughly in sync with the main video without fighting re-renders.
  const syncAmbient = () => {
    const v = videoRef.current;
    const a = ambientRef.current;
    if (v && a && Math.abs(a.currentTime - v.currentTime) > 0.3) a.currentTime = v.currentTime;
  };

  const togglePlay = () => {
    const v = videoRef.current;
    const a = ambientRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      void a?.play();
      setPlaying(true);
    } else {
      v.pause();
      a?.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (!next) dismissHint();
  };

  const dismissHint = () => {
    setShowHint(false);
    try {
      sessionStorage.setItem(HINT_KEY, "1");
    } catch {
      /* private mode — non-fatal */
    }
  };

  // Sound hint: show once per session, auto-hide after 5s.
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(HINT_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (dismissed) return;
    const show = setTimeout(() => setShowHint(true), 1400);
    const hide = setTimeout(() => setShowHint(false), 6400);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  // Pause playback when the tab is hidden; resume if the user had it playing.
  useEffect(() => {
    const onVis = () => {
      const v = videoRef.current;
      const a = ambientRef.current;
      if (!v) return;
      if (document.hidden) {
        v.pause();
        a?.pause();
      } else if (playing) {
        void v.play();
        void a?.play();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [playing]);

  // Respect autoplay restrictions: reflect the actual element state.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("timeupdate", syncAmbient);
    void v.play().catch(() => setPlaying(false));
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("timeupdate", syncAmbient);
    };
  }, []);

  // Intro timeline.
  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>("[data-intro]");
    if (reduced) {
      gsap.set(items, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }
    gsap.set(items, { opacity: 0, y: 26, filter: "blur(8px)" });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.25,
    });
  }, [reduced]);

  return (
    <section ref={rootRef} className={styles.hero} id="hero" aria-label="Introduction">
      {/* Ambient blurred background copy of the same video */}
      <video
        ref={ambientRef}
        className={styles.ambient}
        src={VIDEO_SRC}
        poster={VIDEO_POSTER}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Foreground talking-head video */}
      <div className={styles.videoWrap} data-intro>
        <video
          ref={videoRef}
          className={styles.video}
          src={VIDEO_SRC}
          poster={VIDEO_POSTER}
          muted={muted}
          loop
          playsInline
          autoPlay
          preload="metadata"
        >
          <track kind="captions" src={CAPTIONS_SRC} srcLang="en" label="English" />
        </video>
      </div>

      {/* Cinematic overlays */}
      <div className={styles.overlayGradient} aria-hidden="true" />
      <div className={styles.overlayVignette} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      {/* Code-motif glyphs */}
      <CodeGlyphs />

      {/* Three.js dust / bokeh */}
      <CinematicLayer />

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <span className={`eyebrow ${styles.eyebrow}`} data-intro>
          {profile.eyebrow}
        </span>

        <h1 className={styles.name}>
          <span className={styles.nameLine} data-intro>
            {profile.firstName}
          </span>
          <span className={styles.nameLine} data-intro>
            {profile.lastName}
          </span>
        </h1>

        <p className={styles.role} data-intro>
          {profile.role}
        </p>
        <p className={styles.statement} data-intro>
          {profile.statement}
        </p>
        <p className={styles.desc} data-intro>
          {profile.heroDescription}
        </p>

        <div className={styles.ctas} data-intro>
          <Button href="#projects">Explore My Work</Button>
          <Button href="#contact" variant="secondary">
            Start a Conversation
          </Button>
        </div>

        <div data-intro>
          <StatusBadge label={profile.availability} />
        </div>
      </div>

      {/* Controls + sound hint */}
      <div className={styles.controlsWrap} data-intro>
        {showHint && !reduced && (
          <button type="button" className={styles.soundHint} onClick={toggleMute}>
            <span className={styles.hintWave} aria-hidden="true" />
            Tap for sound
          </button>
        )}
        <VideoControls
          playing={playing}
          muted={muted}
          onTogglePlay={togglePlay}
          onToggleMute={toggleMute}
        />
      </div>

      <div className={styles.scrollWrap} data-intro>
        <ScrollIndicator targetId="about" />
      </div>
    </section>
  );
}
