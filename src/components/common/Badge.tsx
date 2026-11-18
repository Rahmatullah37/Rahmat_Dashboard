import type { ReactNode } from 'react';

export function Badge({ children }: { children: ReactNode }) {
  return <span className="inline-block rounded-full bg-chip px-3.5 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-brand/15 hover:text-accent">{children}</span>;
}
