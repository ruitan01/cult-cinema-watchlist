// Tape Trader components. Presentational only (no hooks), so the static state
// rows (server) and the live demos (client) render the same markup.

import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { films, type Film } from "@/data/films";

export type ForcedState = "hover" | "focus" | "active" | "disabled" | "on" | "open" | "visited" | "current";

const cls = (state?: ForcedState) => (state ? `is-${state}` : "");

/** A trader's grading, derived from the film's place in the list. */
export function grade(film: Film): string {
  const i = films.findIndex((f) => f.id === film.id);
  return ["1ST", "2ND", "3RD"][Math.max(i, 1) % 3];
}

/* Ransom letters ---------------------------------------------------------- */

const ransomStyles = [
  "f-anton bg-(--tt-toner) text-(--tt-paper) px-1.5 -rotate-3",
  "font-bold bg-(--tt-yellow) px-1 rotate-2",
  "f-web italic bg-white px-1 -rotate-1 border border-(--tt-toner)/20",
  "f-vt bg-(--tt-blue) text-white px-1 rotate-3",
  "f-marker text-(--tt-red) px-0.5 -rotate-6",
  "f-anton bg-(--tt-pink) px-1 rotate-1",
];

export function RansomWord({ text, size }: { text: string; size: string }) {
  let k = 0;
  return (
    <span role="img" aria-label={text} className={`inline-flex flex-wrap items-center gap-x-4 gap-y-2 ${size}`}>
      {text.split(" ").map((word, w) => (
        <span key={w} aria-hidden="true" className="inline-flex items-center gap-x-1 whitespace-nowrap">
          {word.split("").map((ch, i) => (
            <span key={i} className={`inline-block leading-none shadow-[1px_1px_0_rgb(17_17_17/0.35)] ${ransomStyles[k++ % ransomStyles.length]}`}>
              {ch}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

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
      className={`tt-btn tt-btn--${variant} tt-move ${cls(state)} ${className}`}
      disabled={state === "disabled" || rest.disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

/* Single choice: label-maker strip ---------------------------------------- */

export function Strip({ on, state, children, ...rest }: { on: boolean; state?: ForcedState; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={on}
      className={`tt-strip tt-move ${on ? "is-on" : ""} ${cls(state)}`}
      disabled={state === "disabled" || rest.disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

/* Multi choice: genre-dot sticker ----------------------------------------- */

const dotColours = ["bg-(--tt-pink)", "bg-(--tt-cyan)", "bg-(--tt-yellow)", "bg-(--tt-red)", "bg-(--tt-blue)", "bg-white"];

export function Dot({
  on,
  colour = 0,
  state,
  children,
  ...rest
}: { on: boolean; colour?: number; state?: ForcedState; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={on}
      className={`tt-dot tt-move ${on ? "is-on" : ""} ${cls(state)}`}
      disabled={state === "disabled" || rest.disabled}
      {...rest}
    >
      <span aria-hidden="true" className={`sticker ${on ? "bg-white" : dotColours[colour % dotColours.length]}`}>
        {on ? "✓" : ""}
      </span>
      {children}
    </button>
  );
}

/* MY LIST toggle ---------------------------------------------------------- */

export function CheckBox({ on }: { on: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 shrink-0">
      <rect x="2.5" y="4.5" width="16" height="16" fill="#fff" stroke="#111" strokeWidth="2" />
      {on && <path d="M5 12.5 9.5 18 22 2.5" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

export function MyList({ film, on, state, ...rest }: { film: Film; on: boolean; state?: ForcedState } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" aria-pressed={on} className={`tt-mylist tt-move ${on ? "is-on" : ""} ${cls(state)}`} {...rest}>
      <CheckBox on={on} />
      MY LIST<span className="sr-only">: {film.title}</span>
    </button>
  );
}

export function SeenSticker() {
  return (
    <span className="tt-seen">
      SEEN
      <br />
      IT!
    </span>
  );
}

/* Disclosure -------------------------------------------------------------- */

export function Review({
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
      className={`tt-review ${expanded ? "is-open" : ""} ${cls(state)}`}
      {...rest}
    >
      <span aria-hidden="true">[{expanded ? "–" : "+"}]</span>
      {children}
    </button>
  );
}

/* Film card (taped clipping with a spine) --------------------------------- */

export function FilmCard({
  film,
  onList = false,
  seen = false,
  state,
  headingLevel = 3,
  actions,
  details,
}: {
  film: Film;
  onList?: boolean;
  seen?: boolean;
  state?: "hover" | "focus-within";
  headingLevel?: 3 | 4;
  actions?: ReactNode;
  details?: ReactNode;
}) {
  const H = headingLevel === 3 ? "h3" : "h4";
  return (
    <article aria-label={film.title} className={`tt-card tt-move ${state ? `is-${state}` : ""}`}>
      <span aria-hidden="true" className="tape absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rotate-2" />
      <div aria-hidden="true" className="spine">
        {film.title.toUpperCase().slice(0, 18)}
      </div>
      <div className="min-w-0 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <H className="f-anton text-[1.75rem] leading-none uppercase [overflow-wrap:anywhere]">{film.title}</H>
          {seen && <SeenSticker />}
        </div>
        <p className="mt-2 text-sm">
          {film.director.toUpperCase()} · {film.year} · {film.runtime} MIN · {grade(film)} GEN SP
        </p>
        <p className="mt-2">{film.note}</p>
        <p className="mt-2 flex flex-wrap gap-1.5 text-xs font-bold uppercase">
          {film.themes.map((t) => (
            <span key={t} className="bg-(--tt-cyan) px-1.5">
              {t}
            </span>
          ))}
        </p>
        {onList && (
          <p className="f-anton mt-3 inline-block bg-(--tt-pink) px-2 text-lg">
            <span aria-hidden="true">✓ </span>ON MY LIST
          </p>
        )}
        {actions && <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">{actions}</div>}
        {details}
      </div>
    </article>
  );
}

/* Feedback ---------------------------------------------------------------- */

export function Note({ tone = "ok", title, children }: { tone?: "ok" | "error"; title: string; children?: ReactNode }) {
  return (
    <div className={`tt-note ${tone === "error" ? "tt-note--error" : ""}`}>
      <span aria-hidden="true" className="tape absolute -top-3 left-4 h-5 w-16 -rotate-3" />
      {tone === "error" ? (
        <p className="f-anton inline-block bg-(--tt-red) px-2 text-xl text-white">{title}</p>
      ) : (
        <p className="f-anton text-xl">{title}</p>
      )}
      {children && <div className={`mt-1 text-[0.95rem] ${tone === "error" ? "text-(--tt-blood)" : ""}`}>{children}</div>}
    </div>
  );
}

export function NoSignal() {
  return (
    <div role="img" aria-label="Placeholder: no signal, image missing" className="tt-screen grid aspect-video place-items-center">
      <div aria-hidden="true" className="scanlines absolute inset-0" />
      <p aria-hidden="true" className="relative text-4xl">
        NO SIGNAL
      </p>
    </div>
  );
}
