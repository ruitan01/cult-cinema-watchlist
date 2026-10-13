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
    { id: "contraband", numeral: "B4", title: "Contraband", blurb: "The objects of the trade: spines, labels, forms, stickers and the envelope it all came in." },
    { id: "homepage", numeral: "B5", title: "Homepage", blurb: "The list, typed up for the early web: bevels, counters, guestbooks and webrings." },
    { id: "found-footage", numeral: "B6", title: "Found Footage", blurb: "Bodies opened up and pictures that moved, long before VHS. All public domain." },
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

    // B4. Contraband
    draft("TT-16", "contraband", "The shelf", "ephemera", "Spines labelled by hand, by typewriter and by label maker: no two the same.", "CSS"),
    draft("TT-17", "contraband", "Hand-labelled tape", "ephemera", "A blank cassette made precious by a felt-tip label.", "CSS, SVG"),
    draft("TT-18", "contraband", "Order form", "ephemera", "Cut along the dotted line. Cash, money order or trade.", "CSS, original text"),
    draft("TT-19", "contraband", "Sticker sheet", "ephemera", "The trader's own grading system, stuck on everything.", "CSS, SVG"),
    draft("TT-20", "contraband", "Membership card", "ephemera", "An invented video shop's card, signature strip and all.", "CSS, original text"),
    draft("TT-21", "contraband", "The envelope", "ephemera", "Kraft paper, a cancelled stamp and a P.O. box that leads nowhere.", "CSS, SVG"),

    // B5. Homepage
    draft("TT-22", "homepage", "Bevelled buttons", "interface", "Raised and pressed, shown side by side so the idea doesn't depend on clicking.", "CSS"),
    draft("TT-23", "homepage", "Under construction", "interface", "Hazard tape and a hit counter: the page is always unfinished, and proud of it.", "CSS"),
    draft("TT-24", "homepage", "Guestbook", "interface", "Reviews as guestbook entries, in default Times on grey.", "CSS, original text"),
    draft("TT-25", "homepage", "Webring", "interface", "Browsing sideways from one obsessive to the next: a model for related films.", "CSS"),
    draft("TT-26", "homepage", "Pull a tape", "interface", "The watchlist as a shelf: pull a spine out to read its card.", "CSS, original text"),

    // B6. Found Footage
    {
      id: "TT-27",
      section: "found-footage",
      title: "Muscle man",
      kind: "image",
      note: "The flayed figure strolling through a landscape: body horror's oldest ancestor.",
      status: "complete",
      source: {
        type: "external",
        creator: "Andreas Vesalius (woodcut attributed to the workshop of Titian)",
        work: "De humani corporis fabrica, first plate of the muscles",
        date: "1543",
        url: "https://commons.wikimedia.org/wiki/File:De_humani_corporis_fabrica_(27).jpg",
        heldBy: "Special Collections, University of Amsterdam",
        licence: "Public domain",
        rightsStatement: "Tagged PD-art on Commons: a faithful reproduction of a two-dimensional work published in 1543.",
        retrieved: "2026-10-13",
        modifications:
          "Re-saved as JPEG at the original 595 px width. Shown with a CSS photocopy filter (greyscale, raised contrast).",
      },
      image: {
        src: "/mood-boards/tape-trader/tt-27-vesalius-muscle-man.jpg",
        width: 595,
        height: 1024,
        alt: "A woodcut of a standing human figure with the skin removed to show the muscles, posed in front of a hilly landscape.",
      },
    },
    {
      id: "TT-28",
      section: "found-footage",
      title: "Sea squirts",
      kind: "image",
      note: "Haeckel's ascidians: soft, symmetrical, alien. Organic forms for the board's stranger moments.",
      status: "complete",
      source: {
        type: "external",
        creator: "Ernst Haeckel (artist); Adolf Giltsch (lithographer)",
        work: "Ascidiae – Seescheiden, plate 85 of Kunstformen der Natur",
        date: "1904",
        url: "https://commons.wikimedia.org/wiki/File:Ascidiae._-_Seescheiden_LCCN2014645041.jpg",
        heldBy: "Library of Congress Prints and Photographs Division (LCCN 2014645041)",
        licence: "Public domain",
        rightsStatement:
          "Tagged PD-old-70-1923 and LOC-image on Commons: published in 1904, and both artists died more than 70 years ago.",
        retrieved: "2026-10-13",
        modifications:
          "Downloaded as Commons' 1920 px rendition; resized to 1400 px wide and re-saved as JPEG. Shown in colour, like a colour copy from the print shop.",
      },
      image: {
        src: "/mood-boards/tape-trader/tt-28-haeckel-ascidiae.jpg",
        width: 1400,
        height: 1975,
        alt: "A colour lithograph page of sixteen sea squirts arranged symmetrically on a dark ground, in reds, ochres, greens and blues.",
      },
    },
    {
      id: "TT-29",
      section: "found-footage",
      title: "Skull, lateral view",
      kind: "image",
      note: "A textbook skull with its bones coloured and named: anatomy as a labelled diagram.",
      status: "complete",
      source: {
        type: "external",
        creator: "Henry Vandyke Carter, for Henry Gray's Anatomy",
        work: "Side view of the skull (Gray's Anatomy, fig. 188)",
        date: "1858 (from the 1918 edition)",
        url: "https://commons.wikimedia.org/wiki/File:Gray188.png",
        licence: "Public domain",
        rightsStatement:
          "Tagged PD-scan on Commons: a scan of a public-domain illustration; the artist died in 1897 and the edition was published in 1918.",
        retrieved: "2026-10-13",
        modifications: "Converted from PNG to JPEG on white at the original 500 px width. Shown with a CSS photocopy filter.",
      },
      image: {
        src: "/mood-boards/tape-trader/tt-29-gray-skull.jpg",
        width: 500,
        height: 463,
        alt: "A side view of a human skull with each bone tinted a different colour and labelled: frontal, parietal, temporal, zygomatic, mandible.",
      },
    },
    {
      id: "TT-30",
      section: "found-footage",
      title: "Kinetoscope parlour",
      kind: "image",
      note: "A row of peep-show cabinets, one viewer at a time: the first private screens, ninety years before the VCR.",
      status: "complete",
      source: {
        type: "external",
        creator: "Unknown photographer",
        work: "Kinetoscope parlour",
        date: "1895",
        url: "https://commons.wikimedia.org/wiki/File:KinetoscopeParlorbis.jpg",
        heldBy: "Published by the US National Park Service (Thomas Edison National Historical Park)",
        licence: "Public domain",
        rightsStatement: "Tagged PD-old-1923 on Commons: an anonymous photograph published before 1923.",
        retrieved: "2026-10-13",
        modifications:
          "Downloaded as Commons' 1920 px rendition; resized to 1600 px wide and re-saved as JPEG. Shown with a CSS photocopy filter.",
      },
      image: {
        src: "/mood-boards/tape-trader/tt-30-kinetoscope-parlour.jpg",
        width: 1600,
        height: 1265,
        alt: "An old photograph of a parlour with a row of wooden kinetoscope cabinets, each with a viewing hood on top, and men in suits standing behind them.",
      },
    },
  ],
};

export const tapeTraderFonts: FontCredit[] = [
  { family: "Anton", designer: "Vernon Adams", licence: "SIL Open Font License 1.1", licenceUrl: "https://openfontlicense.org" },
  { family: "Courier Prime", designer: "Alan Dague-Greene", licence: "SIL Open Font License 1.1", licenceUrl: "https://openfontlicense.org" },
  { family: "VT323", designer: "Peter Hull", licence: "SIL Open Font License 1.1", licenceUrl: "https://openfontlicense.org" },
  { family: "Permanent Marker", designer: "Font Diner", licence: "Apache License 2.0", licenceUrl: "https://www.apache.org/licenses/LICENSE-2.0" },
];
