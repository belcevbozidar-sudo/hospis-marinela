import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

/**
 * Общ помощник за редакция на списък: добавяне, изтриване и
 * пренареждане. Самото поле за всеки елемент се подава отвън, за да
 * може всяка секция да изглежда според съдържанието си.
 */
export function ListEditor<T>({
  items,
  onChange,
  makeEmpty,
  renderItem,
  addLabel = "Добави",
  itemLabel,
}: {
  items: T[];
  onChange: (next: T[]) => void;
  makeEmpty: () => T;
  renderItem: (item: T, update: (next: T) => void, index: number) => React.ReactNode;
  addLabel?: string;
  itemLabel?: (item: T, index: number) => string;
}) {
  function update(index: number, next: T) {
    const copy = [...items];
    copy[index] = next;
    onChange(copy);
  }

  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function move(index: number, delta: number) {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const copy = [...items];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    onChange(copy);
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div key={index} className="rounded-lg border bg-background p-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className="text-xs font-medium text-muted-foreground pt-1">
              {itemLabel ? itemLabel(item, index) : `№ ${index + 1}`}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label="Премести нагоре"
              >
                <ArrowUp className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                aria-label="Премести надолу"
              >
                <ArrowDown className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => remove(index)}
                aria-label="Изтрий"
              >
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>
          </div>
          {renderItem(item, (next) => update(index, next), index)}
        </div>
      ))}

      {items.length === 0 && (
        <p className="text-sm text-muted-foreground">Списъкът е празен.</p>
      )}

      <div>
        <Button type="button" variant="outline" onClick={() => onChange([...items, makeEmpty()])}>
          <Plus className="size-4" />
          {addLabel}
        </Button>
      </div>
    </div>
  );
}
