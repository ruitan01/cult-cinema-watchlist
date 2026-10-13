import Image from "next/image";
import type { ReactNode } from "react";
import type { Artifact } from "@/data/mood-boards/types";
import type { Frame } from "./plate";

/* I. Inks & Stocks ------------------------------------------------------ */

const inks = [
  { name: "Paper", hex: "#F3EEE4", bg: "bg-[#F3EEE4]" },
  { name: "Index card", hex: "#E6DFD0", bg: "bg-[#E6DFD0]" },
  { name: "Ink", hex: "#1C1B19", bg: "bg-[#1C1B19]" },
  { name: "Faded ink", hex: "#5E594F", bg: "bg-[#5E594F]" },
  { name: "Stamp red", hex: "#A3271F", bg: "bg-[#A3271F]" },
  { name: "Archive blue-black", hex: "#22324A", bg: "bg-[#22324A]" },
  { name: "Brass", hex: "#9C7A3C", bg: "bg-[#9C7A3C]" },
];

const chipTilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-0", "-rotate-2", "rotate-1"];

function InkChips() {
  return (
    <ul className="grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-4 sm:gap-x-5 sm:gap-y-7">
      {inks.map((ink, i) => (
        <li key={ink.hex} className={`ar-shadow bg-[#fbf8f2] p-2 pb-3 ${chipTilts[i]}`}>
          <div className={`aspect-square border border-(--ar-ink)/10 ${ink.bg}`} />
          <p className="mt-2 text-xs leading-tight sm:text-sm">{ink.name}</p>
          <p className="ar-mono text-[0.65rem] text-(--ar-muted) sm:text-xs">{ink.hex}</p>
        </li>
      ))}
    </ul>
  );
}

function PaperStocks() {
  return (
    <div className="relative h-72">
      <div className="ar-grain ar-shadow absolute top-0 left-0 h-48 w-[62%] -rotate-3 bg-(--ar-paper) p-3">
        <p className="ar-mono text-xs">Stock A — new</p>
      </div>
      <div className="ar-grain ar-shadow absolute top-10 left-[22%] h-48 w-[62%] rotate-2 bg-(--ar-paper-aged) p-3">
        <p className="ar-mono text-xs">Stock B — aged</p>
      </div>
      <div className="ar-ruled ar-shadow absolute top-24 left-[38%] h-44 w-[60%] -rotate-1 p-3">
        <p className="ar-mono text-xs">Stock C — index card</p>
      </div>
    </div>
  );
}

const fades = [
  { strength: "100%", cls: "opacity-100" },
  { strength: "80%", cls: "opacity-80" },
  { strength: "60%", cls: "opacity-60" },
  { strength: "40%", cls: "opacity-40" },
  { strength: "20%", cls: "opacity-20" },
];

function FadedInk() {
  return (
    <div className="ar-mono space-y-2 text-sm sm:text-base">
      {fades.map((f, i) => (
        <p key={f.strength} className="flex items-baseline justify-between gap-4">
          <span className={f.cls}>Received into the collection, 1977.</span>
          <span className={`shrink-0 text-xs ${i >= 3 ? "text-(--ar-red)" : "text-(--ar-muted)"}`}>
            {f.strength}
            {i >= 3 && " ✕"}
          </span>
        </p>
      ))}
    </div>
  );
}

function RedBluePencil() {
  return (
    <div className="ar-ruled px-5 pt-14 pb-6">
      <p className="ar-mono text-sm leading-7 sm:text-base sm:leading-7">
        VIDEODROME (1983). A cable programmer searches for something{" "}
        <span className="relative inline-block">
          tougher
          <svg
            aria-hidden="true"
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="absolute -inset-x-2 -inset-y-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+1rem)] overflow-visible"
          >
            <path
              d="M6 22 C 4 6, 92 2, 96 18 C 99 34, 14 40, 4 26 C 1 18, 30 6, 60 7"
              fill="none"
              stroke="var(--ar-red)"
              strokeWidth="2.2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </span>{" "}
        <span className="text-(--ar-blue) italic">^ and stranger</span> and finds a signal that{" "}
        <span className="line-through decoration-(--ar-blue) decoration-2">cannot</span> will
        not be unseen.
      </p>
      <p className="mt-3 text-right text-lg text-(--ar-red) italic">stet — keep “tougher”</p>
    </div>
  );
}

