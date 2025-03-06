import apiClient from "./apiClient";

export const getUsers = async () => {
    const response = await apiClient.get("/users");
    return response.data;
};

export const deleteUsers = async (id) => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};

