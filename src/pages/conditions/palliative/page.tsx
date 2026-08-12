import { buildMeta } from "@/lib/seo.ts";
import { ConditionPage } from "../ConditionPage.tsx";
import { CONDITION_PAGES } from "../conditions-data.ts";

export const meta = () => buildMeta("/palliativni-grizhi");

export default function PalliativniGrizhiPage() {
  return <ConditionPage data={CONDITION_PAGES[1]} />;
}
