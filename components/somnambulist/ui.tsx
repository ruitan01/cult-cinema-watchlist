// Shared Somnambulist components, used by the design-system page and the
// watchlist. Presentational only (no hooks), so server and client components
// render the same markup. Styles: ./somnambulist.css (scope: .ds-sn).

import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import type { Film, Mood } from "@/data/films";

export type ForcedState = "hover" | "focus" | "active" | "disabled" | "on" | "open" | "lit" | "visited" | "current";

const cls = (state?: ForcedState) => (state ? `is-${state}` : "");

/* Button ------------------------------------------------------------------ */

export function Button({
  variant = "primary",
  state,
  className = "",
  children,
  ...rest
}: { variant?: "primary" | "secondary" | "quiet"; state?: ForcedState; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`sn-btn sn-btn--${variant} sn-move ${cls(state)} ${className}`}
      disabled={state === "disabled" || rest.disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

/* Lamp toggle: bulb outline when off, filled bulb with rays when on ------- */

export function Bulb({ on, className = "" }: { on: boolean; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`size-6 shrink-0 ${className}`}>
      {on && (
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M12 1.5v2M3.5 5l1.5 1.4M20.5 5 19 6.4M1.5 12h2M20.5 12h2" />
        </g>
      )}
      <path
        d="M12 5.5a5.5 5.5 0 0 0-3.2 10c.6.5.9 1.1.9 1.8v.7h4.6v-.7c0-.7.3-1.3.9-1.8A5.5 5.5 0 0 0 12 5.5Z"
        fill={on ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray={on ? undefined : "2.2 2"}
      />
      <path d="M9.8 20.5h4.4M10.5 22.5h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function LampToggle({
  film,
  on,
  state,
  ...rest
}: { film: Film; on: boolean; state?: ForcedState } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" aria-pressed={on} className={`sn-lamp sn-move ${on ? "is-on" : ""} ${cls(state)}`} {...rest}>
      <Bulb on={on} />
      Watchlist<span className="sr-only">: {film.title}</span>
      <span aria-hidden="true" className="state">
        {on ? "on" : "off"}
      </span>
    </button>
  );
}

export function SeenMark() {
  return (
    <span className="sn-seen">
      <svg aria-hidden="true" viewBox="0 0 24 12" className="w-6">
        <path d="M2 3c3 5 17 5 20 0M6 6.5 4.5 9M12 7.5V10M18 6.5 19.5 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      Seen
    </span>
  );
}

/* Mood door --------------------------------------------------------------- */

export const moods: { mood: Mood; label: string }[] = [
  { mood: "dread", label: "Dread" },
  { mood: "desire", label: "Desire" },
  { mood: "dream", label: "Dream" },
  { mood: "decay", label: "Decay" },
];

export function Door({
  label,
  count,
  open,
  state,
  ...rest
}: { label: string; count?: number; open: boolean; state?: ForcedState } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={open}
      className={`sn-door ${open ? "is-open" : ""} ${cls(state)}`}
      disabled={state === "disabled" || rest.disabled}
      {...rest}
    >
      <span aria-hidden="true" className="arch sn-move">
        <span className="leaf sn-move" />
      </span>
      <span className="label">
        {open && <span aria-hidden="true">◆ </span>}
        {label}
        {count !== undefined && <span className="ml-1 tracking-normal text-(--sn-ash)">({count})</span>}
      </span>
    </button>
  );
}

/* Theme chip -------------------------------------------------------------- */

export function Chip({
  on,
  state,
  children,
  ...rest
}: { on: boolean; state?: ForcedState; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={on}
      className={`sn-chip sn-move ${on ? "is-on" : ""} ${cls(state)}`}
      disabled={state === "disabled" || rest.disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

/* Disclosure: "Step inside" ---------------------------------------------- */

export function StepInside({
  expanded,
  controls,
  state,
  ref,
  children,
  ...rest
}: {
  expanded: boolean;
  controls: string;
  state?: ForcedState;
  ref?: Ref<HTMLButtonElement>;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={expanded}
      aria-controls={controls}
      className={`sn-step sn-move ${expanded ? "is-open" : ""} ${cls(state)}`}
      {...rest}
    >
      <span aria-hidden="true" className="marker">
        {expanded ? "◇" : "→"}
      </span>
      {children}
    </button>
  );
}

/* Film card --------------------------------------------------------------- */

export function FilmCard({
  film,
  inWatchlist = false,
  seen = false,
  lit = false,
  headingLevel = 3,
  actions,
  details,
}: {
  film: Film;
  inWatchlist?: boolean;
  seen?: boolean;
  lit?: boolean;
  headingLevel?: 3 | 4;
  actions?: ReactNode;
  details?: ReactNode;
}) {
  const H = headingLevel === 3 ? "h3" : "h4";
  return (
    <article aria-label={film.title} className={`sn-card sn-move grain ${lit ? "is-lit" : ""}`}>
      <p className="whisper text-(--sn-amber)">{film.mood}</p>
      <H className="f-serif text-[1.75rem] leading-[1.15] italic [overflow-wrap:anywhere]">{film.title}</H>
      <p className="meta">
        {film.year} · {film.director} · {film.runtime} min
      </p>
      <p>{film.note}</p>
      {(inWatchlist || seen) && (
        <p className="flex flex-wrap gap-x-5 gap-y-1">
          {inWatchlist && (
            <span className="inline-flex items-center gap-1.5 text-sm text-(--sn-amber)">
              <Bulb on className="size-5" /> On your list
            </span>
          )}
          {seen && <SeenMark />}
        </p>
      )}
      {actions && <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">{actions}</div>}
      {details}
    </article>
  );
}

/* Feedback ---------------------------------------------------------------- */

export function Whisper({ tone = "info", title, children }: { tone?: "info" | "error"; title: string; children?: ReactNode }) {
  return (
    <div className={`sn-whisper-note ${tone === "error" ? "sn-whisper-note--error" : ""}`}>
      <p className="f-serif text-xl italic" style={{ color: tone === "error" ? "var(--sn-ember)" : "var(--sn-lamp)" }}>
        {title}
      </p>
      {children && <div className="mt-1 text-[0.95rem] text-(--sn-ash)">{children}</div>}
    </div>
  );
}

export function LoadingLamp() {
  return (
    <div className="flex items-center gap-4">
      <span className="sn-breathe text-(--sn-amber) opacity-60">
        <Bulb on className="size-10" />
      </span>
      <p className="f-serif text-xl italic">Waiting in the dark…</p>
    </div>
  );
}
