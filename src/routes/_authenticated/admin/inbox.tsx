import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useArena } from "@/hooks/useArena";
import { formatDateTime } from "@/lib/arena";
import { Panel, EmptyNote, inputClass, StatusPill } from "@/components/arena/ui";

export const Route = createFileRoute("/_authenticated/admin/inbox")({
  component: AdminInbox,
});

function AdminInbox() {
  const { data } = useArena();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);

  const threads = useQuery({
    queryKey: ["admin_threads"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("message_threads")
        .select("*, families(family_name, poc_name)")
        .order("last_message_at", { ascending: false, nullsFirst: false });
      if (error) throw error;
      return rows;
    },
    refetchInterval: 30_000,
  });

  const messages = useQuery({
    queryKey: ["admin_messages", activeId],
    enabled: Boolean(activeId),
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("messages")
        .select("*")
        .eq("thread_id", activeId!)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return rows;
    },
  });

  async function send() {
    if (!data || !activeId || !reply.trim()) return;
    setBusy(true);
    try {
      const { error } = await supabase.from("messages").insert({
        thread_id: activeId,
        sender_id: data.user.id,
        sender_role: "staff",
        body: reply.trim(),
      });
      if (error) throw error;
      await supabase
        .from("message_threads")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", activeId);
      setReply("");
      await messages.refetch();
      await threads.refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Panel title="Conversations">
        {threads.data && threads.data.length > 0 ? (
          <ul className="space-y-2">
            {threads.data.map((t) => {
              const fam = t.families as unknown as { family_name: string } | null;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(t.id)}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                      activeId === t.id ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <span className="block font-medium">{fam?.family_name || "Family"}</span>
                    <span className="block text-xs text-muted-foreground">
                      {t.last_message_at ? formatDateTime(t.last_message_at) : "No messages yet"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyNote>No conversations yet.</EmptyNote>
        )}
      </Panel>

      <Panel title="Thread">
        {activeId ? (
          <>
            <ul className="max-h-[28rem] space-y-4 overflow-y-auto">
              {(messages.data ?? []).map((m) => (
                <li
                  key={m.id}
                  className={m.sender_role === "staff" ? "text-right" : "text-left"}
                >
                  <div
                    className={`inline-block max-w-[85%] rounded-lg px-4 py-3 text-left text-sm ${
                      m.sender_role === "staff" ? "bg-secondary text-secondary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{m.body}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {m.sender_role === "staff" ? "Strong Minds" : "Parent"} ·{" "}
                      {formatDateTime(m.created_at)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-3">
              <textarea
                className={inputClass}
                rows={4}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Reply to this family…"
              />
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="btn btn-gold disabled:opacity-60"
                  disabled={busy || !reply.trim()}
                  onClick={() => void send()}
                >
                  {busy ? "Sending…" : "Send reply"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-ink"
                  onClick={async () => {
                    await supabase.from("message_threads").update({ status: "Closed" }).eq("id", activeId);
                    await threads.refetch();
                    toast.success("Thread closed.");
                  }}
                >
                  Mark resolved
                </button>
                <StatusPill
                  status={threads.data?.find((t) => t.id === activeId)?.status ?? "Open"}
                />
              </div>
            </div>
          </>
        ) : (
          <EmptyNote>Select a conversation on the left.</EmptyNote>
        )}
      </Panel>
    </div>
  );
}
