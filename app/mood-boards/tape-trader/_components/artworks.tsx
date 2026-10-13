import type { ReactNode } from "react";
import type { Artifact } from "@/data/mood-boards/types";
import type { Fix, Surface } from "./clipping";

/* A1. Toner -------------------------------------------------------------- */

function Hl({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span className={`-mx-1 rounded-[2px_6px_3px_5px] px-1 [box-decoration-break:clone] ${color}`}>{children}</span>
  );
}

function HighlighterTypescript() {
  return (
    <div className="space-y-2 text-[0.95rem] leading-7">
      <p>
        <Hl color="bg-(--tt-yellow)">VIDEODROME</Hl> — 2nd gen, SP. Sharp.
      </p>
      <p>
        TETSUO — <Hl color="bg-(--tt-pink)">subtitled!!</Hl> 3rd gen, EP.
      </p>
      <p>
        ERASERHEAD — <Hl color="bg-(--tt-cyan)">from the 16mm print</Hl>, 1st gen.
      </p>
      <p>
        THE BROOD — 2nd gen. <Hl color="bg-(--tt-yellow)">Ask about the uncut one.</Hl>
      </p>
    </div>
  );
}

function Misregistered() {
  return (
    <div className="relative overflow-hidden py-2">
      <p
        aria-hidden="true"
        className="tt-anton absolute inset-0 translate-x-[5px] translate-y-[3px] py-2 text-[clamp(3.5rem,11vw,6.5rem)] leading-none text-(--tt-pink)"
      >
        BOOTLEG
      </p>
      <p className="tt-anton relative text-[clamp(3.5rem,11vw,6.5rem)] leading-none text-(--tt-blue) mix-blend-multiply">
        BOOTLEG
      </p>
    </div>
  );
}

const generations = [
  { gen: "1st", f: "" },
  { gen: "2nd", f: "contrast-125 blur-[0.3px]" },
  { gen: "3rd", f: "contrast-150 blur-[0.6px] brightness-105" },
  { gen: "4th", f: "contrast-200 blur-[0.9px] brightness-110" },
  { gen: "5th", f: "contrast-[3] blur-[1.3px] brightness-125" },
];

function MiniFlyer() {
  return (
    <div className="flex aspect-[3/4] flex-col items-center justify-between bg-white p-1.5 text-center grayscale">
      <span className="tt-anton text-sm leading-none">MIDNIGHT</span>
      <svg viewBox="0 0 40 24" className="w-3/4">
        <ellipse cx="20" cy="12" rx="18" ry="9" fill="none" stroke="#111" strokeWidth="2" />
        <circle cx="20" cy="12" r="5" fill="#111" />
      </svg>
      <span className="text-[0.5rem] leading-none font-bold">FRI 11:59</span>
    </div>
  );
}

