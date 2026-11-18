import { useState, type KeyboardEvent } from 'react';
import { Moon, PanelLeft, Search } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { navItems } from '../../data/navigation';
import { getIcon } from '../../utils/icons';
import { useTheme } from '../../context/ThemeContext';
import type { PageId } from '../../types';

interface Cmd { id: string; label: string; hint: string; icon: LucideIcon; run: () => void }
interface Props { open: boolean; onClose: () => void; onNavigate: (id: PageId) => void }

export function CommandPalette({ open, ...rest }: Props) {
  return open ? <Palette {...rest} /> : null;
}

function Palette({ onClose, onNavigate }: Omit<Props, 'open'>) {
  const { toggleDark, toggleSidebar } = useTheme();
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);

  const all: Cmd[] = [
    ...navItems.map((n) => ({ id: n.id, label: n.label, hint: 'Go to page', icon: getIcon(n.icon), run: () => onNavigate(n.id) })),
    { id: 'dark', label: 'Toggle dark mode', hint: 'Action', icon: Moon, run: toggleDark },
    { id: 'sidebar', label: 'Show / hide sidebar', hint: 'Action', icon: PanelLeft, run: toggleSidebar },
  ];
  const list = all.filter((c) => c.label.toLowerCase().includes(q.trim().toLowerCase()));
  const pick = (c?: Cmd) => { if (c) { c.run(); onClose(); } };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, list.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') pick(list[idx]);
    else if (e.key === 'Escape') onClose();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-start bg-black/50 p-4 pt-[15vh] backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal aria-label="Search">
      <div className="card mx-auto w-full max-w-lg overflow-hidden !p-0" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={18} className="text-muted" aria-hidden />
          <input autoFocus value={q} onChange={(e) => { setQ(e.target.value); setIdx(0); }} onKeyDown={onKey} placeholder="Jump to a page or run an action…"
            className="h-14 flex-1 bg-transparent text-ink outline-none placeholder:text-muted" />
          <kbd className="rounded bg-chip px-1.5 py-0.5 text-[10px] font-semibold text-muted">Esc</kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {list.length === 0 && <li className="p-4 text-sm text-muted">No results.</li>}
          {list.map((c, i) => (
            <li key={c.id}>
              <button onClick={() => pick(c)} onMouseEnter={() => setIdx(i)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${i === idx ? 'bg-brand/15 text-accent' : 'text-ink'}`}>
                <c.icon size={18} aria-hidden /><span className="font-medium">{c.label}</span><span className="ml-auto text-xs text-muted">{c.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
