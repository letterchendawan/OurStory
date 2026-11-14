import { withBasePath } from "@/lib/paths";

let audio: HTMLAudioElement | null = null;
const muteListeners = new Set<(muted: boolean) => void>();

function notifyMute() {
  const muted = audio?.muted ?? false;
  muteListeners.forEach((fn) => fn(muted));
}

function getAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!audio) {
    audio = new Audio(withBasePath("/seventeen-menemukanmu.mp3"));
    audio.loop = true;
    audio.volume = 0.45;
    audio.addEventListener("volumechange", notifyMute);
  }
  return audio;
}

export function playMenemukanmu(): Promise<void> {
  const el = getAudio();
  if (!el) return Promise.resolve();
  el.muted = false;
  notifyMute();
  return el.play().then(() => undefined).catch(() => undefined);
}

export function pauseMenemukanmu(): void {
  audio?.pause();
}

export function isMenemukanmuPlaying(): boolean {
  return audio !== null && !audio.paused;
}

export function isMenemukanmuMuted(): boolean {
  return getAudio()?.muted ?? false;
}

export function toggleMenemukanmuMuted(): boolean {
  const el = getAudio();
  if (!el) return false;
  el.muted = !el.muted;
  notifyMute();
  return el.muted;
}

export function subscribeMenemukanmuMute(fn: (muted: boolean) => void): () => void {
  muteListeners.add(fn);
  return () => {
    muteListeners.delete(fn);
  };
}
