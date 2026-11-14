"use client";

type GateProps = {
  started: boolean;
  hidden: boolean;
  onEnter: () => void;
  kicker?: string;
  footnote?: string;
  className?: string;
};

export default function Gate({
  started,
  hidden,
  onEnter,
  kicker = "Kisah",
  footnote = "Erik Satie · Gymnopédie No. 1",
  className,
}: GateProps) {
  const classes = [className, started ? "out" : null].filter(Boolean).join(" ");
  return (
    <section
      id="gate"
      className={classes || undefined}
      hidden={hidden || undefined}
      aria-label="Halaman pembuka"
    >
      <p className="kicker">{kicker}</p>
      <h1 className="names">
        Zulaikha <span className="amp">&amp;</span> Iqbal
      </h1>
      <p className="hint">
        Sebelum kisah dimulakan,
        <br />
        ada satu soalan untuk saudari.
      </p>
      <button type="button" id="enter" disabled={started} onClick={onEnter}>
        Dah Bersediakah Saudari?
      </button>
      <p className="footnote">{footnote}</p>
    </section>
  );
}
