import axios from "axios";

/**
 * Shared HTTP client for future Express API modules.
 * Feature-specific services should import this instance rather than Axios directly.
 */
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;
