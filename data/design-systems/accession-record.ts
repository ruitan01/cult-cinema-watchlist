// Accession Record design system: the single source of truth for its tokens.
// The mood board keeps its own copy as exploration; the watchlist will import
// from here if this direction is chosen.

export type ColorToken = {
  name: string;
  token: string;
  hex: string;
  role: string;
  /** Decorative-only colours are never used for text or essential UI. */
  decorative?: boolean;
};

export const colors: ColorToken[] = [
  { name: "Paper", token: "--ar-paper", hex: "#F3EEE4", role: "Page background" },
  { name: "Index card", token: "--ar-card", hex: "#E6DFD0", role: "Raised surfaces, tabs, hover fills" },
  { name: "Aged paper", token: "--ar-paper-aged", hex: "#E9DFC9", role: "Pressed and selected fills" },
  { name: "Ink", token: "--ar-ink", hex: "#1C1B19", role: "Text, rules, primary buttons" },
  { name: "Faded ink", token: "--ar-muted", hex: "#5E594F", role: "Secondary text, metadata" },
  { name: "Stamp red", token: "--ar-red", hex: "#A3271F", role: "Links, focus, stamps, errors — marks of action" },
  { name: "Archive blue-black", token: "--ar-blue", hex: "#22324A", role: "Primary hover, “in collection” stamp" },
  { name: "Brass", token: "--ar-brass", hex: "#9C7A3C", role: "Ornament only", decorative: true },
  { name: "Feint blue", token: "--ar-feint", hex: "#9FB3C8", role: "Index-card ruling only", decorative: true },
];

export type ContrastPair = { fg: string; bg: string; use: string; size: "text" | "large" | "ui" };

export const contrastPairs: ContrastPair[] = [
  { fg: "#1C1B19", bg: "#F3EEE4", use: "Body text on paper", size: "text" },
  { fg: "#5E594F", bg: "#F3EEE4", use: "Metadata on paper", size: "text" },
  { fg: "#A3271F", bg: "#F3EEE4", use: "Links and stamps on paper", size: "text" },
  { fg: "#1C1B19", bg: "#E6DFD0", use: "Text on index card", size: "text" },
  { fg: "#5E594F", bg: "#E6DFD0", use: "Metadata on index card", size: "text" },
  { fg: "#A3271F", bg: "#E6DFD0", use: "Selected tab label on card", size: "text" },
  { fg: "#F3EEE4", bg: "#1C1B19", use: "Primary button label", size: "text" },
  { fg: "#F3EEE4", bg: "#22324A", use: "Primary button, hover", size: "text" },
  { fg: "#22324A", bg: "#F3EEE4", use: "“In collection” stamp", size: "text" },
  { fg: "#A3271F", bg: "#F3EEE4", use: "Focus outline against paper", size: "ui" },
  { fg: "#9C7A3C", bg: "#F3EEE4", use: "Brass ornament (decorative only)", size: "ui" },
];

export type TypeRole = {
  role: string;
  family: "display" | "text" | "mono";
  size: string;
  px: number;
  lineHeight: string;
  sample: string;
  note: string;
};

export const typeScale: TypeRole[] = [
  { role: "Display", family: "display", size: "4.5rem", px: 72, lineHeight: "0.95", sample: "Eraserhead", note: "Film titles at poster scale; one per view." },
  { role: "Heading 1", family: "display", size: "3rem", px: 48, lineHeight: "1.05", sample: "The Collection", note: "Page titles." },
  { role: "Heading 2", family: "display", size: "2rem", px: 32, lineHeight: "1.15", sample: "Body horror, 1975–1999", note: "Section titles." },
  { role: "Heading 3", family: "display", size: "1.375rem", px: 22, lineHeight: "1.25", sample: "Dead Ringers", note: "Card titles." },
  { role: "Body", family: "text", size: "1.0625rem", px: 17, lineHeight: "1.6", sample: "A severed ear in a suburban field opens onto a second, nocturnal town.", note: "Programme notes; 60–72 characters per line." },
  { role: "Small", family: "text", size: "0.875rem", px: 14, lineHeight: "1.5", sample: "Received into the collection, 1986.", note: "Captions and helper text. Never smaller." },
  { role: "Label", family: "mono", size: "0.75rem", px: 12, lineHeight: "1.4", sample: "DIRECTOR · DECADE · THEME", note: "Uppercase, +0.12em tracking. Tabs and field labels only." },
  { role: "Data", family: "mono", size: "0.875rem", px: 14, lineHeight: "1.5", sample: "CCW-1983-008 · 87 MIN", note: "Accession numbers, years, running times." },
];

export const spacing = [
  { step: "1", px: 4, use: "Hairline gaps, icon to label" },
  { step: "2", px: 8, use: "Inside tags and tabs" },
  { step: "3", px: 12, use: "Between metadata lines" },
  { step: "4", px: 16, use: "Card padding (mobile), page gutter at 390 px" },
  { step: "6", px: 24, use: "Card padding, gap between cards" },
  { step: "8", px: 32, use: "Between component groups" },
  { step: "12", px: 48, use: "Between sections (mobile)" },
  { step: "16", px: 64, use: "Between sections (desktop), page margin at 1280 px" },
];

export const grid = [
  { width: "390 px", columns: 4, gutter: "16 px", margin: "16 px" },
  { width: "768 px", columns: 6, gutter: "24 px", margin: "32 px" },
  { width: "1280 px", columns: 12, gutter: "40 px", margin: "64 px (max content 1216 px)" },
];

export const principles = [
  { title: "Every film is a record", body: "Numbered, described and cross-referenced. Metadata is content, set in its own column." },
  { title: "Quiet until touched", body: "Ink on paper by default. Stamp red is reserved for marks of action: links, focus, stamps and errors." },
  { title: "Rules, not boxes", body: "Structure comes from ruled lines and columns. No shadows, no rounded cards, no motion." },
];
