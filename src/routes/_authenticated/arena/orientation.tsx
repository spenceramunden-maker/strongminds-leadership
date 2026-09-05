import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useArena, useRefreshArena, setTaskStatus } from "@/hooks/useArena";
import { formatDateTime } from "@/lib/arena";
import { Panel, EmptyNote, Placeholder, StatusPill, inputClass } from "@/components/arena/ui";

export const Route = createFileRoute("/_authenticated/arena/orientation")({
  component: OrientationPage,
});

function OrientationPage() {
  const { data } = useArena();
  const refresh = useRefreshArena();
  const familyId = data?.family.id;
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const sessions = useQuery({
    queryKey: ["orientation_sessions"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("orientation_sessions")
        .select("*")
        .eq("is_published", true)
        .gte("starts_at", new Date().toISOString())
        .order("starts_at", { ascending: true });
      if (error) throw error;
      return rows;
    },
  });

  const registrations = useQuery({
    queryKey: ["orientation_registrations", familyId],
    enabled: Boolean(familyId),
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("orientation_registrations")
        .select("*, orientation_sessions(title, starts_at, format, location_or_link)")
        .eq("family_id", familyId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return rows;
    },
  });

  const resources = useQuery({
    queryKey: ["orientation_resources"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("orientation_resources")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return rows;
    },
  });

  const completions = useQuery({
    queryKey: ["resource_completions", familyId],
    enabled: Boolean(familyId),
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("resource_completions")
        .select("*")
        .eq("family_id", familyId!);
      if (error) throw error;
      return rows;
    },
  });

  if (!data) return null;

  async function request(sessionId: string | null) {
    if (!data) return;
    setBusy(true);
    try {
      const { error } = await supabase.from("orientation_registrations").insert({
        family_id: data.family.id,
        session_id: sessionId,
        mode: sessionId ? "Live session" : "Needs a date",
        note: note.trim() || null,
      });
      if (error) throw error;
      setNote("");
      await setTaskStatus(data.family.id, "orientation", "In progress");
      await registrations.refetch();
      refresh();
      toast.success("Your orientation request is in. We will confirm by email.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "We could not send that request.");
    } finally {
      setBusy(false);
    }
  }

  async function toggleResource(resourceId: string, done: boolean) {
    if (!data) return;
    if (done) {
      await supabase
        .from("resource_completions")
        .delete()
        .eq("family_id", data.family.id)
        .eq("resource_id", resourceId);
    } else {
      await supabase
        .from("resource_completions")
        .insert({ family_id: data.family.id, resource_id: resourceId });
    }
    const { data: rows } = await completions.refetch();
    const required = (resources.data ?? []).filter((r) => r.is_required);
    const doneIds = new Set((rows ?? []).map((r) => r.resource_id));
    const allDone = required.length > 0 && required.every((r) => doneIds.has(r.id));
    await setTaskStatus(data.family.id, "orientation", allDone ? "Complete" : "In progress");
    refresh();
  }

  const doneIds = new Set((completions.data ?? []).map((r) => r.resource_id));

  return (
    <div className="space-y-6">
      <Panel title="Welcome video">
        <div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-border bg-muted/40 px-6 text-center text-sm text-muted-foreground">
          Our founder's welcome video is in final production. Until it is posted, please schedule a
          live orientation below — we will walk you through everything in person.
        </div>
      </Panel>

      <Panel
        title="Live orientation"
        description="Orientation is required before your student's first program day."
      >
        {registrations.data && registrations.data.length > 0 ? (
          <ul className="mb-6 divide-y divide-border">
            {registrations.data.map((r) => {
              const s = r.orientation_sessions as {
                title: string;
                starts_at: string;
                format: string;
                location_or_link: string | null;
              } | null;
              return (
                <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {s ? s.title : "Orientation date requested"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {s
                        ? `${formatDateTime(s.starts_at)} · ${s.format}`
                        : "We will email you as soon as the next date is set."}
                    </p>
                  </div>
                  <StatusPill status={r.status} />
                </li>
              );
            })}
          </ul>
        ) : null}

        {sessions.data && sessions.data.length > 0 ? (
          <ul className="divide-y divide-border">
            {sessions.data.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDateTime(s.starts_at)} · {s.format}
                    {s.location_or_link ? ` · ${s.location_or_link}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={busy}
                  className="btn btn-gold disabled:opacity-60"
                  onClick={() => void request(s.id)}
                >
                  Request this date
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="space-y-4">
            <Placeholder>
              Live orientation dates for the next cycle are being finalized. Ask to be added to the
              next one and we will email you the moment it is scheduled.
            </Placeholder>
            <textarea
              className={inputClass}
              rows={3}
              placeholder="Optional: days or times that work best for your family"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button
              type="button"
              disabled={busy}
              className="btn btn-gold disabled:opacity-60"
              onClick={() => void request(null)}
            >
              Add me to the next orientation
            </button>
          </div>
        )}
      </Panel>

      <Panel
        title="Orientation materials"
        description="Work through these during orientation and mark each one done."
      >
        {resources.data && resources.data.length > 0 ? (
          <ul className="divide-y divide-border">
            {resources.data.map((r) => {
              const done = doneIds.has(r.id);
              return (
                <li key={r.id} className="flex flex-wrap items-start justify-between gap-3 py-4">
                  <div className="max-w-2xl">
                    <p className="text-sm font-semibold text-foreground">
                      {r.title}
                      {r.is_required ? " · required" : ""}
                    </p>
                    {r.description ? (
                      <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
                    ) : null}
                    {r.external_url ? (
                      <a
                        href={r.external_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-block text-sm underline underline-offset-4"
                      >
                        Open document
                      </a>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    className={done ? "btn btn-outline-ink" : "btn btn-gold"}
                    onClick={() => void toggleResource(r.id, done)}
                  >
                    {done ? "Mark not done" : "Mark done"}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyNote>Orientation materials will appear here.</EmptyNote>
        )}
      </Panel>
    </div>
  );
}
