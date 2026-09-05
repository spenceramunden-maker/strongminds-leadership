import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useArena } from "@/hooks/useArena";
import { formatDateTime } from "@/lib/arena";
import { Panel, inputClass, EmptyNote } from "@/components/arena/ui";

export const Route = createFileRoute("/_authenticated/arena/messages")({
  component: MessagesPage,
});

function MessagesPage() {
  const { data } = useArena();
  const familyId = data?.family.id;
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  const thread = useQuery({
    queryKey: ["thread", familyId],
    enabled: Boolean(familyId),
    queryFn: async () => {
      const { data: existing } = await supabase
        .from("message_threads")
        .select("*")
        .eq("family_id", familyId!)
        .maybeSingle();
      if (existing) return existing;
      const { data: created, error } = await supabase
        .from("message_threads")
        .insert({ family_id: familyId! })
        .select("*")
        .single();
      if (error) throw error;
      return created;
    },
  });

  const messages = useQuery({
    queryKey: ["messages", thread.data?.id],
    enabled: Boolean(thread.data?.id),
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("messages")
        .select("*")
        .eq("thread_id", thread.data!.id)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return rows;
    },
    refetchInterval: 20_000,
  });

  if (!data) return null;

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!data || !thread.data) return;
    setBusy(true);
    try {
      const { error } = await supabase.from("messages").insert({
        thread_id: thread.data.id,
        sender_id: data.user.id,
        sender_role: "parent",
        body: body.trim(),
      });
      if (error) throw error;
      await supabase
        .from("message_threads")
        .update({ last_message_at: new Date().toISOString(), status: "Open" })
        .eq("id", thread.data.id);
      setBody("");
      await messages.refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "We could not send that message.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Panel
        title={`Messages with ${data.family.poc_name}`}
        description="A private line between your family and your Strong Minds point of contact. Parents cannot message each other here."
      >
        {messages.data && messages.data.length > 0 ? (
          <ul className="space-y-4">
            {messages.data.map((m) => {
              const mine = m.sender_id === data.user.id;
              return (
                <li key={m.id} className={mine ? "text-right" : "text-left"}>
                  <div
                    className={
                      mine
                        ? "inline-block max-w-[85%] rounded-lg bg-secondary px-4 py-3 text-left text-sm text-secondary-foreground"
                        : "inline-block max-w-[85%] rounded-lg bg-muted px-4 py-3 text-sm text-foreground"
                    }
                  >
                    <p className="whitespace-pre-line leading-relaxed">{m.body}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {mine ? "You" : "Strong Minds"} · {formatDateTime(m.created_at)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyNote>
            No messages yet. Ask us anything — schedules, payments, how your student is settling in.
          </EmptyNote>
        )}

        <form onSubmit={send} className="mt-6 space-y-3">
          <textarea
            className={inputClass}
            rows={4}
            required
            placeholder="Write your message…"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button className="btn btn-gold disabled:opacity-60" disabled={busy || !body.trim()}>
            {busy ? "Sending…" : "Send message"}
          </button>
        </form>
      </Panel>
    </div>
  );
}
