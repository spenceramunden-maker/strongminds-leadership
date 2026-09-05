import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

import { formatDate, daysUntil } from "@/lib/arena";
import { Panel, EmptyNote, StatusPill, inputClass } from "@/components/arena/ui";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminFamilies,
});

function AdminFamilies() {
  const [openId, setOpenId] = useState<string | null>(null);

  const families = useQuery({
    queryKey: ["admin_families"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("families")
        .select("*, profiles!inner(full_name, email, phone), onboarding_tasks(task_key, status)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  type FamilyPatch = Partial<Database["public"]["Tables"]["families"]["Update"]>;
  async function update(id: string, patch: FamilyPatch) {
    const { error } = await supabase.from("families").update(patch).eq("id", id);


    if (error) toast.error(error.message);
    else {
      toast.success("Saved.");
      await families.refetch();
    }
  }

  return (
    <Panel title="Families" description="Every account, their progress, and who is overdue.">
      {families.data && families.data.length > 0 ? (
        <ul className="divide-y divide-border">
          {families.data.map((f) => {
            const profile = f.profiles as unknown as {
              full_name: string;
              email: string;
              phone: string | null;
            } | null;
            const tasks = (f.onboarding_tasks ?? []) as { task_key: string; status: string }[];
            const done = tasks.filter((t) => t.status === "Complete").length;
            const left = daysUntil(f.handbook_due_at);
            const overdue =
              left !== null && left < 0 && !tasks.some((t) => t.task_key === "handbook" && t.status === "Complete");
            return (
              <li key={f.id} className="py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {f.family_name || profile?.full_name || "Family"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {profile?.full_name} · {profile?.email}
                      {profile?.phone ? ` · ${profile.phone}` : ""}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {done}/{tasks.length} onboarding steps ·{" "}
                      {f.handbook_due_at ? `handbook due ${formatDate(f.handbook_due_at)}` : "no handbook deadline set"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusPill status={overdue ? "Overdue" : f.status} />
                    <button
                      type="button"
                      className="btn btn-outline-ink"
                      onClick={() => setOpenId(openId === f.id ? null : f.id)}
                    >
                      {openId === f.id ? "Close" : "Manage"}
                    </button>
                  </div>
                </div>

                {openId === f.id ? (
                  <form
                    className="mt-4 grid gap-4 rounded-md bg-muted/40 p-4 sm:grid-cols-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.currentTarget);
                      void update(f.id, {
                        status: String(fd.get("status") ?? f.status),
                        program: (fd.get("program") as string) || null,
                        poc_name: String(fd.get("poc_name") ?? ""),
                        poc_email: String(fd.get("poc_email") ?? ""),

                        enrolled_at: (fd.get("enrolled_at") as string) || null,
                        first_participation_date: (fd.get("first_participation_date") as string) || null,
                        staff_notes: (fd.get("staff_notes") as string) || null,
                      });
                    }}
                  >
                    <label className="text-sm">
                      <span className="font-medium text-foreground">Status</span>
                      <select name="status" defaultValue={f.status} className={inputClass}>
                        <option>Prospective</option>
                        <option>Enrolled</option>
                        <option>Waitlisted</option>
                        <option>Withdrawn</option>
                      </select>
                    </label>
                    <label className="text-sm">
                      <span className="font-medium text-foreground">Program</span>
                      <input name="program" defaultValue={f.program ?? ""} className={inputClass} />
                    </label>
                    <label className="text-sm">
                      <span className="font-medium text-foreground">Point of contact name</span>
                      <input name="poc_name" defaultValue={f.poc_name} className={inputClass} />
                    </label>
                    <label className="text-sm">
                      <span className="font-medium text-foreground">Point of contact email</span>
                      <input name="poc_email" defaultValue={f.poc_email} className={inputClass} />
                    </label>
                    <label className="text-sm">
                      <span className="font-medium text-foreground">Enrollment date</span>
                      <input
                        type="date"
                        name="enrolled_at"
                        defaultValue={f.enrolled_at ? f.enrolled_at.slice(0, 10) : ""}
                        className={inputClass}
                      />
                    </label>
                    <label className="text-sm">
                      <span className="font-medium text-foreground">First program day</span>
                      <input
                        type="date"
                        name="first_participation_date"
                        defaultValue={f.first_participation_date ?? ""}
                        className={inputClass}
                      />
                    </label>
                    <label className="text-sm sm:col-span-2">
                      <span className="font-medium text-foreground">Internal notes</span>
                      <textarea
                        name="staff_notes"
                        rows={3}
                        defaultValue={f.staff_notes ?? ""}
                        className={inputClass}
                      />
                    </label>
                    <div className="sm:col-span-2">
                      <button className="btn btn-gold">Save family</button>
                    </div>
                  </form>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyNote>No family accounts yet.</EmptyNote>
      )}
    </Panel>
  );
}
