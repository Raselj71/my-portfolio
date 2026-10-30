import { Container } from '@/components/ui/Container';
import { stack } from '@/lib/stack';
import { SectionHeading } from './SectionHeading';
import { StackIcon } from './StackIcon';

export function StackSection() {
  return (
    <section id="stack" className="scroll-mt-[70px] border-t border-line py-[60px]">
      <Container>
        <SectionHeading
          title="Tech stack"
          subtitle="What I reach for, grouped by where it runs. The first items in each column are the ones I use every week in production."
        />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((group) => (
            <div
              key={group.title}
              className="reveal rounded-card border border-line bg-surface p-5"
            >
              <h3 className="flex items-baseline justify-between font-display text-[15px] font-semibold">
                {group.title}
                {group.tag && (
                  <span className="text-xs font-medium text-dim">{group.tag}</span>
                )}
              </h3>
              <ul className="mt-3.5 grid gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="stack-row grid grid-cols-[30px_1fr] items-center gap-2.5"
                  >
                    <StackIcon icon={item.icon} color={item.color} name={item.name} />
                    <div>
                      <div className="text-sm font-semibold leading-tight">{item.name}</div>
                      <div className="mt-px text-xs text-dim">{item.note}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-3.5 border-t border-line pt-3 text-xs leading-[1.6] text-dim">
                <span className="font-semibold text-muted">
                  {group.also.startsWith('Languages:') ? '' : 'Also: '}
                </span>
                {group.also}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
