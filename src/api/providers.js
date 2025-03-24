import apiClient from "./apiClient";

export const getProviders = async () => {
    const response = await apiClient.get("/providers");
    return response.data;
};

export const deleteProvider = async (id) => {
  try {
    const response = await apiClient.delete(`/providers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting provider:", error);
    return null;
  }
};

export const createProvider = async (provider) => {
  try {
    const response = await apiClient.post("/providers", provider);
    return response.data;
  } catch (error) {
    console.error("Error creating provider:", error);
    return null;
  }
};

export const updateProvider = async (providerData) => {
  try {
    const { id, ...provider } = providerData;

    const response = await apiClient.put(`/providers/${id}`, provider);
    return response.data;
  } catch (error) {
    console.error("Error updating provider:", error);
    return null;
  }
};
