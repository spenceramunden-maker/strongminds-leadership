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
  "The Strong Minds Alumni Leadership Fellowship supports eligible alumni ages 19–20 with advanced projects, entrepreneurship, senior mentoring, service, and career development.";

export const Route = createFileRoute("/alumni-fellowship")({
  head: () => ({
    meta: [
      { title: "Alumni Leadership Fellowship | Strong Minds Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Strong Minds Alumni Leadership Fellowship" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/alumni-fellowship" },
    ],
    links: [{ rel: "canonical", href: "/alumni-fellowship" }],
  }),
  component: AlumniFellowship,
});

function AlumniFellowship() {
  return (
    <>
      <PageHero
        eyebrow="Youth Academy"
        title="Alumni Leadership Fellowship"
        subtitle="Eligible Strong Minds alumni may continue their leadership development through age 20 while pursuing postsecondary education or training."
      >
        <CTARow>
          <CTA to="/interest" variant="gold">
            Join the Alumni Interest List
          </CTA>
          <CTA to="/schedule-a-call" variant="outline-light">
            Schedule a Call
          </CTA>
        </CTARow>
      </PageHero>
      <SubNav links={YOUTH_SUBNAV} />

      <Section>
        <SectionHead
          eyebrow="Eligibility"
          title="Who Can Continue Through Age 20"
          lead="Continued participation is available to alumni who meet all of the following requirements."
        />
        <div className="mt-8">
          <Bullets
            columns={2}
            items={[
              "Previously participated in Strong Minds",
              "Enrolled in an approved college or university",
              "Or enrolled in a trade program, apprenticeship, or certification program",
              "Or enrolled in another approved post-secondary education or training program",
              "Approved by the Founder",
            ]}
          />
        </div>
        <div className="mt-8">
          <Note>
            Alumni participation is individualized. Schedules, expectations, and commitments are
            agreed upon before the program year begins.
          </Note>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="Focus areas" title="What Alumni Fellows Do" />
        <Grid className="mt-8" cols={2}>
          <InfoCard title="Advanced projects">
            Longer-horizon work that stretches research, design, communication, and delivery skills.
          </InfoCard>
          <InfoCard title="Entrepreneurship">
            Business modeling, branding, pitching, financial literacy, and launching real ventures.
          </InfoCard>
          <InfoCard title="Senior mentoring roles">
            Alumni support younger fellows as near-peer leaders under staff supervision.
          </InfoCard>
          <InfoCard title="Community service">
            Service projects that connect leadership to visible community impact.
          </InfoCard>
          <InfoCard title="Career development">
            Résumés, interviewing, professional communication, networking, and workplace readiness.
          </InfoCard>
          <InfoCard title="Postsecondary planning">
            Navigating college, trade, apprenticeship, and certification pathways with support.
          </InfoCard>
        </Grid>
      </Section>
    </>
  );
}