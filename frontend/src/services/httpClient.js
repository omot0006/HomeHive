import axios from "axios";

const TOKEN_STORAGE_KEY = "homehive_access_token";
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

if (import.meta.env.DEV) console.info(`[HomeHive API] base URL: ${API_BASE_URL}`);

export const getStoredToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);
export const storeToken = (token) => localStorage.setItem(TOKEN_STORAGE_KEY, token);
export const clearStoredToken = () => localStorage.removeItem(TOKEN_STORAGE_KEY);

httpClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (import.meta.env.DEV) console.info(`[HomeHive API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) console.info(`[HomeHive API] ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
    return response;
  },
  async (error) => {
    if (error.code === "ERR_NETWORK") {
      const isMixedContent = window.location.protocol === "https:" && API_BASE_URL.startsWith("http:");
      if (isMixedContent) {
        error.homeHiveNetworkCause = "mixed-content";
      } else {
        try {
          await fetch(`${API_BASE_URL}/health`, { mode: "no-cors", cache: "no-store" });
          error.homeHiveNetworkCause = "cors";
        } catch {
          error.homeHiveNetworkCause = "unreachable";
        }
      }
    }

    if (import.meta.env.DEV) {
      console.info(`[HomeHive API] ${error.response?.status ?? error.code ?? "FAILED"} ${error.config?.method?.toUpperCase()} ${error.config?.url}`);
    }
    if (error.response?.status === 401 && getStoredToken()) {
      clearStoredToken();
      window.dispatchEvent(new Event("homehive:unauthorized"));
    }
    return Promise.reject(error);
  },
);

export default httpClient;
