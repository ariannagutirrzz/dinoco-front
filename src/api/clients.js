import apiClient from "./apiClient";

export const getClients = async () => {
    const response = await apiClient.get("/clients");
    return response.data;
};

export const deleteClients = async (id) => {
  try {
    const response = await apiClient.delete(`/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting client:", error);
    return null;
  }
};