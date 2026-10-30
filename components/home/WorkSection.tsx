import { Container } from '@/components/ui/Container';
import { projects } from '@/lib/projects';
import { apps } from '@/lib/apps';
import { SectionHeading } from './SectionHeading';
import { ProjectCard } from './ProjectCard';
import { AppsGrid } from './AppsGrid';

export function WorkSection() {
  return (
    <section id="work" className="scroll-mt-[70px] border-t border-line py-[60px]">
      <Container>
        <SectionHeading
          title="Work"
          subtitle="Three client products and the studio I run on the side."
        />
        <div className="mt-7 grid gap-[18px] md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <AppsGrid apps={apps} />
      </Container>
    </section>
  );
}
