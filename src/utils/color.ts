export type RGB = [number, number, number];

export const hexToRgb = (hex: string): RGB => {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  if (h.length !== 6 || Number.isNaN(n)) return [59, 130, 246];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

export const rgbStr = (c: RGB) => c.join(' ');

export const mix = (a: RGB, b: RGB, t: number): RGB =>
  [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * t)) as RGB;

/** Rotate the hue; used to derive the second colour of every gradient from the chosen accent. */
export function shiftHue([r, g, b]: RGB, deg: number): RGB {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0, s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
  }
  h = (h + deg + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const [r1, g1, b1] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [Math.round((r1 + m) * 255), Math.round((g1 + m) * 255), Math.round((b1 + m) * 255)];
}

export const accents = [
  { id: 'blue', name: 'Blue', hex: '#3B82F6' },
  { id: 'indigo', name: 'Indigo', hex: '#6366F1' },
  { id: 'violet', name: 'Violet', hex: '#8B5CF6' },
  { id: 'pink', name: 'Pink', hex: '#EC4899' },
  { id: 'rose', name: 'Rose', hex: '#F43F5E' },
  { id: 'orange', name: 'Orange', hex: '#F97316' },
  { id: 'amber', name: 'Amber', hex: '#F59E0B' },
  { id: 'emerald', name: 'Emerald', hex: '#10B981' },
  { id: 'teal', name: 'Teal', hex: '#14B8A6' },
  { id: 'cyan', name: 'Cyan', hex: '#06B6D4' },
] as const;

export const initialsOf = (name: string) =>
  name.split(/\s+|\//).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('');
