import apiClient from "./apiClient";

// Fetch all sales
export const getSales = async () => {
  const response = await apiClient.get("/sales");
  return response.data;
};

// Delete a sale by ID
export const deleteSale = async (id) => {
  try {
    const response = await apiClient.delete(`/sales/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting sale:", error);
    return null;
  }
};

// Create a new sale
export const createSale = async (sale) => {
  try {
    const response = await apiClient.post("/sales", sale);
    return response.data;
  } catch (error) {
    console.error("Error creating sale:", error);
    return null;
  }
};

// Update an existing sale
export const updateSale = async (saleData) => {
  try {
    const { id, ...sale } = saleData;

    const response = await apiClient.put(`/sales/${id}`, sale);
    return response.data;
  } catch (error) {
    console.error("Error updating sale:", error);
    return null;
  }
};