/* II. Type & Hand ------------------------------------------------------- */

function DisplaySpecimen() {
  return (
    <div className="border-y border-(--ar-ink) py-6">
      <p className="ar-mono flex justify-between text-xs text-(--ar-muted)">
        <span>Libre Caslon Display · Regular</span>
        <span>CCW-1977-001</span>
      </p>
      <p className="ar-display -ml-1 text-[clamp(3.5rem,15vw,12rem)] leading-[0.9] tracking-tight">
        Eraserhead
      </p>
      <p className="ar-smallcaps ar-oldstyle text-right text-lg">David Lynch · 1977 · United States</p>
    </div>
  );
}

function ProgrammeNote() {
  return (
    <article className="ar-oldstyle">
      <p className="ar-smallcaps mb-3 text-sm text-(--ar-muted)">Programme note — Saturday, midnight</p>
      <p className="text-lg leading-relaxed">
        <span className="ar-display float-left mt-1 mr-2 text-[4.6rem] leading-[0.8] text-(--ar-red)">
          S
        </span>
        hot over five years in borrowed stables and back rooms, <em>Eraserhead</em> arrives like a
        transmission from an industrial dream. Henry Spencer, hair on end, crosses a landscape of
        steam and hum toward a dinner, a child, and a radiator in which a woman sings that in heaven
        everything is fine. Tonight’s print is shown without introduction. We ask only that the
        audience remain seated through the silence after the final shot.
      </p>
    </article>
  );
}

const typescript: [string, string][] = [
  ["Acc. no.", "CCW-1983-004"],
  ["Title", "VIDEODROME"],
  ["Director", "CRONENBERG, DAVID"],
  ["Country", "CANADA"],
  ["Year", "1983"],
  ["Format", "35MM · COLOUR · 1.85:1"],
  ["Running", "87 MIN"],
  ["Condition", "GOOD; SPLICE AT REEL 3"],
];

