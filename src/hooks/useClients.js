// hooks/useClients.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClients, deleteClient, createClient, updateClient } from "../api/clients";
import { notifications } from "@mantine/notifications";

export const useClients = () => {
  const queryClient = useQueryClient();

  // Fetch clients
  const {
    data,
    isLoading: isFetching,
    isError: isErrorFetch,
    error: fetchError,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
    staleTime: 0,
  });

  // Delete client
  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      notifications.show({
        title: "Success",
        message: "Client deleted successfully",
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    },
  });

  // Create client
  const createMutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      notifications.show({
        title: "Success",
        message: "Client created successfully",
        color: "green",
      });
    },
    onError: (error) => {
      alert(error.message);
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    },
  });

  // Update client
  const updateMutation = useMutation({
    mutationFn: updateClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      notifications.show({
        title: "Success",
        message: "Client updated successfully",
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    },
  });

  return {
    data: data || [],
    isFetching,
    isErrorFetch,
    fetchError,
    deleteClient: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    createClient: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateClient: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};
