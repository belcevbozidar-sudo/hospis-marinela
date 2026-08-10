/**
 * Компресира снимка в браузъра, преди да я качим — така телефонни
 * снимки от 8-15 MB стават няколко стотин KB, вместо да опитваме да
 * прокараме суровия файл през сървъра ни (който има таван от няколко
 * MB на заявка).
 */

const MAX_DIMENSION = 1920;
const TARGET_BYTES = 1_500_000; // ~1.5 MB — с добро качество за уеб
const MIN_QUALITY = 0.5;
const SKIP_RECOMPRESS_BYTES = 900_000; // малки файлове ги пускаме както са

export type PreparedImage = {
  blob: Blob;
  contentType: string;
};

async function loadImage(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    const loaded = new Promise<HTMLImageElement>((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Невалиден файл с изображение"));
    });
    img.src = url;
    return await loaded;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Неуспешно компресиране"))),
      type,
      quality,
    );
  });
}

export async function prepareImageForUpload(file: File): Promise<PreparedImage> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Файлът не е изображение");
  }

  // Малки файлове, които вече са в разумни размери — пускаме ги както са.
  if (file.size <= SKIP_RECOMPRESS_BYTES) {
    const img = await loadImage(file);
    if (img.width <= MAX_DIMENSION && img.height <= MAX_DIMENSION) {
      return { blob: file, contentType: file.type };
    }
  }

  const img = await loadImage(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas не се поддържа");
  ctx.drawImage(img, 0, 0, width, height);

  // GIF-овете ги оставяме непроменени (canvas губи анимацията).
  if (file.type === "image/gif") {
    return { blob: file, contentType: file.type };
  }

  let quality = 0.85;
  let blob = await canvasToBlob(canvas, "image/jpeg", quality);
  while (blob.size > TARGET_BYTES && quality > MIN_QUALITY) {
    quality -= 0.1;
    blob = await canvasToBlob(canvas, "image/jpeg", quality);
  }

  return { blob, contentType: "image/jpeg" };
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // data:image/jpeg;base64,XXXX -> вземаме само частта след запетаята
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error("Неуспешно четене на файла"));
    reader.readAsDataURL(blob);
  });
}
