export const WELCOME_VIDEO_SLOT = "welcome_video";

/**
 * Converts a pasted video link into an embeddable player URL.
 * Returns null when the URL is not a recognizable YouTube, Vimeo,
 * or Google Drive link.
 */
export function toEmbedUrl(rawUrl: string): string | null {
  let url: URL;
  try {
    url = new URL(rawUrl.trim());
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "");

  // YouTube: watch?v=ID, youtu.be/ID, /shorts/ID, /embed/ID
  if (host === "youtube.com" || host === "m.youtube.com" || host === "youtu.be") {
    const id =
      host === "youtu.be"
        ? url.pathname.slice(1)
        : url.searchParams.get("v") ??
          url.pathname.match(/\/(shorts|embed|live)\/([^/?]+)/)?.[2];
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }

  // Vimeo: vimeo.com/ID
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const id = url.pathname.match(/\/(\d+)/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}` : null;
  }

  // Google Drive: /file/d/ID/view (or already a /preview link)
  if (host === "drive.google.com") {
    const id = url.pathname.match(/\/file\/d\/([^/]+)/)?.[1];
    return id ? `https://drive.google.com/file/d/${id}/preview` : null;
  }

  return null;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
