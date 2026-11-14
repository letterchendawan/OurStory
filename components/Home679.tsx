"use client";

import { useCallback, useState } from "react";
import Gate from "@/components/Gate";
import Day679 from "@/components/Day679";
import { isMenemukanmuPlaying, playMenemukanmu } from "@/lib/bgm";

export default function Home679() {
  // Arriving from /600 with the song already playing: skip the gate.
  // On a first load this is false on both server and client, so hydration matches.
  const [started, setStarted] = useState(() => isMenemukanmuPlaying());
  const [gateHidden, setGateHidden] = useState(started);

  const start = useCallback(() => {
    if (started) return;
    setStarted(true);
    void playMenemukanmu();
    window.setTimeout(() => setGateHidden(true), 950);
  }, [started]);

  return (
    <>
      <Gate
        started={started}
        hidden={gateHidden}
        onEnter={start}
        kicker="Road to 700"
        footnote="Seventeen · Menemukanmu"
        className="gate-679"
      />
      {started ? <Day679 /> : null}
    </>
  );
}
