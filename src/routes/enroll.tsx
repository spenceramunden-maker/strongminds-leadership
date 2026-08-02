import { createFileRoute } from "@tanstack/react-router";
import { Bullets, Note, PageHero, Section, SectionHead } from "@/components/site/kit";
import { LeadForm } from "@/components/forms/LeadForm";

const DESC =
  "Start enrollment for the Strong Minds Youth Leadership Academy. Submit the Youth Program Interest Form and the team will follow up with pricing, dates, and next steps.";

export const Route = createFileRoute("/enroll")({
  head: () => ({
    meta: [
      { title: "Enroll a Student | Strong Minds Youth Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Enroll a Student with Strong Minds" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/enroll" },
    ],
    links: [{ rel: "canonical", href: "/enroll" }],
  }),
  component: Enroll,
});

function Enroll() {
  return (
    <>
      <PageHero
        eyebrow="Youth Academy"
        title="Enroll a Student"
        subtitle="Enrollment begins with the Youth Program Interest Form. There is no payment required to submit it."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHead eyebrow="Process" title="The Enrollment Pathway" />
            <div className="mt-6">
              <Bullets
                items={[
                  "Submit the Youth Program Interest Form",
                  "Receive program details, dates, and pricing",
                  "Attend an information session or a scheduled call",
                  "Reserve a seat",
                  "Complete enrollment and set up a payment plan",
                  "Receive Virtual Campus access and onboarding",
                ]}
              />
            </div>
            <div className="mt-8">
              <Note>
                Placement, schedules, and cohort structure are personalized. Final details are
                confirmed with your family before the program year begins.
              </Note>
            </div>
          </div>
          <LeadForm
            table="youth_program_interests"
            sourceForm="Youth Program Interest Form"
            title="Youth Program Interest Form"
            intro="Complete one form per student. Fields marked with an asterisk are required."
            nameField="name"
            divisionField="division"
            programField="program"
            referralField="referral"
            consentField="consent"
            submitLabel="Submit Interest Form"
            nextSteps={[
              "The Strong Minds team reviews your submission",
              "You receive program details and pricing by email",
              "You are invited to an information session or a call",
              "You reserve a seat and complete enrollment",
            ]}
            fields={[
              { name: "name", label: "Parent or Guardian Name", required: true, half: true },
              { name: "email", label: "Email Address", type: "email", required: true, half: true },
              { name: "phone", label: "Phone Number", type: "tel", required: true, half: true },
              {
                name: "contact_pref",
                label: "Preferred Contact Method",
                type: "select",
                options: ["Email", "Phone call", "Text message"],
                half: true,
              },
              { name: "student_name", label: "Student Name", required: true, half: true },
              {
                name: "student_age",
                label: "Student Age",
                type: "number",
                required: true,
                half: true,
                noteIf: (v) => {
                  const age = Number(v["student_age"]);
                  if (!age) return null;
                  if (age < 8)
                    return "Standard enrollment serves students ages 8–18. Please submit the form and our team will contact you about options for younger students.";
                  if (age > 18 && age <= 20)
                    return "Continued participation through age 20 is available to eligible Strong Minds alumni who are enrolled in an approved college, university, trade program, apprenticeship, certification program, or other post-secondary education or training program, with Founder approval.";
                  if (age > 20)
                    return "Strong Minds youth programs serve students through age 20. Our team will follow up about other ways to stay connected.";
                  return null;
                },
              },
              { name: "grade", label: "Current Grade Level", half: true },
              { name: "school", label: "Current School", half: true },
              {
                name: "alumni",
                label: "Has the student participated in Strong Minds before?",
                type: "select",
                options: ["No", "Yes — Strong Minds alumni"],
                half: true,
              },
              {
                name: "postsecondary",
                label: "Post-secondary program the student is enrolled in",
                help: "Required for alumni ages 19–20 seeking continued participation.",
                half: true,
                showIf: (v) => Number(v["student_age"]) >= 19,
              },
              {
                name: "division",
                label: "Division",
                type: "select",
                options: ["Youth Academy", "Families", "Mentors", "SMILE"],
                half: true,
              },
              {
                name: "program",
                label: "Program of Interest",
                type: "select",
                required: true,
                options: [
                  "Summer Intensive",
                  "11-Month Leadership Fellowship",
                  "Alumni Leadership Fellowship",
                  "Both Summer and Fellowship",
                  "Not sure yet",
                ],
                half: true,
              },
              {
                name: "start_timing",
                label: "When would you like to start?",
                type: "select",
                options: [
                  "As soon as possible",
                  "Next summer",
                  "Next program year",
                  "Still exploring",
                ],
                half: true,
              },
              {
                name: "goals",
                label: "What are your goals for your student?",
                type: "textarea",
                required: true,
              },
              {
                name: "support_needs",
                label: "Academic, behavioral, or learning support needs we should know about",
                type: "textarea",
                help: "Please do not include medical records or other sensitive documentation.",
              },
              {
                name: "tuition_support",
                label: "Are you interested in supported tuition?",
                type: "select",
                options: ["Yes", "No", "Would like to learn more"],
                half: true,
              },
              {
                name: "info_session",
                label: "Would you like to attend an information session?",
                type: "select",
                options: ["Yes", "No", "Prefer a one-on-one call"],
                half: true,
              },
              {
                name: "referral",
                label: "How did you hear about Strong Minds?",
                type: "select",
                options: [
                  "Search engine",
                  "Social media",
                  "Friend or family",
                  "Current Strong Minds family",
                  "School or organization",
                  "Community event",
                  "Other",
                ],
              },
              {
                name: "referred_by",
                label: "Referring family name",
                help: "If a current Strong Minds family referred you, include their name.",
                showIf: (v) => v["referral"] === "Current Strong Minds family",
              },
              {
                name: "questions",
                label: "Questions for the Strong Minds team",
                type: "textarea",
              },
              {
                name: "consent",
                label: "I consent to be contacted by Strong Minds about enrollment.",
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