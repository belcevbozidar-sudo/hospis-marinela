// Triggers a fresh production deploy whenever a news article's published
// state changes, so the static snapshot Google sees (see
// scripts/prebuild.mjs + react-router.config.ts) stays in sync without
// waiting for the next code push.
//
// VERCEL_DEPLOY_HOOK_URL is created once in the Vercel dashboard
// (Project Settings → Git → Deploy Hooks) and set as an env var. If it's
// not configured yet, this silently no-ops — publishing still works
// instantly for real visitors via the live /api/news fetch, it just won't
// trigger a rebuild for crawlers until the next normal deploy.
export async function triggerRedeploy(reason: string) {
  const url = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!url) return;

  try {
    await fetch(url, { method: "POST" });
  } catch (err) {
    // Never let a failed redeploy trigger break the admin action that
    // caused it — the publish/edit itself already succeeded.
    console.error(`[deployHook] Failed to trigger redeploy (${reason}):`, err);
  }
}
