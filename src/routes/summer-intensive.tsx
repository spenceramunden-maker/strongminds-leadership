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
  "The Strong Minds Summer Intensive is a concentrated seasonal leadership and learning experience combining literacy, mathematics, leadership, creativity, and executive-function development.";

export const Route = createFileRoute("/summer-intensive")({
  head: () => ({
    meta: [
      { title: "Strong Minds Summer Intensive | Seasonal Leadership & Learning" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Strong Minds Summer Intensive" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/summer-intensive" },
    ],
    links: [{ rel: "canonical", href: "/summer-intensive" }],
  }),
  component: SummerIntensive,
});

function SummerIntensive() {
  return (
    <>
      <PageHero
        eyebrow="Youth Academy"
        title="Strong Minds Summer Intensive"
        subtitle="The Strong Minds Summer Intensive is a concentrated seasonal leadership and learning experience combining literacy, mathematics, leadership, creativity, relationship-building, executive-function development, and engaging virtual and in-person experiences."
      >
        <CTARow>
          <CTA to="/interest" variant="gold">
            Join the Summer Interest List
          </CTA>
          <CTA to="/enroll" variant="gold">
            Enroll a Student
          </CTA>
          <CTA to="/pricing" variant="outline-light">
            Request Summer Pricing
          </CTA>
          <CTA to="/schedule-a-call" variant="outline-light">
            Schedule a Call
          </CTA>
        </CTARow>
      </PageHero>
      <SubNav links={YOUTH_SUBNAV} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow="Program overview"
              title="A focused season of growth"
              lead="The Summer Intensive gives students a structured, engaging summer that protects academic momentum while building leadership, creativity, and relationships. Students work in small groups, take on real projects, and finish the season with visible growth."
            />
          </div>
          <div>
            <p className="eyebrow mb-4">Intended student experience</p>
            <Bullets
              items={[
                "Feel known by adults and peers from the first week",
                "Build daily habits for focus, planning, and follow-through",
                "Strengthen reading, writing, and mathematical reasoning",
                "Create and present something they are proud of",
                "Leave the summer more confident than they arrived",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="What students do" title="Academics, Leadership, and Community" />
        <Grid className="mt-8">
          <InfoCard title="Academic development">
            Literacy and mathematics work built around close reading, discussion, writing, story
            problems, and strategic thinking. Students practice explaining their reasoning, not just
            producing answers.
          </InfoCard>
          <InfoCard title="Leadership and enrichment">
            Leadership practice, creative expression, executive-function routines, goal setting, and
            enrichment sessions that connect learning to student interests.
          </InfoCard>
          <InfoCard title="Community-building">
            Small-group belonging, shared norms, reflection circles, celebration of effort, and
            structured opportunities for students to support one another.
          </InfoCard>
        </Grid>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Schedule and format" title="General Schedule" />
            <div className="mt-6">
              <Bullets
                items={[
                  "Weekday sessions across the summer season",
                  "Blended virtual sessions with selected in-person experiences",
                  "Daily check-in, focused learning blocks, and a daily wrap-up",
                  "Small-group and independent work each day",
                  "Exact dates, hours, and locations announced before registration opens",
                ]}
              />
            </div>
          </div>
          <div>
            <SectionHead eyebrow="Cost" title="Pricing and Supported Tuition" />
            <div className="mt-6 space-y-4">
              <InfoCard title="Founding Family Tuition — $349 per student">
                Two-payment plan available: a first payment of $175 and a remaining payment of $174.
                A $25 seat reservation holds a spot and is applied toward tuition.
              </InfoCard>
              <InfoCard title="Supported Tuition — starting at $199">
                Limited supported-tuition opportunities may begin at $199 depending on funding and
                capacity.
              </InfoCard>
              <Note>These are proposed launch prices and may be adjusted before registration opens.</Note>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <p className="eyebrow mb-4">Referral program</p>
            <h3 className="text-2xl text-ink-foreground">Give $19.99. Get $25.</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              When a current Strong Minds family refers a new family that completes paid enrollment.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-4">Enrollment pathway</p>
            <Bullets
              light
              items={[
                "Submit the Youth Program Interest Form",
                "Receive program details and pricing",
                "Attend an information session or scheduled call",
                "Reserve a seat",
                "Complete enrollment and payment plan",
              ]}
            />
          </div>
          <div>
            <p className="eyebrow mb-4">Information sessions</p>
            <p className="text-sm leading-relaxed text-ink-muted">
              Live sessions walk families through the summer schedule, expectations, supported
              tuition, and questions. Register and we will send the details as dates are confirmed.
            </p>
            <CTARow className="mt-6">
              <CTA to="/information-session" variant="gold">
                Register for a Session
              </CTA>
            </CTARow>
          </div>
        </div>
      </Section>
    </>
  );
}