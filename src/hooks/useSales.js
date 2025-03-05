// hooks/useSales.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSales, deleteSales } from "../api/sales";
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
  });

  // Delete sale
  const deleteMutation = useMutation({
    mutationFn: deleteSales,
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

  return {
    data,
    isFetching,
    isErrorFetch,
    fetchError,
    deleteSales: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
