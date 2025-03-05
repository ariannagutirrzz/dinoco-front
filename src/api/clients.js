import apiClient from "./apiClient";

export const getClients = async () => {
  try {
    const response = await apiClient.get("/clients");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
};
