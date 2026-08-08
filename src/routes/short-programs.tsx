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
  "Short-term Strong Minds Youth Academy experiences: the 10 Day Sprint, the Winning Week training, a 1-Day Trial, and the Weekend Warrior in-person access pass.";

export const Route = createFileRoute("/short-programs")({
  head: () => ({
    meta: [
      { title: "Short-Term Programs | Strong Minds Youth Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Short-Term Strong Minds Experiences" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/short-programs" },
    ],
    links: [{ rel: "canonical", href: "/short-programs" }],
  }),
  component: ShortPrograms,
});

const OFFERINGS = [
  {
    title: "10 Day Sprint",
    tag: "Two weeks of focused momentum",
    body: "A fast, high-structure introduction to the Strong Minds model. Ten consecutive program days of leadership practice, executive-function coaching, academic focus, and a short applied project students present at the end.",
    points: [
      "Ten structured program days",
      "Daily check-in, planning, and reflection",
      "One applied project with a closing presentation",
      "Best for families testing a full program commitment",
    ],
  },
  {
    title: "Winning Week",
    tag: "One-week training intensive",
    body: "A one-week training experience built around a single leadership theme. Students work in a small group all week, build one skill deeply, and leave with a personal plan they can use immediately at school and at home.",
    points: [
      "Five consecutive training days",
      "One theme, taught to mastery",
      "Small-group instruction and daily practice",
      "Personal action plan sent home at the end of the week",
    ],
  },
  {
    title: "1-Day Trial",
    tag: "See a real program day",
    body: "A single full program day inside a live Strong Minds session. Students experience the routine, the expectations, and the culture, and families receive a short observation summary afterward.",
    points: [
      "One live program day",
      "Full daily routine, not a demo",
      "Written family summary after the session",
      "Credited toward enrollment when a student continues",
    ],
  },
  {
    title: "Weekend Warrior",
    tag: "In-person access pass",
    body: "An access pass to Strong Minds in-person Saturday experiences without full program membership. Ideal for families who want the community, service, and leadership events without a year-long commitment.",
    points: [
      "Access to scheduled in-person weekend experiences",
      "Leadership, service, and community-building focus",
      "No full program membership required",
      "Space is limited and released by event",
    ],
  },
];

function ShortPrograms() {
  return (
    <>
      <PageHero
        eyebrow="Youth Academy"
        title="Short-Term Programs"
        subtitle="Shorter entry points into Strong Minds for families who want structure now, or want to try the model before committing to a full program year."
      >
        <CTARow>
          <CTA to="/interest" variant="gold">
            Join the Interest List
          </CTA>
          <CTA to="/schedule-a-call" variant="outline-light">
            Schedule a Call
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
          title="Four ways to start without a full-year commitment"
          lead="Every short-term offering uses the same structure, mentorship, and expectations as our longer programs. The difference is length, not seriousness."
        />
      </Section>

      <Section tone="sand">
        <Grid cols={2}>
          {OFFERINGS.map((o) => (
            <InfoCard key={o.title} title={o.title}>
              <span className="eyebrow block">{o.tag}</span>
              <p className="mt-3">{o.body}</p>
              <div className="mt-4">
                <Bullets items={o.points} />
              </div>
            </InfoCard>
          ))}
        </Grid>
        <div className="mt-8">
          <Note>
            Dates, cohort size, and placement vary by season. Join an interest list and we will send
            the current calendar for each short-term offering.
          </Note>
        </div>
      </Section>

      <Section tone="ink">
        <SectionHead
          light
          eyebrow="Next step"
          title="Not sure which length fits your student?"
          lead="Schedule a call and we will recommend the right entry point based on age, schedule, and what your family is trying to solve this season."
        />
        <CTARow className="mt-8">
          <CTA to="/schedule-a-call" variant="gold">
            Schedule a Call
          </CTA>
          <CTA to="/enroll" variant="outline-light">
            Enroll a Student
          </CTA>
        </CTARow>
      </Section>
    </>
  );
}