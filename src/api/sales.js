import apiClient from "./apiClient";

export const getSales = async () => {
  const response = await apiClient.get("/sales");
  return response.data;
};

export const deleteSales = async (id) => {
  try {
    const response = await apiClient.delete(`/sales/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting sale:", error);
    return null;
  }
};

