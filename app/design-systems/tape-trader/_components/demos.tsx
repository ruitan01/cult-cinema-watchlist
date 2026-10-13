"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { films, themes, type Film, type Mood, type Theme } from "@/data/films";
import { Button, Dot, FilmCard, MyList, Note, Review, Strip, grade } from "./ui";

const reduceQuery = "(prefers-reduced-motion: reduce)";
function subscribeReduce(cb: () => void) {
  const m = window.matchMedia(reduceQuery);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}
function useReducedMotion() {
  return useSyncExternalStore(subscribeReduce, () => window.matchMedia(reduceQuery).matches, () => false);
}

function Status({ message }: { message: string }) {
  return (
    <p role="status" aria-live="polite" className="min-h-7 font-bold">
      {message}
    </p>
  );
}

/* Buttons ----------------------------------------------------------------- */

export function ButtonsDemo() {
  const [message, setMessage] = useState("");
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-5">
        <Button onClick={() => setMessage("PRIMARY: ORDER SENT!")}>Send order</Button>
        <Button variant="secondary" onClick={() => setMessage("SECONDARY: LIST PRINTED.")}>
          Print list
        </Button>
        <Button variant="quiet" onClick={() => setMessage("QUIET: next site in the ring.")}>
          [ more &gt;&gt; ]
        </Button>
        <Button disabled>Tetsuo II</Button>
      </div>
      <Status message={message} />
    </div>
  );
}

/* Film card / catalogue row with live controls --------------------------- */

function useReview() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const id = useId();
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
      ref.current?.focus();
    }
  };
  return { open, setOpen, ref, id, onKeyDown };
}

function ReviewPanel({ film, id, open }: { film: Film; id: string; open: boolean }) {
  return (
    <div id={id} hidden={!open} className="mt-3 border-2 border-dashed border-(--tt-toner) bg-(--tt-paper) p-3 text-[0.95rem]">
      <p>
        &ldquo;{film.note}&rdquo; Mood: {film.mood}. Filed under {film.themes.join(", ")}. {grade(film)} gen, picture holds up.
      </p>
      <p className="mt-1 text-sm text-(--tt-grey)">Press Esc to close.</p>
    </div>
  );
}

export function FilmCardDemo() {
  const film = films.find((f) => f.id === "videodrome")!;
  const [on, setOn] = useState(false);
  const [message, setMessage] = useState("");
  const { open, setOpen, ref, id, onKeyDown } = useReview();
  return (
    <div className="max-w-xl space-y-3" onKeyDown={onKeyDown}>
      <FilmCard
        film={film}
        onList={on}
        headingLevel={4}
        actions={
          <>
            <MyList
              film={film}
              on={on}
              onClick={() => {
                setOn(!on);
                setMessage(on ? `OFF THE LIST: ${film.title.toUpperCase()}.` : `GOT IT! ${film.title.toUpperCase()} IS ON YOUR LIST.`);
              }}
            />
            <Review ref={ref} expanded={open} controls={id} onClick={() => setOpen(!open)}>
              READ THE REVIEW<span className="sr-only"> of {film.title}</span>
            </Review>
          </>
        }
        details={<ReviewPanel film={film} id={id} open={open} />}
      />
      <Status message={message} />
    </div>
  );
}

function Row({ film, on, onToggle }: { film: Film; on: boolean; onToggle: () => void }) {
  const { open, setOpen, ref, id, onKeyDown } = useReview();
  return (
    <li className="tt-row" onKeyDown={onKeyDown}>
      <div className="min-w-0">
        <h4 className="flex items-baseline gap-2 text-[0.95rem] font-bold">
          <span className="f-anton text-xl leading-tight [overflow-wrap:anywhere]">{film.title.toUpperCase()}</span>
          <span aria-hidden="true" className="hidden min-w-6 flex-1 border-b-2 border-dotted border-(--tt-toner)/60 sm:block" />
        </h4>
        <p className="text-sm">
          {film.director} · {film.year} · {film.runtime} min · {grade(film)} gen
          {on && <span className="ml-2 bg-(--tt-pink) px-1 font-bold">✓ ON MY LIST</span>}
        </p>
        <ReviewPanel film={film} id={id} open={open} />
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <MyList film={film} on={on} onClick={onToggle} />
        <Review ref={ref} expanded={open} controls={id} onClick={() => setOpen(!open)}>
          REVIEW<span className="sr-only"> of {film.title}</span>
        </Review>
      </div>
    </li>
  );
}

/* The Shelf: the working catalogue, natural page scrolling ---------------- */

const moodLabels: { mood: Mood | "all"; label: string }[] = [
  { mood: "all", label: "Everything" },
  { mood: "dread", label: "Dread" },
  { mood: "desire", label: "Desire" },
  { mood: "dream", label: "Dream" },
  { mood: "decay", label: "Decay" },
];

