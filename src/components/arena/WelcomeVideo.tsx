import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toEmbedUrl } from "@/lib/videos";

type VideoRow = {
  id: string;
  slot: string;
  title: string;
  kind: string;
  external_url: string | null;
  storage_path: string | null;
  is_active: boolean;
};

/**
 * Plays the active video for a slot (e.g. the founder's welcome video).
 * Renders the placeholder content when nothing is live yet.
 */
export function WelcomeVideo({
  slot,
  placeholder,
}: {
  slot: string;
  placeholder: ReactNode;
}) {
  const video = useQuery({
    queryKey: ["arena_video", slot],
    queryFn: async (): Promise<VideoRow | null> => {
      const { data, error } = await supabase
        .from("videos")
        .select("id, slot, title, kind, external_url, storage_path, is_active")
        .eq("slot", slot)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const row = video.data;

  const fileUrl = useQuery({
    queryKey: ["arena_video_url", row?.id],
    enabled: Boolean(row && row.kind === "file" && row.storage_path),
    staleTime: 30 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from("arena-videos")
        .createSignedUrl(row!.storage_path!, 60 * 60);
      if (error) throw error;
      return data.signedUrl;
    },
  });

  if (video.isLoading) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
        Loading video…
      </div>
    );
  }

  if (!row) return <>{placeholder}</>;

  if (row.kind === "link" && row.external_url) {
    const embed = toEmbedUrl(row.external_url);
    if (embed) {
      return (
        <iframe
          src={embed}
          title={row.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-video w-full rounded-md border border-border bg-black"
        />
      );
    }
    return (
      <a
        href={row.external_url}
        target="_blank"
        rel="noreferrer"
        className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border bg-muted/40 text-center"
      >
        <span className="text-sm font-medium text-foreground">{row.title}</span>
        <span className="text-xs text-muted-foreground">Open the video in a new tab</span>
      </a>
    );
  }

  if (row.kind === "file") {
    if (fileUrl.data) {
      return (
        <video
          controls
          preload="metadata"
          src={fileUrl.data}
          className="aspect-video w-full rounded-md border border-border bg-black"
        />
      );
    }
    if (fileUrl.isError) {
      return (
        <div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
          We could not load this video right now. Please try again shortly.
        </div>
      );
    }
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
        Loading video…
      </div>
    );
  }

  return <>{placeholder}</>;
}
