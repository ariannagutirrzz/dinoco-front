// hooks/useDeposits.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDeposits, deleteDeposits } from "../api/deposits";
import { notifications } from "@mantine/notifications";

export const useDeposits = () => {
  const queryClient = useQueryClient();

  // Fetch deposits
  const {
    data,
    isLoading: isFetching,
    isError: isErrorFetch,
    error: fetchError,
  } = useQuery({
    queryKey: ["deposits"],
    queryFn: getDeposits,
  });

  // Delete deposit
  const deleteMutation = useMutation({
    mutationFn: deleteDeposits,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deposits"] });
      notifications.show({
        title: "Success",
        message: "Deposit deleted successfully",
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
    deleteDeposits: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