function CatalogueTypescript() {
  return (
    <dl className="ar-mono grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1 text-[0.8rem] sm:text-sm">
      {typescript.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-(--ar-muted) uppercase">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function SmallCaps() {
  return (
    <div className="space-y-5">
      <div>
        <p className="ar-mono mb-1 text-xs text-(--ar-muted)">Capitals, lining figures</p>
        <p className="text-xl [font-variant-numeric:lining-nums]">
          SCREENED SATURDAY 14 MARCH 1987 AT 23:45
        </p>
      </div>
      <div>
        <p className="ar-mono mb-1 text-xs text-(--ar-muted)">Small capitals, old-style figures</p>
        <p className="ar-oldstyle text-xl">
          <span className="ar-smallcaps">Screened Saturday</span> 14 March 1987 at 23:45
        </p>
      </div>
    </div>
  );
}

function TitlePage() {
  return (
    <div className="flex aspect-[3/4] flex-col items-center justify-between py-4 text-center">
      <p className="ar-smallcaps text-sm tracking-[0.2em]">The Cult Cinema Collection</p>
      <div className="w-full">
        <div className="mx-auto mb-5 w-2/3 border-t-4 border-double border-(--ar-ink)" />
        <p className="text-sm italic">A Catalogue of</p>
        <p className="ar-display mt-2 text-3xl leading-tight">
          Surrealism, Body Horror &amp; the Experimental Film
        </p>
        <p aria-hidden="true" className="my-4 text-2xl text-(--ar-red)">
          ❦
        </p>
        <p className="ar-smallcaps">Volume I · Lynch &amp; Cronenberg</p>
        <div className="mx-auto mt-5 w-2/3 border-t-4 border-double border-(--ar-ink)" />
      </div>
      <p className="ar-smallcaps text-xs">Printed for the Reading Room · MMXXVI</p>
    </div>
  );
}

function AccessionNumerals() {
  return (
    <div className="ar-mono">
      <p className="text-[clamp(1.6rem,4vw,2.4rem)] font-medium tracking-[0.12em] text-(--ar-red) [text-shadow:0.5px_0.5px_0_rgb(163_39_31/0.35)]">
        CCW-1977-001
      </p>
      <p className="text-xl tracking-[0.12em] opacity-90">CCW-1983-004</p>
      <p className="text-base tracking-[0.12em] opacity-75">CCW-1986-011</p>
      <dl className="mt-5 grid grid-cols-[4rem_1fr] gap-y-1 border-t border-(--ar-ink)/30 pt-3 text-xs">
        <dt>CCW</dt>
        <dd className="text-(--ar-muted)">the collection</dd>
        <dt>1977</dt>
        <dd className="text-(--ar-muted)">year of release</dd>
        <dt>001</dt>
        <dd className="text-(--ar-muted)">order of accession</dd>
      </dl>
    </div>
  );
}

/* III. Paper & Order ---------------------------------------------------- */

function PaperGrain() {
  return (
    <div
      role="img"
      aria-label="Plain paper with a faint fibre texture, and a magnified circle showing the grain"
      className="ar-grain relative aspect-square bg-(--ar-paper)"
    >
      <div className="ar-grain ar-grain-zoom ar-shadow absolute right-4 bottom-4 size-1/2 rounded-full border-4 border-(--ar-brass) bg-(--ar-paper-aged)" />
    </div>
  );
}

function IndexCardRuling() {
  return (
    <div className="ar-ruled ar-shadow aspect-[5/3] px-5 pt-4 text-sm">
      <p className="ar-mono flex justify-between">
        <span>LYNCH, David</span>
        <span className="text-(--ar-muted)">1946–2025</span>
      </p>
      <ul className="ar-mono mt-[1.35rem] text-xs leading-7 sm:text-sm sm:leading-7">
        <li>Eraserhead ............ CCW-1977-001</li>
        <li>Blue Velvet ........... CCW-1986-011</li>
        <li>Lost Highway .......... CCW-1997-023</li>
      </ul>
    </div>
  );
}

const spots: [number, number, number, number][] = [
  [14, 12, 9, 0.45], [30, 8, 4, 0.35], [82, 18, 12, 0.3], [90, 40, 5, 0.5],
  [10, 70, 14, 0.25], [24, 88, 6, 0.4], [60, 92, 9, 0.3], [88, 84, 15, 0.35],
  [48, 50, 3, 0.4], [70, 62, 5, 0.25], [8, 40, 4, 0.45], [40, 20, 2.5, 0.5],
];

function Foxing() {
  return (
    <svg
      role="img"
      aria-label="Paper with scattered brown age spots, densest at the edges"
      viewBox="0 0 100 100"
      className="ar-grain block aspect-square w-full bg-(--ar-paper-aged)"
    >
      <defs>
        <radialGradient id="ar-fox">
          <stop offset="0" stopColor="var(--ar-fox)" stopOpacity="0.9" />
          <stop offset="0.6" stopColor="var(--ar-fox)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--ar-fox)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {spots.map(([cx, cy, r, o]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="url(#ar-fox)" opacity={o} />
      ))}
    </svg>
  );
}

