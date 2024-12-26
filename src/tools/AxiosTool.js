import axios from "axios";
import { useLoggedInStore } from "@/stores/LoggedInStore";
const loggedInStore = useLoggedInStore();

// === 建立 apiService 物件，設定基礎屬性 ===
const apiService = axios.create({
  baseURL: "http://localhost:8080",
});

// === 請求攔截器 ===
apiService.interceptors.request.use((config) => {
  const token = loggedInStore.token;
  // 請求前附加 token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const defaultConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return { ...defaultConfig, ...config };
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

    // 登入失敗或 token 過期
    if (status == 401) {
      alert(`${data}`);

      loggedInStore.logout();
      return;
    }
  }
);

export const request = (config) => apiService(config);
