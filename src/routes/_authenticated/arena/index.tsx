import { createFileRoute, Link } from "@tanstack/react-router";
import { useArena } from "@/hooks/useArena";
import { TASK_BY_KEY, formatDate, daysUntil } from "@/lib/arena";
import { Panel, StatusPill, Placeholder } from "@/components/arena/ui";

export const Route = createFileRoute("/_authenticated/arena/")({
  component: Dashboard,
});

function Dashboard() {
  const { data } = useArena();
  if (!data) return null;

  const tasks = data.tasks;
  const done = tasks.filter((t) => t.status === "Complete").length;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const due = data.family.handbook_due_at;
  const left = daysUntil(due);
  const isProspect = data.family.status !== "Enrolled";

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <Panel
          title={isProspect ? "Your next steps" : "Your onboarding checklist"}
          description={
            isProspect
              ? "You can complete these now, or as soon as your enrollment is confirmed."
              : "Work through these in any order. We will send reminders as due dates approach."
          }
        >
          <div className="mb-5">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {done} of {tasks.length} complete
              </span>
              <span>{pct}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <ul className="divide-y divide-border">
            {tasks.map((t) => {
              const def = TASK_BY_KEY[t.task_key];
              const overdue =
                t.status !== "Complete" && t.due_at && (daysUntil(t.due_at) ?? 1) < 0;
              return (
                <li key={t.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div className="min-w-[16rem] flex-1">
                    <p className="text-sm font-semibold text-foreground">{t.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
                    {t.due_at ? (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Due {formatDate(t.due_at)}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusPill status={overdue ? "Overdue" : t.status} />
                    {def ? (
                      <Link to={def.to} className="btn btn-outline-ink">
                        Open
                      </Link>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel
          title="Welcome video"
          description="A short introduction from our founder before your first program day."
        >
          <div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-border bg-muted/40 text-center text-sm text-muted-foreground">
            The welcome video is being finished right now. It will appear here as soon as it is
            ready — we will email you when it does.
          </div>
          <div className="mt-4">
            <Link to="/arena/orientation" className="btn btn-gold">
              Schedule your orientation
            </Link>
          </div>
        </Panel>
      </div>

      <div className="space-y-6">
        <Panel title="Handbook deadline">
          {due ? (
            <>
              <p className="text-2xl text-foreground">{formatDate(due)}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {left !== null && left >= 0
                  ? `${left} day${left === 1 ? "" : "s"} remaining.`
                  : "This is past due — please sign as soon as you can."}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Whichever comes first: 14 days after enrollment, or your student's third program
                day.
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Your deadline is set once your enrollment date and first program day are confirmed.
            </p>
          )}
          <div className="mt-4">
            <Link to="/arena/handbook" className="btn btn-outline-ink">
              Review the handbook
            </Link>
          </div>
        </Panel>

        <Panel title="Your Strong Minds contact">
          <p className="text-sm text-foreground">{data.family.poc_name}</p>
          <p className="text-sm text-muted-foreground">{data.family.poc_email}</p>
          <div className="mt-4">
            <Link to="/arena/messages" className="btn btn-outline-ink">
              Send a message
            </Link>
          </div>
        </Panel>

        <Panel title="Family community">
          <p className="text-sm text-muted-foreground">
            A shared space for Strong Minds families. Every post is reviewed by our founder before
            it goes live, and there is no private parent-to-parent messaging.
          </p>
          <div className="mt-4">
            <Link to="/arena/community" className="btn btn-outline-ink">
              Visit the board
            </Link>
          </div>
        </Panel>

        {isProspect ? (
          <Placeholder>
            Your account is marked as exploring. Once you enroll, your onboarding deadlines and
            program details will fill in automatically.
          </Placeholder>
        ) : null}
      </div>
    </div>
  );
}
