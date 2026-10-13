import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { films } from "@/data/films";
import { colors, contrastPairs, grid, motion, principles, spacing, typeScale } from "@/data/design-systems/somnambulist";
import { formatRatio, wcag } from "@/lib/contrast";
import { a11yChecks } from "./a11y";
import { FloorNav } from "./_components/floor-nav";
import { ButtonsDemo, CorridorDemo, FilmCardDemo, MotionDemo, MotionSwitch, RetrievalDemo } from "./_components/demos";
import { Button, Chip, Door, FilmCard, LampToggle, LoadingLamp, SeenMark, StepInside, Whisper, type ForcedState } from "@/components/somnambulist/ui";
import "@/components/somnambulist/somnambulist.css";
import "./page.css";

const serif = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-sn-serif" });
const sans = Instrument_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-sn-sans" });

export const metadata: Metadata = {
  title: "Design System 02: Somnambulist · Cult Cinema Watchlist",
  description:
    "Tokens, typography, space, components, interaction states and accessibility notes for the dark, dreamlike Somnambulist direction.",
};

const floors = [
  { id: "principles", n: "1", title: "Principles" },
  { id: "colour", n: "2", title: "Light & colour" },
  { id: "typography", n: "3", title: "Type" },
  { id: "space", n: "4", title: "Space & motion" },
  { id: "components", n: "5", title: "Components" },
  { id: "states", n: "6", title: "States" },
  { id: "accessibility", n: "7", title: "Access" },
];

