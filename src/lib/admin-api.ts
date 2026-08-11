export type NewsItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  images: string[];
  published: boolean;
  publishedAt?: number;
  createdAt: number;
  updatedAt: number;
};

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error ?? `request_failed_${res.status}`) as Error & {
      status?: number;
      payload?: unknown;
    };
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return data as T;
}

export function checkSession() {
  return request<{ authenticated: boolean }>("/api/admin/session");
}

export function login(password: string, remember: boolean) {
  return request<{ ok: true }>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ password, remember }),
  });
}

export function logout() {
  return request<{ ok: true }>("/api/admin/logout", { method: "POST" });
}

export function listNews() {
  return request<{ news: NewsItem[] }>("/api/admin/news");
}

export function getNews(id: string) {
  return request<{ news: NewsItem }>(`/api/admin/news/${id}`);
}

export function createNews(payload: {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  images: string[];
  published: boolean;
}) {
  return request<{ news: NewsItem }>("/api/admin/news", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateNews(
  id: string,
  payload: Partial<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    images: string[];
    published: boolean;
  }>,
) {
  return request<{ news: NewsItem }>(`/api/admin/news/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteNews(id: string) {
  return request<{ ok: true }>(`/api/admin/news/${id}`, { method: "DELETE" });
}

/** Редактируеми секции на сайта (отзиви, галерия, цени, екип). */
export type ContentKey = "prices" | "reviews" | "gallery" | "team";

export function getContent<T>(key: ContentKey) {
  return request<{ value: T | null; updatedAt: string | null }>(
    `/api/admin/content/${key}`,
  );
}

export function saveContent<T>(key: ContentKey, value: T) {
  return request<{ ok: true }>(`/api/admin/content/${key}`, {
    method: "PUT",
    body: JSON.stringify({ value }),
  });
}
