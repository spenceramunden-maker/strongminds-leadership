import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useArena } from "@/hooks/useArena";
import { formatDateTime } from "@/lib/arena";
import { Panel, Field, inputClass, EmptyNote, StatusPill, Placeholder } from "@/components/arena/ui";

export const Route = createFileRoute("/_authenticated/arena/community")({
  component: CommunityPage,
});

const TOPICS = [
  "General",
  "New family questions",
  "Schedules and logistics",
  "Celebrating our students",
  "Parenting and support",
];

function CommunityPage() {
  const { data } = useArena();
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]!);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [replyFor, setReplyFor] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");

  const posts = useQuery({
    queryKey: ["board_posts"],
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
    queryKey: ["board_replies"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("board_replies")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return rows;
    },
  });

  if (!data) return null;

  async function post(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setBusy(true);
    try {
      const { error } = await supabase.from("board_posts").insert({
        author_id: data.user.id,
        author_display_name: data.profile.display_name || "Strong Minds Family",
        topic,
        title: title.trim(),
        body: body.trim(),
      });
      if (error) throw error;
      setTitle("");
      setBody("");
      await posts.refetch();
      toast.success("Posted — our founder will review it before it goes live.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "We could not post that.");
    } finally {
      setBusy(false);
    }
  }

  async function sendReply(postId: string) {
    if (!data || !replyBody.trim()) return;
    const { error } = await supabase.from("board_replies").insert({
      post_id: postId,
      author_id: data.user.id,
      author_display_name: data.profile.display_name || "Strong Minds Family",
      body: replyBody.trim(),
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    setReplyBody("");
    setReplyFor(null);
    await replies.refetch();
    toast.success("Reply submitted for review.");
  }

  async function report(postId: string) {
    const reason = window.prompt("What would you like our founder to look at?");
    if (!reason || !data) return;
    const { error } = await supabase
      .from("post_reports")
      .insert({ reporter_id: data.user.id, post_id: postId, reason });
    if (error) toast.error(error.message);
    else toast.success("Thank you. Our founder has been notified.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        {posts.data && posts.data.length > 0 ? (
          posts.data.map((p) => {
            const mine = p.author_id === data.user.id;
            const postReplies = (replies.data ?? []).filter((r) => r.post_id === p.id);
            return (
              <Panel key={p.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="eyebrow mb-1">{p.topic}</p>
                    <h2 className="text-lg text-foreground">{p.title}</h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {p.author_display_name} · {formatDateTime(p.created_at)}
                    </p>
                  </div>
                  {p.status !== "Approved" ? <StatusPill status={p.status} /> : null}
                </div>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
                {p.status === "Pending" && mine ? (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Only you can see this until our founder approves it.
                  </p>
                ) : null}
                {p.status === "Rejected" && mine && p.moderation_note ? (
                  <p className="mt-3 text-xs text-destructive">Note from our team: {p.moderation_note}</p>
                ) : null}

                {postReplies.length > 0 ? (
                  <ul className="mt-5 space-y-3 border-t border-border pt-4">
                    {postReplies.map((r) => (
                      <li key={r.id} className="rounded-md bg-muted/50 px-4 py-3">
                        <p className="text-sm leading-relaxed text-foreground">{r.body}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {r.author_display_name} · {formatDateTime(r.created_at)}
                          {r.status !== "Approved" ? " · awaiting review" : ""}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {p.status === "Approved" ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="btn btn-outline-ink"
                      onClick={() => setReplyFor(replyFor === p.id ? null : p.id)}
                    >
                      Reply
                    </button>
                    <button
                      type="button"
                      className="text-xs text-muted-foreground underline underline-offset-4"
                      onClick={() => void report(p.id)}
                    >
                      Report to founder
                    </button>
                  </div>
                ) : null}

                {replyFor === p.id ? (
                  <div className="mt-4 space-y-3">
                    <textarea
                      className={inputClass}
                      rows={3}
                      value={replyBody}
                      onChange={(e) => setReplyBody(e.target.value)}
                      placeholder="Your reply will be reviewed before it appears."
                    />
                    <button
                      type="button"
                      className="btn btn-gold"
                      onClick={() => void sendReply(p.id)}
                    >
                      Submit reply
                    </button>
                  </div>
                ) : null}
              </Panel>
            );
          })
        ) : (
          <EmptyNote>No posts yet. Be the first to say hello.</EmptyNote>
        )}
      </div>

      <div className="space-y-6">
        <Panel title="Start a conversation">
          <form onSubmit={post} className="space-y-4">
            <Field label="Topic">
              <select
                className={inputClass}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              >
                {TOPICS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Title">
              <input
                className={inputClass}
                required
                minLength={3}
                maxLength={140}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <Field label="Your post">
              <textarea
                className={inputClass}
                rows={5}
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Field>
            <button className="btn btn-gold w-full disabled:opacity-60" disabled={busy}>
              {busy ? "Posting…" : "Submit for review"}
            </button>
          </form>
        </Panel>

        <Placeholder>
          How this space works: every post and reply is read by our founder before it appears. You
          are shown as {data.profile.display_name || "your first name and last initial"}. There is
          no private parent-to-parent messaging — anything that needs our team goes through
          Messages.
        </Placeholder>
      </div>
    </div>
  );
}
