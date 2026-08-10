import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabaseAdmin } from "../_lib/supabaseAdmin.js";
import { CONTENT_KEYS } from "../_lib/contentSchemas.js";

/**
 * Публично четене на цялото редактируемо съдържание, наведнъж.
 * Връща само познатите ключове — дори ако в базата попадне нещо
 * друго, то не се сервира на посетителите.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const { data, error } = await supabaseAdmin
    .from("site_content")
    .select("key, value")
    .in("key", CONTENT_KEYS);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  const content: Record<string, unknown> = {};
  for (const row of data ?? []) {
    content[row.key] = row.value;
  }

  res.setHeader(
    "Cache-Control",
    "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
  );
  res.status(200).json({ content });
}
