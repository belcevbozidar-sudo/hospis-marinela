import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Loader2 } from "lucide-react";

type NewsSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("bg-BG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NewsListPage() {
  const [news, setNews] = useState<NewsSummary[] | null>(null);

  useEffect(() => {
    document.title = 'Новини | Хоспис "Маринела"';
    fetch("/api/news")
      .then((r) => r.json())
      .then((d) => setNews(d.news ?? []))
      .catch(() => setNews([]));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold mb-2">Новини</h1>
      <p className="text-muted-foreground mb-10">
        Актуална информация и новини от Хоспис „Маринела“.
      </p>

      {news === null && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> Зареждане...
        </div>
      )}

      {news !== null && news.length === 0 && (
        <p className="text-muted-foreground">Все още няма публикувани новини.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {news?.map((item) => (
          <Link
            key={item.id}
            to={`/news/${item.slug}`}
            className="group rounded-xl border bg-background/80 backdrop-blur overflow-hidden hover:shadow-md transition-shadow"
          >
            {item.cover_image_url && (
              <div className="aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={item.cover_image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-5">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                <CalendarDays className="size-3.5" />
                {formatDate(item.published_at)}
              </div>
              <h2 className="font-semibold text-lg leading-snug group-hover:text-primary transition-colors">
                {item.title}
              </h2>
              {item.excerpt && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{item.excerpt}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
