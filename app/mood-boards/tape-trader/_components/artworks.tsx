import Image from "next/image";
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
    <span role="img" aria-label={text} className={`inline-flex flex-wrap items-center gap-x-4 gap-y-2 ${size}`}>
      {text.split(" ").map((word, w) => (
        // Letters of one word never wrap apart.
        <span key={w} aria-hidden="true" className="inline-flex items-center gap-x-1 whitespace-nowrap">
          {word.split("").map((ch, i) => (
            <span
              key={i}
              className={`inline-block leading-none shadow-[1px_1px_0_rgb(17_17_17/0.35)] ${ransomStyles[k++ % ransomStyles.length]}`}
            >
              {ch}
            </span>
          ))}
        </span>
      ))}
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

/* B4. Contraband --------------------------------------------------------- */

const spines = [
  { title: "VIDEODROME", label: "bg-white", font: "tt-marker text-(--tt-red)", body: "bg-[#161616]" },
  { title: "TETSUO", label: "bg-(--tt-yellow)", font: "font-bold tracking-widest", body: "bg-[#222]" },
  { title: "ERASERHEAD", label: "bg-white", font: "tracking-wider", body: "bg-[#161616]" },
  { title: "SCANNERS", label: "bg-(--tt-toner)", font: "font-bold tracking-[0.2em] text-white", body: "bg-[#1d1d1d]" },
  { title: "THE BROOD", label: "bg-(--tt-pink)", font: "tt-marker", body: "bg-[#181818]" },
  { title: "DEAD RINGERS", label: "bg-white", font: "tt-vt text-lg tracking-wider", body: "bg-[#202020]" },
  { title: "NAKED LUNCH", label: "bg-(--tt-cyan)", font: "font-bold", body: "bg-[#161616]" },
];

