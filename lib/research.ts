import { SITE } from './site';

export type ResearchStatus = 'Active' | 'Experimental' | 'Archived';

export interface ResearchProject {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  year: string;
  status: ResearchStatus;
  blurb: string;
  tags: string[];
  links?: { label: string; href: string }[];
}

export const research: ResearchProject[] = [
  {
    slug: 'cli-research-agent',
    number: '01',
    title: 'CLI Research Agent',
    tagline: 'Agentic AI, from scratch.',
    year: '2025',
    status: 'Experimental',
    blurb:
      'A Python CLI agent that runs the ReAct loop by hand — no LangChain, no framework. Built to internalize how agentic systems actually work: tool dispatch, multi-turn message orchestration, and the reasoning loop that drives modern AI agents.',
    tags: ['Python', 'GLM-4.7', 'ReAct', 'Tool Use', 'Agentic AI'],
  },
  {
    slug: 'rust-gc-vm',
    number: '02',
    title: 'rust-gc-vm',
    tagline: 'Studying how language runtimes work.',
    year: '2025',
    status: 'Active',
    blurb:
      'Writing a garbage collector in Rust, with the goal of integrating it into the Dart VM. A long-running project to understand the runtime that Flutter is built on — Mark & Sweep first, then generational, then FFI prototype.',
    tags: ['Rust', 'FFI', 'GC algorithms', 'Dart VM'],
    links: [
      { label: 'GitHub', href: `${SITE.social.github}/rust-gc-vm` },
    ],
  },
];

export function getResearchProject(slug: string): ResearchProject | undefined {
  return research.find((r) => r.slug === slug);
}
