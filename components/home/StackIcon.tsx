'use client';

import { useState } from 'react';

type Props = { icon: string | null; color?: string; name: string };

export function StackIcon({ icon, color, name }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <span className="grid size-[30px] place-items-center rounded-lg bg-surface2">
      {icon && !failed ? (
        // The icon CDN is third-party; plain <img> keeps it out of next/image's remote allowlist.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${icon}/${color ?? '8A8F98'}`}
          alt=""
          width={16}
          height={16}
          loading="lazy"
          onError={() => setFailed(true)}
          className="size-4"
        />
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={icon ? 'text-dim' : 'text-[#F22F46]'}
        >
          <title>{name}</title>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.7a2 2 0 0 1 1.7 2z" />
        </svg>
      )}
    </span>
  );
}
