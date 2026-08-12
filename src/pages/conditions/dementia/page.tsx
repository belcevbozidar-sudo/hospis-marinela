import { buildMeta } from "@/lib/seo.ts";
import { ConditionPage } from "../ConditionPage.tsx";
import { CONDITION_PAGES } from "../conditions-data.ts";

export const meta = () => buildMeta("/demenciya-alzhaimer");

export default function DemenciyaAlzhaimerPage() {
  return <ConditionPage data={CONDITION_PAGES[2]} />;
}
