import { createFileRoute } from "@tanstack/react-router";
import {
  Bullets,
  CTA,
  CTARow,
  Grid,
  InfoCard,
  PageHero,
  Section,
  SectionHead,
  SubNav,
} from "@/components/site/kit";
import { MENTOR_SUBNAV } from "@/components/site/nav-sets";
import mentorImage from "@/assets/mentorship.jpg";

const DESC =
  "The Strong Minds Mentor Leadership Academy recruits, trains, and supports mentors who meet weekly with young people and help them grow.";

export const Route = createFileRoute("/mentors")({
  head: () => ({
    meta: [
      { title: "Mentor Leadership Academy | Become a Strong Minds Mentor" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Strong Minds Mentor Leadership Academy" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/mentors" },
    ],
    links: [{ rel: "canonical", href: "/mentors" }],
  }),
  component: Mentors,
});

function Mentors() {
  return (
    <>
      <PageHero
        eyebrow="SMMLA"
        title="Strong Minds Mentor Leadership Academy"
        subtitle="Mentors are the heart of Strong Minds. We recruit, train, and support adults who commit to showing up consistently for a young person."
        image={mentorImage}
        imageAlt="A mentor and a young person in conversation"
      >
        <CTARow>
          <CTA to="/mentor-interest" variant="gold">
            Become a Mentor
          </CTA>
          <CTA to="/information-session" variant="outline-light">
            Attend a Mentor Information Session
          </CTA>
        </CTARow>
      </PageHero>
      <SubNav links={MENTOR_SUBNAV} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow="The role"
              title="One young person. One hour a week. Real consistency."
              lead="Strong Minds mentors meet with their fellow on a scheduled weekly basis during the program year. Mentors support goal setting, executive functioning, reflection, problem solving, and encouragement."
            />
          </div>
          <div>
            <p className="eyebrow mb-4">What mentors do</p>
            <Bullets
              items={[
                "Meet weekly with an assigned fellow",
                "Support goal setting and follow-through",
                "Model reflection and problem solving",
                "Encourage academic and personal growth",
                "Communicate with Strong Minds staff",
                "Attend selected Saturday experiences and showcases",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="Preparation" title="Training and Support" />
        <Grid className="mt-8">
          <InfoCard title="Onboarding and screening">
            Application, conversation, references, and background screening before placement.
          </InfoCard>
          <InfoCard title="Mentor training">
            SMILE-led training on mentoring structure, youth development, executive functioning, and
            culturally responsive practice.
          </InfoCard>
          <InfoCard title="Ongoing coaching">
            Regular check-ins, community of practice, and direct staff support throughout the year.
          </InfoCard>
          <InfoCard title="Clear structure">
            Meeting frameworks, conversation guides, and shared tools so mentors are never guessing.
          </InfoCard>
          <InfoCard title="Defined commitment">
            A weekly scheduled meeting plus selected in-person experiences during the program year.
          </InfoCard>
          <InfoCard title="Community">
            Mentors are part of a team, not on their own.
          </InfoCard>
        </Grid>
      </Section>

      <Section tone="ink">
        <SectionHead
          light
          eyebrow="Get started"
          title="Ready to Mentor?"
          lead="Submit the mentor interest form and the Strong Minds team will follow up with next steps, training dates, and placement details."
        />
        <CTARow className="mt-8">
          <CTA to="/mentor-interest" variant="gold">
            Submit Mentor Interest
          </CTA>
          <CTA to="/schedule-a-call" variant="outline-light">
            Schedule a Call
          </CTA>
        </CTARow>
      </Section>
    </>
  );
}