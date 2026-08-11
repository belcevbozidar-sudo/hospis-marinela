import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { createNews, getNews, updateNews, type NewsItem } from "@/lib/admin-api.ts";
import { ImageGalleryField } from "./_components/ImageGalleryField.tsx";

export default function AdminNewsEditor() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [published, setPublished] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (!id) return;
    getNews(id)
      .then(({ news }: { news: NewsItem }) => {
        setTitle(news.title);
        setSlug(news.slug);
        setExcerpt(news.excerpt ?? "");
        setContent(news.content);
        setImages(news.images ?? []);
        setPublished(news.published);
        setSlugTouched(true);
      })
      .catch(() => toast.error("Новината не беше намерена"))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSave(publishOverride?: boolean) {
    if (!title.trim() || !content.trim()) {
      toast.error("Заглавието и съдържанието са задължителни");
      return;
    }
    setSaving(true);
    const finalPublished = publishOverride ?? published;
    try {
      if (isEdit && id) {
        await updateNews(id, {
          title,
          slug: slugTouched ? slug : undefined,
          excerpt,
          content,
          images,
          published: finalPublished,
        });
        toast.success("Новината е запазена");
      } else {
        await createNews({
          title,
          slug: slugTouched ? slug : undefined,
          excerpt,
          content,
          images,
          published: finalPublished,
        });
        toast.success(finalPublished ? "Новината е публикувана" : "Новината е запазена като чернова");
      }
      navigate("/admin/news");
    } catch {
      toast.error("Неуспешно запазване");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Loader2 className="size-4 animate-spin" /> Зареждане...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <Button asChild variant="ghost" size="sm" className="-ml-2 mb-2">
          <Link to="/admin/news">
            <ArrowLeft className="size-4" />
            Назад към новините
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">{isEdit ? "Редакция на новина" : "Нова новина"}</h1>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Снимки</Label>
            <ImageGalleryField value={images} onChange={setImages} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Заглавие</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) setSlug(e.target.value);
              }}
              placeholder="Например: Отворихме нов дневен център"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="slug">Адрес (slug)</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugTouched(true);
              }}
              placeholder="avtomatichno-generiran-ako-e-prazno"
            />
            <p className="text-xs text-muted-foreground">
              Новината ще е достъпна на /news/{slug || "..."}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="excerpt">Кратко резюме</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Едно-две изречения за списъка с новини"
              rows={2}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="content">Съдържание</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Пълният текст на новината. Празен ред = нов абзац."
              rows={12}
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Switch id="published" checked={published} onCheckedChange={setPublished} />
            <Label htmlFor="published" className="font-normal cursor-pointer">
              Публикувана (видима на сайта)
            </Label>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={() => handleSave()} disabled={saving}>
              {saving ? "Запазване..." : "Запази"}
            </Button>
            {!published && (
              <Button variant="outline" onClick={() => handleSave(true)} disabled={saving}>
                Запази и публикувай
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
