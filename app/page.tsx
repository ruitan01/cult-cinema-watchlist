import Link from "next/link";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "@/components/somnambulist/somnambulist.css";

const serif = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-sn-serif" });
const sans = Instrument_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-sn-sans" });

const directions = [
  {
    n: "01",
    name: "Accession Record",
    line: "The archive: catalogue cards, stamps and ruled paper.",
    board: "/mood-boards/accession-record",
    system: "/design-systems/accession-record",
  },
  {
    n: "02",
    name: "Somnambulist",
    line: "The dream: rooms lit by single lamps. Chosen for the final watchlist.",
    board: "/mood-boards/somnambulist",
    system: "/design-systems/somnambulist",
    chosen: true,
  },
  {
    n: "03",
    name: "Tape Trader",
    line: "The bootleg: photocopies, stickers and VHS spines.",
    board: "/mood-boards/tape-trader",
    system: "/design-systems/tape-trader",
  },
];

export default function Home() {
  return (
    <div className={`ds-sn ${serif.variable} ${sans.variable} flex-1 overflow-x-clip`}>
      <main className="relative mx-auto max-w-6xl px-5 pt-16 pb-24 sm:px-10 sm:pt-24">
        <div aria-hidden="true" className="absolute -top-32 right-[-10%] size-[34rem] rounded-full bg-[radial-gradient(circle,rgb(217_164_65/0.18),transparent_65%)]" />
        <p className="whisper relative text-(--sn-amber)">MPCS 51238 · Design, Build, Ship · Assignment 2</p>
        <h1 className="f-serif relative mt-3 text-[clamp(3rem,9vw,6.5rem)] leading-[0.9] italic">Cult Cinema Watchlist</h1>
        <p className="relative mt-6 max-w-2xl text-lg text-(--sn-lamp)/90">
          A small site for discovering cult cinema: David Lynch, David Cronenberg, surrealism, body horror and experimental
          film. Three visual directions were explored as mood boards and design systems; one became the watchlist.
        </p>

        <section aria-labelledby="watchlist-title" className="relative mt-14">
          <h2 id="watchlist-title" className="sr-only">
            The watchlist
          </h2>
          <Link
            href="/watchlist"
            className="sn-card sn-move grain group block max-w-2xl p-8 no-underline"
          >
            <span className="whisper text-(--sn-amber)">The final site</span>
            <span className="f-serif mt-2 block text-4xl italic sm:text-5xl">The Night Programme →</span>
            <span className="mt-3 block text-(--sn-ash)">
              Sixteen films, browsed by mood and theme. Light a lamp on what you want to see.
            </span>
          </Link>
        </section>

        <section aria-labelledby="directions-title" className="relative mt-20">
          <h2 id="directions-title" className="f-serif text-4xl italic">
            Three directions
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {directions.map((d) => (
              <li
                key={d.n}
                className={`rounded-[4px] border bg-(--sn-smoke) p-6 ${d.chosen ? "border-(--sn-amber)" : "border-(--sn-ash)/35"}`}
              >
                <p className="whisper text-(--sn-amber)">
                  Direction {d.n}
                  {d.chosen && " · chosen"}
                </p>
                <h3 className="f-serif mt-1 text-3xl italic">{d.name}</h3>
                <p className="mt-2 text-sm text-(--sn-ash)">{d.line}</p>
                <ul className="mt-5 space-y-2">
                  <li>
                    <Link href={d.board} className="sn-link inline-block py-1">
                      Mood board {d.n}
                    </Link>
                  </li>
                  <li>
                    <Link href={d.system} className="sn-link inline-block py-1">
                      Design system {d.n}
                    </Link>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <footer className="relative mt-20 border-t border-(--sn-ash)/20 pt-6 text-sm text-(--sn-ash)">
          <p>Static site: no accounts, no database, nothing stored. Film notes are original text; images credited on each mood board.</p>
        </footer>
      </main>
    </div>
  );
}