function CopyOfACopy() {
  return (
    <div>
      <ol className="grid grid-cols-5 gap-2">
        {generations.map((g, i) => (
          <li key={g.gen} className="flex flex-col items-center gap-1">
            <div className={`w-full ${g.f}`} aria-hidden={i > 0 ? true : undefined}>
              <MiniFlyer />
            </div>
            <span className="text-[0.7rem] font-bold">{g.gen} gen</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const dots = [
  { tag: "BODY", cls: "bg-(--tt-pink) text-(--tt-toner)" },
  { tag: "DREAM", cls: "bg-(--tt-cyan) text-(--tt-toner)" },
  { tag: "VIDEO", cls: "bg-(--tt-yellow) text-(--tt-toner)" },
  { tag: "GORE", cls: "bg-(--tt-red) text-white" },
  { tag: "ART", cls: "bg-(--tt-blue) text-white" },
];

function GenreDots() {
  return (
    <ul className="flex flex-wrap items-center gap-3">
      {dots.map((d, i) => (
        <li
          key={d.tag}
          className={`tt-anton grid size-16 place-items-center rounded-full text-sm tracking-wider shadow-[1px_2px_0_rgb(17_17_17/0.5)] ${d.cls} ${i % 2 ? "rotate-6" : "-rotate-3"}`}
        >
          {d.tag}
        </li>
      ))}
    </ul>
  );
}

function GoreRed() {
  return (
    <div className="relative">
      <svg aria-hidden="true" viewBox="0 0 300 120" className="block w-full">
        <path
          d="M0 0 H300 V38 C292 40 290 70 286 70 C282 70 282 44 270 42 C258 40 260 96 252 98 C244 100 246 48 232 44 C220 41 222 60 214 60 C206 60 210 40 196 40 C184 40 186 112 176 112 C166 112 170 44 156 40 C142 37 144 66 136 66 C128 66 130 42 116 41 C102 40 106 84 96 84 C86 84 90 44 76 42 C62 40 64 58 56 58 C48 58 50 40 36 40 C24 40 26 76 18 76 C10 76 12 40 0 38 Z"
          fill="var(--tt-red)"
        />
      </svg>
      <p className="tt-anton absolute top-1 left-3 text-3xl tracking-wider text-(--tt-paper)">UNCUT</p>
    </div>
  );
}

/* A2. Ransom ------------------------------------------------------------- */

const ransomStyles = [
  "tt-anton bg-(--tt-toner) text-(--tt-paper) px-1.5 -rotate-3",
  "font-bold bg-(--tt-yellow) px-1 rotate-2",
  "tt-web italic bg-white px-1 -rotate-1 border border-(--tt-toner)/20",
  "tt-vt bg-(--tt-blue) text-white px-1 rotate-3",
  "tt-marker text-(--tt-red) px-0.5 -rotate-6",
  "tt-anton bg-(--tt-pink) px-1 rotate-1",
];

export function RansomWord({ text, size = "text-4xl sm:text-5xl" }: { text: string; size?: string }) {
  let k = 0;
  return (
    <span role="img" aria-label={text} className={`inline-flex flex-wrap items-center gap-x-1 gap-y-2 ${size}`}>
      {text.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i} aria-hidden="true" className="w-3" />
        ) : (
          <span
            key={i}
            aria-hidden="true"
            className={`inline-block leading-none shadow-[1px_1px_0_rgb(17_17_17/0.35)] ${ransomStyles[k++ % ransomStyles.length]}`}
          >
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

function RansomLetters() {
  return (
    <div className="py-2">
      <RansomWord text="BODY HORROR" />
    </div>
  );
}

function Slogan() {
  return (
    <p className="tt-anton text-[clamp(2.6rem,7vw,4.75rem)] leading-[0.92] uppercase">
      Tapes for the
      <br />
      <span className="bg-(--tt-yellow) px-1">terminally</span>
      <br />
      curious
    </p>
  );
}

const listing: [string, string, string][] = [
  ["VIDEODROME (Cronenberg 83)", "2ND SP", "$15"],
  ["ERASERHEAD (Lynch 77)", "1ST SP", "$20"],
  ["TETSUO (Tsukamoto 89) subs", "3RD EP", "$15"],
  ["THE BROOD (Cronenberg 79)", "2ND SP", "$12"],
  ["BLUE VELVET (Lynch 86)", "1ST SP", "$12"],
  ["SCANNERS (Cronenberg 81)", "2ND SP", "$12"],
];

function TheList() {
  return (
    <div className="text-[0.82rem] sm:text-sm">
      <p className="mb-2 border-b-2 border-(--tt-toner) pb-1 font-bold">LIST #14 · FALL &apos;93 · ALL NTSC VHS</p>
      <ul className="space-y-1">
        {listing.map(([t, g, p]) => (
          <li key={t} className="flex items-baseline gap-1.5">
            <span>{t}</span>
            <span aria-hidden="true" className="min-w-4 flex-1 border-b-2 border-dotted border-(--tt-toner)/60" />
            <span className="shrink-0">{g}</span>
            <span className="w-10 shrink-0 text-right font-bold">{p}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs">Add $3 P&amp;P first tape, $1 each add&apos;l. Allow 2–4 wks.</p>
    </div>
  );
}

function VcrDisplay() {
  return (
    <div className="tt-vt relative aspect-[4/3] overflow-hidden rounded-[18px] border-[10px] border-[#1b1b1a] bg-(--tt-blue) p-4 text-2xl leading-tight text-white sm:text-3xl">
      <div className="tt-scanlines pointer-events-none absolute inset-0" />
      <p className="flex justify-between">
        <span>PLAY ▶</span>
        <span>SP</span>
      </p>
      <p className="mt-2">CH 03</p>
      <p className="absolute bottom-12 left-4 text-xl sm:text-2xl">TRACKING ▮▮▮▮▯▯</p>
      <p className="absolute right-4 bottom-3">0:47:13</p>
    </div>
  );
}

function MarkerNotes() {
  return (
    <div className="relative text-sm leading-7">
      <p>NAKED LUNCH (Cronenberg 91) .. 1ST SP .. $15</p>
      <p>
        DEAD RINGERS (Cronenberg 88) ..{" "}
        <span className="relative inline-block">
          LD DUB
          <svg aria-hidden="true" viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute -inset-x-3 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)] overflow-visible">
            <path d="M8 22 C4 4 94 0 96 18 C98 36 10 40 4 24" fill="none" stroke="var(--tt-red)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          </svg>
        </span>{" "}
        .. $18
      </p>
      <p>CRASH (Cronenberg 96) ...... ask</p>
      <p className="tt-marker mt-3 -rotate-3 text-2xl leading-tight text-(--tt-red)">RARE!! dubbed from laserdisc ↑</p>
      <p className="tt-marker mt-1 rotate-2 text-right text-xl text-(--tt-blue)">ask me about CRASH</p>
    </div>
  );
}

/* A3. Xerox -------------------------------------------------------------- */

function PhotocopyCrunch() {
  return (
    <svg role="img" aria-label="The words Not for sale, for trade only, in heavy condensed type with rough, eroded photocopy edges" viewBox="0 0 320 150" className="block w-full">
      <filter id="tt-crunch" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" result="d" />
        <feGaussianBlur in="d" stdDeviation="0.6" result="b" />
        <feComponentTransfer in="b">
          <feFuncA type="discrete" tableValues="0 0 1 1" />
        </feComponentTransfer>
      </filter>
      <g filter="url(#tt-crunch)" fill="#111" fontFamily="var(--font-tt-display), Impact, sans-serif">
        <text x="4" y="62" fontSize="64">NOT FOR SALE</text>
        <text x="6" y="132" fontSize="58" letterSpacing="2">TRADE ONLY</text>
      </g>
    </svg>
  );
}

function Halftone() {
  return (
    <svg role="img" aria-label="A television set drawn in black halftone dots, dense at the edges and fading across the screen" viewBox="0 0 240 200" className="mx-auto block w-full max-w-72">
      <defs>
        <pattern id="tt-dots-lg" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="2.4" fill="#111" />
        </pattern>
        <pattern id="tt-dots-sm" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="1.1" fill="#111" />
        </pattern>
        <linearGradient id="tt-screen-fade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.15" />
        </linearGradient>
        <mask id="tt-screen-mask">
          <rect x="34" y="52" width="130" height="104" rx="14" fill="url(#tt-screen-fade)" />
        </mask>
      </defs>
      <path d="M92 40 L70 6 M110 40 L140 4" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      <rect x="14" y="38" width="212" height="140" rx="16" fill="url(#tt-dots-lg)" />
      <rect x="34" y="52" width="130" height="104" rx="14" fill="#fff" />
      <rect x="34" y="52" width="130" height="104" rx="14" fill="url(#tt-dots-sm)" mask="url(#tt-screen-mask)" />
      <circle cx="196" cy="74" r="10" fill="#fff" stroke="#111" strokeWidth="3" />
      <circle cx="196" cy="108" r="10" fill="#fff" stroke="#111" strokeWidth="3" />
      <rect x="40" y="178" width="22" height="12" fill="#111" />
      <rect x="178" y="178" width="22" height="12" fill="#111" />
    </svg>
  );
}

const bars = ["#c0c0c0", "#c0c000", "#00c0c0", "#00c000", "#c000c0", "#c00000", "#0000c0"];

function TrackingError() {
  return (
    <div role="img" aria-label="Television colour bars with scan lines and one horizontal band shifted sideways, frozen" className="relative aspect-[16/10] overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-7">
        {bars.map((b) => (
          <div key={b} style={{ backgroundColor: b }} />
        ))}
      </div>
      <div className="absolute inset-x-0 top-[58%] h-[12%] overflow-hidden">
        <div className="grid h-full translate-x-[9%] grid-cols-7 opacity-90 saturate-150">
          {bars.map((b) => (
            <div key={b} style={{ backgroundColor: b }} />
          ))}
        </div>
        <div className="absolute inset-0 translate-x-[7%] bg-white/25 mix-blend-screen" />
      </div>
      <div className="tt-scanlines absolute inset-0" />
    </div>
  );
}

function TapeAndStaples() {
  return (
    <div className="relative bg-white px-6 pt-8 pb-6 text-center">
      <span aria-hidden="true" className="tt-tape absolute -top-2 left-4 h-6 w-20 -rotate-6" />
      <span aria-hidden="true" className="tt-tape absolute -top-2 right-4 h-6 w-20 rotate-3" />
      <svg aria-hidden="true" viewBox="0 0 40 10" className="absolute bottom-3 left-4 w-8 rotate-12">
        <path d="M2 8 V3 H38 V8" fill="none" stroke="#8a8a85" strokeWidth="2" />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 40 10" className="absolute right-5 bottom-4 w-8 -rotate-6">
        <path d="M2 8 V3 H38 V8" fill="none" stroke="#8a8a85" strokeWidth="2" />
      </svg>
      <p className="tt-anton text-3xl">WANTED</p>
      <p className="mt-1 text-sm">Any Cronenberg pre-1980.</p>
      <p className="text-sm">Will trade 2-for-1.</p>
      <p className="mt-2 text-xs">— pinned up at the video shop, 10/93</p>
    </div>
  );
}

function FoldsAndCoffee() {
  return (
    <div
      role="img"
      aria-label="A typed sheet folded into quarters, with crease shadows and a brown coffee-cup ring in one corner"
      className="relative aspect-[4/3] overflow-hidden bg-white"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49.4%,rgb(0_0_0/0.12)_50%,rgb(255_255_255/0.8)_50.6%,transparent_52%),linear-gradient(180deg,transparent_49.2%,rgb(0_0_0/0.1)_50%,rgb(255_255_255/0.8)_50.8%,transparent_52%)]" />
      <div aria-hidden="true" className="absolute inset-6 space-y-2.5">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className={`h-1.5 bg-(--tt-toner)/30 ${i % 3 === 2 ? "w-1/2" : "w-11/12"}`} />
        ))}
      </div>
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute -right-4 -bottom-6 w-40">
        <filter id="tt-ring">
          <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" />
        </filter>
        <g filter="url(#tt-ring)" fill="none">
          <circle cx="50" cy="50" r="36" stroke="#7b4a1e" strokeOpacity="0.55" strokeWidth="3.5" />
          <circle cx="50" cy="50" r="33" stroke="#7b4a1e" strokeOpacity="0.18" strokeWidth="5" />
        </g>
      </svg>
    </div>
  );
}

/* Registry --------------------------------------------------------------- */

export type ClipSpec = {
  /** Grid placement; literal class strings so Tailwind can see them. */
  className: string;
  tilt?: string;
  fix?: Fix;
  surface?: Surface;
  render: (artifact: Artifact) => ReactNode;
};

export const clips: Record<string, ClipSpec> = {
  "TT-01": { className: "md:col-span-3 lg:col-span-5", tilt: "-rotate-1", fix: "tape", render: () => <HighlighterTypescript /> },
  "TT-02": { className: "md:col-span-3 lg:col-span-7 lg:pt-6", surface: "bare", render: () => <Misregistered /> },
  "TT-03": { className: "md:col-span-6 lg:col-span-6", tilt: "rotate-1", fix: "corners", render: () => <CopyOfACopy /> },
  "TT-04": { className: "md:col-span-3 lg:col-span-3 lg:pt-8", surface: "bare", render: () => <GenreDots /> },
  "TT-05": { className: "md:col-span-3 lg:col-span-3", surface: "bare", tilt: "-rotate-2", render: () => <GoreRed /> },

  "TT-06": { className: "md:col-span-6 lg:col-span-7", tilt: "rotate-1", fix: "tape", render: () => <RansomLetters /> },
  "TT-07": { className: "md:col-span-3 lg:col-span-5", surface: "bare", render: () => <Slogan /> },
  "TT-08": { className: "md:col-span-3 lg:col-span-5", tilt: "-rotate-1", fix: "staple", render: () => <TheList /> },
  "TT-09": { className: "md:col-span-3 lg:col-span-4 lg:pt-6", surface: "bare", tilt: "rotate-2", render: () => <VcrDisplay /> },
  "TT-10": { className: "md:col-span-3 lg:col-span-3", tilt: "rotate-1", fix: "tape", render: () => <MarkerNotes /> },

  "TT-11": { className: "md:col-span-3 lg:col-span-5", tilt: "-rotate-1", fix: "staple", render: () => <PhotocopyCrunch /> },
  "TT-12": { className: "md:col-span-3 lg:col-span-3 lg:pt-10", surface: "bare", render: () => <Halftone /> },
  "TT-13": { className: "md:col-span-6 lg:col-span-4", tilt: "rotate-1", fix: "tape", render: () => <TrackingError /> },
  "TT-14": { className: "md:col-span-3 lg:col-span-4 lg:col-start-2", surface: "bare", tilt: "-rotate-2", render: () => <TapeAndStaples /> },
  "TT-15": { className: "md:col-span-3 lg:col-span-5 lg:col-start-7", fix: "corners", tilt: "rotate-1", render: () => <FoldsAndCoffee /> },
};
