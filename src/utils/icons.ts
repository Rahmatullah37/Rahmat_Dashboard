import { Brain, Briefcase, ClipboardCheck, Code2, Database, FlaskConical, FolderKanban, GitBranch, GraduationCap, LayoutDashboard, Mail, Server, User, Wrench, Github, Linkedin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  overview: LayoutDashboard, about: User, experience: Briefcase, education: GraduationCap, skills: Wrench,
  projects: FolderKanban, research: FlaskConical, contact: Mail, code: Code2, server: Server, database: Database,
  brain: Brain, clipboard: ClipboardCheck, git: GitBranch, github: Github, linkedin: Linkedin, mail: Mail,
};
export const getIcon = (name: string): LucideIcon => icons[name] ?? LayoutDashboard;
