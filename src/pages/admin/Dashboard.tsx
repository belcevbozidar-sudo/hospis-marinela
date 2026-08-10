import { Link } from "react-router-dom";
import { Newspaper, MessageSquareQuote, Images, Users, Euro, Info } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

const SECTIONS = [
  {
    to: "/admin/news",
    icon: Newspaper,
    title: "Новини",
    description: "Създавай, редактирай и публикувай новини на сайта.",
  },
  {
    to: "/admin/reviews",
    icon: MessageSquareQuote,
    title: "Отзиви",
    description: "Отзивите от близки на пациенти на страница „Отзиви“.",
  },
  {
    to: "/admin/gallery",
    icon: Images,
    title: "Галерия",
    description: "Снимките, които се показват в галерията.",
  },
  {
    to: "/admin/team",
    icon: Users,
    title: "Екип",
    description: "Членовете на медицинския екип и техните описания.",
  },
  {
    to: "/admin/prices",
    icon: Euro,
    title: "Цени",
    description: "Ценовият диапазон и какво е включено в цената.",
  },
];

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
        {SECTIONS.map((section) => (
          <Link key={section.to} to={section.to}>
            <Card className="hover:border-primary/50 transition-colors h-full">
              <CardHeader>
                <section.icon className="size-6 text-primary mb-1" />
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex gap-3 rounded-lg border bg-muted/40 p-4 max-w-3xl">
        <Info className="size-5 text-muted-foreground shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            Промените се виждат на сайта веднага след натискане на „Запази“ — не е
            нужно ново публикуване.
          </p>
          <p>
            Телефоните, адресът и текстовете на останалите страници са част от кода и
            се променят от разработчик. Причината е, че те се използват и в данните за
            търсачките (Google), които се изграждат при публикуване на сайта — ако се
            променяха само тук, Google щеше да продължи да показва старите.
          </p>
        </div>
      </div>
    </div>
  );
}
