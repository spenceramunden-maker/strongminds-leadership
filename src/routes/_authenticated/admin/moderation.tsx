import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useArena } from "@/hooks/useArena";
import { formatDateTime } from "@/lib/arena";
import { Panel, EmptyNote, StatusPill } from "@/components/arena/ui";

export const Route = createFileRoute("/_authenticated/admin/moderation")({
  component: AdminModeration,
});

function AdminModeration() {
  const { data } = useArena();

  const posts = useQuery({
    queryKey: ["mod_posts"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("board_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return rows;
    },
  });

  const replies = useQuery({
    queryKey: ["mod_replies"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("board_replies")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return rows;
    },
  });

  const reports = useQuery({
    queryKey: ["mod_reports"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("post_reports")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return rows;
    },
  });

  async function decide(
    table: "board_posts" | "board_replies",
    id: string,
    status: "Approved" | "Rejected",
  ) {
    if (!data) return;
    const note =
      status === "Rejected" ? window.prompt("Optional note for the parent:") ?? null : null;
    const patch = {
      status,
      approved_by: data.user.id,
      approved_at: new Date().toISOString(),
      moderation_note: note,
    };

    const { error } =
      table === "board_posts"
        ? await supabase.from("board_posts").update(patch).eq("id", id)
        : await supabase.from("board_replies").update(patch).eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(status === "Approved" ? "Published." : "Rejected.");
    await posts.refetch();
    await replies.refetch();
  }

  const pendingPosts = (posts.data ?? []).filter((p) => p.status === "Pending");
  const pendingReplies = (replies.data ?? []).filter((r) => r.status === "Pending");

  return (
    <div className="space-y-6">
      <Panel
        title="Posts awaiting your approval"
        description="Nothing appears on the parent board until you approve it."
      >
        {pendingPosts.length > 0 ? (
          <ul className="divide-y divide-border">
            {pendingPosts.map((p) => (
              <li key={p.id} className="py-4">
                <p className="eyebrow mb-1">{p.topic}</p>
                <h3 className="text-base text-foreground">{p.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {p.author_display_name} · {formatDateTime(p.created_at)}
                </p>
                <p className="mt-3 whitespace-pre-line text-sm text-muted-foreground">{p.body}</p>
                <div className="mt-3 flex gap-3">
                  <button className="btn btn-gold" onClick={() => void decide("board_posts", p.id, "Approved")}>
                    Approve
                  </button>
                  <button
                    className="btn btn-outline-ink"
                    onClick={() => void decide("board_posts", p.id, "Rejected")}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyNote>No posts waiting.</EmptyNote>
        )}
      </Panel>

      <Panel title="Replies awaiting your approval">
        {pendingReplies.length > 0 ? (
          <ul className="divide-y divide-border">
            {pendingReplies.map((r) => (
              <li key={r.id} className="py-4">
                <p className="text-sm text-foreground">{r.body}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {r.author_display_name} · {formatDateTime(r.created_at)}
                </p>
                <div className="mt-3 flex gap-3">
                  <button className="btn btn-gold" onClick={() => void decide("board_replies", r.id, "Approved")}>
                    Approve
                  </button>
                  <button
                    className="btn btn-outline-ink"
                    onClick={() => void decide("board_replies", r.id, "Rejected")}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyNote>No replies waiting.</EmptyNote>
        )}
      </Panel>

      <Panel title="Reports from families">
        {reports.data && reports.data.length > 0 ? (
          <ul className="divide-y divide-border">
            {reports.data.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm text-foreground">{r.reason}</p>
                  <p className="text-xs text-muted-foreground">{formatDateTime(r.created_at)}</p>
                </div>
                <StatusPill status={r.status} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyNote>No reports.</EmptyNote>
        )}
      </Panel>
    </div>
  );
}
