import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SectionHead, SubNav } from "@/components/site/kit";
import { MENTOR_SUBNAV } from "@/components/site/nav-sets";
import { LeadForm } from "@/components/forms/LeadForm";

const DESC =
  "Apply to become a Strong Minds mentor. Share your background, availability, and interests and the team will follow up with next steps.";

export const Route = createFileRoute("/mentor-interest")({
  head: () => ({
    meta: [
      { title: "Mentor Interest Form | Strong Minds Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Become a Strong Minds Mentor" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/mentor-interest" },
    ],
    links: [{ rel: "canonical", href: "/mentor-interest" }],
  }),
  component: MentorInterest,
});

function MentorInterest() {
  return (
    <>
      <PageHero
        eyebrow="Mentor Leadership Academy"
        title="Mentor Interest Form"
        subtitle="Tell us about yourself. Mentoring with Strong Minds is a weekly commitment during the program year, with training and staff support throughout."
      />
      <SubNav links={MENTOR_SUBNAV} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead
            eyebrow="Next steps"
            title="What Happens After You Apply"
            lead="The Strong Minds team reviews every submission personally. If it looks like a fit, we will schedule a conversation, share training dates, and walk you through screening and placement."
          />
          <LeadForm
            table="mentor_interests"
            sourceForm="Mentor Interest Form"
            title="Mentor Interest"
            nameField="name"
            divisionField="division"
            programField="mentor_role"
            referralField="referral"
            consentField="consent"
            submitLabel="Submit Mentor Interest"
            nextSteps={[
              "The Strong Minds team reviews your submission",
              "We schedule an introductory conversation",
              "You complete screening and references",
              "You attend mentor training",
              "You are matched with a fellow",
            ]}
            fields={[
              { name: "name", label: "Full Name", required: true, half: true },
              { name: "email", label: "Email Address", type: "email", required: true, half: true },
              { name: "phone", label: "Phone Number", type: "tel", half: true },
              { name: "city_state", label: "City and State", half: true },
              { name: "occupation", label: "Occupation or Field", half: true },
              { name: "employer", label: "Employer or Organization", half: true },
              {
                name: "division",
                label: "Division",
                type: "select",
                options: ["Mentors", "Youth Academy", "SMILE", "Families"],
                half: true,
              },
              {
                name: "mentor_role",
                label: "Mentor Role of Interest",
                type: "select",
                required: true,
                options: [
                  "Weekly one-to-one mentor",
                  "Group mentor",
                  "Learning Lab support",
                  "Saturday experience volunteer",
                  "Guest speaker",
                  "Not sure yet",
                ],
              },
              {
                name: "age_group",
                label: "Preferred Age Group",
                type: "select",
                options: ["Ages 8–11", "Ages 12–14", "Ages 15–18", "Alumni 19–20", "No preference"],
                half: true,
              },
              {
                name: "availability",
                label: "Weekly Availability",
                type: "select",
                options: [
                  "Weekday afternoons",
                  "Weekday evenings",
                  "Saturdays",
                  "Flexible",
                ],
                half: true,
              },
              {
                name: "experience",
                label: "Experience working with young people",
                type: "textarea",
              },
              {
                name: "motivation",
                label: "Why do you want to mentor with Strong Minds?",
                type: "textarea",
                required: true,
              },
              {
                name: "strengths",
                label: "Skills, interests, or strengths you would bring",
                type: "textarea",
              },
              {
                name: "background_check",
                label: "I understand mentors complete a background screening.",
                type: "checkbox",
                required: true,
              },
              {
                name: "referral",
                label: "How did you hear about Strong Minds?",
                type: "select",
                options: [
                  "Search engine",
                  "Social media",
                  "Friend or colleague",
                  "Community event",
                  "Strong Minds staff",
                  "Other",
                ],
              },
              {
                name: "consent",
                label: "I consent to be contacted by Strong Minds about mentoring.",
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