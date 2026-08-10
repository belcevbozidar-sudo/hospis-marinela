import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { DEFAULT_REVIEWS } from "@/lib/content-defaults.ts";
import type { ReviewContent } from "@/lib/site-content.tsx";
import { EditorShell } from "./_components/EditorShell.tsx";
import { ListEditor } from "./_components/ListEditor.tsx";
import { useContentEditor } from "./_components/useContentEditor.ts";

export default function AdminReviewsEditor() {
  const { value, change, save, saving, dirty, resetToDefaults } = useContentEditor<
    ReviewContent[]
  >("reviews", DEFAULT_REVIEWS);

  return (
    <EditorShell
      title="Отзиви"
      description="Отзивите, които се показват на страница „Отзиви“."
      loading={value === null}
      dirty={dirty}
      saving={saving}
      onSave={save}
      onReset={resetToDefaults}
    >
      {value && (
        <ListEditor<ReviewContent>
          items={value}
          onChange={change}
          addLabel="Добави отзив"
          itemLabel={(item, i) => item.name || `Отзив № ${i + 1}`}
          makeEmpty={() => ({ name: "", date: "", text: "", highlight: "" })}
          renderItem={(item, update) => (
            <div className="flex flex-col gap-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label>Име</Label>
                  <Input
                    value={item.name}
                    onChange={(e) => update({ ...item, name: e.target.value })}
                    placeholder="Име на автора"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Дата</Label>
                  <Input
                    value={item.date}
                    onChange={(e) => update({ ...item, date: e.target.value })}
                    placeholder="напр. преди 2 месеца"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Кратък акцент</Label>
                <Input
                  value={item.highlight ?? ""}
                  onChange={(e) => update({ ...item, highlight: e.target.value })}
                  placeholder="Изречение, което се откроява в картичката"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Текст на отзива</Label>
                <Textarea
                  value={item.text}
                  onChange={(e) => update({ ...item, text: e.target.value })}
                  rows={6}
                />
              </div>
            </div>
          )}
        />
      )}
    </EditorShell>
  );
}
