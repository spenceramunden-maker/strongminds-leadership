import { createFileRoute } from "@tanstack/react-router";
import { CTA, CTARow, Grid, InfoCard, Note, PageHero, Section, SectionHead } from "@/components/site/kit";

const DESC =
  "Strong Minds pricing: Founding Family Tuition, payment plans, seat reservations, supported tuition, and the family referral program.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing & Supported Tuition | Strong Minds Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Strong Minds Pricing & Supported Tuition" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: Pricing,
});

function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="Investment"
        title="Pricing & Supported Tuition"
        subtitle="Strong Minds is committed to keeping programs accessible for the families who need them most."
      >
        <CTARow>
          <CTA to="/enroll" variant="gold">
            Enroll a Student
          </CTA>
          <CTA to="/schedule-a-call" variant="outline-light">
            Ask About Supported Tuition
          </CTA>
        </CTARow>
      </PageHero>

      <Section>
        <SectionHead eyebrow="Summer Intensive" title="Founding Family Pricing" />
        <Grid className="mt-8">
          <InfoCard title="Founding Family Tuition — $349 per student">
            The launch rate for the Strong Minds Summer Intensive.
          </InfoCard>
          <InfoCard title="Two-payment plan">
            A first payment of $175 and a remaining payment of $174.
          </InfoCard>
          <InfoCard title="Seat reservation — $25">
            Holds a spot and is applied toward tuition.
          </InfoCard>
          <InfoCard title="Supported tuition — starting at $199">
            Limited supported-tuition opportunities depending on funding and capacity.
          </InfoCard>
          <InfoCard title="Referral program — Give $19.99, Get $25">
            When a current Strong Minds family refers a new family that completes paid enrollment.
          </InfoCard>
          <InfoCard title="Fellowship pricing">
            11-Month Leadership Fellowship pricing is shared during information sessions and calls.
          </InfoCard>
        </Grid>
        <div className="mt-8 max-w-3xl">
          <Note>
            These are proposed launch prices and may be adjusted before registration opens. No family
            is turned away without a conversation — reach out and we will talk through options.
          </Note>
        </div>
      </Section>
    </>
  );
}