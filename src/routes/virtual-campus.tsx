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
  "The Strong Minds Virtual Campus is the online home for fellows: daily check-in, schedule, Learning Labs, assignments, mentor meetings, and reflection.";

export const Route = createFileRoute("/virtual-campus")({
  head: () => ({
    meta: [
      { title: "Strong Minds Virtual Campus | Structured Online Learning Home" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Strong Minds Virtual Campus" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/virtual-campus" },
    ],
    links: [{ rel: "canonical", href: "/virtual-campus" }],
  }),
  component: VirtualCampus,
});

const AREAS = [
  { title: "Daily Check-In", body: "Fellows mark their arrival, set a tone for the day, and let staff know how they are showing up." },
  { title: "Reflection Space", body: "Guided prompts and the Mindful Minute help fellows reset before learning begins." },
  { title: "My Schedule", body: "Each fellow sees their personalized pathway for the day, including labs and mentor day." },
  { title: "Assignments", body: "Schoolwork and Strong Minds assignments in one place with clear due dates." },
  { title: "Learning Labs", body: "Lab materials, projects, and collaborative group workspaces." },
  { title: "Live Sessions", body: "Entry points for live instruction and group learning during program hours." },
  { title: "Mentor Meeting", body: "The weekly meeting space with a trained Strong Minds mentor." },
  { title: "Resources", body: "Tools, guides, templates, and support materials for fellows and families." },
  { title: "Announcements", body: "Program updates, Saturday experience details, and celebration news." },
];

function VirtualCampus() {
  return (
    <>
      <PageHero
        eyebrow="Youth Academy"
        title="The Strong Minds Virtual Campus"
        subtitle="A structured online home where fellows check in, plan their day, learn, work, meet their mentor, and reflect. Not a link to a meeting — a place to belong."
      >
        <CTARow>
          <CTA to="/virtual-campus-login" variant="gold">
            Virtual Campus Login
          </CTA>
          <CTA to="/enroll" variant="outline-light">
            Enroll a Student
          </CTA>
        </CTARow>
      </PageHero>
      <SubNav links={YOUTH_SUBNAV} />

      <Section>
        <SectionHead eyebrow="Inside the campus" title="What Fellows Find Each Day" />
        <Grid className="mt-8" cols={3}>
          {AREAS.map((area) => (
            <InfoCard key={area.title} title={area.title}>
              {area.body}
            </InfoCard>
          ))}
        </Grid>
      </Section>

      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHead
            eyebrow="Why it matters"
            title="Structure creates freedom"
            lead="Because the campus holds the routine, adults can spend their attention on relationships and coaching instead of logistics. Fellows always know where to go, what is expected, and who is there for them."
          />
          <div>
            <Bullets
              items={[
                "Consistent daily rhythm from check-in to wrap-up",
                "Personalized pathways rather than one-size-fits-all sessions",
                "Visible progress fellows and families can track",
                "Responsive adult support during program hours",
                "A single place for schedules, work, and announcements",
              ]}
            />
            <div className="mt-6">
              <Note>
                Campus access is provided to enrolled fellows and their families after enrollment is
                complete.
              </Note>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}