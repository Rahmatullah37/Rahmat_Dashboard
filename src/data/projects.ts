import type { Project } from '../types';

// Screenshots: public/images/projects/<id>.jpg (or .png/.webp). Also add stack, github and demo links here.
export const projects: Project[] = [
  { id: 'afis', title: 'AFIS: Biometric Fingerprint Identification System', category: 'Biometric Systems', description: 'A biometric fingerprint identification system.', stack: [], image: '/images/projects/afis' },
  { id: 'human-detection', title: 'Human Detection System', category: 'Detection Systems', description: 'A system for detecting humans.', stack: [], image: '/images/projects/human-detection-system' },
  { id: 'quetta-safe-city', title: 'Quetta Safe City Project', category: 'Public Safety', description: 'A safe city project for Quetta.', stack: [], image: '/images/projects/safe-city' },
  { id: 'tollbooth', title: 'Online Tollbooth Management System', category: 'Management Systems', description: 'An online system for managing tollbooths.', stack: [], image: '/images/projects/online-both' },
  { id: 'nfr-research', title: 'Context-Aware Elicitation and Automated Validation of Non-Functional Requirements', category: 'Research', description: 'MS research on eliciting and validating non-functional requirements using project context, ISO/IEC 25010 and LLM-as-a-Judge.', stack: ['ISO/IEC 25010', 'LLM-as-a-Judge'], image: '/images/projects/human-detection-system' },
];
