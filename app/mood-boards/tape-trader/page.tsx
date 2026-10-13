import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Anton, Courier_Prime, Permanent_Marker, VT323 } from "next/font/google";
import { tapeTrader as board, tapeTraderFonts } from "@/data/mood-boards/tape-trader";
import { clips, RansomWord } from "./_components/artworks";
import { Clipping } from "./_components/clipping";
import "./board.css";

const display = Anton({ weight: "400", subsets: ["latin"], variable: "--font-tt-display" });
const type = Courier_Prime({ weight: ["400", "700"], style: ["normal", "italic"], subsets: ["latin"], variable: "--font-tt-type" });
const screen = VT323({ weight: "400", subsets: ["latin"], variable: "--font-tt-screen" });
const hand = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--font-tt-hand" });

export const metadata: Metadata = {
  title: "Mood Board 03: Tape Trader · Cult Cinema Watchlist",
  description:
    "A handmade visual direction for the Cult Cinema Watchlist: a 1993 bootleg VHS trading list photocopied onto an early personal homepage.",
};

// Loose scraps stuck around each track heading: they break the grid without
// ever covering an artifact or its label, and are left out on small screens.
const strays: Record<string, ReactNode> = {
  toner: <p className="tt-marker -rotate-6 text-3xl text-(--tt-red)">the good stuff ↓↓</p>,
  ransom: (
    <p className="tt-anton grid size-24 rotate-12 place-items-center rounded-full bg-(--tt-red) text-2xl text-white shadow-[2px_3px_0_#111]">
      NEW!
    </p>
  ),
  xerox: (
    <p className="tt-tape tt-marker rotate-3 px-6 py-2 text-xl">do not copy (ha!)</p>
  ),
  contraband: (
    <p className="tt-anton -rotate-12 border-4 border-(--tt-red) px-3 py-1 text-3xl tracking-wider text-(--tt-red)">
      CONFISCATED?
    </p>
  ),
  homepage: <p className="tt-marker rotate-6 text-2xl text-(--tt-blue)">sign my guestbook!!</p>,
  "found-footage": <p className="tt-marker -rotate-3 text-3xl text-(--tt-red)">gross!! ↓</p>,
};

function SideBanner({ side }: { side: "A" | "B" }) {
  return (
    <div className="flex items-center gap-4 border-y-4 border-(--tt-toner) bg-(--tt-toner) px-4 py-2 text-(--tt-paper) sm:px-8">
      <svg aria-hidden="true" viewBox="0 0 60 36" className="w-12 shrink-0 sm:w-14">
        <rect x="1" y="1" width="58" height="34" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="17" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="42" cy="17" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M14 30 H46" stroke="currentColor" strokeWidth="2" />
      </svg>
      <p className="tt-anton text-3xl tracking-wider sm:text-4xl">SIDE {side}</p>
      {side === "B" && <p className="tt-vt ml-auto text-xl sm:text-2xl">FLIP THE TAPE ▶</p>}
    </div>
  );
}

