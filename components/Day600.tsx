"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MuteButton from "@/components/MuteButton";
import { ASSETS } from "@/lib/cloudinary";
import {
  isMenemukanmuMuted,
  subscribeMenemukanmuMute,
  toggleMenemukanmuMuted,
} from "@/lib/bgm";

const DAILY_COUNTS: [string, number][] = [
  ["8", 1752],
  ["9", 925],
  ["10", 691],
  ["11", 902],
  ["12", 622],
  ["13", 842],
  ["14", 1494],
  ["15", 763],
  ["16", 1055],
  ["17", 1005],
  ["18", 1004],
  ["19", 536],
  ["20", 2263],
  ["21", 1480],
  ["22", 990],
  ["23", 674],
  ["24", 193],
  ["25", 319],
  ["26", 1383],
  ["27", 534],
];

export default function Day600() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("story-open");
    setMuted(isMenemukanmuMuted());
    const unsub = subscribeMenemukanmuMute(setMuted);
    return () => {
      unsub();
      document.documentElement.classList.remove("story-open");
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const bar = root.querySelector<HTMLElement>("#progress");
    function updateProgress() {
      if (!bar) return;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = `${max > 0 ? (h.scrollTop / max) * 100 : 0}%`;
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(root.querySelectorAll(".reveal"));
    let revealObserver: IntersectionObserver | undefined;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
    } else {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              revealObserver?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
      );
      items.forEach((el) => revealObserver?.observe(el));
    }

    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>("nav.chapters a"));
    const map: Record<string, HTMLAnchorElement> = {};
    links.forEach((a) => {
      const id = a.getAttribute("href")?.slice(1);
      if (id) map[id] = a;
    });
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((a) => a.classList.remove("active"));
            const a = map[entry.target.id];
            if (a) a.classList.add("active");
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    Object.keys(map).forEach((id) => {
      const el = root.querySelector(`#${CSS.escape(id)}`);
      if (el) navObserver.observe(el);
    });

    const host = root.querySelector("#bars-600");
    const max = 2263;
    if (host && host.childElementCount === 0) {
      DAILY_COUNTS.forEach(([label, count]) => {
        const b = document.createElement("div");
        b.className = count > 1500 ? "bar hot" : "bar";
        b.style.height = `${Math.max(1.5, (count / max) * 100)}%`;
        b.setAttribute("data-label", `Ogos ${label} · ${count.toLocaleString()} mesej`);
        b.setAttribute("tabIndex", "0");
        b.setAttribute("role", "img");
        b.setAttribute("aria-label", `Ogos ${label}: ${count} mesej`);
        host.appendChild(b);
      });
    }

    return () => {
      window.removeEventListener("scroll", updateProgress);
      revealObserver?.disconnect();
      navObserver.disconnect();
    };
  }, []);

  return (
    <div className="page-600" ref={rootRef}>
      <div id="progress" aria-hidden="true" />

      <nav className="chapters" aria-label="Navigasi bahagian">
        <a href="#hero600" aria-label="Permulaan" />
        <a href="#m1" aria-label="Arkib yang enggan tutup" />
        <a href="#m2" aria-label="Lima pertemuan" />
        <a href="#m3" aria-label="Surat" />
        <a href="#m4" aria-label="Hari yang ke-600" />
      </nav>

      <header className="hero" id="hero600">
        <p className="kicker">Kisah sambungan</p>
        <h1>Road to 600</h1>
        <p className="subtitle">
          {`Lima pertemuan masih lima.
Dua puluh hari.
Dan pagi ini, batu yang ke-600.`}
        </p>
        <div className="meta">
          <span>
            <strong>600</strong> hari, kiraan mereka
          </span>
          <span>
            <strong>19,427</strong> mesej baharu
          </span>
          <span>
            <strong>8–27 Ogos 2026</strong> WhatsApp
          </span>
        </div>
        <a className="scroll-hint" href="#m1">
          Teruskan ↓
        </a>
      </header>

      <main>
        <section className="chapter" id="m1">
          <div className="wrap">
            <header className="reveal">
              <p className="kicker">I</p>
              <h2>Arkib yang Enggan Tutup</h2>
              <p className="stanza">
                {`Kisah pertama berakhir di tengah ayat.
Lapan jam kemudian,
mereka masih dalam talian.`}
              </p>
              <p className="period" style={{ marginTop: "1.25rem" }}>
                7 Ogos, 7:01 malam hingga 8 Ogos, 1:39 pagi
              </p>
            </header>
            <div className="prose">
              <p className="lede reveal">
                Halaman yang tadi ditutup pada 7 Ogos 2026, jam 7:01 malam: satu{" "}
                <em>Morningg jujuuuu</em>, satu <em>dear</em>, dan sebuah bye yang tidak
                bermaksud tamat. Lapan jam kemudian, 1:39 pagi, 8 Ogos, log
                itu menulis semula: panggilan video, enam jam.
              </p>
              <p className="reveal">
                Tiada siapa yang mengisytiharkan sambungan. Ia cuma berlaku.
                Dua puluh hari. 19,427 mesej. Lima puluh dua panggilan. Ogos
                2026, secara keseluruhan, memuatkan 30,496 mesej, lebih tiga
                kali ganda demam Julai yang sudah kelihatan seperti rekod.
              </p>
              <p className="reveal">
                Halaman ini bukan permulaan baharu. Ia halaman yang sama,
                dibuka semula. Nombor 600 di kaki kisah yang tadi, itu
                bukan tajuk yang direka di sini. Pada 17 Ogos, jam 2:22 pagi,
                lelaki itu sendiri yang menamakan jalan tersebut.
              </p>
              <p className="reveal">
                Malam 27 Ogos, arkib terhenti. Pagi 28 Ogos, kiraan mereka
                sampai ke batu yang ke-600. Halaman ini ditulis dari pagi
                itu, memandang ke belakang, tanpa mendahului mesej yang belum
                dieksport.
              </p>
            </div>
          </div>
        </section>

        <aside className="divider-verse reveal" aria-label="Selingan">
          <p>
            {`Yang disuruh berhenti tidak semestinya diam;
ada yang cuma menukar lagu, lalu berjalan lagi.`}
          </p>
        </aside>

        <section className="chapter" id="m2">
          <div className="wrap">
            <header className="reveal">
              <p className="kicker">II</p>
              <h2>Jam yang Tidak Muat dalam Lima Pertemuan</h2>
              <p className="stanza">
                {`Mereka masih belum menambah yang keenam.
Jam-jam itu dikumpul di tempat lain.`}
              </p>
              <p className="period" style={{ marginTop: "1.25rem" }}>
                8–27 Ogos · 52 panggilan
              </p>
            </header>
            <div className="prose">
              <p className="reveal">
                Rekod pertemuan bersemuka tidak bergerak: masih lima, dalam
                tujuh belas bulan. Yang bergerak ialah jam. Bukan semua
                panggilan perlu disebut. Beberapa sahaja yang terlalu panjang
                untuk disembunyikan:
              </p>
            </div>
            <ol className="call-log reveal">
              <li>
                <span className="when">8 Ogos · 1:39 pagi</span>
                <span className="dur">video, 6 jam</span>
              </li>
              <li>
                <span className="when">8 Ogos · 10:22 malam</span>
                <span className="dur">suara, 5 jam</span>
              </li>
              <li>
                <span className="when">10 Ogos · 9:17 malam</span>
                <span className="dur">video, 13 jam</span>
              </li>
              <li>
                <span className="when">13 Ogos · 1:35 pagi</span>
                <span className="dur">video, 9 jam</span>
              </li>
              <li>
                <span className="when">25 Ogos · 12:21 pagi</span>
                <span className="dur">suara, 9 jam</span>
              </li>
              <li>
                <span className="when">27 Ogos · 12:54 pagi</span>
                <span className="dur">video, 6 jam</span>
              </li>
            </ol>
            <div className="prose">
              <p className="reveal">
                Tiga belas jam pada 10 Ogos. Sembilan jam, dua kali. Enam jam
                pada malam pertama bab ini, dan enam jam lagi pada malam
                terakhir. Semuanya tanpa pertemuan yang keenam.
              </p>
              <p className="reveal">
                Yang tersimpan daripada lima itu bukan cerita penuh. Hanya
                beberapa bingkai: dua wajah, beberapa kali, dan jarak yang
                tidak pernah nampak dalam gambar.
              </p>
            </div>
            <blockquote className="pull reveal">
              pernah jumpa 5 kali je tapi dia punya rindu tu macam jumpa hari
              hari
              <cite>Zulaikha, 19 Ogos 2026, 9:18 malam</cite>
            </blockquote>
            <p className="chat-note reveal">
              Dia menambah, dalam nafas yang sama: <em>and fun fact : kita
              masih malu jumpa each other.</em> Lelaki itu menjawab{" "}
              <em>REAL FACT DAH TU</em>.
            </p>
            <div className="photos-film reveal" role="group" aria-label="Empat bingkai daripada lima pertemuan">
              <figure className="photo">
                <img
                  src={ASSETS.jumpaMac}
                  alt="Zulaikha dan Iqbal ketawa bersama di majlis berbuka, lantai dam, bunga di belakang."
                />
                <figcaption>7 Mac 2025</figcaption>
              </figure>
              <figure className="photo">
                <img
                  src={ASSETS.jumpaMacPlay}
                  alt="Zulaikha dan Iqbal menunjuk jari antara satu sama lain, masih di majlis yang sama."
                />
                <figcaption>Malam yang sama</figcaption>
              </figure>
              <figure className="photo">
                <img
                  src={ASSETS.jumpaFeb}
                  alt="Zulaikha senyum ke kamera; Iqbal memandangnya, Whitehall di belakang."
                />
                <figcaption>25 Feb 2026</figcaption>
              </figure>
              <figure className="photo">
                <img
                  src={ASSETS.jumpaJul}
                  alt="Selfie luar: Zulaikha di depan, Iqbal di belakang, kedua-duanya senyum."
                />
                <figcaption>24 Jul 2026</figcaption>
              </figure>
            </div>
            <p className="film-note reveal">
              Lima pertemuan. Arkib menyimpan sebahagian wajahnya. Pada 7 Mac
              dia menulis <em>Sangat tidak photogenic</em>. Pada 24 Julai dia
              menulis <em>kalo takda gambar pun tadi, tak ke nyesal kamu</em>.
              Yang keenam belum ada.
            </p>
            <div className="chat reveal" role="figure" aria-label="Petikan 17 Ogos 2026">
              <p className="stamp">17 Ogos 2026 · 2:22 pagi</p>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">Today is 589</span>
              </div>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">Tomorrow 590</span>
              </div>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">Road to 600</span>
              </div>
              <div className="msg a">
                <span className="who">Zulaikha</span>
                <span className="bubble">waaa so long orediii</span>
              </div>
            </div>
            <p className="chat-note reveal">
              Kiraan itu milik mereka. Dalam kalendar tersebut, 27 Ogos ialah
              hari ke-599. 28 Ogos, pagi ini, ialah batu yang ke-600. Jalan
              itu sudah bernama, dan sudah sampai.
            </p>
            <figure className="photo wide reveal">
              <img
                src={ASSETS.masjidMalam}
                alt="Masjid putih pada malam hari, kubah dan menara tersinar."
              />
              <figcaption>
                8 Ogos, 8:05 malam. Dia baru siap. Dia menulis:{" "}
                <em>masyaAllah soo cantikk</em>.
              </figcaption>
            </figure>
            <div className="photos-pair reveal">
              <figure className="photo">
                <img
                  src={ASSETS.masjidInterior}
                  alt="Bahagian dalam dewan: chandelier emas, siling berukir."
                />
                <figcaption>Lampu yang sama, dari dalam.</figcaption>
              </figure>
              <figure className="photo">
                <img
                  src={ASSETS.menara}
                  alt="Menara masjid dari sudut rendah, langit hitam."
                />
                <figcaption>Menara, malam itu juga.</figcaption>
              </figure>
            </div>
            <div className="prose">
              <p className="reveal">
                Empat hari kemudian, muka itu kembali, bukan di dewan, bukan
                di lantai dam. Di dua kereta, satu skrin.
              </p>
            </div>
            <figure className="photo reveal">
              <img
                src={ASSETS.videocall}
                alt="Panggilan video: Zulaikha senyum dalam kereta, Iqbal nampak di sudut skrin."
              />
              <figcaption>
                12 Ogos, 4:53 petang. Dua kereta, satu panggilan. Muka yang
                sama, jarak yang sama.
              </figcaption>
            </figure>
          </div>
        </section>

        <aside className="divider-verse reveal" aria-label="Selingan">
          <p>
            {`Ada surat yang dijawab pada waktu subuh;
ada yang ditulis semasa orangnya tidur.`}
          </p>
        </aside>

        <section className="chapter" id="m3">
          <div className="wrap">
            <header className="reveal">
              <p className="kicker">III</p>
              <h2>Surat yang Dibalas</h2>
              <p className="stanza">
                {`Warkah April itu masih tidak disebut.
Yang ini ditulis semasa dia tidur,
dan dijawab pada pagi berikutnya.`}
              </p>
              <p className="period" style={{ marginTop: "1.25rem" }}>
                11–16 Ogos 2026
              </p>
            </header>
            <div className="prose">
              <p className="reveal">
                Pada 11 Ogos, jam 1:19 pagi, selepas panggilan tiga belas jam
                itu, lelaki itu menghantar pautan. Katanya: <em>I did this
                while you sleep hihi hope you love it juju</em>. Sesuatu yang
                disusun dalam senyap, semasa nafas di seberang sudah rata.
                Pagi itu, jam 7:32, gadis itu membalas, bukan warkah April
                yang masih berkunci, tetapi yang ini:
              </p>
            </div>
            <blockquote className="pull reveal">
              tak ada kata yang boleh terjemah how grateful i am to have
              someone like you. … may we stay this way if thats the best for
              us. … kawan tersayang!
              <cite>Zulaikha, 11 Ogos 2026, 7:32 pagi</cite>
            </blockquote>
            <div className="prose">
              <p className="reveal">
                Gelaran itu tidak digugurkan. Ia cuma disuruh memikul lagi.
                <em>Kawan</em> yang sudah lama, dan <em>tersayang</em> yang
                tidak lagi berani bersembunyi di belakangnya.
              </p>
              <p className="reveal">
                Dua malam kemudian, 14 hingga 15 Ogos, datang sebuah hari yang
                dia sendiri sebut sebagai hari pasrah. Rancangan seorang
                kawan tidak berjalan. Dia marah pada dirinya. Lelaki itu tidak
                menawarkan penyelesaian yang besar. Dia tinggal, menulis,
                mendengar, sehingga pagi. Kisah ini tidak akan membuka hari
                itu lebih daripada itu: seseorang yang sudah penat, dan
                seseorang yang tidak pergi.
              </p>
              <p className="reveal">
                Kemudian, jam 1:00 pagi pada 16 Ogos, nada itu bertukar.
                Formal, hampir jenaka, dan tetap sebuah pengakuan. Nama
                penuhnya, nama penuhnya. Ditulis seperti surat rasmi, kerana
                yang tidak rasmi sudah terlalu lama disimpan:
              </p>
            </div>
            <blockquote className="pull reveal">
              SAYA Muhammad Saiful Iqbal Abdul Rani / Dengan ini menyatakan
              secara rasmi bahawa Saya … amat amat merindui seseorang insan
              istimewa … dan insan tersebut bernama Zulaikha Omar
              <cite>Iqbal, 16 Ogos 2026, 1:00 pagi</cite>
            </blockquote>
          </div>
        </section>

        <aside className="divider-verse reveal" aria-label="Selingan">
          <p>
            {`Kalimah besar kadang tiba di antara urusan kecil;
ia tidak menunggu malam yang sesuai.`}
          </p>
        </aside>

        <section className="chapter" id="m4">
          <div className="wrap">
            <header className="reveal">
              <p className="kicker">IV</p>
              <h2>Hari yang ke-600</h2>
              <p className="stanza">
                {`Jalan itu sudah bernama.
Arkib terhenti malam tadi.
Pagi ini, batunya tiba.`}
              </p>
              <p className="period" style={{ marginTop: "1.25rem" }}>
                28 Ogos 2026 · hari ke-600
              </p>
            </header>
            <div className="chart reveal" role="figure" aria-label="Carta mesej harian 8 hingga 27 Ogos 2026">
              <p className="chart-title">Mesej sehari · 8–27 Ogos 2026</p>
              <div className="bars" id="bars-600" />
              <div className="labels daily">
                {DAILY_COUNTS.map(([d]) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <p className="chart-caption">
                Visualisasi tafsiran daripada kiraan harian yang sebenar.
                Palang paling tinggi: 20 Ogos, 2,263 mesej. Yang paling
                rendah: 24 Ogos, 193, sehari yang lebih banyak diisi
                panggilan daripada tulisan.
              </p>
            </div>
            <div className="prose">
              <p className="reveal">
                Dalam dua puluh hari ini perkataan <em>sayang</em> muncul 819
                kali, <em>rindu</em> 221 kali. Gelaran <em>kawan</em> tidak
                hilang. Ia hanya semakin kerap didampingi yang lain.
              </p>
              <p className="reveal">
                Dua puluh Ogos, palang yang paling tinggi, bukan hari
                perisytiharan. Ia hari yang tidak mahu berhenti bercakap.
                Dua ribu dua ratus enam puluh tiga mesej, kemudian malam
                itu juga, seperti malam-malam lain, masih ada panggilan.
              </p>
              <p className="reveal">
                Tiga belas hari sebelum batu ini, tengah malam, lelaki itu
                memotret skrin. Gadis itu di tablet, dagu di tapak tangan.
                Dia menulis, tidak berbisik:
              </p>
            </div>
            <figure className="photo reveal">
              <img
                src={ASSETS.malamTablet}
                alt="Iqbal di sisi bingkai, tablet di meja menayangkan Zulaikha sedang senyum dalam panggilan."
              />
              <figcaption>
                13 Ogos, 12:22 pagi. <em>COMELNYAA MASYAALLAH KAMU NI.</em>{" "}
                Dia menjawab: <em>masyeh u comel too</em>.
              </figcaption>
            </figure>
            <div className="prose">
              <p className="reveal">
                Malam 27 Ogos bermula dengan panggilan video enam jam, berakhir
                dekat subuh. Petang itu ada urusan teknikal, ada{" "}
                <em>okayy yayangg</em> yang berulang, ada terima kasih. Kemudian,
                jam 11:01 malam, di antara semua yang biasa itu:
              </p>
            </div>
            <div className="chat reveal" role="figure" aria-label="Petikan 27 Ogos 2026">
              <p className="stamp">27 Ogos 2026 · 11:01 malam</p>
              <div className="msg a">
                <span className="who">Zulaikha</span>
                <span className="bubble">i love you</span>
              </div>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">I LOVE YOUU SO MUCHH SAYANGG</span>
              </div>
              <div className="msg a">
                <span className="who">Zulaikha</span>
                <span className="bubble">🥰</span>
              </div>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">COMELNYAAA KAMU NI</span>
              </div>
            </div>
            <p className="chat-note reveal">
              Arkib terhenti tiga minit kemudian, pada sebuah pelekat. Bukan
              kerana kisahnya selesai. Kerana export ini diambil malam itu,
              pada hari ke-599.
            </p>
            <div className="prose">
              <p className="reveal">
                Lima pertemuan. Masih lima. 50,303 mesej dari malam pertama
                hingga malam tadi. Mereka menamakan jalan itu Road to 600
                sebelas hari yang lalu, dan pagi ini berdiri pada batu yang
                ke-600. Halaman ini tidak akan mencipta apa yang belum
                ditulis dalam arkib. Ia cuma mencatat yang sudah sampai.
              </p>
              <p className="reveal">
                Yang boleh dikatakan, semata-mata daripada bukti: gadis yang
                pernah menulis <em>cerita sini biarlah habis sini</em> kini
                menulis <em>i love you</em> di antara urusan biasa. Lelaki yang
                pernah berjanji tidak akan mengungkit April masih menepati
                janji itu, dan tetap datang setiap pagi dengan namanya.
              </p>
              <p className="reveal">
                Ada kisah yang disuruh berakhir di situ. Yang ini menukar
                lagunya, menamakan jalannya, dan pagi ini, tanpa mesej baharu
                dalam export, sudah sampai ke batu yang ke-600.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>
          Disusun daripada 19,427 mesej · 8–27 Ogos 2026 · ditulis pada hari
          ke-600 dalam kiraan mereka.
        </p>
        <p>
          Semua petikan dikekalkan dalam tulisan asalnya. Tafsiran ditandakan
          sebagai tafsiran.
        </p>
        <span className="credit">Seventeen · Menemukanmu</span>
        <p>
          <a href="#hero600" id="toTop">
            Kembali ke atas
          </a>
        </p>
        <p>
          <Link href="/">Kembali ke kisah awal</Link>
        </p>
      </footer>

      <MuteButton
        muted={muted}
        onToggle={() => setMuted(toggleMenemukanmuMuted())}
      />
    </div>
  );
}
