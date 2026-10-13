import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Mono, Libre_Caslon_Display, Newsreader } from "next/font/google";
import {
  accessionRecord as board,
  accessionRecordFonts,
} from "@/data/mood-boards/accession-record";
import type { ArtifactSource } from "@/data/mood-boards/types";
import { plates } from "./_components/artworks";
import { Plate } from "./_components/plate";
import "./board.css";

const display = Libre_Caslon_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ar-display",
});

const text = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-ar-text",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ar-mono",
});

export const metadata: Metadata = {
  title: "Mood Board 01: Accession Record · Cult Cinema Watchlist",
  description:
    "An archival, editorial visual direction for the Cult Cinema Watchlist: catalogue cards, stamps, programme notes and printed ephemera.",
};

// Sections that sit on their own full-bleed surface for rhythm.
const sectionSurface: Record<string, string> = {
  "marks-and-ephemera": "ar-grain bg-(--ar-card)",
  "toward-an-interface": "ar-dark",
};

function RegisterSource({ source }: { source: ArtifactSource }) {
  switch (source.type) {
    case "original":
      return <>Original work for this project ({source.medium})</>;
    case "external":
      return (
        <>
          {source.creator}, <em>{source.work}</em> ({source.date})
          {source.heldBy && <span className="block text-(--ar-muted)">{source.heldBy}</span>}
          <a href={source.url} className="ar-mono block text-xs underline underline-offset-2 hover:text-(--ar-red)">
            File page and rights statement
          </a>
          {source.modifications && (
            <span className="block text-xs text-(--ar-muted)">Changes: {source.modifications}</span>
          )}
        </>
      );
    case "pending":
      return <>Candidate: {source.candidate}</>;
  }
}

function RegisterLicence({ source }: { source: ArtifactSource }) {
  switch (source.type) {
    case "original":
      return <>—</>;
    case "external":
      return (
        <>
          {source.licence}
          <span className="block text-xs text-(--ar-muted)">{source.rightsStatement}</span>
          <span className="ar-mono block text-xs text-(--ar-muted)">Checked {source.retrieved}</span>
        </>
      );
    case "pending":
      return <span className="text-(--ar-red)">Pending verification</span>;
  }
}

