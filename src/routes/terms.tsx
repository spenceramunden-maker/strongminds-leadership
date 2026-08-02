import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose, Section, SectionHead } from "@/components/site/kit";

const DESC =
  "Terms of use for the Strong Minds Leadership Academy website, including program information, registration, and content use.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use | Strong Minds Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Terms of Use" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" />
      <Section>
        <SectionHead eyebrow="Using this site" title="Terms and Conditions" />
        <div className="mt-6">
          <Prose>
            <p>
              This website is provided by Strong Minds Leadership Academy for informational purposes.
              Program descriptions, schedules, and pricing are subject to change.
            </p>
            <p>
              <strong className="text-foreground">Program information.</strong> Proposed launch
              pricing, dates, and cohort structures may be adjusted before registration opens. Final
              terms are confirmed in writing during enrollment.
            </p>
            <p>
              <strong className="text-foreground">Submissions.</strong> Submitting a form does not
              guarantee enrollment, registration, placement, or acceptance. All submissions are
              reviewed by the Strong Minds team.
            </p>
            <p>
              <strong className="text-foreground">Content.</strong> Site content, curriculum
              descriptions, and materials belong to Strong Minds Leadership Academy and may not be
              reproduced without permission.
            </p>
            <p>
              <strong className="text-foreground">Questions.</strong> For anything related to these
              terms, contact the Strong Minds team through the contact page.
            </p>
          </Prose>
        </div>
      </Section>
    </>
  );
}