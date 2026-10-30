import { Container } from '@/components/ui/Container';
import { roles } from '@/lib/experience';
import { site } from '@/lib/site';
import { SectionHeading } from './SectionHeading';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="scroll-mt-[70px] border-t border-line py-[60px]"
    >
      <Container>
        <SectionHeading
          title="Experience"
          subtitle="Two and a half years across mobile, web, and real-time products."
          action={{ label: 'Resume (PDF)', href: site.resumePath, external: true }}
        />
        <div className="mt-7">
          {roles.map((role) => (
            <div
              key={`${role.title}-${role.period}`}
              className="reveal grid gap-2 border-t border-line py-[22px] md:grid-cols-[220px_1fr] md:gap-8"
            >
              <div className="text-[13px] text-dim">
                <div className="text-[15px] font-semibold text-text">{role.title}</div>
                {role.companyUrl ? (
                  <a
                    href={role.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-text"
                  >
                    {role.company}
                  </a>
                ) : (
                  <span>{role.company}</span>
                )}
                <div>{role.period}</div>
              </div>
              <div>
                <h3 className="text-base font-semibold">{role.heading}</h3>
                <p className="mt-1.5 max-w-[72ch] text-[15px] leading-[1.55] text-muted">
                  {role.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
