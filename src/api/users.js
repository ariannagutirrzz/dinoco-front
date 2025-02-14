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
