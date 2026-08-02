import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHead } from "@/components/site/kit";
import { LeadForm } from "@/components/forms/LeadForm";

const DESC =
  "Schedule a call with the Strong Minds team to discuss enrollment, mentorship, family programs, or an organizational partnership.";

export const Route = createFileRoute("/schedule-a-call")({
  head: () => ({
    meta: [
      { title: "Schedule a Call | Strong Minds Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Schedule a Call with Strong Minds" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/schedule-a-call" },
    ],
    links: [{ rel: "canonical", href: "/schedule-a-call" }],
  }),
  component: ScheduleCall,
});

function ScheduleCall() {
  return (
    <>
      <PageHero
        eyebrow="Talk with us"
        title="Schedule a Call"
        subtitle="A direct conversation with the Strong Minds team about your student, your family, your team, or your organization."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHead
            eyebrow="How it works"
            title="Share a Few Details"
            lead="Tell us what you want to discuss and when you are generally available. We will follow up to confirm a time that works."
          />
          <LeadForm
            table="call_requests"
            sourceForm="Schedule a Call Form"
            title="Call Request"
            nameField="name"
            divisionField="division"
            programField="topic"
            referralField="referral"
            consentField="consent"
            submitLabel="Request a Call"
            nextSteps={[
              "The Strong Minds team reviews your request",
              "We reach out to confirm a time",
              "You receive a calendar confirmation",
            ]}
            fields={[
              { name: "name", label: "Full Name", required: true, half: true },
              { name: "email", label: "Email Address", type: "email", required: true, half: true },
              { name: "phone", label: "Phone Number", type: "tel", required: true, half: true },
              {
                name: "contact_pref",
                label: "Preferred Contact Method",
                type: "select",
                options: ["Phone call", "Video call", "Email"],
                half: true,
              },
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
                name: "topic",
                label: "What would you like to discuss?",
                type: "select",
                required: true,
                options: [
                  "Student enrollment",
                  "Summer Intensive",
                  "11-Month Fellowship",
                  "Pricing and supported tuition",
                  "Mentoring",
                  "Family programs",
                  "Organizational partnership",
                  "Something else",
                ],
              },
              {
                name: "availability",
                label: "General Availability",
                type: "select",
                options: [
                  "Weekday mornings",
                  "Weekday afternoons",
                  "Weekday evenings",
                  "Weekends",
                  "Flexible",
                ],
                half: true,
              },
              { name: "timezone", label: "Time Zone", half: true },
              { name: "notes", label: "Anything else we should know before the call?", type: "textarea" },
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
                label: "I consent to be contacted by Strong Minds to schedule this call.",
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