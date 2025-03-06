import apiClient from "./apiClient";

export const getProviders = async () => {
    const response = await apiClient.get("/providers");
    return response.data;
};

export const deleteProviders = async (id) => {
  try {
    const response = await apiClient.delete(`/providers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting provider:", error);
    return null;
  }
};