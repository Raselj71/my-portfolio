'use client';

import { motion } from 'framer-motion';

export function HeroHeadline({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      className="mt-4 text-balance text-4xl font-semibold tracking-tighter text-text md:text-6xl lg:text-7xl"
    >
      {children}
    </motion.h1>
  );
}
