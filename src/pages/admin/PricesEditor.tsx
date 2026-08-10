import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { DEFAULT_PRICES } from "@/lib/content-defaults.ts";
import type { PricesContent } from "@/lib/site-content.tsx";
import { EditorShell } from "./_components/EditorShell.tsx";
import { ListEditor } from "./_components/ListEditor.tsx";
import { useContentEditor } from "./_components/useContentEditor.ts";

/** Секция със списък от прости текстови редове. */
function TextListSection({
  title,
  items,
  onChange,
  addLabel,
  placeholder,
}: {
  title: string;
  items: string[];
  onChange: (next: string[]) => void;
  addLabel: string;
  placeholder?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ListEditor<string>
          items={items}
          onChange={onChange}
          addLabel={addLabel}
          makeEmpty={() => ""}
          itemLabel={(_, i) => `№ ${i + 1}`}
          renderItem={(item, update) => (
            <Textarea
              value={item}
              onChange={(e) => update(e.target.value)}
              rows={2}
              placeholder={placeholder}
            />
          )}
        />
      </CardContent>
    </Card>
  );
}

export default function AdminPricesEditor() {
  const { value, change, save, saving, dirty, resetToDefaults } =
    useContentEditor<PricesContent>("prices", DEFAULT_PRICES);

  return (
    <EditorShell
      title="Цени"
      description="Ценовият диапазон и списъците на страница „Цени“."
      loading={value === null}
      dirty={dirty}
      saving={saving}
      onSave={save}
      onReset={resetToDefaults}
    >
      {value && (
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ценови диапазон</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label>От</Label>
                  <Input
                    value={value.priceFrom}
                    onChange={(e) => change({ ...value, priceFrom: e.target.value })}
                    placeholder="50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>До</Label>
                  <Input
                    value={value.priceTo}
                    onChange={(e) => change({ ...value, priceTo: e.target.value })}
                    placeholder="70"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Валута</Label>
                  <Input
                    value={value.currency}
                    onChange={(e) => change({ ...value, currency: e.target.value })}
                    placeholder="€"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Текст над цената</Label>
                <Textarea
                  value={value.intro}
                  onChange={(e) => change({ ...value, intro: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Бележка под цената (напр. в лева)</Label>
                <Input
                  value={value.secondaryNote}
                  onChange={(e) => change({ ...value, secondaryNote: e.target.value })}
                  placeholder="(97,40 – 136,36 лв.)"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Пояснение под цената</Label>
                <Textarea
                  value={value.note}
                  onChange={(e) => change({ ...value, note: e.target.value })}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <TextListSection
            title="От какво зависи цената"
            items={value.factors}
            onChange={(factors) => change({ ...value, factors })}
            addLabel="Добави фактор"
          />

          <TextListSection
            title="Какво е включено в цената"
            items={value.included}
            onChange={(included) => change({ ...value, included })}
            addLabel="Добави ред"
          />

          <TextListSection
            title="Какво НЕ е включено"
            items={value.notIncluded}
            onChange={(notIncluded) => change({ ...value, notIncluded })}
            addLabel="Добави ред"
          />

          <TextListSection
            title="Необходими документи"
            items={value.documents}
            onChange={(documents) => change({ ...value, documents })}
            addLabel="Добави документ"
          />
        </div>
      )}
    </EditorShell>
  );
}
