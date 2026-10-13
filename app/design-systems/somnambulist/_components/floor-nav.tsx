"use client";

import { useEffect, useState } from "react";

type FloorLink = { id: string; n: string; title: string };

/**
 * The floor indicator. As the page scrolls, the floor whose heading has passed
 * a line 35% down the viewport is marked aria-current="location". Focus is
 * never moved; the same markup serves the vertical (desktop) and top (mobile)
 * layouts.
 */
export function FloorNav({ floors }: { floors: FloorLink[] }) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let found: string | null = null;
      for (const f of floors) {
        const el = document.getElementById(f.id);
        if (el && el.getBoundingClientRect().top <= line) found = f.id;
      }
      // At the very bottom the last floor may never reach the line.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        found = floors[floors.length - 1].id;
      }
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
  }, [floors]);

  return (
    <nav
      aria-label="Floors"
      className="sticky top-0 z-30 border-b border-(--sn-ash)/20 bg-(--sn-night)/92 backdrop-blur-sm lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-48 lg:flex-col lg:justify-center lg:border-r lg:border-b-0"
    >
      <ol className="flex justify-between gap-1 px-3 py-1.5 sm:justify-start sm:gap-3 lg:flex-col lg:gap-1 lg:px-5">
        {floors.map((f) => (
          <li key={f.id}>
            <a href={`#${f.id}`} aria-current={current === f.id ? "location" : undefined} className="sn-floor sn-move">
              <span className="ring">{f.n}</span>
              <span className="hidden text-sm lg:inline">{f.title}</span>
              <span className="sr-only lg:hidden">{f.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
