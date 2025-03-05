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
