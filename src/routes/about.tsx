import { createFileRoute } from "@tanstack/react-router";
import { CTA, CTARow, Grid, InfoCard, PageHero, Section, SectionHead } from "@/components/site/kit";
import { TAGLINE } from "@/lib/site-content";

const DESC =
  "Strong Minds Leadership Academy prepares young people, equips the adults who serve them, and strengthens families and communities.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Strong Minds Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "About Strong Minds Leadership Academy" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About" title="Strong Minds Leadership Academy" subtitle={TAGLINE} />
      <Section>
        <SectionHead
          eyebrow="Mission"
          title="Preparing young people. Equipping adults. Strengthening communities."
          lead="Strong Minds builds structured, affirming, purpose-driven learning environments where young people are known, challenged, and supported — and where the adults around them have the training and community they need to sustain the work."
        />
      </Section>
      <Section tone="sand">
        <SectionHead eyebrow="Divisions" title="One Academy, Four Divisions" />
        <Grid className="mt-8" cols={2}>
          <InfoCard
            title="SMYLA — Youth Leadership Academy"
            footer={<CTA to="/youth-academy" variant="ink">Explore SMYLA</CTA>}
          >
            Leadership, mentorship, academics, and enrichment for students ages 8–18, with alumni
            pathways through age 20.
          </InfoCard>
          <InfoCard
            title="SMILE — Institute for Leadership & Education"
            footer={<CTA to="/smile" variant="ink">Explore SMILE</CTA>}
          >
            Training, coaching, and program design for educators, mentors, youth workers, and
            organizations.
          </InfoCard>
          <InfoCard
            title="SMLA-F — Strong Minds Families"
            footer={<CTA to="/families" variant="ink">Explore Families</CTA>}
          >
            Workshops, events, resources, and community for parents and caregivers.
          </InfoCard>
          <InfoCard
            title="SMMLA — Mentor Leadership Academy"
            footer={<CTA to="/mentors" variant="ink">Explore Mentoring</CTA>}
          >
            Recruiting, training, and supporting the mentors who meet weekly with our fellows.
          </InfoCard>
        </Grid>
      </Section>
      <Section tone="ink">
        <SectionHead light eyebrow="Get involved" title="There Is a Place for You Here" />
        <CTARow className="mt-8">
          <CTA to="/enroll" variant="gold">Enroll a Student</CTA>
          <CTA to="/mentor-interest" variant="outline-light">Become a Mentor</CTA>
          <CTA to="/partnerships" variant="outline-light">Partner With Us</CTA>
        </CTARow>
      </Section>
    </>
  );
}