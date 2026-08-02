import { createFileRoute } from "@tanstack/react-router";
import {
  Bullets,
  CTA,
  CTARow,
  Note,
  PageHero,
  Section,
  SectionHead,
  SubNav,
} from "@/components/site/kit";
import { FAMILY_SUBNAV } from "@/components/site/nav-sets";

const DESC =
  "Parent Night Off gives caregivers a supervised evening of rest while young people enjoy a structured Strong Minds experience. Held twice during the program year.";

export const Route = createFileRoute("/parent-night-off")({
  head: () => ({
    meta: [
      { title: "Parent Night Off | Strong Minds Families" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Parent Night Off" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/parent-night-off" },
    ],
    links: [{ rel: "canonical", href: "/parent-night-off" }],
  }),
  component: ParentNightOff,
});

function ParentNightOff() {
  return (
    <>
      <PageHero
        eyebrow="Strong Minds Families"
        title="Parent Night Off"
        subtitle="Two evenings during the program year when caregivers get time to rest and young people get a supervised, structured, and genuinely fun Strong Minds experience."
      >
        <CTARow>
          <CTA to="/family-registration" variant="gold">
            Register for Parent Night Off
          </CTA>
          <CTA to="/events" variant="outline-light">
            View Dates
          </CTA>
        </CTARow>
      </PageHero>
      <SubNav links={FAMILY_SUBNAV} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow="For caregivers"
              title="Rest is part of the plan"
              lead="Caregiving is constant work. Parent Night Off is Strong Minds saying plainly: take the evening. Your young person is with people who know them."
            />
          </div>
          <div>
            <p className="eyebrow mb-4">While you are away, students enjoy</p>
            <Bullets
              items={[
                "Supervised group activities led by Strong Minds staff",
                "Games, teamwork challenges, and creative time",
                "Community-building with their peers",
                "A meal or snacks",
                "A clear start and end time",
              ]}
            />
          </div>
        </div>
        <div className="mt-10 max-w-3xl">
          <Note>
            Parent Night Off is held twice during the 11-month program year. Dates, locations, and
            registration details are announced in advance to enrolled families.
          </Note>
        </div>
      </Section>
    </>
  );
}