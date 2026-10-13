import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, Libre_Caslon_Display, Newsreader } from "next/font/google";
import { films } from "@/data/films";
import { colors, contrastPairs, grid, principles, spacing, typeScale } from "@/data/design-systems/accession-record";
import { formatRatio, wcag } from "@/lib/contrast";
import { a11yChecks } from "./a11y";
import { ButtonsDemo, CatalogueDemo, FilmCardDemo, RetrievalDemo } from "./_components/demos";
import {
  Button,
  DisclosureButton,
  FilmCard,
  Note,
  RequestToggle,
  SkeletonRecord,
  Tab,
  WatchedMark,
  type ForcedState,
} from "./_components/ui";
import "./system.css";

const display = Libre_Caslon_Display({ weight: "400", subsets: ["latin"], variable: "--font-ar-display" });
const text = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--font-ar-text" });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-ar-mono" });

export const metadata: Metadata = {
  title: "Design System 01: Accession Record · Cult Cinema Watchlist",
  description:
    "Tokens, typography, spacing, components, interaction states and accessibility notes for the Accession Record direction.",
};

const sections = [
  { id: "principles", n: "1", title: "Principles" },
  { id: "colour", n: "2", title: "Colour" },
  { id: "typography", n: "3", title: "Typography" },
  { id: "space", n: "4", title: "Space & layout" },
  { id: "components", n: "5", title: "Components" },
  { id: "states", n: "6", title: "UI states" },
  { id: "accessibility", n: "7", title: "Accessibility" },
];

const familyName = { display: "Libre Caslon Display", text: "Newsreader", mono: "IBM Plex Mono" } as const;
const familyClass = { display: "f-display", text: "", mono: "f-mono" } as const;

function Section({ id, n, title, intro, children }: { id: string; n: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t-4 border-double border-(--ar-ink) py-12 lg:py-16">
      <header className="mb-8 grid gap-2 sm:grid-cols-[4rem_1fr] sm:gap-6">
        <p aria-hidden="true" className="f-display text-5xl leading-none text-(--ar-red)">
          §{n}
        </p>
        <div>
          <h2 id={`${id}-title`} className="f-display text-3xl leading-tight sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-2 max-w-2xl text-(--ar-muted)">{intro}</p>}
        </div>
      </header>
      {children}
    </section>
  );
}

function Component({ title, use, children }: { title: string; use: string; children: ReactNode }) {
  return (
    <div className="border-t border-(--ar-ink)/25 py-8">
      <h3 className="f-display text-2xl">{title}</h3>
      <p className="mt-1 max-w-2xl text-[0.95rem] text-(--ar-muted)">{use}</p>
      <div className="mt-5 space-y-6">{children}</div>
    </div>
  );
}

