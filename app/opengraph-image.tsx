import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const alt = 'Tarun NagaSai — Agentic AI Engineer & full-stack developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
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
          <span>tarun nagasai</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Agentic AI Engineer<span style={{ color: '#6B6B6B' }}>,</span></span>
            <span>
              full-stack developer<span style={{ color: '#5BA3D0' }}>.</span>
            </span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#9B9994',
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            I build LLM inference pipelines and the apps people actually use to talk to them.
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
          <span>Hyderabad, India</span>
          <span>{SITE.display.domain}</span>
        </div>
      </div>
    ),
    size,
  );
}
