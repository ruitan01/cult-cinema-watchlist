# Design Log — Cult Cinema Watchlist

A running record of the process, design decisions, feedback and revisions for Assignment 2.

## 2026-10-13 · Stage 0 — Setup and directions

- Added project goals, requirements, constraints and workflow to `AGENTS.md`, below the Next.js-managed block.
- Removed `experimental.agentFeedback` from `next.config.ts`; the project uses no external services.
- Proposed three visual directions, all approved and kept for the mood boards and design systems:
  1. **Accession Record** — cult films as catalogued objects in a film institution; strict grid, ruled lines, calm density.
  2. **Somnambulist** — the site as a dark space entered with dream logic; one focal object per screen, slow light changes.
  3. **Tape Trader** — a 1993 bootleg mail-order catalogue on an early personal homepage; collage, maximal density.
- The final watchlist style is deliberately postponed until all mood boards and design systems can be compared.
- **Artifact sourcing policy:** prioritise original CSS/SVG graphics, typography experiments and self-made textures. External images only with a verified reuse statement. No film posters or stills.

## 2026-10-13 · Stage 1 — Mood Board 01: Accession Record (first pass)

**Feedback incorporated before building**

- The mood board is visual exploration, not a design system. Contrast tables, type-scale ladders and component-state specs were removed from the plan and deferred to the design-system page:
  - contrast register → *Red pencil, blue pencil* (AR-04), the accent colours used by hand
  - type-scale ladder → *Title page* (AR-09)
  - tab interaction states → static *Drawer tabs* (AR-24)
- Artifacts must not all look like identical catalogue cards.

**Decisions**

