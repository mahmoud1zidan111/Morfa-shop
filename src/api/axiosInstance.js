// src/api/axiosInstance.js
import axios from "axios";
import { API_URL } from "./config"; // https://myecommerceapis.runasp.net

const axiosInstance = axios.create({
  baseURL: API_URL, // بدل "/api/proxy" في الإنتاج
  timeout: 15000,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  const url = String(config.url || "");
  const method = (config.method || "get").toLowerCase();

  // ما تضيفش Content-Type على GET
  if (method === "get" && config.headers["Content-Type"]) {
    delete config.headers["Content-Type"];
  }

  // المسارات العامة (مش محتاجة توكن)
  if (/^\/?(Categories|Products)(\/|$)/i.test(url)) {
    delete config.headers.Authorization;
    return config;
  }

  // ضيف التوكن لو موجود (متصفح فقط)
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      const hasBearer = /^bearer\s/i.test(token);
      config.headers.Authorization = hasBearer ? token : `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;
