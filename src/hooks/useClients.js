// hooks/useProducts.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClients, deleteClients } from "../api/clients";
import { notifications } from "@mantine/notifications";

export const useClients = () => {
  const queryClient = useQueryClient();

  // Fetch products
  const {
    data,
    isLoading: isFetching,
    isError: isErrorFetch,
    error: fetchError,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  // Delete product
  const deleteMutation = useMutation({
    mutationFn: deleteClients,
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

  return {
    data,
    isFetching,
    isErrorFetch,
    fetchError,
    deleteClients: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
