import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose, Section, SectionHead } from "@/components/site/kit";

const DESC =
  "How Strong Minds Leadership Academy collects, uses, and protects the information families and partners submit through this website.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Strong Minds Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Privacy Policy" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <Section>
        <SectionHead eyebrow="Overview" title="How We Handle Your Information" />
        <div className="mt-6">
          <Prose>
            <p>
              This page is maintained by Strong Minds Leadership Academy to answer common questions
              about how information submitted through this website is handled.
            </p>
            <p>
              <strong className="text-foreground">What we collect.</strong> We collect the
              information you choose to provide through our forms: your name, contact details, the
              program or service you are interested in, and any notes you add.
            </p>
            <p>
              <strong className="text-foreground">How we use it.</strong> Submissions are used only
              to respond to you, share program information, coordinate enrollment or registration,
              and follow up about the request you submitted.
            </p>
            <p>
              <strong className="text-foreground">What we ask you not to send.</strong> Please do not
              submit Social Security numbers, medical records, or other sensitive documentation
              through website forms.
            </p>
            <p>
              <strong className="text-foreground">Access.</strong> Form submissions are stored
              securely and reviewed by authorized Strong Minds staff. We do not sell your
              information.
            </p>
            <p>
              <strong className="text-foreground">Your choices.</strong> You may request that we
              update or remove your information at any time by contacting us through the contact
              page.
            </p>
          </Prose>
        </div>
      </Section>
    </>
  );
}