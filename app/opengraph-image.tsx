import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const runtime = 'edge';
export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background:
            'radial-gradient(60% 60% at 50% 0%, rgba(56,189,248,0.18) 0%, transparent 70%), #0a0a0a',
          color: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 28, color: '#38bdf8', letterSpacing: 4 }}>
          SOFTWARE ENGINEER
        </div>
        <div>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ marginTop: 16, fontSize: 32, color: '#a1a1aa' }}>
            {site.description}
          </div>
        </div>
        <div style={{ fontSize: 24, color: '#71717a', fontFamily: 'monospace' }}>
          {site.url.replace(/^https?:\/\//, '')}
        </div>
      </div>
    ),
    size,
  );
}
