import { cn } from '@/lib/cn';
import { Container } from './Container';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  bare?: boolean;
};

export function Section({ className, bare, children, ...rest }: SectionProps) {
  return (
    <section className={cn('py-16 md:py-24', className)} {...rest}>
      {bare ? children : <Container>{children}</Container>}
    </section>
  );
}
