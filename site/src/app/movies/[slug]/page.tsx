import { notFound } from "next/navigation";
import { getMovieBySlug } from "@/data/movies";

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props) {
  const movie = getMovieBySlug(params.slug);
  if (!movie) return {};
  return {
    title: `${movie.title} (${movie.year})`,
    description: movie.description,
    openGraph: {
      title: `${movie.title} (${movie.year})`,
      description: movie.description,
      images: [movie.posterUrl],
    },
  };
}

export default function MovieDetail({ params }: Props) {
  const movie = getMovieBySlug(params.slug);
  if (!movie) return notFound();
  
  // Normalize common YouTube/Vimeo links to embeddable URLs
  const toEmbedUrl = (url: string): { url: string; isEmbed: boolean } => {
    try {
      const u = new URL(url);
      // YouTube watch → embed
      if (u.hostname.includes("youtube.com")) {
        const vid = u.searchParams.get("v");
        if (vid) {
          return { url: `https://www.youtube.com/embed/${vid}?rel=0&modestbranding=1`, isEmbed: true };
        }
        // Already /embed/
        if (u.pathname.startsWith("/embed/")) return { url, isEmbed: true };
      }
      // youtu.be → embed
      if (u.hostname === "youtu.be") {
        const vid = u.pathname.replace("/", "");
        if (vid) {
          return { url: `https://www.youtube.com/embed/${vid}?rel=0&modestbranding=1`, isEmbed: true };
        }
      }
      // Vimeo normal → player
      if (u.hostname.includes("vimeo.com") && !u.hostname.startsWith("player.")) {
        const vid = u.pathname.split("/").filter(Boolean).pop();
        if (vid) {
          return { url: `https://player.vimeo.com/video/${vid}`, isEmbed: true };
        }
      }
      // Vimeo player
      if (u.hostname.startsWith("player.") && u.hostname.includes("vimeo.com")) {
        return { url, isEmbed: true };
      }

      // Google Drive → preview embed
      if (u.hostname.includes("drive.google.com") || u.hostname.includes("docs.google.com")) {
        // Patterns:
        // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
        // https://drive.google.com/uc?export=download&id=FILE_ID
        // https://drive.google.com/open?id=FILE_ID
        let fileId = "";
        const parts = u.pathname.split("/").filter(Boolean);
        const fileIndex = parts.findIndex((p) => p === "file");
        if (fileIndex !== -1 && parts[fileIndex + 1] === "d" && parts[fileIndex + 2]) {
          fileId = parts[fileIndex + 2];
        }
        if (!fileId) {
          fileId = u.searchParams.get("id") || "";
        }
        if (fileId) {
          return { url: `https://drive.google.com/file/d/${fileId}/preview`, isEmbed: true };
        }
      }
    } catch {
      // fall through
    }
    return { url, isEmbed: false };
  };
  const { url: effectiveUrl, isEmbed } = toEmbedUrl(movie.videoUrl);
//frame for movie 
  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-8">
        <div className="w-full md:w-auto md:max-w-sm">
          <div className="rounded-lg overflow-hidden border border-black/10 dark:border-white/10 bg-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={movie.posterUrl} 
              alt={movie.title} 
              className="w-full h-auto object-contain"
              style={{ 
                maxHeight: '600px',
                width: 'auto',
                display: 'block',
                margin: '0 auto'
              }}
            />
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">{movie.title}</h1>
          <p className="opacity-70">{movie.year}{movie.durationMinutes ? ` · ${movie.durationMinutes}m` : ""}</p>
          <p className="mt-4 opacity-90 leading-relaxed">{movie.description}</p>

          <div className="mt-6">
            {isEmbed ? (
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={effectiveUrl}
                  className="absolute inset-0 w-full h-full rounded-lg border border-black/10 dark:border-white/10"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : (
              <video
                src={effectiveUrl}
                controls
                preload="metadata"
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-black"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


