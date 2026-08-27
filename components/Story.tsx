"use client";

import { useEffect, useRef } from "react";
import { storyMarkup } from "@/components/storyMarkup";

const MONTHLY_COUNTS: [string, number][] = [
  ["Mac 25", 4508],
  ["Apr 25", 1186],
  ["Mei 25", 124],
  ["Jun 25", 23],
  ["Jul 25", 110],
  ["Ogo 25", 63],
  ["Sep 25", 40],
  ["Okt 25", 167],
  ["Nov 25", 112],
  ["Dis 25", 133],
  ["Jan 26", 31],
  ["Feb 26", 342],
  ["Mac 26", 36],
  ["Apr 26", 1106],
  ["Mei 26", 2322],
  ["Jun 26", 695],
  ["Jul 26", 8809],
  ["Ogo 26", 10740],
];

type StoryProps = {
  onContinueTo600: () => void;
};

export default function Story({ onContinueTo600 }: StoryProps) {
  const rootRef = useRef<HTMLDivElement>(null);

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

    const host = root.querySelector("#bars");
    const max = 10740;
    if (host && host.childElementCount === 0) {
      MONTHLY_COUNTS.forEach(([label, count]) => {
        const b = document.createElement("div");
        b.className = count > 4000 ? "bar hot" : "bar";
        b.style.height = `${Math.max(1.5, (count / max) * 100)}%`;
        b.setAttribute("data-label", `${label} · ${count.toLocaleString()} mesej`);
        b.setAttribute("tabIndex", "0");
        b.setAttribute("role", "img");
        b.setAttribute("aria-label", `${label}: ${count} mesej`);
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
    <>
      <div
        ref={rootRef}
        // Static editorial markup, authored in-repo — not user input.
        dangerouslySetInnerHTML={{ __html: storyMarkup }}
      />
      <div className="continue-600">
        <button type="button" id="to600" onClick={onContinueTo600}>
          600
        </button>
      </div>
    </>
  );
}
