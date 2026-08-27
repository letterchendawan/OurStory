"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Gate from "@/components/Gate";
import MuteButton from "@/components/MuteButton";
import Story from "@/components/Story";
import { withBasePath } from "@/lib/paths";

export default function Experience() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [started, setStarted] = useState(false);
  const [gateHidden, setGateHidden] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.45;
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("story-open", started);
    return () => document.documentElement.classList.remove("story-open");
  }, [started]);

  const start = useCallback(() => {
    if (started) return;
    setStarted(true);
    const play = audioRef.current?.play();
    play?.catch(() => {
      /* autoplay blocked — still open story */
    });
    window.setTimeout(() => setGateHidden(true), 950);
  }, [started]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={withBasePath("/satie-gymnopedie-no-1.mp3")}
        loop
        preload="auto"
      />
      <Gate started={started} hidden={gateHidden} onEnter={start} />
      {started ? <Story /> : null}
      {started ? <MuteButton muted={muted} onToggle={toggleMute} /> : null}
    </>
  );
}
