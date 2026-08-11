"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { requireServerSecret } from "./lib/auth";

const MAX_BYTES = 6 * 1024 * 1024; // 6 MB — далеч над нуждите след клиентско компресиране

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

/**
 * Качва снимка в Convex File Storage и връща постоянен публичен URL.
 * Извиква се само от нашия автентикиран Vercel upload endpoint —
 * снимката вече е компресирана в браузъра преди да стигне дотук.
 */
export const upload = action({
  args: { secret: v.string(), contentType: v.string(), dataBase64: v.string() },
  handler: async (ctx, { secret, contentType, dataBase64 }) => {
    requireServerSecret(secret);

    if (!ALLOWED_TYPES.has(contentType)) {
      throw new Error("unsupported_type");
    }

    const buffer = Buffer.from(dataBase64, "base64");
    if (buffer.length === 0 || buffer.length > MAX_BYTES) {
      throw new Error("payload_too_large");
    }

    const blob = new Blob([buffer], { type: contentType });
    const storageId = await ctx.storage.store(blob);
    const url = await ctx.storage.getUrl(storageId);
    if (!url) throw new Error("upload_failed");
    return { url };
  },
});
