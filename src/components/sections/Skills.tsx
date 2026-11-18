import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Item, Stagger } from '../common/Motion';
import { skills } from '../../data/skills';
import { getIcon } from '../../utils/icons';

export function Skills() {
  return (
    <Stagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {skills.map((g) => {
        const Icon = getIcon(g.icon);
        return (
          <Item key={g.category}>
            <Card hover className="h-full">
              <div className="mb-4 flex items-center gap-3">
                <span className="grad grid h-11 w-11 place-items-center rounded-xl text-white"><Icon size={20} aria-hidden /></span>
                <div>
                  <h2 className="font-semibold leading-tight">{g.category}</h2>
                  <p className="text-xs text-muted">{g.skills.length} {g.skills.length === 1 ? 'skill' : 'skills'}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">{g.skills.map((s) => <Badge key={s}>{s}</Badge>)}</div>
            </Card>
          </Item>
        );
      })}
    </Stagger>
  );
}
