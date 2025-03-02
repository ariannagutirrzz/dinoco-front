// hooks/usePurchases.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPurchases, deletePurchases } from "../api/purchases";
import { notifications } from "@mantine/notifications";

export const usePurchases = () => {
  const queryClient = useQueryClient();

  // Fetch purchases
  const {
    data,
    isLoading: isFetching,
    isError: isErrorFetch,
    error: fetchError,
  } = useQuery({
    queryKey: ["purchases"],
    queryFn: getPurchases,
  });

  // Delete purchase
  const deleteMutation = useMutation({
    mutationFn: deletePurchases,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      notifications.show({
        title: "Success",
        message: "Purchase deleted successfully",
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
    deletePurchases: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
