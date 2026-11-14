"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import MuteButton from "@/components/MuteButton";
import { ASSETS_679 } from "@/lib/cloudinary";
import {
  isMenemukanmuMuted,
  subscribeMenemukanmuMute,
  toggleMenemukanmuMuted,
} from "@/lib/bgm";

const TODAY = 679;
const GOAL = 700;
const DAYS_LEFT = GOAL - TODAY;

const WEEKLY_COUNTS: [string, number][] = [
  ["28 Ogo", 2920],
  ["4 Sep", 4146],
  ["11 Sep", 7171],
  ["18 Sep", 4901],
  ["25 Sep", 5477],
  ["2 Okt", 7820],
  ["9 Okt", 4588],
  ["16 Okt", 4822],
  ["23 Okt", 9671],
  ["30 Okt", 4753],
  ["6 Nov", 4019],
  ["13 Nov", 797],
];

/** Fixed petal layout so server and client render the same markup. */
const PETALS = [
  [6, 14, 13, 0],
  [15, 10, 17, 4],
  [24, 16, 15, 9],
  [33, 9, 19, 2],
  [44, 13, 14, 7],
  [53, 11, 18, 12],
  [62, 15, 16, 5],
  [71, 10, 20, 10],
  [80, 14, 15, 1],
  [89, 12, 17, 8],
  [96, 9, 19, 13],
] as const;

