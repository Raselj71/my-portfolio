import { Hero } from '@/components/home/Hero';
import { WorkSection } from '@/components/home/WorkSection';
import { ExperienceSection } from '@/components/home/ExperienceSection';
import { StackSection } from '@/components/home/StackSection';
import { AboutSection } from '@/components/home/AboutSection';
import { RevealObserver } from '@/components/motion/RevealObserver';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkSection />
      <ExperienceSection />
      <StackSection />
      <AboutSection />
      <RevealObserver />
    </>
  );
}
