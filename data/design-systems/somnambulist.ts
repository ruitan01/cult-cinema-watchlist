// Somnambulist design system: the single source of truth for its tokens.
// The mood board keeps its own copy as exploration.

import type { ColorToken, ContrastPair, TypeRole } from "./accession-record";

export const colors: ColorToken[] = [
  { name: "Night", token: "--sn-night", hex: "#0B0A0C", role: "Page background" },
  { name: "Smoke", token: "--sn-smoke", hex: "#1A1719", role: "Raised surfaces, whispers, closed doors" },
  { name: "Room", token: "--sn-room", hex: "#24201F", role: "Cards and open panels" },
  { name: "Lamplight", token: "--sn-lamp", hex: "#EDE3D1", role: "Body text and headings" },
  { name: "Ash", token: "--sn-ash", hex: "#A39C90", role: "Secondary text; the dimmest text allowed" },
  { name: "Sodium amber", token: "--sn-amber", hex: "#D9A441", role: "Primary actions, focus, anything lit" },
  { name: "Velvet blue", token: "--sn-velvet", hex: "#8FA2FF", role: "Links and secondary actions" },
  { name: "Ember", token: "--sn-ember", hex: "#F08A7E", role: "Errors" },
  { name: "Unlit", token: "--sn-unlit", hex: "#6B645C", role: "Disabled controls, always with a non-colour cue" },
  { name: "Curtain red", token: "--sn-curtain", hex: "#8E1B1F", role: "Large decorative fields only", decorative: true },
];

export const contrastPairs: ContrastPair[] = [
  { fg: "#EDE3D1", bg: "#0B0A0C", use: "Body text on night", size: "text" },
  { fg: "#EDE3D1", bg: "#24201F", use: "Body text in a room", size: "text" },
  { fg: "#A39C90", bg: "#0B0A0C", use: "Secondary text on night", size: "text" },
  { fg: "#A39C90", bg: "#24201F", use: "Secondary text in a room", size: "text" },
  { fg: "#0B0A0C", bg: "#D9A441", use: "Primary button label", size: "text" },
  { fg: "#D9A441", bg: "#24201F", use: "Lit labels in a room", size: "text" },
  { fg: "#8FA2FF", bg: "#0B0A0C", use: "Links on night", size: "text" },
  { fg: "#B9C3FF", bg: "#0B0A0C", use: "Visited links on night", size: "text" },
  { fg: "#F08A7E", bg: "#1A1719", use: "Error whisper", size: "text" },
  { fg: "#D9A441", bg: "#24201F", use: "Focus outline in a room", size: "ui" },
  { fg: "#A39C90", bg: "#1A1719", use: "Control boundary (door, chip, field line)", size: "ui" },
  { fg: "#8E1B1F", bg: "#0B0A0C", use: "Curtain red (decorative only)", size: "ui" },
];

export const typeScale: TypeRole[] = [
  { role: "Display", family: "display", size: "6rem", px: 96, lineHeight: "0.9", sample: "Somnambulist", note: "Italic. One per page, off-centre." },
  { role: "Heading 1", family: "display", size: "3.5rem", px: 56, lineHeight: "1", sample: "The Corridor", note: "Upright. Page titles." },
  { role: "Heading 2", family: "display", size: "2.5rem", px: 40, lineHeight: "1.1", sample: "Rooms for dread", note: "Italic. Each room's name." },
  { role: "Heading 3", family: "display", size: "1.75rem", px: 28, lineHeight: "1.15", sample: "Mulholland Drive", note: "Italic. Film titles on cards." },
  { role: "Body", family: "text", size: "1.0625rem", px: 17, lineHeight: "1.7", sample: "Two women, a blue key and a city that dreams itself.", note: "Generous leading for light on dark; 55–65 characters per line." },
  { role: "Small", family: "text", size: "0.875rem", px: 14, lineHeight: "1.6", sample: "2001 · David Lynch · 147 min", note: "Metadata. Tabular figures, so numbers line up." },
  { role: "Whisper", family: "text", size: "0.8125rem", px: 13, lineHeight: "1.4", sample: "Floor 3 · Dream", note: "Small capitals, +0.3em tracking. Never smaller on dark." },
];

export const spacing = [
  { step: "1", px: 8, use: "Icon to label" },
  { step: "2", px: 16, use: "Inside pills and chips" },
  { step: "3", px: 24, use: "Card padding" },
  { step: "4", px: 32, use: "Between related controls" },
  { step: "6", px: 48, use: "Between components in a room" },
  { step: "8", px: 64, use: "Room padding (mobile)" },
  { step: "12", px: 96, use: "Between rooms" },
  { step: "16", px: 128, use: "Entrance and long silences" },
];

export const grid = [
  { width: "390 px", columns: 4, gutter: "16 px", margin: "20 px" },
  { width: "768 px", columns: 8, gutter: "24 px", margin: "40 px" },
  { width: "1280 px", columns: 12, gutter: "40 px", margin: "96 px (content offset 1–2 columns)" },
];

export const motion = [
  { token: "--sn-quick", ms: 200, use: "Focus glow appearing, a lamp switching on" },
  { token: "--sn-fade", ms: 400, use: "State changes: doors opening, cards lighting" },
  { token: "--sn-slow", ms: 600, use: "Panels and rooms entering" },
];

export const principles = [
  { title: "Light is the interface", body: "Anything you can act on is lit or outlined; resting things sit in shadow but stay readable." },
  { title: "One room at a time", body: "A single focus per view, wide margins of darkness, and compositions that sit off-centre." },
  { title: "Slow, never sudden", body: "Changes fade in over a few hundred milliseconds. Nothing flashes. Reduced motion means instant." },
];
