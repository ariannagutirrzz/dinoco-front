import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDeposits, createDeposit, updateDeposit, deleteDeposit } from "../api/deposits";
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
    staleTime: 0,
  });

  // Delete deposit
  const deleteMutation = useMutation({
    mutationFn: deleteDeposit,
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

  // Create deposit
  const createMutation = useMutation({
    mutationFn: createDeposit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deposits"] });
      notifications.show({
        title: "Success",
        message: "Deposit created successfully",
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

  // Update deposit
  const updateMutation = useMutation({
    mutationFn: updateDeposit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deposits"] });
      notifications.show({
        title: "Success",
        message: "Deposit updated successfully",
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
    deleteDeposit: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    createDeposit: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateDeposit: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};
