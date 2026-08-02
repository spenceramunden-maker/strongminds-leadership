import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHead, SubNav } from "@/components/site/kit";
import { FAMILY_SUBNAV } from "@/components/site/nav-sets";
import { LeadForm } from "@/components/forms/LeadForm";

const DESC =
  "Register your family for a Strong Minds family event, showcase, workshop, or Parent Night Off.";

export const Route = createFileRoute("/family-registration")({
  head: () => ({
    meta: [
      { title: "Family Event Registration | Strong Minds Families" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Family Event Registration" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/family-registration" },
    ],
    links: [{ rel: "canonical", href: "/family-registration" }],
  }),
  component: FamilyRegistration,
});

function FamilyRegistration() {
  return (
    <>
      <PageHero
        eyebrow="Strong Minds Families"
        title="Family Event Registration"
        subtitle="Reserve your family's spot at an upcoming Strong Minds event."
      />
      <SubNav links={FAMILY_SUBNAV} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead
            eyebrow="Register"
            title="Tell Us Who Is Coming"
            lead="Complete the form and the Strong Minds team will confirm your registration and send event details, including location, timing, and anything to bring."
          />
          <LeadForm
            table="family_event_registrations"
            sourceForm="Family Event Registration Form"
            title="Family Event Registration"
            nameField="name"
            divisionField="division"
            programField="event"
            referralField="referral"
            consentField="consent"
            submitLabel="Submit Registration"
            nextSteps={[
              "The Strong Minds team confirms your registration",
              "You receive event details and directions",
              "You receive a reminder before the event",
            ]}
            fields={[
              { name: "name", label: "Parent or Caregiver Name", required: true, half: true },
              { name: "email", label: "Email Address", type: "email", required: true, half: true },
              { name: "phone", label: "Phone Number", type: "tel", half: true },
              {
                name: "division",
                label: "Division",
                type: "select",
                options: ["Families", "Youth Academy", "SMILE", "Mentors"],
                half: true,
              },
              {
                name: "event",
                label: "Event You Are Registering For",
                required: true,
                placeholder: "Event name or date",
              },
              {
                name: "enrolled",
                label: "Is your student currently enrolled in Strong Minds?",
                type: "select",
                options: ["Yes", "No", "Applying now"],
                half: true,
              },
              { name: "adults", label: "Number of Adults Attending", type: "number", half: true },
              { name: "children", label: "Number of Children Attending", type: "number", half: true },
              { name: "child_ages", label: "Ages of Children Attending", half: true },
              {
                name: "dietary",
                label: "Dietary restrictions or allergies",
                type: "textarea",
              },
              {
                name: "accessibility",
                label: "Accessibility or accommodation needs",
                type: "textarea",
              },
              {
                name: "emergency_contact",
                label: "Emergency Contact Name and Phone",
                half: true,
              },
              {
                name: "referral",
                label: "How did you hear about this event?",
                type: "select",
                options: [
                  "Strong Minds email",
                  "Social media",
                  "Friend or family",
                  "School or organization",
                  "Community event",
                  "Other",
                ],
                half: true,
              },
              {
                name: "questions",
                label: "Questions or notes for the Strong Minds team",
                type: "textarea",
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