import { useRef, useState } from "react";
import { GripVertical, ImagePlus, Loader2, Star, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { uploadImage } from "@/lib/admin-upload.ts";

/**
 * Избор на МНОЖЕСТВО снимки от устройството, с пренареждане чрез
 * влачене. Първата снимка е главната (корицата) на новината.
 */
export function ImageGalleryField({
  value,
  onChange,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const uploaded: string[] = [];
    try {
      for (const file of Array.from(files)) {
        try {
          uploaded.push(await uploadImage(file));
        } catch (err) {
          toast.error(
            `„${file.name}“: ${err instanceof Error ? err.message : "неуспешно качване"}`,
          );
        }
      }
      if (uploaded.length > 0) onChange([...value, ...uploaded]);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function reorder(from: number, to: number) {
    if (from === to) return;
    const copy = [...value];
    const [moved] = copy.splice(from, 1);
    copy.splice(to, 0, moved);
    onChange(copy);
  }

  return (
    <div className="flex flex-col gap-3">
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {value.map((url, index) => (
            <div
              key={url + index}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(e) => {
                e.preventDefault();
                setOverIndex(index);
              }}
              onDragEnd={() => {
                setDragIndex(null);
                setOverIndex(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (dragIndex !== null) reorder(dragIndex, index);
                setDragIndex(null);
                setOverIndex(null);
              }}
              className={cn(
                "relative aspect-square rounded-lg border overflow-hidden bg-muted cursor-grab active:cursor-grabbing group",
                overIndex === index && dragIndex !== null && dragIndex !== index
                  ? "ring-2 ring-primary"
                  : "",
              )}
            >
              <img src={url} alt="" className="w-full h-full object-cover" />

              <div className="absolute top-1.5 left-1.5 p-1 rounded bg-black/50 text-white">
                <GripVertical className="size-3.5" />
              </div>

              {index === 0 ? (
                <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[11px] font-medium">
                  <Star className="size-3 fill-current" />
                  Главна
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Премахни снимката"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ImagePlus className="size-4" />
          )}
          {uploading ? "Качване..." : "Добави снимки"}
        </Button>
      </div>
      {value.length > 1 && (
        <p className="text-xs text-muted-foreground">
          Провлачи снимките, за да ги подредиш. Първата се показва като корица на новината.
        </p>
      )}
    </div>
  );
}
