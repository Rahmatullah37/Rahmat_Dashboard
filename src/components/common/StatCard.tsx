import { getIcon } from '../../utils/icons';
import { Card } from './Card';

export function StatCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  const Icon = getIcon(icon);
  return (
    <Card hover className="relative flex h-full items-center justify-between overflow-hidden !p-5">
      <span className="grad pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-15" aria-hidden />
      <div>
        <p className="text-sm font-medium text-muted">{label}</p>
        <p className="grad-text mt-1 text-3xl font-bold">{value}</p>
      </div>
      <span className="grad grid h-12 w-12 place-items-center rounded-xl text-white shadow-lg" style={{ boxShadow: '0 8px 18px rgb(var(--brand) / .35)' }}><Icon size={22} aria-hidden /></span>
    </Card>
  );
}
