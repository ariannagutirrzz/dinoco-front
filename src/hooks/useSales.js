import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSales, deleteSale, createSale, updateSale } from "../api/sales";
import { notifications } from "@mantine/notifications";

export const useSales = () => {
  const queryClient = useQueryClient();

  // Fetch sales
  const {
    data,
    isLoading: isFetching,
    isError: isErrorFetch,
    error: fetchError,
  } = useQuery({
    queryKey: ["sales"],
    queryFn: getSales,
    staleTime: 0,
  });

  // Delete sale
  const deleteMutation = useMutation({
    mutationFn: deleteSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      notifications.show({
        title: "Success",
        message: "Sale deleted successfully",
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

  // Create sale
  const createMutation = useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      notifications.show({
        title: "Success",
        message: "Sale created successfully",
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

  // Update sale
  const updateMutation = useMutation({
    mutationFn: updateSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      notifications.show({
        title: "Success",
        message: "Sale updated successfully",
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
    deleteSale: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    createSale: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateSale: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};
