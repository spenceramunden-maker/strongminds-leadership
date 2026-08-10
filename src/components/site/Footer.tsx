import { Link } from "@tanstack/react-router";

const GROUPS: { heading: string; links: { label: string; to: string }[] }[] = [
  {
    heading: "Youth Programs",
    links: [
      { label: "Youth Academy", to: "/youth-academy" },
      { label: "Summer Intensive", to: "/summer-intensive" },
      { label: "11-Month Fellowship", to: "/fellowship" },
      { label: "Alumni Fellowship", to: "/alumni-fellowship" },
      { label: "Learning Labs", to: "/learning-labs" },
      { label: "Virtual Campus", to: "/virtual-campus" },
    ],
  },
  {
    heading: "Professional Learning",
    links: [
      { label: "SMILE", to: "/smile" },
      { label: "Workshops & Training", to: "/smile-workshops" },
      { label: "Organizational Training", to: "/smile-workshops" },
      { label: "Partnerships", to: "/partnerships" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Strong Minds Families", to: "/families" },
      { label: "Mentors", to: "/mentors" },
      { label: "Events", to: "/events" },
      { label: "Parent Night Off", to: "/parent-night-off" },
    ],
  },
  {
    heading: "Organization",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "FAQ", to: "/faq" },
      { label: "Pricing", to: "/pricing" },
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

const CONTACT_LABELS = [
  "info@strongmindsleadershipacademy.org",
  "founder@strongmindsleadershipacademy.org",
];

export function Footer() {
  return (
    <footer className="ink-panel border-t border-ink-foreground/10">
      <div className="container-page py-14">
        <div className="flex flex-col gap-6 border-b border-ink-foreground/10 pb-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="font-display text-2xl font-extrabold text-ink-foreground">
              Take the next step with Strong Minds.
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Preparing young people. Equipping the adults who serve them. Strengthening families
              and communities.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/enroll" className="btn btn-gold">
              Enroll a Student
            </Link>
            <Link to="/mentor-interest" className="btn btn-outline-light">
              Become a Mentor
            </Link>
            <Link to="/partnerships" className="btn btn-outline-light">
              Request Training
            </Link>
            <Link to="/schedule-a-call" className="btn btn-outline-light">
              Schedule a Call
            </Link>
          </div>
        </div>

        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((group) => (
            <div key={group.heading}>
              <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-gold">
                {group.heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label + link.to}>
                    <Link
                      to={link.to as never}
                      className="text-sm text-ink-muted transition-colors hover:text-ink-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-ink-foreground/10 pt-8">
          <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-gold">
            Contact
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {CONTACT_LABELS.map((label) => (
              <li key={label} className="text-sm text-ink-muted">
                {label}
              </li>
            ))}
          </ul>
        </div>


        <div className="mt-10 flex flex-col gap-3 border-t border-ink-foreground/10 pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Strong Minds Leadership Academy. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-ink-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-ink-foreground">
              Terms & Participation
            </Link>
            <Link to="/founder" className="hover:text-ink-foreground">
              Staff Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}