function TheShelf() {
  return (
    <div className="border-b-8 border-[#5b4632] pt-2">
      <ul className="flex items-end gap-1 overflow-hidden">
        {spines.map((s, i) => (
          <li
            key={s.title}
            className={`flex h-56 w-11 shrink-0 items-center justify-center rounded-t-[2px] sm:w-12 ${s.body} ${i === 3 ? "-rotate-3" : ""}`}
          >
            <span className={`px-1 py-2 text-sm leading-none whitespace-nowrap [writing-mode:vertical-rl] ${s.label} ${s.font}`}>
              {s.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HandLabelledTape() {
  return (
    <div className="mx-auto max-w-sm rounded-md bg-[#141414] p-4 shadow-[3px_4px_0_rgb(0_0_0/0.35)]">
      <div className="-rotate-1 bg-white px-3 py-2">
        <p className="tt-marker text-xl leading-tight text-(--tt-blue)">NAKED LUNCH + trailers</p>
        <p className="mt-1 flex justify-between border-t border-(--tt-blue)/40 pt-1 text-xs">
          <span>SP · 2nd gen</span>
          <span className="tt-marker text-(--tt-red)">DON&apos;T TAPE OVER!</span>
        </p>
      </div>
      <div aria-hidden="true" className="mt-4 flex items-center justify-center gap-10">
        {[0, 1].map((i) => (
          <span key={i} className="grid size-14 place-items-center rounded-full border-4 border-[#3a3a3a] bg-[#0d0d0d]">
            <span className="size-5 rounded-full border-2 border-dashed border-[#9a9a9a]" />
          </span>
        ))}
      </div>
      <div aria-hidden="true" className="mx-auto mt-3 h-2 w-2/3 rounded-sm bg-[#2a2a2a]" />
    </div>
  );
}

function OrderLine({ label, value }: { label: string; value?: string }) {
  return (
    <p className="flex items-baseline gap-2 text-sm">
      <span className="shrink-0 font-bold">{label}</span>
      <span className="flex-1 border-b border-(--tt-toner) px-1">
        {value ? <span className="tt-marker text-(--tt-blue)">{value}</span> : " "}
      </span>
    </p>
  );
}

function OrderForm() {
  return (
    <div className="border-2 border-dashed border-(--tt-toner) bg-white p-4">
      <p className="text-xs">✂ - - - - - - cut here - - - - - -</p>
      <p className="tt-anton mt-1 text-2xl">ORDER FORM</p>
      <div className="mt-3 space-y-2.5">
        <OrderLine label="NAME" />
        <OrderLine label="ADDRESS" />
        <OrderLine label="TITLES" value="Tetsuo, The Brood" />
      </div>
      <p className="mt-3 flex flex-wrap gap-x-4 text-sm">
        <span>[ ] CASH</span>
        <span>[ ] MONEY ORDER</span>
        <span>
          [<span className="tt-marker text-(--tt-red)">X</span>] TRADE
        </span>
      </p>
      <p className="mt-2 text-xs font-bold">NO CHECKS. NO REFUNDS. NO QUESTIONS.</p>
    </div>
  );
}

function Starburst({ children, className }: { children: ReactNode; className: string }) {
  return (
    <div className={`relative grid size-24 place-items-center ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0">
        <polygon
          points="50,2 60,30 90,18 72,45 98,58 68,64 76,94 50,74 24,94 32,64 2,58 28,45 10,18 40,30"
          fill="var(--tt-yellow)"
          stroke="#111"
          strokeWidth="2"
        />
      </svg>
      <span className="tt-anton relative text-xl">{children}</span>
    </div>
  );
}

function StickerSheet() {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-sm bg-[#f7f7f2] p-3 shadow-[inset_0_0_0_2px_rgb(17_17_17/0.08)]">
      <Starburst className="-rotate-6">RARE!</Starburst>
      <span className="tt-anton rotate-2 bg-(--tt-red) px-2 py-1 text-lg tracking-wider text-white">EX-RENTAL</span>
      <span className="tt-anton grid size-16 -rotate-3 place-items-center rounded-full bg-(--tt-toner) text-lg text-(--tt-paper)">
        UNCUT
      </span>
      <span className="rotate-1 bg-(--tt-pink) px-2 py-1 text-sm font-bold">2ND GEN</span>
      <span className="tt-vt -rotate-2 bg-(--tt-cyan) px-2 text-xl">NTSC</span>
      <span className="rounded-full border-2 border-(--tt-blue) px-3 py-1 text-xs font-bold text-(--tt-blue)">
        BE KIND · REWIND
      </span>
    </div>
  );
}

function MembershipCard() {
  return (
    <div className="mx-auto aspect-[1.586] w-full max-w-72 overflow-hidden rounded-xl bg-(--tt-blue) text-white shadow-[2px_3px_0_rgb(0_0_0/0.4)]">
      <div className="flex items-center justify-between bg-(--tt-yellow) px-3 py-1.5 text-(--tt-toner)">
        <span className="tt-anton text-lg tracking-wide">NIGHT OWL VIDEO</span>
        <span className="text-xs font-bold">MEMBER</span>
      </div>
      <div className="px-3 pt-2 text-xs leading-relaxed">
        <p>
          No. <span className="tt-vt text-base">004471</span>
        </p>
        <p>Late fees $1/day. Rewind or pay $1.</p>
      </div>
      <div className="mx-3 mt-2 h-6 rounded-sm bg-white px-2 pt-0.5">
        <span className="tt-marker text-sm text-(--tt-toner)">J. Doe</span>
      </div>
    </div>
  );
}

function Envelope() {
  return (
    <div
      role="img"
      aria-label="A brown paper envelope with a cancelled stamp, a round postmark and a handwritten address to a P.O. box"
      className="relative aspect-[16/10] bg-(--tt-kraft) shadow-[2px_3px_0_rgb(0_0_0/0.3)]"
    >
      <div className="absolute top-3 right-3 h-16 w-14 border-2 border-dotted border-white bg-white p-1 shadow-[0_0_0_1px_rgb(0_0_0/0.15)]">
        <div className="grid h-full place-items-center bg-(--tt-pink)">
          <svg aria-hidden="true" viewBox="0 0 30 20" className="w-8">
            <rect x="1" y="1" width="28" height="18" rx="2" fill="none" stroke="#111" strokeWidth="2" />
            <circle cx="10" cy="10" r="3.5" fill="none" stroke="#111" strokeWidth="2" />
            <circle cx="20" cy="10" r="3.5" fill="none" stroke="#111" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <svg aria-hidden="true" viewBox="0 0 160 60" className="absolute top-7 right-20 w-36 opacity-75">
        <circle cx="30" cy="30" r="24" fill="none" stroke="#1d1d1d" strokeWidth="2" />
        <text x="30" y="27" textAnchor="middle" fontSize="7" fill="#1d1d1d" fontFamily="monospace">
          OCT 14
        </text>
        <text x="30" y="37" textAnchor="middle" fontSize="7" fill="#1d1d1d" fontFamily="monospace">
          1993
        </text>
        {[18, 26, 34, 42].map((y) => (
          <path key={y} d={`M58 ${y} q10 -6 20 0 t20 0 t20 0 t20 0 t20 0`} fill="none" stroke="#1d1d1d" strokeWidth="1.6" />
        ))}
      </svg>
      <div className="tt-marker absolute bottom-[14%] left-[28%] text-lg leading-snug sm:text-xl">
        <p>TAPE TRADER</p>
        <p>P.O. BOX 1983</p>
        <p>SOMEWHERE, U.S.A.</p>
      </div>
    </div>
  );
}

/* B5. Homepage ----------------------------------------------------------- */

function BevelButtons() {
  return (
    <div className="tt-web grid gap-4 bg-[#c0c0c0] p-4 sm:grid-cols-2">
      <div>
        <p className="mb-2 text-sm">Resting</p>
        <div className="flex flex-wrap gap-2">
          {["Enter", "Guestbook", "Trade list"].map((b) => (
            <span key={b} className="tt-bevel px-3 py-1 text-sm">
              {b}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm">Pressed</p>
        <div className="flex flex-wrap gap-2">
          {["Enter", "Guestbook", "Trade list"].map((b) => (
            <span key={b} className="tt-bevel-pressed px-3 pt-[0.3rem] pb-1 pl-[0.8rem] text-sm">
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function UnderConstruction() {
  return (
    <div className="space-y-4">
      <div className="tt-hazard p-2">
        <p className="tt-anton bg-(--tt-yellow) py-2 text-center text-3xl tracking-wider sm:text-4xl">UNDER CONSTRUCTION</p>
      </div>
      <div className="tt-web flex flex-wrap items-center justify-center gap-3 text-sm">
        <span>Hits since 10/31/97:</span>
        <span className="tt-vt flex gap-0.5 text-2xl">
          {"004471".split("").map((d, i) => (
            <span key={i} className="bg-(--tt-toner) px-1.5 text-[#7cfc00]">
              {d}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

function Guestbook() {
  return (
    <div className="tt-web border-2 border-[#808080] bg-[#d4d0c8] p-1 text-[0.95rem]">
      <table className="w-full border-collapse bg-white">
        <tbody>
          <tr className="border-b border-[#808080]">
            <th scope="row" className="w-24 bg-[#e8e8e8] px-2 py-1 text-left align-top font-bold">
              Name
            </th>
            <td className="px-2 py-1">vhs_ghoul</td>
          </tr>
          <tr className="border-b border-[#808080]">
            <th scope="row" className="bg-[#e8e8e8] px-2 py-1 text-left align-top font-bold">
              From
            </th>
            <td className="px-2 py-1">Dayton, OH</td>
          </tr>
          <tr className="border-b border-[#808080]">
            <th scope="row" className="bg-[#e8e8e8] px-2 py-1 text-left align-top font-bold">
              Comments
            </th>
            <td className="px-2 py-1">
              Got my TETSUO in 4 days!!! picture is rough but the subs are readable. A+++ trader, will trade again
            </td>
          </tr>
          <tr>
            <th scope="row" className="bg-[#e8e8e8] px-2 py-1 text-left align-top font-bold">
              Posted
            </th>
            <td className="px-2 py-1">11/02/97 23:14</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Webring() {
  return (
    <div className="tt-web border-4 border-double border-(--tt-toner) bg-white p-4 text-center">
      <p className="tt-anton text-2xl tracking-wide">THE CULT VHS RING</p>
      <p className="mt-1 text-sm">This site is a member of the ring. 47 sites and counting.</p>
      <p className="mt-3 text-base">
        [ <span className="text-(--tt-blue) underline">&lt;&lt; Prev</span> |{" "}
        <span className="text-(--tt-blue) underline">Random</span> |{" "}
        <span className="text-(--tt-blue) underline">List sites</span> |{" "}
        <span className="text-(--tt-blue) underline">Next &gt;&gt;</span> ]
      </p>
      <p className="mt-2 text-xs">Want to join? Email the ringmaster.</p>
    </div>
  );
}

function PullATape() {
  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
      <div className="flex items-end gap-1 border-b-8 border-[#5b4632]">
        {["TETSUO", "SCANNERS", "ERASERHEAD", "THE BROOD", "CRASH"].map((t, i) => (
          <div
            key={t}
            className={`flex h-48 w-10 items-center justify-center bg-[#1a1a1a] ${
              i === 2 ? "-translate-y-6 shadow-[0_6px_0_rgb(0_0_0/0.25)] ring-2 ring-(--tt-yellow)" : ""
            }`}
          >
            <span className="bg-white px-1 py-1.5 text-xs font-bold whitespace-nowrap [writing-mode:vertical-rl]">{t}</span>
          </div>
        ))}
      </div>
      <div className="w-full max-w-56 rotate-1 border-2 border-(--tt-toner) bg-white p-3 text-sm">
        <p className="tt-anton text-2xl leading-none">ERASERHEAD</p>
        <p className="mt-1">Lynch · 1977 · 89 min</p>
        <p>1st gen · SP · $20</p>
        <p className="mt-2 inline-block bg-(--tt-yellow) px-1 font-bold">+ ADD TO MY LIST</p>
      </div>
    </div>
  );
}

/* B6. Found Footage ------------------------------------------------------ */

function FoundImage({ artifact, sizes, copy = true }: { artifact: Artifact; sizes: string; copy?: boolean }) {
  const image = artifact.image;
  if (!image) return null;
  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      sizes={sizes}
      className={`block h-auto w-full ${copy ? "contrast-[1.35] grayscale" : ""}`}
    />
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
  "TT-12": { className: "md:col-span-3 lg:col-span-3 lg:pt-6", surface: "bare", render: () => <Halftone /> },
  "TT-13": { className: "md:col-span-6 lg:col-span-4", tilt: "rotate-1", fix: "tape", render: () => <TrackingError /> },
  "TT-14": { className: "md:col-span-3 lg:col-span-4 lg:col-start-2 lg:self-center", surface: "bare", tilt: "-rotate-2", render: () => <TapeAndStaples /> },
  "TT-15": { className: "md:col-span-3 lg:col-span-5 lg:col-start-7", fix: "corners", tilt: "rotate-1", render: () => <FoldsAndCoffee /> },
  "TT-16": { className: "md:col-span-6 lg:col-span-7", surface: "bare", render: () => <TheShelf /> },
  "TT-17": { className: "md:col-span-3 lg:col-span-5 lg:pt-6", surface: "bare", tilt: "rotate-2", render: () => <HandLabelledTape /> },
  "TT-18": { className: "md:col-span-3 lg:col-span-5", surface: "bare", tilt: "-rotate-1", render: () => <OrderForm /> },
  "TT-19": { className: "md:col-span-3 lg:col-span-4 lg:pt-8", surface: "bare", tilt: "rotate-1", render: () => <StickerSheet /> },
  "TT-20": { className: "md:col-span-3 lg:col-span-3", surface: "bare", tilt: "-rotate-2", render: () => <MembershipCard /> },
  "TT-21": { className: "md:col-span-6 lg:col-span-5 lg:col-start-4", surface: "bare", tilt: "rotate-1", render: () => <Envelope /> },

  "TT-22": { className: "md:col-span-3 lg:col-span-5", surface: "bare", render: () => <BevelButtons /> },
  "TT-23": { className: "md:col-span-3 lg:col-span-7", surface: "bare", tilt: "-rotate-1", render: () => <UnderConstruction /> },
  "TT-24": { className: "md:col-span-3 lg:col-span-5", surface: "bare", tilt: "rotate-1", render: () => <Guestbook /> },
  "TT-25": { className: "md:col-span-3 lg:col-span-6 lg:col-start-7 lg:pt-6", surface: "bare", render: () => <Webring /> },
  "TT-26": { className: "md:col-span-6 lg:col-span-8 lg:col-start-3", fix: "tape", render: () => <PullATape /> },

  "TT-27": {
    className: "md:col-span-2 lg:col-span-3",
    fix: "tape",
    tilt: "-rotate-2",
    render: (a) => <FoundImage artifact={a} sizes="(min-width: 1024px) 22vw, (min-width: 768px) 33vw, 100vw" />,
  },
  "TT-28": {
    className: "md:col-span-4 lg:col-span-4",
    fix: "corners",
    tilt: "rotate-1",
    render: (a) => <FoundImage artifact={a} copy={false} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 66vw, 100vw" />,
  },
  "TT-29": {
    className: "md:col-span-3 lg:col-span-5 lg:self-center",
    fix: "staple",
    tilt: "-rotate-1",
    render: (a) => <FoundImage artifact={a} sizes="(min-width: 1024px) 36vw, (min-width: 768px) 50vw, 100vw" />,
  },
  "TT-30": {
    className: "md:col-span-3 lg:col-span-8 lg:col-start-4",
    fix: "tape",
    tilt: "rotate-1",
    render: (a) => <FoundImage artifact={a} sizes="(min-width: 1024px) 60vw, (min-width: 768px) 50vw, 100vw" />,
  },
};
