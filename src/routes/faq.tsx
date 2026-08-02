import { createFileRoute } from "@tanstack/react-router";
import { CTA, CTARow, PageHero, Section, SectionHead } from "@/components/site/kit";

const DESC =
  "Answers to common questions about Strong Minds programs, ages served, schedules, Saturdays, mentorship, pricing, and enrollment.";

const FAQS = [
  { q: "What ages does Strong Minds serve?", a: "Standard enrollment serves students ages 8–18. Eligible alumni may continue through age 20 when enrolled in an approved post-secondary education or training program with Founder approval." },
  { q: "Is the Fellowship virtual or in person?", a: "The 11-Month Leadership Fellowship is virtual Monday through Thursday, with one required in-person Saturday experience each month and an optional Saturday every other month." },
  { q: "Do students meet every Saturday?", a: "No. Strong Minds does not meet every Saturday." },
  { q: "What time does programming end?", a: "Programming generally concludes by 7:00 PM. Start times may vary by student schedule and placement." },
  { q: "Is this just a Zoom class?", a: "No. Fellows use a structured Virtual Campus with check-in, reflection, planning, academic work, live learning, Learning Labs, mentor meetings, and a daily wrap-up." },
  { q: "How often do fellows meet with a mentor?", a: "Each fellow has one scheduled mentor meeting per week during the program year." },
  { q: "Is supported tuition available?", a: "Yes. Limited supported-tuition opportunities are available depending on funding and capacity. Reach out and we will talk through options." },
  { q: "How do we enroll?", a: "Submit the Youth Program Interest Form, receive details and pricing, attend an information session or call, reserve a seat, then complete enrollment." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | Strong Minds Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Strong Minds FAQ" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <>
      <PageHero eyebrow="Questions" title="Frequently Asked Questions" />
      <Section>
        <div className="max-w-3xl space-y-6">
          {FAQS.map((f) => (
            <div key={f.q} className="surface-card p-6">
              <h2 className="text-lg">{f.q}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
        <CTARow className="mt-10">
          <CTA to="/schedule-a-call" variant="ink">Schedule a Call</CTA>
          <CTA to="/contact" variant="outline">Contact Strong Minds</CTA>
        </CTARow>
      </Section>
    </>
  );
}