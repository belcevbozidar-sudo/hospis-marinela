import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Loader2 } from "lucide-react";

type NewsArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
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

export default function NewsArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<NewsArticle | null | "not-found">(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/news/${slug}`)
      .then(async (r) => {
        if (r.status === 404) {
          setArticle("not-found");
          return;
        }
        const d = await r.json();
        setArticle(d.news);
        document.title = `${d.news.title} | Хоспис "Маринела"`;
      })
      .catch(() => setArticle("not-found"));
  }, [slug]);

  if (article === null) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 flex items-center gap-2 text-muted-foreground">
        <Loader2 className="size-4 animate-spin" /> Зареждане...
      </div>
    );
  }

  if (article === "not-found") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold mb-3">Новината не е намерена</h1>
        <Link to="/news" className="text-primary underline">
          Обратно към новините
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
      <Link
        to="/news"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-8"
      >
        <ArrowLeft className="size-4" />
        Всички новини
      </Link>

      {article.cover_image_url && (
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted mb-8">
          <img
            src={article.cover_image_url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
        <CalendarDays className="size-4" />
        {formatDate(article.published_at)}
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{article.title}</h1>

      <div className="prose prose-neutral max-w-none">
        {article.content.split(/\n{2,}/).map((paragraph, i) => (
          <p key={i} className="mb-4 leading-relaxed whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
