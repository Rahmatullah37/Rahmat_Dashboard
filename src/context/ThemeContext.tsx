import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { hexToRgb, mix, rgbStr, shiftHue, type RGB } from '../utils/color';

export type Mode = 'light' | 'dark' | 'system';
export type SidebarStyle = 'dark' | 'light' | 'accent';
export type CardStyle = 'soft' | 'outline' | 'glass' | 'tinted';
export type Radius = 'sharp' | 'rounded' | 'round';
export type FontId = 'poppins' | 'inter' | 'grotesk' | 'lora';
export type TextSize = 'sm' | 'md' | 'lg';
export type Backdrop = 'plain' | 'gradient' | 'dots';

export interface Settings {
  accent: string; mode: Mode; sidebarStyle: SidebarStyle; cardStyle: CardStyle; radius: Radius;
  font: FontId; textSize: TextSize; backdrop: Backdrop; motion: boolean; sidebarHidden: boolean;
}

export const defaultSettings: Settings = {
  accent: '#3B82F6', mode: 'light', sidebarStyle: 'dark', cardStyle: 'soft', radius: 'rounded',
  font: 'poppins', textSize: 'md', backdrop: 'gradient', motion: true, sidebarHidden: false,
};

const KEY = 'rz-portfolio-settings';
const FONTS: Record<FontId, string> = {
  poppins: "'Poppins', system-ui, sans-serif",
  inter: "'Inter', system-ui, sans-serif",
  grotesk: "'Space Grotesk', system-ui, sans-serif",
  lora: "'Lora', Georgia, serif",
};
const RADII: Record<Radius, [string, string]> = { sharp: ['4px', '6px'], rounded: ['12px', '16px'], round: ['18px', '28px'] };
const SIZES: Record<TextSize, string> = { sm: '14px', md: '16px', lg: '18px' };

function load(): Settings {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...defaultSettings, ...JSON.parse(raw) };
  } catch { /* storage unavailable */ }
  return defaultSettings;
}

function sidebarVars(style: SidebarStyle, dark: boolean, brand: RGB): Record<string, string> {
  const b = rgbStr(brand), b2 = rgbStr(shiftHue(brand, 40));
  const grad = `linear-gradient(135deg, rgb(${b}), rgb(${b2}))`;
  if (style === 'accent') {
    return {
      '--side-bg': `linear-gradient(165deg, rgb(${b}), rgb(${b2}))`, '--side-fg': 'rgb(255 255 255 / .9)',
      '--side-muted': 'rgb(255 255 255 / .68)', '--side-strong': '#fff', '--side-hover': 'rgb(255 255 255 / .13)',
      '--side-active-bg': 'rgb(255 255 255 / .25)', '--side-active-fg': '#fff', '--side-line': 'rgb(255 255 255 / .22)',
      '--side-cta-bg': '#fff', '--side-cta-fg': `rgb(${rgbStr(mix(brand, [0, 0, 0], 0.2))})`,
    };
  }
  if (style === 'light') {
    return {
      '--side-bg': 'rgb(var(--card))', '--side-fg': 'rgb(var(--ink) / .82)', '--side-muted': 'rgb(var(--muted))',
      '--side-strong': 'rgb(var(--ink))', '--side-hover': 'rgb(var(--chip))', '--side-active-bg': 'rgb(var(--brand) / .13)',
      '--side-active-fg': 'rgb(var(--accent-text))', '--side-line': 'rgb(var(--line))', '--side-cta-bg': grad, '--side-cta-fg': '#fff',
    };
  }
  return {
    '--side-bg': dark ? 'rgb(8 13 28)' : 'rgb(11 27 59)', '--side-fg': 'rgb(203 213 225)', '--side-muted': 'rgb(148 163 184)',
    '--side-strong': '#fff', '--side-hover': 'rgb(255 255 255 / .07)', '--side-active-bg': 'rgb(255 255 255 / .11)',
    '--side-active-fg': `rgb(${rgbStr(mix(brand, [255, 255, 255], 0.45))})`, '--side-line': 'rgb(255 255 255 / .1)',
    '--side-cta-bg': grad, '--side-cta-fg': '#fff',
  };
}

interface Ctx {
  settings: Settings; update: (patch: Partial<Settings>) => void; reset: () => void;
  dark: boolean; toggleDark: () => void; toggleSidebar: () => void;
}
const ThemeCtx = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(load);
  const [systemDark, setSystemDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const on = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const dark = settings.mode === 'dark' || (settings.mode === 'system' && systemDark);

  useEffect(() => {
    const root = document.documentElement;
    const brand = hexToRgb(settings.accent);
    const vars: Record<string, string> = {
      '--brand': rgbStr(brand),
      '--brand-2': rgbStr(shiftHue(brand, 40)),
      '--accent-text': rgbStr(dark ? mix(brand, [255, 255, 255], 0.35) : mix(brand, [0, 0, 0], 0.15)),
      '--font': FONTS[settings.font],
      '--r-md': RADII[settings.radius][0],
      '--r-lg': RADII[settings.radius][1],
      ...sidebarVars(settings.sidebarStyle, dark, brand),
    };
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    root.classList.toggle('dark', dark);
    root.style.colorScheme = dark ? 'dark' : 'light';
    root.style.fontSize = SIZES[settings.textSize];
    root.dataset.card = settings.cardStyle;
    root.dataset.bg = settings.backdrop;
    root.dataset.motion = settings.motion ? 'on' : 'off';
  }, [settings, dark]);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(settings)); } catch { /* ignore */ }
  }, [settings]);

  const update = useCallback((patch: Partial<Settings>) => setSettings((s) => ({ ...s, ...patch })), []);
  const reset = useCallback(() => setSettings((s) => ({ ...defaultSettings, sidebarHidden: s.sidebarHidden })), []);
  const toggleDark = useCallback(() => setSettings((s) => ({ ...s, mode: (s.mode === 'dark' || (s.mode === 'system' && systemDark)) ? 'light' : 'dark' })), [systemDark]);
  const toggleSidebar = useCallback(() => setSettings((s) => ({ ...s, sidebarHidden: !s.sidebarHidden })), []);

  const value = useMemo(() => ({ settings, update, reset, dark, toggleDark, toggleSidebar }), [settings, update, reset, dark, toggleDark, toggleSidebar]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme(): Ctx {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
