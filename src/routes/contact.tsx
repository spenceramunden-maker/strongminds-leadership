import { createFileRoute } from "@tanstack/react-router";
import { Grid, InfoCard, PageHero, Section, SectionHead } from "@/components/site/kit";
import { LeadForm } from "@/components/forms/LeadForm";
import { CONTACT_LABELS } from "@/lib/site-content";

const DESC =
  "Contact Strong Minds Leadership Academy with questions about youth programs, SMILE training, family events, mentorship, or partnerships.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Strong Minds Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Contact Strong Minds Leadership Academy" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact Strong Minds"
        subtitle="Every message is read by the Strong Minds team and routed to the right person."
      />
      <Section>
        <SectionHead eyebrow="Where to write" title="Contact Points" />
        <Grid className="mt-8" cols={3}>
          {CONTACT_LABELS.map((c) => (
            <InfoCard key={c.label} title={c.use}>
              {c.label}
            </InfoCard>
          ))}
        </Grid>
      </Section>
      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHead
            eyebrow="Message"
            title="Send Us a Message"
            lead="Use this form for any question. If you are ready to enroll, register, or schedule a call, those pages will move faster."
          />
          <LeadForm
            table="contact_messages"
            sourceForm="Contact Form"
            title="Contact Form"
            nameField="name"
            divisionField="division"
            programField="topic"
            referralField="referral"
            consentField="consent"
            submitLabel="Send Message"
            nextSteps={[
              "Your message is routed to the right team member",
              "You receive a reply by your preferred contact method",
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
                name: "topic",
                label: "Topic",
                type: "select",
                required: true,
                options: [
                  "General question",
                  "Enrollment",
                  "Pricing and supported tuition",
                  "Events",
                  "Mentoring",
                  "Family programs",
                  "Partnership",
                  "Media or speaking",
                  "Other",
                ],
                half: true,
              },
              { name: "message", label: "Message", type: "textarea", required: true },
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
                label: "I consent to be contacted by Strong Minds about this message.",
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