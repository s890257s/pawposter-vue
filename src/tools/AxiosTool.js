import axios from "axios";

// === 建立 apiService 物件，設定基礎屬性 ===
const apiService = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// === 請求攔截器 ===
apiService.interceptors.request.use((config) => {
  const token = "";

  // 請求前附加 token
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

// === 回應攔截器 ===
apiService.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 回應的錯誤處理寫在這
  }
);

export const request = (config) => apiService(config);
