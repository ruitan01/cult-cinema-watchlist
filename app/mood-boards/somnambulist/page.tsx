import type { Metadata } from "next";
import Link from "next/link";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { somnambulist as board, somnambulistFonts } from "@/data/mood-boards/somnambulist";
import { exhibits } from "./_components/artworks";
import { Exhibit } from "./_components/exhibit";
import "./board.css";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-sn-serif",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sn-sans",
});

export const metadata: Metadata = {
  title: "Mood Board 02: Somnambulist · Cult Cinema Watchlist",
  description:
    "A dark, dreamlike visual direction for the Cult Cinema Watchlist: rooms lit by single lamps, whispered type, smoke, grain and visions of sleep.",
};

export default function SomnambulistBoard() {
  return (
    <div className={`sn ${serif.variable} ${sans.variable} flex-1 overflow-x-clip`}>
      <a
        href="#rooms"
        className="sn-skip sr-only bg-(--sn-lamp) px-3 py-2 text-sm text-(--sn-dark) focus:not-sr-only"
      >
        Skip to the rooms
      </a>

      <nav
        aria-label="Floors"
        className="sticky top-0 z-20 border-b border-(--sn-ash)/15 bg-(--sn-dark)/90 backdrop-blur-sm lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-24 lg:flex-col lg:justify-center lg:border-r lg:border-b-0"
      >
        <ol className="flex gap-1 overflow-x-auto px-3 py-2 lg:flex-col lg:gap-3 lg:overflow-visible lg:px-0 lg:py-0">
          {board.sections.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                className="group flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-(--sn-ash) hover:text-(--sn-amber) lg:mx-2 lg:flex-col lg:gap-0.5 lg:px-1 lg:text-center"
              >
                <span className="sn-serif grid size-7 place-items-center rounded-full border border-current text-base">
                  {s.numeral}
                </span>
                <span className="sn-whisper text-[0.7rem] whitespace-nowrap lg:max-w-20 lg:text-[0.65rem] lg:leading-tight lg:whitespace-normal">
                  {s.title}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="lg:pl-24">
        <header className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-[radial-gradient(circle,rgb(217_164_65/0.22),transparent_65%)]"
          />
          <div className="relative mx-auto flex min-h-[60svh] max-w-6xl flex-col justify-between px-5 pt-8 pb-10 sm:min-h-[72svh] sm:px-10">
            <p className="flex flex-wrap justify-between gap-2 text-xs text-(--sn-ash)">
              <Link href="/" className="sn-whisper hover:text-(--sn-amber)">
                ← Index
              </Link>
              <span className="sn-whisper">Mood board {board.number} of 03</span>
            </p>
            <div className="mt-14 max-w-3xl sm:mt-24">
              <p className="sn-whisper text-sm text-(--sn-amber)">Floor B · Entrance</p>
              <h1 className="sn-serif mt-3 -ml-1 text-[clamp(3.5rem,13vw,10rem)] leading-[0.85] tracking-tight italic">
                {board.title}
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-(--sn-lamp)/90">{board.concept}</p>
              <p className="sn-whisper mt-6 text-sm text-(--sn-ash)">{board.keywords.join("  ·  ")}</p>
            </div>
          </div>
        </header>

        <main id="rooms" tabIndex={-1} className="focus:outline-none">
          {board.sections.map((section) => {
            const artifacts = board.artifacts.filter((a) => a.section === section.id);
            return (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="relative">
                <div
                  aria-hidden="true"
                  className="h-12 bg-linear-to-b from-transparent via-(--sn-smoke)/60 to-transparent sm:h-16"
                />
                <div className="mx-auto max-w-6xl px-5 pt-4 pb-12 sm:px-10 lg:pb-16">
                  <header className="mb-10 max-w-xl lg:mb-14 lg:ml-[8%]">
                    <p className="sn-whisper text-sm text-(--sn-amber)">
                      Floor {section.numeral}
                    </p>
                    <h2 id={`${section.id}-title`} className="sn-serif mt-1 text-5xl italic sm:text-6xl">
                      {section.title}
                    </h2>
                    <p className="mt-2 text-(--sn-ash)">{section.blurb}</p>
                  </header>

                  <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-6 lg:grid-cols-12 lg:gap-y-16">
                    {artifacts.map((artifact) => {
                      const spec = exhibits[artifact.id];
                      return (
                        <Exhibit
                          key={artifact.id}
                          artifact={artifact}
                          className={spec.className}
                          labelSide={spec.labelSide}
                        >
                          {spec.render(artifact)}
                        </Exhibit>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}

          <section id="credits" aria-labelledby="credits-title" className="border-t border-(--sn-ash)/15">
            <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-10">
              <p className="sn-whisper text-sm text-(--sn-amber)">End credits</p>
              <h2 id="credits-title" className="sn-serif mt-2 text-4xl italic sm:text-5xl">
                Sources &amp; licences
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-(--sn-ash)">
                Every artifact on this board and where it came from. Each public-domain artwork was checked
                against the rights statement on its own file page.
              </p>

              <ol className="mt-12 space-y-6">
                {board.artifacts.map((a) => (
                  <li key={a.id} className="grid gap-1 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
                    <p className="sm:text-right">
                      <a href={`#${a.id.toLowerCase()}`} className="sn-whisper text-xs text-(--sn-amber) hover:underline">
                        {a.id}
                      </a>{" "}
                      <span className="sn-serif text-lg italic">{a.title}</span>
                    </p>
                    <span aria-hidden="true" className="hidden text-(--sn-ash)/50 sm:block">
                      ·
                    </span>
                    <div className="text-sm text-(--sn-ash) sm:text-left">
                      {a.source.type === "external" ? (
                        <>
                          <p className="text-(--sn-lamp)">
                            {a.source.creator}, <em>{a.source.work}</em> ({a.source.date})
                          </p>
                          {a.source.heldBy && <p>{a.source.heldBy}</p>}
                          <p>
                            {a.source.licence} — {a.source.rightsStatement}
                          </p>
                          {a.source.modifications && <p>Changes: {a.source.modifications}</p>}
                          <p>
                            Checked {a.source.retrieved} ·{" "}
                            <a href={a.source.url} className="underline underline-offset-2 hover:text-(--sn-amber)">
                              File page
                            </a>
                          </p>
                        </>
                      ) : a.source.type === "original" ? (
                        <p>Original work for this project ({a.source.medium})</p>
                      ) : (
                        <p>Pending verification</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              <h3 className="sn-whisper mt-16 text-sm text-(--sn-amber)">Typefaces</h3>
              <ul className="mt-3 space-y-1 text-sm text-(--sn-ash)">
                {somnambulistFonts.map((f) => (
                  <li key={f.family}>
                    {f.family} — {f.designer} ·{" "}
                    <a href={f.licenceUrl} className="underline underline-offset-2 hover:text-(--sn-amber)">
                      {f.licence}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mx-auto mt-10 max-w-md text-sm text-(--sn-ash)">
                Film titles and dates are used descriptively. All other text, scenes, patterns and textures on
                this board were written and drawn for this project.
              </p>
              <Link href="/" className="sn-whisper mt-12 inline-block text-sm hover:text-(--sn-amber)">
                ← Back to the index
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
