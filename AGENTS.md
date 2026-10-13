<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project: Cult Cinema Watchlist

MPCS 51238 — Design, Build, Ship · Assignment 2: UI/UX & Visual Design

**Goal:** A small static site for discovering cult cinema (David Lynch, David Cronenberg, surrealism, body horror, experimental film), aimed at film enthusiasts who want to browse a curated watchlist.

### Requirements

- Homepage hub linking to three mood boards, three design systems, and the final watchlist.
- Three distinct visual mood boards, 25–30 artifacts each.
- Three matching design-system pages covering color, typography, spacing, components, interaction states, and UI states.
- One final watchlist page in the selected style, with at least two browser-only interactions.
- Responsive on desktop and mobile.
- Accessible typography, contrast, navigation, and interaction feedback.
- Git history that shows iterative design decisions.
- Deployed to Vercel Hobby.

### Technical constraints

- Next.js + Tailwind CSS; follow the existing conventions and the Next.js rules above.
- Static local film data only.
- No database, accounts, external APIs, persistent storage, backend, or unnecessary packages.

### Workflow

- Work in small, reviewable stages; propose a plan before each stage.
- Wait for approval before major changes; never build the whole assignment in one pass.
- Record design decisions and revisions as they happen.
- Verify interactions and responsive behavior in a real browser.
