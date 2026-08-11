import { cn } from "@/lib/utils";

/** Converte links do YouTube/Vimeo em URL de incorporação (embed). */
function getEmbedUrl(url: string): string | null {
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

/**
 * Player de vídeo: usa <video> para arquivos diretos (ex.: .mp4 do Blob) e
 * <iframe> para links do YouTube/Vimeo.
 */
export function VideoPlayer({
  src,
  className,
  poster,
}: {
  src: string;
  className?: string;
  poster?: string;
}) {
  const embed = getEmbedUrl(src);

  if (embed) {
    return (
      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black",
          className,
        )}
      >
        <iframe
          src={embed}
          title="Vídeo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <video
      src={src}
      poster={poster}
      controls
      playsInline
      preload="metadata"
      className={cn(
        "max-h-[75vh] w-auto max-w-full rounded-2xl border border-border bg-black",
        className,
      )}
    />
  );
}
