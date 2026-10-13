import type { Metadata } from "next";
import Link from "next/link";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { Watchlist } from "./_components/watchlist";
import "@/components/somnambulist/somnambulist.css";
import "./watchlist.css";

const serif = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-sn-serif" });
const sans = Instrument_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-sn-sans" });

export const metadata: Metadata = {
  title: "The Night Programme · Cult Cinema Watchlist",
  description:
    "A curated watchlist of cult cinema: David Lynch, David Cronenberg, surrealism, body horror and experimental film. Browse by mood and light a lamp on what you want to see.",
};

export default function WatchlistPage() {
  return (
    <div className={`ds-sn wl ${serif.variable} ${sans.variable} flex-1 overflow-x-clip`}>
      <a href="#find-title" className="ds-sn-skip sr-only rounded-full bg-(--sn-lamp) px-4 py-2 text-(--sn-night) focus:not-sr-only">
        Skip to the films
      </a>

      <header className="relative overflow-hidden">
        <div aria-hidden="true" className="wl-curtain absolute inset-y-0 left-0 w-[9%] sm:w-[7%]" />
        <div aria-hidden="true" className="wl-curtain absolute inset-y-0 right-0 w-[9%] sm:w-[7%]" />
        <div aria-hidden="true" className="absolute -top-40 right-[5%] size-[34rem] rounded-full bg-[radial-gradient(circle,rgb(217_164_65/0.18),transparent_65%)]" />
        <div className="relative px-[12%] pt-6 pb-14 sm:pb-20">
          <nav aria-label="Site" className="flex flex-wrap justify-between gap-2">
            <Link href="/" className="sn-link whisper inline-block py-1">
              ← Index
            </Link>
            <Link href="/design-systems/somnambulist" className="sn-link whisper inline-block py-1">
              Design system
            </Link>
          </nav>
          <p className="whisper mt-14 text-(--sn-amber)">Cult Cinema Watchlist</p>
          <h1 className="f-serif mt-2 -ml-1 text-[clamp(3rem,10vw,7rem)] leading-[0.9] italic">The Night Programme</h1>
          <p className="mt-6 max-w-xl text-lg text-(--sn-lamp)/90">
            Sixteen films for after midnight: Lynch, Cronenberg, surrealism, body horror and the experimental. Choose a mood,
            light a lamp on what you want to see, and step inside for details.
          </p>
          <p className="mt-3 max-w-xl text-sm text-(--sn-ash)">Your list lives only in this tab and is forgotten when you leave.</p>
        </div>
      </header>

      <main>
        <Watchlist />
      </main>

      <footer className="border-t border-(--sn-ash)/20 px-5 pt-8 pb-28 text-sm text-(--sn-ash) sm:px-10 lg:pb-10">
        <p>Film notes are original text. Typefaces: Instrument Serif and Instrument Sans (SIL OFL 1.1).</p>
        <p className="mt-2 flex flex-wrap gap-x-6">
          <Link href="/" className="sn-link inline-block py-1">← Index</Link>
          <Link href="/mood-boards/somnambulist" className="sn-link inline-block py-1">Mood board 02</Link>
          <Link href="/design-systems/somnambulist" className="sn-link inline-block py-1">Design system 02</Link>
        </p>
      </footer>
    </div>
  );
}
