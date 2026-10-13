import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Anton, Courier_Prime, Permanent_Marker, VT323 } from "next/font/google";
import { films } from "@/data/films";
import { colors, contrastPairs, grid, motion, principles, spacing, typeScale } from "@/data/design-systems/tape-trader";
import { formatRatio, wcag } from "@/lib/contrast";
import { a11yChecks } from "./a11y";
import { ButtonsDemo, FilmCardDemo, RetrievalDemo, ShelfDemo } from "./_components/demos";
import { TrackNav } from "./_components/track-nav";
import { Button, Dot, FilmCard, MyList, NoSignal, Note, RansomWord, Review, SeenSticker, Strip, type ForcedState } from "./_components/ui";
import "./system.css";

const display = Anton({ weight: "400", subsets: ["latin"], variable: "--font-tt-display" });
const type = Courier_Prime({ weight: ["400", "700"], style: ["normal", "italic"], subsets: ["latin"], variable: "--font-tt-type" });
const screen = VT323({ weight: "400", subsets: ["latin"], variable: "--font-tt-screen" });
const hand = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--font-tt-hand" });

export const metadata: Metadata = {
  title: "Design System 03: Tape Trader · Cult Cinema Watchlist",
  description:
    "Tokens, type, cut-and-paste layout, components, states and accessibility notes for the loud, photocopied Tape Trader direction.",
};

const tracks = [
  { id: "manifesto", n: "A1", title: "Manifesto" },
  { id: "toner", n: "A2", title: "Toner" },
  { id: "ransom", n: "A3", title: "Ransom" },
  { id: "cut-and-paste", n: "A4", title: "Cut & paste" },
  { id: "kit", n: "B5", title: "Contraband kit" },
  { id: "error-codes", n: "B6", title: "Error codes" },
  { id: "fine-print", n: "B7", title: "Fine print" },
];

function SideBanner({ side }: { side: "A" | "B" }) {
  return (
    <div className="flex items-center gap-4 bg-(--tt-toner) px-4 py-2 text-(--tt-paper) sm:px-8">
      <svg aria-hidden="true" viewBox="0 0 60 36" className="w-12 shrink-0">
        <rect x="1" y="1" width="58" height="34" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="17" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="42" cy="17" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      <p className="f-anton text-3xl tracking-wider">SIDE {side}</p>
      {side === "B" && <p className="f-vt ml-auto text-2xl">FLIP THE TAPE ▶</p>}
    </div>
  );
}

function Track({
  id,
  n,
  title,
  blurb,
  scrawl,
  children,
}: {
  id: string;
  n: string;
  title: string;
  blurb: string;
  scrawl?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="px-4 pt-8 pb-12 sm:px-8">
      <header className="mb-8 flex flex-wrap items-end gap-x-5 gap-y-2">
        <p className="f-vt bg-(--tt-toner) px-2 text-4xl leading-tight text-(--tt-cyan)">{n}</p>
        <h2 id={`${id}-title`} className="f-anton text-5xl leading-none uppercase sm:text-6xl">
          <span className="sr-only">Track {n}: </span>
          <span className="bg-[linear-gradient(transparent_55%,var(--tt-pink)_55%,var(--tt-pink)_90%,transparent_90%)] px-1">{title}</span>
        </h2>
        <p className="w-full max-w-xl text-[0.95rem] lg:w-auto lg:max-w-md lg:flex-1">{blurb}</p>
        {scrawl && (
          <div aria-hidden="true" className="hidden shrink-0 self-start lg:ml-auto lg:block">
            {scrawl}
          </div>
        )}
      </header>
      {children}
    </section>
  );
}

/** A taped sheet holding one component or topic. */
function Sheet({ title, use, className = "", children }: { title: string; use?: string; className?: string; children: ReactNode }) {
  return (
    <div className={`paper relative border-2 border-(--tt-toner) p-4 shadow-[6px_6px_0_#111] sm:p-5 ${className}`}>
      <span aria-hidden="true" className="tape absolute -top-3 left-6 h-6 w-20 -rotate-3" />
      <h3 className="f-anton text-3xl uppercase">{title}</h3>
      {use && <p className="mt-1 max-w-2xl text-[0.95rem]">{use}</p>}
      <div className="mt-5 space-y-6">{children}</div>
    </div>
  );
}

