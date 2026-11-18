import { useCallback, useEffect, useState } from 'react';
import { navItems } from '../data/navigation';
import type { PageId } from '../types';

const read = (): PageId => {
  const id = window.location.hash.slice(1) as PageId;
  return navItems.some((n) => n.id === id) ? id : 'overview';
};

export function useHashPage() {
  const [page, setPage] = useState<PageId>(read);
  useEffect(() => {
    const onChange = () => setPage(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  const go = useCallback((id: PageId) => { window.location.hash = id; }, []);
  return { page, go };
}
