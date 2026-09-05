import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useArena, useRefreshArena, setTaskStatus } from "@/hooks/useArena";
import { formatDate, formatDateTime, daysUntil } from "@/lib/arena";
import {
  Panel,
  Field,
  inputClass,
  EmptyNote,
  Placeholder,
  DocumentLink,
} from "@/components/arena/ui";

export const Route = createFileRoute("/_authenticated/arena/handbook")({
  component: HandbookPage,
});

function HandbookPage() {
  const { data } = useArena();
  const refresh = useRefreshArena();
  const familyId = data?.family.id;
  const [signedName, setSignedName] = useState("");
  const [relationship, setRelationship] = useState("Parent / guardian");
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);

  const handbook = useQuery({
    queryKey: ["handbook_current"],
    queryFn: async () => {
      const { data: row, error } = await supabase
        .from("handbook_versions")
        .select("*")
        .eq("is_current", true)
        .order("published_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return row;
    },
  });

  const signature = useQuery({
    queryKey: ["handbook_signature", familyId, handbook.data?.id],
    enabled: Boolean(familyId && handbook.data?.id),
    queryFn: async () => {
      const { data: row, error } = await supabase
        .from("handbook_signatures")
        .select("*")
        .eq("family_id", familyId!)
        .eq("handbook_version_id", handbook.data!.id)
        .maybeSingle();
      if (error) throw error;
      return row;
    },
  });

  if (!data) return null;

  const due = data.family.handbook_due_at;
  const left = daysUntil(due);

  async function sign(e: React.FormEvent) {
    e.preventDefault();
    if (!data || !handbook.data) return;
    setBusy(true);
    try {
      const { error } = await supabase.from("handbook_signatures").insert({
        family_id: data.family.id,
        handbook_version_id: handbook.data.id,
        signed_by: data.user.id,
        signed_name: signedName.trim(),
        relationship,
        agreed: true,
      });
      if (error) throw error;
      await setTaskStatus(data.family.id, "handbook", "Complete");
      await signature.refetch();
      refresh();
      toast.success("Thank you — your handbook signature is recorded.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "We could not record your signature.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <Panel title="Your signing deadline">
        {due ? (
          <>
            <p className="text-2xl text-foreground">{formatDate(due)}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {left !== null && left >= 0
                ? `${left} day${left === 1 ? "" : "s"} remaining.`
                : "This is past due. Please sign today."}
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Your deadline is set once your enrollment date and first program day are confirmed. You
            are welcome to sign now.
          </p>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          Signature is required by whichever comes first: 14 days after enrollment, or your
          student's third day of program participation.
        </p>
      </Panel>

      <Panel title={handbook.data?.version_label ?? "Family Handbook"}>
        {handbook.data ? (
          <>
            {handbook.data.summary ? (
              <div className="mb-4">
                <Placeholder>{handbook.data.summary}</Placeholder>
              </div>
            ) : null}
            {handbook.data.external_url ? (
              <DocumentLink
                url={handbook.data.external_url}
                className="btn btn-outline-ink mb-4 inline-flex"
              >
                Download the handbook
              </DocumentLink>
            ) : null}
            {handbook.data.body ? (
              <div className="max-h-96 overflow-y-auto whitespace-pre-line rounded-md border border-border bg-background p-4 text-sm leading-relaxed text-muted-foreground">
                {handbook.data.body}
              </div>
            ) : null}
          </>
        ) : (
          <EmptyNote>The current handbook will appear here.</EmptyNote>
        )}
      </Panel>

      <Panel title="Sign the handbook">
        {signature.data ? (
          <p className="text-sm text-foreground">
            Signed by {signature.data.signed_name} on {formatDateTime(signature.data.signed_at)}.
          </p>
        ) : (
          <form onSubmit={sign} className="grid gap-4 sm:grid-cols-2">
            <Field label="Type your full legal name">
              <input
                className={inputClass}
                required
                value={signedName}
                onChange={(e) => setSignedName(e.target.value)}
              />
            </Field>
            <Field label="Your relationship to the student">
              <input
                className={inputClass}
                required
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
              />
            </Field>
            <label className="flex items-start gap-3 text-sm text-muted-foreground sm:col-span-2">
              <input
                type="checkbox"
                className="mt-1"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                I have read the Family Handbook and agree to its terms on behalf of my family. I
                understand this typed name is my electronic signature.
              </span>
            </label>
            <div className="sm:col-span-2">
              <button
                className="btn btn-gold disabled:opacity-60"
                disabled={busy || !agreed || !handbook.data}
              >
                {busy ? "Recording…" : "Sign the handbook"}
              </button>
            </div>
          </form>
        )}
      </Panel>
    </div>
  );
}
