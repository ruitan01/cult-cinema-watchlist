"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { films, themes, type Film, type Mood, type Theme } from "@/data/films";
import { Button, Chip, Door, FilmCard, LampToggle, LoadingLamp, StepInside, Whisper, moods } from "./ui";

function Status({ message, className = "" }: { message: string; className?: string }) {
  return (
    <p role="status" aria-live="polite" className={`min-h-7 text-[0.95rem] text-(--sn-amber) ${className}`}>
      {message}
    </p>
  );
}

/* Reduced-motion preview: page-only, never persisted, never overrides the OS */

const query = "(prefers-reduced-motion: reduce)";
function subscribe(callback: () => void) {
  const m = window.matchMedia(query);
  m.addEventListener("change", callback);
  return () => m.removeEventListener("change", callback);
}

export function MotionSwitch() {
  const osReduce = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
  const [pageReduce, setPageReduce] = useState(false);
  const reduced = osReduce || pageReduce;

  useEffect(() => {
    const root = document.querySelector(".ds-sn");
    root?.toggleAttribute("data-reduce-motion", reduced);
  }, [reduced]);

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <button
        type="button"
        aria-pressed={reduced}
        disabled={osReduce}
        onClick={() => setPageReduce((r) => !r)}
        className={`sn-chip ${reduced ? "is-on" : ""}`}
      >
        Reduce motion on this page
      </button>
      <p className="text-sm text-(--sn-ash)">
        {osReduce
          ? "Your system already asks for reduced motion, so this page is still."
          : reduced
            ? "Motion is off for this page until you reload."
            : "Fades and drifts are on. Your system setting always wins."}
      </p>
    </div>
  );
}

/* Buttons ----------------------------------------------------------------- */

export function ButtonsDemo() {
  const [message, setMessage] = useState("");
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Button onClick={() => setMessage("The lamp is on: primary action taken.")}>Enter the room</Button>
        <Button variant="secondary" onClick={() => setMessage("Secondary: you look through the window.")}>
          Look closer
        </Button>
        <Button variant="quiet" onClick={() => setMessage("Quiet: the corridor goes on.")}>
          Keep walking
        </Button>
        <Button disabled>Locked</Button>
      </div>
      <Status message={message} />
    </div>
  );
}

/* Film card with live controls ------------------------------------------- */

function LiveCard({ film, inWatchlist, onToggle }: { film: Film; inWatchlist: boolean; onToggle: () => void }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <div onKeyDown={onKeyDown}>
      <FilmCard
        film={film}
        inWatchlist={inWatchlist}
        headingLevel={4}
        actions={
          <>
            <LampToggle film={film} on={inWatchlist} onClick={onToggle} />
            <StepInside ref={buttonRef} expanded={open} controls={panelId} onClick={() => setOpen((o) => !o)}>
              Step inside<span className="sr-only"> {film.title}</span>
            </StepInside>
          </>
        }
        details={
          <div id={panelId} hidden={!open} className="sn-enter mt-2 border-t border-(--sn-ash)/30 pt-4">
            <p>
              The mood of this room is <span className="text-(--sn-amber)">{film.mood}</span>. You will find{" "}
              {film.themes.join(", ")} here.
            </p>
            <p className="mt-1 text-sm text-(--sn-ash)">Press Esc to step back out.</p>
          </div>
        }
      />
    </div>
  );
}

export function FilmCardDemo() {
  const film = films.find((f) => f.id === "mulholland-drive")!;
  const [on, setOn] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <div className="max-w-xl space-y-3">
      <LiveCard
        film={film}
        inWatchlist={on}
        onToggle={() => {
          setOn(!on);
          setMessage(on ? `The lamp is off: ${film.title} left your list.` : `The lamp is on: ${film.title} is on your list.`);
        }}
      />
      <Status message={message} />
    </div>
  );
}

/* The corridor: doors, chips, search and a naturally scrolling list ------ */

