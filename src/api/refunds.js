import apiClient from "./apiClient";

export const getRefunds = async () => {
    const response = await apiClient.get("/refunds");
    return response.data;
};

export const deleteRefunds = async (id) => {
  try {
    const response = await apiClient.delete(`/refunds/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting refund:", error);
    return null;
  }
};
