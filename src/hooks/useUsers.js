// hooks/useUsers.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, deleteUser, createUser, updateUser } from "../api/users";
import { notifications } from "@mantine/notifications";

export const useUsers = () => {
  const queryClient = useQueryClient();

  // Fetch users
  const {
    data = [],
    isLoading: isFetching,
    isError: isErrorFetch,
    error: fetchError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 0,
  });

  // Delete user
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notifications.show({
        title: "Success",
        message: "User deleted successfully",
        color: "green",
      });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    },
  });

  // Create user
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notifications.show({
        title: "Success",
        message: "User created successfully",
        color: "green",
      });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    },
  });

  // Update user
  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notifications.show({
        title: "Success",
        message: "User updated successfully",
        color: "green",
      });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    },
  });

  return {
    data,
    isFetching,
    isErrorFetch,
    fetchError,
    deleteUser: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    createUser: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateUser: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};
