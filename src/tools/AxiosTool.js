import axios from "axios";
import { useLoggedInStore } from "/store/LoggedInStore";
const loggedInStore = useLoggedInStore();

// === 建立 apiService 物件，設定基礎屬性 ===
const apiService = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// === 請求攔截器 ===
apiService.interceptors.request.use((config) => {
  const token = loggedInStore.token;

  // 請求前附加 token
  if (token) {
    console.log(token)
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// === 回應攔截器 ===
apiService.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 回應的錯誤處理寫在這
    const { status, data } = error.response;

    // 參數錯誤
    if (status == 400) {
      alert(`請求參數錯誤:${data}`);
      return;
    }

    // 登入失敗
    if (status == 401) {
      alert(`${data}`);
      return;
    }
  }
);

export const request = (config) => apiService(config);
