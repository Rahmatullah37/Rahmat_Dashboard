import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Img } from '../common/Img';
import { Item, Stagger } from '../common/Motion';
import { experience } from '../../data/experience';
import { initialsOf } from '../../utils/color';

export function Experience() {
  return (
    <Stagger>
      <ol className="space-y-5 border-l-2 border-brand/25 pl-6">
        {experience.map((e) => (
          <li key={e.organization} className="relative">
            <span className="grad absolute -left-[34px] top-7 h-3.5 w-3.5 rounded-full ring-4 ring-surface" aria-hidden />
            <Item>
              <Card hover className="flex gap-4">
                <span className="grad relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl text-lg font-bold text-white">
                  {initialsOf(e.organization)}
                  <Img src={e.logo} alt={`${e.organization} logo`} className="absolute inset-0 h-full w-full bg-white object-contain p-1.5" fallback={null} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h2 className="text-lg font-semibold">{e.role}</h2>
                    {e.period && <span className="rounded-full bg-chip px-3 py-1 text-xs text-muted">{e.period}</span>}
                  </div>
                  <p className="text-accent">{e.organization}</p>
                  {e.responsibilities.length > 0 && (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">{e.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
                  )}
                  {e.technologies.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{e.technologies.map((t) => <Badge key={t}>{t}</Badge>)}</div>}
                </div>
              </Card>
            </Item>
          </li>
        ))}
      </ol>
    </Stagger>
  );
}
