import axios from "axios";

const isDev = process.env.NODE_ENV === "development";

const axiosInstance = axios.create({
  baseURL: isDev ? "" : "/api/proxy",
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  const url = String(config.url || "");
  const method = (config.method || "get").toLowerCase();

  // ما تضيفش Content-Type على GET
  if (method === "get" && config.headers["Content-Type"]) {
    delete config.headers["Content-Type"];
  }

  // المسارات العامة
  if (/^\/?(Categories|Products)(\/|$)/i.test(url)) {
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
