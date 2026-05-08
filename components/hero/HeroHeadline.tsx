'use client';

import { motion, useReducedMotion } from 'framer-motion';

const className =
  'mt-4 text-balance text-4xl font-semibold tracking-tighter text-text md:text-6xl lg:text-7xl';

export function HeroHeadline({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <h1 className={className}>{children}</h1>;
  return (
    <motion.h1
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      className={className}
    >
      {children}
    </motion.h1>
  );
}
