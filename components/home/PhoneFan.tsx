import Image from 'next/image';
import { cn } from '@/lib/cn';
import styles from './phone-fan.module.css';

export type Phone = {
  src: string;
  alt: string;
  href: string;
  icon: string;
  label: string;
  position: 'left' | 'center' | 'right';
};

export function PhoneFan({ phones }: { phones: Phone[] }) {
  return (
    <div className={styles.fan} aria-label="App screenshots">
      {phones.map((p) => (
        <a
          key={p.label}
          href={p.href}
          target="_blank"
          rel="noreferrer"
          className={cn(styles.phone, styles[p.position], 'anim-phone')}
          data-position={p.position}
        >
          <Image
            src={p.src}
            alt={p.alt}
            width={1080}
            height={1920}
            sizes="(max-width: 900px) 160px, 200px"
            priority={p.position === 'center'}
          />
          <span className={styles.label}>
            <Image src={p.icon} alt="" width={20} height={20} />
            {p.label}
          </span>
        </a>
      ))}
    </div>
  );
}
