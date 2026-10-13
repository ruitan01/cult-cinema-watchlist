// Shared schema for the three mood boards. Each board supplies its own data
// file; how an artifact is drawn lives with the board's route, not here.

export type ArtifactKind =
  | "colour"
  | "typography"
  | "texture"
  | "structure"
  | "ephemera"
  | "interface"
  | "image";

/** Made for this project, e.g. with CSS, SVG or a font specimen. */
export type OriginalSource = {
  type: "original";
  medium: string;
};

/** Third-party material with verified reuse rights. */
export type ExternalSource = {
  type: "external";
  creator: string;
  work: string;
  date: string;
  /** Page for the specific file, where its rights statement can be checked. */
  url: string;
  /** Institution that holds or digitised the original, if different. */
  heldBy?: string;
  licence: string;
  /** The rights statement for this specific file, quoted or summarised. */
  rightsStatement: string;
  licenceUrl?: string;
  /** ISO date the rights statement was checked. */
  retrieved: string;
  modifications?: string;
};

/** A slot reserved for third-party material whose rights are not yet verified. */
export type PendingSource = {
  type: "pending";
  candidate: string;
  fallback: string;
};

export type ArtifactSource = OriginalSource | ExternalSource | PendingSource;

export type ArtifactStatus = "draft" | "placeholder" | "complete";

/** A local image under /public, for artifacts that are photographs or scans. */
export type ArtifactImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Artifact = {
  /** Board-prefixed accession number, e.g. "AR-07". */
  id: string;
  section: string;
  title: string;
  kind: ArtifactKind;
  /** Why the artifact is on the board. */
  note: string;
  status: ArtifactStatus;
  source: ArtifactSource;
  image?: ArtifactImage;
};

export type MoodBoardSection = {
  id: string;
  numeral: string;
  title: string;
  blurb: string;
};

export type MoodBoard = {
  slug: string;
  number: string;
  title: string;
  concept: string;
  keywords: string[];
  sections: MoodBoardSection[];
  artifacts: Artifact[];
};

/** Font licences are credited once per board rather than per artifact. */
export type FontCredit = {
  family: string;
  designer: string;
  licence: string;
  licenceUrl: string;
};
