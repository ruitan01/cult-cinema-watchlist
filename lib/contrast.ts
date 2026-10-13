// WCAG 2.x contrast helpers, so every ratio shown in the design systems is
// calculated from the actual token values rather than typed by hand.

function channel(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

/** Relative luminance of a #rgb or #rrggbb colour. */
export function luminance(hex: string): number {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.replace(/./g, (c) => c + c);
  if (!/^[0-9a-f]{6}$/i.test(h)) throw new Error(`Not a hex colour: ${hex}`);
  const n = parseInt(h, 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}

export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export type WcagResult = {
  ratio: number;
  /** Normal-size text, 4.5:1. */
  aa: boolean;
  /** Normal-size text, 7:1. */
  aaa: boolean;
  /** Large text (24px, or 18.66px bold) and UI components, 3:1. */
  aaLarge: boolean;
};

export function wcag(foreground: string, background: string): WcagResult {
  const ratio = contrastRatio(foreground, background);
  return { ratio, aa: ratio >= 4.5, aaa: ratio >= 7, aaLarge: ratio >= 3 };
}

export function formatRatio(ratio: number): string {
  return `${(Math.floor(ratio * 100) / 100).toFixed(2)}:1`;
}
