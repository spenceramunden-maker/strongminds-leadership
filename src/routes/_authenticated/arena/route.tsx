import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useArena } from "@/hooks/useArena";

export const Route = createFileRoute("/_authenticated/arena")({
  component: ArenaLayout,
});

const LINKS = [
  { to: "/arena", label: "Dashboard", exact: true },
  { to: "/arena/family", label: "Family details" },
  { to: "/arena/students", label: "Students" },
  { to: "/arena/orientation", label: "Orientation" },
  { to: "/arena/handbook", label: "Handbook" },
  { to: "/arena/messages", label: "Messages" },
  { to: "/arena/community", label: "Community" },
] as const;

function ArenaLayout() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useArena();

  async function signOut() {
    await supabase.auth.signOut();
    void navigate({ to: "/auth" });
  }

  return (
    <div className="bg-background">
      <div className="ink-panel">
        <div className="container-page flex flex-wrap items-end justify-between gap-4 py-10">
          <div>
            <p className="eyebrow mb-2">Parent Arena</p>
            <h1 className="text-3xl text-ink-foreground md:text-4xl">
              {data?.family?.family_name || "Your family home base"}
            </h1>
            <p className="mt-2 text-sm text-ink-muted">
              Your point of contact: {data?.family?.poc_name ?? "Strong Minds Team"}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {data?.isStaff ? (
              <Link to="/admin" className="btn btn-outline-light">
                Founder tools
              </Link>
            ) : null}
            <button type="button" onClick={signOut} className="btn btn-outline-light">
              Sign out
            </button>
          </div>
        </div>
      </div>

      <nav className="border-b border-border bg-card">
        <div className="container-page flex gap-1 overflow-x-auto py-2">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: Boolean((l as { exact?: boolean }).exact) }}
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
              className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="container-page py-10">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading your Arena…</p>
        ) : error ? (
          <p className="text-sm text-destructive">
            We could not load your Arena. Please refresh and try again.
          </p>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
