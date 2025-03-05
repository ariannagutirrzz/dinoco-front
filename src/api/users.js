import apiClient from "./apiClient";

export const getUsers = async () => {
  try {
    const response = await apiClient.get("/users");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
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

