"use client";

type MuteButtonProps = {
  muted: boolean;
  onToggle: () => void;
};

export default function MuteButton({ muted, onToggle }: MuteButtonProps) {
  return (
    <button
      type="button"
      id="mute"
      aria-label={muted ? "Hidupkan muzik" : "Senyapkan muzik"}
      aria-pressed={muted}
      title="Muzik"
      onClick={onToggle}
    >
      {muted ? "♭" : "♪"}
    </button>
  );
}
