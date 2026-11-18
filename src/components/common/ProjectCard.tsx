import { ExternalLink, FolderKanban, Github } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Img } from './Img';
import type { Project } from '../../types';

export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <Card hover className="group flex h-full flex-col overflow-hidden !p-0">
      <div className="grad relative aspect-video overflow-hidden">
        <span className="blob -right-8 -top-10 h-36 w-36" aria-hidden />
        <span className="blob -bottom-12 left-6 h-28 w-28" style={{ animationDelay: '-3s' }} aria-hidden />
        <div className="absolute inset-0 grid place-items-center text-white/90"><FolderKanban size={40} aria-hidden /></div>
        <Img src={p.image} alt={`${p.title} screenshot`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" fallback={null} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur">{p.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold leading-snug">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted">{p.description}</p>
        {p.stack.length > 0 && <div className="mt-4 flex flex-wrap gap-1.5">{p.stack.map((s) => <Badge key={s}>{s}</Badge>)}</div>}
        {(p.github || p.demo) && (
          <div className="mt-4 flex gap-4 text-sm font-medium text-accent">
            {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline"><Github size={15} /> Code</a>}
            {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline"><ExternalLink size={15} /> Live demo</a>}
          </div>
        )}
      </div>
    </Card>
  );
}
