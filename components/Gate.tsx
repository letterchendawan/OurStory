"use client";

type GateProps = {
  started: boolean;
  hidden: boolean;
  onEnter: () => void;
};

export default function Gate({ started, hidden, onEnter }: GateProps) {
  return (
    <section
      id="gate"
      className={started ? "out" : undefined}
      hidden={hidden || undefined}
      aria-label="Halaman pembuka"
    >
      <p className="kicker">Kisah</p>
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
      <p className="footnote">Erik Satie · Gymnopédie No. 1</p>
    </section>
  );
}
