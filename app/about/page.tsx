import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { SkillRadar } from '@/components/about/SkillRadar';

export const metadata: Metadata = {
  title: 'About',
  description: 'Tarun NagaSai — Agentic AI Engineer and full-stack developer based in Hyderabad, India.',
};

const SKILLS = [
  {
    group: 'AI / LLM / Inference',
    items: [
      'vLLM (PagedAttention, KV cache)',
      'Gemma 4 31B · Gemma 4 E2B',
      'RunPod · NVIDIA RTX 6000 Blackwell',
      'DAG orchestration',
      'Python pipeline engineering',
      'LangChain · ChromaDB · HuggingFace',
      'Prompt engineering',
      'Ollama · TranslateGemma',
    ],
  },
  {
    group: 'LLM Fine-tuning',
    items: [
      'Unsloth (LoRA · QLoRA)',
      'PEFT · TRL (SFTTrainer)',
      'HuggingFace Hub (model hosting)',
      'bitsandbytes (quantization)',
      'Custom LLM evals (ROUGE-L · BERTScore · task-specific EM)',
      'Alpaca / chat-template data prep',
    ],
  },
  {
    group: 'Mobile',
    items: [
      'Flutter (4+ years)',
      'Dart',
      'ObjectBox',
      'Bloc / Cubit · GetX · AutoRoute',
      'All Firebase',
      'Method Channels (native bridging)',
      'HealthKit · Google Fit · Aktivo SDK',
      'RevenueCat · Patrol · Fastlane',
    ],
  },
  {
    group: 'Backend',
    items: ['NestJS', 'Prisma', 'Laravel', 'PHP 8.1+', 'REST API design', 'MySQL · PostgreSQL', 'Supabase'],
  },
  {
    group: 'Deployments',
    items: [
      'VPS / Server deployment (SSH · git · rsync)',
      'Vercel',
      'Railway',
      'Google Cloud Platform (GCP)',
      'Docker',
    ],
  }
];

export default function AboutPage() {
  return (
    <div className="pt-12 pb-16">
      <Container size="wide">
        <div className="mb-20 max-w-3xl">
          <p className="font-mono text-xs text-muted tracking-wider uppercase mb-4">
            About
          </p>
          <h1 className="text-display font-medium tracking-tight">
            Hi, I'm Tarun<span className="text-accent">.</span>
          </h1>
        </div>

        <Reveal>
          <div className="prose-custom max-w-2xl">
            <p className="text-xl sm:text-2xl text-fg font-medium leading-snug tracking-tight">
              I'm an Agentic AI Engineer, based in Hyderabad, India.
            </p>
            <p>
              I spent four years building production mobile apps with Flutter —
              the kind that sit on real users' phones and have to work even when
              the network doesn't. Apps on the App Store. Apps with native bridges
              into HealthKit and Google Fit. Apps with real-time chat and
              background location.
            </p>
            <p>
              Then I went deeper. I started building the AI side of products
              instead of just calling AI APIs. I shipped a production translation
              pipeline running Gemma 4 31B on a GPU server — 60,000 verses of the
              Bible translated with zero errors, using a custom DAG, GPU mutex
              gating, and a guardrail I had to invent for the problem.
            </p>
            <p>
              These days I sit at a rare crossroads. Most engineers can build the
              app, or the AI behind it. I do both, on the same project, by
              myself. It means a startup or a client can hire one person instead
              of two — and the AI side actually talks fluently to the product
              side, because the same brain wrote both.
            </p>
            <p>
              I learn, apply new ideas to real projects, and share what I figure out along the way — the hard-won lessons from shipping production systems, the weird problems that don't have good docs, and the things that just plain surprised me. If that sounds interesting, everything is on my{' '}
              <a
                href="/writing"
                className="text-fg underline decoration-border underline-offset-4 hover:decoration-accent transition-colors"
              >
                writing page
              </a>
              .
            </p>
          </div>
        </Reveal>

        <section className="mt-32 border-t border-border pt-16">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-10 mb-16">
            <div className="sm:col-span-4 md:col-span-3">
              <p className="font-mono text-xs text-muted tracking-wider uppercase">
                Skill radar
              </p>
              <p className="mt-3 text-sm text-subtle max-w-xs">
                A self-assessment across ten career domains, scored 0–100.
                Honest about where I'm strong and where I'm still climbing.
              </p>
            </div>
            <div className="sm:col-span-8 md:col-span-9">
              <Reveal>
                <SkillRadar />
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-10 border-t border-border pt-16">
            <div className="sm:col-span-4 md:col-span-3">
              <p className="font-mono text-xs text-muted tracking-wider uppercase">
                Skills
              </p>
              <p className="mt-3 text-sm text-subtle max-w-xs">
                Grouped by area. Click through to{' '}
                <a
                  href="/work"
                  className="text-fg underline decoration-border underline-offset-4 hover:decoration-accent transition-colors"
                >
                  Work
                </a>{' '}
                to see them in context.
              </p>
            </div>
            <div className="sm:col-span-8 md:col-span-9 space-y-10">
              {SKILLS.map((g, i) => (
                <Reveal key={g.group} delay={Math.min(i * 0.04, 0.16)}>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-muted mb-4">
                    {g.group}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-32 border-t border-border pt-16">
          <Reveal>
            <p className="font-mono text-xs text-muted tracking-wider uppercase mb-6">
              Get in touch
            </p>
            <h2 className="text-h1 font-medium tracking-tight max-w-3xl">
              Open for freelance projects and contracts<span className="text-accent">.</span>
            </h2>
            <div className="mt-10">
              <ArrowLink href="/contact">Contact me</ArrowLink>
            </div>
          </Reveal>
        </section>
      </Container>
    </div>
  );
}
