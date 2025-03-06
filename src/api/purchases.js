import apiClient from "./apiClient";

export const getPurchases = async () => {
    const response = await apiClient.get("/purchases");
    return response.data;
};

export const deletePurchases = async (id) => {
  try {
    const response = await apiClient.delete(`/purchases/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting purchase:", error);
    return null;
  }
};
