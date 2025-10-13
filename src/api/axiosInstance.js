// src/api/axiosInstance.js
import axios from "axios";
import { API_URL } from "./config";

const isDev = process.env.NODE_ENV === "development";

const axiosInstance = axios.create({
  baseURL: isDev ? "" : API_URL, // في الديف: نفس الأصل (localhost) عشان CRA ي proxy
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  const method = (config.method || "get").toLowerCase();

  // ما نضيفش Content-Type على GET عشان نتفادى preflight
  if (method !== "get" && !config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }

  // Products عامة: امنع Authorization
  if (
    typeof config.url === "string" &&
    /^\/?Products(\/|$)/i.test(config.url)
  ) {
    delete config.headers.Authorization;
    return config;
  }

  // باقي الطلبات: ضيف التوكن لو موجود
  const token = localStorage.getItem("token");
  if (token) {
    const hasBearer = /^bearer\s/i.test(token);
    config.headers.Authorization = hasBearer ? token : `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
