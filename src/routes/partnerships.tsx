import { createFileRoute } from "@tanstack/react-router";
import { Bullets, Grid, InfoCard, PageHero, Section, SectionHead, SubNav } from "@/components/site/kit";
import { SMILE_SUBNAV } from "@/components/site/nav-sets";
import { LeadForm } from "@/components/forms/LeadForm";

const DESC =
  "Partner with Strong Minds: professional development, program design, coaching, and long-term partnerships for schools, districts, nonprofits, and community organizations.";

export const Route = createFileRoute("/partnerships")({
  head: () => ({
    meta: [
      { title: "Organizational Partnerships | Strong Minds Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Organizational Partnerships with Strong Minds" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/partnerships" },
    ],
    links: [{ rel: "canonical", href: "/partnerships" }],
  }),
  component: Partnerships,
});

function Partnerships() {
  return (
    <>
      <PageHero
        eyebrow="SMILE"
        title="Organizational Partnerships"
        subtitle="Schools, districts, nonprofits, agencies, and community organizations partner with Strong Minds to strengthen the adults and systems serving young people."
      />
      <SubNav links={SMILE_SUBNAV} />

      <Section>
        <SectionHead eyebrow="Partnership types" title="Ways We Work Together" />
        <Grid className="mt-8">
          <InfoCard title="Professional development">
            Workshops, series, and full-day training designed with your leadership team.
          </InfoCard>
          <InfoCard title="Program design support">
            Building or redesigning youth programming, mentoring structures, and student supports.
          </InfoCard>
          <InfoCard title="Staff coaching">
            Ongoing coaching cycles for staff, mentors, and program leaders.
          </InfoCard>
          <InfoCard title="Student-facing programming">
            Strong Minds sessions delivered directly to the young people you serve.
          </InfoCard>
          <InfoCard title="Family engagement">
            Workshops and events that bring caregivers into the work.
          </InfoCard>
          <InfoCard title="Long-term partnership">
            Multi-year collaboration with shared goals, milestones, and review.
          </InfoCard>
        </Grid>
      </Section>

      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHead
            eyebrow="Process"
            title="From First Conversation to Proposal"
            lead="Every partnership begins with understanding your context, your people, and the outcomes you are trying to reach."
          />
          <Bullets
            items={[
              "Submit the partnership inquiry form",
              "Discovery conversation with the Strong Minds team",
              "Scope, format, timeline, and budget discussion",
              "Written proposal for your review",
              "Agreement, scheduling, and delivery",
              "Debrief, feedback, and next-phase planning",
            ]}
          />
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead
            eyebrow="Inquiry"
            title="Organization Partnership Inquiry"
            lead="Tell us about your organization and what you need. We will follow up to schedule a discovery conversation."
          />
          <LeadForm
            table="organization_partnerships"
            sourceForm="Organization Partnership Inquiry Form"
            title="Partnership Inquiry"
            nameField="name"
            divisionField="division"
            programField="service"
            referralField="referral"
            consentField="consent"
            submitLabel="Submit Inquiry"
            nextSteps={[
              "The Strong Minds team reviews your inquiry",
              "We schedule a discovery conversation",
              "We scope the work together",
              "You receive a written proposal",
            ]}
            fields={[
              { name: "name", label: "Contact Name", required: true, half: true },
              { name: "email", label: "Email Address", type: "email", required: true, half: true },
              { name: "phone", label: "Phone Number", type: "tel", half: true },
              { name: "organization", label: "Organization Name", required: true, half: true },
              { name: "role", label: "Your Role or Title", half: true },
              { name: "website", label: "Organization Website", half: true },
              {
                name: "org_type",
                label: "Organization Type",
                type: "select",
                options: [
                  "School",
                  "School district",
                  "Nonprofit",
                  "Community organization",
                  "Faith-based organization",
                  "Government agency",
                  "Business",
                  "Other",
                ],
                half: true,
              },
              {
                name: "division",
                label: "Division of Interest",
                type: "select",
                options: ["SMILE", "Youth Academy", "Families", "Mentors", "Organization"],
                half: true,
              },
              {
                name: "service",
                label: "Services of Interest",
                type: "select",
                required: true,
                options: [
                  "Professional development",
                  "Program design support",
                  "Staff coaching",
                  "Student-facing programming",
                  "Family engagement",
                  "Speaking engagement",
                  "Long-term partnership",
                  "Not sure yet",
                ],
              },
              {
                name: "audience_size",
                label: "Approximate Number of People Served",
                type: "number",
                half: true,
              },
              {
                name: "timeline",
                label: "Desired Timeline",
                type: "select",
                options: [
                  "As soon as possible",
                  "Within 1–3 months",
                  "Within 3–6 months",
                  "Next school year",
                  "Exploring options",
                ],
                half: true,
              },
              {
                name: "budget",
                label: "Budget Range or Funding Source",
                half: true,
              },
              {
                name: "location",
                label: "Location or Delivery Format",
                half: true,
              },
              {
                name: "goals",
                label: "What outcomes are you hoping for?",
                type: "textarea",
                required: true,
              },
              {
                name: "referral",
                label: "How did you hear about Strong Minds?",
                type: "select",
                options: [
                  "Search engine",
                  "Social media",
                  "Colleague referral",
                  "Conference or event",
                  "Strong Minds staff",
                  "Other",
                ],
              },
              {
                name: "consent",
                label: "I consent to be contacted by Strong Minds about this inquiry.",
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