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
