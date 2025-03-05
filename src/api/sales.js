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
