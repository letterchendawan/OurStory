"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Gate from "@/components/Gate";
import MuteButton from "@/components/MuteButton";
import Story from "@/components/Story";
import { playMenemukanmu, pauseMenemukanmu } from "@/lib/bgm";
import { withBasePath } from "@/lib/paths";

export default function Experience() {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [started, setStarted] = useState(false);
  const [gateHidden, setGateHidden] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.45;
  }, []);

  useEffect(() => {
    pauseMenemukanmu();
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

  const goTo600 = useCallback(() => {
    const satie = audioRef.current;
    if (satie) {
      satie.pause();
      satie.currentTime = 0;
    }
    void playMenemukanmu();
    router.push("/600");
  }, [router]);

  return (
    <>
      <audio
        ref={audioRef}
        src={withBasePath("/satie-gymnopedie-no-1.mp3")}
        loop
        preload="auto"
      />
      <Gate started={started} hidden={gateHidden} onEnter={start} />
      {started ? <Story onContinueTo600={goTo600} /> : null}
      {started ? <MuteButton muted={muted} onToggle={toggleMute} /> : null}
    </>
  );
}