export default function TapeTraderBoard() {
  return (
    <div className={`tt ${display.variable} ${type.variable} ${screen.variable} ${hand.variable} flex-1 overflow-x-clip`}>
      <a href="#tracks" className="tt-skip sr-only bg-(--tt-yellow) px-3 py-2 font-bold focus:not-sr-only">
        Skip to the tracks
      </a>

      <nav aria-label="Tracks" className="tt-vcr sticky top-0 z-30 border-b-2 border-black bg-[#151514] text-(--tt-paper)">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2">
          <span aria-hidden="true" className="tt-vt hidden shrink-0 text-xl text-(--tt-cyan) sm:inline">
            ◀◀ ▶ ▶▶
          </span>
          <ol className="flex gap-1.5 overflow-x-auto">
            {board.sections.map((s) => (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  className="tt-vt block rounded-sm border border-[#3a3a37] bg-[#232321] px-2 py-0.5 text-lg leading-tight whitespace-nowrap text-(--tt-paper) hover:border-(--tt-yellow) hover:text-(--tt-yellow)"
                >
                  {s.numeral} {s.title.toUpperCase()}
                </a>
              </li>
            ))}
          </ol>
          <span aria-hidden="true" className="tt-vt ml-auto hidden shrink-0 text-xl text-(--tt-cyan) md:inline">
            0:00:00 SP
          </span>
        </div>
      </nav>

      <div className="px-2 py-5 sm:px-6 sm:py-8">
        <div className="tt-paper mx-auto max-w-6xl border-[6px] border-[#9a9a94] [border-style:ridge] shadow-[6px_8px_0_rgb(0_0_0/0.5)]">
          <div aria-hidden="true" className="tt-hazard h-3" />

          <header className="px-4 pt-5 pb-10 sm:px-8">
            <p className="tt-web flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
              <Link href="/" className="text-(--tt-blue) underline hover:bg-(--tt-yellow)">
                ← Back to the index
              </Link>
              <span>Mood board {board.number} of 03 · best viewed at 800×600</span>
            </p>

            <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <h1 className="-ml-1">
                  <RansomWord text="TAPE TRADER" size="text-5xl sm:text-7xl lg:text-8xl" />
                </h1>
                <p className="mt-5 font-bold">List #14 · Fall 1993 · underground video since &apos;87</p>
                <p className="mt-3 max-w-2xl leading-relaxed">{board.concept}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {board.keywords.map((k, i) => (
                    <li
                      key={k}
                      className={`tt-anton px-2 py-0.5 text-lg tracking-wider ${
                        ["bg-(--tt-yellow) -rotate-2", "bg-(--tt-pink) rotate-1", "bg-(--tt-cyan) -rotate-1"][i % 3]
                      }`}
                    >
                      {k.toUpperCase()}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tt-web w-fit border-2 border-(--tt-toner) bg-white p-3 text-center text-sm lg:rotate-2">
                <p>You are visitor number</p>
                <p className="tt-vt mt-1 flex justify-center gap-0.5 text-3xl">
                  {"001983".split("").map((d, i) => (
                    <span key={i} className="bg-(--tt-toner) px-1.5 text-(--tt-cyan)">
                      {d}
                    </span>
                  ))}
                </p>
                <p className="mt-1 text-xs">since 10/31/1997</p>
              </div>
            </div>
          </header>

          <main id="tracks" tabIndex={-1} className="focus:outline-none">
            {board.sections.map((section, i) => {
              const artifacts = board.artifacts.filter((a) => a.section === section.id);
              const side = section.numeral.startsWith("A") ? "A" : "B";
              const prevSide = i > 0 && board.sections[i - 1].numeral.startsWith("A") ? "A" : i > 0 ? "B" : null;
              return (
                <div key={section.id}>
                  {side !== prevSide && <SideBanner side={side} />}
                  <section id={section.id} aria-labelledby={`${section.id}-title`} className="px-4 pt-8 pb-14 sm:px-8">
                    <header className="mb-10 flex flex-wrap items-end gap-x-5 gap-y-2">
                      <p className="tt-vt bg-(--tt-toner) px-2 text-4xl leading-tight text-(--tt-cyan)">{section.numeral}</p>
                      <h2 id={`${section.id}-title`} className="tt-anton text-5xl leading-none uppercase sm:text-6xl">
                        <span className="sr-only">Track {section.numeral}: </span>
                        <span className="bg-[linear-gradient(transparent_55%,var(--tt-pink)_55%,var(--tt-pink)_90%,transparent_90%)] px-1">
                          {section.title}
                        </span>
                      </h2>
                      <p className="w-full max-w-xl text-[0.95rem] lg:w-auto lg:max-w-md lg:flex-1">{section.blurb}</p>
                      <div aria-hidden="true" className="hidden shrink-0 self-start lg:ml-auto lg:block">
                        {strays[section.id]}
                      </div>
                    </header>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-6 lg:grid-cols-12">
                      {artifacts.map((artifact) => {
                        const spec = clips[artifact.id];
                        return (
                          <Clipping
                            key={artifact.id}
                            artifact={artifact}
                            className={spec.className}
                            tilt={spec.tilt}
                            fix={spec.fix}
                            surface={spec.surface}
                          >
                            {spec.render(artifact)}
                          </Clipping>
                        );
                      })}
                    </div>
                  </section>
                </div>
              );
            })}

            <section id="liner-notes" aria-labelledby="liner-title" className="border-t-4 border-(--tt-toner) px-4 py-12 sm:px-8">
              <div className="mx-auto max-w-4xl border-2 border-dashed border-(--tt-toner) bg-white p-5 sm:p-8">
                <h2 id="liner-title" className="tt-anton text-4xl uppercase">
                  Liner notes
                </h2>
                <p className="mt-2 text-sm">
                  Sources &amp; licences for every item on this list. Public-domain images were checked against
                  the rights statement on their own file pages.
                </p>
                <ol className="mt-6 columns-1 gap-8 text-sm md:columns-2">
                  {board.artifacts.map((a) => (
                    <li key={a.id} className="mb-3 break-inside-avoid">
                      <a href={`#${a.id.toLowerCase()}`} className="font-bold text-(--tt-blue) underline hover:bg-(--tt-yellow)">
                        {a.id}
                      </a>{" "}
                      <span className="font-bold">{a.title}</span>
                      {a.source.type === "external" ? (
                        <span className="block">
                          {a.source.creator}, <em>{a.source.work}</em> ({a.source.date}).{" "}
                          {a.source.heldBy && <>{a.source.heldBy}. </>}
                          {a.source.licence}: {a.source.rightsStatement}{" "}
                          {a.source.modifications && <>Changes: {a.source.modifications} </>}
                          Checked {a.source.retrieved}.{" "}
                          <a href={a.source.url} className="text-(--tt-blue) underline hover:bg-(--tt-yellow)">
                            File page
                          </a>
                        </span>
                      ) : a.source.type === "original" ? (
                        <span className="block">Original work for this project ({a.source.medium}).</span>
                      ) : (
                        <span className="block">Pending verification.</span>
                      )}
                    </li>
                  ))}
                </ol>
                <h3 className="mt-6 font-bold uppercase">Typefaces</h3>
                <ul className="mt-1 text-sm">
                  {tapeTraderFonts.map((f) => (
                    <li key={f.family}>
                      {f.family} — {f.designer} ·{" "}
                      <a href={f.licenceUrl} className="text-(--tt-blue) underline hover:bg-(--tt-yellow)">
                        {f.licence}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm">
                  Film titles and dates are used descriptively. The list, prices, slogans, stickers, forms and
                  notes are invented for this project; no real trader, shop or address is depicted.
                </p>
              </div>
            </section>
          </main>

          <footer className="tt-web border-t-2 border-(--tt-toner) bg-white px-4 py-4 text-center text-sm">
            <nav aria-label="Mood boards webring">
              [{" "}
              <Link href="/mood-boards/somnambulist" className="text-(--tt-blue) underline hover:bg-(--tt-yellow)">
                &lt;&lt; prev board
              </Link>{" "}
              | The Cult VHS Ring |{" "}
              <Link href="/" className="text-(--tt-blue) underline hover:bg-(--tt-yellow)">
                index
              </Link>{" "}
              |{" "}
              <Link href="/mood-boards/accession-record" className="text-(--tt-blue) underline hover:bg-(--tt-yellow)">
                next board &gt;&gt;
              </Link>{" "}
              ]
            </nav>
          </footer>
        </div>
      </div>
    </div>
  );
}
