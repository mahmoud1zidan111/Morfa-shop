import axiosInstance from "./axiosInstance";
import { API_URL as API_BASE } from "./config";

let catsCache = null;

function buildImageUrl(path) {
  if (!path) return null;
  const clean = String(path).replace(/\\/g, "/").replace(/^\/+/, "");
  if (/^https?:\/\//i.test(clean)) return clean;
  return `${API_BASE}/${clean}`;
}

export async function getAllCategories() {
  if (catsCache) return catsCache;
  try {
    // مهم: تأكد إن المسار الصحيح عندك هو "/Categories"
    // لو الباك إند عنده "/api/Categories" عدّل السطر ده
    const res = await axiosInstance.get("/Categories", {
      headers: { "x-skip-auth": "1" },
    });
    const data = Array.isArray(res.data) ? res.data : [];
    catsCache = data.map((c) => ({
      id: c.id,
      name: c.name,
      imageUrl: buildImageUrl(c.image),
    }));
    return catsCache;
  } catch (e) {
    console.error("getAllCategories failed:", e?.response?.status, e?.message);
    catsCache = null; // ما تثبّتش نتيجة فاضية
    throw e;
  }
}

export function clearCategoriesCache() {
  catsCache = null;
}
