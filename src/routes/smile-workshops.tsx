import { createFileRoute } from "@tanstack/react-router";
import { CTA, CTARow, Grid, InfoCard, PageHero, Section, SectionHead, SubNav } from "@/components/site/kit";
import { SMILE_SUBNAV } from "@/components/site/nav-sets";
import { EventsPreview } from "@/components/site/EventsPreview";
import { LeadForm } from "@/components/forms/LeadForm";

const DESC =
  "SMILE workshops, webinars, and training series for educators, mentors, youth workers, families, and organizations. Register or request a custom session.";

export const Route = createFileRoute("/smile-workshops")({
  head: () => ({
    meta: [
      { title: "Workshops & Training | SMILE by Strong Minds" },
      { name: "description", content: DESC },
      { property: "og:title", content: "SMILE Workshops & Training" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/smile-workshops" },
    ],
    links: [{ rel: "canonical", href: "/smile-workshops" }],
  }),
  component: SmileWorkshops,
});

function SmileWorkshops() {
  return (
    <>
      <PageHero
        eyebrow="SMILE"
        title="Workshops, Webinars & Training"
        subtitle="Single sessions, multi-part series, and custom training built for your team and your context."
      >
        <CTARow>
          <CTA to="/register" variant="gold">
            Register for a Session
          </CTA>
          <CTA to="/schedule-a-call" variant="outline-light">
            Request a Custom Training
          </CTA>
        </CTARow>
      </PageHero>
      <SubNav links={SMILE_SUBNAV} />

      <Section>
        <SectionHead eyebrow="Formats" title="Ways to Learn With SMILE" />
        <Grid className="mt-8">
          <InfoCard title="Single workshop">
            A focused 60–120 minute session on one topic, delivered virtually or on site.
          </InfoCard>
          <InfoCard title="Webinar series">
            A sequence of virtual sessions that build shared language and practice across a team.
          </InfoCard>
          <InfoCard title="Training cohort">
            Multi-session professional learning with practice, application, and coaching between
            sessions.
          </InfoCard>
          <InfoCard title="On-site professional development">
            Full or half-day sessions designed with your leadership team.
          </InfoCard>
          <InfoCard title="Coaching">
            Ongoing individual or small-group coaching for staff and program leaders.
          </InfoCard>
          <InfoCard title="Speaking engagement">
            Keynotes and featured talks for conferences, convenings, and community events.
          </InfoCard>
        </Grid>
      </Section>

      <Section tone="sand">
        <SectionHead eyebrow="Upcoming" title="Scheduled Sessions" />
        <div className="mt-8">
          <EventsPreview />
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead
            eyebrow="Register"
            title="Workshop & Webinar Registration"
            lead="Complete the form and the Strong Minds team will confirm your registration, send access details, and follow up with anything your team needs beforehand."
          />
          <LeadForm
            table="workshop_registrations"
            sourceForm="Workshop / Webinar Registration Form"
            title="Workshop & Webinar Registration"
            nameField="name"
            divisionField="division"
            programField="session"
            referralField="referral"
            consentField="consent"
            submitLabel="Submit Registration"
            nextSteps={[
              "The Strong Minds team reviews your registration",
              "You receive confirmation and access details",
              "You receive a reminder before the session",
              "Follow-up resources are shared afterward",
            ]}
            fields={[
              { name: "name", label: "Full Name", required: true, half: true },
              { name: "email", label: "Email Address", type: "email", required: true, half: true },
              { name: "phone", label: "Phone Number", type: "tel", half: true },
              { name: "organization", label: "Organization or School", half: true },
              { name: "role", label: "Role or Title", half: true },
              {
                name: "division",
                label: "Division",
                type: "select",
                options: ["SMILE", "Youth Academy", "Families", "Mentors", "Organization"],
                half: true,
              },
              {
                name: "session",
                label: "Session or Topic of Interest",
                required: true,
                placeholder: "Workshop title, topic, or date",
              },
              {
                name: "attendees",
                label: "Number of Attendees",
                type: "number",
                half: true,
              },
              {
                name: "format",
                label: "Preferred Format",
                type: "select",
                options: ["Virtual", "In person", "Either"],
                half: true,
              },
              {
                name: "goals",
                label: "What do you hope to gain from this session?",
                type: "textarea",
              },
              {
                name: "accessibility",
                label: "Accessibility or accommodation needs",
                type: "textarea",
              },
              {
                name: "referral",
                label: "How did you hear about Strong Minds?",
                type: "select",
                options: [
                  "Search engine",
                  "Social media",
                  "Friend or family",
                  "School or organization",
                  "Community event",
                  "Strong Minds staff",
                  "Other",
                ],
              },
              {
                name: "consent",
                label: "I consent to be contacted by Strong Minds about this registration.",
                type: "checkbox",
                required: true,
              },
            ]}
          />
        </div>
      </Section>
    </>
  );
}