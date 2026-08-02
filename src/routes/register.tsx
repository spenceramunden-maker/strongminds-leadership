import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHead } from "@/components/site/kit";
import { LeadForm } from "@/components/forms/LeadForm";

const DESC =
  "Register for a Strong Minds workshop, webinar, showcase, or event. The team will confirm your spot and send access details.";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Event Registration | Strong Minds Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Strong Minds Event Registration" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/register" },
    ],
    links: [{ rel: "canonical", href: "/register" }],
  }),
  component: Register,
});

function Register() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Event Registration"
        subtitle="Register for a workshop, webinar, showcase, or Strong Minds experience."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHead
            eyebrow="Register"
            title="Reserve Your Spot"
            lead="Tell us which event you would like to attend. If dates have not been announced yet, submit the form anyway and we will notify you first."
          />
          <LeadForm
            table="workshop_registrations"
            sourceForm="Event Registration Form"
            title="Event Registration"
            nameField="name"
            divisionField="division"
            programField="event"
            referralField="referral"
            consentField="consent"
            submitLabel="Submit Registration"
            nextSteps={[
              "The Strong Minds team confirms your registration",
              "You receive event details and access information",
              "You receive a reminder before the event",
            ]}
            fields={[
              { name: "name", label: "Full Name", required: true, half: true },
              { name: "email", label: "Email Address", type: "email", required: true, half: true },
              { name: "phone", label: "Phone Number", type: "tel", half: true },
              { name: "organization", label: "Organization or School", half: true },
              {
                name: "division",
                label: "Division",
                type: "select",
                options: ["Youth Academy", "SMILE", "Families", "Mentors", "Organization"],
                half: true,
              },
              {
                name: "event",
                label: "Event You Are Registering For",
                required: true,
                placeholder: "Event name or date",
                half: true,
              },
              { name: "attendees", label: "Number of Attendees", type: "number", half: true },
              {
                name: "format",
                label: "Preferred Format",
                type: "select",
                options: ["Virtual", "In person", "Either"],
                half: true,
              },
              { name: "questions", label: "Questions or accommodation needs", type: "textarea" },
              {
                name: "referral",
                label: "How did you hear about this event?",
                type: "select",
                options: [
                  "Search engine",
                  "Social media",
                  "Friend or family",
                  "School or organization",
                  "Strong Minds staff",
                  "Other",
                ],
              },
              {
                name: "consent",
                label: "I consent to be contacted by Strong Minds about this event.",
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