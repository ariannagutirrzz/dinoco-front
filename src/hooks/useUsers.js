// hooks/useUsers.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, deleteUsers } from "../api/users";
import { notifications } from "@mantine/notifications";

export const useUsers = () => {
  const queryClient = useQueryClient();

  // Fetch users
  const {
    data,
    isLoading: isFetching,
    isError: isErrorFetch,
    error: fetchError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Delete user
  const deleteMutation = useMutation({
    mutationFn: deleteUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notifications.show({
        title: "Success",
        message: "User deleted successfully",
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
    deleteUsers: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
