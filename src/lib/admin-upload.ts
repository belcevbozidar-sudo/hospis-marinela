import { prepareImageForUpload, blobToBase64 } from "./image-compress.ts";

const MAX_ORIGINAL_BYTES = 25 * 1024 * 1024; // 25 MB — таван преди дори да пробваме компресиране

export async function uploadImage(file: File): Promise<string> {
  if (file.size > MAX_ORIGINAL_BYTES) {
    throw new Error("Файлът е твърде голям (макс. 25 MB)");
  }

  const { blob, contentType } = await prepareImageForUpload(file);
  const dataBase64 = await blobToBase64(blob);

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contentType, dataBase64 }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error ?? "Неуспешно качване");
  }
  return data.url as string;
}
