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
  "The Strong Minds 11-Month Leadership Fellowship is a structured virtual leadership experience for students ages 8–18, with continued opportunities for eligible alumni through age 20.";

export const Route = createFileRoute("/fellowship")({
  head: () => ({
    meta: [
      { title: "11-Month Leadership Fellowship | Strong Minds Youth Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Strong Minds 11-Month Leadership Fellowship" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/fellowship" },
    ],
    links: [{ rel: "canonical", href: "/fellowship" }],
  }),
  component: Fellowship,
});

const COMPONENTS = [
  ["Academic Development", "Literacy, mathematics, strategic thinking, and school success."],
  ["Enrichment", "Creative, cultural, and interest-driven learning experiences."],
  ["Brotherhood", "Belonging, shared norms, accountability, and peer support."],
  ["PASE", "Purpose, Awareness, and Self-Empowerment."],
  ["Entrepreneurship", "From idea to plan, brand, presentation, and launch."],
  ["Social Skills", "Communication, collaboration, and conflict navigation."],
  ["Emotional Intelligence", "Self-awareness, regulation, and empathy in practice."],
  ["Executive Functioning", "Planning, organization, task initiation, and follow-through."],
  ["Mentorship", "A weekly scheduled meeting with a trained Strong Minds mentor."],
  ["Leadership", "Responsibility, initiative, service, and leading self and others."],
];

const JOURNEY = [
  "Arrive and Check In",
  "Reflect and Reset",
  "Plan the Afternoon",
  "Complete Academic Work",
  "Join Live Learning",
  "Work in Learning Labs",
  "Connect With a Mentor",
  "Complete the Session",
];

function Fellowship() {
  return (
    <>
      <PageHero
        eyebrow="Youth Academy"
        title="Strong Minds 11-Month Leadership Fellowship"
        subtitle="A structured virtual leadership experience for students ages 8–18, with continued opportunities for eligible alumni through age 20."
      >
        <CTARow>
          <CTA to="/interest" variant="gold">
            Join the Fellowship Interest List
          </CTA>
          <CTA to="/information-session" variant="outline-light">
            Attend an Information Session
          </CTA>
          <CTA to="/pricing" variant="outline-light">
            Request Fellowship Pricing
          </CTA>
          <CTA to="/schedule-a-call" variant="outline-light">
            Schedule a Call
          </CTA>
        </CTARow>
      </PageHero>
      <SubNav links={YOUTH_SUBNAV} />

      <Section>
        <SectionHead
          eyebrow="Program overview"
          title="A full year of structure, mentorship, and momentum"
          lead={
            <>
              <p>
                The Strong Minds 11-Month Leadership Fellowship combines structured after-school
                engagement, mentorship, leadership development, academic support, executive-function
                coaching, personal development, entrepreneurship, enrichment, and project-based
                Learning Labs.
              </p>
              <p>
                Fellows participate virtually Monday through Thursday and attend selected Saturday
                experiences throughout the year.
              </p>
            </>
          }
        />
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="Program components" title="Ten Connected Components" />
        <Grid className="mt-8" cols={2}>
          {COMPONENTS.map(([title, body]) => (
            <InfoCard key={title} title={title}>
              {body}
            </InfoCard>
          ))}
        </Grid>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Format" title="How the Week Works" />
            <div className="mt-6">
              <Bullets
                items={[
                  "Monday through Thursday",
                  "Virtual after-school programming",
                  "Program generally concludes by 7:00 PM",
                  "Start time may vary by student schedule and placement",
                  "One scheduled mentor meeting each week",
                  "One required in-person Saturday experience each month",
                  "One optional Saturday experience every other month",
                  "Two Parent Night Off events during the program year",
                  "Personalized schedules based on age, placement, assignments, Learning Labs, mentor day, and student needs",
                ]}
              />
            </div>
            <div className="mt-6">
              <Note>Students do not attend every Saturday.</Note>
            </div>
          </div>
          <div>
            <SectionHead eyebrow="Structured engagement" title="This Is Not a Drop-In Zoom Program" />
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>Students do not simply attend one online lesson and disappear.</p>
              <p>During program hours, fellows participate in structured combinations of:</p>
            </div>
            <div className="mt-4">
              <Bullets
                columns={2}
                items={[
                  "Daily check-in",
                  "Guided reflection",
                  "Mindful Minute",
                  "Daily planning",
                  "Schoolwork",
                  "Academic support",
                  "Live instruction",
                  "Learning Labs",
                  "Independent activities",
                  "Collaborative group work",
                  "Assignments",
                  "Weekly mentor meetings",
                  "Responsive adult support",
                  "Daily wrap-up",
                ]}
              />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Every fellow remains engaged during program hours, but each fellow&apos;s daily pathway
              may be different.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <SectionHead light eyebrow="Student journey" title="A Day in the Fellowship" />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map((step, i) => (
            <li
              key={step}
              className="rounded-lg border border-ink-foreground/15 bg-ink-foreground/5 p-5"
            >
              <span className="font-display text-3xl font-extrabold text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 font-display text-base font-bold text-ink-foreground">{step}</p>
            </li>
          ))}
        </ol>
        <CTARow className="mt-10">
          <CTA to="/interest" variant="gold">
            Join the Fellowship Interest List
          </CTA>
          <CTA to="/enroll" variant="outline-light">
            Enroll a Student
          </CTA>
        </CTARow>
      </Section>
    </>
  );
}