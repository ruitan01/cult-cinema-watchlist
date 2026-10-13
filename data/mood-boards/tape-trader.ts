import type { Artifact, FontCredit, MoodBoard } from "./types";

function draft(
  id: string,
  section: string,
  title: string,
  kind: Artifact["kind"],
  note: string,
  medium: string,
): Artifact {
  return { id, section, title, kind, note, status: "draft", source: { type: "original", medium } };
}

export const tapeTrader: MoodBoard = {
  slug: "tape-trader",
  number: "03",
  title: "Tape Trader",
  concept:
    "A photocopied mail-order list from an obsessive tape trader, circa 1993, later typed up as a personal homepage. Handmade, funny, slightly disreputable: the films travelled hand to hand on worn-out VHS, and the catalogue looks like it.",
  keywords: ["Handmade", "Obsessive", "Contraband"],
  sections: [
    { id: "toner", numeral: "A1", title: "Toner", blurb: "Copier black, highlighter pink and yellow, and one red for the gore." },
    { id: "ransom", numeral: "A2", title: "Ransom", blurb: "Cut-out letters, a condensed shout, the typewriter list and the VCR's own screen." },
    { id: "xerox", numeral: "A3", title: "Xerox", blurb: "What copying, pinning, folding and spilling do to paper." },
  ],
  artifacts: [
    // A1. Toner
    draft("TT-01", "toner", "Highlighter on typescript", "colour", "Pink, yellow and cyan only ever sit behind black type, never as text.", "CSS, original text"),
    draft("TT-02", "toner", "Misregistered print", "colour", "Two cheap inks that never quite line up: pink under blue, a few pixels off.", "CSS blend modes"),
    draft("TT-03", "toner", "Copy of a copy", "colour", "The same flyer through five generations of photocopying. Detail dies; attitude survives.", "CSS filters"),
    draft("TT-04", "toner", "Genre dots", "colour", "Colour-coded price stickers as a way to tag films by appetite.", "CSS, original text"),
    draft("TT-05", "toner", "Gore red", "colour", "The one red, used big or not at all. Stylised drips, nothing graphic.", "SVG"),

    // A2. Ransom
    draft("TT-06", "ransom", "Ransom letters", "typography", "Every letter cut from somewhere else: the title treatment for the whole board.", "CSS, mixed typefaces"),
    draft("TT-07", "ransom", "The slogan", "typography", "Anton, condensed and loud. An original line in the voice of the catalogue.", "Type specimen, original text"),
    draft("TT-08", "ransom", "The list", "typography", "Courier Prime with dot leaders: titles, generations, tape speed and price.", "Type specimen, original text"),
    draft("TT-09", "ransom", "VCR on-screen display", "typography", "VT323 on the blue screen of a tape deck: counters, tracking and PLAY.", "CSS, type specimen"),
    draft("TT-10", "ransom", "Marker notes", "typography", "Permanent Marker, used only for the trader's scribbles on top of the typing.", "CSS, SVG, type specimen"),

    // A3. Xerox
    draft("TT-11", "xerox", "Photocopy crunch", "texture", "Edges eaten by a tired copier, built from noise and a hard threshold.", "SVG filters"),
    draft("TT-12", "xerox", "Halftone", "texture", "Newsprint dots shaped into a television.", "SVG patterns"),
    draft("TT-13", "xerox", "Tracking error", "texture", "Colour bars with scan lines and one frozen band of bad tracking. Still, never flickering.", "CSS"),
    draft("TT-14", "xerox", "Tape & staples", "texture", "How things get onto a video-shop noticeboard.", "CSS, SVG"),
    draft("TT-15", "xerox", "Folds & a coffee ring", "texture", "A list that has been posted, folded and read over breakfast.", "CSS, SVG"),
  ],
};

export const tapeTraderFonts: FontCredit[] = [
  { family: "Anton", designer: "Vernon Adams", licence: "SIL Open Font License 1.1", licenceUrl: "https://openfontlicense.org" },
  { family: "Courier Prime", designer: "Alan Dague-Greene", licence: "SIL Open Font License 1.1", licenceUrl: "https://openfontlicense.org" },
  { family: "VT323", designer: "Peter Hull", licence: "SIL Open Font License 1.1", licenceUrl: "https://openfontlicense.org" },
  { family: "Permanent Marker", designer: "Font Diner", licence: "Apache License 2.0", licenceUrl: "https://www.apache.org/licenses/LICENSE-2.0" },
];
