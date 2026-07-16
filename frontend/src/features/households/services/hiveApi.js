import httpClient from "../../../services/httpClient";

export const createHive = async (payload) => {
  const response = await httpClient.post("/hives", payload);
  return response.data.data;
};

export const getMyHive = async () => {
  const response = await httpClient.get("/hives/me");
  return response.data.data.hive;
};

export const joinHive = async (inviteCode) => {
  const response = await httpClient.post("/hives/join", { inviteCode });
  return response.data.data;
};