function Floor({
  id,
  n,
  title,
  intro,
  tight = false,
  children,
}: {
  id: string;
  n: string;
  title: string;
  intro?: string;
  /** A shorter room: less space under the heading and after the content. */
  tight?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <div aria-hidden="true" className="h-16 bg-linear-to-b from-transparent via-(--sn-smoke)/70 to-transparent sm:h-24" />
      <div className={`px-5 pt-6 sm:px-10 ${tight ? "pb-14 lg:pb-16" : "pb-20 lg:pb-28"}`}>
        <header className={`max-w-2xl lg:ml-[10%] ${tight ? "mb-10 lg:mb-12" : "mb-14 lg:mb-20"}`}>
          <p className="whisper text-(--sn-amber)">Floor {n}</p>
          <h2 id={`${id}-title`} className="f-serif mt-1 text-5xl leading-none italic sm:text-6xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-(--sn-ash)">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

/** One component, given its own room: notes on the left, states and the live demo on the right. */
function Room({ title, use, children }: { title: string; use: string; children: ReactNode }) {
  return (
    <div className="grid gap-8 py-14 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <h3 className="f-serif text-4xl italic">{title}</h3>
        <p className="mt-3 text-(--sn-ash)">{use}</p>
      </div>
      <div className="space-y-12 lg:col-span-7 lg:col-start-6">{children}</div>
    </div>
  );
}

function States({ label = "Every state, held still", cells }: { label?: string; cells: { state: string; node: ReactNode }[] }) {
  return (
    <div>
      <p className="whisper mb-4 text-(--sn-ash)">{label}</p>
      <ul className="flex flex-wrap items-end gap-x-8 gap-y-8">
        {cells.map((c) => (
          <li key={c.state} className="grid justify-items-start gap-3">
            <div inert>{c.node}</div>
            <span className="text-sm text-(--sn-ash)">{c.state}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Live({ children }: { children: ReactNode }) {
  return (
    <div className="grain rounded-[4px] border border-(--sn-amber)/40 bg-(--sn-smoke) p-5 sm:p-8">
      <p className="whisper mb-6 text-(--sn-amber)">Live · use a mouse, keyboard or screen reader</p>
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

export default function SomnambulistSystem() {
  const sample = films.find((f) => f.id === "lost-highway")!;
  const longTitle = {
    ...films.find((f) => f.id === "meshes-of-the-afternoon")!,
    title: "Meshes of the Afternoon, and Every Afternoon After It, Dreamed Again Until the Corridor Ends",
  };

  return (
    <div className={`ds-sn ${serif.variable} ${sans.variable} flex-1 overflow-x-clip`}>
      <a href="#principles" className="ds-sn-skip sr-only rounded-full bg-(--sn-lamp) px-4 py-2 text-(--sn-night) focus:not-sr-only">
        Skip to the first floor
      </a>

      <FloorNav floors={floors} />

      <div className="lg:pl-48">
        <header className="relative overflow-hidden">
          <div aria-hidden="true" className="absolute -top-48 right-[-12%] size-[40rem] rounded-full bg-[radial-gradient(circle,rgb(217_164_65/0.2),transparent_65%)]" />
          <div className="relative flex min-h-[62svh] flex-col justify-between px-5 pt-8 pb-14 sm:min-h-[72svh] sm:px-10">
            <nav aria-label="Site" className="flex flex-wrap justify-between gap-2">
              <Link href="/" className="sn-link whisper inline-block py-1">
                ← Index
              </Link>
              <Link href="/mood-boards/somnambulist" className="sn-link whisper inline-block py-1">
                Mood board 02 →
              </Link>
            </nav>
            <div className="mt-16 max-w-3xl lg:ml-[6%]">
              <p className="whisper text-(--sn-amber)">Design system 02 · the entrance</p>
              <h1 className="f-serif mt-3 -ml-1 text-[clamp(3.5rem,12vw,8rem)] leading-[0.88] italic">Somnambulist</h1>
              <p className="mt-8 max-w-xl text-lg text-(--sn-lamp)/90">
                How the dark direction behaves as an interface: what is lit can be touched, what rests in shadow can still be
                read, and nothing moves faster than a lamp warming up.
              </p>
              <div className="mt-8">
                <MotionSwitch />
              </div>
            </div>
          </div>
        </header>

        <main>
          <Floor id="principles" n="1" title="Principles" tight>
            <ol className="grid gap-10 lg:grid-cols-12 lg:gap-y-8">
              {principles.map((p, i) => (
                <li
                  key={p.title}
                  className={["lg:col-span-5 lg:col-start-2", "lg:col-span-5 lg:col-start-7 lg:mt-14", "lg:col-span-6 lg:col-start-4"][i]}
                >
                  <p aria-hidden="true" className="f-serif text-7xl leading-none text-(--sn-amber)/80 italic">
                    {i + 1}
                  </p>
                  <h3 className="f-serif mt-2 text-3xl italic">{p.title}</h3>
                  <p className="mt-3 text-(--sn-ash)">{p.body}</p>
                </li>
              ))}
            </ol>
          </Floor>

          <Floor id="colour" n="2" title="Light & colour" intro="Three tones of dark, one warm light, one cool. Every ratio is calculated from the token values.">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
              {colors.map((c) => (
                <li key={c.token} className="grid justify-items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="block size-14 rounded-full ring-1 ring-(--sn-ash)/40"
                    style={{
                      backgroundColor: c.hex,
                      boxShadow: ["Night", "Smoke", "Room", "Unlit", "Curtain red"].includes(c.name)
                        ? undefined
                        : `0 0 36px 8px ${c.hex}55`,
                    }}
                  />
                  <span>
                    <span className="block">{c.name}</span>
                    <span className="block text-sm text-(--sn-ash)">
                      {c.hex} · {c.token}
                    </span>
                    <span className="mt-1 block text-sm text-(--sn-ash)">{c.role}</span>
                    {c.decorative && <span className="whisper mt-1 block text-(--sn-ember)">Decorative only</span>}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-24 lg:ml-[10%]">
              <h3 className="f-serif text-3xl italic">How much light each pair gives</h3>
              <div className="mt-6 overflow-x-auto" role="region" aria-label="Contrast ratios (scrolls sideways)" tabIndex={0}>
                <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
                  <caption className="sr-only">Contrast ratios for colour pairs in use</caption>
                  <thead className="whisper text-(--sn-ash)">
                    <tr className="border-b border-(--sn-ash)/40">
                      <th scope="col" className="py-3 pr-4 font-normal">Sample</th>
                      <th scope="col" className="py-3 pr-4 font-normal">Use</th>
                      <th scope="col" className="py-3 pr-4 font-normal">Ratio</th>
                      <th scope="col" className="py-3 font-normal">Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contrastPairs.map((p) => {
                      const r = wcag(p.fg, p.bg);
                      const pass = p.size === "text" ? r.aa : r.aaLarge;
                      const decorative = p.use.includes("decorative");
                      return (
                        <tr key={p.use} className="border-b border-(--sn-ash)/15">
                          <td className="py-3 pr-4">
                            {p.size === "ui" ? (
                              <span aria-hidden="true" className="inline-flex h-9 w-14 items-center rounded-full px-2" style={{ backgroundColor: p.bg }}>
                                <span className="h-1 w-full rounded-full" style={{ backgroundColor: p.fg }} />
                              </span>
                            ) : (
                              <span className="f-serif inline-block rounded-full px-3 text-xl italic" style={{ color: p.fg, backgroundColor: p.bg }}>
                                Aa
                              </span>
                            )}
                          </td>
                          <th scope="row" className="py-3 pr-4 font-normal">
                            {p.use}
                            <span className="block text-xs text-(--sn-ash)">
                              {p.fg} on {p.bg}
                            </span>
                          </th>
                          <td className="py-3 pr-4">{formatRatio(r.ratio)}</td>
                          <td className="py-3">
                            {decorative ? (
                              <span className="text-(--sn-ash)">Never text or essential UI</span>
                            ) : (
                              <span className={pass ? "" : "text-(--sn-ember)"}>
                                {pass ? "✓ Pass" : "✕ Fail"} · {p.size === "text" ? "AA text 4.5:1" : "UI 3:1"}
                                {p.size === "text" && r.aaa && " · AAA"}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 max-w-xl text-sm text-(--sn-ash)">
                Resting things are dimmed by their surface and glow, never by lowering text contrast: Ash is the dimmest text
                allowed. A dimmer grey tested at 4.40:1 on night and was rejected.
              </p>
            </div>
          </Floor>

          <Floor id="typography" n="3" title="Type" tight intro="Instrument Serif for what you remember, Instrument Sans for what you read. No monospace: figures are tabular instead.">
            <div className="space-y-10 lg:space-y-12">
              {typeScale.map((t, i) => (
                <div key={t.role} className="grid gap-3 lg:grid-cols-12">
                  <div className={`text-sm text-(--sn-ash) lg:row-start-1 lg:col-span-3 ${i % 2 ? "lg:col-start-10" : "lg:col-start-1"}`}>
                    <p className="whisper text-(--sn-amber)">{t.role}</p>
                    <p>
                      {t.size} · {t.px} px / {t.lineHeight}
                    </p>
                    <p>{t.family === "display" ? "Instrument Serif" : "Instrument Sans"}</p>
                    <p className="mt-1">{t.note}</p>
                  </div>
                  <p
                    className={`min-w-0 [overflow-wrap:anywhere] lg:row-start-1 lg:col-span-8 ${i % 2 ? "lg:col-start-1" : "lg:col-start-5"} ${t.family === "display" ? "f-serif" : ""} ${t.role === "Whisper" ? "whisper" : ""} ${["Display", "Heading 2", "Heading 3"].includes(t.role) ? "italic" : ""}`}
                    style={{ fontSize: t.role === "Display" ? "clamp(3.25rem, 11vw, 6rem)" : t.size, lineHeight: t.lineHeight }}
                  >
                    {t.sample}
                  </p>
                </div>
              ))}
            </div>
          </Floor>

          <Floor id="space" n="4" title="Space, surfaces & motion" intro="An 8 px base and a great deal of darkness. Depth is light, not lines.">
            <div className="grid gap-20 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h3 className="f-serif text-3xl italic">Spacing</h3>
                <ul className="mt-6 space-y-3">
                  {spacing.map((s) => (
                    <li key={s.step} className="grid grid-cols-[2.5rem_4.5rem_1fr] items-center gap-3">
                      <span className="text-(--sn-amber)">{s.step}</span>
                      <span className="text-sm">{s.px} px</span>
                      <span className="text-sm text-(--sn-ash)">
                        <span aria-hidden="true" className="mb-1 block h-1 rounded-full bg-(--sn-amber)/70" style={{ width: Math.min(s.px, 128) }} />
                        {s.use}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 lg:mt-24">
                <h3 className="f-serif text-3xl italic">Grid</h3>
                <ul className="mt-6 space-y-6">
                  {grid.map((g) => (
                    <li key={g.width}>
                      <div aria-hidden="true" className="flex h-10 gap-1">
                        {Array.from({ length: g.columns }, (_, i) => (
                          <span key={i} className="flex-1 rounded-sm bg-(--sn-velvet)/15" />
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-(--sn-ash)">
                        <span className="text-(--sn-lamp)">{g.width}</span> · {g.columns} columns · gutter {g.gutter} · margin {g.margin}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-24 grid gap-16 lg:grid-cols-12">
              <div className="lg:col-span-6 lg:col-start-2">
                <h3 className="f-serif text-3xl italic">Surfaces</h3>
                <div className="mt-6 rounded-[4px] bg-(--sn-night) p-6 ring-1 ring-(--sn-ash)/30">
                  <p className="text-sm text-(--sn-ash)">Night · the page</p>
                  <div className="mt-4 rounded-[4px] bg-(--sn-smoke) p-6">
                    <p className="text-sm text-(--sn-ash)">Smoke · raised</p>
                    <div className="mt-4 rounded-[4px] border border-(--sn-amber)/60 bg-(--sn-room) p-6 shadow-[0_0_50px_-10px_rgb(217_164_65/0.4)]">
                      <p className="text-sm">Room · a lit card</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-(--sn-ash)">
                  Pills (999 px) for controls, 4 px for rooms. Boundaries are real borders, so they survive Windows High Contrast,
                  where glows disappear.
                </p>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 lg:mt-20">
                <h3 className="f-serif text-3xl italic">Motion</h3>
                <ul className="mt-6 space-y-4">
                  {motion.map((m) => (
                    <li key={m.token}>
                      <p>
                        <span className="text-(--sn-amber)">{m.ms} ms</span> <span className="text-sm text-(--sn-ash)">{m.token}</span>
                      </p>
                      <p className="text-sm text-(--sn-ash)">{m.use}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-(--sn-ash)">
                  Only opacity and an 8 px drift. No flashing, no looping except the loading lamp (one slow breath per 1.6 s).
                </p>
              </div>
            </div>

            <div className="mt-16 lg:ml-[10%] lg:max-w-2xl">
              <Live>
                <MotionDemo />
                <p className="mt-4 text-sm text-(--sn-ash)">
                  Compare with &ldquo;Reduce motion on this page&rdquo; at the entrance, or your system&apos;s own setting.
                </p>
              </Live>
            </div>
          </Floor>

          <Floor id="components" n="5" title="Components" intro="The same pieces as Accession Record, translated into light. Each is shown held still in every state, then working.">
            <Room title="Buttons" use="Primary is a lamp: one per room. Secondary is an outline in velvet. Quiet is a dotted underline for ways onward.">
              {(["primary", "secondary", "quiet"] as const).map((v) => (
                <States
                  key={v}
                  label={`${v} · every state, held still`}
                  cells={btnStates.map((b) => ({
                    state: b.label,
                    node: (
                      <Button variant={v} state={b.state}>
                        {v === "primary" ? "Enter" : v === "secondary" ? "Look closer" : "Keep walking"}
                      </Button>
                    ),
                  }))}
                />
              ))}
              <Live>
                <ButtonsDemo />
              </Live>
            </Room>

            <Room title="Links & floors" use="Links are velvet and always underlined. The floor indicator is the navigation: the current floor is a filled ring.">
              <States
                cells={[
                  { state: "link", node: <a href="#components" className="sn-link">Lost Highway</a> },
                  { state: "hover", node: <a href="#components" className="sn-link is-hover">Lost Highway</a> },
                  { state: "focus", node: <a href="#components" className="sn-link is-focus">Lost Highway</a> },
                  { state: "visited", node: <a href="#components" className="sn-link is-visited">Lost Highway</a> },
                  { state: "current", node: <a href="#components" className="sn-link is-current">Lost Highway</a> },
                ]}
              />
              <States
                cells={[
                  { state: "floor", node: <span className="sn-floor"><span className="ring">3</span> Type</span> },
                  { state: "hover", node: <span className="sn-floor is-hover"><span className="ring">3</span> Type</span> },
                  { state: "focus", node: <span className="sn-floor is-focus"><span className="ring">3</span> Type</span> },
                  { state: "current", node: <span className="sn-floor is-current"><span className="ring">3</span> Type</span> },
                ]}
              />
              <p className="text-sm text-(--sn-ash)">The floor indicator on this page is the live version.</p>
            </Room>

            <Room title="Doors" use="A single choice of mood. Open doors are lit inside, their leaf swings aside and a ◆ marks the label, so the state reads without glow or colour.">
              <States
                cells={[
                  { state: "closed", node: <div className="w-20"><Door label="Dread" open={false} /></div> },
                  { state: "hover", node: <div className="w-20"><Door label="Dread" open={false} state="hover" /></div> },
                  { state: "focus", node: <div className="w-20"><Door label="Dread" open={false} state="focus" /></div> },
                  { state: "open", node: <div className="w-20"><Door label="Dread" open /></div> },
                  { state: "no rooms", node: <div className="w-20"><Door label="Decay" count={0} open={false} state="disabled" /></div> },
                ]}
              />
            </Room>

            <Room title="Theme chips" use="Several can be chosen. A chosen chip gains a ✓, a solid amber ring and a filled surface.">
              <States
                cells={[
                  { state: "off", node: <Chip on={false}>doubles</Chip> },
                  { state: "hover", node: <Chip on={false} state="hover">doubles</Chip> },
                  { state: "focus", node: <Chip on={false} state="focus">doubles</Chip> },
                  { state: "on", node: <Chip on>doubles</Chip> },
                  { state: "none left", node: <Chip on={false} state="disabled">suburbia</Chip> },
                ]}
              />
            </Room>

            <Room title="Search" use="A single baseline, no box, labelled above. It warms to amber on focus; a round clear button appears once there is text.">
              <States
                cells={[
                  { state: "empty", node: <div className="sn-search w-60"><input aria-label="Search (specimen)" placeholder="a title, or a name…" readOnly /></div> },
                  { state: "hover", node: <div className="sn-search is-hover w-60"><input aria-label="Search (specimen)" placeholder="a title, or a name…" readOnly /></div> },
                  { state: "focus", node: <div className="sn-search is-focus-within w-60 outline-2 outline-offset-[6px] outline-(--sn-amber)"><input aria-label="Search (specimen)" placeholder="a title, or a name…" readOnly /></div> },
                  {
                    state: "filled",
                    node: (
                      <div className="sn-search w-60">
                        <input aria-label="Search (specimen)" defaultValue="lynch" readOnly />
                        <span className="sn-clear" aria-hidden="true">×</span>
                      </div>
                    ),
                  },
                ]}
              />
            </Room>

            <Room title="Lamp toggle" use="Adds a film to the watchlist. The label always reads “Watchlist”; off is a dashed bulb, a dashed pill and the word “off”; on is a filled bulb with rays, a solid ring and “on”.">
              <States
                cells={[
                  { state: "off", node: <LampToggle film={sample} on={false} /> },
                  { state: "hover", node: <LampToggle film={sample} on={false} state="hover" /> },
                  { state: "focus", node: <LampToggle film={sample} on={false} state="focus" /> },
                  { state: "pressed", node: <LampToggle film={sample} on={false} state="active" /> },
                  { state: "on", node: <LampToggle film={sample} on /> },
                  { state: "seen mark", node: <SeenMark /> },
                ]}
              />
            </Room>

            <Room title="Step inside" use="Opens a film's room in place. aria-expanded on the button; Esc steps back out and returns focus.">
              <States
                cells={[
                  { state: "closed", node: <StepInside expanded={false} controls="x">Step inside</StepInside> },
                  { state: "hover", node: <StepInside expanded={false} controls="x" state="hover">Step inside</StepInside> },
                  { state: "focus", node: <StepInside expanded={false} controls="x" state="focus">Step inside</StepInside> },
                  { state: "open", node: <StepInside expanded controls="x">Step inside</StepInside> },
                ]}
              />
            </Room>

            <Room title="Film card" use="A window in the dark: dim at rest, lit when you point at it or move focus inside. Being on your list and having seen it are written out, never only lit.">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="whisper mb-3 text-(--sn-ash)">At rest</p>
                  <div inert>
                    <FilmCard film={sample} />
                  </div>
                </div>
                <div className="sm:mt-16">
                  <p className="whisper mb-3 text-(--sn-ash)">Lit · on your list · seen</p>
                  <div inert>
                    <FilmCard film={sample} lit inWatchlist seen />
                  </div>
                </div>
              </div>
              <Live>
                <FilmCardDemo />
              </Live>
            </Room>

            <div className="py-14">
              <div className="max-w-2xl lg:ml-[10%]">
                <h3 className="f-serif text-4xl italic">The corridor</h3>
                <p className="mt-3 text-(--sn-ash)">
                  Everything together: ask the night clerk, choose a door, name your hopes, and keep the films you want. The
                  list grows with the page — no box to scroll inside.
                </p>
              </div>
              <div className="mt-10">
                <Live>
                  <CorridorDemo />
                </Live>
              </div>
            </div>
          </Floor>

          <Floor id="states" n="6" title="States" intro="Feedback as whispers: calm, specific, and always with a way onward. Nothing disappears on a timer.">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="space-y-10 lg:col-span-5 lg:col-start-2">
                <div>
                  <p className="whisper mb-3 text-(--sn-ash)">Empty</p>
                  <Whisper title="There is nothing in this room.">
                    <p>Light a lamp on any film and it will wait for you here.</p>
                  </Whisper>
                </div>
                <div>
                  <p className="whisper mb-3 text-(--sn-ash)">No results</p>
                  <Whisper title="No door opens onto that.">
                    <p>Try another door, or fewer hopes.</p>
                  </Whisper>
                </div>
                <div>
                  <p className="whisper mb-3 text-(--sn-ash)">Success</p>
                  <Whisper title="The lamp is on.">
                    <p>Videodrome is on your list.</p>
                  </Whisper>
                </div>
              </div>
              <div className="space-y-10 lg:col-span-5 lg:col-start-8 lg:mt-20">
                <div>
                  <p className="whisper mb-3 text-(--sn-ash)">Error</p>
                  <Whisper tone="error" title="This door does not open.">
                    <p>The room may not exist. Try another door.</p>
                  </Whisper>
                </div>
                <div>
                  <p className="whisper mb-3 text-(--sn-ash)">Loading</p>
                  <LoadingLamp />
                </div>
                <div>
                  <p className="whisper mb-3 text-(--sn-ash)">Missing image</p>
                  <div role="img" aria-label="Placeholder: no image survives" className="grid aspect-video place-items-center rounded-[4px] bg-(--sn-smoke) ring-1 ring-(--sn-ash)/30">
                    <div className="grid justify-items-center gap-3">
                      <svg aria-hidden="true" viewBox="0 0 40 48" className="w-10 text-(--sn-ash)/60">
                        <path d="M10 4v40M30 24v20M10 24h20M10 4h18v20" fill="none" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      <span className="f-serif text-lg text-(--sn-ash) italic">No image survives.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 max-w-xl lg:ml-[10%]">
              <p className="whisper mb-3 text-(--sn-ash)">A very long title wraps; it is never cut short</p>
              <div inert>
                <FilmCard film={longTitle} />
              </div>
            </div>
            <div className="mt-16 lg:ml-[10%] lg:max-w-3xl">
              <Live>
                <RetrievalDemo />
              </Live>
            </div>
          </Floor>

          <Floor id="accessibility" n="7" title="Access" intro="What was tested on this page, how, and what was found.">
            <div className="overflow-x-auto lg:ml-[10%]" role="region" aria-label="Accessibility results (scrolls sideways)" tabIndex={0}>
              <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
                <caption className="sr-only">Accessibility checks and results</caption>
                <thead className="whisper text-(--sn-ash)">
                  <tr className="border-b border-(--sn-ash)/40">
                    <th scope="col" className="py-3 pr-4 font-normal">Check</th>
                    <th scope="col" className="py-3 pr-4 font-normal">Method</th>
                    <th scope="col" className="py-3 font-normal">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {a11yChecks.map((c) => (
                    <tr key={c.check} className="border-b border-(--sn-ash)/15 align-top">
                      <th scope="row" className="py-3 pr-4 font-normal text-(--sn-amber)">
                        {c.check}
                      </th>
                      <td className="py-3 pr-4 text-(--sn-ash)">{c.method}</td>
                      <td className="py-3">{c.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Floor>
        </main>

        <footer className="border-t border-(--sn-ash)/20 px-5 py-10 text-sm text-(--sn-ash) sm:px-10">
          <p>Typefaces: Instrument Serif and Instrument Sans, SIL Open Font License 1.1. Film notes are original text.</p>
          <p className="mt-3 flex flex-wrap gap-x-6">
            <Link href="/" className="sn-link inline-block py-1">
              ← Index
            </Link>
            <Link href="/mood-boards/somnambulist" className="sn-link inline-block py-1">
              Mood board 02
            </Link>
            <Link href="/design-systems/accession-record" className="sn-link inline-block py-1">
              Design system 01
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