function States({
  label = "Every state, frozen",
  dark = false,
  cells,
}: {
  label?: string;
  /** On the dark bar, captions switch to copier paper for contrast. */
  dark?: boolean;
  cells: { state: string; node: ReactNode }[];
}) {
  return (
    <div>
      <p className="dymo mb-4 text-xs">{label}</p>
      <ul className="flex flex-wrap items-end gap-x-6 gap-y-6">
        {cells.map((c) => (
          <li key={c.state} className="grid justify-items-start gap-2">
            <div inert>{c.node}</div>
            <span className={`text-sm ${dark ? "text-(--tt-paper)" : "text-(--tt-grey)"}`}>{c.state}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Live({ children }: { children: ReactNode }) {
  return (
    <div className="border-2 border-dashed border-(--tt-toner) bg-white p-4 sm:p-5">
      <p className="f-anton mb-4 inline-block bg-(--tt-cyan) px-2 text-lg">LIVE! mouse, keyboard or screen reader</p>
      {children}
    </div>
  );
}

const btnStates: { label: string; state?: ForcedState }[] = [
  { label: "rest" },
  { label: "hover", state: "hover" },
  { label: "focus", state: "focus" },
  { label: "pressed", state: "active" },
  { label: "disabled", state: "disabled" },
];

export default function TapeTraderSystem() {
  const sample = films.find((f) => f.id === "scanners")!;
  const longTitle = {
    ...films.find((f) => f.id === "tetsuo")!,
    title: "Tetsuo: The Iron Man (Uncut Japanese Import, Fan-Subtitled, Third Generation Dub With Trailers)",
  };

  return (
    <div className={`ds-tt ${display.variable} ${type.variable} ${screen.variable} ${hand.variable} flex-1 overflow-x-clip`}>
      <a href="#manifesto" className="ds-tt-skip sr-only bg-(--tt-yellow) px-3 py-2 font-bold focus:not-sr-only">
        Skip to track A1
      </a>

      <TrackNav tracks={tracks} />

      <div className="px-2 py-5 sm:px-6 sm:py-8">
        <div className="paper mx-auto max-w-6xl border-[6px] border-[#9a9a94] [border-style:ridge] shadow-[6px_8px_0_rgb(0_0_0/0.5)]">
          <div aria-hidden="true" className="hazard h-3" />

          <header className="px-4 pt-5 pb-10 sm:px-8">
            <nav aria-label="Site" className="f-web flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
              <Link href="/" className="tt-link inline-block py-1">
                ← Back to the index
              </Link>
              <Link href="/mood-boards/tape-trader" className="tt-link inline-block py-1">
                Mood board 03 →
              </Link>
            </nav>
            <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="dymo text-xs">Design system 03 · the contraband kit</p>
                <h1 className="mt-4 -ml-1">
                  <RansomWord text="TAPE TRADER" size="text-5xl sm:text-7xl lg:text-8xl" />
                </h1>
                <p className="mt-5 max-w-2xl">
                  How the photocopied trading list behaves as an interface: loud stickers, hard shadows, and controls you
                  press down into the page. The mess is decoration. The words and buttons stay readable.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {["LOUD", "HANDMADE", "PRESSABLE"].map((k, i) => (
                    <li key={k} className={`f-anton px-2 py-0.5 text-lg tracking-wider ${["bg-(--tt-yellow) -rotate-2", "bg-(--tt-pink) rotate-1", "bg-(--tt-cyan) -rotate-1"][i]}`}>
                      {k}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="f-web w-fit border-2 border-(--tt-toner) bg-white p-3 text-center text-sm lg:rotate-2">
                <p>You are visitor number</p>
                <p className="f-vt mt-1 flex justify-center gap-0.5 text-3xl">
                  {"004471".split("").map((d, i) => (
                    <span key={i} className="bg-(--tt-toner) px-1.5 text-[#7cfc00]">
                      {d}
                    </span>
                  ))}
                </p>
                <p className="mt-1 text-xs">best viewed at 800×600</p>
              </div>
            </div>
          </header>

          <main>
            <SideBanner side="A" />

            <Track id="manifesto" n="A1" title="Manifesto" blurb="Three rules, photocopied and stapled to every page of the kit." scrawl={<p className="f-marker -rotate-6 text-3xl text-(--tt-red)">read this!!</p>}>
              <ol className="grid gap-8 md:grid-cols-3">
                {principles.map((p, i) => (
                  <li key={p.title} className={`relative border-2 border-(--tt-toner) bg-white p-5 shadow-[6px_6px_0_#111] ${["md:-rotate-1", "md:mt-8 md:rotate-1", "md:-rotate-[0.5deg]"][i]}`}>
                    <span aria-hidden="true" className="tape absolute -top-3 right-6 h-6 w-16 rotate-3" />
                    <p className="f-anton inline-block bg-(--tt-yellow) px-2 text-3xl">#{i + 1}</p>
                    <h3 className="f-anton mt-3 text-2xl uppercase">{p.title}</h3>
                    <p className="mt-2">{p.body}</p>
                  </li>
                ))}
              </ol>
            </Track>

            <Track id="toner" n="A2" title="Toner" blurb="Copier black, three highlighters, one red that is never small text. Every ratio is calculated from the tokens.">
              <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
                {colors.map((c, i) => (
                  <li key={c.token} className={`border-2 border-(--tt-toner) bg-white p-2 shadow-[3px_3px_0_#111] ${i % 3 === 1 ? "rotate-1" : i % 3 === 2 ? "-rotate-1" : ""}`}>
                    <div className="h-14 border-2 border-(--tt-toner)" style={{ backgroundColor: c.hex }} />
                    <p className="f-anton mt-2 text-lg leading-tight uppercase">{c.name}</p>
                    <p className="text-xs">{c.hex}</p>
                    <p className="mt-1 text-xs text-(--tt-grey)">{c.role}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-2 border-(--tt-toner) bg-white p-4 sm:p-5">
                <h3 className="f-anton text-3xl uppercase">Contrast, checked</h3>
                <div className="mt-4 overflow-x-auto" role="region" aria-label="Contrast ratios (scrolls sideways)" tabIndex={0}>
                  <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                    <caption className="sr-only">Contrast ratios for colour pairs</caption>
                    <thead>
                      <tr className="border-b-2 border-(--tt-toner)">
                        <th scope="col" className="py-2 pr-3">SAMPLE</th>
                        <th scope="col" className="py-2 pr-3">USE</th>
                        <th scope="col" className="py-2 pr-3">RATIO</th>
                        <th scope="col" className="py-2">VERDICT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contrastPairs.map((p) => {
                        const r = wcag(p.fg, p.bg);
                        const pass = p.size === "text" ? r.aa : r.aaLarge;
                        const banned = p.use.includes("not allowed");
                        return (
                          <tr key={p.use} className="border-b border-dashed border-(--tt-toner)/40">
                            <td className="py-2 pr-3">
                              {p.size === "ui" ? (
                                <span aria-hidden="true" className="inline-flex h-9 w-14 items-center px-2" style={{ backgroundColor: p.bg }}>
                                  <span className="h-[3px] w-full" style={{ backgroundColor: p.fg }} />
                                </span>
                              ) : banned ? (
                                <span aria-hidden="true" className="inline-flex h-9 w-14 items-center justify-center text-xs" style={{ backgroundColor: p.bg }}>
                                  <span className="h-3 w-8" style={{ backgroundColor: p.fg }} />
                                </span>
                              ) : (
                                <span className="f-anton inline-block px-2 text-xl" style={{ color: p.fg, backgroundColor: p.bg }}>
                                  Aa
                                </span>
                              )}
                            </td>
                            <th scope="row" className="py-2 pr-3 font-normal">
                              {p.use}
                              <span className="block text-xs text-(--tt-grey)">
                                {p.fg} on {p.bg}
                              </span>
                            </th>
                            <td className="f-vt py-2 pr-3 text-xl">{formatRatio(r.ratio)}</td>
                            <td className="py-2 font-bold">
                              {banned ? (
                                <span className="text-(--tt-blood)">✕ FAILS — so it is never used this way</span>
                              ) : pass ? (
                                <span>✓ PASS · {p.size === "text" ? "AA text" : "UI 3:1"}{p.size === "text" && r.aaa ? " · AAA" : ""}</span>
                              ) : (
                                <span className="text-(--tt-blood)">✕ FAIL</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </Track>

            <Track id="ransom" n="A3" title="Ransom" blurb="Five voices, each with a job. Mixed on purpose, never more than three on one screen." scrawl={<p className="f-marker rotate-3 text-2xl text-(--tt-blue)">fonts r legal (OFL)</p>}>
              <div className="border-2 border-(--tt-toner) bg-white shadow-[6px_6px_0_#111]">
                {typeScale.map((t) => {
                  const face =
                    t.role === "Annotation" ? "f-marker" : t.role === "Web" ? "f-web" : t.family === "display" ? "f-anton" : t.family === "mono" ? "f-vt" : "";
                  const faceName =
                    t.role === "Annotation" ? "Permanent Marker" : t.role === "Web" ? "System Times" : t.family === "display" ? "Anton" : t.family === "mono" ? "VT323" : "Courier Prime";
                  return (
                    <div key={t.role} className="grid gap-2 border-b-2 border-dashed border-(--tt-toner)/40 p-4 last:border-b-0 md:grid-cols-[12rem_1fr] md:gap-6">
                      <div className="text-sm">
                        <p className="dymo text-xs">{t.role}</p>
                        <p className="mt-1">
                          {faceName} · {t.px} px / {t.lineHeight}
                        </p>
                        <p className="text-(--tt-grey)">{t.note}</p>
                      </div>
                      <p
                        className={`min-w-0 [overflow-wrap:anywhere] ${face} ${t.family === "display" && t.role !== "Annotation" ? "uppercase" : ""} ${t.role === "Annotation" ? "text-(--tt-red)" : ""}`}
                        style={{ fontSize: t.role === "Display" ? "clamp(2.75rem, 10vw, 5rem)" : t.size, lineHeight: t.lineHeight }}
                      >
                        {t.sample}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Track>

            <Track id="cut-and-paste" n="A4" title="Cut & paste" blurb="A 4 px base, thick borders, hard shadows, tape. Tight like a noticeboard; snappy, never flashy.">
              <div className="grid gap-8 lg:grid-cols-12">
                <Sheet title="Spacing" className="lg:col-span-5">
                  <ul className="space-y-2">
                    {spacing.map((s) => (
                      <li key={s.step} className="grid grid-cols-[2rem_3.5rem_1fr] items-center gap-2 text-sm">
                        <span className="font-bold">{s.step}</span>
                        <span>{s.px} px</span>
                        <span>
                          <span aria-hidden="true" className="mb-1 block h-3 bg-(--tt-toner)" style={{ width: s.px * 2 }} />
                          <span className="text-(--tt-grey)">{s.use}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </Sheet>
                <Sheet title="Grid" className="lg:col-span-7 lg:mt-6">
                  <ul className="space-y-5">
                    {grid.map((g) => (
                      <li key={g.width}>
                        <div aria-hidden="true" className="flex h-8 gap-1 border-2 border-(--tt-toner) bg-white p-1">
                          {Array.from({ length: g.columns }, (_, i) => (
                            <span key={i} className="flex-1 bg-(--tt-pink)/50" />
                          ))}
                        </div>
                        <p className="mt-1 text-sm">
                          <b>{g.width}</b> · {g.columns} {g.columns === 1 ? "column (stacked, no overlaps)" : "columns"} · gutter {g.gutter} · margin {g.margin}
                        </p>
                      </li>
                    ))}
                  </ul>
                </Sheet>
                <Sheet title="Surfaces" className="lg:col-span-7">
                  <div className="flex flex-wrap items-start gap-6">
                    <div className="grid gap-2 text-sm">
                      <span aria-hidden="true" className="block h-16 w-24 border-2 border-(--tt-toner) bg-white shadow-[3px_3px_0_#111]" />
                      3 px hard shadow
                    </div>
                    <div className="grid gap-2 text-sm">
                      <span aria-hidden="true" className="block h-16 w-24 border-2 border-(--tt-toner) bg-white shadow-[6px_6px_0_#111]" />
                      6 px for sheets
                    </div>
                    <div className="grid gap-2 text-sm">
                      <span aria-hidden="true" className="block h-16 w-24 border-2 border-dashed border-(--tt-toner) bg-white" />
                      dashed = cut line
                    </div>
                    <div className="grid gap-2 text-sm">
                      <span aria-hidden="true" className="relative block h-16 w-24 border-2 border-(--tt-toner) bg-white">
                        <span className="tape absolute -top-2 left-3 h-4 w-14 -rotate-6" />
                      </span>
                      tape holds things
                    </div>
                  </div>
                  <p className="text-sm">
                    Borders are 2 px toner, so every edge survives Windows High Contrast. Square corners; only stickers are round and
                    only early-web buttons are bevelled. Containers may tilt up to 2°; text inside controls never does.
                  </p>
                </Sheet>
                <Sheet title="Motion" className="lg:col-span-5 lg:-mt-4">
                  <ul className="space-y-3">
                    {motion.map((m) => (
                      <li key={m.token}>
                        <p className="f-vt text-2xl">
                          {m.ms} MS <span className="text-base text-(--tt-grey)">{m.token}</span>
                        </p>
                        <p className="text-sm">{m.use}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm">
                    Only on hover or press, only translate and shadow. With reduced motion everything still changes state, instantly,
                    and the tape counter stops ticking.
                  </p>
                </Sheet>
              </div>
            </Track>

            <SideBanner side="B" />

            <Track id="kit" n="B5" title="Contraband kit" blurb="Every control, frozen in every state, then working. Press it and it goes into the page." scrawl={<p className="f-anton -rotate-12 border-4 border-(--tt-red) px-3 py-1 text-3xl tracking-wider text-(--tt-red)">ALL LIVE!</p>}>
              <div className="grid gap-10 lg:grid-cols-12">
                <Sheet title="Buttons" use="Primary is a yellow sticker, secondary a white one, quiet an early-web link. Disabled is dashed, struck through and tagged SOLD OUT." className="lg:col-span-12">
                  {(["primary", "secondary", "quiet"] as const).map((v) => (
                    <States
                      key={v}
                      label={`${v} · every state`}
                      cells={btnStates.map((b) => ({
                        state: b.label,
                        node: (
                          <Button variant={v} state={b.state}>
                            {v === "quiet" ? "[ more >> ]" : v === "primary" ? "Send order" : "Print list"}
                          </Button>
                        ),
                      }))}
                    />
                  ))}
                  <Live>
                    <ButtonsDemo />
                  </Live>
                </Sheet>

                <Sheet title="Links" use="System Times, blue and underlined, like 1997. Visited goes purple." className="lg:col-span-6">
                  <States
                    cells={[
                      { state: "link", node: <a href="#kit" className="tt-link">Videodrome</a> },
                      { state: "hover", node: <a href="#kit" className="tt-link is-hover">Videodrome</a> },
                      { state: "focus", node: <a href="#kit" className="tt-link is-focus">Videodrome</a> },
                      { state: "visited", node: <a href="#kit" className="tt-link is-visited">Videodrome</a> },
                      { state: "current", node: <a href="#kit" className="tt-link is-current">Videodrome</a> },
                    ]}
                  />
                </Sheet>

                <Sheet title="VCR track bar" use="The navigation. The track in view plays: ▶ and inverted. Below 1280 px it shows track numbers only, so it stays one row." className="lg:col-span-6 lg:mt-8">
                  <div className="on-dark bg-[#151514] p-3">
                    <States
                      dark
                      cells={[
                        { state: "track", node: <span className="tt-track">B5 KIT</span> },
                        { state: "hover", node: <span className="tt-track is-hover">B5 KIT</span> },
                        { state: "focus", node: <span className="tt-track is-focus">B5 KIT</span> },
                        { state: "playing", node: <span className="tt-track is-current">B5 KIT</span> },
                      ]}
                    />
                  </div>
                  <p className="text-sm">The bar at the top of this page is live.</p>
                </Sheet>

                <Sheet title="Mood strips" use="Pick one. Label-maker tape; the chosen strip turns yellow and gains ▶." className="lg:col-span-6">
                  <States
                    cells={[
                      { state: "off", node: <Strip on={false}>Dread</Strip> },
                      { state: "hover", node: <Strip on={false} state="hover">Dread</Strip> },
                      { state: "focus", node: <Strip on={false} state="focus">Dread</Strip> },
                      { state: "on", node: <Strip on>Dread</Strip> },
                      { state: "0 tapes", node: <Strip on={false} state="disabled">Decay 0</Strip> },
                    ]}
                  />
                </Sheet>

                <Sheet title="Theme stickers" use="Pick any. A chosen sticker gets a hand-drawn ✓, a thicker ring and a pink fill." className="lg:col-span-6 lg:mt-6">
                  <States
                    cells={[
                      { state: "off", node: <Dot on={false} colour={1}>doubles</Dot> },
                      { state: "hover", node: <Dot on={false} colour={1} state="hover">doubles</Dot> },
                      { state: "focus", node: <Dot on={false} colour={1} state="focus">doubles</Dot> },
                      { state: "on", node: <Dot on colour={1}>doubles</Dot> },
                      { state: "none left", node: <Dot on={false} colour={4} state="disabled">suburbia</Dot> },
                    ]}
                  />
                </Sheet>

                <Sheet title="Search" use="A typewriter box, labelled with a label-maker strip. Focus fills it pale yellow and adds the cut line." className="lg:col-span-6">
                  <States
                    cells={[
                      { state: "empty", node: <input aria-label="Search (specimen)" className="tt-input w-56" placeholder="TYPE A TITLE_" readOnly /> },
                      { state: "hover", node: <input aria-label="Search (specimen)" className="tt-input is-hover w-56" placeholder="TYPE A TITLE_" readOnly /> },
                      { state: "focus", node: <input aria-label="Search (specimen)" className="tt-input is-focus w-56" placeholder="TYPE A TITLE_" readOnly /> },
                      { state: "filled", node: <input aria-label="Search (specimen)" className="tt-input w-56" defaultValue="cronenberg" readOnly /> },
                    ]}
                  />
                </Sheet>

                <Sheet title="My list" use="The watchlist toggle. aria-pressed; the label never changes. Off is an empty box; on is a marker ✓ and a pink fill." className="lg:col-span-6 lg:mt-6">
                  <States
                    cells={[
                      { state: "off", node: <MyList film={sample} on={false} /> },
                      { state: "hover", node: <MyList film={sample} on={false} state="hover" /> },
                      { state: "focus", node: <MyList film={sample} on={false} state="focus" /> },
                      { state: "pressed", node: <MyList film={sample} on={false} state="active" /> },
                      { state: "on", node: <MyList film={sample} on /> },
                      { state: "seen it", node: <SeenSticker /> },
                    ]}
                  />
                </Sheet>

                <Sheet title="Review" use="[+] opens the trader's review in place; [–] or Esc closes it and returns focus." className="lg:col-span-6">
                  <States
                    cells={[
                      { state: "closed", node: <Review expanded={false} controls="x">READ THE REVIEW</Review> },
                      { state: "hover", node: <Review expanded={false} controls="x" state="hover">READ THE REVIEW</Review> },
                      { state: "focus", node: <Review expanded={false} controls="x" state="focus">READ THE REVIEW</Review> },
                      { state: "open", node: <Review expanded controls="x">READ THE REVIEW</Review> },
                    ]}
                  />
                </Sheet>

                <Sheet title="Film card" use="A taped clipping with the tape's spine down the side. On your list and seen are written out, never only coloured." className="lg:col-span-12">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <p className="mb-3 text-sm text-(--tt-grey)">rest</p>
                      <div inert>
                        <FilmCard film={sample} />
                      </div>
                    </div>
                    <div className="md:mt-8">
                      <p className="mb-3 text-sm text-(--tt-grey)">hover / focus inside · on my list · seen it</p>
                      <div inert>
                        <FilmCard film={sample} state="hover" onList seen />
                      </div>
                    </div>
                  </div>
                  <Live>
                    <FilmCardDemo />
                  </Live>
                </Sheet>

                <Sheet title="The shelf" use="Everything together: search, mood strips, theme stickers, catalogue rows with MY LIST and reviews, a tape counter, and REWIND. The list grows with the page; no box to scroll inside." className="lg:col-span-12">
                  <Live>
                    <ShelfDemo />
                  </Live>
                </Sheet>
              </div>
            </Track>

            <Track id="error-codes" n="B6" title="Error codes" blurb="What the list says when things go wrong, or right. Taped notes, never pop-ups; nothing vanishes on a timer.">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="dymo mb-3 text-xs">Empty</p>
                  <Note title="TAPE EATEN. TRY ANOTHER SHELF.">
                    <p>Your list is empty. Tick MY LIST on anything you want.</p>
                  </Note>
                </div>
                <div className="lg:mt-6">
                  <p className="dymo mb-3 text-xs">No results</p>
                  <Note title="NOTHING ON THIS SHELF.">
                    <p>Fewer stickers, another mood, or rewind.</p>
                  </Note>
                </div>
                <div>
                  <p className="dymo mb-3 text-xs">Success</p>
                  <Note title="GOT IT! ✓">
                    <p>Videodrome is on your list.</p>
                  </Note>
                </div>
                <div className="lg:-mt-2">
                  <p className="dymo mb-3 text-xs">Error</p>
                  <Note tone="error" title="BLANK TAPE.">
                    <p>This one never arrived.</p>
                  </Note>
                </div>
                <div className="lg:mt-4">
                  <p className="dymo mb-3 text-xs">Loading</p>
                  <div className="tt-screen p-4 text-3xl">
                    <div aria-hidden="true" className="scanlines absolute inset-0" />
                    <p className="relative">TRACKING…</p>
                    <p aria-hidden="true" className="relative text-right">
                      0:00:07
                    </p>
                  </div>
                </div>
                <div>
                  <p className="dymo mb-3 text-xs">Missing image</p>
                  <NoSignal />
                </div>
              </div>
              <div className="mt-10 max-w-2xl">
                <p className="dymo mb-3 text-xs">Very long title: wraps, never cut</p>
                <div inert>
                  <FilmCard film={longTitle} />
                </div>
              </div>
              <div className="mt-10">
                <Live>
                  <RetrievalDemo />
                </Live>
              </div>
            </Track>

            <Track id="fine-print" n="B7" title="Fine print" blurb="What was tested, how, and what we found. Photocopied, but still readable.">
              <div className="overflow-x-auto border-2 border-(--tt-toner) bg-white" role="region" aria-label="Accessibility results (scrolls sideways)" tabIndex={0}>
                <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                  <caption className="sr-only">Accessibility checks and results</caption>
                  <thead>
                    <tr className="border-b-2 border-(--tt-toner) bg-(--tt-yellow)">
                      <th scope="col" className="p-2">CHECK</th>
                      <th scope="col" className="p-2">METHOD</th>
                      <th scope="col" className="p-2">RESULT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {a11yChecks.map((c) => (
                      <tr key={c.check} className="border-b border-dashed border-(--tt-toner)/40 align-top">
                        <th scope="row" className="p-2 font-bold">
                          {c.check}
                        </th>
                        <td className="p-2 text-(--tt-grey)">{c.method}</td>
                        <td className="p-2">{c.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Track>
          </main>

          <footer className="f-web border-t-2 border-(--tt-toner) bg-white px-4 py-4 text-center text-sm">
            <p>Typefaces: Anton, Courier Prime and VT323 (SIL OFL 1.1); Permanent Marker (Apache 2.0). Film notes are original text.</p>
            <nav aria-label="Design systems webring" className="mt-2">
              [{" "}
              <Link href="/design-systems/somnambulist" className="tt-link inline-block py-1">
                &lt;&lt; prev system
              </Link>{" "}
              | The Cult VHS Ring |{" "}
              <Link href="/" className="tt-link inline-block py-1">
                index
              </Link>{" "}
              |{" "}
              <Link href="/design-systems/accession-record" className="tt-link inline-block py-1">
                next system &gt;&gt;
              </Link>{" "}
              ]
            </nav>
          </footer>
        </div>
      </div>
    </div>
  );
}
