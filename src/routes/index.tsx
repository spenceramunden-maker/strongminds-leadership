import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-youth-leadership.jpg";
import smileImage from "@/assets/smile-training.jpg";
import familiesImage from "@/assets/families.jpg";
import mentorImage from "@/assets/mentorship.jpg";
import { Bullets, CTA, CTARow, InfoCard, Section, SectionHead } from "@/components/site/kit";
import { EventsPreview } from "@/components/site/EventsPreview";

const DESCRIPTION =
  "Strong Minds Leadership Academy develops young leaders, equips the adults who serve them, strengthens families, and partners with schools and youth-serving organizations.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Strong Minds Leadership Academy | Youth Leadership, SMILE & Families" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Strong Minds Leadership Academy" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const PATHWAYS = [
  {
    title: "Strong Minds Youth Leadership Academy",
    body: "Leadership development, academic enrichment, mentorship, entrepreneurship, executive-function support, brotherhood, personal growth, and real-world learning for students ages 8–18.",
    cta: "Explore Youth Programs",
    to: "/youth-academy",
    weight: "lg:col-span-7",
    tag: "SMYLA",
  },
  {
    title: "Strong Minds Institute of Leadership in Education",
    body: "Professional learning, consulting, coaching, and practical training for educators, youth workers, schools, community organizations, afterschool programs, nonprofits, and agencies.",
    cta: "Explore SMILE",
    to: "/smile",
    weight: "lg:col-span-5",
    tag: "SMILE",
  },
  {
    title: "Strong Minds Families",
    body: "Workshops, events, Parent Night Off, workforce development, community support, and practical resources for parents and caregivers.",
    cta: "Explore Family Programs",
    to: "/families",
    weight: "lg:col-span-6",
    tag: "SMLA-F",
  },
  {
    title: "Strong Minds Mentor Leadership Academy",
    body: "Recruitment, preparation, training, resources, and ongoing support for adults committed to mentoring and developing young people.",
    cta: "Become a Mentor",
    to: "/mentors",
    weight: "lg:col-span-6",
    tag: "SMMLA",
  },
];

