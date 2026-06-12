import { SITE } from '@/lib/site';

/**
 * Self-contained profile card — design playground that will later be ported to
 * an email-safe HTML version. Kept to ~600px wide to mirror the email column.
 * Uses only semantic tokens so the look stays in sync with the rest of the site.
 */

const CAPABILITIES: { title: string; detail: string }[] = [
  {
    title: 'AI / LLM Inference',
    detail:
      'vLLM (PagedAttention, KV cache), Gemma 4 31B full-precision, RunPod GPU infra, custom DAG orchestration with GPU mutex gating',
  },
  {
    title: 'Fine-Tuning & Evals',
    detail:
      'LoRA/QLoRA via Unsloth + TRL, custom task-specific eval suites (ROUGE-L, BERTScore, EM), HuggingFace Hub deployment',
  },
  {
    title: 'RAG & Vector Search',
    detail: 'LangChain, ChromaDB, HuggingFace embeddings, Google Gemini API',
  },
  {
    title: 'Data Engineering / ETL',
    detail: 'High-throughput semantic-mapping pipelines, algorithmic QA, multilingual NLP',
  },
  {
    title: 'Full-Stack Delivery',
    detail: 'Flutter (4+ yrs, 4 production apps), NestJS, Laravel, Svelte, TypeScript',
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
  { value: '60,000+', label: 'verses translated' },
  { value: '54,409', label: 'word replacements' },
  { value: '0%', label: 'error rate' },
];

const WORK: { name: string; detail: string }[] = [
  {
    name: 'Horeb',
    detail:
      'offline-first multilingual Flutter Bible app (ObjectBox, Bloc, Firebase). 64% Dart heap reduction via architecture migration.',
  },
  {
    name: 'HealthPass by TruNord',
    detail: 'App Store health app; native HealthKit & Google Fit bridging via Flutter Method Channels.',
  },
  {
    name: 'Gemma 4 Pokémon Fine-Tune',
    detail: 'end-to-end LoRA training (val loss 0.164), custom eval suite, models published to HuggingFace Hub.',
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
        {/* Header */}
        <div className="px-10 pt-11">
          {/* Drop your photo at public/headshot.jpg to replace the placeholder ring */}
          <img
            src="/headshot.jpg"
            alt="Tarun NagaSai"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full border border-border object-cover ring-1 ring-accent/30"
          />
          <h1 className="mt-6 text-[30px] font-bold leading-[1.05] tracking-tight text-fg">
            Tarun NagaSai
          </h1>
          <p className="mt-1.5 text-[15px] font-medium text-accent">
            AI / LLM Systems Engineer &amp; Full-Stack Developer
          </p>
          <p className="mt-2 text-[13px] text-muted">Hyderabad, India</p>
        </div>

        <div className="mx-10 mt-7 hairline" />

        {/* Pitch */}
        <p className="px-10 pt-6 text-[15px] leading-[1.7] text-fg">
          I architect and ship{' '}
          <strong className="font-semibold text-white">production LLM inference pipelines end-to-end</strong>{' '}
          — and deliver the complete product around them (mobile, backend, frontend). Most teams need two or
          more engineers for this. I do it solo.
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

        {/* Core Capabilities */}
        <div className="px-10 pt-7">
          <SectionLabel>Core Capabilities</SectionLabel>
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
              Production sacred-text translation across French, German, Italian &amp; Brazilian Portuguese.
              Custom ETL over 31,000+ verses, Ratcliff/Obershelp matching, DAG orchestration on RunPod with
              gated GPU mutex, async egress with auto-termination for zero GPU waste.
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
