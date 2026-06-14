import { SITE } from '@/lib/site';

/**
 * Self-contained profile card — design playground that will later be ported to
 * an email-safe HTML version. Kept to ~600px wide to mirror the email column.
 * Uses only semantic tokens so the look stays in sync with the rest of the site.
 */

const CAPABILITIES: { title: string; detail: string }[] = [
  {
    title: 'Ship AI from MVP to production',
    detail:
      'Take your AI idea from a quick proof-of-value MVP to a hardened system real users can rely on.',
  },
  {
    title: 'Chatbots & assistants over your own data',
    detail:
      'AI that answers from your documents and knowledge, with sources, instead of generic replies.',
  },
  {
    title: 'Automations & AI agents',
    detail:
      'Agents that connect to your tools, make decisions, and finish multi-step tasks so hours of manual work run on their own.',
  },
  {
    title: 'Reliable, cost-controlled pipelines',
    detail:
      'High-volume AI processing with quality checks built in and zero wasted spend on idle GPUs.',
  },
  {
    title: 'The full product, end to end',
    detail:
      'Mobile, backend, and frontend delivered around the AI, so you hire one engineer instead of a whole team.',
  },
];

const CHIPS = [
  'vLLM',
  'Gemma 4 31B',
  'RunPod GPU',
  'LoRA / PEFT',
  'LangChain',
  'ChromaDB',
  'Python',
  'Flutter',
  'NestJS',
  'TypeScript',
];

const STATS = [
  { value: '100,000+', label: 'verses translated' },
  { value: '4', label: 'languages shipped' },
  { value: '0%', label: 'error rate' },
];

const WORK: { name: string; detail: string }[] = [
  {
    name: 'Horeb',
    detail:
      'offline-first multilingual Bible app for iOS & Android; rebuilt the data layer to cut memory use 64% and render 3x faster.',
  },
  {
    name: 'HealthPass by TruNord',
    detail: 'health app live on the App Store, syncing real activity data from Apple Health & Google Fit.',
  },
  {
    name: 'Gemma 4 Pokémon Fine-Tune',
    detail: 'trained a custom domain model end to end and published it, proving the full fine-tuning lifecycle.',
  },
];

const hireMailto =
  `mailto:${SITE.email}` +
  `?subject=${encodeURIComponent("Let's work together")}` +
  `&body=${encodeURIComponent('Hi Tarun,\n\nI came across your profile and would like to discuss a project.')}`;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
      {children}
    </p>
  );
}

