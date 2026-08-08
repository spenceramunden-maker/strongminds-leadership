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
import heroImage from "@/assets/hero-youth-leadership.jpg";

const DESC =
  "Strong Minds Youth Leadership Academy provides leadership, mentorship, academic enrichment, and executive-function support for students ages 8–18.";

export const Route = createFileRoute("/youth-academy")({
  head: () => ({
    meta: [
      { title: "Strong Minds Youth Leadership Academy | Programs for Ages 8–18" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Strong Minds Youth Leadership Academy" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/youth-academy" },
    ],
    links: [{ rel: "canonical", href: "/youth-academy" }],
  }),
  component: YouthAcademy,
});

function YouthAcademy() {
  return (
    <>
      <PageHero
        eyebrow="SMYLA"
        title="Strong Minds Youth Leadership Academy"
        subtitle="Leadership, learning, brotherhood, mentorship, and purpose."
        image={heroImage}
        imageAlt="Students collaborating in a leadership session"
      >
        <CTARow>
          <CTA to="/enroll" variant="gold">
            Enroll a Student
          </CTA>
          <CTA to="/interest" variant="outline-light">
            Join the Interest List
          </CTA>
          <CTA to="/schedule-a-call" variant="outline-light">
            Schedule a Call
          </CTA>
        </CTARow>
      </PageHero>
      <SubNav links={YOUTH_SUBNAV} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHead
              eyebrow="Overview"
              title="Structured programs for academic, social, emotional, and personal growth"
              lead={
                <>
                  <p>
                    Strong Minds Youth Leadership Academy provides structured programs that help
                    young people grow academically, socially, emotionally, and personally.
                  </p>
                  <p>
                    The Academy is designed with the experiences and needs of Black and Brown boys
                    in mind while remaining open to families seeking a structured, affirming, and
                    purpose-driven educational community.
                  </p>
                </>
              }
            />
          </div>
          <div>
            <p className="eyebrow mb-4">Students participate in</p>
            <Bullets
              columns={2}
              items={[
                "Leadership development",
                "Academic enrichment",
                "Mentorship",
                "Executive-function coaching",
                "Entrepreneurship",
                "Personal reflection",
                "Brotherhood and belonging",
                "Collaborative learning",
                "Community engagement",
                "Real-world projects",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="Eligibility" title="Who the Academy Serves" />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <InfoCard title="Primary ages: 8–18">
            Standard enrollment serves students ages 8 through 18 across the Summer Intensive and
            the 11-Month Leadership Fellowship.
          </InfoCard>
          <InfoCard title="Alumni through age 20">
            Eligible Strong Minds alumni may continue through age 20 when they previously
            participated in Strong Minds, are enrolled in an approved college, university, trade
            program, apprenticeship, certification program, or other post-secondary education or
            training program, and receive Founder approval.
          </InfoCard>
          <InfoCard title="Open to families seeking structure">
            Strong Minds welcomes families looking for a structured, affirming, purpose-driven
            learning community for their young person.
          </InfoCard>
        </div>
        <div className="mt-8">
          <Note>
            Program design, placement, and schedules are personalized. Final cohort structure varies
            by age, developmental level, and program year.
          </Note>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Programs" title="Choose the Right Pathway" />
        <Grid className="mt-8" cols={2}>
          <InfoCard
            title="Summer Intensive"
            footer={
              <CTA to="/summer-intensive" variant="ink">
                Explore the Summer Intensive
              </CTA>
            }
          >
            A concentrated seasonal leadership and learning experience combining literacy,
            mathematics, leadership, creativity, relationship-building, executive-function
            development, and engaging virtual and in-person experiences.
          </InfoCard>
          <InfoCard
            title="11-Month Leadership Fellowship"
            footer={
              <CTA to="/fellowship" variant="ink">
                Explore the Fellowship
              </CTA>
            }
          >
            Structured virtual after-school engagement Monday through Thursday, weekly mentor
            meetings, project-based Learning Labs, monthly in-person Saturday experiences, and two
            Parent Night Off events during the program year.
          </InfoCard>
          <InfoCard
            title="Short-Term Programs"
            footer={
              <CTA to="/short-programs" variant="ink">
                Explore Short-Term Programs
              </CTA>
            }
          >
            Shorter entry points into Strong Minds: the 10 Day Sprint, the one-week Winning Week
            training, a 1-Day Trial inside a live program day, and the Weekend Warrior access pass to
            in-person weekend experiences.
          </InfoCard>
          <InfoCard
            title="Cohort Programs"
            footer={
              <CTA to="/cohort-programs" variant="ink">
                Explore Cohort Programs
              </CTA>
            }
          >
            The one-month Minds-Ship, the three-month Enrichment Fellowship, and the semester-long
            Strong Semester afterschool training program.
          </InfoCard>
          <InfoCard
            title="Alumni Fellowship"
            footer={
              <CTA to="/alumni-fellowship" variant="ink">
                Explore the Alumni Fellowship
              </CTA>
            }
          >
            Advanced projects, entrepreneurship, senior mentoring, community service, career
            development, and postsecondary planning for eligible alumni ages 19–20.
          </InfoCard>
          <InfoCard
            title="Learning Labs"
            footer={
              <CTA to="/learning-labs" variant="ink">
                Explore Learning Labs
              </CTA>
            }
          >
            The major areas of study and applied learning within Strong Minds: PASE, Entrepreneurship,
            Academic Development, and Differentiated Enrichment.
          </InfoCard>
        </Grid>
      </Section>

      <Section tone="ink">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHead
            light
            eyebrow="Mentorship"
            title="Every fellow is known by an adult who shows up"
            lead="Fellows meet with a trained Strong Minds mentor each week. Mentors support goal setting, executive functioning, reflection, problem solving, and the everyday encouragement young people need to keep moving."
          />
          <div>
            <p className="eyebrow mb-4">Saturday Experiences</p>
            <Bullets
              light
              items={[
                "One required in-person Saturday experience each month",
                "One optional Saturday experience every other month",
                "Leadership, collaboration, service, and community-building focus",
                "Showcases and celebrations across the program year",
                "Strong Minds does not meet every Saturday",
              ]}
            />
          </div>
        </div>
        <CTARow className="mt-10">
          <CTA to="/enroll" variant="gold">
            Enroll a Student
          </CTA>
          <CTA to="/pricing" variant="outline-light">
            View Pricing
          </CTA>
          <CTA to="/information-session" variant="outline-light">
            Attend an Information Session
          </CTA>
        </CTARow>
      </Section>
    </>
  );
}