import apiClient from "./apiClient";

export const getClients = async () => {
    const response = await apiClient.get("/clients");
    return response.data;
};

export const deleteClient = async (id) => {
  try {
    const response = await apiClient.delete(`/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting client:", error);
    return null;
  }
};

export const createClient = async (client) => {
  try {
    const response = await apiClient.post("/clients", client);
    return response.data;
  } catch (error) {
    console.error("Error creating client:", error);
    return null;
  }
};

export const updateClient = async (clientData) => {
  try {
    const { id, ...client } = clientData;

    const response = await apiClient.put(`/clients/${id}`, client);
    return response.data;
  } catch (error) {
    console.error("Error updating client:", error);
    return null;
  }
};
