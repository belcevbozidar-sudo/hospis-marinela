import { buildMeta } from "@/lib/seo.ts";
import { ConditionPage } from "../ConditionPage.tsx";
import { CONDITION_PAGES } from "../conditions-data.ts";

export const meta = () => buildMeta("/sledoperativno-vazstanovyavane");

export default function SledoperativnoVazstanovyavanePage() {
  return <ConditionPage data={CONDITION_PAGES[3]} />;
}
