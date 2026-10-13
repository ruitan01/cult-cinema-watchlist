import type { ReactNode } from "react";
import type { Artifact, ArtifactSource } from "@/data/mood-boards/types";

export type Frame = "bare" | "sheet" | "pinned" | "mount" | "placeholder";

const frameClasses: Record<Frame, string> = {
  bare: "",
  sheet: "ar-grain ar-shadow bg-(--ar-paper) text-(--ar-ink) p-5 sm:p-7",
  pinned: "ar-grain ar-shadow bg-(--ar-paper) text-(--ar-ink) p-5 sm:p-6",
  mount: "ar-shadow bg-[#fbf8f2] p-2 sm:p-3",
  placeholder:
    "border-2 border-dashed border-(--ar-muted) text-(--ar-muted) p-5 sm:p-7",
};

export function sourceLine(source: ArtifactSource): string {
  switch (source.type) {
    case "original":
      return `Original · ${source.medium}`;
    case "external":
      return `${source.creator} · ${source.licence}`;
    case "pending":
      return "Rights pending verification";
  }
}

/**
 * A board entry: the artwork plus its accession caption. Layout and frame
 * vary per artifact so the board reads as a composition, not a card grid.
 */
export function Plate({
  artifact,
  frame,
  className = "",
  tilt = "",
  captionSide = false,
  children,
}: {
  artifact: Artifact;
  frame: Frame;
  className?: string;
  tilt?: string;
  captionSide?: boolean;
  children: ReactNode;
}) {
  return (
    <figure
      id={artifact.id.toLowerCase()}
      className={`flex flex-col gap-4 ${
        captionSide ? "lg:grid lg:grid-cols-[11rem_1fr] lg:items-start lg:gap-8" : ""
      } ${className}`}
    >
      <div className={`relative ${frameClasses[frame]} ${tilt} ${captionSide ? "lg:order-2" : ""}`}>
        {frame === "pinned" && (
          <span
            aria-hidden="true"
            className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-2 bg-(--ar-paper-aged)/80 shadow-sm"
          />
        )}
        {children}
      </div>
      <figcaption
        className={`max-w-prose text-sm leading-snug text-(--ar-cap) ${
          captionSide ? "lg:order-1 lg:border-t lg:border-(--ar-cap-muted)/40 lg:pt-3" : ""
        }`}
      >
        <span className="ar-mono mr-2 text-xs font-medium tracking-wider text-(--ar-cap-accent)">
          {artifact.id}
        </span>
        <span className="ar-display text-lg">{artifact.title}</span>
        {artifact.status === "placeholder" && (
          <span className="ar-mono ml-2 border border-current px-1 text-[0.7rem] uppercase tracking-wider text-(--ar-cap-accent)">
            Placeholder
          </span>
        )}
        <span className="mt-1 block text-(--ar-cap-muted)">{artifact.note}</span>
        <span className="ar-mono mt-1 block text-xs text-(--ar-cap-muted)">
          {sourceLine(artifact.source)}
        </span>
      </figcaption>
    </figure>
  );
}
