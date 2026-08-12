import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Loader2 } from "lucide-react";
import { ImageCarousel } from "@/components/image-carousel.tsx";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo.ts";
import { breadcrumbSchema, newsArticleSchema } from "@/lib/structured-data.ts";
import { JsonLd } from "@/components/json-ld.tsx";
import { NEWS_SNAPSHOT } from "@/lib/news-snapshot.generated.ts";

type NewsArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  images: string[];
  published_at: string | null;
};

function fromSnapshot(slug: string | undefined): NewsArticle | null {
  const item = NEWS_SNAPSHOT.find((n) => n.slug === slug);
  if (!item) return null;
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: item.content,
    images: item.images,
    published_at: item.publishedAt ? new Date(item.publishedAt).toISOString() : null,
  };
}

// Dynamic per-article meta, built directly from the build-time snapshot
// (params.slug is all we get here — no loader in this SPA-mode setup).
// Articles published after the last deploy fall back to a generic title;
// document.title still gets set correctly once the client fetch resolves.
export function meta({ params }: { params: { slug?: string } }) {
  const article = fromSnapshot(params.slug);
  const title = article ? `${article.title} | ${SITE_NAME}` : `Новина | ${SITE_NAME}`;
  const description = article?.excerpt || "Новини от Хоспис \"Маринела\".";
  const url = `${SITE_URL}/news/${params.slug ?? ""}`;
  const image = article?.images[0] || DEFAULT_OG_IMAGE;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { tagName: "link", rel: "canonical", href: url },
  ];
}

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
  const snapshotMatch = fromSnapshot(slug);
  const [article, setArticle] = useState<NewsArticle | null | "not-found">(
    snapshotMatch,
  );

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/news/${slug}`)
      .then(async (r) => {
        if (r.status === 404) {
          setArticle((current) => (current ? current : "not-found"));
          return;
        }
        const d = await r.json();
        setArticle(d.news);
        document.title = `${d.news.title} | Хоспис "Маринела"`;
      })
      .catch(() => {
        setArticle((current) => (current ? current : "not-found"));
      });
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

  const [cover, ...rest] = article.images;

  return (
    <article className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
      <JsonLd
        data={[
          breadcrumbSchema(article.title, `/news/${article.slug}`),
          newsArticleSchema({
            title: article.title,
            description: article.excerpt || article.title,
            slug: article.slug,
            image: cover,
            publishedAt: article.published_at,
          }),
        ]}
      />
      <Link
        to="/news"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-8"
      >
        <ArrowLeft className="size-4" />
        Всички новини
      </Link>

      {cover && (
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted mb-8">
          <img src={cover} alt={article.title} className="w-full h-full object-cover" />
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

      {rest.length > 0 && (
        <div className="mt-10">
          <ImageCarousel images={rest} alt={article.title} />
        </div>
      )}
    </article>
  );
}
