// Tape Trader design system: the single source of truth for its tokens.
// The mood board keeps its own copy as exploration.

import type { ColorToken, ContrastPair, TypeRole } from "./accession-record";

export const colors: ColorToken[] = [
  { name: "Copier paper", token: "--tt-paper", hex: "#EDEDE8", role: "Page surface" },
  { name: "Toner", token: "--tt-toner", hex: "#111111", role: "Text, 2 px borders, hard shadows" },
  { name: "Photocopy grey", token: "--tt-grey", hex: "#55554F", role: "Secondary text" },
  { name: "Tape-label blue", token: "--tt-blue", hex: "#1F3FBF", role: "Links, the VCR screen" },
  { name: "Visited purple", token: "--tt-visited", hex: "#551A8B", role: "Visited links, the early-web way" },
  { name: "Highlighter yellow", token: "--tt-yellow", hex: "#F5FF3B", role: "Primary buttons, hover, selected strips" },
  { name: "Highlighter pink", token: "--tt-pink", hex: "#FF2E88", role: "Fills behind text only; never a boundary alone" },
  { name: "Tracking cyan", token: "--tt-cyan", hex: "#00B3C7", role: "Fills; VCR bar data" },
  { name: "Gore red", token: "--tt-red", hex: "#D7261E", role: "Sticker fills with white text; never small text on paper" },
  { name: "Blood", token: "--tt-blood", hex: "#B3170F", role: "Error text on paper" },
  { name: "Desk", token: "--tt-desk", hex: "#262522", role: "Page surround, the VCR bar" },
  { name: "Bevel grey", token: "--tt-bevel", hex: "#C0C0C0", role: "Early-web controls" },
];

export const contrastPairs: ContrastPair[] = [
  { fg: "#111111", bg: "#EDEDE8", use: "Body text on copier paper", size: "text" },
  { fg: "#55554F", bg: "#EDEDE8", use: "Secondary text on paper", size: "text" },
  { fg: "#1F3FBF", bg: "#EDEDE8", use: "Links on paper", size: "text" },
  { fg: "#551A8B", bg: "#EDEDE8", use: "Visited links on paper", size: "text" },
  { fg: "#111111", bg: "#F5FF3B", use: "Text on yellow (buttons, highlights)", size: "text" },
  { fg: "#111111", bg: "#FF2E88", use: "Text on pink (MY LIST, on)", size: "text" },
  { fg: "#111111", bg: "#00B3C7", use: "Text on cyan stickers", size: "text" },
  { fg: "#FFFFFF", bg: "#D7261E", use: "White on gore-red labels", size: "text" },
  { fg: "#B3170F", bg: "#EDEDE8", use: "Error text on paper", size: "text" },
  { fg: "#FFFFFF", bg: "#1F3FBF", use: "VCR screen text", size: "text" },
  { fg: "#EDEDE8", bg: "#262522", use: "VCR bar labels on desk", size: "text" },
  { fg: "#111111", bg: "#C0C0C0", use: "Bevel button labels", size: "text" },
  { fg: "#111111", bg: "#EDEDE8", use: "2 px toner borders and focus outline", size: "ui" },
  { fg: "#F5FF3B", bg: "#262522", use: "Focus outline on the dark bar", size: "ui" },
  { fg: "#D7261E", bg: "#EDEDE8", use: "Gore red as text on paper (not allowed)", size: "text" },
  { fg: "#FF2E88", bg: "#EDEDE8", use: "Pink as a line on paper (not allowed alone)", size: "ui" },
];

export const typeScale: TypeRole[] = [
  { role: "Display", family: "display", size: "5rem", px: 80, lineHeight: "0.9", sample: "TAPE TRADER", note: "Anton, uppercase. Or ransom letters, once per page." },
  { role: "Heading 2", family: "display", size: "3rem", px: 48, lineHeight: "0.95", sample: "BODY HORROR", note: "Anton over a pink highlighter band." },
  { role: "Heading 3", family: "display", size: "1.75rem", px: 28, lineHeight: "1", sample: "VIDEODROME", note: "Anton. Film titles and component names." },
  { role: "Body", family: "text", size: "1.0625rem", px: 17, lineHeight: "1.6", sample: "Sharp 2nd-gen copy, subtitles readable, a little tracking at the end.", note: "Courier Prime: the typewritten list. Never below 14 px." },
  { role: "Data", family: "mono", size: "1.375rem", px: 22, lineHeight: "1.1", sample: "PLAY ▶  0:47:13  SP", note: "VT323 for screens and counters. Never below 20 px." },
  { role: "Annotation", family: "display", size: "1.375rem", px: 22, lineHeight: "1.2", sample: "RARE!! ask me", note: "Permanent Marker. Rare, ≥ 20 px, never the only carrier of meaning." },
  { role: "Web", family: "text", size: "1rem", px: 16, lineHeight: "1.5", sample: "[ << prev | The Cult VHS Ring | next >> ]", note: "System Times for links, guestbook and webring." },
];

export const spacing = [
  { step: "1", px: 4, use: "Sticker padding, icon to label" },
  { step: "2", px: 8, use: "Inside strips and chips" },
  { step: "3", px: 12, use: "Between list rows" },
  { step: "4", px: 16, use: "Sheet padding (mobile), page gutter at 390 px" },
  { step: "5", px: 20, use: "Sheet padding" },
  { step: "6", px: 24, use: "Between controls" },
  { step: "8", px: 32, use: "Between sheets" },
  { step: "12", px: 48, use: "Between tracks" },
];

export const grid = [
  { width: "390 px", columns: 1, gutter: "—", margin: "8 px desk + 16 px sheet" },
  { width: "768 px", columns: 6, gutter: "24 px", margin: "24 px" },
  { width: "1440 px", columns: 12, gutter: "32 px", margin: "auto (content 1152 px)" },
];

export const motion = [
  { token: "--tt-press", ms: 80, use: "Pressing: the hard shadow collapses, the piece moves 3 px" },
  { token: "--tt-nudge", ms: 120, use: "Hover: the shadow grows, a highlighter edge appears" },
  { token: "counter", ms: 1000, use: "The loading tape counter ticks once a second (text only)" },
];

export const principles = [
  { title: "Made by hand, read by anyone", body: "The mess lives in the decoration. Text and controls stay straight, high-contrast and plain." },
  { title: "Everything is a physical object", body: "Stickers, tape, labels and bevels. Pressing something should feel like pressing it." },
  { title: "Loud, never flashing", body: "Saturated colour and bold type. No blinking, no glitch animation, no marquees." },
];
