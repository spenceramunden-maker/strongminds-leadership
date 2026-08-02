import { createFileRoute } from "@tanstack/react-router";
import { CTA, CTARow, Note, PageHero, Section, SectionHead } from "@/components/site/kit";

const DESC =
  "Virtual Campus login for enrolled Strong Minds fellows and families. Access details are provided after enrollment is complete.";

export const Route = createFileRoute("/virtual-campus-login")({
  head: () => ({
    meta: [
      { title: "Virtual Campus Login | Strong Minds Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Virtual Campus Login" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/virtual-campus-login" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/virtual-campus-login" }],
  }),
  component: VirtualCampusLogin,
});

function VirtualCampusLogin() {
  return (
    <>
      <PageHero
        eyebrow="Enrolled families"
        title="Virtual Campus Login"
        subtitle="This area is reserved for enrolled Strong Minds fellows and their families."
      />
      <Section>
        <div className="max-w-2xl">
          <SectionHead
            eyebrow="Access"
            title="Campus access opens after enrollment"
            lead="Enrolled families receive Virtual Campus access details directly from the Strong Minds team, along with a walkthrough of daily routines, schedules, and expectations."
          />
          <div className="mt-8">
            <Note>
              If you are an enrolled family and cannot access the campus, contact the Strong Minds
              team through the contact page and we will restore access.
            </Note>
          </div>
          <CTARow className="mt-8">
            <CTA to="/enroll" variant="gold">
              Enroll a Student
            </CTA>
            <CTA to="/contact" variant="outline">
              Contact Strong Minds
            </CTA>
          </CTARow>
        </div>
      </Section>
    </>
  );
}