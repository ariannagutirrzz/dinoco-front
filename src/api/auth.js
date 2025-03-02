import apiClient from "./apiClient";

const login = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/signin", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const signup = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/signup", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default { login, signup };
