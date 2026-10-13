"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { films, themes, type Film, type Theme } from "@/data/films";
import { Button, DisclosureButton, FilmCard, Note, RequestToggle, SkeletonRecord, Tab, accessionNo } from "./ui";

/** A polite live region: what sighted users see, screen-reader users hear. */
function Status({ message }: { message: string }) {
  return (
    <p role="status" aria-live="polite" className="f-mono min-h-6 text-sm text-(--ar-blue)">
      {message}
    </p>
  );
}

/* Buttons ----------------------------------------------------------------- */

export function ButtonsDemo() {
  const [message, setMessage] = useState("");
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setMessage("Primary: record opened.")}>Open record</Button>
        <Button variant="secondary" onClick={() => setMessage("Secondary: added to the reading list.")}>
          Reading list
        </Button>
        <Button variant="quiet" onClick={() => setMessage("Quiet: cross-reference followed.")}>
          See also
        </Button>
        <Button disabled>Withdrawn</Button>
      </div>
      <Status message={message} />
    </div>
  );
}

/* Film card with live controls ------------------------------------------- */

function LiveCard({
  film,
  compact,
  inWatchlist,
  onToggle,
}: {
  film: Film;
  compact?: boolean;
  inWatchlist: boolean;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Esc closes the note and returns focus to its button.
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
      buttonRef.current?.focus();
    }
  };

  const actions = (
    <>
      <RequestToggle film={film} on={inWatchlist} onClick={onToggle} />
      <DisclosureButton ref={buttonRef} expanded={open} controls={panelId} onClick={() => setOpen((o) => !o)}>
        Programme note<span className="sr-only"> for {film.title}</span>
      </DisclosureButton>
    </>
  );

  const details = (
    <div id={panelId} hidden={!open} className="mt-3 border-l-2 border-(--ar-red) pl-3 text-[0.95rem]">
      <p>
        {film.note} Filed under <span className="smallcaps">{film.themes.join(", ")}</span>; mood: {film.mood}.
      </p>
      <p className="f-mono mt-1 text-xs text-(--ar-muted)">Press Esc to close.</p>
    </div>
  );

  if (compact) {
    return (
      <li className="ar-card ar-card--compact" onKeyDown={onKeyDown}>
        <span className="f-mono hidden text-xs text-(--ar-red) sm:block">{accessionNo(film)}</span>
        <div className="min-w-0">
          <h4 className="f-display text-lg leading-tight [overflow-wrap:anywhere]">{film.title}</h4>
          <p className="f-mono text-xs text-(--ar-muted)">
            {film.director} · {film.year} · {film.runtime} min
          </p>
          {details}
        </div>
        <div className="flex flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-4">{actions}</div>
      </li>
    );
  }

  return (
    <div onKeyDown={onKeyDown}>
      <FilmCard film={film} inWatchlist={inWatchlist} headingLevel={4} actions={actions} details={details} />
    </div>
  );
}

export function FilmCardDemo() {
  const film = films.find((f) => f.id === "dead-ringers")!;
  const [on, setOn] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <div className="space-y-2">
      <LiveCard
        film={film}
        inWatchlist={on}
        onToggle={() => {
          setOn(!on);
          setMessage(on ? `${film.title} removed from your watchlist.` : `${film.title} added to your watchlist.`);
        }}
      />
      <Status message={message} />
    </div>
  );
}

/* Catalogue: search + drawer tabs + list --------------------------------- */

export function CatalogueDemo() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<Theme | "all">("all");
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState("");
  const inputId = useId();

  const byQuery = films.filter((f) =>
    `${f.title} ${f.director}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const shown = byQuery.filter((f) => theme === "all" || f.themes.includes(theme));
  const countFor = (t: Theme) => byQuery.filter((f) => f.themes.includes(t)).length;

  const toggle = (film: Film) => {
    const next = new Set(watchlist);
    const adding = !next.has(film.id);
    if (adding) next.add(film.id);
    else next.delete(film.id);
    setWatchlist(next);
    setMessage(`${film.title} ${adding ? "added to" : "removed from"} your watchlist. ${next.size} on the list.`);
  };

  const summary =
    shown.length === 0 ? "No holdings match this index." : `${shown.length} ${shown.length === 1 ? "record" : "records"} found.`;

  return (
    <div className="space-y-4">
      <div className="ar-field max-w-md">
        <label htmlFor={inputId} className="f-label text-(--ar-muted)">
          Search the catalogue
        </label>
        <input
          id={inputId}
          type="search"
          className="ar-input"
          placeholder="Title or director"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div role="group" aria-label="Filter by theme" className="flex flex-wrap gap-1 border-b border-(--ar-ink)">
        <Tab selected={theme === "all"} count={byQuery.length} onClick={() => setTheme("all")}>
          All
        </Tab>
        {themes.map((t) => (
          <Tab
            key={t}
            selected={theme === t}
            count={countFor(t)}
            disabled={countFor(t) === 0 && theme !== t}
            onClick={() => setTheme(t)}
          >
            {t}
          </Tab>
        ))}
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p role="status" aria-live="polite" className="f-mono text-sm">
          {summary}
        </p>
        <p className="f-mono text-sm text-(--ar-blue)">Watchlist: {watchlist.size}</p>
      </div>

      {shown.length === 0 ? (
        <Note title="No holdings match this index">
          <p>Try another theme or a shorter search.</p>
          <Button
            variant="quiet"
            className="mt-1 -ml-2"
            onClick={() => {
              setQuery("");
              setTheme("all");
            }}
          >
            Clear search and filters
          </Button>
        </Note>
      ) : (
        <ul className="max-h-[34rem] overflow-y-auto border-b border-(--ar-ink)" aria-label="Catalogue results">
          {shown.map((f) => (
            <LiveCard key={f.id} film={f} compact inWatchlist={watchlist.has(f.id)} onToggle={() => toggle(f)} />
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
  const film = films.find((f) => f.id === "videodrome")!;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const run = (outcome: "done" | "error") => {
    if (timer.current) clearTimeout(timer.current);
    setPhase("loading");
    timer.current = setTimeout(() => setPhase(outcome), 1200);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={() => run("done")} disabled={phase === "loading"}>
          Retrieve a record
        </Button>
        <Button variant="secondary" onClick={() => run("error")} disabled={phase === "loading"}>
          Request a missing record
        </Button>
      </div>
      <p role="status" className="sr-only">
        {phase === "loading" ? "Retrieving from the stacks." : phase === "done" ? `${film.title} retrieved.` : ""}
      </p>
      <div aria-busy={phase === "loading"} className="min-h-40">
        {phase === "idle" && <p className="text-(--ar-muted)">Nothing requested yet.</p>}
        {phase === "loading" && (
          <div className="space-y-2">
            <p aria-hidden="true" className="f-mono text-sm">
              Retrieving from the stacks…
            </p>
            <SkeletonRecord />
          </div>
        )}
        {phase === "done" && <FilmCard film={film} headingLevel={4} />}
        {phase === "error" && (
          <div role="alert">
            <Note tone="error" title="Record missing">
              <p>CCW-1990-??? is not in the stacks. It may be on loan or was never catalogued.</p>
            </Note>
          </div>
        )}
      </div>
    </div>
  );
}
