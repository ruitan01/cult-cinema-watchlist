import type { ReactNode } from "react";
import type { Artifact, ArtifactSource } from "@/data/mood-boards/types";

function sourceLine(source: ArtifactSource): string {
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
 * An artifact standing in the dark with a small museum wall label. No frame,
 * no card: the label sits beside the work on wide screens when `labelSide`
 * is set, otherwise beneath it.
 */
export function Exhibit({
  artifact,
  className = "",
  labelSide,
  children,
}: {
  artifact: Artifact;
  className?: string;
  labelSide?: "left" | "right";
  children: ReactNode;
}) {
  const side =
    labelSide === "left"
      ? "lg:flex-row-reverse lg:items-end"
      : labelSide === "right"
        ? "lg:flex-row lg:items-end"
        : "";
  return (
    <figure
      id={artifact.id.toLowerCase()}
      className={`sn-reveal flex flex-col gap-5 ${side} ${className}`}
    >
      <div className={labelSide ? "lg:min-w-0 lg:flex-1" : ""}>{children}</div>
      <figcaption
        className={`max-w-sm text-sm leading-relaxed ${labelSide ? "lg:w-56 lg:shrink-0" : ""}`}
      >
        <span className="sn-whisper block text-xs text-(--sn-amber)">{artifact.id}</span>
        <span className="sn-serif block text-xl leading-tight text-(--sn-lamp) italic">
          {artifact.title}
        </span>
        <span className="mt-1 block text-(--sn-ash)">{artifact.note}</span>
        <span className="mt-1 block text-xs tracking-wide text-(--sn-ash)">
          {sourceLine(artifact.source)}
        </span>
      </figcaption>
    </figure>
  );
}
