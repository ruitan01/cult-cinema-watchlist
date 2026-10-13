import type { Artifact, FontCredit, MoodBoard } from "./types";

const original = (medium: string) => ({ type: "original" as const, medium });

function draft(
  id: string,
  section: string,
  title: string,
  kind: Artifact["kind"],
  note: string,
  medium: string,
): Artifact {
  return { id, section, title, kind, note, status: "draft", source: original(medium) };
}

export const somnambulist: MoodBoard = {
  slug: "somnambulist",
  number: "02",
  title: "Somnambulist",
  concept:
    "The site as a building entered at night. Each section is a room lit by one or two lamps, where familiar things are slightly wrong. Films are found by feeling rather than by fact.",
  keywords: ["Hushed", "Uncanny", "Nocturnal"],
  sections: [
    { id: "threshold", numeral: "B", title: "The Threshold", blurb: "Colour as light sources in the dark." },
    { id: "night-text", numeral: "1", title: "Night Text", blurb: "Type that whispers, reflects and forgets." },
    { id: "surfaces", numeral: "2", title: "Surfaces", blurb: "Grain, smoke, velvet and a pattern with something wrong in it." },
    { id: "objects", numeral: "3", title: "Objects", blurb: "Ordinary things left alone in a room at night." },
    { id: "interface", numeral: "4", title: "Interface as Dream", blurb: "Sketches of browsing by light and by mood." },
    { id: "found-in-the-dark", numeral: "5", title: "Found in the Dark", blurb: "Older visions of sleep and dreaming, all in the public domain." },
  ],
  artifacts: [
    // B. The Threshold
    draft("SN-01", "threshold", "Palette as lamps", "colour", "Seven colours as light sources rather than swatches; the darkest ones read only as absences.", "CSS"),
    draft("SN-02", "threshold", "A curtain, half open", "colour", "Red reserved for one large event. A theatre curtain in general, not any particular room.", "CSS gradients"),
    draft("SN-03", "threshold", "Sodium lamp", "colour", "Amber is the board's only warm light: for focus, numbers and the thing you should look at.", "SVG"),
    draft("SN-04", "threshold", "Darkness ladder", "colour", "Six near-blacks. How many can you tell apart? Depth comes from these, not from borders.", "CSS"),
    draft("SN-05", "threshold", "Blue hour", "colour", "The cold counterpart to the lamp: velvet blue fading into black, with one point of light.", "CSS"),

    // 1. Night Text
    draft("SN-06", "night-text", "A question, very large", "typography", "Instrument Serif italic at the scale of a wall. An original line, set as if overheard.", "Type specimen, original text"),
    draft("SN-07", "night-text", "Whispered labels", "typography", "Small capitals with wide spacing: the voice of signs in a building after hours.", "Type specimen"),
    draft("SN-08", "night-text", "Reflection", "typography", "A word repeated in a dark floor, fading as it goes down.", "CSS"),
    draft("SN-09", "night-text", "Forgetting", "typography", "A sentence that loses focus as it goes, like a dream on waking. Decorative; the words are also given in plain text.", "CSS, original text"),
    draft("SN-10", "night-text", "Scale shift", "typography", "One enormous letter holding one tiny sentence.", "Type specimen"),
    draft("SN-11", "night-text", "Dream diary", "typography", "Small italic for the most private voice on the site.", "Type specimen, original text"),

    // 2. Surfaces
    draft("SN-12", "surfaces", "Film grain", "texture", "Grain as the air of the site: always there, never over text.", "SVG feTurbulence"),
    draft("SN-13", "surfaces", "The floor, transformed", "texture", "A zigzag floor in muted browns, tipped into perspective and lost in the dark. A nod, not a copy.", "CSS gradients, 3D transform"),
    draft("SN-14", "surfaces", "Smoke", "texture", "Soft, slow, directionless: the texture for transitions between rooms.", "SVG feTurbulence"),
    draft("SN-15", "surfaces", "Test signal", "texture", "A television left on in an empty room.", "SVG noise, CSS scan lines"),
    draft("SN-16", "surfaces", "Velvet", "texture", "Light raking across a soft surface, built from noise and a lighting filter.", "SVG feDiffuseLighting"),
    draft("SN-17", "surfaces", "Wrong wallpaper", "texture", "Thirty-six identical tiles, except one. The eye finds it slowly.", "SVG, CSS grid"),

    // 3. Objects
    draft("SN-18", "objects", "Lamp in an empty room", "ephemera", "The board's emblem: one source of light, one long shadow, nobody there.", "SVG"),
    draft("SN-19", "objects", "Door ajar", "ephemera", "Light from the next room. A model for links and transitions.", "SVG"),
    draft("SN-20", "objects", "Endless corridor", "structure", "One-point perspective that never resolves: the shape of scrolling.", "SVG"),
    draft("SN-21", "objects", "Electric hum", "ephemera", "Sound drawn as a line. Interfaces could hum rather than flash.", "SVG"),
    draft("SN-22", "objects", "Telephone off the hook", "ephemera", "Someone was here a moment ago.", "SVG"),
    draft("SN-23", "objects", "Moth at the lamp", "ephemera", "Attention as attraction to light: the cursor as a moth.", "SVG"),

    // 4. Interface as Dream
    draft("SN-24", "interface", "Lamp-on card", "interface", "A film card at rest and lit. Both states are shown, so the idea never depends on hovering.", "CSS"),
    draft("SN-25", "interface", "Four doors", "interface", "Browsing by mood instead of genre: Dread, Desire, Dream, Decay.", "CSS"),
    draft("SN-26", "interface", "Film as a lit window", "interface", "A film detail glimpsed through a window in a dark wall.", "CSS"),
    draft("SN-27", "interface", "Empty room", "interface", "An empty state in the site's own voice: calm, a little strange, still helpful.", "CSS, original text"),

    // 5. Found in the Dark
    {
      id: "SN-28",
      section: "found-in-the-dark",
      title: "The Eye, Like a Strange Balloon",
      kind: "image",
      note: "An eye drifting toward infinity over a dark field: the uncanny made calm.",
      status: "complete",
      source: {
        type: "external",
        creator: "Odilon Redon",
        work: "To Edgar Poe: The Eye, Like a Strange Balloon, Mounts toward Infinity (plate 1)",
        date: "1882",
        url: "https://commons.wikimedia.org/wiki/File:To_Edgar_Poe_(The_Eye,_Like_a_Strange_Balloon,_Mounts_toward_Infinity)_(A_Edgar_Poe_(L%27oeil,_comme_un_ballon_bizarre_se_dirige_vers_l%27infini))_LACMA_AC1997.14.1.1.jpg",
        heldBy: "Los Angeles County Museum of Art (AC1997.14.1.1)",
        licence: "Public domain",
        rightsStatement:
          "Tagged PD-LACMA on Commons: LACMA released this image of a public-domain work into the public domain. Redon died in 1916.",
        retrieved: "2026-10-13",
        modifications: "Resized from 1608 to 1400 px wide and re-saved as JPEG.",
      },
      image: {
        src: "/mood-boards/somnambulist/sn-28-redon-eye-balloon.jpg",
        width: 1400,
        height: 1828,
        alt: "A lithograph of a giant eye rising like a hot-air balloon over a dark marsh, carrying a small basket beneath it.",
      },
    },
    {
      id: "SN-29",
      section: "found-in-the-dark",
      title: "The Sleep of Reason",
      kind: "image",
      note: "A sleeper surrounded by owls and bats: the oldest image here of what a dream lets in.",
      status: "complete",
      source: {
        type: "external",
        creator: "Francisco Goya",
        work: "The sleep of reason produces monsters, plate 43 of Los Caprichos",
        date: "1799 (this impression printed 1908–12)",
        url: "https://commons.wikimedia.org/wiki/File:Plate_43_from_%27Los_Caprichos%27-_The_sleep_of_reason_produces_monsters_(El_sue%C3%B1o_de_la_razon_produce_monstruos)_MET_DP816991.jpg",
        heldBy: "The Metropolitan Museum of Art (Open Access)",
        licence: "CC0 1.0",
        licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
        rightsStatement:
          "Tagged Cc-zero on Commons: released by the Metropolitan Museum of Art under its Open Access programme with a CC0 public-domain dedication.",
        retrieved: "2026-10-13",
        modifications: "Downloaded as Commons' 1280 px rendition and re-saved as JPEG. Shown whole, including the mount.",
      },
      image: {
        src: "/mood-boards/somnambulist/sn-29-goya-capricho-43.jpg",
        width: 1280,
        height: 1792,
        alt: "An etching of a man asleep at a desk, head on his arms, while owls, bats and a lynx crowd out of the darkness behind him.",
      },
    },
    {
      id: "SN-30",
      section: "found-in-the-dark",
      title: "The Nightmare",
      kind: "image",
      note: "Red drapery, a pale sleeper and a figure from the dark: theatrical staging two centuries before cinema.",
      status: "complete",
      source: {
        type: "external",
        creator: "Henry Fuseli",
        work: "The Nightmare",
        date: "1781",
        url: "https://commons.wikimedia.org/wiki/File:Johann_Heinrich_F%C3%BCssli_-_The_Nightmare_55.5.A-d1-2019-04-15.jpg",
        heldBy: "Detroit Institute of Arts (55.5.A)",
        licence: "Public domain",
        rightsStatement:
          "Tagged PD-Art on Commons: a faithful photographic reproduction of a two-dimensional work whose author died in 1825.",
        retrieved: "2026-10-13",
        modifications: "Downloaded as Commons' 1280 px rendition and re-saved as JPEG.",
      },
      image: {
        src: "/mood-boards/somnambulist/sn-30-fuseli-nightmare.jpg",
        width: 1280,
        height: 1028,
        alt: "A painting of a woman lying asleep across a bed, her head hanging over the edge, with a crouching demon on her chest and a pale horse's head emerging from red curtains.",
      },
    },
  ],
};

export const somnambulistFonts: FontCredit[] = [
  {
    family: "Instrument Serif",
    designer: "Rodrigo Fuenzalida, Jordan Egstad",
    licence: "SIL Open Font License 1.1",
    licenceUrl: "https://openfontlicense.org",
  },
  {
    family: "Instrument Sans",
    designer: "Rodrigo Fuenzalida, Jordan Egstad",
    licence: "SIL Open Font License 1.1",
    licenceUrl: "https://openfontlicense.org",
  },
];