/** A static, inert specimen of one state: visible, but not focusable. */
function StateRow({ label, cells }: { label: string; cells: { state: string; node: ReactNode }[] }) {
  return (
    <div>
      <p className="f-label mb-2 text-(--ar-muted)">{label} · static states</p>
      <ul className="flex flex-wrap items-end gap-x-6 gap-y-4">
        {cells.map((c) => (
          <li key={c.state} className="grid gap-2">
            <div inert>{c.node}</div>
            <span className="f-mono text-xs text-(--ar-muted)">{c.state}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Live({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-2 border-(--ar-red) pl-4">
      <p className="f-label mb-3 text-(--ar-red)">Live · try it with mouse, keyboard or screen reader</p>
      {children}
    </div>
  );
}

const buttonStates: { label: string; state?: ForcedState }[] = [
  { label: "default" },
  { label: "hover", state: "hover" },
  { label: "focus", state: "focus" },
  { label: "pressed", state: "active" },
  { label: "disabled", state: "disabled" },
];

export default function AccessionRecordSystem() {
  const sample = films.find((f) => f.id === "videodrome")!;
  const longTitle = {
    ...films.find((f) => f.id === "meshes-of-the-afternoon")!,
    title: "Meshes of the Afternoon, Restored and Expanded with an Unusually Long Archival Subtitle for Testing",
  };

  return (
    <div className={`ds-ar ${display.variable} ${text.variable} ${mono.variable} flex-1`}>
      <a href="#principles" className="ds-ar-skip f-mono sr-only bg-(--ar-ink) px-3 py-2 text-sm text-(--ar-paper) focus:not-sr-only">
        Skip to the system
      </a>

      <header className="mx-auto max-w-6xl px-4 pt-6 pb-10 sm:px-8">
        <nav aria-label="Site" className="f-label flex flex-wrap justify-between gap-2">
          <Link href="/" className="ar-link inline-block py-1">
            ← Index
          </Link>
          <Link href="/mood-boards/accession-record" className="ar-link inline-block py-1">
            Mood board 01 →
          </Link>
        </nav>
        <p className="f-mono mt-10 text-sm tracking-[0.2em] text-(--ar-red)">DS-01</p>
        <h1 className="f-display mt-2 text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95]">Accession Record</h1>
        <p className="mt-2 text-xl italic">Design system for the Cult Cinema Watchlist</p>
        <p className="mt-5 max-w-2xl">
          The rules behind the archival direction: every film a numbered record, ink on paper, structure from ruled
          lines. Each component below is shown in all its states, then working.
        </p>
      </header>

      <nav aria-label="Sections" className="z-10 border-b md:sticky md:top-0 border-(--ar-ink) bg-(--ar-paper)/95 backdrop-blur-sm">
        <ol className="mx-auto flex max-w-6xl flex-wrap gap-1 px-4 pt-2 sm:px-8">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="ar-tab">
                §{s.n} {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <main className="mx-auto max-w-6xl px-4 sm:px-8">
        <Section id="principles" n="1" title="Principles">
          <ol className="grid gap-8 md:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="border-t border-(--ar-ink) pt-3">
                <p className="f-mono text-sm text-(--ar-red)">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="f-display mt-1 text-2xl">{p.title}</h3>
                <p className="mt-2">{p.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="colour"
          n="2"
          title="Colour"
          intro="Seven working colours and two decorative ones. Ratios below are calculated from the token values at build time."
        >
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {colors.map((c) => (
              <li key={c.token} className="border-t border-(--ar-ink) pt-2">
                <div className="h-16 border border-(--ar-ink)/15" style={{ backgroundColor: c.hex }} />
                <p className="mt-2 font-medium">{c.name}</p>
                <p className="f-mono text-xs">
                  {c.hex} · <span className="text-(--ar-muted)">{c.token}</span>
                </p>
                <p className="mt-1 text-sm text-(--ar-muted)">{c.role}</p>
                {c.decorative && <p className="f-label mt-1 text-(--ar-red)">Decorative only</p>}
              </li>
            ))}
          </ul>

          <h3 className="f-display mt-12 text-2xl">Contrast register</h3>
          <div className="mt-4 overflow-x-auto" role="region" aria-label="Contrast register (scrolls sideways)" tabIndex={0}>
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <caption className="sr-only">Contrast ratios for colour pairs in use</caption>
              <thead className="f-label text-(--ar-muted)">
                <tr className="border-b-2 border-(--ar-ink)">
                  <th scope="col" className="py-2 pr-4">Sample</th>
                  <th scope="col" className="py-2 pr-4">Use</th>
                  <th scope="col" className="py-2 pr-4">Pair</th>
                  <th scope="col" className="py-2 pr-4">Ratio</th>
                  <th scope="col" className="py-2">Requirement</th>
                </tr>
              </thead>
              <tbody>
                {contrastPairs.map((p) => {
                  const r = wcag(p.fg, p.bg);
                  const needed = p.size === "text" ? "AA text 4.5:1" : "AA large / UI 3:1";
                  const pass = p.size === "text" ? r.aa : r.aaLarge;
                  const decorative = p.use.includes("decorative");
                  return (
                    <tr key={p.use} className="border-b border-(--ar-ink)/15">
                      <td className="py-2 pr-4">
                        {p.size === "ui" ? (
                          <span aria-hidden="true" className="inline-flex h-8 w-12 items-center px-2" style={{ backgroundColor: p.bg }}>
                            <span className="h-1 w-full" style={{ backgroundColor: p.fg }} />
                          </span>
                        ) : (
                          <span className="f-display inline-block px-2 text-xl" style={{ color: p.fg, backgroundColor: p.bg }}>
                            Aa
                          </span>
                        )}
                      </td>
                      <th scope="row" className="py-2 pr-4 font-normal">
                        {p.use}
                      </th>
                      <td className="f-mono py-2 pr-4 text-xs">
                        {p.fg} on {p.bg}
                      </td>
                      <td className="f-mono py-2 pr-4">{formatRatio(r.ratio)}</td>
                      <td className="py-2">
                        {decorative ? (
                          <span className="text-(--ar-muted)">Not used for text or essential UI</span>
                        ) : (
                          <span className={pass ? "" : "text-(--ar-red)"}>
                            {pass ? "✓ Pass" : "✕ Fail"} — {needed}
                            {p.size === "text" && r.aaa && " (also AAA)"}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-2xl text-sm text-(--ar-muted)">
            Disabled controls use <span className="f-mono">#8A8478</span>, exempt from contrast requirements, and are also
            marked by a dashed border and a struck-through label, so they never rely on colour alone.
          </p>
        </Section>

        <Section id="typography" n="3" title="Typography" intro="Three families with fixed roles. Sizes in rem; pixel values at the default 16 px root.">
          <ul className="grid gap-4 sm:grid-cols-3">
            <li className="border-t border-(--ar-ink) pt-2">
              <p className="f-display text-3xl">Libre Caslon Display</p>
              <p className="text-sm text-(--ar-muted)">Display and headings. Never below 22 px.</p>
            </li>
            <li className="border-t border-(--ar-ink) pt-2">
              <p className="text-3xl">Newsreader</p>
              <p className="text-sm text-(--ar-muted)">Reading text, notes, captions. Optical sizes on.</p>
            </li>
            <li className="border-t border-(--ar-ink) pt-2">
              <p className="f-mono text-3xl">IBM Plex Mono</p>
              <p className="text-sm text-(--ar-muted)">Numbers, labels and the catalogue clerk&apos;s typescript.</p>
            </li>
          </ul>

          <div className="mt-10 divide-y divide-(--ar-ink)/15 border-y border-(--ar-ink)">
            {typeScale.map((t) => (
              <div key={t.role} className="grid gap-2 py-4 md:grid-cols-[11rem_1fr] md:gap-8">
                <div className="f-mono text-xs leading-relaxed">
                  <p className="text-(--ar-red)">{t.role.toUpperCase()}</p>
                  <p>
                    {t.size} · {t.px} px / {t.lineHeight}
                  </p>
                  <p className="text-(--ar-muted)">{familyName[t.family]}</p>
                </div>
                <div className="min-w-0">
                  <p
                    className={`${familyClass[t.family]} [overflow-wrap:anywhere] ${t.role === "Label" ? "f-label" : ""}`}
                    style={{ fontSize: t.role === "Display" ? "clamp(3rem, 9vw, 4.5rem)" : t.size, lineHeight: t.lineHeight }}
                  >
                    {t.sample}
                  </p>
                  <p className="mt-1 text-sm text-(--ar-muted)">{t.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-sm text-(--ar-muted)">
            Line length 60–72 characters for reading text. Small capitals for credits and themes; figures in mono for anything
            a reader compares (years, running times, accession numbers).
          </p>
        </Section>

        <Section id="space" n="4" title="Space & layout" intro="A 4 px base, a 12-column grid, and ruled lines instead of boxes and shadows.">
          <h3 className="f-display text-2xl">Spacing scale</h3>
          <ul className="mt-4 space-y-2">
            {spacing.map((s) => (
              <li key={s.step} className="grid grid-cols-[3rem_5rem_1fr] items-center gap-3 sm:grid-cols-[3rem_6rem_1fr_1fr]">
                <span className="f-mono text-sm text-(--ar-red)">{s.step}</span>
                <span className="f-mono text-sm">{s.px} px</span>
                <span aria-hidden="true" className="h-3 bg-(--ar-ink)" style={{ width: s.px }} />
                <span className="col-span-3 text-sm text-(--ar-muted) sm:col-span-1">{s.use}</span>
              </li>
            ))}
          </ul>

          <h3 className="f-display mt-12 text-2xl">Grid</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {grid.map((g) => (
              <figure key={g.width} className="border-t border-(--ar-ink) pt-2">
                <div aria-hidden="true" className="flex h-16 gap-1 bg-(--ar-card) p-1">
                  {Array.from({ length: g.columns }, (_, i) => (
                    <span key={i} className="flex-1 bg-(--ar-red)/15" />
                  ))}
                </div>
                <figcaption className="f-mono mt-2 text-xs leading-relaxed">
                  <span className="text-(--ar-red)">{g.width}</span> · {g.columns} columns · gutter {g.gutter} · margin {g.margin}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="f-display text-2xl">Rules</h3>
              <div className="mt-4 space-y-5">
                <div>
                  <div className="border-t border-(--ar-ink)/20" />
                  <p className="f-mono mt-1 text-xs text-(--ar-muted)">hairline · 1 px ink 20% · between rows</p>
                </div>
                <div>
                  <div className="border-t border-(--ar-ink)" />
                  <p className="f-mono mt-1 text-xs text-(--ar-muted)">rule · 1 px ink · top of a record</p>
                </div>
                <div>
                  <div className="border-t-4 border-double border-(--ar-ink)" />
                  <p className="f-mono mt-1 text-xs text-(--ar-muted)">double · 4 px · between sections</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="f-display text-2xl">Corners & depth</h3>
              <p className="mt-4">
                Square corners everywhere. The only radius is the drawer tab: <span className="f-mono">6px 6px 0 0</span>.
              </p>
              <p className="mt-2">No shadows: depth is a rule above and a hairline below.</p>
            </div>
            <div>
              <h3 className="f-display text-2xl">Motion</h3>
              <p className="mt-4">
                <span className="f-mono">0 ms</span>. State changes are instant, like turning a card in a drawer. Pressing a
                button stamps a double inner rule rather than animating.
              </p>
              <p className="mt-2 text-sm text-(--ar-muted)">
                With no motion to begin with, <span className="f-mono">prefers-reduced-motion</span> needs no special case.
              </p>
            </div>
          </div>
        </Section>

        <Section
          id="components"
          n="5"
          title="Components"
          intro="Each component in every state, shown inert for comparison, then working. All live parts are reachable and operable with a keyboard."
        >
          <Component title="Button" use="Primary for the one main action in a view, secondary for alternatives, quiet for cross-references.">
            {(["primary", "secondary", "quiet"] as const).map((v) => (
              <StateRow
                key={v}
                label={v}
                cells={buttonStates.map((b) => ({
                  state: b.label,
                  node: (
                    <Button variant={v} state={b.state}>
                      {v === "quiet" ? "See also" : "Open record"}
                    </Button>
                  ),
                }))}
              />
            ))}
            <Live>
              <ButtonsDemo />
            </Live>
          </Component>

          <Component title="Links" use="Stamp red with an underline: links are always recognisable without colour.">
            <StateRow
              label="Inline link"
              cells={[
                { state: "default", node: <a href="#components" className="ar-link">Videodrome, 1983</a> },
                { state: "hover", node: <a href="#components" className="ar-link is-hover">Videodrome, 1983</a> },
                { state: "focus", node: <a href="#components" className="ar-link is-focus">Videodrome, 1983</a> },
                { state: "visited", node: <a href="#components" className="ar-link is-visited">Videodrome, 1983</a> },
                { state: "current page", node: <a href="#components" className="ar-link is-current">Videodrome, 1983</a> },
              ]}
            />
            <Live>
              <p>
                See the <Link href="/mood-boards/accession-record" className="ar-link">Accession Record mood board</Link> for
                the exploration behind these rules.
              </p>
            </Live>
          </Component>

          <Component title="Drawer tabs" use="Section navigation and single-choice filters. The selected tab is marked by a red top rule and red label, not colour alone.">
            <StateRow
              label="Tab"
              cells={[
                { state: "default", node: <Tab>Director</Tab> },
                { state: "hover", node: <Tab state="hover">Director</Tab> },
                { state: "focus", node: <Tab state="focus">Director</Tab> },
                { state: "selected", node: <Tab state="selected">Director</Tab> },
                { state: "with count", node: <Tab count={9}>Body horror</Tab> },
                { state: "0 results (disabled)", node: <Tab state="disabled" count={0}>Suburbia</Tab> },
              ]}
            />
            <p className="text-sm text-(--ar-muted)">The sticky section bar at the top of this page is the live version.</p>
          </Component>

          <Component title="Search field" use="An underlined typescript line, labelled above. The placeholder is a hint, never the label.">
            <StateRow
              label="Field"
              cells={[
                { state: "empty", node: <input aria-label="Search (specimen)" className="ar-input w-56" placeholder="Title or director" readOnly /> },
                { state: "hover", node: <input aria-label="Search (specimen)" className="ar-input is-hover w-56" placeholder="Title or director" readOnly /> },
                { state: "focus", node: <input aria-label="Search (specimen)" className="ar-input is-focus w-56" placeholder="Title or director" readOnly /> },
                { state: "filled", node: <input aria-label="Search (specimen)" className="ar-input w-56" defaultValue="cronenberg" readOnly /> },
              ]}
            />
          </Component>

          <Component title="Watchlist toggle" use="A request slip that is stamped when filed. A toggle button with aria-pressed; the label stays the same and the mark changes.">
            <StateRow
              label="Toggle"
              cells={[
                { state: "off", node: <RequestToggle film={sample} on={false} /> },
                { state: "hover", node: <RequestToggle film={sample} on={false} state="hover" /> },
                { state: "focus", node: <RequestToggle film={sample} on={false} state="focus" /> },
                { state: "pressed", node: <RequestToggle film={sample} on={false} state="active" /> },
                { state: "on", node: <RequestToggle film={sample} on /> },
                { state: "watched mark", node: <WatchedMark /> },
              ]}
            />
          </Component>

          <Component title="Programme note (disclosure)" use="Reveals a film's longer note in place. aria-expanded on the button; Esc closes it and returns focus.">
            <StateRow
              label="Disclosure"
              cells={[
                { state: "collapsed", node: <DisclosureButton expanded={false} controls="x">Programme note</DisclosureButton> },
                { state: "hover", node: <DisclosureButton expanded={false} controls="x" state="hover">Programme note</DisclosureButton> },
                { state: "focus", node: <DisclosureButton expanded={false} controls="x" state="focus">Programme note</DisclosureButton> },
                { state: "expanded", node: <DisclosureButton expanded controls="x">Programme note</DisclosureButton> },
              ]}
            />
          </Component>

          <Component title="Film card" use="The catalogue entry: a metadata column beside the description. Full and compact versions.">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <p className="f-label mb-2 text-(--ar-muted)">default</p>
                <div inert>
                  <FilmCard film={sample} />
                </div>
              </div>
              <div>
                <p className="f-label mb-2 text-(--ar-muted)">hover / focus within · in watchlist · viewed</p>
                <div inert>
                  <FilmCard film={sample} state="hover" inWatchlist watched />
                </div>
              </div>
            </div>
            <Live>
              <FilmCardDemo />
            </Live>
          </Component>

          <Component title="Working catalogue" use="The components together: search, drawer-tab filters with counts, compact cards, watchlist toggles, programme notes and live feedback.">
            <Live>
              <CatalogueDemo />
            </Live>
          </Component>
        </Section>

        <Section id="states" n="6" title="UI states" intro="Feedback in the voice of the archive: calm, specific, and always with a way forward.">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="f-label mb-2 text-(--ar-muted)">Empty</p>
              <Note title="Your reading list is empty">
                <p>Request a film from the catalogue and it will be filed here.</p>
              </Note>
            </div>
            <div>
              <p className="f-label mb-2 text-(--ar-muted)">No results for a filter</p>
              <Note title="No holdings match this index">
                <p>Try another theme or a shorter search.</p>
              </Note>
            </div>
            <div>
              <p className="f-label mb-2 text-(--ar-muted)">Success</p>
              <Note title="Filed">
                <p>Videodrome added to your watchlist. 4 on the list.</p>
              </Note>
            </div>
            <div>
              <p className="f-label mb-2 text-(--ar-muted)">Error</p>
              <Note tone="error" title="Record missing">
                <p>This record is not in the stacks. It may be on loan or was never catalogued.</p>
              </Note>
            </div>
            <div>
              <p className="f-label mb-2 text-(--ar-muted)">Loading</p>
              <p className="f-mono mb-2 text-sm">Retrieving from the stacks…</p>
              <SkeletonRecord />
            </div>
            <div>
              <p className="f-label mb-2 text-(--ar-muted)">Missing image</p>
              <div
                role="img"
                aria-label="Placeholder: no still on file"
                className="grid aspect-[16/9] place-items-center border border-(--ar-ink)/30 bg-[repeating-linear-gradient(45deg,transparent_0_8px,rgb(28_27_25/0.07)_8px_9px)]"
              >
                <span className="f-label bg-(--ar-paper) px-2 text-(--ar-muted)">No still on file</span>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <p className="f-label mb-2 text-(--ar-muted)">Very long title (wraps, never truncates)</p>
            <div inert>
              <FilmCard film={longTitle} />
            </div>
          </div>
          <div className="mt-8">
            <Live>
              <RetrievalDemo />
            </Live>
          </div>
        </Section>

        <Section id="accessibility" n="7" title="Accessibility" intro="What was tested on this page, how, and the result.">
          <div className="overflow-x-auto" role="region" aria-label="Accessibility results (scrolls sideways)" tabIndex={0}>
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <caption className="sr-only">Accessibility checks and results</caption>
              <thead className="f-label text-(--ar-muted)">
                <tr className="border-b-2 border-(--ar-ink)">
                  <th scope="col" className="py-2 pr-4">Check</th>
                  <th scope="col" className="py-2 pr-4">Method</th>
                  <th scope="col" className="py-2">Result</th>
                </tr>
              </thead>
              <tbody>
                {a11yChecks.map((c) => (
                  <tr key={c.check} className="border-b border-(--ar-ink)/15 align-top">
                    <th scope="row" className="py-2 pr-4 font-medium">
                      {c.check}
                    </th>
                    <td className="py-2 pr-4 text-(--ar-muted)">{c.method}</td>
                    <td className="py-2">{c.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </main>

      <footer className="mx-auto max-w-6xl border-t-4 border-double border-(--ar-ink) px-4 py-8 text-sm sm:px-8">
        <p>
          Typefaces: Libre Caslon Display, Newsreader and IBM Plex Mono, all under the SIL Open Font License 1.1. Film notes
          are original text written for this project.
        </p>
        <p className="mt-2 flex flex-wrap gap-x-6">
          <Link href="/" className="ar-link inline-block py-1">
            ← Index
          </Link>
          <Link href="/mood-boards/accession-record" className="ar-link inline-block py-1">
            Mood board 01
          </Link>
        </p>
      </footer>
    </div>
  );
}
