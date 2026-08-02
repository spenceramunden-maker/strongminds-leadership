import { createFileRoute } from "@tanstack/react-router";
import { CTA, CTARow, PageHero, Section, SectionHead } from "@/components/site/kit";
import { EventsBrowser } from "@/components/site/EventsPreview";

const DESC =
  "Browse upcoming Strong Minds events: information sessions, workshops, Saturday experiences, showcases, family events, and Parent Night Off.";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Upcoming Events | Strong Minds Leadership Academy" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Strong Minds Events" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: Events,
});

function Events() {
  return (
    <>
      <PageHero
        eyebrow="Calendar"
        title="Upcoming Events"
        subtitle="Information sessions, workshops, Saturday experiences, showcases, family events, and Parent Night Off."
      >
        <CTARow>
          <CTA to="/register" variant="gold">
            Register for an Event
          </CTA>
          <CTA to="/interest" variant="outline-light">
            Get Event Announcements
          </CTA>
        </CTARow>
      </PageHero>
      <Section>
        <SectionHead eyebrow="Browse" title="Filter by Division or Category" />
        <div className="mt-8">
          <EventsBrowser />
        </div>
      </Section>
    </>
  );
}