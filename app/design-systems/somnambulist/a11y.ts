// Results of the accessibility checks run against this page (2026-10-13). Updated by hand
// after each test pass; docs/design-log.md records the method.

import type { A11yCheck } from "../accession-record/a11y";

export const a11yChecks: A11yCheck[] = [
  { check: "Automated audit", method: "axe-core 4.10, WCAG 2.1 A/AA, 2.2 AA and best practice, at 390 px and 1280 px", result: "0 violations at 390 px and 1280 px (49–50 rules passed). Contrast over the film-grain overlay, which axe cannot sample, uses the measured token pairs on Floor 2." },
  { check: "Text contrast", method: "Ratios computed from tokens (Floor 2)", result: "All text pairs pass AA; lamplight, amber, velvet and ember pass AAA on night. Curtain red is never text." },
  { check: "Keyboard", method: "Real key presses: Tab, Enter, Space, typing, Esc", result: "Pass. Enter and Space work on every button, door, chip and lamp; typing filters with an announced count; the clear button is reachable; Esc steps out of a room and returns focus; the empty state's clear action returns focus to the search field." },
  { check: "Focus visible", method: "Computed outline on each focused control, on night, smoke and room", result: "Pass. A real 2 px amber outline (7:1 or more on every surface) plus a glow; the search field draws its outline around the whole row." },
  { check: "Names, roles, states", method: "aria-pressed, aria-expanded, fieldset legends and live regions inspected", result: "Pass. Lamps, doors and chips expose aria-pressed and names that include the film or count; Step inside uses aria-expanded and aria-controls; the floor indicator marks the floor in view with aria-current=\"location\" without moving focus; doors and chips are grouped in fieldsets with legends; counts and list changes are announced via role=\"status\", errors via role=\"alert\"." },
  { check: "Target size", method: "Interactive elements measured against 24 × 24 px (WCAG 2.2 AA)", result: "Pass. Every live control is at least 24 × 24 px; buttons, lamps, doors and the search field are 44 px or more." },
  { check: "Without glow or colour", method: "Every state checked for a shape, text or border cue", result: "Pass. Lamp: dashed bulb and “off” versus filled bulb with rays, solid ring and “on”. Doors: the leaf swings aside and ◆ marks the label. Chips: ✓ and a solid ring. Disabled: dotted border and ○. Lit cards also say “On your list” and “Seen”." },
  { check: "Reflow", method: "390 px width and 640 px (200% zoom of 1280 px)", result: "Pass. No sideways page scroll at 390, 640 or 1280 px. The catalogue grows with the page; there is no nested scroll area." },
  { check: "Motion", method: "OS prefers-reduced-motion emulated, and the page switch", result: "Pass. With the OS set to reduce motion, transitions are 0 s, the loading lamp is still and the page switch is pressed and disabled with an explanation. The page switch alone also sets transitions to 0 s and is undone by toggling it or reloading." },
];
