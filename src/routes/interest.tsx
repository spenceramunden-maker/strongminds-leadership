import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHead } from "@/components/site/kit";
import { LeadForm } from "@/components/forms/LeadForm";

const DESC =
  "Join a Strong Minds interest list to receive updates about youth programs, SMILE training, family events, and mentorship opportunities.";

export const Route = createFileRoute("/interest")({
  head: () => ({
    meta: [
      { title: "Join an Interest List | Strong Minds Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Join a Strong Minds Interest List" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/interest" },
    ],
    links: [{ rel: "canonical", href: "/interest" }],
  }),
  component: Interest,
});

function Interest() {
  return (
    <>
      <PageHero
        eyebrow="Stay connected"
        title="Join an Interest List"
        subtitle="Not ready to enroll or register yet? Join the list and we will keep you informed as dates, pricing, and opportunities are announced."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHead
            eyebrow="Low commitment"
            title="No Payment. No Obligation."
            lead="This form simply tells us what you care about so we can send you the right information at the right time."
          />
          <LeadForm
            table="general_interests"
            sourceForm="General Interest Form"
            title="General Interest Form"
            nameField="name"
            divisionField="division"
            programField="interest"
            referralField="referral"
            consentField="consent"
            submitLabel="Join the Interest List"
            nextSteps={[
              "You are added to the interest list you selected",
              "You receive announcements as dates and pricing are confirmed",
              "You can enroll or register whenever you are ready",
            ]}
            fields={[
              { name: "name", label: "Full Name", required: true, half: true },
              { name: "email", label: "Email Address", type: "email", required: true, half: true },
              { name: "phone", label: "Phone Number", type: "tel", half: true },
              { name: "city_state", label: "City and State", half: true },
              {
                name: "role",
                label: "I am a",
                type: "select",
                options: [
                  "Parent or caregiver",
                  "Student",
                  "Educator",
                  "Mentor or youth worker",
                  "Organization representative",
                  "Community member",
                ],
                half: true,
              },
              {
                name: "division",
                label: "Division of Interest",
                type: "select",
                required: true,
                options: ["Youth Academy", "SMILE", "Families", "Mentors", "Organization"],
                half: true,
              },
              {
                name: "interest",
                label: "What are you most interested in?",
                type: "select",
                required: true,
                options: [
                  "Summer Intensive",
                  "11-Month Leadership Fellowship",
                  "Alumni Fellowship",
                  "SMILE workshops and training",
                  "Family workshops and events",
                  "Becoming a mentor",
                  "Organizational partnership",
                  "General updates",
                ],
              },
              {
                name: "student_age",
                label: "Student age, if applicable",
                type: "number",
                half: true,
              },
              {
                name: "timing",
                label: "When are you hoping to get involved?",
                type: "select",
                options: ["Right away", "Within a few months", "Next program year", "Just exploring"],
                half: true,
              },
              { name: "notes", label: "Anything else we should know?", type: "textarea" },
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
                label: "I consent to receive updates from Strong Minds.",
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