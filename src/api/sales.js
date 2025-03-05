import apiClient from "./apiClient";

export const getSales = async () => {
  try {
    const response = await apiClient.get("/sales");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching sales:", error);
    return [];
  }
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

