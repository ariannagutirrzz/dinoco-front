// hooks/useProducts.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct, createProduct } from "../api/products";
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
    staleTime: 0,
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

  // Create product
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      notifications.show({
        title: "Success",
        message: "Product created successfully",
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

  return {
    data: data || [],
    isFetching,
    isErrorFetch,
    fetchError,
    deleteProduct: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    createProduct: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
};
