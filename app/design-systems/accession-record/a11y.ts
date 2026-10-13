// Results of the accessibility checks run against this page (2026-10-13).
// Updated by hand after each test pass; docs/design-log.md records the method.

export type A11yCheck = { check: string; method: string; result: string };

export const a11yChecks: A11yCheck[] = [
  { check: "Automated audit", method: "axe-core 4.10, WCAG 2.1 A/AA, 2.2 AA and best practice, at 390 px and 1280 px", result: "0 violations at 390 px and 1280 px (53 rules passed). Contrast over textures that axe cannot sample was checked against §2." },
  { check: "Text contrast", method: "Ratios computed from tokens (§2)", result: "All text pairs pass AA; ink on paper and on card pass AAA. Brass and feint blue are decorative only." },
  { check: "Keyboard", method: "Tab through every live control; Enter and Space activate; Esc closes notes", result: "Pass. Enter and Space activate buttons, tabs and toggles; typing filters with an announced count; Esc closes a programme note and returns focus. Static specimens are inert, so Tab skips them." },
  { check: "Focus visible", method: "Real Tab presses; computed outline on each focused element", result: "Pass. A 2 px stamp-red outline on every live control." },
  { check: "Names, roles, states", method: "aria-pressed, aria-expanded and live regions inspected", result: "Pass. Toggles expose aria-pressed and the film name; notes use aria-expanded and aria-controls; counts, watchlist changes and loading are announced via role=\"status\", errors via role=\"alert\"." },
  { check: "Target size", method: "Measured interactive elements against 24 × 24 px (WCAG 2.2 AA)", result: "Pass. Every live control is at least 24 × 24 px; buttons, toggles and fields are 44 px high. Links inside sentences are exempt." },
  { check: "Colour independence", method: "Every state has a non-colour cue", result: "Pass. Selected tabs gain a top rule; toggles change ☐ to ☒; disabled controls are dashed and struck through; links are always underlined." },
  { check: "Reflow", method: "390 px width and 200% zoom", result: "Pass. No sideways page scroll at 390 px or at 640 px (200% zoom of 1280 px); wide tables scroll inside focusable, labelled regions." },
  { check: "Motion", method: "prefers-reduced-motion", result: "Nothing to reduce: the system uses no motion." },
];