function Index() {
  return (
    <>
      <section className="ink-panel">
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow mb-4">Strong Minds Leadership Academy</p>
            <h1 className="text-4xl leading-[1.02] text-ink-foreground sm:text-5xl lg:text-6xl">
              Strong Minds Build Strong Futures
            </h1>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted md:text-lg">
              <p>
                Strong Minds Leadership Academy develops young leaders, equips the adults who serve
                them, strengthens families, and helps schools and youth-serving organizations create
                more meaningful experiences for young people.
              </p>
              <p>
                Our flagship Youth Leadership Academy provides structured leadership development,
                mentorship, academic support, entrepreneurship, executive-function coaching,
                personal growth, and community-centered learning for students ages 8–18.
              </p>
              <p className="text-sm">
                Eligible Strong Minds alumni may continue participating through age 20 while
                enrolled in an approved post-secondary education or training program.
              </p>
            </div>
            <CTARow className="mt-8">
              <CTA to="/youth-academy" variant="gold">
                Explore the Youth Academy
              </CTA>
              <CTA to="/enroll" variant="gold">
                Enroll a Student
              </CTA>
              <CTA to="/interest" variant="outline-light">
                Join the Interest List
              </CTA>
            </CTARow>
            <CTARow className="mt-3">
              <CTA to="/smile" variant="outline-light">
                Explore SMILE
              </CTA>
              <CTA to="/mentor-interest" variant="outline-light">
                Become a Mentor
              </CTA>
              <CTA to="/schedule-a-call" variant="outline-light">
                Schedule a Call
              </CTA>
            </CTARow>
          </div>
          <div className="overflow-hidden rounded-xl border border-ink-foreground/15">
            <img
              src={heroImage}
              alt="Young people collaborating around laptops while one student presents to the group"
              width={1600}
              height={1104}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <Section>
        <SectionHead
          eyebrow="Four connected divisions"
          title="Explore Strong Minds"
          lead="Strong Minds Leadership Academy serves young people, families, mentors, educators, youth workers, and organizations through connected programs built around leadership, relationships, learning, and purpose."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {PATHWAYS.map((p, i) => (
            <Link
              key={p.to}
              to={p.to as never}
              className={`group flex flex-col justify-between rounded-xl p-7 transition-transform hover:-translate-y-1 ${p.weight} ${
                i === 0 ? "ink-panel border border-ink-foreground/15" : "surface-card"
              }`}
            >
              <div>
                <p className="eyebrow mb-3">{p.tag}</p>
                <h3
                  className={`text-xl md:text-2xl ${i === 0 ? "text-ink-foreground" : "text-foreground"}`}
                >
                  {p.title}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed ${i === 0 ? "text-ink-muted" : "text-muted-foreground"}`}
                >
                  {p.body}
                </p>
              </div>
              <span
                className={`mt-6 inline-flex items-center gap-2 font-display text-sm font-bold ${
                  i === 0 ? "text-gold" : "text-foreground"
                }`}
              >
                {p.cta}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <div>
            <SectionHead
              eyebrow="Youth Leadership Academy"
              title="Leadership, Learning, Brotherhood, and Purpose"
              lead={
                <>
                  <p>
                    Strong Minds Youth Leadership Academy helps young people build the knowledge,
                    habits, relationships, confidence, and sense of purpose needed to lead
                    themselves and contribute to others.
                  </p>
                  <p>
                    Programs combine academic support, leadership development, mentorship,
                    executive-function coaching, entrepreneurship, personal reflection, emotional
                    intelligence, enrichment, and community-building.
                  </p>
                </>
              }
            />
            <CTARow className="mt-8">
              <CTA to="/youth-academy" variant="ink">
                Explore Youth Programs
              </CTA>
              <CTA to="/enroll" variant="gold">
                Enroll a Student
              </CTA>
              <CTA to="/pricing" variant="outline">
                Request Pricing
              </CTA>
            </CTARow>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <InfoCard
              title="Summer Intensive"
              footer={
                <CTA to="/summer-intensive" variant="outline">
                  Learn more
                </CTA>
              }
            >
              A concentrated seasonal leadership and learning experience combining literacy,
              mathematics, leadership, creativity, and relationship-building.
            </InfoCard>
            <InfoCard
              title="11-Month Leadership Fellowship"
              footer={
                <CTA to="/fellowship" variant="outline">
                  Learn more
                </CTA>
              }
            >
              Structured virtual after-school engagement Monday through Thursday, weekly mentor
              meetings, Learning Labs, and monthly Saturday experiences.
            </InfoCard>
            <InfoCard
              title="Alumni Fellowship"
              footer={
                <CTA to="/alumni-fellowship" variant="outline">
                  Learn more
                </CTA>
              }
            >
              Continued participation for eligible alumni ages 19–20 enrolled in approved
              post-secondary education or training.
            </InfoCard>
            <InfoCard title="Future Programs">
              Planned expansion into athletics and sports programming, debate, and gaming or esports
              as capacity grows.
            </InfoCard>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <SectionHead
            light
            eyebrow="SMYLA Virtual Campus"
            title="A Structured Virtual Campus"
            lead="Enrolled fellows participate through the Strong Minds Youth Leadership Academy Virtual Campus, a secure, laptop-centered learning environment designed to help students remain engaged, organized, supported, and connected throughout the program day."
          />
          <div>
            <p className="eyebrow mb-4">Students use the Virtual Campus to</p>
            <Bullets
              light
              columns={2}
              items={[
                "Complete daily check-ins",
                "Reflect on their day",
                "Organize priorities",
                "View personalized schedules",
                "Access Learning Labs",
                "Complete assignments",
                "Receive feedback",
                "Communicate with mentors",
                "Request support",
                "Track progress",
                "Open live-session links",
              ]}
            />
          </div>
        </div>
        <CTARow className="mt-10">
          <CTA to="/virtual-campus" variant="gold">
            Preview the Virtual Campus
          </CTA>
          <CTA to="/virtual-campus-login" variant="outline-light">
            Virtual Campus Login
          </CTA>
        </CTARow>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="overflow-hidden rounded-xl border border-border">
            <img
              src={smileImage}
              alt="Educators and youth workers in a professional development workshop"
              loading="lazy"
              width={1408}
              height={1008}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <SectionHead
              eyebrow="SMILE"
              title="Developing the Adults Who Develop Young People"
              lead="The Strong Minds Institute of Leadership in Education equips youth-facing professionals and organizations with practical tools for relationship building, leadership development, executive-function support, restorative practice, instructional delivery, youth engagement, and meaningful program implementation."
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Schools",
                "Community Organizations",
                "Youth Programs",
                "Educators and Paraprofessionals",
                "Mentors and Coaches",
                "Government and Municipal Partners",
              ].map((a) => (
                <span
                  key={a}
                  className="rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground"
                >
                  {a}
                </span>
              ))}
            </div>
            <CTARow className="mt-8">
              <CTA to="/smile" variant="ink">
                Explore SMILE
              </CTA>
              <CTA to="/partnerships" variant="outline">
                Request Organizational Training
              </CTA>
              <CTA to="/schedule-a-call" variant="outline">
                Schedule a Consultation
              </CTA>
            </CTARow>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHead
              eyebrow="Strong Minds Families"
              title="Strong Families Support Strong Minds"
              lead="Student growth is connected to family strength. Strong Minds Families provides practical support, learning, and community for parents and caregivers."
            />
            <div className="mt-6">
              <Bullets
                columns={2}
                items={[
                  "Family workshops",
                  "Family events",
                  "Parent Night Off",
                  "Workforce development",
                  "Resume support",
                  "Interview preparation",
                  "Community-building opportunities",
                ]}
              />
            </div>
            <CTARow className="mt-8">
              <CTA to="/families" variant="ink">
                Explore Family Programs
              </CTA>
            </CTARow>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <img
              src={familiesImage}
              alt="Parents and caregivers talking together at a community family workshop"
              loading="lazy"
              width={1408}
              height={1008}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="overflow-hidden rounded-xl border border-ink-foreground/15">
            <img
              src={mentorImage}
              alt="A mentor working alongside a young person at a laptop"
              loading="lazy"
              width={1408}
              height={1008}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <SectionHead
              light
              eyebrow="Mentor Leadership Academy"
              title="Become the Adult Every Young Person Deserves"
              lead={
                <>
                  <p>
                    Strong Minds Mentor Leadership Academy prepares and supports adults who want to
                    build meaningful, accountable, and growth-centered relationships with young
                    people.
                  </p>
                  <p>
                    Mentors receive training, resources, coaching, and access to the private Mentor
                    Resource Center.
                  </p>
                </>
              }
            />
            <CTARow className="mt-8">
              <CTA to="/mentor-interest" variant="gold">
                Become a Mentor
              </CTA>
            </CTARow>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Upcoming"
          title="Events, Information Sessions, and Workshops"
          lead="Filter by division or event type. Dates are announced as each session is confirmed."
        />
        <div className="mt-8">
          <EventsPreview limit={6} />
        </div>
        <CTARow className="mt-8">
          <CTA to="/events" variant="ink">
            View All Events
          </CTA>
        </CTARow>
      </Section>

      <Section tone="ink">
        <SectionHead center light title="Take the Next Step" />
        <CTARow className="mt-8 justify-center">
          <CTA to="/enroll" variant="gold">
            Enroll a Student
          </CTA>
          <CTA to="/mentor-interest" variant="outline-light">
            Become a Mentor
          </CTA>
          <CTA to="/partnerships" variant="outline-light">
            Request Training
          </CTA>
          <CTA to="/schedule-a-call" variant="outline-light">
            Schedule a Call
          </CTA>
        </CTARow>
      </Section>
    </>
  );
}