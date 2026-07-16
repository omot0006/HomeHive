import httpClient from "../../../services/httpClient";

export const registerUser = async (payload) => {
  const response = await httpClient.post("/auth/register", payload);
  return response.data.data;
};

export const loginUser = async (payload) => {
  const response = await httpClient.post("/auth/login", payload);
  return response.data.data;
};

export const getCurrentUser = async () => {
  const response = await httpClient.get("/auth/me");
  return response.data.data.user;
};

export const updateCurrentUser = async (payload) => {
  const response = await httpClient.patch("/auth/me", payload);
  return response.data.data.user;
};

export const getApiError = (error, fallback = "Something went wrong. Please try again.") => {
  if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
    return { message: "The HomeHive server took too long to respond. Please try again.", fields: {}, status: undefined };
  }

  const networkMessages = {
    unreachable: "Cannot reach the HomeHive server at http://localhost:5000. Start the backend with npm run dev.",
    cors: "The HomeHive server is running, but the browser blocked the request. Check the backend CORS origin.",
    "mixed-content": "The browser blocked the API because the page uses HTTPS while the backend uses HTTP.",
  };
  if (error.homeHiveNetworkCause) {
    return { message: networkMessages[error.homeHiveNetworkCause], fields: {}, status: undefined };
  }

  const responseError = error.response?.data?.error;
  const message =
    error.response?.data?.message
    ?? (typeof responseError === "string" ? responseError : responseError?.message)
    ?? error.message
    ?? fallback;

  return {
    message,
    fields: typeof responseError === "object" ? responseError?.details ?? {} : {},
    status: error.response?.status,
  };
};
