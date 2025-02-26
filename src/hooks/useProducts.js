// hooks/useProducts.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct } from "../api/products";
import { notifications } from "@mantine/notifications";

export const useProducts = () => {
  const queryClient = useQueryClient();

  // Fetch products
  const {
    data,
    isLoading: isFetching,
    isError: isErrorFetch,
    error: fetchError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // Delete product
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      notifications.show({
        title: "Success",
        message: "Product deleted successfully",
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
    deleteProduct: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
