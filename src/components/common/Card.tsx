import type { ReactNode } from 'react';

interface Props { children: ReactNode; className?: string; hover?: boolean }

export function Card({ children, className = '', hover = false }: Props) {
  return <div className={`card p-6 ${hover ? 'card-hover' : ''} ${className}`}>{children}</div>;
}