export default function AccessionRecordBoard() {
  const counts = {
    original: board.artifacts.filter((a) => a.source.type === "original").length,
    external: board.artifacts.filter((a) => a.source.type === "external").length,
  };

  return (
    <div className={`ar ${display.variable} ${text.variable} ${mono.variable} flex-1`}>
      <a
        href="#drawers"
        className="ar-skip ar-mono sr-only bg-(--ar-ink) px-3 py-2 text-sm text-(--ar-paper) focus:not-sr-only"
      >
        Skip to the artifacts
      </a>

      <header className="ar-grain border-b-4 border-double border-(--ar-ink)">
        <div className="mx-auto max-w-7xl px-4 pt-6 pb-10 sm:px-8 lg:pb-12">
          <nav aria-label="Site" className="ar-mono flex flex-wrap justify-between gap-2 text-xs tracking-wider uppercase">
            <Link href="/" className="underline decoration-1 underline-offset-4 hover:text-(--ar-red)">
              ← Index
            </Link>
            <span className="text-(--ar-muted)">Cult Cinema Watchlist · Mood board {board.number} of 03</span>
          </nav>

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="ar-mono text-sm tracking-[0.2em] text-(--ar-red)">MB-{board.number}</p>
              <h1 className="ar-display mt-2 text-[clamp(3rem,10vw,8rem)] leading-[0.92] tracking-tight">
                {board.title}
              </h1>
              <p className="ar-oldstyle mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">{board.concept}</p>
              <p className="ar-smallcaps mt-6 text-lg">
                {board.keywords.map((k, i) => (
                  <span key={k}>
                    {i > 0 && (
                      <span aria-hidden="true" className="mx-3 text-(--ar-red)">
                        ❦
                      </span>
                    )}
                    {k}
                  </span>
                ))}
              </p>
            </div>

            <aside
              aria-label="Board summary"
              className="ar-ruled ar-shadow self-end px-5 pt-3 pb-5 lg:col-span-4 lg:rotate-1"
            >
              <p className="ar-mono text-sm">MOOD BOARD — SUMMARY</p>
              <dl className="ar-mono mt-6 grid grid-cols-[1fr_auto] text-sm leading-7">
                <dt>Artifacts</dt>
                <dd>{board.artifacts.length}</dd>
                <dt>Drawers</dt>
                <dd>{board.sections.length}</dd>
                <dt>Original works</dt>
                <dd>{counts.original}</dd>
                <dt>Public-domain images</dt>
                <dd>{counts.external}</dd>
              </dl>
            </aside>
          </div>
        </div>
      </header>

      <nav aria-label="Drawers" className="sticky top-0 z-10 border-b border-(--ar-ink)/20 bg-(--ar-paper)/95 backdrop-blur-sm">
        <ol className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pt-2 sm:px-8">
          {board.sections.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                className="ar-mono block rounded-t-md border border-b-0 border-(--ar-ink)/20 bg-(--ar-card) px-3 py-1.5 text-xs tracking-wider uppercase hover:bg-(--ar-paper-aged) hover:text-(--ar-red)"
              >
                {s.numeral}. {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <main id="drawers" tabIndex={-1} className="focus:outline-none">
        {board.sections.map((section) => {
          const artifacts = board.artifacts.filter((a) => a.section === section.id);
          return (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className={sectionSurface[section.id] ?? ""}
            >
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-16">
                <header className="mb-10 grid items-end gap-4 border-b border-current/25 pb-4 sm:grid-cols-[auto_1fr] sm:gap-8">
                  <p aria-hidden="true" className="ar-display text-7xl leading-none text-(--ar-cap-accent) sm:text-8xl">
                    {section.numeral}
                  </p>
                  <div>
                    <h2 id={`${section.id}-title`} className="ar-display text-3xl sm:text-4xl">
                      <span className="sr-only">Drawer {section.numeral}: </span>
                      {section.title}
                    </h2>
                    <p className="mt-1 max-w-xl text-(--ar-cap-muted)">{section.blurb}</p>
                  </div>
                </header>

                <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-6 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-14">
                  {artifacts.map((artifact) => {
                    const spec = plates[artifact.id];
                    return (
                      <Plate
                        key={artifact.id}
                        artifact={artifact}
                        frame={spec.frame}
                        className={spec.className}
                        tilt={spec.tilt}
                        captionSide={spec.captionSide}
                      >
                        {spec.render(artifact)}
                      </Plate>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}

        <section id="register" aria-labelledby="register-title" className="border-t-4 border-double border-(--ar-ink)">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-16">
            <h2 id="register-title" className="ar-display text-3xl sm:text-4xl">
              Register of sources &amp; licences
            </h2>
            <p className="mt-2 max-w-2xl text-(--ar-muted)">
              Every artifact on this board, with its origin and reuse terms. Each public-domain image was
              checked against the rights statement on its own file page, not only its collection.
            </p>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
                <thead className="ar-mono text-xs tracking-wider text-(--ar-muted) uppercase">
                  <tr className="border-b-2 border-(--ar-ink)">
                    <th scope="col" className="py-2 pr-4">No.</th>
                    <th scope="col" className="py-2 pr-4">Title</th>
                    <th scope="col" className="py-2 pr-4">Kind</th>
                    <th scope="col" className="py-2 pr-4">Source</th>
                    <th scope="col" className="py-2">Licence</th>
                  </tr>
                </thead>
                <tbody>
                  {board.artifacts.map((a) => {
                    return (
                      <tr key={a.id} className="border-b border-(--ar-ink)/15 align-top">
                        <th scope="row" className="ar-mono py-2 pr-4 font-normal text-(--ar-red)">
                          <a href={`#${a.id.toLowerCase()}`} className="hover:underline">
                            {a.id}
                          </a>
                        </th>
                        <td className="py-2 pr-4">{a.title}</td>
                        <td className="py-2 pr-4 capitalize">{a.kind}</td>
                        <td className="py-2 pr-4">
                          <RegisterSource source={a.source} />
                        </td>
                        <td className="py-2">
                          <RegisterLicence source={a.source} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <h3 className="ar-smallcaps mt-12 text-lg">Typefaces</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {accessionRecordFonts.map((f) => (
                <li key={f.family}>
                  {f.family} — {f.designer} ·{" "}
                  <a href={f.licenceUrl} className="underline underline-offset-2 hover:text-(--ar-red)">
                    {f.licence}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-(--ar-muted)">
              Film titles, dates and accession numbers are used descriptively; all programme text,
              stamps, slips and labels on this board were written and drawn for this project.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
