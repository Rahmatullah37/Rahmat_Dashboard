import { FlaskConical } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Img } from '../common/Img';
import { Item, Stagger } from '../common/Motion';
import { research } from '../../data/research';

export function Research() {
  const lists = [
    { title: 'Objectives', items: research.objectives, badges: false },
    { title: 'Technologies', items: research.technologies, badges: true },
    { title: 'Methodologies', items: research.methodologies, badges: true },
  ].filter((l) => l.items.length > 0);
  return (
    <div className="space-y-6">
      <Card className="grid overflow-hidden !p-0 md:grid-cols-5">
        <div className="grad relative min-h-48 overflow-hidden md:col-span-2">
          <span className="blob -left-8 -top-10 h-40 w-40" aria-hidden />
          <div className="absolute inset-0 grid place-items-center text-white/80"><FlaskConical size={56} aria-hidden /></div>
          <Img src={research.image} alt="Research illustration" className="absolute inset-0 h-full w-full object-cover" fallback={null} />
        </div>
        <div className="p-6 md:col-span-3 md:p-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">MS Research</span>
          <h2 className="mt-2 text-xl font-semibold leading-snug">{research.title}</h2>
          <p className="mt-3 max-w-prose leading-relaxed text-muted">{research.overview}</p>
        </div>
      </Card>
      <Stagger className="grid gap-6 lg:grid-cols-3">
        {lists.map((l) => (
          <Item key={l.title}>
            <Card hover className="h-full">
              <h3 className="mb-3 font-semibold">{l.title}</h3>
              {l.badges ? (
                <div className="flex flex-wrap gap-2">{l.items.map((i) => <Badge key={i}>{i}</Badge>)}</div>
              ) : (
                <ol className="space-y-3 text-sm text-muted">
                  {l.items.map((i, n) => (
                    <li key={i} className="flex gap-3"><span className="grad grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white">{n + 1}</span><span>{i}</span></li>
                  ))}
                </ol>
              )}
            </Card>
          </Item>
        ))}
      </Stagger>
    </div>
  );
}
