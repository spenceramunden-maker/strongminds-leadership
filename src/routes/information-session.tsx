import { createFileRoute } from "@tanstack/react-router";
import { Bullets, PageHero, Section, SectionHead } from "@/components/site/kit";
import { LeadForm } from "@/components/forms/LeadForm";

const DESC =
  "Register for a Strong Minds information session to learn about programs, schedules, pricing, supported tuition, mentorship, and enrollment.";

export const Route = createFileRoute("/information-session")({
  head: () => ({
    meta: [
      { title: "Information Session Registration | Strong Minds Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Strong Minds Information Sessions" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/information-session" },
    ],
    links: [{ rel: "canonical", href: "/information-session" }],
  }),
  component: InformationSession,
});

function InformationSession() {
  return (
    <>
      <PageHero
        eyebrow="Learn more"
        title="Information Session Registration"
        subtitle="Live sessions where the Strong Minds team walks through programs, schedules, expectations, pricing, and answers your questions directly."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHead eyebrow="Agenda" title="What Sessions Cover" />
            <div className="mt-6">
              <Bullets
                items={[
                  "Program overview and daily structure",
                  "Schedules, Saturday experiences, and expectations",
                  "Mentorship and the Virtual Campus",
                  "Pricing, payment plans, and supported tuition",
                  "Enrollment steps and timelines",
                  "Open question and answer",
                ]}
              />
            </div>
          </div>
          <LeadForm
            table="information_session_registrations"
            sourceForm="Information Session Registration Form"
            title="Register for an Information Session"
            nameField="name"
            divisionField="division"
            programField="session_topic"
            referralField="referral"
            consentField="consent"
            submitLabel="Register for a Session"
            nextSteps={[
              "You receive confirmation with session details",
              "You receive a reminder before the session",
              "You receive follow-up materials afterward",
              "You can schedule a one-on-one call any time",
            ]}
            fields={[
              { name: "name", label: "Full Name", required: true, half: true },
              { name: "email", label: "Email Address", type: "email", required: true, half: true },
              { name: "phone", label: "Phone Number", type: "tel", half: true },
              {
                name: "role",
                label: "I am a",
                type: "select",
                options: [
                  "Parent or caregiver",
                  "Prospective mentor",
                  "Educator",
                  "Organization representative",
                  "Community member",
                ],
                half: true,
              },
              {
                name: "division",
                label: "Division",
                type: "select",
                required: true,
                options: ["Youth Academy", "SMILE", "Families", "Mentors", "Organization"],
                half: true,
              },
              {
                name: "session_topic",
                label: "Session Topic",
                type: "select",
                required: true,
                options: [
                  "Summer Intensive",
                  "11-Month Leadership Fellowship",
                  "Mentor Leadership Academy",
                  "Strong Minds Families",
                  "SMILE training and partnerships",
                  "General overview",
                ],
                half: true,
              },
              {
                name: "preferred_time",
                label: "Preferred Session Time",
                type: "select",
                options: ["Weekday evening", "Weekend morning", "Weekend afternoon", "Flexible"],
                half: true,
              },
              { name: "attendees", label: "Number of Attendees", type: "number", half: true },
              { name: "student_age", label: "Student age, if applicable", type: "number", half: true },
              {
                name: "questions",
                label: "Questions you would like answered",
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
                  "Other",
                ],
              },
              {
                name: "consent",
                label: "I consent to be contacted by Strong Minds about this session.",
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