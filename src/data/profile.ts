import type { Profile } from '../types';

// Customize everything in this file. Empty fields are hidden in the UI.
export const profile: Profile = {
  name: 'Rahmat Ullah Zadran',
  initials: 'RZ',
  title: 'Software Engineer | .NET Developer | Researcher | Computer Science Graduate',
  tagline: 'Software engineer and researcher working with .NET, data and LLM-based requirements engineering.',
  // Pictures: drop files into public/images/profile/ using these names (.jpg, .jpeg, .png or .webp).
  // Until a file exists, a gradient + initials placeholder is shown automatically.
  photo: '/images/profile/photo',
  cover: '/images/profile/cover',
  aboutPhoto: '/images/profile/about',
  bio: [
    'I am a software engineer and .NET developer with a BS in Computer Science, currently pursuing an MS in Software Engineering at FAST NUCES Islamabad.',
    'My MS research focuses on context-aware elicitation and automated validation of non-functional requirements using project context, ISO/IEC 25010 and LLM-as-a-Judge.',
  ],
  interests: ['Software requirements engineering', 'Backend development with .NET', 'Machine learning and data science', 'LLM-based validation'],
  email: 'rahmat26800@gmail.com', phone: '+92 3359215573', location: 'Baka khel bannu kpk pakistan',
  socials: [
    { label: 'GitHub', url: 'https://github.com/rahmatullah37', icon: 'github' },
    // { label: 'LinkedIn', url: 'https://facebook.com/in/rahmatullahafghan', icon: 'facebook' },
  ],
  resume: '/resume/resume.pdf',
};