export function CorridorDemo() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [picked, setPicked] = useState<Set<Theme>>(new Set());
  const [text, setText] = useState("");
  const [list, setList] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState("");
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const matchesText = (f: Film) => `${f.title} ${f.director}`.toLowerCase().includes(text.trim().toLowerCase());
  const matchesThemes = (f: Film) => picked.size === 0 || f.themes.some((t) => picked.has(t));
  const shown = films.filter((f) => matchesText(f) && matchesThemes(f) && (!mood || f.mood === mood));
  const moodCount = (m: Mood) => films.filter((f) => matchesText(f) && matchesThemes(f) && f.mood === m).length;
  const themeCount = (t: Theme) => films.filter((f) => matchesText(f) && (!mood || f.mood === mood) && f.themes.includes(t)).length;

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
    setMessage(on ? `The lamp is on: ${f.title} is on your list (${next.size}).` : `The lamp is off: ${f.title} left your list (${next.size}).`);
  };

  const clearAll = () => {
    setMood(null);
    setPicked(new Set());
    setText("");
    inputRef.current?.focus();
  };

  const summary = shown.length === 0 ? "No door opens onto that." : `${shown.length} ${shown.length === 1 ? "room is" : "rooms are"} lit.`;

  return (
    <div className="space-y-10">
      <div>
        <label htmlFor={inputId} className="whisper text-(--sn-ash)">
          Ask the night clerk
        </label>
        <div className="sn-search sn-move mt-1 max-w-xl">
          <input
            ref={inputRef}
            id={inputId}
            type="search"
            placeholder="a title, or a name…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoComplete="off"
          />
          {text && (
            <button type="button" className="sn-clear sn-move" aria-label="Clear search" onClick={() => { setText(""); inputRef.current?.focus(); }}>
              <span aria-hidden="true">×</span>
            </button>
          )}
        </div>
      </div>

      <fieldset>
        <legend className="whisper mb-3 text-(--sn-ash)">Choose a door</legend>
        <div className="grid max-w-xl grid-cols-4 gap-3 sm:gap-5">
          {moods.map((m) => {
            const n = moodCount(m.mood);
            return (
              <Door
                key={m.mood}
                label={m.label}
                count={n}
                open={mood === m.mood}
                disabled={n === 0 && mood !== m.mood}
                onClick={() => setMood(mood === m.mood ? null : m.mood)}
              />
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="whisper mb-3 text-(--sn-ash)">What you hope to find</legend>
        <div className="flex flex-wrap gap-2">
          {themes.map((t) => {
            const n = themeCount(t);
            return (
              <Chip key={t} on={picked.has(t)} disabled={n === 0 && !picked.has(t)} onClick={() => toggleTheme(t)}>
                {t} <span className="tracking-normal text-(--sn-ash)">{n}</span>
              </Chip>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-(--sn-ash)/25 pt-6">
        <p role="status" aria-live="polite" className="f-serif text-2xl italic">
          {summary}
        </p>
        <p className="text-sm text-(--sn-ash)">
          On your list: <span className="text-(--sn-amber)">{list.size}</span>
        </p>
      </div>

      {shown.length === 0 ? (
        <Whisper title="There is nothing in this room.">
          <p>Try another door, or fewer hopes.</p>
          <Button variant="quiet" className="mt-2 -ml-2" onClick={clearAll}>
            Clear the doors and the search
          </Button>
        </Whisper>
      ) : (
        <ul aria-label="Lit rooms" className="grid gap-6 md:grid-cols-2">
          {shown.map((f, i) => (
            <li key={f.id} className={i % 2 ? "md:mt-12" : ""}>
              <LiveCard film={f} inWatchlist={list.has(f.id)} onToggle={() => toggleFilm(f)} />
            </li>
          ))}
        </ul>
      )}
      <Status message={message} />
    </div>
  );
}

/* Loading and error ------------------------------------------------------- */

export function RetrievalDemo() {
  const [phase, setPhase] = useState<"idle" | "loading" | "done" | "error">("idle");
  const film = films.find((f) => f.id === "eraserhead")!;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const run = (outcome: "done" | "error") => {
    if (timer.current) clearTimeout(timer.current);
    setPhase("loading");
    timer.current = setTimeout(() => setPhase(outcome), 1600);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <Button variant="secondary" onClick={() => run("done")} disabled={phase === "loading"}>
          Open a door
        </Button>
        <Button variant="secondary" onClick={() => run("error")} disabled={phase === "loading"}>
          Try the locked door
        </Button>
      </div>
      <p role="status" className="sr-only">
        {phase === "loading" ? "Waiting in the dark." : phase === "done" ? `${film.title}: the room is lit.` : ""}
      </p>
      <div aria-busy={phase === "loading"} className="min-h-48 max-w-xl">
        {phase === "idle" && <p className="text-(--sn-ash)">The corridor is quiet.</p>}
        {phase === "loading" && <LoadingLamp />}
        {phase === "done" && (
          <div className="sn-enter">
            <FilmCard film={film} headingLevel={4} lit />
          </div>
        )}
        {phase === "error" && (
          <div role="alert" className="sn-enter">
            <Whisper tone="error" title="This door does not open.">
              <p>The room may not exist, or it is not ours to enter. Try another door.</p>
            </Whisper>
          </div>
        )}
      </div>
    </div>
  );
}

/* Motion: a panel that drifts in, honouring both settings ---------------- */

export function MotionDemo() {
  const [lit, setLit] = useState(false);
  return (
    <div className="space-y-4">
      <Button variant="secondary" onClick={() => setLit((l) => !l)}>
        {lit ? "Darken the room" : "Light the room"}
      </Button>
      <div className="min-h-28">
        {lit && (
          <div className="sn-enter max-w-md">
            <Whisper title="The room drifts into view.">
              <p>400–600 ms of opacity and an 8 px rise. With reduced motion it simply appears.</p>
            </Whisper>
          </div>
        )}
      </div>
    </div>
  );
}