export default function Day679() {
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

    const host = root.querySelector("#bars-679");
    const max = 9671;
    if (host && host.childElementCount === 0) {
      WEEKLY_COUNTS.forEach(([label, count]) => {
        const b = document.createElement("div");
        b.className = count > 7000 ? "bar hot" : "bar";
        b.style.height = `${Math.max(1.5, (count / max) * 100)}%`;
        b.setAttribute("data-label", `Minggu ${label} · ${count.toLocaleString()} mesej`);
        b.setAttribute("tabIndex", "0");
        b.setAttribute("role", "img");
        b.setAttribute("aria-label", `Minggu ${label}: ${count} mesej`);
        host.appendChild(b);
      });
    }

    return () => {
      window.removeEventListener("scroll", updateProgress);
      revealObserver?.disconnect();
      navObserver.disconnect();
    };
  }, []);

  const progress = `${((TODAY - 600) / (GOAL - 600)) * 100}%`;

  return (
    <div className="page-600 page-679" ref={rootRef}>
      <div id="progress" aria-hidden="true" />

      <nav className="chapters" aria-label="Navigasi bahagian">
        <a href="#hero679" aria-label="Permulaan" />
        <a href="#n1" aria-label="Pagi hari ke-600" />
        <a href="#n2" aria-label="Doa dari jauh" />
        <a href="#n3" aria-label="Saya memilih kamu" />
        <a href="#n4" aria-label="Bunga di dalam kereta" />
        <a href="#n5" aria-label="Kawan, katanya" />
        <a href="#n6" aria-label="Abang dan sayang" />
        <a href="#ending" aria-label="Lagi 21 hari" />
      </nav>

      {/* ================= HERO ================= */}
      <header className="hero" id="hero679">
        <div className="petals" aria-hidden="true">
          {PETALS.map(([x, s, d, delay], i) => (
            <span
              key={i}
              style={
                {
                  "--x": `${x}%`,
                  "--s": `${s}px`,
                  "--d": `${d}s`,
                  "--delay": `${delay}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <p className="for">untuk Zulaikha,</p>
        <h1>Road to 700</h1>
        <p className="subtitle">
          {`Lima pertemuan sudah jadi dua belas.
Kawan sudah jadi bubub.
Dan setiap hari, masih dikira satu demi satu.`}
        </p>
        <div className="road" role="img" aria-label={`Hari ke-${TODAY} daripada ${GOAL}`}>
          <span className="road-today" style={{ left: progress }}>
            hari ini · {TODAY}
          </span>
          <div className="road-track">
            <div className="road-fill" style={{ width: progress }} />
            <span className="road-heart" style={{ left: progress }} aria-hidden="true">
              ♥
            </span>
          </div>
          <div className="road-ends">
            <span>
              <strong>600</strong>28 Ogos
            </span>
            <span>
              <strong>{GOAL}</strong>6 Dis
            </span>
          </div>
        </div>
        <p className="road-note">lagi {DAYS_LEFT} hari ♡</p>
        <a className="scroll-hint" href="#n1">
          Teruskan ↓
        </a>
      </header>

      <main>
        {/* ================= I ================= */}
        <section className="chapter" id="n1">
          <div className="wrap">
            <header className="reveal">
              <p className="bab">bab satu</p>
              <h2>Pagi Hari ke-600</h2>
              <p className="stanza">
                {`Batu ke-600 tiba pada waktu pagi.
Yang pertama membacanya
ialah orang yang ditulis tentangnya.`}
              </p>
              <p className="period" style={{ marginTop: "1.25rem" }}>
                28 Ogos 2026
              </p>
            </header>
            <div className="prose">
              <p className="lede reveal">
                Malam sebelumnya, jam 11:41, dia meninggalkan sepucuk surat
                bertajuk <em>Assalamualaikum buat yang tersayang</em>. Dua
                puluh minit kemudian, semuanya huruf besar:{" "}
                <em>KENAPAAA AWAK NIII KERAAAAAP SANGAT TULIS PANJANG PANJANGG
                UNTUK SAYAAAAAA</em>.
              </p>
              <p className="reveal">
                Pagi itu, dia menghantar arahan yang jauh lebih pendek.
              </p>
            </div>
            <div className="chat reveal" role="figure" aria-label="Petikan 28 Ogos 2026">
              <p className="stamp">28 Ogos · 9:12 pagi</p>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">Scroll sampai bawah</span>
              </div>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">Cari button 600</span>
              </div>
              <div className="msg a">
                <span className="who">Zulaikha</span>
                <span className="bubble">OKAYYYYYYYYYY</span>
              </div>
              <div className="msg a">
                <span className="who">Zulaikha · 9:26</span>
                <span className="bubble">APA YANG COMEL SANGAAAAAAAAAATTTTTT</span>
              </div>
              <div className="msg a">
                <span className="who">Zulaikha</span>
                <span className="bubble">and memalukannnnnnn😭😭</span>
              </div>
            </div>
            <blockquote className="pull reveal">
              seriously you can simply wish “happy 600”, but you chose to do
              all that🥹 aw my dear..
              <cite>Zulaikha, 28 Ogos, 9:29 pagi</cite>
            </blockquote>
            <div className="chat reveal" role="figure" aria-label="Sambungan petikan 28 Ogos 2026">
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">I LOVE YOUU YAYANGGGGG</span>
              </div>
              <div className="msg a">
                <span className="who">Zulaikha</span>
                <span className="bubble">I LOVE YOU MOREEEE CINTAA</span>
              </div>
              <div className="msg a">
                <span className="who">Zulaikha</span>
                <span className="bubble">sayang awak saiful iqbal 💕</span>
              </div>
            </div>
            <div className="prose">
              <p className="reveal">
                Sebelas hari kemudian, apabila dia tahu lelaki itu akan pergi
                jauh, dia mencipta unit kiraannya sendiri:{" "}
                <em>2 bulan = 60 hari</em>, kemudian{" "}
                <em>60 hari zulaikha = 600 hari 😢</em>. Rindu, dalam kalendar
                mereka, diukur dengan nombor yang sama.
              </p>
            </div>
          </div>
        </section>

        <aside className="divider-verse reveal" aria-label="Selingan">
          <p>
            {`ada kisah yang dibaca orang lain;
yang ini dibaca oleh tokohnya sendiri,
lalu ditulis lagi.`}
          </p>
        </aside>

        {/* ================= II ================= */}
        <section className="chapter" id="n2">
          <div className="wrap">
            <header className="reveal">
              <p className="bab">bab dua</p>
              <h2>Doa dari Jauh</h2>
              <p className="stanza">
                {`Dia pergi bersama ibunya.
Dia tinggal, menulis doa
yang lebih panjang daripada perjalanan itu.`}
              </p>
              <p className="period" style={{ marginTop: "1.25rem" }}>
                6 – 30 Sep 2026 · Jeddah, Taif, Makkah, Madinah
              </p>
            </header>
            <div className="prose">
              <p className="lede reveal">
                Sebelum dia berangkat, ada surat yang berbalas. Malam 6
                September, lelaki itu menulis bahawa kata-kata yang dahulu
                hanya mampu dikarang kini boleh diucapkan dengan suara. Tiga
                puluh tujuh minit kemudian, gadis itu menjawab dalam bahasa
                yang sama:
              </p>
            </div>
            <div className="letter reveal">
              <p className="to">terima kasih cinta kuu 🫶🏻</p>
              <p>
                daripada sekadar kenalan se kelab, kini, dua jiwa menyatu
                menyemai rasa cinta yang sama. suatu pertemuan yang tak pernah
                ku sesal. sebuah takdir yang enggan berakhir.
              </p>
              <p>
                usah bimbang, meski ribuan batu berjauhan, tetap namamu
                tersemat di kalbu.
              </p>
              <p className="sign">
                saya sangat sayang kamu, Saiful Iqbal
                <small>Zulaikha · 6 Sep, 11:01 malam</small>
              </p>
            </div>
            <div className="prose">
              <p className="reveal">
                Tiga hari kemudian, satu lagi, dan kali ini dia mengaku
                sesuatu yang lama disimpan: <em>terima kasih jugaa iqbal
                sayangg sebab tak pernah putus asa untuk dapatkan hati saya</em>.
              </p>
              <p className="reveal">
                Lelaki itu pula sudah merancang lebih jauh:{" "}
                <em>Our first trip adalah untuk umrah sama-sama</em>. Dan pada
                malam 14 September, satu permintaan kecil, dan satu jawapan
                yang tidak kecil langsung.
              </p>
            </div>
            <div className="chat reveal" role="figure" aria-label="Petikan 14 September 2026">
              <p className="stamp">14 Sep · 10:26 malam</p>
              <div className="msg a">
                <span className="who">Zulaikha</span>
                <span className="bubble">
                  doa juga family awak yerima saya &amp; family saya terima awak
                </span>
              </div>
              <div className="msg a">
                <span className="who">Zulaikha</span>
                <span className="bubble">hihihi</span>
              </div>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">Memang niat saya dengan awak ni sampai halal</span>
              </div>
            </div>
            <div className="prose">
              <p className="reveal">
                Malam sebelum dia terbang, jam 2:28 pagi, gadis itu tidak
                mengucapkan selamat jalan. Dia menulis doa.
              </p>
            </div>
            <div className="letter reveal">
              <p className="to">selamat malam cinta hati saya .</p>
              <p>
                dalam setiap langkah kakimu, ada doa yang dipanjatkan dari
                jauh, buat dirimu. moga sejahtera segalanya, serta mudah
                jalannya. moga juga ibadahmu diterima Yang Maha Esa.
              </p>
              <p>
                saya sentiasa sedia menanti segala yang dikhabari, meski tak
                sekerap di tanah air sendiri.
              </p>
              <p className="sign">
                saya sayangkan kamu dengan segenap jiwa, Saiful Iqbal 🤍
                <small>Zulaikha · 15 Sep, 2:28 pagi</small>
              </p>
            </div>
            <div className="prose">
              <p className="reveal">
                Dari Tanah Suci, laporan datang sedikit demi sedikit. Umrah
                pertama selesai pada pagi 17 September, bersama kepala yang
                baru dicukur. Dia membalas: <em>hello new iqbal 😁</em>. Pada 22
                September, dia berjaya membawa ibunya memegang Multazam.
              </p>
              <p className="reveal">
                Dan pada 29 September, ada orang yang bertanya kepada ibunya
                tentang anak lelakinya. Ibunya menjawab bagi pihaknya:
              </p>
            </div>
            <blockquote className="pull reveal">
              Mak cakap “ Tak boleh dia dah ada Girlfriend “
              <cite>Iqbal, 29 Sep, 1:57 petang</cite>
            </blockquote>
            <p className="chat-note reveal">
              Dia sendiri tak sangka: <em>Tak sangka jugak mak cakap gitu</em>.
              Esoknya: <em>Semalam saya kat madinah hari ni dah dekat jasin</em>.
            </p>
          </div>
        </section>

        <aside className="divider-verse reveal" aria-label="Selingan">
          <p>
            {`ada doa yang dilafaz di hadapan Kaabah;
ada yang dititip lewat WhatsApp
jam dua pagi.`}
          </p>
        </aside>

        {/* ================= III ================= */}
        <section className="chapter" id="n3">
          <div className="wrap">
            <header className="reveal">
              <p className="bab">bab tiga</p>
              <h2>Saya Memilih Kamu</h2>
              <p className="stanza">
                {`Akuan pertama ditulis sambil bergurau.
Yang kedua ditulis
dengan nama penuh kedua-duanya.`}
              </p>
              <p className="period" style={{ marginTop: "1.25rem" }}>
                1 – 4 Okt 2026
              </p>
            </header>
            <div className="prose">
              <p className="lede reveal">
                Sehari selepas pulang, jam 1:13 pagi, 1 Oktober, dia menulis
                sesuatu yang tidak lagi kedengaran seperti gurauan.
              </p>
            </div>
            <div className="letter his reveal">
              <p className="to">Zulaikha Binti Mohammed Omar,</p>
              <p>
                Saya, Muhammad Saiful Iqbal, dengan ini menyatakan
                bahawasanya saya, dengan sepenuh hati dan sepenuh jiwa, sangat
                menyayangi seorang insan bernama Zulaikha Binti Mohammed Omar.
                ❤️
              </p>
              <p>
                Saya tak mahu kasih sayang ini menjadi beban buat kamu, saya
                cuma mahu kamu tahu bahawa saya memilih untuk terus menyayangi
                kamu, dengan cara yang sebaik mungkin.
              </p>
              <p>
                … kalau suatu hari nanti kamu terlupa, biarlah pernyataan ini
                menjadi pengingat bahawa pernah ada seorang Iqbal yang dengan
                sepenuh hati memilih untuk menyayangi kamu.
              </p>
              <p className="sign">
                Iqbal
                <small>1 Okt, 1:13 pagi</small>
              </p>
            </div>
            <div className="prose">
              <p className="reveal">
                Dua hari kemudian, 3 Oktober, dia memandu ke Segamat. Gadis itu
                mengaku kemudian: <em>I’ve been watching your location since
                jasin 😌</em>. Ada coklat, ada green tea, dan dua wajah dalam
                sebuah kereta.
              </p>
            </div>
            <figure className="polaroid wide reveal">
              <img
                src={ASSETS_679.keretaOkt}
                alt="Zulaikha dan Iqbal di tempat duduk kereta, kedua-duanya senyum ke kamera."
              />
              <figcaption>
                “Saya masih tersengih sengih melihat gambar gambar kita”
                <small>3 Okt · Segamat</small>
              </figcaption>
            </figure>
            <div className="chat reveal" role="figure" aria-label="Petikan 3 Oktober 2026">
              <p className="stamp">3 Okt · 6:03 petang</p>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">
                  {`Your eyes
Your face
Your pipi
Your voice
Your personality

Everything sayang everything

Sempurna sangat`}
                </span>
              </div>
            </div>
            <div className="prose">
              <p className="reveal">
                Tidak semua malam semudah itu. Malam 4 Oktober, ada soalan
                tentang masa depan yang belum ada jawapannya, dan restu yang
                masih perlu ditunggu. Mereka tidak memaksa apa-apa. Mereka
                cuma memilih untuk terus berjalan, perlahan-lahan, bersama.
                Gadis itu yang menulis jalannya:
              </p>
            </div>
            <blockquote className="pull reveal">
              boleh tak kalau saya nak kita stay macam biasa, jalan mengikut
              segala rancangan kita
              <cite>Zulaikha, 4 Okt, 11:30 malam</cite>
            </blockquote>
            <div className="chat reveal" role="figure" aria-label="Petikan 4 Oktober 2026">
              <p className="stamp">4 Okt · 11:35 malam</p>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">Saya sangat sangat sayangkan awak Zulaikha</span>
              </div>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">
                  Tak kisahlah apa dunia nak cakap sekali pun rasa sayang saya
                  dekat awak ni takkan goyah sebab saya betul sayangkan awak
                </span>
              </div>
            </div>
          </div>
        </section>

        <aside className="divider-verse reveal" aria-label="Selingan">
          <p>
            {`ada janji yang dibuat kerana yakin;
yang ini dibuat
kerana sanggup menunggu.`}
          </p>
        </aside>

        {/* ================= IV ================= */}
        <section className="chapter" id="n4">
          <div className="wrap">
            <header className="reveal">
              <p className="bab">bab empat</p>
              <h2>Bunga di Dalam Kereta</h2>
              <p className="stanza">
                {`Dia tidak menunggu di pintu masuk.
Dia menunggu di dalam kereta,
dengan sesuatu di tempat duduk.`}
              </p>
              <p className="period" style={{ marginTop: "1.25rem" }}>
                18 – 20 Okt 2026
              </p>
            </header>
            <div className="prose">
              <p className="lede reveal">
                18 Oktober. Dia keluar pagi untuk mengambil bunga daripada
                vendor, memandu dari Jasin, dan menunggu dua puluh lima minit
                di stesen KTM. Gadis itu membuka pintu kereta. Malam itu, dia
                menceritakan semuanya semula, dari sudut dia.
              </p>
            </div>
            <div className="letter reveal">
              <p className="to">Bubub sayanggggg❤️,</p>
              <p>
                saya sangat sangat terkejut buka pintu kereta ada flowerrrr srs
                nak jerittt tadi, tapi kita act slightly nonchalant by saying
                “wehhhh” . Hahahahh deep down there’s a lil girl inside me that
                screams out loud bcs of excitement! 🌷
              </p>
              <p>
                bila nampak flower in car tu baru saya dapat connect the dots of
                why you tak go pick me up dekat entrance hahahah😆 thats cute
                tho .
              </p>
              <p>
                One day saya akan proudly walk besides youu for sure ya
                shayangg!!💗💗
              </p>
              <p className="sign">
                i love you cinta sayanggg
                <small>Zulaikha · 18 Okt, 11:11 malam</small>
              </p>
            </div>
            <figure className="polaroid tilt-r reveal" style={{ maxWidth: "380px" }}>
              <img
                src={ASSETS_679.bungaPertama}
                alt="Pasu kaca dengan sekuntum ros merah jambu, gerbera dan bunga kecil putih, reben merah jambu, di atas meja."
              />
              <figcaption>
                SUKASUKASUKA
                <small>18 Okt · bunga yang pertama</small>
              </figcaption>
            </figure>
            <div className="prose">
              <p className="reveal">
                Sehari kemudian, jam 12:45 pagi, 20 Oktober, datang surat yang
                paling panjang dalam seluruh arkib: lapan ribu aksara. Satu
                ayat daripadanya sudah cukup.
              </p>
            </div>
            <blockquote className="pull reveal">
              Terima kasih kerana membuatkan saya berasa bahawa kehadiran saya
              juga dinantikan oleh seseorang.
              <cite>Iqbal, 20 Okt, 12:45 pagi</cite>
            </blockquote>
            <div className="prose">
              <p className="reveal">Malamnya, jawapan itu tiba.</p>
            </div>
            <div className="letter reveal">
              <p className="to">IQBAL SAYANGGGGG 😭🥹❤️</p>
              <p>
                Dalam setiap perjalanan saya dan kamu, harapannya masih tak
                layu, agar kita tetap bersatu meski rintangan datang
                bertalu-talu.
              </p>
              <p>
                Terima kasih kerana hadir dalam hidup saya. Kamu membuka mata ,
                bahawa sesungguhnya, saya layak dicintai sedalam-dalamnya.
              </p>
              <p className="sign">
                Semoga kamu, saya, jadi kita❤️
                <small>Zulaikha · 20 Okt, 9:44 malam</small>
              </p>
            </div>
          </div>
        </section>

        <aside className="divider-verse reveal" aria-label="Selingan">
          <p>
            {`bunga itu layu.
suratnya tidak.
yang seterusnya, tiga puluh helai.`}
          </p>
        </aside>

        {/* ================= V ================= */}
        <section className="chapter" id="n5">
          <div className="wrap">
            <header className="reveal">
              <p className="bab">bab lima</p>
              <h2>Kawan, Katanya</h2>
              <p className="stanza">
                {`Gelaran lama tidak dibuang.
Ia cuma jadi gurauan
yang mereka berdua faham.`}
              </p>
              <p className="period" style={{ marginTop: "1.25rem" }}>
                22 Okt – 2 Nov 2026
              </p>
            </header>
            <div className="prose">
              <p className="lede reveal">
                22 Oktober, jam 11:37 malam, dia mengira semula:{" "}
                <em>Sebab seumur hidup kita, kita baru jumpa 9 kali yang, tu
                yang suka benau nak tenung</em>. Yang kesepuluh tiba tiga hari
                kemudian, dalam sebuah cermin pandang belakang.
              </p>
            </div>
            <figure className="polaroid reveal" style={{ maxWidth: "400px" }}>
              <img
                src={ASSETS_679.cermin}
                alt="Pantulan dalam cermin pandang belakang kereta: Zulaikha senyum, Iqbal di sebelahnya memegang telefon."
              />
              <figcaption>
                jumpa lagi sebulannnn😘
                <small>25 Okt · pertemuan ke-10</small>
              </figcaption>
            </figure>
            <div className="prose">
              <p className="reveal">
                Sehari sebelumnya, 24 Oktober, akuan yang ketiga. Kali ini
                dengan nombor hari mereka sendiri:
              </p>
            </div>
            <blockquote className="pull reveal">
              hati dan perasaan saya sejak 657 hari yang lalu sehinggalah
              inshaAllah sampai ke syurga hanya akan tertumpu kepada insan
              yang indah rupawan baik budinya bernama Zulaikha binti Mohammed
              Omar
              <cite>Iqbal, 24 Okt, 11:02 malam</cite>
            </blockquote>
            <div className="chat reveal" role="figure" aria-label="Petikan 24 Oktober 2026">
              <p className="stamp">24 Okt · dua minit kemudian</p>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">SAYA</span>
              </div>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">SAYANGGGG</span>
              </div>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">AWAKKKK</span>
              </div>
              <div className="msg a">
                <span className="who">Zulaikha</span>
                <span className="bubble">awak cakap kita kawan</span>
              </div>
              <div className="msg a">
                <span className="who">Zulaikha</span>
                <span className="bubble">kita ni kawan jeke</span>
              </div>
            </div>
            <p className="chat-note reveal">
              Lima hari kemudian dia sendiri yang menjawab:{" "}
              <em>KEKASIH DIAA (kawan katanya)</em>.
            </p>
            <div className="prose">
              <p className="reveal">
                Bahasa mereka berubah, dan perubahan itu boleh dikira.
              </p>
            </div>
            <ul className="names-shift reveal" aria-label="Perubahan panggilan">
              <li className="fading">
                <span className="word">kawan</span>
                <span className="n">204 → 21</span>
                <span className="when">Ogos → Nov</span>
              </li>
              <li>
                <span className="word">bubub</span>
                <span className="n">171</span>
                <span className="when">lahir Oktober</span>
              </li>
              <li>
                <span className="word">cinta</span>
                <span className="n">514</span>
                <span className="when">Iqbal, Oktober</span>
              </li>
              <li>
                <span className="word">abang</span>
                <span className="n">56</span>
                <span className="when">Iqbal, November</span>
              </li>
            </ul>
            <div className="prose">
              <p className="reveal">
                1 November, pertemuan yang kesebelas. Gadis itu pernah meminta
                supaya bunga 18 Oktober itu yang pertama dan yang terakhir.
                Permintaan itu tidak diendahkan. Kali ini sejambak, bersama
                tiga puluh pucuk surat kecil, semuanya ditulis tangan.
              </p>
            </div>
            <div className="polaroids reveal">
              <figure className="polaroid">
                <img
                  src={ASSETS_679.jambangan}
                  alt="Tiga swafoto Zulaikha dalam kereta memegang jambangan bunga merah jambu, senyum dan mengenyit mata."
                />
                <figcaption>
                  been my dream
                  <small>1 Nov · 5:07 petang</small>
                </figcaption>
              </figure>
              <figure className="polaroid">
                <img
                  src={ASSETS_679.makanNov}
                  alt="Iqbal dan Zulaikha duduk semeja di kafe, spageti dan tart telur di hadapan mereka."
                />
                <figcaption>
                  our 11th meet
                  <small>hari yang sama, semeja</small>
                </figcaption>
              </figure>
            </div>
            <div className="letter reveal">
              <p className="to">bububbb 🥹</p>
              <p>
                thankyouu sooo muchh for everything awak buat todayyy 🥹 our
                11th meet. you dah datang all the way from jasin to segamat four
                times oredi b☹️ … and idk how many hours or mins you spent untuk
                buat surat tecik comey tuuu 30 pieces! 🥹
              </p>
              <p>
                been my dream to receive a bouquet like that from someone i love
                . and you did , without even knowing my interest in that exact
                type of bouquet
              </p>
              <p className="sign">
                sayang awak sangat sangat Saiful Iqbal 🫂💗
                <small>Zulaikha · 2 Nov, 12:19 pagi</small>
              </p>
            </div>
            <div className="chart reveal" role="figure" aria-label="Carta mesej mingguan 28 Ogos hingga 15 November 2026">
              <p className="chart-title">Mesej seminggu · 28 Ogos – 15 Nov</p>
              <div className="bars" id="bars-679" />
              <div className="labels">
                {WEEKLY_COUNTS.map(([w]) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
              <p className="chart-caption">
                Lapan puluh hari, tiada satu pun yang senyap. 61,085 mesej.
                Palang tertinggi: minggu 23 Oktober, 9,671. Oktober sahaja
                menyimpan 29,560 mesej, hampir sama dengan seluruh kisah
                pertama yang mengambil masa tujuh belas bulan.
              </p>
            </div>
          </div>
        </section>

        <aside className="divider-verse reveal" aria-label="Selingan">
          <p>
            {`nama boleh bertukar dalam sebulan;
yang menunggu di hujung talian
tetap orang yang sama.`}
          </p>
        </aside>

        {/* ================= VI ================= */}
        <section className="chapter" id="n6">
          <div className="wrap">
            <header className="reveal">
              <p className="bab">bab enam</p>
              <h2>Abang &amp; Sayang</h2>
              <p className="stanza">
                {`Dia memanggilnya abang.
Dia membalas dengan surat maaf
yang tidak diminta.`}
              </p>
              <p className="period" style={{ marginTop: "1.25rem" }}>
                9 – 15 Nov 2026 · hari ke-671 hingga ke-679
              </p>
            </header>
            <div className="prose">
              <p className="lede reveal">
                9 November, pertemuan yang kedua belas, di Segamat lagi. Ada
                sate, dan pada jam 12:48 tengah hari, satu ucapan dengan
                panggilan yang baharu.
              </p>
            </div>
            <blockquote className="pull reveal">
              terima kasih abang, sudi datang segamat, spend time dengan sayang
              <cite>Zulaikha, 9 Nov, 12:48 tengah hari</cite>
            </blockquote>
            <div className="prose">
              <p className="reveal">
                Dua hari kemudian, tanpa sesiapa meminta, dia membalas dengan
                bahasa yang sama.
              </p>
            </div>
            <div className="letter his reveal">
              <p className="to">Kepada si pemilik renjana, 🥹</p>
              <p>
                kepada sayang abang yang satu-satunya, yang paling abang
                kasihi, anggun bak bidadari dan jelita bak mentari, abang ingin
                memohon ampun dan maaf atas segala salah silap abang.
              </p>
              <p>
                Ketahuilah bahawa abang sayang sangat-sangat-sangat dekat
                cintaa, permata hati abang sorang ni. ❤️
              </p>
              <p className="sign">
                bubub
                <small>11 Nov, 2:58 petang</small>
              </p>
            </div>
            <div className="chat reveal" role="figure" aria-label="Petikan 11 November 2026">
              <p className="stamp">11 Nov · malam</p>
              <div className="msg a">
                <span className="who">Zulaikha</span>
                <span className="bubble">thankyou sebab buat segamat lebih bermakna</span>
              </div>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">
                  Sebab tu sampai sekarang yayang masih bersabar dengan abang
                  yang degil ni
                </span>
              </div>
            </div>
            <div className="prose">
              <p className="reveal">
                12 November, satu panggilan selama enam belas jam lima puluh
                enam minit, yang paling panjang dalam tempoh ini. Esoknya,
                tengah malam, dia mengaku:
              </p>
            </div>
            <blockquote className="pull reveal">
              hehe sorry tertidur ekceli sambil dengar awak cakap, sedar sedar
              awak dah dengkur sekali 🤭
              <cite>Zulaikha, 13 Nov, 12:13 pagi</cite>
            </blockquote>
            <div className="prose">
              <p className="reveal">
                Dan malam tadi, sebelum tidur, seperti setiap malam:
              </p>
            </div>
            <div className="chat reveal" role="figure" aria-label="Petikan 15 November 2026">
              <p className="stamp">15 Nov · 12:59 pagi</p>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">Yayang ada cerita lagi tak?</span>
              </div>
              <div className="msg a">
                <span className="who">Zulaikha</span>
                <span className="bubble">tiada</span>
              </div>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">I Love You Sayang abang</span>
              </div>
              <div className="msg a">
                <span className="who">Zulaikha</span>
                <span className="bubble">i love you moree abangg</span>
              </div>
              <div className="msg b">
                <span className="who">Iqbal</span>
                <span className="bubble">I LOVE YOUUU SOO MUCH MOREEE</span>
              </div>
              <div className="msg b">
                <span className="who">Iqbal · 1:00</span>
                <span className="bubble">Assalamualaikum Cinta ❤️</span>
              </div>
              <div className="msg a">
                <span className="who">Zulaikha</span>
                <span className="bubble">waalaikumsalamm</span>
              </div>
            </div>
            <p className="chat-note reveal">
              Kisah pertama bermula dengan <em>Salam</em> pada jam 12:00 pagi.
              Arkib ini berhenti dengan <em>waalaikumsalamm</em> pada jam 1:00
              pagi. Di antaranya, 111,508 mesej.
            </p>
            <div className="prose">
              <p className="reveal">
                Lima pertemuan sudah jadi dua belas. Yang dahulu takut akan{" "}
                <em>another heartbreak</em> kini menulis <em>semoga kamu, saya,
                jadi kita</em>. Yang dahulu bertanya <em>kita ni kawan jeke</em>{" "}
                kini memanggilnya abang. Dan restu yang masih ditunggu itu
                ditunggu dengan doa, bukan dengan tergesa-gesa.
              </p>
            </div>
          </div>
        </section>

        {/* ================= ENDING ================= */}
        <section className="ending" id="ending">
          <p className="big reveal">{DAYS_LEFT}</p>
          <p className="label reveal">hari lagi ke 700 · 6 Disember 2026</p>
          <p className="vow reveal">Semoga kamu, saya, jadi kita.</p>
          <p className="vow-cite reveal">Zulaikha, 20 Okt 2026</p>
        </section>
      </main>

      <footer>
        <p>
          Disusun daripada 61,085 mesej · 28 Ogos – 15 Nov 2026 · ditulis pada
          hari ke-679 dalam kiraan mereka.
        </p>
        <p>Semua petikan dikekalkan dalam tulisan asalnya.</p>
        <span className="credit">Seventeen · Menemukanmu</span>
        <p>
          <a href="#hero679" id="toTop">
            Kembali ke atas
          </a>
        </p>
        <div className="earlier">
          <p className="earlier-title">Kisah yang sebelumnya</p>
          <Link href="/600" className="to-next">
            Road to 600
          </Link>
          <Link href="/kisah" className="to-next">
            Kisah awal
          </Link>
        </div>
      </footer>
      <MuteButton
        muted={muted}
        onToggle={() => setMuted(toggleMenemukanmuMuted())}
      />
    </div>
  );
}