- Route `/mood-boards/accession-record`, a static Server Component with no client JavaScript.
- Shared schema in `data/mood-boards/types.ts`. Every artifact has a source of type `original`, `external` (with licence, URL and check date) or `pending` (a candidate plus a fallback if its rights can't be verified).
- Board tokens are CSS variables scoped under `.ar` in `board.css`, so the three boards can't collide. Fonts are loaded per route with `next/font`.
- **Composition:** a 12-column grid with deliberately uneven spans, vertical offsets and slight tilts. Artifacts use four frames:
  - bare object on the page
  - paper sheet
  - pinned slip
  - dashed placeholder
- **Rhythm:** two sections sit on their own full-width surfaces. *Marks & Ephemera* is a desk-like card stock, and *Toward an Interface* is on archive blue-black.
- **Numbering:** artifacts are `AR-01`–`AR-30`; the films in the content use the `CCW-YYYY-NNN` accession format.
- Sources and licences appear as a short line under each artifact and in a full register at the foot of the page.

**Open items**

- AR-26 to AR-30 are placeholders until the public-domain images are verified.
- Check in a real browser:
  - responsive layout at 375, 768 and 1280 px
  - whether Newsreader renders true small caps and old-style figures
  - whether the noise-based stamp distressing is legible

**Revisions from the first browser check** (headless Edge at 1280 px, and a true 375 px viewport)

- *Marks & Ephemera:* the date-due slip spanned two rows, which pushed the drawer label onto a row of its own. The slip now spans one row; the stub and label share the second row (7 + 5 columns).
- *Ink chips:* two columns on phones made seven very tall chips. Phones now get three columns with smaller labels.
- *Restricted stamp:* the ring text was longer than the circle and overlapped itself. Text size and letter-spacing reduced.
- *Viewed stamp:* "VIEWED" crossed the inner border. Text size reduced.

## 2026-10-13 · Stage 1, revision 2 — Completing Mood Board 01

**Feedback:** the archival aesthetic, typography, textures, stamps and varied compositions work. AR-26 to AR-30 were still empty placeholders, and the board needs 30 real artifacts. Also: too much vertical whitespace in places, and the sticky tabs should not cover section headings after an anchor jump.

**The five public-domain images.** Each rights statement was checked on the file's own Wikimedia Commons page (its licence template), not assumed from the collection:

| No. | Image | Rights on the file page |
|---|---|---|
| AR-26 | William Caslon, *A Specimen* (c. 1734) | PD-old-100, PD-US-expired |
| AR-27 | Eadweard Muybridge, *The Horse in Motion* (1878), via the Library of Congress | PD-old-100-expired |
| AR-28 | Carol M. Highsmith, Library of Congress Main Reading Room (2009) | PD-Highsmith |
| AR-29 | Michael Holley, copyright card-catalogue drawer (2009) | PD-self |
| AR-30 | Cinéma Grand Palais programme cover (1920), digitised by the BnF (Gallica) | PD-France; also US public domain, published before 1931 |

- The images were resized and re-saved as JPEG in `public/mood-boards/accession-record/`. AR-28 and AR-29 are shown with a light CSS sepia filter.
- Creator, file-page URL, holding institution, rights statement, check date and changes are recorded in `data/mood-boards/accession-record.ts`, and shown in the register at the foot of the page.
- **Composition:** the two portraits (specimen sheet, programme) are mounted and tilted; the Muybridge plate and the drawer are centred against them; the reading room runs full width as the drawer's atmospheric pause.
- No fallback CSS artifacts were needed.

**Layout revisions**

- Section padding, header margin and grid row gaps tightened.
- AR-08 and AR-10 are now vertically centred against the tall title page instead of pushed down, which removes the empty band under them.
- Anchor jumps use `scroll-padding-top` on the page, so section headings and individual artifacts land below the sticky drawer tabs.

## 2026-10-13 · Stage 1 — Mood Board 01 approved

- **Approved:** the Accession Record mood board as it stands, with 30 artifacts: 25 original CSS/SVG/type works and 5 verified public-domain images. The final images AR-26 to AR-30 replaced the placeholders from the first pass; no fallback artifacts were needed.
- **Final source check before committing:**
  - each file-page URL resolves
  - each recorded licence template matches the file's Commons page
  - image dimensions in the data match the files in `public/`
- **One correction:** AR-26's holding note now says the specimen scan comes from Chambers's *Cyclopaedia*, via the University of Wisconsin Digital Collections.
- **Next:** Mood Board 02, Somnambulist. The plan is to be proposed and approved before implementation.

## 2026-10-13 · Stage 2 — Mood Board 02: Somnambulist (first pass)

**Approved plan and feedback.** Six rooms with 30 artifacts. Slow fade-ins are allowed if they respect `prefers-reduced-motion` and never hide important content. The three proposed public-domain artworks were approved, subject to checking each file's rights.

**Decisions**

- **Route:** `/mood-boards/somnambulist`. It reuses the shared schema; all components are new, because the visual language shares nothing with Board 1.
- **How it differs from Accession Record:**
  - dark instead of paper
  - rooms instead of drawers
  - artifacts stand unframed in the dark with museum-style wall labels, sometimes beside the work, instead of plates in a grid
  - a vertical floor indicator (a top bar on phones) instead of drawer tabs
  - corridor gradients instead of ruled lines
  - Instrument Serif and Instrument Sans with no monospace
  - end credits instead of a register table
- **Colour:** darkness `#0B0A0C`, lamplight text (about 15:1), ash secondary text (about 7:1), sodium amber for numbers and focus (about 8.7:1), velvet blue as the cool accent. Curtain red is used only for large areas, never for text.
- **Motion:** a CSS scroll-driven fade-in (`animation-timeline: view()`) that only runs where the browser supports it and the visitor hasn't asked for reduced motion. Content is fully visible by default and never fades below 15% opacity. Nothing flickers or flashes.
- **Accessibility:**
  - Grain and vignettes sit only on artifact surfaces, never over text.
  - The lamp-on card shows both of its states, so nothing depends on hovering.
  - The "forgetting" sentence also has a plain-text version for screen readers.
  - Artifact SVGs have labels and artworks have alt text.
  - There's a skip link and a labelled floor navigation.
  - Anchor jumps clear the sticky bar on phones.

**Public-domain artworks.** Rights were checked on each file's own Commons page:

| No. | Work | Rights on the file page |
|---|---|---|
| SN-28 | Odilon Redon, *The Eye, Like a Strange Balloon, Mounts toward Infinity* (1882), LACMA | PD-LACMA |
| SN-29 | Francisco Goya, *The sleep of reason produces monsters* (1799; impression printed 1908–12), the Met | CC0 (Met Open Access) |
| SN-30 | Henry Fuseli, *The Nightmare* (1781), Detroit Institute of Arts | PD-Art |

A Commons copy of *The Nightmare* licensed CC BY 2.5 (a photograph of the painting by a third party) was deliberately not used. The museum scan was chosen instead.

**Revisions from the browser check** (Edge via the DevTools protocol, 1280 × 900 and 375 × 800, full page with reduced motion, plus anchor and motion views)

- The artwork glow made phones scroll sideways by 20 px. The board root now clips horizontal overflow.
- The first darkness-ladder swatch was invisible against the page. The ladder now has a faint outline.
- The sentence inside the big "O" crossed the letter's stroke. It is now set on two smaller lines.
- The perspective floor was too faint. The pattern is lighter and fades out more gently.
- The film grain was pushed down, leaving an empty band. It now aligns with the bottom of the floor.
- The entrance is 60% of the screen height on phones (78% on wider screens), so the title isn't stranded in empty space.

## 2026-10-13 · Stage 2 — Mood Board 02 approved, spacing refined

**Feedback:** the Somnambulist direction is approved. It is distinct from Accession Record and the 30 artifacts work. Some vertical gaps between sections felt too large.

**Revisions**

- **Spacing:** the corridor band between rooms is shorter (80–112 px → 48–64 px). Room padding, heading margins and row gaps are reduced. The largest staggered offsets are smaller: the sodium lamp, blue hour, door, wallpaper, empty room and the Goya print. The entrance is 72% of the screen height on wider screens. The desktop page is about 8% shorter (14,303 → 13,121 px), and the staggered, off-centre placement is unchanged.
- **Focus rings:** the floor links on desktop are inset, so their amber focus ring isn't clipped by the left edge of the screen.

**Verification**

- **Width:** at 390 × 844 the page is exactly 390 px wide with no sideways scrolling. 1280 × 900 is unchanged.
- **Keyboard:** real Tab presses go to the skip link, the six floor links, back to the index, then the credits links. Each shows the amber outline and glow. Floor links jump to rooms with headings clear of the sticky bar.
- **Structure:**
  - one h1, a heading for each room, and the credits heading
  - `lang="en"` and a page title
  - all three artworks have alt text and every labelled SVG has a label
  - no duplicate ids
- **axe-core 4.10** (WCAG 2.1 A/AA plus best practice, run at 1280 and 390 px; loaded only in the test browser, not added to the project): one rule flagged. Four words at the faded end of SN-09 *Forgetting* fall to 2.84:1. **Accepted as a deliberate exception:** the faded words are decorative and hidden from assistive technology, and the full sentence is provided as plain text. This mirrors AR-03 *Faded ink* on Board 1. Contrast checks over gradients and images that axe couldn't measure automatically were spot-checked in screenshots; all running text sits on the solid `#0B0A0C` background.

## 2026-10-13 · Stage 3 — Mood Board 03: Tape Trader

**Approved direction and feedback.** The track structure and all 30 artifacts were approved. It should feel genuinely handmade: a 1993 underground VHS trading catalogue mixed with an early personal homepage. It should also feel more chaotic, tactile and rebellious than the first two boards, while text and navigation stay readable. Keep the anatomical illustrations. Use Permanent Marker sparingly, for handwritten notes only. Small hover and focus reactions are welcome; avoid flashing and glitch animation.

**Decisions**

- **Route:** `/mood-boards/tape-trader`. It reuses the shared schema; all components are new.
- **Frame:** a homepage "table" with a ridge border on a dark tiled background, inside which sit photocopied collage pages.
- **Navigation:** a sticky VCR control bar with track buttons, instead of drawer tabs or a floor indicator.
- **Structure:** Side A (A1 Toner, A2 Ransom, A3 Xerox) and Side B (B4 Contraband, B5 Homepage, B6 Found Footage), with cassette "SIDE A / SIDE B" banners.
- **Labels:** each artifact gets a label-maker tape caption, followed by a typed note.
- **Sources:** shown as "liner notes" on a dashed cut-out insert.
- **Typefaces:**
  - Anton for headlines
  - Courier Prime for body text and listings
  - VT323 for screens and counters
  - Permanent Marker for annotations only
  - default Times for the homepage parts, deliberately
- **Colour:** pink, yellow and cyan only ever sit behind black text. Gore red is used only for large type and graphics. Links are tape-label blue.
- **Chaos without losing readability:**
  - clippings tilt by no more than 2° (decorative stickers more)
  - tape, staples and corner tape hold things down
  - loose scraps sit beside each track heading ("the good stuff ↓↓", "CONFISCATED?", "NEW!") and take their own space, so they never cover an artifact, label or text; they are hidden on small screens
- **Motion:** clippings straighten and lift 3 px on hover. Links get a highlighter swipe on hover and focus. All motion is off under `prefers-reduced-motion`. Tracking errors and colour splits are frozen images; nothing flickers.
- **Footer webring:** real links to the previous board, the index and the next board, instead of fake underlined text.

**Public-domain images.** Rights were checked on each file's own Commons page:

| No. | Image | Rights on the file page |
|---|---|---|
| TT-27 | Vesalius, *De humani corporis fabrica*, first muscle plate (1543), University of Amsterdam scan | PD-art |
| TT-28 | Haeckel, *Ascidiae*, *Kunstformen der Natur* plate 85 (1904), Library of Congress | PD-old-70-1923, LOC-image |
| TT-29 | H. V. Carter, skull lateral view, *Gray's Anatomy* fig. 188 (1858; 1918 edition) | PD-scan |
| TT-30 | Kinetoscope parlour photograph (1895), via the US National Park Service | PD-old-1923 |

Wellcome Collection copies of the Vesalius plates were deliberately not used, because they are CC BY 4.0 rather than public domain. TT-27, TT-29 and TT-30 are shown with a CSS photocopy filter (greyscale, raised contrast); the files themselves are only resized and converted. TT-28 stays in colour.

**Revisions from the browser checks**

- **Paper texture:** the first speckle was so dense that the paper read as grey static and the small source lines were nearly invisible. The specks are now sparse.
- **Halftone TV (TT-12):** the clip-path version didn't read as a television. It is redrawn as an SVG dot pattern.
- **Marker notes (TT-10):** the "ask me" note overlapped the typing. It is now a separate line.
- **Envelope (TT-21):** the stamp's perforation mask produced a pink grid and the postmark collided with the stamp. Both are redrawn, and the envelope is smaller.
- **Scraps:** they first sat absolutely positioned and covered part of a blurb ("CONFISCATED?"). They now sit in the header's normal layout.
- **Ransom title:** on phones it broke mid-word ("TRAD / ER"). Letters now stay together within each word.

**Verification**

- **Widths:** at 390 and 1280 px, page width equals viewport width, so nothing scrolls sideways.
- **axe-core 4.10** (WCAG 2.1 A/AA plus best practice, both widths): no violations. The 140-odd "incomplete" contrast items are text over the paper texture, which axe can't sample; that text is `#111` or `#55554f` on near-white paper (about 6:1 or better).
- **Keyboard:** the order is the skip link, the six track links, back to the index, then the liner-notes links. Focus shows a dashed outline (yellow on the dark VCR bar).
- **Structure:** one h1 (the ransom title has an accessible name), a heading per track, two labelled navigation regions, alt text on all four images, labels on every graphic, and no duplicate ids.
- **Testing note:** Edge began opening a hidden sync dialog that blocked screenshots taken through the DevTools protocol. Page screenshots were therefore taken with Edge's own headless screenshot mode, with a full-paint flag, and a 390 px iframe for mobile. Metrics, keyboard and axe checks still ran through DevTools, which works without screenshots. An apparently blank TT-30 turned out to be a capture-timing artifact: the image decodes correctly, and a full-paint capture shows it.

## 2026-10-13 · Stage 3 — Mood Board 03 approved, final refinements

**Feedback:** the Tape Trader direction is approved. Two small refinements were requested: slightly less vertical whitespace between artifact groups, keeping the messy photocopied-catalogue feel; and a sticky navigation that works at 390 px without clipping or sideways overflow.

**Revisions**

- **Spacing:** track padding, heading margin and row gaps are reduced. The halftone TV's offset is smaller. The WANTED notice (TT-14) is centred against the tall folded list (TT-15), so no empty band is left under it. Pages are about 2% shorter on desktop (9,218 → 8,999 px) and 3% shorter on mobile.
- **Track bar:** the link list was a flex item without a minimum width, so at 390 px it overflowed the bar and was clipped by the board's overflow guard. On phones the six track buttons now wrap onto two rows (76 px bar). Every button stays fully on screen with no hidden sideways scroller, and the anchor offset is 6rem on phones (4.5rem from 640 px up) to match.

**Verification**

- **390 px:** page width equals viewport width. All six track buttons sit within 12–345 px across two rows. Jumping to `#homepage` puts its heading at 120 px, below the bar's 76 px bottom edge.
- **1280 px:** the bar is a single 47 px row; no overflow.
- **Artifacts:** 30 records (TT-01 to TT-30) and 30 rendered figures, all unique. 26 are original works, each with a recorded medium. The four public-domain images each record creator, licence, rights statement, check date, changes and alt text; the files exist in `public/`, and each Commons file page returns HTTP 200. The liner notes list all 30 artifacts plus the four typeface licences.
- Lint and production build pass.

**Approved:** Mood Board 03, Tape Trader. All three mood boards are now complete. Next: plan the three design-system pages.

## 2026-10-13 · Stage 4 — Design System 01: Accession Record (first pass, awaiting review)

**Approved plan.** All three systems share one structure: principles, colour, typography, space and layout, components, UI states and accessibility. The shared component checklist covers button, link, section navigation, film card, filter tabs, search field, watchlist toggle, watched mark, disclosure and feedback. Small, working, keyboard-accessible demos are allowed on design-system pages. The film data stays minimal for now.

**Shared foundations**

- `data/films.ts`: 16 films with only the fields the demos need (title, year, director, running time, mood, themes, one original line).
- `lib/contrast.ts`: WCAG relative luminance and contrast ratio. Every ratio on the design-system pages is computed from token values; ratios are rounded down, so a pair is never shown as passing when it doesn't.
- `data/design-systems/accession-record.ts`: the system's tokens (colours, contrast pairs, type scale, spacing, grid, principles). This is the source of truth the watchlist would import.

**Decisions**

- **Route:** `/design-systems/accession-record`, consistent with Mood Board 01 (same palette, typefaces, ruled lines, drawer tabs and § numbering).
- **Component classes and states:** components are CSS classes, each pairing its real pseudo-class with an `.is-*` modifier. The static state rows therefore render exactly the CSS the live controls use. The static rows are `inert`, so Tab skips them and screen readers don't hear them as real controls.
- **Interactive elements:**
  - The watchlist toggle is a button with `aria-pressed`. Its visible label stays "Watchlist" (plus a hidden film name) and only its mark changes, ☐ to ☒, which avoids a label that contradicts its state.
  - The programme note is a disclosure (`aria-expanded`, `aria-controls`). Esc closes it and returns focus.
  - Filters are drawer tabs that toggle with `aria-pressed` and show result counts. A theme with no results is disabled, unless it's the one currently selected.
- **Live demos:** buttons, a single film card, a working catalogue (search, theme tabs, compact cards, toggles, notes, announced counts and an empty state with "Clear search and filters"), and a retrieval demo (loading skeleton with `aria-busy`, then a record or a `role="alert"` error).
- **Motion:** none. Pressing stamps a double inner rule instead of animating.

**Revisions from the first checks**

- At 390 px the seven section tabs wrapped into a 165 px sticky block. The bar is now sticky only from 768 px up, with a matching anchor offset.
- The header and footer text links were 19–20 px tall. They are now padded to at least 24 px.
- axe flagged the brass "Aa" sample: text in a colour the system says is decorative only. Rows for non-text pairs now show a bar sample instead of letters.
- axe flagged two wide tables that scroll sideways on phones but couldn't be reached by keyboard. They are now focusable, labelled regions.
- The disclosure marker (▸) picked up the link underline. It no longer does.

**Verification:** axe-core 0 violations at 390 and 1280 px. Real-key tests via DevTools: Enter and Space on buttons, Space on the toggle with an announced message, Enter/Esc on the note with focus returned, typing filters the catalogue with announced counts, the empty state appears, and loading then error appears. Every live control is at least 24 px. No sideways page scroll at 390, 640 or 1280 px. Results are recorded in §7 of the page.

**Approved** after browser review. The colour system, typography, spacing, component states and working catalogue were checked, and the visual language is consistent with Mood Board 01.

**Note for the final watchlist:** the working catalogue uses an internally scrollable film list (a fixed-height `ul` with `overflow-y: auto`). That is acceptable for a compact demo on a documentation page. The final Watchlist should use natural page scrolling rather than a nested scroll area: it is easier on touch devices, keeps keyboard and screen-reader navigation simple, and avoids scroll traps.
