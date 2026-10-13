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
