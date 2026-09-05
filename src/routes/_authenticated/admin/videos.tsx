import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatDateTime } from "@/lib/arena";
import { WELCOME_VIDEO_SLOT, toEmbedUrl } from "@/lib/videos";
import { Panel, EmptyNote, inputClass, Field } from "@/components/arena/ui";

export const Route = createFileRoute("/_authenticated/admin/videos")({
  component: AdminVideos,
});

const MAX_BYTES = 500 * 1024 * 1024; // 500 MB, matches the bucket limit

type VideoRow = {
  id: string;
  slot: string;
  title: string;
  kind: string;
  external_url: string | null;
  storage_path: string | null;
  is_active: boolean;
  created_at: string;
};

function AdminVideos() {
  const videos = useQuery({
    queryKey: ["admin_videos", WELCOME_VIDEO_SLOT],
    queryFn: async (): Promise<VideoRow[]> => {
      const { data, error } = await supabase
        .from("videos")
        .select("id, slot, title, kind, external_url, storage_path, is_active, created_at")
        .eq("slot", WELCOME_VIDEO_SLOT)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  /** Activates the new row and retires every other video in the slot. */
  async function activateOnly(newId: string) {
    await supabase.from("videos").update({ is_active: false }).eq("slot", WELCOME_VIDEO_SLOT);
    await supabase.from("videos").update({ is_active: true }).eq("id", newId);
hment  }

  async function makeLive(id: string) {
    await supabase.from("videos").update({ is_active: false }).eq("slot", WELCOME_VIDEO_SLOT);
    const { error } = await supabase.from("videos").update({ is_active: true }).eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("That video is now live for families.");
      await videos.refetch();
    }
  }

  async function retire(id: string) {
    const { error } = await supabase.from("videos").update({ is_active: false }).eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Video retired. Families see the placeholder again.");
      await videos.refetch();
    }
  }

  async function remove(id: string, kind: string, storagePath: string | null) {
    if (kind === "file" && storagePath) {
      const { error: rmError } = await supabase.storage
        .from("arena-videos")
        .remove([storagePath]);
      if (rmError) {
        toast.error(rmError.message);
        return;
      }
    }
    const { error } = await supabase.from("videos").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Video deleted.");
      await videos.refetch();
    }
  }

  return (
    <div className="space-y-6">
      <Panel
        title="Welcome video"
        description="The video families see on their Arena dashboard and orientation page. Upload a file or paste a link — whichever is live is what they watch."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const fd = new FormData(form);
              const file = fd.get("file") as File | null;
              const title = String(fd.get("title") ?? "").trim();
              if (!file || file.size === 0) {
                toast.error("Choose a video file first.");
                return;
              }
              if (file.size > MAX_BYTES) {
                toast.error("That file is larger than 500 MB. Please use a video link instead.");
                return;
              }
              const path = `welcome/${Date.now()}-${file.name.replace(/[^\w.-]+/g, "-")}`;
              const { error: upError } = await supabase.storage
                .from("arena-videos")
                .upload(path, file, { contentType: file.type || "video/mp4" });
              if (upError) {
                toast.error(upError.message);
                return;
              }
              const { data: userData } = await supabase.auth.getUser();
              const { data: inserted, error } = await supabase
                .from("videos")
                .insert({
                  slot: WELCOME_VIDEO_SLOT,
                  title: title || "Welcome video",
                  kind: "file",
                  storage_path: path,
                  is_active: false,
                  created_by: userData?.user?.id ?? null,
                })
                .select("id")
                .single();
              if (error || !inserted) {
                toast.error(error?.message ?? "We could not save that video.");
                return;
              }
              await activateOnly(inserted.id);
              toast.success("Video uploaded and live for families.");
              form.reset();
              await videos.refetch();
            }}
          >
            <Field label="Title">
              <input name="title" placeholder="Welcome to Strong Minds" className={inputClass} />
            </Field>
            <Field label="Video file (MP4, up to 500 MB)">
              <input type="file" name="file" accept="video/*" className={inputClass} required />
            </Field>
            <div>
              <button className="btn btn-gold">Upload and make live</button>
              <p className="mt-2 text-xs text-muted-foreground">
                Larger files may take a minute to upload — keep this tab open until you see the
                confirmation.
              </p>
            </div>
          </form>

          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const fd = new FormData(form);
              const url = String(fd.get("external_url") ?? "").trim();
              const title = String(fd.get("title") ?? "").trim();
              if (!url) {
                toast.error("Paste a video link first.");
                return;
              }
              if (!toEmbedUrl(url) && !/\.(mp4|webm|mov)(\?|$)/i.test(url)) {
                toast.error(
                  "That does not look like a YouTube, Vimeo, Google Drive, or direct video link.",
                );
                return;
              }
              const { data: userData } = await supabase.auth.getUser();
              const { data: inserted, error } = await supabase
                .from("videos")
                .insert({
                  slot: WELCOME_VIDEO_SLOT,
                  title: title || "Welcome video",
                  kind: "link",
                  external_url: url,
                  is_active: false,
                  created_by: userData?.user?.id ?? null,
                })
                .select("id")
                .single();
              if (error || !inserted) {
                toast.error(error?.message ?? "We could not save that link.");
                return;
              }
              await activateOnly(inserted.id);
              toast.success("Video link is live for families.");
              form.reset();
              await videos.refetch();
            }}
          >
            <Field label="Title">
              <input name="title" placeholder="Welcome to Strong Minds" className={inputClass} />
            </Field>
            <Field label="Video link (YouTube, Vimeo, Google Drive, or direct MP4)">
              <input
                name="external_url"
                placeholder="https://youtube.com/watch?v=…"
                className={inputClass}
                required
              />
            </Field>
            <div>
              <button className="btn btn-outline-ink">Publish link</button>
              <p className="mt-2 text-xs text-muted-foreground">
                YouTube and Vimeo links play right on the page. Any video can be swapped or retired
                below at any time.
              </p>
            </div>
          </form>
        </div>
      </Panel>

      <Panel title="Video history" description="Only one video is live at a time.">
        {videos.data && videos.data.length > 0 ? (
          <ul className="divide-y divide-border">
            {videos.data.map((v) => (
              <li key={v.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {v.title}
                    {v.is_active ? (
                      <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                        Live
                      </span>
                    ) : null}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {v.kind === "file" ? "Uploaded file" : "Link"} · added{" "}
                    {formatDateTime(v.created_at)}
                    {v.kind === "link" && v.external_url ? ` · ${v.external_url}` : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!v.is_active ? (
                    <button className="btn btn-outline-ink" onClick={() => makeLive(v.id)}>
                      Make live
                    </button>
                  ) : (
                    <button className="btn btn-outline-ink" onClick={() => retire(v.id)}>
                      Retire
                    </button>
                  )}
                  <button
                    className="btn btn-outline-ink"
                    onClick={() => {
                      if (confirm("Delete this video permanently?")) {
                        void remove(v.id, v.kind, v.storage_path);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyNote>No videos yet. Families currently see the placeholder message.</EmptyNote>
        )}
      </Panel>
    </div>
  );
}
