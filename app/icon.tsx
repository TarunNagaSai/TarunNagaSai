import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#5BA3D0',
          fontSize: 20,
          fontWeight: 600,
          fontFamily: 'monospace',
          letterSpacing: '-0.05em',
        }}
      >
        tn
      </div>
    ),
    size,
  );
}
