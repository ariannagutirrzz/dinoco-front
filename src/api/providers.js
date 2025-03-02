import apiClient from "./apiClient";

export const getProviders = async () => {
  try {
    const response = await apiClient.get("/providers");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching providers:", error);
    return [];
  }
};

export const deleteProviders = async (id) => {
  try {
    const response = await apiClient.delete(`/providers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting provider:", error);
    return null;
  }
};