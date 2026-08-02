import { createFileRoute } from "@tanstack/react-router";
import { CTA, CTARow, PageHero, Prose, Section, SectionHead } from "@/components/site/kit";

const DESC =
  "Meet the founder of Strong Minds Leadership Academy and the conviction behind the work: young people thrive when structure, mentorship, and belonging come together.";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "Founder's Message | Strong Minds Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Founder's Message" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/founder" },
    ],
    links: [{ rel: "canonical", href: "/founder" }],
  }),
  component: Founder,
});

function Founder() {
  return (
    <>
      <PageHero eyebrow="Leadership" title="A Message From the Founder" />
      <Section>
        <SectionHead eyebrow="Why Strong Minds" title="Young people rise to the structure we build for them" />
        <div className="mt-6">
          <Prose>
            <p>
              Strong Minds began with a simple observation: young people are rarely short on
              potential. What they are short on is consistent structure, adults who show up every
              week, and spaces where they are both challenged and affirmed.
            </p>
            <p>
              We built this Academy with the experiences of Black and Brown boys at the center, while
              welcoming every family looking for a purpose-driven learning community. Our fellows are
              known by name. They plan their days, reflect on their choices, do real academic work,
              build things, and meet with a mentor every week.
            </p>
            <p>
              We also refuse to place the whole burden on young people. Through SMILE we train the
              educators, mentors, and organizations around them, and through Strong Minds Families we
              walk with the caregivers doing the daily work at home.
            </p>
            <p>
              If any part of this resonates, reach out. Come to an information session. Ask hard
              questions. This work is built for families who want a real partner.
            </p>
          </Prose>
        </div>
        <CTARow className="mt-10">
          <CTA to="/information-session" variant="ink">Attend an Information Session</CTA>
          <CTA to="/schedule-a-call" variant="outline">Schedule a Call</CTA>
        </CTARow>
      </Section>
    </>
  );
}