export function ProfileCard() {
  return (
    <div className="relative w-full max-w-[600px] overflow-hidden rounded-[18px] border border-border bg-bg">
      {/* Ambient accent orbs — mirrors the site's globals.css background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: [
            'radial-gradient(600px 380px at 12% -6%, rgba(91,163,208,0.28), transparent 60%)',
            'radial-gradient(520px 360px at 99% 106%, rgba(91,163,208,0.18), transparent 60%)',
            'radial-gradient(420px 320px at 55% 42%, rgba(91,163,208,0.07), transparent 70%)',
          ].join(', '),
        }}
      />

      <div className="relative z-10">
        {/* Header — avatar with name/title beside it to save vertical space */}
        <div className="px-10 pt-11">
          <div className="flex items-center gap-5">
            {/* Drop your photo at public/headshot.jpg to replace the placeholder ring */}
            <div className="h-[76px] w-[76px] shrink-0 overflow-hidden rounded-full border border-border ring-1 ring-accent/30">
              <img
                src="/headshot.jpg"
                alt="Tarun NagaSai"
                width={76}
                height={76}
                className="h-full w-full origin-center scale-[1.8] object-cover object-[55%_30%]"
              />
            </div>
            <div>
              <h1 className="text-[26px] font-bold leading-[1.1] tracking-tight text-fg">
                Tarun NagaSai
              </h1>
              <p className="mt-1 text-[14px] font-medium text-accent">
                AI Product Engineer
              </p>
              <p className="mt-1 text-[13px] text-muted">Vishakhapatnam, India</p>
            </div>
          </div>
        </div>

        <div className="mx-10 mt-7 hairline" />

        {/* Pitch */}
        <p className="px-10 pt-6 text-[15px] leading-[1.7] text-fg">
          A lot of AI demos look great but break once real users start using them.{' '}
          <strong className="font-semibold text-white">I build AI that actually works in the real world</strong>{' '}
          — taking your idea from a working MVP to a finished product that stays accurate, stays online, and
          doesn&apos;t waste money on idle GPUs. And I build the full product around it, so you hire one
          engineer instead of a team.
        </p>

        {/* Hire me */}
        <div className="px-10 pt-6">
          <a
            href={hireMailto}
            className="inline-flex items-center gap-2 rounded-[10px] bg-accent px-[30px] py-[13px] text-[14px] font-bold tracking-tight text-bg transition-opacity hover:opacity-90"
          >
            Hire me <span aria-hidden>→</span>
          </a>
        </div>

        {/* What I can do for you */}
        <div className="px-10 pt-7">
          <SectionLabel>What I can do for you</SectionLabel>
          <div className="mt-4 space-y-3">
            {CAPABILITIES.map((c) => (
              <div key={c.title}>
                <div className="text-[14px] font-semibold text-fg">{c.title}</div>
                <div className="mt-0.5 text-[13px] leading-[1.55] text-subtle">{c.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-2 px-10 pt-5">
          {CHIPS.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center rounded-full border border-border bg-accent/[0.04] px-[13px] py-1.5 font-mono text-[12px] font-medium text-subtle"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Flagship */}
        <div className="px-10 pt-5">
          <div className="rounded-[14px] border border-border bg-accent/[0.05] p-6">
            <SectionLabel>Flagship · Production</SectionLabel>
            <h2 className="mt-1.5 text-[19px] font-bold tracking-tight text-fg">
              Yahuah AI Translation Pipeline
            </h2>
            <p className="mt-2.5 text-[13px] leading-[1.65] text-subtle">
              A client needed their scripture translated into four languages without changing the meaning of a
              single word. I built a system that did it all automatically, checked its own work to catch any
              mistakes, and only ran the expensive AI hardware while it was actually working, so no money was
              wasted.
            </p>
            <div className="mt-5 flex">
              {STATS.map((s) => (
                <div key={s.label} className="flex-1">
                  <div className="text-[22px] font-bold tracking-tight text-accent">{s.value}</div>
                  <div className="mt-0.5 text-[11px] text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Work */}
        <div className="px-10 pt-7">
          <SectionLabel>Selected Work</SectionLabel>
          <div className="mt-4 divide-y divide-border">
            {WORK.map((w) => (
              <div key={w.name} className="py-3.5 first:pt-0">
                <strong className="text-[14px] font-semibold text-fg">{w.name}</strong>
                <span className="text-[13px] text-subtle"> — {w.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 pb-10 pt-7">
          <div className="mb-6 hairline" />
          <SectionLabel>Get in touch</SectionLabel>
          <div className="mt-4 flex flex-wrap gap-x-[18px] gap-y-2.5">
            <a
              href={`mailto:${SITE.email}`}
              className="text-[13px] font-semibold text-fg hover:text-accent transition-colors"
            >
              {SITE.display.email}
            </a>
            <a
              href={SITE.url}
              className="text-[13px] font-semibold text-fg hover:text-accent transition-colors"
            >
              {SITE.display.domain}
            </a>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
            <a href={SITE.social.github} className="text-[13px] text-muted hover:text-accent transition-colors">
              GitHub
            </a>
            <a href={SITE.social.linkedin} className="text-[13px] text-muted hover:text-accent transition-colors">
              LinkedIn
            </a>
            <a href={SITE.social.medium} className="text-[13px] text-muted hover:text-accent transition-colors">
              Medium
            </a>
            <a
              href={SITE.social.huggingFace}
              className="text-[13px] text-muted hover:text-accent transition-colors"
            >
              Hugging Face
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
