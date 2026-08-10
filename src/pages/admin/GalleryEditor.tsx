import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { DEFAULT_GALLERY_IMAGES } from "@/lib/content-defaults.ts";
import type { GalleryContent } from "@/lib/site-content.tsx";
import { EditorShell } from "./_components/EditorShell.tsx";
import { ListEditor } from "./_components/ListEditor.tsx";
import { useContentEditor } from "./_components/useContentEditor.ts";
import { ImageUploadField } from "./_components/ImageUploadField.tsx";

export default function AdminGalleryEditor() {
  const { value, change, save, saving, dirty, resetToDefaults } = useContentEditor<
    GalleryContent[]
  >("gallery", DEFAULT_GALLERY_IMAGES);

  return (
    <EditorShell
      title="Галерия"
      description="Снимките на страница „Галерия“."
      loading={value === null}
      dirty={dirty}
      saving={saving}
      onSave={save}
      onReset={resetToDefaults}
    >
      {value && (
        <ListEditor<GalleryContent>
          items={value}
          onChange={change}
          addLabel="Добави снимка"
          itemLabel={(item, i) => item.alt || `Снимка № ${i + 1}`}
          makeEmpty={() => ({ src: "", alt: "" })}
          renderItem={(item, update) => (
            <div className="flex flex-col gap-3">
              <ImageUploadField value={item.src} onChange={(src) => update({ ...item, src })} />
              <div className="flex flex-col gap-1.5">
                <Label>Описание (за търсачки и достъпност)</Label>
                <Input
                  value={item.alt}
                  onChange={(e) => update({ ...item, alt: e.target.value })}
                  placeholder="Какво се вижда на снимката"
                />
              </div>
            </div>
          )}
        />
      )}
    </EditorShell>
  );
}
