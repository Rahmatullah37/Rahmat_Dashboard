import type { ComponentType } from 'react';
import { Overview } from '../components/sections/Overview';
import { About } from '../components/sections/About';
import { Experience } from '../components/sections/Experience';
import { Education } from '../components/sections/Education';
import { Skills } from '../components/sections/Skills';
import { Projects } from '../components/sections/Projects';
import { Research } from '../components/sections/Research';
import { Contact } from '../components/sections/Contact';
import type { PageId } from '../types';

const pages: Record<PageId, ComponentType> = {
  overview: Overview, about: About, experience: Experience, education: Education,
  skills: Skills, projects: Projects, research: Research, contact: Contact,
};

export function DashboardPage({ page }: { page: PageId }) {
  const Page = pages[page];
  return <Page />;
}
