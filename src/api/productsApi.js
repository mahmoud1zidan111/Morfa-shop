import axiosInstance from "./axiosInstance";

// GetProductsByCategoryAndPaging → Fetch products by category with pagination
export async function getProductsByCategoryAndPaging({
  CategoryId,
  PageNumber,
  CountOfItems,
}) {
  const response = await axiosInstance.get("/Products/user/2", {
    CategoryId,
    PageNumber,
    CountOfItems,
  });
  return response.data;
}

// GetProductsById → Fetch a specific product by ID (with paging and category)
export async function getProductById({ CategoryId, PageNumber, CountOfItems }) {
  const response = await axiosInstance.get(`/Products/1`, {
    CategoryId,
    PageNumber,
    CountOfItems,
  });
  return response.data;
}
// export const getProducts = getProductsByCategoryAndPaging;
