import apiClient from "./apiClient";

export const getPurchases = async () => {
  try {
    const response = await apiClient.get("/purchases");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return [];
  }
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
