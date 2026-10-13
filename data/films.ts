// Static film data shared by the design systems and, later, the watchlist.
// Deliberately small: only what the component demos need.

export type Mood = "dread" | "desire" | "dream" | "decay";

export type Theme =
  | "body horror"
  | "dream logic"
  | "doubles"
  | "transmission"
  | "suburbia"
  | "experimental";

export type Film = {
  id: string;
  title: string;
  year: number;
  director: string;
  /** Running time in minutes. */
  runtime: number;
  mood: Mood;
  themes: Theme[];
  /** One original line, written for this project. */
  note: string;
};

export const films: Film[] = [
  {
    id: "eraserhead",
    title: "Eraserhead",
    year: 1977,
    director: "David Lynch",
    runtime: 89,
    mood: "dread",
    themes: ["dream logic", "body horror", "experimental"],
    note: "Industrial hum, a radiator song and the anxieties of fatherhood.",
  },
  {
    id: "blue-velvet",
    title: "Blue Velvet",
    year: 1986,
    director: "David Lynch",
    runtime: 120,
    mood: "desire",
    themes: ["suburbia", "dream logic"],
    note: "A severed ear opens onto the town beneath the picket fences.",
  },
  {
    id: "lost-highway",
    title: "Lost Highway",
    year: 1997,
    director: "David Lynch",
    runtime: 134,
    mood: "dread",
    themes: ["doubles", "dream logic"],
    note: "A man becomes someone else halfway down a dark road.",
  },
  {
    id: "mulholland-drive",
    title: "Mulholland Drive",
    year: 2001,
    director: "David Lynch",
    runtime: 147,
    mood: "dream",
    themes: ["doubles", "dream logic"],
    note: "Two women, a blue key and a city that dreams itself.",
  },
  {
    id: "shivers",
    title: "Shivers",
    year: 1975,
    director: "David Cronenberg",
    runtime: 87,
    mood: "decay",
    themes: ["body horror"],
    note: "A luxury tower block and a parasite that dissolves its manners.",
  },
  {
    id: "the-brood",
    title: "The Brood",
    year: 1979,
    director: "David Cronenberg",
    runtime: 92,
    mood: "dread",
    themes: ["body horror"],
    note: "Rage given a body, born in an experimental clinic.",
  },
  {
    id: "scanners",
    title: "Scanners",
    year: 1981,
    director: "David Cronenberg",
    runtime: 103,
    mood: "dread",
    themes: ["body horror", "transmission"],
    note: "Minds that can reach into other minds, and what that costs.",
  },
  {
    id: "videodrome",
    title: "Videodrome",
    year: 1983,
    director: "David Cronenberg",
    runtime: 87,
    mood: "desire",
    themes: ["transmission", "body horror"],
    note: "A cable programmer finds a signal that rewrites the viewer.",
  },
  {
    id: "the-fly",
    title: "The Fly",
    year: 1986,
    director: "David Cronenberg",
    runtime: 96,
    mood: "decay",
    themes: ["body horror"],
    note: "A love story that falls apart one cell at a time.",
  },
  {
    id: "dead-ringers",
    title: "Dead Ringers",
    year: 1988,
    director: "David Cronenberg",
    runtime: 116,
    mood: "decay",
    themes: ["doubles", "body horror"],
    note: "Twin gynaecologists and the instruments they invent.",
  },
  {
    id: "naked-lunch",
    title: "Naked Lunch",
    year: 1991,
    director: "David Cronenberg",
    runtime: 115,
    mood: "dream",
    themes: ["dream logic", "body horror"],
    note: "A writer, a typewriter that talks back and an imaginary city.",
  },
  {
    id: "crash",
    title: "Crash",
    year: 1996,
    director: "David Cronenberg",
    runtime: 100,
    mood: "desire",
    themes: ["body horror"],
    note: "Collisions, scars and the erotics of the motorway.",
  },
  {
    id: "existenz",
    title: "eXistenZ",
    year: 1999,
    director: "David Cronenberg",
    runtime: 97,
    mood: "dream",
    themes: ["transmission", "body horror"],
    note: "A game console made of flesh, plugged into the spine.",
  },
  {
    id: "tetsuo",
    title: "Tetsuo: The Iron Man",
    year: 1989,
    director: "Shinya Tsukamoto",
    runtime: 67,
    mood: "decay",
    themes: ["body horror", "experimental"],
    note: "Metal grows through a salaryman in a blur of stop-motion.",
  },
  {
    id: "meshes-of-the-afternoon",
    title: "Meshes of the Afternoon",
    year: 1943,
    director: "Maya Deren, Alexander Hammid",
    runtime: 14,
    mood: "dream",
    themes: ["dream logic", "doubles", "experimental"],
    note: "A key, a knife, a flower and a woman who keeps returning.",
  },
  {
    id: "possession",
    title: "Possession",
    year: 1981,
    director: "Andrzej Żuławski",
    runtime: 124,
    mood: "dread",
    themes: ["doubles", "body horror"],
    note: "A marriage in divided Berlin, and something in the other flat.",
  },
];

export const themes: Theme[] = ["body horror", "dream logic", "doubles", "transmission", "suburbia", "experimental"];
