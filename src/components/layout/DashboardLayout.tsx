import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { navItems } from '../../data/navigation';
import { profile } from '../../data/profile';
import { useTheme } from '../../context/ThemeContext';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from './CommandPalette';
import type { PageId } from '../../types';

interface Props { page: PageId; onNavigate: (id: PageId) => void; children: ReactNode }

export function DashboardLayout({ page, onNavigate, children }: Props) {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState(false);
  const { toggleSidebar } = useTheme();
  const scroller = useRef<HTMLDivElement>(null);
  const current = navItems.find((n) => n.id === page) ?? navItems[0];

  useEffect(() => { scroller.current?.scrollTo({ top: 0 }); }, [page]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      const k = e.key.toLowerCase();
      if (k === 'k') { e.preventDefault(); setPalette((p) => !p); }
      else if (k === 'b') { e.preventDefault(); toggleSidebar(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleSidebar]);

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar page={page} onNavigate={onNavigate} open={open} onClose={() => setOpen(false)} />
      <div ref={scroller} className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <Topbar title={current.title} onMenu={() => setOpen(true)} onSearch={() => setPalette(true)} />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-10 pt-4 sm:px-8">
          <motion.div key={page} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h1 className="text-2xl font-bold sm:text-3xl">{current.title}</h1>
            <span className="grad mt-2 block h-1 w-12 rounded-full" aria-hidden />
            <p className="mb-6 mt-3 text-muted">{current.subtitle}</p>
            {children}
          </motion.div>
        </main>
        <footer className="px-8 pb-6 text-xs text-muted">© {new Date().getFullYear()} {profile.name}</footer>
      </div>
      <CommandPalette open={palette} onClose={() => setPalette(false)} onNavigate={onNavigate} />
    </div>
  );
}
