// Accession Record components. Presentational only (no hooks), so the static
// state matrices (server) and the live demos (client) render the same markup.
// `state` adds an .is-* class to show a pseudo-state statically.

import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { films, type Film } from "@/data/films";

export type ForcedState = "hover" | "focus" | "active" | "disabled" | "selected" | "visited" | "current";

const stateClass = (state?: ForcedState) => (state ? `is-${state}` : "");

export function accessionNo(film: Film): string {
  return `CCW-${film.year}-${String(films.indexOf(film) + 1).padStart(3, "0")}`;
}

/* Button ------------------------------------------------------------------ */

export function Button({
  variant = "primary",
  state,
  className = "",
  children,
  ...rest
}: {
  variant?: "primary" | "secondary" | "quiet";
  state?: ForcedState;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`ar-btn ar-btn--${variant} ${stateClass(state)} ${className}`}
      disabled={state === "disabled" || rest.disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

/* Drawer tab (filters) ---------------------------------------------------- */

export function Tab({
  selected,
  count,
  state,
  children,
  ...rest
}: {
  selected?: boolean;
  count?: number;
  state?: ForcedState;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={selected ?? false}
      className={`ar-tab ${stateClass(state)}`}
      disabled={state === "disabled" || rest.disabled}
      {...rest}
    >
      {children}
      {count !== undefined && <span className="count">{count}</span>}
    </button>
  );
}

/* Add-to-watchlist toggle: a request slip --------------------------------- */

export function RequestToggle({
  film,
  on,
  state,
  ...rest
}: { film: Film; on: boolean; state?: ForcedState } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" aria-pressed={on} className={`ar-request ${on ? "is-on" : ""} ${stateClass(state)}`} {...rest}>
      <span aria-hidden="true">{on ? "☒" : "☐"}</span>
      Watchlist<span className="sr-only">: {film.title}</span>
    </button>
  );
}

export function InCollectionStamp() {
  return (
    <span className="ar-stamp" style={{ borderColor: "var(--ar-blue)", color: "var(--ar-blue)", rotate: "3deg" }}>
      In collection
    </span>
  );
}

export function WatchedMark() {
  return (
    <span className="ar-stamp">
      <span aria-hidden="true">✓</span> Viewed
    </span>
  );
}

/* Disclosure -------------------------------------------------------------- */

export function DisclosureButton({
  expanded,
  controls,
  state,
  children,
  ref,
  ...rest
}: {
  expanded: boolean;
  controls: string;
  state?: ForcedState;
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={expanded}
      aria-controls={controls}
      className={`ar-disclosure ${stateClass(state)}`}
      {...rest}
    >
      <span aria-hidden="true" className="marker">
        {expanded ? "▾" : "▸"}
      </span>
      {children}
    </button>
  );
}

/* Film card --------------------------------------------------------------- */

export function FilmMeta({ film }: { film: Film }) {
  return (
    <dl className="ar-meta">
      <div>
        <dt>Acc. no.</dt>
        <dd className="text-(--ar-red)">{accessionNo(film)}</dd>
      </div>
      <div>
        <dt>Director</dt>
        <dd>{film.director}</dd>
      </div>
      <div>
        <dt>Year · Running</dt>
        <dd>
          {film.year} · {film.runtime} min
        </dd>
      </div>
    </dl>
  );
}

export function FilmCard({
  film,
  inWatchlist = false,
  watched = false,
  state,
  headingLevel = 3,
  actions,
  details,
}: {
  film: Film;
  inWatchlist?: boolean;
  watched?: boolean;
  state?: "hover" | "focus-within";
  headingLevel?: 3 | 4;
  /** Live controls; static cards render inert versions. */
  actions?: ReactNode;
  details?: ReactNode;
}) {
  const H = headingLevel === 3 ? "h3" : "h4";
  return (
    <article className={`ar-card ${state ? `is-${state}` : ""}`} aria-label={film.title}>
      <FilmMeta film={film} />
      <div className="min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <H className="f-display text-2xl leading-tight [overflow-wrap:anywhere]">{film.title}</H>
          <div className="flex gap-2">
            {inWatchlist && <InCollectionStamp />}
            {watched && <WatchedMark />}
          </div>
        </div>
        <p className="mt-2">{film.note}</p>
        <p className="smallcaps mt-2 text-sm text-(--ar-muted)">{film.themes.join(" · ")}</p>
        {actions && <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">{actions}</div>}
        {details}
      </div>
    </article>
  );
}

/* Feedback ---------------------------------------------------------------- */

export function Note({ tone = "info", title, children }: { tone?: "info" | "error"; title: string; children?: ReactNode }) {
  return (
    <div className={`ar-note ${tone === "error" ? "ar-note--error" : ""}`}>
      <p className="f-label" style={{ color: tone === "error" ? "var(--ar-red)" : "var(--ar-blue)" }}>
        {title}
      </p>
      {children && <div className="mt-1">{children}</div>}
    </div>
  );
}

export function SkeletonRecord() {
  return (
    <div className="ar-card" aria-hidden="true">
      <div className="space-y-3">
        <div className="ar-skeleton w-3/4" />
        <div className="ar-skeleton w-1/2" />
        <div className="ar-skeleton w-2/3" />
      </div>
      <div className="space-y-3">
        <div className="ar-skeleton h-5! w-1/2" />
        <div className="ar-skeleton w-full" />
        <div className="ar-skeleton w-5/6" />
      </div>
    </div>
  );
}
