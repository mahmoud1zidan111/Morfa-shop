import axios from "axios";
import { API_URL } from "./config";

//  Create a reusable axios instance
// إنشاء نسخة جاهزة من axios يمكن استخدامها في كل الطلبات
const axiosInstance = axios.create({
  baseURL: API_URL,
});

//  Add token automatically if user is logged in
// إضافة التوكن تلقائيًا إذا كان المستخدم مسجل دخول
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

// Interceptors allow us to attach headers before every request
// الـ interceptors تسمح لنا بإضافة التوكن أو أي إعداد قبل إرسال أي طلب
