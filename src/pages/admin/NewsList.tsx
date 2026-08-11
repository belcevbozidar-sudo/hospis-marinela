import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";
import { deleteNews, listNews, type NewsItem } from "@/lib/admin-api.ts";
import { toast } from "sonner";

export default function AdminNewsList() {
  const [news, setNews] = useState<NewsItem[] | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function refresh() {
    const { news } = await listNews();
    setNews(news);
  }

  useEffect(() => {
    refresh().catch(() => toast.error("Грешка при зареждане на новините"));
  }, []);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteNews(id);
      toast.success("Новината е изтрита");
      await refresh();
    } catch {
      toast.error("Неуспешно изтриване");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Новини</h1>
          <p className="text-muted-foreground text-sm">
            Всички новини — публикувани и чернови.
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/news/new">
            <Plus className="size-4" />
            Нова новина
          </Link>
        </Button>
      </div>

      {news === null && (
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="size-4 animate-spin" /> Зареждане...
        </div>
      )}

      {news !== null && news.length === 0 && (
        <p className="text-muted-foreground text-sm">Все още няма добавени новини.</p>
      )}

      <div className="flex flex-col gap-2">
        {news?.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between gap-4 rounded-lg border bg-background p-4"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium truncate">{item.title}</span>
                <Badge variant={item.published ? "default" : "secondary"}>
                  {item.published ? "Публикувана" : "Чернова"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">/{item.slug}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button asChild variant="outline" size="icon-sm">
                <Link to={`/admin/news/${item._id}`}>
                  <Pencil className="size-4" />
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon-sm" disabled={deletingId === item._id}>
                    <Trash2 className="size-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Изтриване на новина</AlertDialogTitle>
                    <AlertDialogDescription>
                      Сигурни ли сте, че искате да изтриете „{item.title}“? Това действие не
                      може да бъде отменено.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Отказ</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(item._id)}>
                      Изтрий
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
