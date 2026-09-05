import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useArena, useRefreshArena, setTaskStatus } from "@/hooks/useArena";
import { Panel, Field, inputClass, EmptyNote } from "@/components/arena/ui";

export const Route = createFileRoute("/_authenticated/arena/family")({
  component: FamilyPage,
});

type ContactDraft = {
  id?: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  is_authorized_pickup: boolean;
};

const blankContact: ContactDraft = {
  name: "",
  relationship: "",
  phone: "",
  email: "",
  is_authorized_pickup: false,
};

function FamilyPage() {
  const { data } = useArena();
  const refresh = useRefreshArena();
  const familyId = data?.family.id;

  const [form, setForm] = useState({
    family_name: "",
    full_name: "",
    phone: "",
    sms_opt_in: false,
    preferred_contact: "Email",
    mailing_address: "",
    city: "",
    state: "",
    postal_code: "",
  });
  const [savingInfo, setSavingInfo] = useState(false);
  const [draft, setDraft] = useState<ContactDraft>(blankContact);
  const [savingContact, setSavingContact] = useState(false);

  useEffect(() => {
    if (!data) return;
    setForm({
      family_name: data.family.family_name ?? "",
      full_name: data.profile.full_name ?? "",
      phone: data.profile.phone ?? "",
      sms_opt_in: data.profile.sms_opt_in ?? false,
      preferred_contact: data.profile.preferred_contact ?? "Email",
      mailing_address: data.family.mailing_address ?? "",
      city: data.family.city ?? "",
      state: data.family.state ?? "",
      postal_code: data.family.postal_code ?? "",
    });
  }, [data]);

  const contacts = useQuery({
    queryKey: ["emergency_contacts", familyId],
    enabled: Boolean(familyId),
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("emergency_contacts")
        .select("*")
        .eq("family_id", familyId!)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return rows;
    },
  });

  if (!data) return null;

  async function saveInfo(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSavingInfo(true);
    try {
      const [{ error: pErr }, { error: fErr }] = await Promise.all([
        supabase
          .from("profiles")
          .update({
            full_name: form.full_name.trim(),
            phone: form.phone.trim() || null,
            sms_opt_in: form.sms_opt_in,
            preferred_contact: form.preferred_contact,
          })
          .eq("id", data.user.id),
        supabase
          .from("families")
          .update({
            family_name: form.family_name.trim(),
            mailing_address: form.mailing_address.trim() || null,
            city: form.city.trim() || null,
            state: form.state.trim() || null,
            postal_code: form.postal_code.trim() || null,
          })
          .eq("id", data.family.id),
      ]);
      if (pErr) throw pErr;
      if (fErr) throw fErr;

      const complete =
        form.full_name.trim() && form.phone.trim() && form.mailing_address.trim() && form.city.trim();
      await setTaskStatus(data.family.id, "parent_contact", complete ? "Complete" : "In progress");
      refresh();
      toast.success("Contact information saved.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "We could not save that.");
    } finally {
      setSavingInfo(false);
    }
  }

  async function saveContact(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSavingContact(true);
    try {
      const payload = {
        family_id: data.family.id,
        name: draft.name.trim(),
        relationship: draft.relationship.trim(),
        phone: draft.phone.trim(),
        email: draft.email.trim() || null,
        is_authorized_pickup: draft.is_authorized_pickup,
      };
      const { error } = draft.id
        ? await supabase.from("emergency_contacts").update(payload).eq("id", draft.id)
        : await supabase.from("emergency_contacts").insert(payload);
      if (error) throw error;
      setDraft(blankContact);
      const { data: rows } = await supabase
        .from("emergency_contacts")
        .select("id")
        .eq("family_id", data.family.id);
      await setTaskStatus(
        data.family.id,
        "emergency_contacts",
        (rows?.length ?? 0) >= 2 ? "Complete" : "In progress",
      );
      await contacts.refetch();
      refresh();
      toast.success("Emergency contact saved.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "We could not save that contact.");
    } finally {
      setSavingContact(false);
    }
  }

  async function removeContact(id: string) {
    await supabase.from("emergency_contacts").delete().eq("id", id);
    await contacts.refetch();
    refresh();
  }

  return (
    <div className="space-y-6">
      <Panel
        title="Parent and guardian details"
        description="How we reach you, and where we send anything by mail."
      >
        <form onSubmit={saveInfo} className="grid gap-4 sm:grid-cols-2">
          <Field label="Family name">
            <input
              className={inputClass}
              value={form.family_name}
              onChange={(e) => setForm({ ...form, family_name: e.target.value })}
            />
          </Field>
          <Field label="Your full name">
            <input
              className={inputClass}
              required
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            />
          </Field>
          <Field label="Mobile phone">
            <input
              className={inputClass}
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </Field>
          <Field label="Preferred way to reach you">
            <select
              className={inputClass}
              value={form.preferred_contact}
              onChange={(e) => setForm({ ...form, preferred_contact: e.target.value })}
            >
              <option>Email</option>
              <option>Text message</option>
              <option>Phone call</option>
            </select>
          </Field>
          <Field label="Mailing address">
            <input
              className={inputClass}
              value={form.mailing_address}
              onChange={(e) => setForm({ ...form, mailing_address: e.target.value })}
            />
          </Field>
          <Field label="City">
            <input
              className={inputClass}
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </Field>
          <Field label="State">
            <input
              className={inputClass}
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
          </Field>
          <Field label="ZIP code">
            <input
              className={inputClass}
              value={form.postal_code}
              onChange={(e) => setForm({ ...form, postal_code: e.target.value })}
            />
          </Field>
          <label className="flex items-start gap-3 text-sm text-muted-foreground sm:col-span-2">
            <input
              type="checkbox"
              className="mt-1"
              checked={form.sms_opt_in}
              onChange={(e) => setForm({ ...form, sms_opt_in: e.target.checked })}
            />
            <span>
              Text me program reminders and time-sensitive updates. Message and data rates may
              apply.
            </span>
          </label>
          <div className="sm:col-span-2">
            <button className="btn btn-gold disabled:opacity-60" disabled={savingInfo}>
              {savingInfo ? "Saving…" : "Save details"}
            </button>
          </div>
        </form>
      </Panel>

      <Panel
        title="Emergency contacts"
        description="Please add at least two people we can reach if we cannot reach you."
      >
        {contacts.data && contacts.data.length > 0 ? (
          <ul className="mb-6 divide-y divide-border">
            {contacts.data.map((c) => (
              <li key={c.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {c.name} · {c.relationship}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {c.phone}
                    {c.email ? ` · ${c.email}` : ""}
                    {c.is_authorized_pickup ? " · authorized for pickup" : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-ink"
                    onClick={() =>
                      setDraft({
                        id: c.id,
                        name: c.name,
                        relationship: c.relationship,
                        phone: c.phone,
                        email: c.email ?? "",
                        is_authorized_pickup: c.is_authorized_pickup,
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-ink"
                    onClick={() => void removeContact(c.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mb-6">
            <EmptyNote>No emergency contacts yet.</EmptyNote>
          </div>
        )}

        <form onSubmit={saveContact} className="grid gap-4 sm:grid-cols-2">
          <Field label="Name">
            <input
              className={inputClass}
              required
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
          </Field>
          <Field label="Relationship to student">
            <input
              className={inputClass}
              required
              value={draft.relationship}
              onChange={(e) => setDraft({ ...draft, relationship: e.target.value })}
            />
          </Field>
          <Field label="Phone">
            <input
              className={inputClass}
              required
              type="tel"
              value={draft.phone}
              onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
            />
          </Field>
          <Field label="Email (optional)">
            <input
              className={inputClass}
              type="email"
              value={draft.email}
              onChange={(e) => setDraft({ ...draft, email: e.target.value })}
            />
          </Field>
          <label className="flex items-center gap-3 text-sm text-muted-foreground sm:col-span-2">
            <input
              type="checkbox"
              checked={draft.is_authorized_pickup}
              onChange={(e) => setDraft({ ...draft, is_authorized_pickup: e.target.checked })}
            />
            <span>This person is authorized to pick up my student.</span>
          </label>
          <div className="flex gap-3 sm:col-span-2">
            <button className="btn btn-gold disabled:opacity-60" disabled={savingContact}>
              {draft.id ? "Update contact" : "Add contact"}
            </button>
            {draft.id ? (
              <button
                type="button"
                className="btn btn-outline-ink"
                onClick={() => setDraft(blankContact)}
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </Panel>
    </div>
  );
}
