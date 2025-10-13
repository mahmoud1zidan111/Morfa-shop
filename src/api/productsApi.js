import axiosInstance from "./axiosInstance";

export async function getProductById(
  productId,
  { CategoryId, PageNumber, CountOfItems } = {}
) {
  const res = await axiosInstance.get(`/Products/${productId}`, {
    params: { CategoryId, PageNumber, CountOfItems },
    // headers: { "x-skip-auth": true }, // تقدر تستخدمها لو عايز تضمن عدم إضافة التوكن
  });
  console.log("getProductById ->", res.data);
  return res.data;
}
