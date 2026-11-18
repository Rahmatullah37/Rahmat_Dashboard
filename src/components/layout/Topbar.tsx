import { useEffect, useState } from 'react';
import { Maximize2, Menu, Minimize2, Moon, PanelLeft, Search, Sun } from 'lucide-react';
import { profile } from '../../data/profile';
import { getIcon } from '../../utils/icons';
import { useTheme } from '../../context/ThemeContext';

interface Props { title: string; onMenu: () => void; onSearch: () => void }

export function Topbar({ title, onMenu, onSearch }: Props) {
  const { settings, dark, toggleDark, toggleSidebar } = useTheme();
  const [full, setFull] = useState(false);

  useEffect(() => {
    const on = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);

  const toggleFull = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen?.();
  };

  return (
    <header className="sticky top-0 z-20 flex items-center gap-2 bg-surface/70 px-4 py-3 backdrop-blur-md sm:gap-3 sm:px-8">
      <button onClick={onMenu} className="icon-btn lg:hidden" aria-label="Open menu"><Menu size={20} /></button>
      <button onClick={toggleSidebar} className="icon-btn hidden lg:grid" aria-label={settings.sidebarHidden ? 'Show sidebar' : 'Hide sidebar'} title={`${settings.sidebarHidden ? 'Show' : 'Hide'} sidebar (Ctrl+B)`}>
        <PanelLeft size={20} />
      </button>
      <nav aria-label="Breadcrumb" className="hidden min-w-0 truncate text-sm text-muted sm:block">
        Portfolio <span className="mx-1.5">/</span><span className="font-semibold text-ink">{title}</span>
      </nav>

      <button onClick={onSearch} className="ml-auto flex h-10 items-center gap-2 rounded-xl bg-card px-3 text-sm text-muted shadow-card transition-colors hover:text-accent sm:ml-4 sm:w-56" aria-label="Search pages">
        <Search size={16} aria-hidden /><span className="hidden flex-1 text-left sm:inline">Search…</span>
        <kbd className="hidden rounded bg-chip px-1.5 py-0.5 text-[10px] font-semibold sm:inline">Ctrl K</kbd>
      </button>

      <div className="flex gap-2 sm:ml-auto">
        <button onClick={toggleDark} className="icon-btn" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} title="Toggle dark mode">{dark ? <Sun size={20} /> : <Moon size={20} />}</button>
        <button onClick={toggleFull} className="icon-btn hidden sm:grid" aria-label="Toggle fullscreen" title="Fullscreen">{full ? <Minimize2 size={20} /> : <Maximize2 size={20} />}</button>
        {profile.socials.map((s) => {
          const Icon = getIcon(s.icon);
          return <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="icon-btn"><Icon size={20} /></a>;
        })}
      </div>
    </header>
  );
}
