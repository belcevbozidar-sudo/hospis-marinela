import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button.tsx";
import { uploadImage } from "@/lib/admin-upload.ts";

/** Избор на ЕДНА снимка от устройството — заменя текстово поле за URL. */
export function ImageUploadField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Неуспешно качване");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex gap-3 items-start">
      <div className="relative shrink-0">
        {value ? (
          <img
            src={value}
            alt=""
            className="size-20 rounded-md object-cover border bg-muted"
          />
        ) : (
          <div className="size-20 rounded-md border border-dashed bg-muted/50 flex items-center justify-center">
            <ImagePlus className="size-6 text-muted-foreground" />
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 rounded-md bg-background/80 flex items-center justify-center">
            <Loader2 className="size-5 animate-spin text-primary" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <ImagePlus className="size-4" />
          {value ? "Смени снимката" : "Избери снимка"}
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={uploading}
            onClick={() => onChange("")}
          >
            <X className="size-4" />
            Премахни
          </Button>
        )}
      </div>
    </div>
  );
}
