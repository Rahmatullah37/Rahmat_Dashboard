import { Download, PanelLeftClose, X } from 'lucide-react';
import { navItems } from '../../data/navigation';
import { profile } from '../../data/profile';
import { getIcon } from '../../utils/icons';
import { useTheme } from '../../context/ThemeContext';
import { Avatar } from '../common/Avatar';
import { ThemePanel } from './ThemePanel';
import type { PageId } from '../../types';

interface Props { page: PageId; onNavigate: (id: PageId) => void; open: boolean; onClose: () => void }

export function Sidebar({ page, onNavigate, open, onClose }: Props) {
  const { settings, toggleSidebar } = useTheme();
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden" onClick={onClose} aria-hidden />}
      <aside className="sidebar" data-open={open} data-hidden={settings.sidebarHidden} aria-hidden={settings.sidebarHidden ? true : undefined} aria-label="Main navigation">
        <div className="flex items-center gap-3 px-5 py-6">
          <Avatar className="h-12 w-12 ring-2 ring-white/30" />
          <div className="min-w-0">
            <p className="sb-strong truncate font-semibold">{profile.name}</p>
            <p className="sb-muted truncate text-xs">Software Engineer</p>
          </div>
          <button className="sb-ctl ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-lg lg:hidden" onClick={onClose} aria-label="Close menu"><X size={18} /></button>
          <button className="sb-ctl ml-auto hidden h-8 w-8 shrink-0 place-items-center rounded-lg lg:grid" onClick={toggleSidebar} aria-label="Hide sidebar" title="Hide sidebar (Ctrl+B)"><PanelLeftClose size={18} /></button>
        </div>

        <nav className="px-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = getIcon(item.icon);
              const active = item.id === page;
              return (
                <li key={item.id}>
                  <button onClick={() => { onNavigate(item.id); onClose(); }} aria-current={active ? 'page' : undefined}
                    className="sb-item flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-[15px] font-medium transition-colors">
                    <Icon size={18} aria-hidden />
                    <span>{item.label}</span>
                    {active && <span className="ml-auto h-2 w-2 rounded-full bg-current" aria-hidden />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <ThemePanel />

        <div className="mt-auto p-4 pt-0">
          <a href={profile.resume} download className="sb-cta flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition">
            <Download size={16} aria-hidden /> Download CV
          </a>
        </div>
      </aside>
    </>
  );
}