export function ShelfDemo() {
  const [text, setText] = useState("");
  const [mood, setMood] = useState<Mood | "all">("all");
  const [picked, setPicked] = useState<Set<Theme>>(new Set());
  const [list, setList] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState("");
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const byText = (f: Film) => `${f.title} ${f.director}`.toLowerCase().includes(text.trim().toLowerCase());
  const byThemes = (f: Film) => picked.size === 0 || f.themes.some((t) => picked.has(t));
  const byMood = (f: Film) => mood === "all" || f.mood === mood;
  const shown = films.filter((f) => byText(f) && byThemes(f) && byMood(f));
  const moodCount = (m: Mood | "all") => films.filter((f) => byText(f) && byThemes(f) && (m === "all" || f.mood === m)).length;
  const themeCount = (t: Theme) => films.filter((f) => byText(f) && byMood(f) && f.themes.includes(t)).length;

  const rewind = () => {
    setText("");
    setMood("all");
    setPicked(new Set());
    setMessage("REWOUND. The whole shelf is back.");
    inputRef.current?.focus();
  };

  const toggleTheme = (t: Theme) => {
    const next = new Set(picked);
    if (next.has(t)) next.delete(t);
    else next.add(t);
    setPicked(next);
  };

  const toggleFilm = (f: Film) => {
    const next = new Set(list);
    const on = !next.has(f.id);
    if (on) next.add(f.id);
    else next.delete(f.id);
    setList(next);
    setMessage(on ? `GOT IT! ${f.title.toUpperCase()} IS ON YOUR LIST (${next.size}).` : `OFF THE LIST: ${f.title.toUpperCase()} (${next.size}).`);
  };

  const summary = shown.length === 0 ? "NOTHING ON THIS SHELF." : `${shown.length} ${shown.length === 1 ? "TAPE" : "TAPES"} ON THE SHELF.`;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <label htmlFor={inputId} className="dymo text-xs">
            Search the list
          </label>
          <input
            ref={inputRef}
            id={inputId}
            type="search"
            className="tt-input mt-2"
            placeholder="TYPE A TITLE OR DIRECTOR_"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="tt-bevel" onClick={() => { setText(""); inputRef.current?.focus(); }} disabled={!text}>
            [X] Clear
          </button>
          <button type="button" className="tt-bevel" onClick={rewind}>
            ◀◀ Rewind
          </button>
        </div>
      </div>

      <fieldset>
        <legend className="dymo mb-3 text-xs">Mood (pick one)</legend>
        <div className="flex flex-wrap gap-2">
          {moodLabels.map((m) => {
            const n = moodCount(m.mood);
            return (
              <Strip key={m.mood} on={mood === m.mood} disabled={n === 0 && mood !== m.mood} onClick={() => setMood(m.mood)}>
                {m.label} <span className="font-normal opacity-80">{n}</span>
              </Strip>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="dymo mb-3 text-xs">Themes (pick any)</legend>
        <div className="flex flex-wrap gap-2">
          {themes.map((t, i) => {
            const n = themeCount(t);
            return (
              <Dot key={t} on={picked.has(t)} colour={i} disabled={n === 0 && !picked.has(t)} onClick={() => toggleTheme(t)}>
                {t} <span className="font-normal">{n}</span>
              </Dot>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center justify-between gap-3 border-y-2 border-(--tt-toner) py-2">
        <p role="status" aria-live="polite" className="f-anton text-2xl">
          {summary}
        </p>
        <p className="f-vt flex items-center gap-2 text-2xl">
          ON MY LIST
          <span className="bg-(--tt-toner) px-2 text-(--tt-cyan)">{String(list.size).padStart(3, "0")}</span>
        </p>
      </div>

      {shown.length === 0 ? (
        <Note tone="error" title="TAPE EATEN.">
          <p>Nothing on this shelf. Try another mood, fewer themes, or rewind.</p>
          <Button variant="quiet" className="mt-1 -ml-1" onClick={rewind}>
            [ rewind the whole shelf ]
          </Button>
        </Note>
      ) : (
        <ul aria-label="Tapes on the shelf">
          {shown.map((f) => (
            <Row key={f.id} film={f} on={list.has(f.id)} onToggle={() => toggleFilm(f)} />
          ))}
        </ul>
      )}
      <Status message={message} />
    </div>
  );
}

/* Loading (TRACKING…), success and error --------------------------------- */

function TrackingScreen() {
  const reduced = useReducedMotion();
  const [seconds, setSeconds] = useState(0);

  // One tick per second: text changes only, nothing flashes.
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="tt-screen max-w-md p-5 text-3xl">
      <div aria-hidden="true" className="scanlines absolute inset-0" />
      <p className="relative">TRACKING…</p>
      <p aria-hidden="true" className="relative mt-3 text-2xl">
        {reduced ? "▮▮▮▯▯▯" : "▮".repeat(1 + (seconds % 6)).padEnd(6, "▯")}
      </p>
      <p aria-hidden="true" className="relative mt-1 text-right">
        0:00:{String(reduced ? 0 : seconds).padStart(2, "0")}
      </p>
    </div>
  );
}

export function RetrievalDemo() {
  const [phase, setPhase] = useState<"idle" | "loading" | "done" | "error">("idle");
  const film = films.find((f) => f.id === "tetsuo")!;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const run = (outcome: "done" | "error") => {
    if (timer.current) clearTimeout(timer.current);
    setPhase("loading");
    timer.current = setTimeout(() => setPhase(outcome), 3200);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-5">
        <Button variant="secondary" onClick={() => run("done")} disabled={phase === "loading"}>
          Play the tape
        </Button>
        <Button variant="secondary" onClick={() => run("error")} disabled={phase === "loading"}>
          Play a blank
        </Button>
      </div>
      <p role="status" className="sr-only">
        {phase === "loading" ? "Tracking. Loading the tape." : phase === "done" ? `${film.title} is playing.` : ""}
      </p>
      <div aria-busy={phase === "loading"}>
        {phase === "idle" && <p className="text-(--tt-grey)">Insert a tape.</p>}
        {phase === "loading" && <TrackingScreen />}
        {phase === "done" && (
          <div className="max-w-xl">
            <FilmCard film={film} headingLevel={4} />
          </div>
        )}
        {phase === "error" && (
          <div role="alert" className="max-w-xl">
            <Note tone="error" title="BLANK TAPE.">
              <p>This one never arrived, or someone taped the news over it.</p>
            </Note>
          </div>
        )}
      </div>
    </div>
  );
}
