import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
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

/** Обща рамка за всички редактори на секции. */
export function EditorShell({
  title,
  description,
  loading,
  dirty,
  saving,
  onSave,
  onReset,
  children,
}: {
  title: string;
  description: string;
  loading: boolean;
  dirty: boolean;
  saving: boolean;
  onSave: () => void;
  onReset: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 max-w-3xl pb-24">
      <div>
        <Button asChild variant="ghost" size="sm" className="-ml-2 mb-2">
          <Link to="/admin">
            <ArrowLeft className="size-4" />
            Назад към таблото
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="size-4 animate-spin" /> Зареждане...
        </div>
      ) : (
        <>
          {children}

          <div className="sticky bottom-0 -mx-6 px-6 py-4 bg-background/95 backdrop-blur border-t flex items-center gap-3">
            <Button onClick={onSave} disabled={saving || !dirty}>
              {saving ? "Запазване..." : dirty ? "Запази промените" : "Няма промени"}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" type="button">
                  <RotateCcw className="size-4" />
                  Върни началното
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Връщане към началното съдържание</AlertDialogTitle>
                  <AlertDialogDescription>
                    Това ще замени всичко в тази секция с първоначалното съдържание на
                    сайта. Промените ще влязат в сила чак след като натиснете „Запази“.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отказ</AlertDialogCancel>
                  <AlertDialogAction onClick={onReset}>Върни</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {dirty && (
              <span className="text-xs text-muted-foreground">Има незапазени промени</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
