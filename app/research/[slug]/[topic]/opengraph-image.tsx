import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';
import { research, getResearchTopic } from '@/lib/research';

export const alt = 'Tarun NagaSai — Research';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return research.flatMap((r) =>
    r.topics.map((t) => ({ slug: r.slug, topic: t.slug })),
  );
}

export default function OG({
  params,
}: {
  params: { slug: string; topic: string };
}) {
  const found = getResearchTopic(params.slug, params.topic);
  const seriesTitle = found?.series.title ?? 'Research';
  const title = found?.topic.title ?? 'Research';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          color: '#E8E6E0',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontFamily: 'monospace',
            fontSize: 22,
            color: '#6B6B6B',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ width: 48, height: 1, background: '#1F1F1F' }} />
          <span>{seriesTitle} · research</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              display: 'flex',
              maxWidth: 1000,
            }}
          >
            <span>
              {title}
              <span style={{ color: '#5BA3D0' }}>.</span>
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'monospace',
            fontSize: 18,
            color: '#6B6B6B',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          <span>Tarun NagaSai</span>
          <span>{SITE.display.domain}</span>
        </div>
      </div>
    ),
    size,
  );
}
