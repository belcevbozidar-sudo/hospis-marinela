import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { DEFAULT_MEDICAL_STAFF } from "@/lib/content-defaults.ts";
import type { TeamMemberContent } from "@/lib/site-content.tsx";
import { EditorShell } from "./_components/EditorShell.tsx";
import { ListEditor } from "./_components/ListEditor.tsx";
import { useContentEditor } from "./_components/useContentEditor.ts";
import { ImageUploadField } from "./_components/ImageUploadField.tsx";

export default function AdminTeamEditor() {
  const { value, change, save, saving, dirty, resetToDefaults } = useContentEditor<
    TeamMemberContent[]
  >("team", DEFAULT_MEDICAL_STAFF);

  return (
    <EditorShell
      title="Медицински екип"
      description="Членовете на екипа в секция „Медицински екип“ на страница „Екип“."
      loading={value === null}
      dirty={dirty}
      saving={saving}
      onSave={save}
      onReset={resetToDefaults}
    >
      {value && (
        <ListEditor<TeamMemberContent>
          items={value}
          onChange={change}
          addLabel="Добави член на екипа"
          itemLabel={(item, i) => item.name || `Член № ${i + 1}`}
          makeEmpty={() => ({ name: "", role: "", description: "", image: "" })}
          renderItem={(item, update) => (
            <div className="flex flex-col gap-3">
              <ImageUploadField
                value={item.image}
                onChange={(image) => update({ ...item, image })}
              />
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label>Име</Label>
                  <Input
                    value={item.name}
                    onChange={(e) => update({ ...item, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Длъжност</Label>
                  <Input
                    value={item.role}
                    onChange={(e) => update({ ...item, role: e.target.value })}
                    placeholder="напр. Болногледач"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Описание</Label>
                <Textarea
                  value={item.description ?? ""}
                  onChange={(e) => update({ ...item, description: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
          )}
        />
      )}
    </EditorShell>
  );
}