function TextLines({ count }: { count: number }) {
  return (
    <div aria-hidden="true" className="space-y-1.5">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={`h-1 bg-(--ar-ink)/25 ${i % 5 === 4 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  );
}

function Marginalia() {
  return (
    <div className="grid grid-cols-2 gap-0.5 bg-(--ar-ink)/15 p-0.5">
      <div className="ar-grain grid grid-cols-[1fr_32%] gap-3 bg-(--ar-paper) p-4 sm:p-6">
        <div>
          <p className="ar-display mb-3 text-base sm:text-xl">The Brood</p>
          <TextLines count={11} />
        </div>
        <p className="pt-9 text-[0.65rem] leading-snug text-(--ar-red) italic sm:text-xs">
          cf. <span className="ar-oldstyle">Videodrome, 1983</span> — the body answering back.
        </p>
      </div>
      <div className="ar-grain grid grid-cols-[1fr_32%] gap-3 bg-(--ar-paper) p-4 sm:p-6">
        <div className="pt-1">
          <TextLines count={13} />
        </div>
        <p className="pt-16 text-[0.65rem] leading-snug text-(--ar-red) italic sm:text-xs">
          see the twins of <span className="ar-oldstyle">Dead Ringers, 1988</span>
        </p>
      </div>
    </div>
  );
}

function RulesAndFleurons() {
  return (
    <div className="space-y-6">
      <div className="border-t border-(--ar-ink)" />
      <div className="border-t-4 border-double border-(--ar-ink)" />
      <div>
        <div className="border-t-[3px] border-(--ar-ink)" />
        <div className="mt-0.5 border-t border-(--ar-ink)" />
      </div>
      <p className="ar-oldstyle flex items-baseline gap-2">
        <span>Videodrome</span>
        <span aria-hidden="true" className="flex-1 border-b-2 border-dotted border-(--ar-muted)" />
        <span>87 min</span>
      </p>
      <p aria-hidden="true" className="text-center text-3xl text-(--ar-red)">
        ❧
      </p>
    </div>
  );
}

/* IV. Marks & Ephemera --------------------------------------------------- */

function DistressFilter({ id, seed }: { id: string; seed: number }) {
  return (
    <filter id={id}>
      <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed={seed} result="noise" />
      <feColorMatrix
        in="noise"
        type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.55"
        result="mask"
      />
      <feComposite in="SourceGraphic" in2="mask" operator="in" />
    </filter>
  );
}

function ViewedStamp() {
  return (
    <svg role="img" aria-label="Red rubber stamp reading Viewed, 14 March 1987" viewBox="0 0 220 120" className="w-full">
      <defs>
        <DistressFilter id="ar-distress-viewed" seed={3} />
      </defs>
      <g filter="url(#ar-distress-viewed)" transform="rotate(-7 110 60)" fill="none" stroke="var(--ar-red)" color="var(--ar-red)">
        <rect x="12" y="18" width="196" height="84" rx="4" strokeWidth="4" />
        <rect x="20" y="26" width="180" height="68" rx="2" strokeWidth="1.5" />
        <text x="110" y="68" textAnchor="middle" fontSize="32" fill="currentColor" stroke="none" fontFamily="var(--font-ar-display)" letterSpacing="4">
          VIEWED
        </text>
        <text x="110" y="87" textAnchor="middle" fontSize="11" fill="currentColor" stroke="none" fontFamily="var(--font-ar-mono)" letterSpacing="3">
          14 MAR 1987
        </text>
      </g>
    </svg>
  );
}

function RestrictedStamp() {
  return (
    <svg
      role="img"
      aria-label="Round blue-black stamp reading Restricted, adults only, with the number 18 in the centre"
      viewBox="0 0 200 200"
      className="mx-auto w-full max-w-56"
    >
      <defs>
        <DistressFilter id="ar-distress-restricted" seed={9} />
        <path id="ar-ring" d="M100 100 m-70 0 a70 70 0 1 1 140 0 a70 70 0 1 1 -140 0" />
      </defs>
      <g filter="url(#ar-distress-restricted)" transform="rotate(12 100 100)" fill="none" stroke="var(--ar-blue)">
        <circle cx="100" cy="100" r="92" strokeWidth="4" />
        <circle cx="100" cy="100" r="50" strokeWidth="2" />
        <text fontSize="13" fill="var(--ar-blue)" stroke="none" fontFamily="var(--font-ar-mono)" letterSpacing="1.5">
          <textPath href="#ar-ring">RESTRICTED · ADULTS ONLY · BY ORDER ·</textPath>
        </text>
        <text x="100" y="116" textAnchor="middle" fontSize="46" fill="var(--ar-blue)" stroke="none" fontFamily="var(--font-ar-display)">
          18
        </text>
      </g>
    </svg>
  );
}

const dueDates = [
  { date: "12 MAR 1987", ink: "text-(--ar-red)", tilt: "-rotate-2" },
  { date: "03 OCT 1989", ink: "text-(--ar-blue)", tilt: "rotate-1" },
  { date: "31 OCT 1992", ink: "text-(--ar-red)", tilt: "rotate-2" },
  { date: "14 FEB 1997", ink: "text-(--ar-blue)", tilt: "-rotate-1" },
  { date: "22 JUN 2001", ink: "text-(--ar-red)", tilt: "rotate-1" },
];

function DateDueSlip() {
  return (
    <div className="mx-auto max-w-56 bg-[#efe7d2] px-4 py-5">
      <p className="ar-smallcaps border-b-2 border-(--ar-ink) pb-1 text-center tracking-[0.2em]">Date due</p>
      <ul className="ar-mono divide-y divide-(--ar-feint) text-sm">
        {dueDates.map((d) => (
          <li key={d.date} className="py-2">
            <span className={`inline-block font-medium ${d.ink} ${d.tilt} opacity-85`}>{d.date}</span>
          </li>
        ))}
        <li className="py-2">&nbsp;</li>
      </ul>
    </div>
  );
}

function FilmCanLabel() {
  return (
    <div className="ar-tin mx-auto grid aspect-square w-full max-w-64 place-items-center rounded-full border-[6px] border-[#8c887f] shadow-[inset_0_0_0_10px_rgb(0_0_0/0.08)]">
      <div className="ar-grain w-[62%] -rotate-3 bg-(--ar-paper) px-3 py-2 text-center shadow">
        <p className="ar-display text-lg leading-tight">Eraserhead</p>
        <p className="ar-mono mt-1 text-[0.65rem] tracking-wider">REEL 2 OF 5</p>
        <p className="ar-mono text-[0.65rem] tracking-wider text-(--ar-muted)">35MM · B/W</p>
      </div>
    </div>
  );
}

function AdmissionStub() {
  return (
    <div className="ar-shadow max-w-md">
      <div className="ar-perforated ar-torn ar-grain flex bg-[#e9c9a8]">
        <div className="flex-1 border-r-2 border-dashed border-(--ar-ink)/40 py-4 pr-4 pl-7">
          <p className="ar-smallcaps text-sm tracking-[0.25em]">Admit one</p>
          <p className="ar-display mt-1 text-3xl leading-none">Blue Velvet</p>
          <p className="ar-oldstyle mt-1 text-sm italic">The Midnight Programme · 1986</p>
          <p className="ar-mono mt-3 text-xs">ROW F · SEAT 13</p>
        </div>
        <div className="flex w-20 items-center justify-center">
          <p className="ar-mono -rotate-90 text-xs whitespace-nowrap text-(--ar-red)">Nº 004417</p>
        </div>
      </div>
    </div>
  );
}

function DrawerLabel() {
  return (
    <div className="ar-shadow grid h-44 place-items-center bg-linear-to-b from-[#7a5a3a] to-[#5f4329] p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="border-4 border-(--ar-brass) bg-(--ar-brass) p-0.5 shadow">
          <p className="ar-mono bg-[#f7f3ea] px-4 py-1 text-sm tracking-widest">LUMIÈRE — LYNCH</p>
        </div>
        <div aria-hidden="true" className="h-5 w-20 rounded-b-full border-4 border-t-0 border-(--ar-brass)" />
      </div>
    </div>
  );
}

/* V. Toward an Interface ------------------------------------------------- */

function CatalogueEntry() {
  return (
    <article className="grid gap-5 sm:grid-cols-[9rem_1fr]">
      <dl className="ar-mono space-y-2 border-(--ar-ink)/30 text-xs sm:border-r sm:pr-4">
        <div>
          <dt className="text-(--ar-muted)">ACC. NO.</dt>
          <dd className="text-(--ar-red)">CCW-1986-011</dd>
        </div>
        <div>
          <dt className="text-(--ar-muted)">DIRECTOR</dt>
          <dd>Lynch, David</dd>
        </div>
        <div>
          <dt className="text-(--ar-muted)">COUNTRY · YEAR</dt>
          <dd>USA · 1986</dd>
        </div>
        <div>
          <dt className="text-(--ar-muted)">RUNNING</dt>
          <dd>120 min</dd>
        </div>
      </dl>
      <div>
        <h3 className="ar-display text-3xl">Blue Velvet</h3>
        <p className="ar-oldstyle mt-2 leading-relaxed">
          A severed ear in a suburban field opens onto a second, nocturnal town beneath the picket
          fences. Lynch stages small-town innocence and its underside within the same frame.
        </p>
        <p className="ar-smallcaps mt-3 border-t border-(--ar-ink)/30 pt-2 text-sm text-(--ar-muted)">
          Themes · Voyeurism · Suburbia · Dream logic
        </p>
      </div>
    </article>
  );
}

function SeeAlso() {
  return (
    <div className="border-l-2 border-(--ar-red) pl-4 italic">
      <p className="ar-smallcaps text-sm text-(--ar-red) not-italic">See also</p>
      <ul className="ar-oldstyle mt-2 space-y-3">
        <li>
          → <span className="not-italic">Videodrome</span>, 1983
          <span className="ar-mono block text-xs not-italic text-(--ar-muted)">CCW-1983-004 · television as a body</span>
        </li>
        <li>
          → <span className="not-italic">Dead Ringers</span>, 1988
          <span className="ar-mono block text-xs not-italic text-(--ar-muted)">CCW-1988-019 · instruments of the flesh</span>
        </li>
      </ul>
    </div>
  );
}

const tabs = [
  { label: "Director", offset: "ml-0", bg: "bg-[#d9cfb9]" },
  { label: "Decade", offset: "ml-[30%]", bg: "bg-[#e1d8c4]" },
  { label: "Theme", offset: "ml-[60%]", bg: "bg-[#ebe3d2]" },
];

function DrawerTabs() {
  return (
    <div className="text-(--ar-ink)">
      {tabs.map((t, i) => (
        <div key={t.label} className={i > 0 ? "-mt-8" : ""}>
          <p className={`ar-mono inline-block rounded-t-md px-4 pt-1.5 pb-1 text-xs tracking-wider uppercase ${t.offset} ${t.bg}`}>
            {t.label}
          </p>
          <div className={`h-12 border-t border-(--ar-ink)/10 ${t.bg} ${i === tabs.length - 1 ? "h-auto px-4 pt-3 pb-4" : ""}`}>
            {i === tabs.length - 1 && (
              <p className="ar-oldstyle text-sm">Body horror · Dream logic · Doubles · Transmission · The domestic uncanny</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Blank({ label, value, width = "flex-1" }: { label: string; value?: string; width?: string }) {
  return (
    <p className={`flex items-baseline gap-2 ${width}`}>
      <span className="ar-smallcaps shrink-0 text-sm">{label}</span>
      <span className="ar-mono flex-1 border-b border-(--ar-ink) px-1 text-sm text-(--ar-blue)">
        {value ?? " "}
      </span>
    </p>
  );
}

function RequestSlip() {
  return (
    <div className="bg-[#f7f3ea] p-5 text-(--ar-ink)">
      <p className="ar-display text-center text-xl">Reading Room — Request Slip</p>
      <p className="mb-4 text-center text-xs italic">Please write clearly. One title per slip.</p>
      <div className="space-y-3">
        <div className="flex gap-4">
          <Blank label="Call no." value="CCW-1981-007" />
          <Blank label="Seat" value="12" width="w-24" />
        </div>
        <Blank label="Title" value="Scanners (Cronenberg)" />
        <Blank label="Reader" />
      </div>
      <p className="mt-4 flex gap-6 text-sm">
        <span>
          <span className="ar-mono text-(--ar-red)">[✓]</span> Screening print
        </span>
        <span>
          <span className="ar-mono">[ ]</span> Viewing copy
        </span>
      </p>
    </div>
  );
}

/* VI. From the Public Domain ------------------------------------------ */

function ArchivalImage({
  artifact,
  sizes,
  className = "",
}: {
  artifact: Artifact;
  sizes: string;
  className?: string;
}) {
  const image = artifact.image;
  if (!image) return null;
  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      sizes={sizes}
      className={`block h-auto w-full ${className}`}
    />
  );
}

/* Registry --------------------------------------------------------------- */

export type PlateSpec = {
  frame: Frame;
  /** Grid placement; literal class strings so Tailwind can see them. */
  className: string;
  tilt?: string;
  captionSide?: boolean;
  render: (artifact: Artifact) => ReactNode;
};

export const plates: Record<string, PlateSpec> = {
  "AR-01": { frame: "sheet", className: "md:col-span-6 lg:col-span-7", render: () => <InkChips /> },
  "AR-02": { frame: "bare", className: "md:col-span-6 lg:col-span-5 lg:pt-10", render: () => <PaperStocks /> },
  "AR-03": { frame: "bare", className: "md:col-span-3 lg:col-span-5 lg:pt-6", render: () => <FadedInk /> },
  "AR-04": { frame: "bare", className: "md:col-span-3 lg:col-span-7", tilt: "rotate-1", render: () => <RedBluePencil /> },

  "AR-05": { frame: "bare", className: "md:col-span-6 lg:col-span-12", render: () => <DisplaySpecimen /> },
  "AR-06": { frame: "bare", className: "md:col-span-6 lg:col-span-7", render: () => <ProgrammeNote /> },
  "AR-07": { frame: "pinned", className: "md:col-span-3 lg:col-span-5 lg:pt-8", tilt: "-rotate-1", render: () => <CatalogueTypescript /> },
  "AR-08": { frame: "bare", className: "md:col-span-3 lg:col-span-4 lg:self-center", render: () => <SmallCaps /> },
  "AR-09": { frame: "sheet", className: "md:col-span-3 lg:col-span-4", render: () => <TitlePage /> },
  "AR-10": { frame: "bare", className: "md:col-span-3 lg:col-span-4 lg:self-center", render: () => <AccessionNumerals /> },

  "AR-11": { frame: "bare", className: "md:col-span-2 lg:col-span-3", render: () => <PaperGrain /> },
  "AR-12": { frame: "bare", className: "md:col-span-4 lg:col-span-5 lg:pt-12", tilt: "-rotate-2", render: () => <IndexCardRuling /> },
  "AR-13": { frame: "bare", className: "md:col-span-2 lg:col-span-4", render: () => <Foxing /> },
  "AR-14": { frame: "bare", className: "md:col-span-4 lg:col-span-4 lg:pt-8", render: () => <RulesAndFleurons /> },
  "AR-15": { frame: "bare", className: "md:col-span-6 lg:col-span-8", render: () => <Marginalia /> },

  "AR-16": { frame: "bare", className: "md:col-span-3 lg:col-span-4", render: () => <ViewedStamp /> },
  "AR-17": { frame: "bare", className: "md:col-span-3 lg:col-span-3 lg:pt-10", render: () => <RestrictedStamp /> },
  "AR-18": { frame: "bare", className: "md:col-span-2 lg:col-span-2", tilt: "rotate-2", render: () => <DateDueSlip /> },
  "AR-19": { frame: "bare", className: "md:col-span-4 lg:col-span-3", render: () => <FilmCanLabel /> },
  "AR-20": { frame: "bare", className: "md:col-span-6 lg:col-span-7 lg:pt-10", tilt: "-rotate-1", render: () => <AdmissionStub /> },
  "AR-21": { frame: "bare", className: "md:col-span-6 lg:col-span-5", render: () => <DrawerLabel /> },

  "AR-22": { frame: "sheet", className: "md:col-span-6 lg:col-span-12", captionSide: true, render: () => <CatalogueEntry /> },
  "AR-23": { frame: "pinned", className: "md:col-span-3 lg:col-span-4", tilt: "rotate-1", render: () => <SeeAlso /> },
  "AR-24": { frame: "bare", className: "md:col-span-3 lg:col-span-4 lg:pt-6", render: () => <DrawerTabs /> },
  "AR-25": { frame: "bare", className: "md:col-span-6 lg:col-span-4", tilt: "-rotate-1", render: () => <RequestSlip /> },

  "AR-26": {
    frame: "mount",
    className: "md:col-span-3 lg:col-span-5",
    tilt: "-rotate-1",
    render: (a) => <ArchivalImage artifact={a} sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw" />,
  },
  "AR-27": {
    frame: "mount",
    className: "md:col-span-3 lg:col-span-7 lg:self-center",
    render: (a) => <ArchivalImage artifact={a} sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw" />,
  },
  "AR-28": {
    frame: "bare",
    className: "md:col-span-6 lg:col-span-12",
    render: (a) => (
      <ArchivalImage
        artifact={a}
        sizes="(min-width: 1280px) 1216px, 100vw"
        className="aspect-[16/9] object-cover sepia-[.25] md:aspect-[21/9]"
      />
    ),
  },
  "AR-29": {
    frame: "mount",
    className: "md:col-span-4 lg:col-span-7 lg:self-center",
    tilt: "rotate-1",
    render: (a) => <ArchivalImage artifact={a} sizes="(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw" className="sepia-[.25]" />,
  },
  "AR-30": {
    frame: "mount",
    className: "md:col-span-2 lg:col-span-4 lg:col-start-9",
    tilt: "-rotate-2",
    render: (a) => <ArchivalImage artifact={a} sizes="(min-width: 1024px) 28vw, (min-width: 768px) 33vw, 100vw" />,
  },
};
