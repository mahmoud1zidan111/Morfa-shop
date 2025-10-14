import axiosInstance from "./axiosInstance";
const API_BASE = "https://myecommerceapis.runasp.net";

let catsCache = null;

function buildImageUrl(path) {
  if (!path) return null;
  const clean = String(path).replace(/\\/g, "/").replace(/^\/+/, "");
  if (/^https?:\/\//i.test(clean)) return clean;
  return `${API_BASE}/${clean}`;
}

export async function getAllCategories() {
  if (catsCache) return catsCache;
  const res = await axiosInstance.get("/Categories", {
    headers: { "x-skip-auth": true },
  });
  catsCache = Array.isArray(res.data)
    ? res.data.map((c) => ({
        id: c.id,
        name: c.name,
        imageUrl: buildImageUrl(c.image),
      }))
    : [];
  return catsCache;
}

export function clearCategoriesCache() {
  catsCache = null;
}
