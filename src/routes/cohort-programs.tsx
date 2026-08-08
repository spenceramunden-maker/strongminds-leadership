import { createFileRoute } from "@tanstack/react-router";
import {
  Bullets,
  CTA,
  CTARow,
  Grid,
  InfoCard,
  Note,
  PageHero,
  Section,
  SectionHead,
  SubNav,
} from "@/components/site/kit";
import { YOUTH_SUBNAV } from "@/components/site/nav-sets";

const DESC =
  "Cohort programs at Strong Minds Youth Academy: the 1-Month Minds-Ship, the 3-Month Enrichment Fellowship, and the Strong Semester afterschool training program.";

export const Route = createFileRoute("/cohort-programs")({
  head: () => ({
    meta: [
      { title: "Cohort Programs | Strong Minds Youth Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Strong Minds Cohort Programs" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/cohort-programs" },
    ],
    links: [{ rel: "canonical", href: "/cohort-programs" }],
  }),
  component: CohortPrograms,
});

function CohortPrograms() {
  return (
    <>
      <PageHero
        eyebrow="Youth Academy"
        title="Cohort Programs"
        subtitle="Beyond the 11-Month Leadership Fellowship: focused cohort experiences that run one month, three months, or a full academic semester."
      >
        <CTARow>
          <CTA to="/interest" variant="gold">
            Join a Cohort Interest List
          </CTA>
          <CTA to="/information-session" variant="outline-light">
            Attend an Information Session
          </CTA>
          <CTA to="/pricing" variant="outline-light">
            Request Pricing
          </CTA>
        </CTARow>
      </PageHero>
      <SubNav links={YOUTH_SUBNAV} />

      <Section>
        <SectionHead
          eyebrow="Overview"
          title="Pick the commitment that matches your student's season"
          lead="Each cohort program is small by design, led by trained Strong Minds staff, and built around a clear outcome families can see."
        />
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="One month" title="Minds-Ship" />
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              A one-month cohort experience focused on a single skill, topic, or experience. Students
              move through it together, in a small group, with an adult who knows their name and
              their goals.
            </p>
            <p>
              Families receive a custom parent progress report at the close of the month describing
              growth, participation, and recommended next steps.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-4">Key benefits</p>
            <Bullets
              items={[
                "Camaraderie built inside a shared month-long challenge",
                "Small cohort size",
                "Individualized support from Strong Minds staff",
                "Custom parent progress reports",
                "One clear skill, topic, or experience as the focus",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Three months" title="3-Month Enrichment Fellowship" />
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              A three-month fellowship centered on enrichment, social-emotional learning, and
              interest exploration. Students engage with a range of topics in a hands-on, practical
              way so they can identify their own strengths and skills through real participation
              rather than a personality quiz.
            </p>
            <p>
              Students leave with a strong understanding of how to identify their individual
              interests, plus foundational expertise in a specific trade or life skill.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-4">What students build</p>
            <Bullets
              items={[
                "Enrichment across multiple hands-on topics",
                "Social-emotional learning practiced in real settings",
                "Interest exploration with guided reflection",
                "Strengths and skills identified through engagement",
                "Foundational expertise in a chosen trade or life skill",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="One semester" title="Strong Semester" />
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Enrollment in a semester-long afterschool training program that teaches responsibility,
              leadership, academic development, and entrepreneurship.
            </p>
            <p>
              Each program day, students engage in a lesson in leadership, time management, project
              management, and our signature trademarked business development program.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-4">Daily lesson blocks</p>
            <Bullets
              items={[
                "Leadership",
                "Time management",
                "Project management",
                "Signature trademarked business development program",
                "Responsibility and academic development throughout",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Compare" title="At a glance" />
        <Grid className="mt-8" cols={3}>
          <InfoCard title="Minds-Ship — 1 month">
            One focused skill, topic, or experience. Small cohort, individualized support, custom
            parent progress report.
          </InfoCard>
          <InfoCard title="Enrichment Fellowship — 3 months">
            Enrichment, SEL, and interest exploration. Students leave knowing their strengths and
            the basics of a trade or life skill.
          </InfoCard>
          <InfoCard title="Strong Semester — 1 semester">
            Afterschool training in responsibility, leadership, academics, and entrepreneurship with
            daily structured lessons.
          </InfoCard>
        </Grid>
        <div className="mt-8">
          <Note>
            Cohort dates, group size, and placement vary by term. Join the interest list and we will
            send the current calendar and pricing.
          </Note>
        </div>
      </Section>

      <Section tone="ink">
        <SectionHead
          light
          eyebrow="Next step"
          title="Ready to place your student in a cohort?"
          lead="Tell us the age, schedule, and what you want your student to walk away with, and we will recommend the right cohort."
        />
        <CTARow className="mt-8">
          <CTA to="/enroll" variant="gold">
            Enroll a Student
          </CTA>
          <CTA to="/schedule-a-call" variant="outline-light">
            Schedule a Call
          </CTA>
        </CTARow>
      </Section>
    </>
  );
}