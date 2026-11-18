import type { Research } from '../types';

export const research: Research = {
  image: '/images/research/context-aware', // public/images/research/cover.jpg
  title: 'Context-Aware Elicitation and Automated Validation of Non-Functional Requirements',
  overview: 'My MS research focuses on context-aware elicitation and automated validation of non-functional requirements using project context, ISO/IEC 25010 and LLM-as-a-Judge.',
  objectives: [
    'Elicit non-functional requirements using the context of the project.',
    'Validate non-functional requirements automatically using LLM-as-a-Judge.',
  ],
  technologies: ['Large language models', 'LLM-as-a-Judge'],
  methodologies: ['Context-aware elicitation', 'ISO/IEC 25010 quality model', 'Automated validation'],
};
