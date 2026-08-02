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
import { YOUTH_SUBNAV } from "@/components/site/nav-sets";

const DESC =
  "Strong Minds Learning Labs are the major areas of study and applied learning: PASE, Entrepreneurship, Academic Development, and Differentiated Enrichment.";

export const Route = createFileRoute("/learning-labs")({
  head: () => ({
    meta: [
      { title: "Learning Labs | Strong Minds Youth Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Strong Minds Learning Labs" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/learning-labs" },
    ],
    links: [{ rel: "canonical", href: "/learning-labs" }],
  }),
  component: LearningLabs,
});

function LearningLabs() {
  return (
    <>
      <PageHero
        eyebrow="Youth Academy"
        title="Learning Labs"
        subtitle="Learning Labs are the major areas of study and applied learning within Strong Minds. Fellows rotate through labs based on age, placement, and personal goals."
      >
        <CTARow>
          <CTA to="/enroll" variant="gold">
            Enroll a Student
          </CTA>
          <CTA to="/interest" variant="outline-light">
            Join the Interest List
          </CTA>
        </CTARow>
      </PageHero>
      <SubNav links={YOUTH_SUBNAV} />

      <Section>
        <SectionHead eyebrow="The four labs" title="Where Learning Becomes Practice" />
        <Grid className="mt-8" cols={2}>
          <InfoCard title="PASE Lab — Purpose, Awareness, and Self-Empowerment">
            Identity, values, purpose, self-awareness, decision-making, and personal ownership.
            Students learn to name who they are and what they stand for.
          </InfoCard>
          <InfoCard title="Entrepreneurship Lab">
            Idea generation, problem solving, business modeling, branding, budgeting, pitching, and
            bringing a venture to life.
          </InfoCard>
          <InfoCard title="Academic Development Lab">
            Literacy, mathematics, study strategy, executive functioning, and support with current
            school coursework.
          </InfoCard>
          <InfoCard title="Differentiated Enrichment Lab">
            Interest-driven learning: technology, media, arts, culture, athletics-adjacent
            leadership, and other enrichment aligned to student strengths.
          </InfoCard>
        </Grid>
      </Section>

      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHead
            eyebrow="How labs work"
            title="Project-based, collaborative, and personalized"
            lead="Labs run during program hours. Fellows work individually and in small groups, produce real artifacts, and present their work to peers, mentors, and families at showcases across the year."
          />
          <Bullets
            items={[
              "Assigned by age, placement, and student goals",
              "Guided by staff and supported by mentors",
              "Project-based with clear deliverables",
              "Reflection built into every cycle",
              "Work is shared at Saturday showcases",
            ]}
          />
        </div>
      </Section>
    </>
  );
}