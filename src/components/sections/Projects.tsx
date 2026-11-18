import { useMemo, useState } from 'react';
import { ProjectCard } from '../common/ProjectCard';
import { Item, Stagger } from '../common/Motion';
import { projects } from '../../data/projects';

export function Projects() {
  const categories = useMemo(() => ['All', ...Array.from(new Set(projects.map((p) => p.category)))], []);
  const [active, setActive] = useState('All');
  const shown = active === 'All' ? projects : projects.filter((p) => p.category === active);
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
        {categories.map((c) => (
          <button key={c} role="tab" aria-selected={c === active} onClick={() => setActive(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${c === active ? 'grad text-white shadow-lg' : 'card !rounded-full text-muted hover:text-accent'}`}>{c}</button>
        ))}
      </div>
      <Stagger key={active} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((p) => <Item key={p.id}><ProjectCard project={p} /></Item>)}
      </Stagger>
    </div>
  );
}
