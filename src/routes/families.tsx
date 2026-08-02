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
import { FAMILY_SUBNAV } from "@/components/site/nav-sets";
import { EventsPreview } from "@/components/site/EventsPreview";
import familiesImage from "@/assets/families.jpg";

const DESC =
  "Strong Minds Families supports parents and caregivers with workshops, family events, resources, and community — because strong families build strong young people.";

export const Route = createFileRoute("/families")({
  head: () => ({
    meta: [
      { title: "Strong Minds Families | Support for Parents & Caregivers" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Strong Minds Families" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/families" },
    ],
    links: [{ rel: "canonical", href: "/families" }],
  }),
  component: Families,
});

function Families() {
  return (
    <>
      <PageHero
        eyebrow="Strong Minds Families"
        title="Strengthening Families and Communities"
        subtitle="Parents and caregivers are partners in this work. Strong Minds Families offers workshops, events, and shared community for the adults raising our young people."
        image={familiesImage}
        imageAlt="Families gathered at a community event"
      >
        <CTARow>
          <CTA to="/family-registration" variant="gold">
            Register for a Family Event
          </CTA>
          <CTA to="/parent-night-off" variant="outline-light">
            Parent Night Off
          </CTA>
          <CTA to="/interest" variant="outline-light">
            Join the Family Interest List
          </CTA>
        </CTARow>
      </PageHero>
      <SubNav links={FAMILY_SUBNAV} />

      <Section>
        <SectionHead eyebrow="Offerings" title="What Strong Minds Families Provides" />
        <Grid className="mt-8">
          <InfoCard title="Parent and caregiver workshops">
            Practical sessions on communication, structure and routines, executive functioning,
            emotional intelligence, and supporting learning at home.
          </InfoCard>
          <InfoCard title="Family events and celebrations">
            Showcases, community gatherings, and celebrations that bring families together around
            student growth.
          </InfoCard>
          <InfoCard title="Parent Night Off">
            Supervised evenings for young people so caregivers get intentional time to rest and
            reset. Held twice during the program year.
          </InfoCard>
          <InfoCard title="Resources and guidance">
            Tools, guides, and recommendations families can use immediately at home.
          </InfoCard>
          <InfoCard title="Community connection">
            A network of families walking a similar path, with shared language and support.
          </InfoCard>
          <InfoCard title="Ongoing communication">
            Regular updates from the Strong Minds team about student progress and upcoming events.
          </InfoCard>
        </Grid>
      </Section>

      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHead
            eyebrow="Partnership"
            title="What Families Can Expect"
            lead="Strong Minds works alongside families, not around them. Communication is direct, expectations are clear, and caregivers are invited into the program year."
          />
          <Bullets
            items={[
              "Clear expectations shared before the program year begins",
              "Regular communication about student engagement",
              "Invitations to showcases and celebrations",
              "Workshops built around real family questions",
              "A direct line to the Strong Minds team",
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Upcoming" title="Family Events" />
        <div className="mt-8">
          <EventsPreview />
        </div>
        <CTARow className="mt-10">
          <CTA to="/family-registration" variant="gold">
            Register for a Family Event
          </CTA>
          <CTA to="/events" variant="outline">
            View All Events
          </CTA>
        </CTARow>
      </Section>
    </>
  );
}