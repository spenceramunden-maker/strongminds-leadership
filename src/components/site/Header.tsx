import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Youth Academy", to: "/youth-academy" },
  { label: "SMILE", to: "/smile" },
  { label: "Families", to: "/families" },
  { label: "Mentors", to: "/mentors" },
  { label: "Events", to: "/events" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-foreground/10 ink-panel">
      <div className="container-page flex h-18 items-center justify-between gap-6 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center rounded-md bg-gold font-display text-lg font-extrabold text-gold-foreground"
          >
            SM
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-extrabold uppercase tracking-wide text-ink-foreground">
              Strong Minds
            </span>
            <span className="block text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              Leadership Academy
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to as never}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-gold" }}
              className="rounded-md px-2.5 py-2 text-sm font-semibold text-ink-muted transition-colors hover:text-ink-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <Link to="/virtual-campus-login" className="btn btn-outline-light !px-3 !py-2.5 text-xs">
            Virtual Campus Login
          </Link>
          <Link to="/enroll" className="btn btn-gold !px-4 !py-2.5 text-sm">
            Enroll a Student
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-md border border-ink-foreground/25 text-ink-foreground xl:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="ink-panel border-t border-ink-foreground/10 xl:hidden">
          <nav className="container-page flex max-h-[calc(100vh-5rem)] flex-col gap-1 overflow-y-auto py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to as never}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-semibold text-ink-foreground hover:bg-ink-foreground/10"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-ink-foreground/10 pt-4">
              <Link to="/enroll" onClick={() => setOpen(false)} className="btn btn-gold">
                Enroll a Student
              </Link>
              <Link
                to="/schedule-a-call"
                onClick={() => setOpen(false)}
                className="btn btn-outline-light"
              >
                Schedule a Call
              </Link>
              <Link
                to="/virtual-campus-login"
                onClick={() => setOpen(false)}
                className="btn btn-outline-light"
              >
                Virtual Campus Login
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}