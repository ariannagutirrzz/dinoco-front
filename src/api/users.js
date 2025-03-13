import apiClient from "./apiClient";

export const getUsers = async () => {
    const response = await apiClient.get("/users");
    return response.data;
};

export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};

export const createUser = async (user) => {
  try {
    const response = await apiClient.post("/users", user);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

export const updateUser = async (userData) => {
  try {
    const { id, ...user } = userData;

    const response = await apiClient.put(`/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};


