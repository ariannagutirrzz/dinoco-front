import apiClient from "./apiClient";

export const getDeposits = async () => {
    const response = await apiClient.get("/deposits");
    return response.data;
};

export const deleteDeposit = async (id) => {
  try {
    const response = await apiClient.delete(`/deposits/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting deposit:", error);
    return null;
  }
};

export const createDeposit = async (deposit) => {
  try {
    const response = await apiClient.post("/deposits", deposit);
    return response.data;
  } catch (error) {
    console.error("Error creating deposit:", error);
    return null;
  }
};

export const updateDeposit = async (depositData) => {
  try {
    const { id, ...deposit } = depositData;

    const response = await apiClient.put(`/deposits/${id}`, deposit);
    return response.data;
  } catch (error) {
    console.error("Error updating deposit:", error);
    return null;
  }
};
