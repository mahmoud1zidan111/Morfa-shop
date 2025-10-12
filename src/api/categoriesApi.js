import axiosInstance from "./axiosInstance";

//  Categories API Functions
// getAllCategories → Fetch all available categories from the backend

// Get all categories
export async function getAllCategories() {
  const response = await axiosInstance.get("/api/Category/GetAll");
  return response.data;
}

// =========   =======   ========  ========

// getCategoryById → Fetch details of a specific category by its ID
// Get category by ID
export async function getCategoryById(categoryId) {
  const response = await axiosInstance.get(`/api/Category/Get/${categoryId}`);
  return response.data;
}
