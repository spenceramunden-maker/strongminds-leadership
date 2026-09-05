import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { useArena } from "@/hooks/useArena";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

const LINKS = [
  { to: "/admin", label: "Families", exact: true },
  { to: "/admin/inbox", label: "Inbox" },
  { to: "/admin/moderation", label: "Moderation" },
  { to: "/admin/program", label: "Orientation & handbook" },
] as const;

function AdminLayout() {
  const { data, isLoading } = useArena();

  if (isLoading) {
    return <p className="container-page py-16 text-sm text-muted-foreground">Loading…</p>;
  }

  if (!data?.isStaff) {
    return (
      <div className="container-page py-16">
        <h1 className="text-2xl text-foreground">Founder tools</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This area is for Strong Minds staff. If you think you should have access, contact
          founder@strongmindsleadershipacademy.org.
        </p>
        <Link to="/arena" className="btn btn-outline-ink mt-6">
          Back to your Arena
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="ink-panel">
        <div className="container-page py-10">
          <p className="eyebrow mb-2">Founder tools</p>
          <h1 className="text-3xl text-ink-foreground md:text-4xl">Strong Minds operations</h1>
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
          <Link
            to="/arena"
            className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            My Arena
          </Link>
        </div>
      </nav>
      <div className="container-page py-10">
        <Outlet />
      </div>
    </div>
  );
}
