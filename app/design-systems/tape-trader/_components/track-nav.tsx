"use client";

import { useEffect, useState } from "react";

type Track = { id: string; n: string; title: string };

/**
 * The VCR control bar. As the page scrolls, the track whose section has passed
 * a line 30% down the viewport is marked aria-current="location" (shown as ▶
 * and inverted). Focus is never moved. Below 1280 px only the track numbers
 * show (names stay available to screen readers), so the bar is always one row.
 */
export function TrackNav({ tracks }: { tracks: Track[] }) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let found: string | null = null;
      for (const t of tracks) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top <= line) found = t.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) found = tracks[tracks.length - 1].id;
      setCurrent(found);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [tracks]);

  const playing = tracks.find((t) => t.id === current);

  return (
    <nav aria-label="Tracks" className="on-dark sticky top-0 z-30 border-b-2 border-black bg-[#151514]">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2">
        <span aria-hidden="true" className="f-vt hidden shrink-0 text-xl text-(--tt-cyan) md:inline">
          ◀◀ ▶ ▶▶
        </span>
        <ol className="flex min-w-0 flex-1 flex-wrap gap-1.5">
          {tracks.map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`} aria-current={current === t.id ? "location" : undefined} className="tt-track">
                {t.n}
                <span className="hidden xl:inline">{t.title.toUpperCase()}</span>
                <span className="sr-only xl:hidden">{t.title}</span>
              </a>
            </li>
          ))}
        </ol>
        <span aria-hidden="true" className="f-vt hidden shrink-0 text-xl text-(--tt-cyan) lg:inline">
          {playing ? `PLAY ▶ ${playing.n}` : "STOP ■"}
        </span>
      </div>
    </nav>
  );
}
