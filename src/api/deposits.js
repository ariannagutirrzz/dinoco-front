import apiClient from "./apiClient";

export const getDeposits = async () => {
    const response = await apiClient.get("/deposits");
    return response.data;
};

export const deleteDeposits = async (id) => {
  try {
    const response = await apiClient.delete(`/deposits/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting deposit:", error);
    return null;
  }
};