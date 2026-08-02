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
import { SMILE_SUBNAV } from "@/components/site/nav-sets";
import smileImage from "@/assets/smile-training.jpg";

const DESC =
  "SMILE — Strong Minds Institute for Leadership & Education equips educators, mentors, youth workers, families, and organizations with practical training and coaching.";

export const Route = createFileRoute("/smile")({
  head: () => ({
    meta: [
      { title: "SMILE | Strong Minds Institute for Leadership & Education" },
      { name: "description", content: DESC },
      { property: "og:title", content: "SMILE — Strong Minds Institute for Leadership & Education" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/smile" },
    ],
    links: [{ rel: "canonical", href: "/smile" }],
  }),
  component: Smile,
});

function Smile() {
  return (
    <>
      <PageHero
        eyebrow="SMILE"
        title="Strong Minds Institute for Leadership & Education"
        subtitle="Equipping the adults who serve young people — educators, mentors, youth workers, coaches, families, schools, and organizations."
        image={smileImage}
        imageAlt="Adults participating in a professional learning workshop"
      >
        <CTARow>
          <CTA to="/smile-workshops" variant="gold">
            Explore Workshops & Training
          </CTA>
          <CTA to="/partnerships" variant="outline-light">
            Request a Partnership
          </CTA>
          <CTA to="/schedule-a-call" variant="outline-light">
            Schedule a Consultation
          </CTA>
        </CTARow>
      </PageHero>
      <SubNav links={SMILE_SUBNAV} />

      <Section>
        <SectionHead
          eyebrow="Overview"
          title="Young people thrive when the adults around them are equipped"
          lead="SMILE delivers practical, research-informed learning experiences that help adults build stronger relationships, stronger systems, and stronger outcomes for the young people in their care."
        />
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="Audiences" title="Who SMILE Serves" />
        <Grid className="mt-8" cols={3}>
          <InfoCard title="Educators and school teams">
            Teachers, counselors, deans, and leadership teams seeking practical strategies for
            engagement, culture, and student support.
          </InfoCard>
          <InfoCard title="Mentors and youth workers">
            Program staff, coaches, and volunteers who need frameworks for consistent, high-impact
            mentoring relationships.
          </InfoCard>
          <InfoCard title="Families and caregivers">
            Parents and caregivers who want tools for communication, structure, and supporting their
            young person at home.
          </InfoCard>
          <InfoCard title="Nonprofits and community organizations">
            Organizations building or strengthening youth programming and staff capacity.
          </InfoCard>
          <InfoCard title="Faith and civic groups">
            Groups serving young people who want shared language and practical skills.
          </InfoCard>
          <InfoCard title="Districts and agencies">
            Larger systems seeking sustained professional learning and implementation support.
          </InfoCard>
        </Grid>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Services" title="What SMILE Provides" />
            <div className="mt-6">
              <Bullets
                items={[
                  "Professional development workshops",
                  "Webinars and virtual learning series",
                  "Multi-session training cohorts",
                  "Coaching for staff and leaders",
                  "Program design and implementation support",
                  "Speaking engagements and keynotes",
                  "Custom organizational partnerships",
                ]}
              />
            </div>
          </div>
          <div>
            <SectionHead eyebrow="Topics" title="Core Training Topics" />
            <div className="mt-6">
              <Bullets
                columns={2}
                items={[
                  "Youth leadership development",
                  "Mentorship structures that last",
                  "Executive functioning",
                  "Emotional intelligence",
                  "Culturally responsive practice",
                  "Engaging Black and Brown boys",
                  "Relationship-centered classrooms",
                  "Family engagement",
                  "Restorative and reflective practice",
                  "Program design and evaluation",
                ]}
              />
            </div>
          </div>
        </div>
        <CTARow className="mt-10">
          <CTA to="/smile-workshops" variant="ink">
            View Workshops & Training
          </CTA>
          <CTA to="/partnerships" variant="outline">
            Start a Partnership Conversation
          </CTA>
        </CTARow>
      </Section>
    </>
  );
}