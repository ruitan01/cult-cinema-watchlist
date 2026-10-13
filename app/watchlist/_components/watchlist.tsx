"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { films, themes, type Film, type Mood, type Theme } from "@/data/films";
import { Bulb, Button, Chip, Door, FilmCard, LampToggle, SeenMark, Whisper, moods } from "@/components/somnambulist/ui";

type Sort = "year" | "title" | "runtime";
type Entry = { seen: boolean };

const sorters: Record<Sort, (a: Film, b: Film) => number> = {
  year: (a, b) => a.year - b.year,
  title: (a, b) => a.title.localeCompare(b.title),
  runtime: (a, b) => a.runtime - b.runtime,
};

function hours(min: number) {
  const h = Math.floor(min / 60);
  return h ? `${h} h ${min % 60} min` : `${min} min`;
}

/* Your list (rendered in the desktop rail and in the mobile panel) -------- */

function YourList({
  list,
  onSeen,
  onRemove,
  onClear,
  headingId,
}: {
  list: Map<string, Entry>;
  onSeen: (f: Film) => void;
  onRemove: (f: Film) => void;
  onClear: () => void;
  headingId: string;
}) {
  const [confirm, setConfirm] = useState(false);
  const entries = films.filter((f) => list.has(f.id));
  const total = entries.reduce((n, f) => n + f.runtime, 0);
  const allSeen = entries.length > 0 && entries.every((f) => list.get(f.id)!.seen);

  return (
    <div>
      <h2 id={headingId} tabIndex={-1} className="f-serif text-3xl italic focus:outline-none">
        Your list
      </h2>
      <p className="mt-1 text-sm text-(--sn-ash)">
        {entries.length === 0 ? "No lamps lit yet." : `${entries.length} ${entries.length === 1 ? "lamp" : "lamps"} lit · ${hours(total)}`}
      </p>
      {entries.length === 0 ? (
        <div className="mt-5">
          <Whisper title="Nothing is waiting here yet.">
            <p>Light the lamp on any film and it will wait for you here.</p>
          </Whisper>
        </div>
      ) : (
        <>
          {allSeen && <p className="mt-4 text-(--sn-amber)">You have seen everything you meant to.</p>}
          <ul className="mt-5 space-y-3">
            {entries.map((f) => {
              const seen = list.get(f.id)!.seen;
              return (
                <li key={f.id} data-entry={f.id} className="rounded-[4px] border border-(--sn-ash)/30 bg-(--sn-smoke) p-3">
                  <p className={`f-serif text-xl italic ${seen ? "text-(--sn-ash)" : ""}`}>{f.title}</p>
                  <p className="text-sm text-(--sn-ash)">
                    {f.year} · {f.runtime} min {seen && <span className="ml-1"><SeenMark /></span>}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button type="button" aria-pressed={seen} className={`sn-chip ${seen ? "is-on" : ""}`} onClick={() => onSeen(f)}>
                      Seen<span className="sr-only"> {f.title}</span>
                    </button>
                    <button type="button" className="sn-chip" onClick={() => onRemove(f)}>
                      Remove<span className="sr-only"> {f.title}</span>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-5">
            {confirm ? (
              <p className="flex flex-wrap items-center gap-3 text-sm">
                Put out every lamp?
                <Button variant="secondary" onClick={() => { onClear(); setConfirm(false); }}>
                  Yes, clear
                </Button>
                <Button variant="quiet" onClick={() => setConfirm(false)}>
                  Keep them
                </Button>
              </p>
            ) : (
              <Button variant="quiet" onClick={() => setConfirm(true)}>
                Clear the list
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* The whole watchlist ----------------------------------------------------- */

export function Watchlist() {
  const [text, setText] = useState("");
  const [mood, setMood] = useState<Mood | null>(null);
  const [picked, setPicked] = useState<Set<Theme>>(new Set());
  const [sort, setSort] = useState<Sort>("year");
  const [list, setList] = useState<Map<string, Entry>>(new Map());
  const [message, setMessage] = useState("");
  const [detail, setDetail] = useState<Film | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const panelButtonRef = useRef<HTMLButtonElement>(null);
  const searchId = useId();
  const sortId = useId();

  const byText = (f: Film) => `${f.title} ${f.director}`.toLowerCase().includes(text.trim().toLowerCase());
  const byThemes = (f: Film) => picked.size === 0 || f.themes.some((t) => picked.has(t));
  const byMood = (f: Film) => !mood || f.mood === mood;
  const shown = films.filter((f) => byText(f) && byThemes(f) && byMood(f)).sort(sorters[sort]);
  const moodCount = (m: Mood) => films.filter((f) => byText(f) && byThemes(f) && f.mood === m).length;
  const themeCount = (t: Theme) => films.filter((f) => byText(f) && byMood(f) && f.themes.includes(t)).length;

  const toggleTheme = (t: Theme) => {
    const next = new Set(picked);
    if (next.has(t)) next.delete(t);
    else next.add(t);
    setPicked(next);
  };

  const toggleFilm = (f: Film) => {
    const next = new Map(list);
    const on = !next.has(f.id);
    if (on) next.set(f.id, { seen: false });
    else next.delete(f.id);
    setList(next);
    setMessage(on ? `The lamp is on: ${f.title} is on your list (${next.size}).` : `The lamp is off: ${f.title} left your list (${next.size}).`);
  };

  const toggleSeen = (f: Film) => {
    const next = new Map(list);
    const seen = !next.get(f.id)!.seen;
    next.set(f.id, { seen });
    setList(next);
    setMessage(seen ? `${f.title} marked as seen.` : `${f.title} marked as not seen.`);
  };

  const remove = (f: Film) => {
    const order = films.filter((x) => list.has(x.id)).map((x) => x.id);
    const nextId = order[order.indexOf(f.id) + 1] ?? order[order.indexOf(f.id) - 1];
    const next = new Map(list);
    next.delete(f.id);
    setList(next);
    setMessage(`${f.title} left your list (${next.size}).`);
    // Keep focus in the list: the next entry's first button, else the heading.
    requestAnimationFrame(() => {
      const scope = document.activeElement?.closest("[data-list-scope]") ?? document;
      const target = nextId ? scope.querySelector<HTMLElement>(`[data-entry="${nextId}"] button`) : null;
      (target ?? scope.querySelector<HTMLElement>("h2[tabindex]"))?.focus();
    });
  };

  const clearList = () => {
    setList(new Map());
    setMessage("Every lamp is out. Your list is empty.");
  };

  const clearFilters = () => {
    setText("");
    setMood(null);
    setPicked(new Set());
    searchRef.current?.focus();
  };

  // Film details: a native modal dialog (focus trap, Esc and inert page for free).
  useEffect(() => {
    const d = dialogRef.current;
    if (detail && d && !d.open) d.showModal();
  }, [detail]);

  const closeDetail = () => {
    const id = detail?.id;
    dialogRef.current?.close();
    setDetail(null);
    if (id) requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-detail="${id}"]`)?.focus());
  };

  const onPanelKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setPanelOpen(false);
      panelButtonRef.current?.focus();
    }
  };

  const summary = shown.length === 0 ? "No door opens onto that." : `${shown.length} ${shown.length === 1 ? "film is" : "films are"} lit.`;
  const listProps = { list, onSeen: toggleSeen, onRemove: remove, onClear: clearList };

  return (
    <>
      <div className="grid gap-12 px-5 pb-32 sm:px-10 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        {/* Controls and films */}
        <div className="lg:col-span-8">
          <section aria-labelledby="find-title" className="space-y-8">
            <h2 id="find-title" className="sr-only">
              Find a film
            </h2>
            <div>
              <label htmlFor={searchId} className="whisper text-(--sn-ash)">
                Ask the night clerk
              </label>
              <div className="sn-search sn-move mt-1 max-w-xl">
                <input
                  ref={searchRef}
                  id={searchId}
                  type="search"
                  placeholder="a title, or a director…"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  autoComplete="off"
                />
                {text && (
                  <button type="button" className="sn-clear sn-move" aria-label="Clear search" onClick={() => { setText(""); searchRef.current?.focus(); }}>
                    <span aria-hidden="true">×</span>
                  </button>
                )}
              </div>
            </div>

            <fieldset>
              <legend className="whisper mb-3 text-(--sn-ash)">Choose a mood</legend>
              <div className="grid max-w-lg grid-cols-4 gap-3 sm:gap-5">
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
              <legend className="whisper mb-3 text-(--sn-ash)">Themes</legend>
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

            <div className="flex flex-wrap items-end justify-between gap-4 border-t border-(--sn-ash)/25 pt-6">
              <p role="status" aria-live="polite" className="f-serif text-2xl italic">
                {summary}
              </p>
              <div className="flex items-center gap-3">
                <label htmlFor={sortId} className="whisper text-(--sn-ash)">
                  Order by
                </label>
                <select id={sortId} value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="sn-select">
                  <option value="year">Year</option>
                  <option value="title">Title</option>
                  <option value="runtime">Running time</option>
                </select>
              </div>
            </div>
          </section>

          <section aria-labelledby="films-title" className="mt-10">
            <h2 id="films-title" className="sr-only">
              The films
            </h2>
            {shown.length === 0 ? (
              <Whisper title="No door opens onto that.">
                <p>Try another mood, fewer themes or a shorter search.</p>
                <Button variant="quiet" className="mt-2 -ml-2" onClick={clearFilters}>
                  Clear the search and filters
                </Button>
              </Whisper>
            ) : (
              <ul className="grid gap-6 md:grid-cols-2">
                {shown.map((f, i) => (
                  <li key={f.id} className={i % 2 ? "md:mt-12" : ""}>
                    <FilmCard
                      film={f}
                      inWatchlist={list.has(f.id)}
                      seen={list.get(f.id)?.seen}
                      actions={
                        <>
                          <LampToggle film={f} on={list.has(f.id)} onClick={() => toggleFilm(f)} />
                          <button type="button" data-detail={f.id} className="sn-step sn-move" onClick={() => setDetail(f)}>
                            <span aria-hidden="true" className="marker">→</span>
                            Step inside<span className="sr-only"> {f.title}</span>
                          </button>
                        </>
                      }
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Desktop rail */}
        <aside aria-label="Your list" data-list-scope className="hidden lg:col-span-4 lg:block">
          <div className="wl-rail sticky top-6 rounded-[4px] border border-(--sn-ash)/30 bg-(--sn-night) p-6">
            <YourList {...listProps} headingId="list-title-desktop" />
          </div>
        </aside>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {message}
      </p>

      {/* Mobile bottom bar + panel */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden" onKeyDown={onPanelKey}>
        <div
          id="list-panel"
          hidden={!panelOpen}
          data-list-scope
          className="wl-rail max-h-[65svh] overflow-y-auto border-t border-(--sn-ash)/30 bg-(--sn-night) px-5 py-6"
        >
          <YourList {...listProps} headingId="list-title-mobile" />
        </div>
        <div className="border-t border-(--sn-amber)/50 bg-(--sn-night)/95 px-5 py-2 backdrop-blur-sm">
          <button
            ref={panelButtonRef}
            type="button"
            aria-expanded={panelOpen}
            aria-controls="list-panel"
            onClick={() => setPanelOpen((o) => !o)}
            className="sn-btn sn-btn--secondary sn-move w-full justify-between"
          >
            <span className="inline-flex items-center gap-2">
              <Bulb on={list.size > 0} className="size-5" /> Your list · {list.size}
            </span>
            <span aria-hidden="true">{panelOpen ? "▾" : "▴"}</span>
          </button>
        </div>
      </div>

      {/* Film details */}
      <dialog
        ref={dialogRef}
        aria-labelledby="detail-title"
        onClose={() => detail && closeDetail()}
        className="wl-dialog m-auto w-[min(36rem,calc(100vw-2rem))] rounded-[4px] border border-(--sn-amber)/50 bg-(--sn-room) p-0 text-(--sn-lamp)"
      >
        {detail && (
          <div className="sn-enter p-6 sm:p-8">
            <p className="whisper text-(--sn-amber)">{detail.mood}</p>
            <h2 id="detail-title" className="f-serif mt-1 text-4xl leading-tight italic">
              {detail.title}
            </h2>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 text-sm">
              <dt className="text-(--sn-ash)">Director</dt>
              <dd>{detail.director}</dd>
              <dt className="text-(--sn-ash)">Year</dt>
              <dd>{detail.year}</dd>
              <dt className="text-(--sn-ash)">Running time</dt>
              <dd>{detail.runtime} min</dd>
              <dt className="text-(--sn-ash)">Themes</dt>
              <dd>{detail.themes.join(", ")}</dd>
            </dl>
            <p className="mt-5 text-lg">{detail.note}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <LampToggle film={detail} on={list.has(detail.id)} onClick={() => toggleFilm(detail)} />
              <Button variant="quiet" onClick={closeDetail}>
                Step back out
              </Button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
