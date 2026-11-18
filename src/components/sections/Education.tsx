import { GraduationCap } from 'lucide-react';
import { Card } from '../common/Card';
import { Img } from '../common/Img';
import { Item, Stagger } from '../common/Motion';
import { education } from '../../data/education';

export function Education() {
  return (
    <Stagger className="grid gap-6 md:grid-cols-2">
      {education.map((e) => {
        const ongoing = e.status.toLowerCase() === 'ongoing';
        return (
          <Item key={e.degree}>
            <Card hover className="flex h-full flex-col overflow-hidden !p-0">
              <div className="grad relative h-40 overflow-hidden">
                <span className="blob -right-8 -top-10 h-40 w-40" aria-hidden />
                <GraduationCap size={64} className="absolute bottom-3 right-5 text-white/30" aria-hidden />
                <Img src={e.image} alt={e.institution} className="absolute inset-0 h-full w-full object-cover" fallback={null} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800">
                  <span className={`h-2 w-2 rounded-full ${ongoing ? 'bg-amber-500' : 'bg-emerald-500'}`} style={ongoing ? { animation: 'pulse-dot 1.6s infinite' } : undefined} aria-hidden />
                  {e.status}
                </span>
              </div>
              <div className="flex gap-4 p-6">
                <span className="grad grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white"><GraduationCap size={22} aria-hidden /></span>
                <div>
                  <h2 className="font-semibold">{e.degree}</h2>
                  <p className="text-muted">{e.institution}</p>
                  {e.period && <p className="mt-1 text-sm text-muted">{e.period}</p>}
                </div>
              </div>
            </Card>
          </Item>
        );
      })}
    </Stagger>
  );
}
