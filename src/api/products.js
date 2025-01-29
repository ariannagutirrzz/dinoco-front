import apiClient from "./apiClient";

export const getProducts = async () => {
  try {
    const response = await apiClient.get("/products");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
