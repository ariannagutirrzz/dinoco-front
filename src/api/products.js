import apiClient from "./apiClient";

export const getProducts = async () => {
  const response = await apiClient.get("/products");
  return response.data;
};

export const deleteProduct = async (id) => {
  try {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    return null;
  }
};

export const createProduct = async (product) => {
  try {
    const response = await apiClient.post("/products", product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
};
