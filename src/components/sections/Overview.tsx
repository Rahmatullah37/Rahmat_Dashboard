import { ArrowRight, Download, FolderKanban } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { StatCard } from '../common/StatCard';
import { Avatar } from '../common/Avatar';
import { Img } from '../common/Img';
import { ProjectCard } from '../common/ProjectCard';
import { Item, Stagger } from '../common/Motion';
import { profile } from '../../data/profile';
import { education } from '../../data/education';
import { experience } from '../../data/experience';
import { projects } from '../../data/projects';
import { skills } from '../../data/skills';
import { research } from '../../data/research';
import { getIcon } from '../../utils/icons';

export function Overview() {
  const tags = skills.flatMap((g) => g.skills).slice(0, 10);
  const facts = [
    { icon: 'experience', label: 'Current role', value: `${experience[0].role}, ${experience[0].organization}` },
    { icon: 'education', label: 'Studying', value: `${education[0].degree}, ${education[0].institution}` },
    { icon: 'research', label: 'Research', value: 'Non-functional requirements with LLMs' },
  ];
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden !p-0">
        <div className="grad relative h-40 overflow-hidden sm:h-56">
          <span className="blob -right-10 -top-16 h-64 w-64" aria-hidden />
          <span className="blob bottom-[-4rem] left-1/3 h-48 w-48" style={{ animationDelay: '-4s' }} aria-hidden />
          <span className="blob left-8 top-6 h-16 w-16" style={{ animationDelay: '-2s' }} aria-hidden />
          <Img src={profile.cover} alt="" eager className="absolute inset-0 h-full w-full object-cover" fallback={null} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <div className="px-6 pb-7 sm:px-8">
          <div className="-mt-14 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end">
            <Avatar className="h-28 w-28 ring-4 ring-card sm:h-32 sm:w-32" textClass="text-4xl" />
            <div className="min-w-0 sm:pb-2">
              <p className="text-sm text-muted">Welcome, I am</p>
              <h2 className="text-2xl font-bold sm:text-4xl">{profile.name}</h2>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-accent">{profile.title}</p>
          <p className="mt-2 max-w-2xl text-muted">{profile.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary"><FolderKanban size={16} aria-hidden /> View projects</a>
            <a href={profile.resume} download className="btn-soft"><Download size={16} aria-hidden /> Download CV</a>
          </div>
        </div>
      </Card>

      <Stagger className="grid gap-6 xl:grid-cols-5">
        <Item className="xl:col-span-3">
          <Card className="h-full">
            <h2 className="text-lg font-semibold">About in brief</h2>
            <p className="mt-2 leading-relaxed text-muted">{profile.bio[0]}</p>
            <p className="mb-2 mt-5 text-sm font-semibold">Core technologies</p>
            <div className="flex flex-wrap gap-2">{tags.map((t) => <Badge key={t}>{t}</Badge>)}</div>
          </Card>
        </Item>
        <Item className="xl:col-span-2">
          <Card className="grid h-full divide-y divide-line !p-0">
            {facts.map((f) => {
              const Icon = getIcon(f.icon);
              return (
                <div key={f.label} className="flex items-center gap-4 p-5">
                  <span className="grad grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white"><Icon size={18} aria-hidden /></span>
                  <div className="min-w-0">
                    <p className="text-sm text-muted">{f.label}</p>
                    <p className="font-semibold leading-snug">{f.value}</p>
                  </div>
                </div>
              );
            })}
          </Card>
        </Item>
      </Stagger>

      <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Item><StatCard label="Academic Degrees" value={education.length} icon="education" /></Item>
        <Item><StatCard label="Experience Roles" value={experience.length} icon="experience" /></Item>
        <Item><StatCard label="Featured Projects" value={projects.length} icon="projects" /></Item>
        <Item><StatCard label="Skill Categories" value={skills.length} icon="skills" /></Item>
        <Item><StatCard label="Research Activities" value={research.title ? 1 : 0} icon="research" /></Item>
      </Stagger>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Featured projects</h2>
          <a href="#projects" className="flex items-center gap-1 text-sm font-medium text-accent hover:underline">View all <ArrowRight size={15} aria-hidden /></a>
        </div>
        <Stagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.slice(0, 3).map((p) => <Item key={p.id}><ProjectCard project={p} /></Item>)}
        </Stagger>
      </section>
    </div>
  );
}
