import { site } from '@/lib/site';

const items = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { label: 'Location', value: 'Dhaka, Bangladesh' },
  { label: 'Phone', value: '+8801836849353', href: 'tel:+8801836849353' },
  {
    label: 'WhatsApp',
    value: 'Send a message',
    href: 'https://wa.me/+8801836849353',
  },
  { label: 'GitHub', value: 'Raselj71', href: site.links.github },
  { label: 'LinkedIn', value: 'rasel221', href: site.links.linkedin },
];

export function ContactInfo() {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.label} className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-wider text-text-dim">
            {item.label}
          </span>
          {item.href ? (
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              className="text-text hover:text-accent"
            >
              {item.value}
            </a>
          ) : (
            <span className="text-text">{item.value}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
