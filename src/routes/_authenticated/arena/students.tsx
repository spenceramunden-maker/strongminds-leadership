import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useArena, useRefreshArena, setTaskStatus } from "@/hooks/useArena";
import { Panel, Field, inputClass, EmptyNote } from "@/components/arena/ui";

export const Route = createFileRoute("/_authenticated/arena/students")({
  component: StudentsPage,
});

type Draft = {
  id?: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  grade: string;
  school: string;
  program: string;
  shirt_size: string;
  allergies: string;
  support_needs: string;
  photo_release: boolean;
};

const blank: Draft = {
  first_name: "",
  last_name: "",
  date_of_birth: "",
  grade: "",
  school: "",
  program: "",
  shirt_size: "",
  allergies: "",
  support_needs: "",
  photo_release: false,
};

function StudentsPage() {
  const { data } = useArena();
  const refresh = useRefreshArena();
  const familyId = data?.family.id;
  const [draft, setDraft] = useState<Draft>(blank);
  const [saving, setSaving] = useState(false);

  const students = useQuery({
    queryKey: ["students", familyId],
    enabled: Boolean(familyId),
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("students")
        .select("*")
        .eq("family_id", familyId!)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return rows;
    },
  });

  if (!data) return null;

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    try {
      const payload = {
        family_id: data.family.id,
        first_name: draft.first_name.trim(),
        last_name: draft.last_name.trim(),
        date_of_birth: draft.date_of_birth || null,
        grade: draft.grade.trim() || null,
        school: draft.school.trim() || null,
        program: draft.program.trim() || null,
        shirt_size: draft.shirt_size.trim() || null,
        allergies: draft.allergies.trim() || null,
        support_needs: draft.support_needs.trim() || null,
        photo_release: draft.photo_release,
      };
      const { error } = draft.id
        ? await supabase.from("students").update(payload).eq("id", draft.id)
        : await supabase.from("students").insert(payload);
      if (error) throw error;
      setDraft(blank);
      await setTaskStatus(data.family.id, "student_info", "Complete");
      await students.refetch();
      refresh();
      toast.success("Student information saved.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "We could not save that.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    await supabase.from("students").delete().eq("id", id);
    await students.refetch();
  }

  return (
    <div className="space-y-6">
      <Panel
        title="Your students"
        description="Add each child enrolling with Strong Minds. You can update this any time."
      >
        {students.data && students.data.length > 0 ? (
          <ul className="divide-y divide-border">
            {students.data.map((s) => (
              <li key={s.id} className="flex flex-wrap items-start justify-between gap-3 py-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {s.first_name} {s.last_name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {[s.grade && `Grade ${s.grade}`, s.school, s.program]
                      .filter(Boolean)
                      .join(" · ") || "No additional details yet"}
                  </p>
                  {s.allergies ? (
                    <p className="mt-1 text-sm text-muted-foreground">Allergies: {s.allergies}</p>
                  ) : null}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-ink"
                    onClick={() =>
                      setDraft({
                        id: s.id,
                        first_name: s.first_name,
                        last_name: s.last_name,
                        date_of_birth: s.date_of_birth ?? "",
                        grade: s.grade ?? "",
                        school: s.school ?? "",
                        program: s.program ?? "",
                        shirt_size: s.shirt_size ?? "",
                        allergies: s.allergies ?? "",
                        support_needs: s.support_needs ?? "",
                        photo_release: s.photo_release,
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-ink"
                    onClick={() => void remove(s.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyNote>No students added yet.</EmptyNote>
        )}
      </Panel>

      <Panel title={draft.id ? "Edit student" : "Add a student"}>
        <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
          <Field label="First name">
            <input
              className={inputClass}
              required
              value={draft.first_name}
              onChange={(e) => setDraft({ ...draft, first_name: e.target.value })}
            />
          </Field>
          <Field label="Last name">
            <input
              className={inputClass}
              required
              value={draft.last_name}
              onChange={(e) => setDraft({ ...draft, last_name: e.target.value })}
            />
          </Field>
          <Field label="Date of birth">
            <input
              className={inputClass}
              type="date"
              value={draft.date_of_birth}
              onChange={(e) => setDraft({ ...draft, date_of_birth: e.target.value })}
            />
          </Field>
          <Field label="Grade">
            <input
              className={inputClass}
              value={draft.grade}
              onChange={(e) => setDraft({ ...draft, grade: e.target.value })}
            />
          </Field>
          <Field label="School">
            <input
              className={inputClass}
              value={draft.school}
              onChange={(e) => setDraft({ ...draft, school: e.target.value })}
            />
          </Field>
          <Field label="Program enrolling in">
            <input
              className={inputClass}
              value={draft.program}
              onChange={(e) => setDraft({ ...draft, program: e.target.value })}
            />
          </Field>
          <Field label="Shirt size">
            <input
              className={inputClass}
              value={draft.shirt_size}
              onChange={(e) => setDraft({ ...draft, shirt_size: e.target.value })}
            />
          </Field>
          <Field label="Allergies or medical notes">
            <input
              className={inputClass}
              value={draft.allergies}
              onChange={(e) => setDraft({ ...draft, allergies: e.target.value })}
            />
          </Field>
          <Field
            label="Support needs"
            hint="Anything that helps our team support your student well."
          >
            <textarea
              className={inputClass}
              rows={3}
              value={draft.support_needs}
              onChange={(e) => setDraft({ ...draft, support_needs: e.target.value })}
            />
          </Field>
          <label className="flex items-start gap-3 text-sm text-muted-foreground sm:col-span-2">
            <input
              type="checkbox"
              className="mt-1"
              checked={draft.photo_release}
              onChange={(e) => setDraft({ ...draft, photo_release: e.target.checked })}
            />
            <span>
              I give permission for photos or video of my student taken during programming to be
              used in Strong Minds materials.
            </span>
          </label>
          <div className="flex gap-3 sm:col-span-2">
            <button className="btn btn-gold disabled:opacity-60" disabled={saving}>
              {saving ? "Saving…" : draft.id ? "Update student" : "Add student"}
            </button>
            {draft.id ? (
              <button type="button" className="btn btn-outline-ink" onClick={() => setDraft(blank)}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </Panel>
    </div>
  );
}
