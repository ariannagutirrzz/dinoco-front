// hooks/useProviders.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProviders, deleteProvider, createProvider, updateProvider } from "../api/providers";
import { notifications } from "@mantine/notifications";

export const useProviders = () => {
  const queryClient = useQueryClient();

  // Fetch providers
  const {
    data,
    isLoading: isFetching,
    isError: isErrorFetch,
    error: fetchError,
  } = useQuery({
    queryKey: ["providers"],
    queryFn: getProviders,
    staleTime: 0,
  });

  // Delete provider
  const deleteMutation = useMutation({
    mutationFn: deleteProvider,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      notifications.show({
        title: "Success",
        message: "Provider deleted successfully",
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

  // Create provider
  const createMutation = useMutation({
    mutationFn: createProvider,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      notifications.show({
        title: "Success",
        message: "Provider created successfully",
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

  // Update provider
  const updateMutation = useMutation({
    mutationFn: updateProvider,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      notifications.show({
        title: "Success",
        message: "Provider updated successfully",
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
    deleteProvider: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    createProvider: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateProvider: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};
