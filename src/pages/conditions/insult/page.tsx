import { buildMeta } from "@/lib/seo.ts";
import { ConditionPage } from "../ConditionPage.tsx";
import { CONDITION_PAGES } from "../conditions-data.ts";

export const meta = () => buildMeta("/grizhi-sled-insult");

export default function GrizhiSledInsultPage() {
  return <ConditionPage data={CONDITION_PAGES[0]} />;
}
