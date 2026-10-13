import type { ReactNode } from "react";
import type { Artifact, ArtifactSource } from "@/data/mood-boards/types";

export type Fix = "tape" | "corners" | "staple" | "none";
export type Surface = "paper" | "bare";

function sourceLine(source: ArtifactSource): string {
  switch (source.type) {
    case "original":
      return `original · ${source.medium}`;
    case "external":
      return `${source.creator} · ${source.licence}`;
    case "pending":
      return "rights pending verification";
  }
}

function Fixings({ fix }: { fix: Fix }) {
  if (fix === "tape") {
    return <span aria-hidden="true" className="tt-tape absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rotate-2" />;
  }
  if (fix === "corners") {
    return (
      <>
        <span aria-hidden="true" className="tt-tape absolute -top-2 -left-4 z-10 h-5 w-16 -rotate-[38deg]" />
        <span aria-hidden="true" className="tt-tape absolute -right-4 -bottom-2 z-10 h-5 w-16 -rotate-[38deg]" />
      </>
    );
  }
  if (fix === "staple") {
    return (
      <svg aria-hidden="true" viewBox="0 0 40 10" className="absolute top-2 left-3 z-10 w-9">
        <path d="M2 8 V3 H38 V8" fill="none" stroke="#8a8a85" strokeWidth="2" />
        <path d="M2 3 H38" stroke="#d6d6d0" strokeWidth="0.8" />
      </svg>
    );
  }
  return null;
}

/**
 * A clipping on the collage: the artwork (on its own scrap of copier paper or
 * loose), fixed with tape or a staple, and a label-maker caption beneath.
 * Tilts stay within 2° so the typed captions remain easy to read.
 */
export function Clipping({
  artifact,
  className = "",
  tilt = "",
  fix = "none",
  surface = "paper",
  children,
}: {
  artifact: Artifact;
  className?: string;
  tilt?: string;
  fix?: Fix;
  surface?: Surface;
  children: ReactNode;
}) {
  return (
    <figure id={artifact.id.toLowerCase()} className={`tt-clip relative flex flex-col gap-3 ${tilt} ${className}`}>
      <div className={`relative ${surface === "paper" ? "tt-paper tt-soft-shadow p-4 sm:p-5" : ""}`}>
        <Fixings fix={fix} />
        {children}
      </div>
      <figcaption className="max-w-md text-sm leading-snug">
        <span className="tt-dymo text-xs">
          {artifact.id} · {artifact.title}
        </span>
        <span className="mt-1.5 block">{artifact.note}</span>
        <span className="mt-0.5 block text-xs text-(--tt-grey)">{sourceLine(artifact.source)}</span>
      </figcaption>
    </figure>
  );
}
