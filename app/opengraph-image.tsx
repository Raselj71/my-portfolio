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
          background: '#0E1412',
          color: '#E8EEEA',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, color: '#A9B7B0' }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#5FD3A6' }} />
          Software Engineer · Dhaka
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3 }}>
            {site.name}
          </div>
          <div style={{ marginTop: 20, fontSize: 34, color: '#A9B7B0', lineHeight: 1.3 }}>
            Cross-platform mobile and full-stack engineer
          </div>
        </div>
        <div style={{ fontSize: 24, color: '#7E8C86' }}>
          {site.url.replace(/^https?:\/\//, '')}
        </div>
      </div>
    ),
    size,
  );
}
