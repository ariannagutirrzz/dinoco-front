// hooks/useProviders.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProviders, deleteProviders } from "../api/providers";
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
  });

  // Delete provider
  const deleteMutation = useMutation({
    mutationFn: deleteProviders,
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

  return {
    data,
    isFetching,
    isErrorFetch,
    fetchError,
    deleteProviders: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
