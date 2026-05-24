export interface ResearchProject {
  slug: string;
  title: string;
  teaser: string;
  year: string;
  tags: string[];
}

export const research: ResearchProject[] = [
  {
    slug: 'cli-research-agent',
    title: 'CLI Research Agent',
    teaser:
      'A Python CLI agent that runs the ReAct loop by hand — no LangChain, no framework. Built to internalize how agentic systems actually work: tool dispatch, multi-turn message orchestration, and the reasoning loop that drives modern AI agents.',
    year: '04/2026',
    tags: ['Python', 'GLM-4.7', 'ReAct', 'Tool Use', 'Agentic AI'],
  },
  {
    slug: 'rust-gc-vm',
    title: 'rust-gc-vm',
    teaser:
      'Writing a garbage collector in Rust, with the goal of integrating it into the Dart VM. A long-running project to understand the runtime that Flutter is built on — Mark & Sweep first, then generational, then FFI prototype.',
    year: '03/2026',
    tags: ['Rust', 'FFI', 'GC algorithms', 'Dart VM'],
  },
];

export function getResearchProject(slug: string): ResearchProject | undefined {
  return research.find((r) => r.slug === slug);
}
