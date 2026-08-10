import { Link } from "react-router-dom";
import { Newspaper, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Табло за управление</h1>
        <p className="text-muted-foreground text-sm">
          Управлявай съдържанието на сайта на Хоспис Маринела.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/admin/news">
          <Card className="hover:border-primary/50 transition-colors h-full">
            <CardHeader>
              <Newspaper className="size-6 text-primary mb-1" />
              <CardTitle>Новини</CardTitle>
              <CardDescription>Създавай, редактирай и публикувай новини на сайта.</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Card className="opacity-60">
          <CardHeader>
            <Wrench className="size-6 text-muted-foreground mb-1" />
            <CardTitle>Още секции — скоро</CardTitle>
            <CardDescription>
              Тук ще се добавят инструменти за редакция на другите секции на сайта (услуги,
              екип, цени, снимки и др.).
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
