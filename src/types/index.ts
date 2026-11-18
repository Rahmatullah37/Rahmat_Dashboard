export type PageId = 'overview' | 'about' | 'experience' | 'education' | 'skills' | 'projects' | 'research' | 'contact';
export interface NavItem { id: PageId; label: string; title: string; subtitle: string; icon: string }
export interface Social { label: string; url: string; icon: 'github' | 'linkedin' | 'mail' }
export interface Profile {
  name: string; initials: string; title: string; tagline: string;
  photo?: string;       // avatar: sidebar, hero, contact
  cover?: string;       // wide banner behind the hero card
  aboutPhoto?: string;  // larger portrait on the About page
  bio: string[]; interests: string[]; email?: string; phone?: string; location?: string;
  socials: Social[]; resume: string;
}
export interface Project { id: string; title: string; category: string; description: string; stack: string[]; image?: string; github?: string; demo?: string }
export interface SkillGroup { category: string; icon: string; skills: string[] }
export interface Experience { organization: string; role: string; period?: string; logo?: string; responsibilities: string[]; technologies: string[] }
export interface Education { institution: string; degree: string; status: string; period?: string; image?: string }
export interface Research { title: string; overview: string; image?: string; objectives: string[]; technologies: string[]; methodologies: string[] }
