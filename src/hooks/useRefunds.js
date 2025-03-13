// hooks/useRefunds.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRefunds, deleteRefunds } from "../api/refunds";
import { notifications } from "@mantine/notifications";

export const useRefunds = () => {
  const queryClient = useQueryClient();

  // Fetch refunds
  const {
    data,
    isLoading: isFetching,
    isError: errorMessage,
    error: fetchError,
  } = useQuery({
    queryKey: ["refunds"],
    queryFn: getRefunds,
  });

  // Delete refund
  const deleteMutation = useMutation({
    mutationFn: deleteRefunds,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["refunds"] });
      notifications.show({
        title: "Success",
        message: "Refund deleted successfully",
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
    errorMessage,
    fetchError,
    deleteRefunds: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
