import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatDateTime } from "@/lib/arena";
import { Panel, EmptyNote, inputClass, Field } from "@/components/arena/ui";

export const Route = createFileRoute("/_authenticated/admin/program")({
  component: AdminProgram,
});

function AdminProgram() {
  const sessions = useQuery({
    queryKey: ["admin_sessions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orientation_sessions")
        .select("*")
        .order("starts_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const registrations = useQuery({
    queryKey: ["admin_registrations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orientation_registrations")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handbooks = useQuery({
    queryKey: ["admin_handbooks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("handbook_versions")
        .select("*")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const signatures = useQuery({
    queryKey: ["admin_signatures"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("handbook_signatures")
        .select("*")
        .order("signed_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <Panel title="Add an orientation date">
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const fd = new FormData(form);
            const { error } = await supabase.from("orientation_sessions").insert({
              title: String(fd.get("title") ?? "Family Orientation"),
              starts_at: new Date(String(fd.get("starts_at"))).toISOString(),
              duration_minutes: Number(fd.get("duration_minutes") || 60),
              format: String(fd.get("format") ?? "Virtual"),
              location_or_link: (fd.get("location_or_link") as string) || null,
              capacity: fd.get("capacity") ? Number(fd.get("capacity")) : null,
              notes: (fd.get("notes") as string) || null,
              is_published: true,
            });
            if (error) toast.error(error.message);
            else {
              form.reset();
              toast.success("Orientation date published.");
              await sessions.refetch();
            }
          }}
        >
          <Field label="Title">
            <input name="title" defaultValue="Family Orientation" className={inputClass} required />
          </Field>
          <Field label="Date and time">
            <input type="datetime-local" name="starts_at" className={inputClass} required />
          </Field>
          <Field label="Length (minutes)">
            <input type="number" name="duration_minutes" defaultValue={60} className={inputClass} />
          </Field>
          <Field label="Format">
            <select name="format" className={inputClass}>
              <option>Virtual</option>
              <option>In person</option>
            </select>
          </Field>
          <Field label="Link or address">
            <input name="location_or_link" className={inputClass} />
          </Field>
          <Field label="Seats (optional)">
            <input type="number" name="capacity" className={inputClass} />
          </Field>
          <Field label="Notes for families">
            <input name="notes" className={inputClass} />
          </Field>
          <div className="sm:col-span-2">
            <button className="btn btn-gold">Publish date</button>
          </div>
        </form>
      </Panel>

      <Panel title="Upcoming orientations">
        {sessions.data && sessions.data.length > 0 ? (
          <ul className="divide-y divide-border">
            {sessions.data.map((s) => {
              const count = (registrations.data ?? []).filter((r) => r.session_id === s.id).length;
              return (
                <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(s.starts_at)} · {s.format} · {count} registered
                    </p>
                  </div>
                  <button
                    className="btn btn-outline-ink"
                    onClick={async () => {
                      await supabase
                        .from("orientation_sessions")
                        .update({ is_published: !s.is_published })
                        .eq("id", s.id);
                      await sessions.refetch();
                    }}
                  >
                    {s.is_published ? "Hide" : "Publish"}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyNote>No orientation dates yet.</EmptyNote>
        )}
      </Panel>

      <Panel
        title="Handbook versions"
        description="Publish the final handbook when it is ready — the placeholder stays live until then."
      >
        <form
          className="mb-6 grid gap-4 sm:grid-cols-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const fd = new FormData(form);
            await supabase.from("handbook_versions").update({ is_current: false }).eq("is_current", true);
            const { error } = await supabase.from("handbook_versions").insert({
              version_label: String(fd.get("version_label")),
              summary: (fd.get("summary") as string) || null,
              external_url: (fd.get("external_url") as string) || null,
              body: (fd.get("body") as string) || null,
              is_current: true,
            });
            if (error) toast.error(error.message);
            else {
              form.reset();
              toast.success("New handbook version is live.");
              await handbooks.refetch();
            }
          }}
        >
          <Field label="Version label">
            <input name="version_label" className={inputClass} required placeholder="2026.1" />
          </Field>
          <Field label="Download link (optional)">
            <input name="external_url" className={inputClass} />
          </Field>
          <Field label="Short summary">
            <input name="summary" className={inputClass} />
          </Field>
          <Field label="Full text (optional)">
            <textarea name="body" rows={4} className={inputClass} />
          </Field>
          <div className="sm:col-span-2">
            <button className="btn btn-gold">Publish handbook version</button>
          </div>
        </form>

        <ul className="divide-y divide-border">
          {(handbooks.data ?? []).map((h) => (
            <li key={h.id} className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{h.version_label}</p>
                <p className="text-xs text-muted-foreground">{formatDateTime(h.published_at)}</p>
              </div>
              {h.is_current ? (
                <span className="text-xs font-medium text-foreground">Current</span>
              ) : null}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Handbook signatures">
        {signatures.data && signatures.data.length > 0 ? (
          <ul className="divide-y divide-border">
            {signatures.data.map((s) => (
              <li key={s.id} className="py-3 text-sm">
                <span className="text-foreground">{s.signed_name}</span>{" "}
                <span className="text-muted-foreground">
                  ({s.relationship}) · {formatDateTime(s.signed_at)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyNote>No signatures yet.</EmptyNote>
        )}
      </Panel>
    </div>
  );
}
