import { useState, type ReactNode } from 'react';
import { Check, ChevronDown, Monitor, Moon, Palette, RotateCcw, Sun } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import type { Backdrop, CardStyle, FontId, Mode, Radius, SidebarStyle, TextSize } from '../../context/ThemeContext';
import { accents } from '../../utils/color';

interface Opt<T extends string> { value: T; label: string; icon?: LucideIcon }

function Segment<T extends string>({ options, value, onChange, cols }: { options: Opt<T>[]; value: T; onChange: (v: T) => void; cols: number }) {
  return (
    <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)}
          className="sb-ctl flex items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-medium transition-colors">
          {o.icon && <o.icon size={14} aria-hidden />}{o.label}
        </button>
      ))}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="sb-muted mb-1.5 text-[11px] font-semibold uppercase tracking-wider">{label}</p>
      {children}
    </div>
  );
}

export function ThemePanel() {
  const { settings: s, update, reset } = useTheme();
  const [more, setMore] = useState(false);

  return (
    <section className="sb-line mx-4 mb-4 mt-2 space-y-4 border-t pt-4" aria-label="Customize dashboard">
      <h2 className="sb-strong flex items-center gap-2 text-sm font-semibold"><Palette size={16} aria-hidden /> Customize</h2>

      <Field label="Mode">
        <Segment<Mode> cols={3} value={s.mode} onChange={(mode) => update({ mode })}
          options={[{ value: 'light', label: 'Light', icon: Sun }, { value: 'dark', label: 'Dark', icon: Moon }, { value: 'system', label: 'Auto', icon: Monitor }]} />
      </Field>

      <Field label="Accent colour (one click)">
        <div className="flex flex-wrap gap-2.5 pl-0.5 pt-0.5">
          {accents.map((a) => {
            const on = s.accent.toLowerCase() === a.hex.toLowerCase();
            return (
              <button key={a.id} type="button" title={a.name} aria-label={`${a.name} accent`} aria-pressed={on}
                onClick={() => update({ accent: a.hex })} style={{ background: a.hex }}
                className="swatch grid h-7 w-7 place-items-center rounded-full text-white">
                {on && <Check size={14} strokeWidth={3} aria-hidden />}
              </button>
            );
          })}
          <label title="Pick any colour" className="swatch relative grid h-7 w-7 cursor-pointer place-items-center overflow-hidden rounded-full"
            style={{ background: 'conic-gradient(#ef4444, #eab308, #22c55e, #06b6d4, #3b82f6, #d946ef, #ef4444)' }}>
            <input type="color" value={s.accent} onChange={(e) => update({ accent: e.target.value })} aria-label="Custom accent colour" className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
          </label>
        </div>
      </Field>

      <button type="button" onClick={() => setMore((m) => !m)} aria-expanded={more}
        className="sb-ctl flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold">
        More options <ChevronDown size={16} className={`transition-transform ${more ? 'rotate-180' : ''}`} aria-hidden />
      </button>

      {more && (
        <div className="space-y-4">
          <Field label="Sidebar style">
            <Segment<SidebarStyle> cols={3} value={s.sidebarStyle} onChange={(sidebarStyle) => update({ sidebarStyle })}
              options={[{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }, { value: 'accent', label: 'Colour' }]} />
          </Field>
          <Field label="Card style">
            <Segment<CardStyle> cols={2} value={s.cardStyle} onChange={(cardStyle) => update({ cardStyle })}
              options={[{ value: 'soft', label: 'Soft shadow' }, { value: 'outline', label: 'Outline' }, { value: 'glass', label: 'Glass' }, { value: 'tinted', label: 'Tinted' }]} />
          </Field>
          <Field label="Corners">
            <Segment<Radius> cols={3} value={s.radius} onChange={(radius) => update({ radius })}
              options={[{ value: 'sharp', label: 'Sharp' }, { value: 'rounded', label: 'Round' }, { value: 'round', label: 'Pill' }]} />
          </Field>
          <Field label="Background">
            <Segment<Backdrop> cols={3} value={s.backdrop} onChange={(backdrop) => update({ backdrop })}
              options={[{ value: 'plain', label: 'Plain' }, { value: 'gradient', label: 'Glow' }, { value: 'dots', label: 'Dots' }]} />
          </Field>
          <Field label="Font">
            <Segment<FontId> cols={2} value={s.font} onChange={(font) => update({ font })}
              options={[{ value: 'poppins', label: 'Poppins' }, { value: 'inter', label: 'Inter' }, { value: 'grotesk', label: 'Grotesk' }, { value: 'lora', label: 'Serif' }]} />
          </Field>
          <Field label="Text size">
            <Segment<TextSize> cols={3} value={s.textSize} onChange={(textSize) => update({ textSize })}
              options={[{ value: 'sm', label: 'A−' }, { value: 'md', label: 'A' }, { value: 'lg', label: 'A+' }]} />
          </Field>
          <button type="button" role="switch" aria-checked={s.motion} onClick={() => update({ motion: !s.motion })}
            className="sb-ctl flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium">
            Animations
            <span className={`relative h-5 w-9 rounded-full transition-colors ${s.motion ? 'bg-emerald-500' : 'bg-slate-500/60'}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${s.motion ? 'left-[18px]' : 'left-0.5'}`} />
            </span>
          </button>
          <button type="button" onClick={reset} className="sb-ctl flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold">
            <RotateCcw size={14} aria-hidden /> Reset to default
          </button>
        </div>
      )}
    </section>
  );
}
