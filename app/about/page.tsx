import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { MobileHero } from '@/components/about/MobileHero';

export const metadata: Metadata = {
  title: 'About',
  description: 'Tarun NagaSai — Agentic AI Engineer and full-stack developer based in Vishakhapatnam, India.',
};

const SKILLS = [
  {
    group: 'AI / LLM / Inference',
    anchor: 'ai-llm',
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
    anchor: 'llm-finetuning',
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
    anchor: 'mobile',
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
    anchor: 'backend',
    items: ['NestJS', 'Prisma', 'Laravel', 'PHP 8.1+', 'REST API design', 'MySQL · PostgreSQL', 'Supabase'],
  },
  {
    group: 'Deployments',
    anchor: 'deployments',
    items: [
      'VPS / Server deployment (SSH · git · rsync)',
      'Vercel',
      'Railway',
      'Google Cloud Platform (GCP)',
      'Docker',
    ],
  },
  {
    group: 'Frontend',
    anchor: 'frontend',
    items: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Tauri', 'PWA (Service Workers, IndexedDB)'],
  },
];

export default function AboutPage() {
  return (
    <div className="pt-12 pb-16">
      <Container size="wide">
        {/* Mobile hero: full-bleed portrait that dissolves on scroll while the heading rises */}
        <MobileHero />

        {/* Desktop heading */}
        <div className="hidden lg:block mb-20 max-w-3xl">
          <p className="font-mono text-xs text-muted tracking-wider uppercase mb-4">
            About
          </p>
          <h1 className="text-display font-medium tracking-tight">
            Hi, I'm Tarun<span className="text-accent">.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <Reveal>
              <div className="prose-custom max-w-2xl">
                <p className="text-xl sm:text-2xl text-fg font-medium leading-snug tracking-tight">
                  I believe software can reach into any domain in the world, whether it's manufacturing, medicine, the oceans, or even space.
                </p>
                <p>
                  That belief is the reason I became a software engineer. It's the one field where I can work on almost anything. My fascination with gadgets is what set things in motion, and in 2021 I started out as a Flutter mobile app developer. I've been learning ever since.
                </p>
                <p>
                  The more I built, the more I understood that writing code is only one part of the whole system. Real products need strong architecture, and good architecture isn't about building things that never break. A perfect product isn't one that's free of errors. It's one that handles them without falling apart.
                </p>
                <p>
                  While working on the backends and deployments for my own apps, I discovered the beauty of the backend. It felt like an entirely new world, full of its own tools and software, and I dove into NestJS to explore it.
                </p>
                <p>
                  Then the AI era arrived, where almost anything feels possible. For someone who loves moving across domains, this was exactly where I wanted to be. I started my AI journey in 2025 with my first project, a Pokémon RAG pipeline, and I haven't stopped since. I've kept learning, exploring, and building with it every day.
                </p>
                <p>
                  My goal is simple: use software as a tool to do the most good I can for the world. I'll keep exploring and working on anything I can learn and grow from.
                </p>
                <p>
                  I also share what I figure out along the way, the hard-won lessons from shipping production systems and the problems that don't have good docs. If that sounds interesting, everything is on my{' '}
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
          </div>
          <div className="hidden lg:block lg:col-span-5 lg:order-2">
            <Reveal>
              {/* Desktop: full portrait fading in from the left */}
              <div className="relative aspect-[3/4] w-full lg:translate-x-10 [mask-image:linear-gradient(to_right,transparent,black_45%)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_45%)]">
                <Image
                  src="/tarun.png"
                  alt="Tarun NagaSai"
                  fill
                  sizes="40vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>

        <section className="mt-32 border-t border-border pt-16">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-10">
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
                  <h3 id={g.anchor} className="text-xs font-mono uppercase tracking-wider text-muted mb-4">
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
