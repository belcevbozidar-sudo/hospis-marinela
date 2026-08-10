import { createClient } from "@supabase/supabase-js";

// Service-role client. Only ever imported from files under /api — this
// module never ships to the browser bundle (Vite only bundles `src/`,
// and these env vars carry no VITE_ prefix so they can't leak to client code).
const url = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !secretKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SECRET_KEY env vars");
}

export const supabaseAdmin = createClient(url, secretKey, {
  auth: { persistSession: false },
});
