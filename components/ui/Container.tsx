import { cn } from '@/lib/cn';

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...rest }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full max-w-[1200px] px-6 md:px-8', className)}
      {...rest}
    />
  );
}
